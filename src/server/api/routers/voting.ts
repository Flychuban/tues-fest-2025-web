import { z } from 'zod';

import { createTRPCRouter, publicVotingProcedure } from '../trpc';

export const votingRouter = createTRPCRouter({
	getCurrentVoter: publicVotingProcedure.query(async ({ ctx: _ctx }) => {
		if (true) return null;

		return {
			id: 'lerjgldfgj',
			votes: [1, 2],
		};
	}),
});
