import { StaticImageData } from 'next/image';
import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import { TF_YEAR } from '@/constants/event';
import { PROJECT_VOTE_LIMIT } from '@/constants/voting';

export type LocalVotedProject = {
	id: number;
	title: string;
	thumbnail: StaticImageData;
	category: string;
};

const useVoteStore = create(
	persist(
		combine(
			{
				votes: [] as LocalVotedProject[],
			},
			(set, get) => ({
				toggleProjectSelected: (project: LocalVotedProject) => {
					const currentVotes = get().votes;
					const hasReachedVoteLimit = currentVotes.length >= PROJECT_VOTE_LIMIT;
					const isSelected = isProjectSelected(project.id, currentVotes);

					if (!isSelected && !hasReachedVoteLimit) {
						set({
							votes: [...currentVotes, project],
						});
					} else if (isSelected) {
						set({
							votes: currentVotes.filter((vote) => vote.id !== project.id),
						});
					}
				},
				replaceProject: (replaceId: number, project: LocalVotedProject) => {
					set((state) => ({
						votes: state.votes.map((vote) => (vote.id === replaceId ? project : vote)),
					}));
				},
			})
		),
		{
			name: `tf-${TF_YEAR}-vote-storage`,
		}
	)
);

export const useVotedProjects = () => useVoteStore((state) => state.votes);
export const useProjectVoteStatus = (projectId: number) => {
	const votes = useVotedProjects();

	return {
		isSelected: isProjectSelected(projectId, votes),
		hasReachedVoteLimit: votes.length >= PROJECT_VOTE_LIMIT,
	};
};

export const useToggleProjectSelect = () => useVoteStore((state) => state.toggleProjectSelected);
export const useReplaceProject = () => useVoteStore((state) => state.replaceProject);

function isProjectSelected(projectId: number, votes: LocalVotedProject[]) {
	return votes.some((vote) => vote.id === projectId);
}
