'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ArrowRightLeft, Check } from 'lucide-react';
import { toast } from 'sonner';

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
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PROJECT_CATEGORIES, ProjectCategory } from '@/constants/projects';
import { PROJECT_VOTE_LIMIT } from '@/constants/voting';
import { cn } from '@/lib/utils';
import {
	LocalVotedProject,
	useDeselectProject,
	useProjectVoteStatus,
	useReplaceProject,
	useSelectProject,
	useVotedProjects,
} from '@/stores/vote';

export function VoteSelectProjectButton({
	project,
	className,
	size = 'lg',
	...props
}: {
	project: LocalVotedProject;
	className?: string;
	size?: React.ComponentProps<typeof Button>['size'];
}) {
	const { isSelected, hasReachedVoteLimit } = useProjectVoteStatus(project.id);
	const selectProject = useSelectProject();
	const deselectProject = useDeselectProject();
	const replaceProject = useReplaceProject();
	const votedProjects = useVotedProjects();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedReplaceId, setSelectedReplaceId] = useState<number | null>(null);

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
		deselectProject(project.id);
		setIsDialogOpen(false);
	}

	function handleConfirmReplace() {
		if (selectedReplaceId !== null) {
			const replacedProject = replaceProject(selectedReplaceId, project);
			setIsDialogOpen(false);
			setSelectedReplaceId(null);
			if (replacedProject) {
				toast.success('Проектът е заменен успешно', {
					action: {
						label: 'Отмени',
						onClick: () => {
							replaceProject(project.id, replacedProject);
						},
					},
				});
			}
		}
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
					'Избери за гласуване'
				)}
			</Button>

			{isSelected ? (
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Премахни глас</AlertDialogTitle>
						<AlertDialogDescription>
							Сигурни ли сте, че искате да премахнете гласа си за <ProjectTitle title={project.title} />?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Откажи</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirmDeselect}>Премахни глас</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			) : hasReachedVoteLimit ? (
				<AlertDialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-2xl">
					<AlertDialogHeader>
						<AlertDialogTitle>Достигнахте максималния брой гласове</AlertDialogTitle>
						<AlertDialogDescription>
							Можете да гласувате за най-много {PROJECT_VOTE_LIMIT} проекта. За да добавите{' '}
							<ProjectTitle title={project.title} /> към гласовете си, изберете кой проект искате да
							замените:
						</AlertDialogDescription>
					</AlertDialogHeader>

					<div
						className="grid grid-cols-1 gap-4 p-1 sm:grid-cols-2 md:grid-cols-3"
						role="radiogroup"
						aria-label="Изберете проект за замяна"
					>
						{votedProjects.map((votedProject) => (
							<Card
								key={votedProject.id}
								className={cn(
									'group relative cursor-pointer overflow-hidden transition-all duration-300',
									selectedReplaceId === votedProject.id && 'ring-primary ring-2'
								)}
								onClick={() => setSelectedReplaceId(votedProject.id)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault();
										setSelectedReplaceId(votedProject.id);
									}
								}}
								role="radio"
								aria-checked={selectedReplaceId === votedProject.id}
								tabIndex={0}
							>
								<div className="relative aspect-video">
									<Image
										src={votedProject.thumbnail}
										alt={`Снимка на проект ${votedProject.title}`}
										className="object-cover"
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
									/>
									<div
										className={cn(
											'absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300',
											selectedReplaceId === votedProject.id && 'opacity-100',
											'group-hover:opacity-100'
										)}
										aria-hidden="true"
									>
										<ArrowRightLeft
											className={cn(
												'size-8 text-white opacity-0 transition-opacity duration-300',
												selectedReplaceId === votedProject.id && 'opacity-100',
												'group-hover:opacity-100'
											)}
										/>
									</div>
								</div>
								<div className="p-3">
									<h3 className="line-clamp-2 text-sm font-medium">{votedProject.title}</h3>
									<p className="text-muted-foreground mt-1 text-xs">
										{PROJECT_CATEGORIES[votedProject.category]}
									</p>
								</div>
							</Card>
						))}
					</div>

					<AlertDialogFooter className="mt-4">
						<AlertDialogCancel onClick={() => setSelectedReplaceId(null)}>Откажи</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirmReplace} disabled={selectedReplaceId === null}>
							Замени
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
