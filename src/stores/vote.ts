import { StaticImageData } from 'next/image';
import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import { TF_YEAR } from '@/constants/event';
import { ProjectCategory } from '@/constants/projects';
import { PROJECT_VOTE_LIMIT } from '@/constants/voting';

export type LocalVotedProject = {
	id: number;
	title: string;
	thumbnail: StaticImageData;
	category: ProjectCategory;
};

const useVoteStore = create(
	persist(
		combine(
			{
				votes: [] as LocalVotedProject[],
			},
			(set, get) => ({
				selectProject: (project: LocalVotedProject) => {
					const currentVotes = get().votes;
					const canAddVote =
						!isProjectSelected(project.id, currentVotes) && currentVotes.length < PROJECT_VOTE_LIMIT;

					if (canAddVote) {
						set({
							votes: [...currentVotes, project],
						});
						return true;
					}
					return false;
				},
				deselectProject: (projectId: number) => {
					set((state) => ({
						votes: state.votes.filter((vote) => vote.id !== projectId),
					}));
				},
				replaceProject: (replaceId: number, project: LocalVotedProject) => {
					const replaceProject = get().votes.find((vote) => vote.id === replaceId);
					set((state) => ({
						votes: state.votes.map((vote) => (vote.id === replaceId ? project : vote)),
					}));
					return replaceProject;
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

export const useSelectProject = () => useVoteStore((state) => state.selectProject);
export const useDeselectProject = () => useVoteStore((state) => state.deselectProject);
export const useReplaceProject = () => useVoteStore((state) => state.replaceProject);

function isProjectSelected(projectId: number, votes: LocalVotedProject[]) {
	return votes.some((vote) => vote.id === projectId);
}
