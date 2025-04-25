import { createTRPCRouter, publicVotingProcedure } from '../trpc';

export const votingRouter = createTRPCRouter({
	getCurrentVoter: publicVotingProcedure.query(async ({ ctx }) => {
		return null;
	}),
});
