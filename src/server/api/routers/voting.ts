import { randomInt } from 'node:crypto';

import { cookies } from 'next/headers';
import { after } from 'next/server';
import { TRPCError } from '@trpc/server';
import { and, eq, not } from 'drizzle-orm';
import { Duration } from 'effect';
import { env } from 'env.mjs';
import invariant from 'tiny-invariant';
import { isEmail, normalizeEmail } from 'validator';
import { z } from 'zod';

import { getProjects } from '@/app/projects/actions';
import { TF_YEAR_SHORT } from '@/constants/event';
import { TF_TITLE } from '@/constants/seo';
import {
	PROJECT_VOTE_LIMIT,
	VOTE_VERIFICATION_CODE_EXPIRATION_DURATION,
	VOTE_VERIFICATION_CODE_LENGTH,
	VOTE_VERIFICATION_EMAIL_COOLDOWN_DURATION,
} from '@/constants/voting';
import { type Database } from '@/server/db';
import { voters, votes } from '@/server/db/schema';
import { Mailer } from '@/server/email';
import { renderEmail } from '@/server/email/render';
import VerificationCodeEmail from '@/server/email/templates/verification-code-email';
import { createTRPCRouter, growthbookFeatureMiddleware, publicProcedure } from '../trpc';

const COOKIE_PREFIX = env.NODE_ENV !== 'development' ? '__Secure-' : '_';
const PUBLIC_VOTER_ID_COOKIE_NAME = `${COOKIE_PREFIX}tf${TF_YEAR_SHORT}_voter_ref`;

const publicVotingProcedure = publicProcedure
	.use(growthbookFeatureMiddleware('project-voting', 'Гласуването за проекти не е позволено по това време'))
	.use(async ({ next, ctx }) => {
		const jar = await cookies();

		async function getVoter() {
			const voterId = jar.get(PUBLIC_VOTER_ID_COOKIE_NAME)?.value;

			if (!voterId) {
				return null;
			}

			const voter = await ctx.db.query.voters.findFirst({
				where: eq(voters.publicId, voterId),
				with: {
					votes: {
						columns: {
							projectId: true,
						},
					},
				},
			});

			if (!voter) {
				jar.delete(PUBLIC_VOTER_ID_COOKIE_NAME);
				return null;
			}

			return voter;
		}

		return next({
			ctx: {
				...ctx,
				voter: await getVoter(),
				jar,
			},
		});
	});

const protectedVotingProcedure = publicVotingProcedure.use(async ({ next, ctx }) => {
	if (!ctx.voter) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Моля, въведете имейл адреса си за да продължите',
		});
	}

	return next({
		ctx: {
			...ctx,
			voter: ctx.voter,
		},
	});
});

const emailSchema = z
	.string()
	.trim()
	.refine((val) => isEmail(val), {
		message: 'Невалиден имейл адрес',
	});

