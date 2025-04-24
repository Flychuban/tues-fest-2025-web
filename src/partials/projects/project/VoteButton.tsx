'use client';

import { useState } from 'react';
import { StaticImageData } from 'next/image';
import { Check } from 'lucide-react';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PROJECT_VOTE_LIMIT } from '@/constants/voting';
import { cn } from '@/lib/utils';
import { LocalVotedProject, useDeselectProject, useProjectVoteStatus, useSelectProject } from '@/stores/vote';

export function VoteSelectProjectButton({
	id,
	title,
	thumbnail,
	category,
	className,
	size = 'lg',
	...props
}: {
	id: number;
	title: string;
	thumbnail: StaticImageData;
	category: string;
	className?: string;
	size?: React.ComponentProps<typeof Button>['size'];
}) {
	const { isSelected, hasReachedVoteLimit } = useProjectVoteStatus(id);
	const selectProject = useSelectProject();
	const deselectProject = useDeselectProject();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const project: LocalVotedProject = { id, title, thumbnail, category };

	function handleClick() {
		if (isSelected) {
			// If already selected, show confirmation dialog
			setIsDialogOpen(true);
		} else if (!hasReachedVoteLimit) {
			// If not selected and under limit, select immediately
			selectProject(project);
		} else {
			// If not selected but at limit, show limit dialog
			setIsDialogOpen(true);
		}
	}

	function handleConfirmDeselect() {
		deselectProject(id);
		setIsDialogOpen(false);
	}

	return (
		<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<Button
				variant={isSelected ? 'secondary' : 'default'}
				className={cn(
					className,
					'cursor-pointer',
					isSelected && 'border-primary bg-secondary/80 hover:bg-secondary/90 border-2'
				)}
				size={size}
				onClick={handleClick}
				{...props}
			>
				{isSelected ? (
					<>
						<Check className="size-4" />
						Премахни глас
					</>
				) : (
					'Гласувай'
				)}
			</Button>

			{isSelected ? (
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Премахни глас</AlertDialogTitle>
						<AlertDialogDescription>
							Сигурни ли сте, че искате да премахнете гласа си за <ProjectTitle title={title} />?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Откажи</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirmDeselect}>Премахни глас</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			) : hasReachedVoteLimit ? (
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Достигнахте максималния брой гласове</AlertDialogTitle>
						<AlertDialogDescription>
							Можете да гласувате за най-много {PROJECT_VOTE_LIMIT} проекта. За да добавите{' '}
							<ProjectTitle title={title} /> към гласовете си, трябва да премахнете някой от избраните
							проекти.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Откажи</AlertDialogCancel>
						<AlertDialogAction asChild>
							<Button
								onClick={() => {
									setIsDialogOpen(false);
									// TODO: Navigate to votes page or show vote management UI
								}}
							>
								Управлявай гласове
							</Button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			) : null}
		</AlertDialog>
	);
}

function ProjectTitle({ title }: { title: string }) {
	if (title.length > 20) {
		return 'този проект';
	}
	return <strong>{title}</strong>;
}
