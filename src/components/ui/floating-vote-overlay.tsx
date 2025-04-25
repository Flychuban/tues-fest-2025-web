'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Check, ChevronRight, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { PROJECT_CATEGORIES } from '@/constants/projects';
import { PROJECT_VOTE_LIMIT } from '@/constants/voting';
import { useTRPC } from '@/lib/trpc/react';
import { cn } from '@/lib/utils';
import { useDeselectProject, useVotedProjects } from '@/stores/vote';

export function FloatingVoteOverlay() {
	const trpc = useTRPC();
	const { data: currentVoter } = useQuery(trpc.voting.getCurrentVoter.queryOptions());
	const votedProjects = useVotedProjects();
	const deselectProject = useDeselectProject();
	const selectedCount = votedProjects.length;

	const progress = (selectedCount / PROJECT_VOTE_LIMIT) * 100;
	const isMaxSelected = selectedCount === PROJECT_VOTE_LIMIT;

	const hasVoted = !!currentVoter;
	const hasUnsavedChanges = useMemo(() => {
		const savedIdSet = new Set(currentVoter?.votes ?? []);
		const localIdSet = new Set(votedProjects.map((project) => project.id));

		if (savedIdSet.size !== localIdSet.size) return true;
		return [...savedIdSet].some((id) => !localIdSet.has(id));
	}, [currentVoter, votedProjects]);

	return (
		<div className="fixed inset-x-0 bottom-0 z-50">
			<div
				className={cn(
					'bg-card/50 flex justify-center border-t py-3 shadow-lg backdrop-blur-xl transition-all duration-300',
					isMaxSelected || (hasVoted && hasUnsavedChanges && 'bg-primary/50'),
					!hasVoted && selectedCount === 0 && 'hidden'
				)}
			>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant={isMaxSelected ? 'default' : 'ghost'} className="relative h-12 gap-2 px-6">
							<div className="flex items-center gap-3">
								<div className="flex items-center gap-2">
									<div className="relative flex h-6 w-6 items-center justify-center">
										{isMaxSelected ? (
											<Check className="text-primary-foreground size-4" />
										) : (
											<>
												<div className="absolute inset-0">
													<Progress value={progress} className="h-6 w-6 rounded-full" />
												</div>
												<span
													className={cn(
														'relative text-sm font-medium',
														isMaxSelected ? 'text-primary-foreground' : 'text-foreground'
													)}
												>
													{selectedCount}
												</span>
											</>
										)}
									</div>
									<span
										className={cn(
											'text-sm font-medium',
											isMaxSelected ? 'text-primary-foreground' : 'text-foreground'
										)}
									>
										{hasVoted
											? hasUnsavedChanges
												? 'Запазете променения глас'
												: `Гласувахте за ${selectedCount} ${
														selectedCount === 1 ? 'проект' : 'проекта'
													}`
											: isMaxSelected
												? 'Запишете своя глас'
												: `Избрахте ${PROJECT_VOTE_LIMIT - selectedCount} ${
														PROJECT_VOTE_LIMIT - selectedCount === 1 ? 'проект' : 'проекта'
													}`}
									</span>
								</div>
								<ChevronRight
									className={cn(
										'size-4 transition-transform',
										isMaxSelected ? 'text-primary-foreground' : 'text-muted-foreground'
									)}
								/>
							</div>
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Вашият глас</SheetTitle>
							<SheetDescription>
								{selectedCount === PROJECT_VOTE_LIMIT
									? !hasVoted || hasUnsavedChanges
										? 'Готови сте да запишете своя глас'
										: `Вие избрахте ${selectedCount} проекта`
									: `Може да изберете още ${PROJECT_VOTE_LIMIT - selectedCount} ${
											PROJECT_VOTE_LIMIT - selectedCount === 1 ? 'проект' : 'проекта'
										}`}
							</SheetDescription>
						</SheetHeader>

						{votedProjects.length > 0 ? (
							<ScrollArea className="flex-1">
								<div className="space-y-4 px-4">
									{votedProjects.map((project) => (
										<div
											key={project.id}
											className="bg-card/50 group relative flex gap-4 rounded-lg border p-3 backdrop-blur-sm"
										>
											<SheetClose
												asChild
												className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-md"
											>
												<Link href={`/projects/${project.id}`}>
													<Image
														src={project.thumbnail}
														alt={`Снимка на ${project.title}`}
														className="object-cover"
														fill
														sizes="128px"
													/>
												</Link>
											</SheetClose>
											<div className="flex flex-1 flex-col justify-between gap-1">
												<div>
													<h3 className="line-clamp-1 font-medium">
														<SheetClose asChild>
															<Link href={`/projects/${project.id}`}>
																{project.title}
															</Link>
														</SheetClose>
													</h3>
													<p className="text-muted-foreground line-clamp-1 text-sm">
														{PROJECT_CATEGORIES[project.category]}
													</p>
												</div>
												<button
													className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary rounded-xs focus:outline-hidden absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
													onClick={() => deselectProject(project.id)}
												>
													<X className="size-4" />
													<span className="sr-only">Премахни проект</span>
												</button>
											</div>
										</div>
									))}
								</div>
							</ScrollArea>
						) : (
							<>
								<div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2">
									<p>Нямате избрани проекти</p>
								</div>
							</>
						)}

						<SheetFooter>
							<Separator />
							{hasVoted && !hasUnsavedChanges && (
								<div className="flex flex-col gap-2 py-1">
									<p className="text-lg font-medium">Вашият глас е запазен</p>
									<p className="text-muted-foreground text-sm">
										Все още можете да добавяте и премахвате проекти към него до края на гласуването.
									</p>
								</div>
							)}
							{!hasVoted ? (
								<SheetClose asChild>
									<RegisterVoterButton />
								</SheetClose>
							) : hasUnsavedChanges ? (
								<SheetClose asChild>
									<SaveVotesButton />
								</SheetClose>
							) : (
								<SheetClose asChild>
									<Button className="w-full" size="lg" variant="outline" asChild>
										<Link href="/projects">Промени глас</Link>
									</Button>
								</SheetClose>
							)}
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}

function RegisterVoterButton(props: React.ComponentProps<typeof Button>) {
	const votedProjects = useVotedProjects();
	const selectedCount = votedProjects.length;

	return (
		<Button className="w-full" size="lg" disabled={selectedCount === 0} {...props}>
			{selectedCount === 0
				? 'Изберете поне един проект'
				: `Гласувайте за ${selectedCount} ${selectedCount === 1 ? 'проект' : 'проекта'}`}
		</Button>
	);
}

function SaveVotesButton(props: React.ComponentProps<typeof Button>) {
	const votedProjects = useVotedProjects();
	const selectedCount = votedProjects.length;

	return (
		<Button className="w-full" size="lg" disabled={selectedCount === 0} {...props}>
			Запазете промените
		</Button>
	);
}