export const votingRouter = createTRPCRouter({
	getCurrentVoter: publicVotingProcedure.query(async ({ ctx }) => {
		if (!ctx.voter) return null;

		return {
			isVerified: ctx.voter.verifiedAt !== null,
			votedProjectIds: ctx.voter.votes.map((vote) => vote.projectId),
			email: ctx.voter.email,
		};
	}),

	registerVoter: publicVotingProcedure
		.input(
			z.object({
				name: z.string().trim(),
				email: emailSchema,
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (ctx.voter) {
				throw new TRPCError({ code: 'BAD_REQUEST', message: 'Вече сте регистриран' });
			}

			// If this email was already used, we need to check if it's suspicious.
			// It's possible that a user may have tried to use this email on another device,
			// but they never completed the verification process. In that case it's safe to proceed again.
			// If however, this email was already verified or banned, we need to silently refuse them to register again.
			// This is to prevent a malicious user from registering a lot of emails and then verifying them in one go.
			// We can't notify the user that this email is used to prevent brute force attacks, attempting to find out which emails have been used, as well as to give limited information to potential attackers.
			const normalizedEmail = normalizeEmail(input.email);
			invariant(normalizedEmail !== false, 'Could not normalize email address');

			const { isSuspicious, existingVoters } = await isVerificationRequestSuspicious(normalizedEmail, ctx.db);

			const newVoter = await ctx.db.transaction(async (tx) => {
				const verificationResult = sendNewVerificationCodeAfterRequest(
					input.email,
					input.name,
					isSuspicious,
					ctx.mailer
				);

				if (!isSuspicious) {
					// If this request is not suspicious, we will let this voter proceed. However, we need to invalidate any existing verification code to prevent the user from verifying again with a previously sent, but unused code.
					await tx
						.update(voters)
						.set({
							verificationCode: impossibleCode,
						})
						.where(eq(voters.email, input.email));
				}

				return await tx
					.insert(voters)
					.values({
						name: input.name,
						email: input.email,
						normalizedEmail,
						isBanned: existingVoters.some((voter) => voter.isBanned),
						...verificationResult,
					})
					.returning({
						publicId: voters.publicId,
					})
					.then(([voter]) => voter);
			});

			if (!newVoter) {
				throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Възникна неочаквана грешка' });
			}

			ctx.jar.set(PUBLIC_VOTER_ID_COOKIE_NAME, newVoter.publicId, {
				secure: env.NODE_ENV !== 'development',
				httpOnly: true,
				sameSite: 'lax',
				maxAge: Duration.toSeconds('30 days'),
			});

			return REVERSE_ENGINEERING_PROTECTION_MESSAGE;
		}),

	resendVerificationCode: protectedVotingProcedure
		.input(z.object({ email: emailSchema.optional() }))
		.mutation(async ({ ctx, input }) => {
			if (ctx.voter.verifiedAt !== null) {
				throw new TRPCError({ code: 'BAD_REQUEST', message: 'Вече сте потвърдили Вашия имейл' });
			}

			let isSuspicious =
				isExistingVoterSuspicious(ctx.voter) ||
				(await isVerificationRequestSuspicious(ctx.voter.normalizedEmail, ctx.db)).isSuspicious;
			let normalizedEmail = ctx.voter.normalizedEmail;
			if (input.email) {
				const newNormalizedEmail = normalizeEmail(input.email);
				invariant(newNormalizedEmail !== false, 'Could not normalize email address');
				normalizedEmail = newNormalizedEmail;
				isSuspicious ||= (await isVerificationRequestSuspicious(newNormalizedEmail, ctx.db)).isSuspicious;
			}

			const verificationResult = sendNewVerificationCodeAfterRequest(
				input.email ?? ctx.voter.email,
				ctx.voter.name,
				isSuspicious,
				ctx.mailer
			);

			await ctx.db
				.update(voters)
				.set({
					...verificationResult,
					email: input.email ?? ctx.voter.email,
					normalizedEmail,
				})
				.where(eq(voters.id, ctx.voter.id));

			return REVERSE_ENGINEERING_PROTECTION_MESSAGE;
		}),

	verifyVoter: protectedVotingProcedure
		.input(
			z.object({
				verificationCode: z.string().regex(/^\d+$/).length(VOTE_VERIFICATION_CODE_LENGTH),
				selectedProjectIds: z.set(z.number().int().positive()).min(1).max(PROJECT_VOTE_LIMIT),
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (ctx.voter.verifiedAt !== null) {
				throw new TRPCError({ code: 'BAD_REQUEST', message: 'Вече сте потвърдили вашия имейл' });
			}
			if (ctx.voter.verificationCodeExpiresAt < new Date()) {
				throw new TRPCError({ code: 'BAD_REQUEST', message: 'Кодът за потвърждение е изтекъл' });
			}
			const projects = new Set(
				await getProjects().then((projects) => projects.map((project): number => project.id))
			);
			const selectedProjects = Array.from(input.selectedProjectIds);
			if (selectedProjects.some((id) => !projects.has(id))) {
				throw new TRPCError({ code: 'BAD_REQUEST', message: 'Невалиден списък с проекти' });
			}

			const verificationCodeMatches = ctx.voter.verificationCode === input.verificationCode;
			if (verificationCodeMatches) {
				if (ctx.voter.votes.length > 0) {
					throw new Error('Voter has voted before they got verified! This should never happen!');
				}

				await ctx.db.transaction(async (tx) => {
					await tx
						.update(voters)
						.set({
							verificationCode: impossibleCode,
						})
						.where(and(eq(voters.email, ctx.voter.email), not(eq(voters.id, ctx.voter.id))));

					await tx
						.update(voters)
						.set({
							verifiedAt: new Date(),
						})
						.where(eq(voters.id, ctx.voter.id));

					await tx.insert(votes).values(
						selectedProjects.map((projectId) => ({
							projectId,
							voterId: ctx.voter.id,
						}))
					);
				});
			}
			return { warning: REVERSE_ENGINEERING_PROTECTION_MESSAGE, matches: verificationCodeMatches };
		}),

	updateVotes: protectedVotingProcedure
		.input(z.object({ selectedProjectIds: z.set(z.number().int().positive()).min(1).max(PROJECT_VOTE_LIMIT) }))
		.mutation(async ({ ctx, input }) => {
			if (ctx.voter.verifiedAt === null) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Не можете да гласувате преди да потвърдите вашия имейл',
				});
			}

			const selectedProjects = Array.from(input.selectedProjectIds);
			await ctx.db.transaction(async (tx) => {
				await tx.delete(votes).where(eq(votes.voterId, ctx.voter.id));
				await tx.insert(votes).values(
					selectedProjects.map((projectId) => ({
						projectId,
						voterId: ctx.voter.id,
					}))
				);
			});
		}),
});

