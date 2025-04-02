'use client';

import { Button } from '@/components/ui/button';
import { useVoteContext } from '@/context/vote';

const VoteButton = ({
	id,
	name,
	thumbnail,
	category,
}: {
	id: number;
	name: string;
	thumbnail: string;
	category: string;
}) => {
	const { getVotes, addVote, removeVote } = useVoteContext();

	const vote = Object.values(getVotes()).find((v) => v?.id === id);

	const handleVote = () => {
		void addVote(category, id, name, thumbnail);
	};

	const handleUnvote = () => {
		if (!vote?.category) return;
		void removeVote(vote.category);
	};

	const handleClick = () => {
		if (vote) {
			handleUnvote();
		} else {
			handleVote();
		}
	};

	return (
		// @ts-expect-error because this will be removed in the future
		null && (
			<Button className="bg-sand text-black" onClick={handleClick} size="lg">
				{!vote ? 'Гласувай' : 'Премахни глас'}
			</Button>
		)
	);
};

export default VoteButton;
