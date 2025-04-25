import { randomInt } from 'node:crypto';

import { cookies } from 'next/headers';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { Duration } from 'effect';
import { env } from 'env.mjs';
import { z } from 'zod';

import { TF_YEAR_SHORT } from '@/constants/event';
import {
	PROJECT_VOTE_LIMIT,
	VOTE_VERIFICATION_CODE_LENGTH,
	VOTE_VERIFICATION_EMAIL_COOLDOWN_DURATION,
} from '@/constants/voting';
import { db } from '@/server/db';
import { voters } from '@/server/db/schema';
import { createTRPCRouter, growthbookFeatureMiddleware, publicProcedure } from '../trpc';

const COOKIE_PREFIX = env.NODE_ENV !== 'development' ? '__Secure-' : '';
const PUBLIC_VOTER_ID_COOKIE_NAME = `${COOKIE_PREFIX}tf${TF_YEAR_SHORT}_voter_id`;

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

export const votingRouter = createTRPCRouter({
	getCurrentVoter: publicVotingProcedure.query(async ({ ctx }) => {
		if (!ctx.voter) return null;

		return {
			isVerified: ctx.voter.verifiedAt !== null,
			votedProjectIds: [] as number[],
			email: ctx.voter.email,
		};
	}),
	registerVoter: publicVotingProcedure
		.input(
			z.object({
				name: z.string().trim(),
				email: z.string().email().trim(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (ctx.voter) {
				throw new TRPCError({ code: 'BAD_REQUEST', message: 'Вече сте регистриран' });
			}

			const existingVoter = await ctx.db.query.voters.findFirst({
				where: eq(voters.email, input.email),
				columns: {
					verifiedAt: true,
					isBanned: true,
					verificationEmailSentAt: true,
				},
				orderBy: (voters, { desc }) => [
					desc(voters.isBanned),
					desc(voters.verifiedAt),
					desc(voters.verificationEmailSentAt),
				],
			});
			const verificationResult = await sendVerificationCode(input.email, existingVoter);

			const newVoter = await ctx.db
				.insert(voters)
				.values({
					name: input.name,
					...verificationResult,
				})
				.returning({
					publicId: voters.publicId,
				})
				.then(([voter]) => voter);
			if (!newVoter) {
				throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Възникна неочаквана грешка' });
			}

			ctx.jar.set(PUBLIC_VOTER_ID_COOKIE_NAME, newVoter.publicId, {
				secure: env.NODE_ENV !== 'development',
				httpOnly: true,
				sameSite: 'lax',
				expires: new Date(Date.now() + Duration.toMillis('30 days')),
			});

			return REVERSE_ENGINEERING_PROTECTION_MESSAGE;
		}),
	resendVerificationCode: protectedVotingProcedure
		.input(z.object({ email: z.string().email() }))
		.mutation(async ({ ctx, input }) => {
			if (ctx.voter.verifiedAt !== null) {
				throw new TRPCError({ code: 'BAD_REQUEST', message: 'Вече сте потвърдили Вашия имейл' });
			}

			const verificationResult = await sendVerificationCode(input.email, ctx.voter);

			await ctx.db
				.update(voters)
				.set({
					...verificationResult,
				})
				.where(eq(voters.id, ctx.voter.id));

			return REVERSE_ENGINEERING_PROTECTION_MESSAGE;
		}),
	verifyVoter: protectedVotingProcedure
		.input(
			z.object({
				verificationCode: z.string().length(VOTE_VERIFICATION_CODE_LENGTH),
				selectedProjectIds: z.set(z.number()).min(1).max(PROJECT_VOTE_LIMIT),
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (ctx.voter.verifiedAt !== null) {
				throw new TRPCError({ code: 'BAD_REQUEST', message: 'Вече сте потвърдили вашия имейл' });
			}
			if (ctx.voter.verificationCodeExpiresAt < new Date()) {
				throw new TRPCError({ code: 'BAD_REQUEST', message: 'Кодът за потвърждение е изтекъл' });
			}

			const isVerificationCodeValid = ctx.voter.verificationCode === input.verificationCode;
			if (isVerificationCodeValid) {
				await ctx.db
					.update(voters)
					.set({
						verifiedAt: new Date(),
					})
					.where(eq(voters.id, ctx.voter.id));
			}

			return isVerificationCodeValid;
		}),
});

async function sendVerificationCode(
	email: string,
	existingVoter: { verificationEmailSentAt: Date | null; verifiedAt: Date | null; isBanned: boolean } | undefined
) {
	const emailWasSentTooSoon =
		existingVoter?.verificationEmailSentAt &&
		existingVoter.verificationEmailSentAt >
			new Date(Date.now() - Duration.toMillis(VOTE_VERIFICATION_EMAIL_COOLDOWN_DURATION));
	const shouldSilentlyRefuseToRegister =
		(existingVoter && existingVoter?.verifiedAt !== null) || existingVoter?.isBanned || emailWasSentTooSoon;

	return {
		email,
		verificationCode: shouldSilentlyRefuseToRegister ? 'XXXXXX' : generateVerificationCode(),
		verificationCodeExpiresAt: shouldSilentlyRefuseToRegister ? new Date(0) : undefined,
	};
}

function generateVerificationCode() {
	return Array.from({ length: VOTE_VERIFICATION_CODE_LENGTH }, () => randomInt(0, 10).toString()).join('');
}

const REVERSE_ENGINEERING_PROTECTION_MESSAGE =
	'Тази функция е САМО за вътрешно използване и всеки опит за манипулиране на гласовете ще бъде санкциониран подобаващо! Организационният екип на TUES Fest запазва правото си да дисквалифицира всеки замесен участник или екип.';
