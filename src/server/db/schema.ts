// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from 'drizzle-orm';
import { index, pgEnum, pgSequence, pgTableCreator } from 'drizzle-orm/pg-core';
import { Duration } from 'effect';
import { ulid } from 'ulid';

import { TF_YEAR_SHORT } from '@/constants/event';
import { VOTE_VERIFICATION_CODE_EXPIRATION_DURATION, VOTE_VERIFICATION_CODE_LENGTH } from '@/constants/voting';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `tf${TF_YEAR_SHORT}_${name}`);

export const voters = createTable(
	'voters',
	(d) => ({
		id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
		publicId: d
			.char({ length: 26 })
			.$defaultFn(() => ulid())
			.unique()
			.notNull(),

		name: d.varchar({ length: 256 }).notNull(),
		email: d.varchar({ length: 256 }).notNull(),

		verificationCode: d.char({ length: VOTE_VERIFICATION_CODE_LENGTH }).notNull(),
		verificationCodeExpiresAt: d
			.timestamp({ withTimezone: true })
			.$defaultFn(() => new Date(Date.now() + Duration.toMillis(VOTE_VERIFICATION_CODE_EXPIRATION_DURATION)))
			.notNull(),
		verificationEmailSentAt: d.timestamp({ withTimezone: true }),
		verifiedAt: d.timestamp({ withTimezone: true }),

		isBanned: d.boolean().notNull().default(false),

		createdAt: d
			.timestamp({ withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
	}),
	(t) => [index('name_idx').on(t.name), index('public_id_idx').on(t.publicId), index('email_idx').on(t.email)]
);

export const voterRelations = relations(voters, ({ many }) => ({
	votes: many(votes),
}));

export const votes = createTable('votes', (d) => ({
	id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
	projectId: d.integer().notNull(),
	voterId: d
		.integer()
		.notNull()
		.references(() => voters.id),
	createdAt: d
		.timestamp({ withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
}));

export const votesRelations = relations(votes, ({ one }) => ({
	voter: one(voters, {
		fields: [votes.voterId],
		references: [voters.id],
	}),
}));

// FIXME: drizzle-kit really wants to delete these, so even though they are not used, they must be defined here as well
// This is because we are sharing the same schema for multiple projects
export const __DO_NOT_USE_classEnum = pgEnum('class', ['А', 'Б', 'В', 'Г']);
export const __DO_NOT_USE_gradeEnum = pgEnum('grade', ['8', '9', '10', '11', '12']);
export const __DO_NOT_USE_tShirtSizeEnum = pgEnum('tshirt_size', ['XS', 'S', 'M', 'L', 'XL', 'XXL']);
export const __DO_NOT_USE_notificationsTypes = pgEnum('notifications_types', ['invitation', 'ask_join']);
export const __DO_NOT_USE_discordIdSequence = pgSequence('discord_id_seq', { maxValue: '2147483647' });
export const __DO_NOT_USE_githubInstallationsIdSequence = pgSequence('github_installations_id_seq', {
	maxValue: '2147483647',
});
export const __DO_NOT_USE_githubInstallationsToParticipantsIdSequence = pgSequence(
	'github_installations_to_participants_id_seq',
	{
		maxValue: '2147483647',
	}
);
export const __DO_NOT_USE_githubReposIdSequence = pgSequence('github_repos_id_seq', { maxValue: '2147483647' });
export const __DO_NOT_USE_invitationsIdSequence = pgSequence('invitations_id_seq', { maxValue: '2147483647' });
export const __DO_NOT_USE_joinRequestsIdSequence = pgSequence('join_requests_id_seq', { maxValue: '2147483647' });
export const __DO_NOT_USE_mentorsIdSequence = pgSequence('mentors_id_seq', { maxValue: '2147483647' });
export const __DO_NOT_USE_notificationsIdSequence = pgSequence('notifications_id_seq', { maxValue: '2147483647' });
export const __DO_NOT_USE_participantsIdSequence = pgSequence('participants_id_seq', { maxValue: '2147483647' });
export const __DO_NOT_USE_participantsTshirtIdSequence = pgSequence('participants_tshirt_id_seq', {
	maxValue: '2147483647',
});
export const __DO_NOT_USE_projectsIdSequence = pgSequence('projects_id_seq', { maxValue: '2147483647' });
export const __DO_NOT_USE_tshirtsIdSequence = pgSequence('tshirts_id_seq', { maxValue: '2147483647' });
export const __DO_NOT_USE_usersParticipantIdSequence = pgSequence('users_participant_id_seq', {
	maxValue: '2147483647',
});