async function isVerificationRequestSuspicious(normalizedEmail: string, db: Database) {
	const existingVoters = await db.query.voters.findMany({
		where: eq(voters.normalizedEmail, normalizedEmail),
		columns: {
			verifiedAt: true,
			isBanned: true,
			verificationEmailSentAt: true,
		},
	});
	return { isSuspicious: existingVoters.some(isExistingVoterSuspicious), existingVoters };
}

function isExistingVoterSuspicious(
	existingVoter: { verificationEmailSentAt: Date | null; verifiedAt: Date | null; isBanned: boolean } | undefined
) {
	if (!existingVoter) {
		// First time we see this email, so it's considered safe.
		return false;
	}

	const hasVerifiedBefore = existingVoter.verifiedAt !== null;
	const wasBannedBefore = existingVoter.isBanned;
	const emailWasSentTooSoon =
		!!existingVoter.verificationEmailSentAt &&
		existingVoter.verificationEmailSentAt >
			new Date(Date.now() - Duration.toMillis(VOTE_VERIFICATION_EMAIL_COOLDOWN_DURATION));

	const isSuspicious = hasVerifiedBefore || wasBannedBefore || emailWasSentTooSoon;

	console.log('is suspicious decision', {
		existingVoter,
		hasVerifiedBefore,
		wasBannedBefore,
		emailWasSentTooSoon,
		isSuspicious,
	});
	return isSuspicious;
}

function sendNewVerificationCodeAfterRequest(email: string, name: string, isSuspicious: boolean, mailer: Mailer) {
	const realGeneratedCode = generateVerificationCode();

	if (!isSuspicious) {
		after(async () => {
			const { html, text } = await renderEmail(VerificationCodeEmail, {
				email,
				name,
				verificationCode: realGeneratedCode,
				verificationCodeExpiresAt: new Date(
					Date.now() + Duration.toMillis(VOTE_VERIFICATION_CODE_EXPIRATION_DURATION)
				),
				verificationCodeExpiryMinutes: Duration.toMinutes(VOTE_VERIFICATION_CODE_EXPIRATION_DURATION),
			});

			await mailer.sendMail({
				from: env.EMAIL_SMTP_FROM,
				to: email,
				subject: `[${TF_TITLE}] Вашият код за потвърждение: ${realGeneratedCode}`,
				html,
				text,
			});
		});
	}

	return {
		verificationCode: isSuspicious ? impossibleCode : realGeneratedCode,
		verificationEmailSentAt: isSuspicious
			? new Date(Date.now() + Duration.toMillis(VOTE_VERIFICATION_EMAIL_COOLDOWN_DURATION) / 2)
			: new Date(),
		verificationCodeExpiresAt: new Date(Date.now() + Duration.toMillis(VOTE_VERIFICATION_CODE_EXPIRATION_DURATION)),
	};
}

function generateVerificationCode() {
	return Array.from({ length: VOTE_VERIFICATION_CODE_LENGTH }, () => randomInt(0, 10).toString()).join('');
}

const impossibleCode = Array.from({ length: VOTE_VERIFICATION_CODE_LENGTH }, () => 'X').join('');

const REVERSE_ENGINEERING_PROTECTION_MESSAGE =
	'Тази услуга е САМО за вътрешно използване и всеки опит за манипулиране на гласовете ще бъде санкциониран подобаващо! Организационният екип на TUES Fest запазва правото си да дисквалифицира всеки замесен участник или екип.';
