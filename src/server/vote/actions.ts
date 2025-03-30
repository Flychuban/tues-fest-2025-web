'use server';

import { z } from 'zod';

const _submitVoteSchema = z.object({
	email: z.string().email(),
	name: z.string().trim(),
	pm: z.string().trim(),
	cf: z.string().trim(),
	isSpam: z.literal(false),
});
export async function saveVote(data: z.infer<typeof _submitVoteSchema>) {
	return {
		success: false,
		error: 'изтрих всичкия код, защото не ми се занимава с това',
	};
}
