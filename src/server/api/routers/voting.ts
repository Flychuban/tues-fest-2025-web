import { z } from 'zod';

import { createTRPCRouter, publicVotingProcedure } from '../trpc';

export const votingRouter = createTRPCRouter({
	getCurrentVoter: publicVotingProcedure.input(z.boolean()).query(async ({ ctx, input }) => {
		if (!input) return null;

		return {
			id: 'lerjgldfgj',
			votes: [1, 2],
		};
	}),
});
