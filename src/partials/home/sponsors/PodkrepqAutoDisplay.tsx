'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Podkrepqsht } from '@/constants/home/sponsors';
// import { getHackathonById } from '../_configs/archive';
// import { Podkrepqsht } from '../_configs/podkrepq';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';
import invariant from 'tiny-invariant';

const readMoreClasses =
	'rounded-sm font-bold text-black ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-black focus-visible:ring-offset-2';
const readMoreText = 'Покажи повече';

export default function PodkrepqAutoDisplay({
	podkrepqshti,
	imagePriority,
}: {
	podkrepqshti: Podkrepqsht[];
	imagePriority?: boolean;
}) {
	const [liveIndex, setLiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const nextIndex = liveIndex < podkrepqshti.length - 1 ? liveIndex + 1 : 0;
	const prevIndex = liveIndex === 0 ? podkrepqshti.length - 1 : liveIndex - 1;
	const prevPervIndex = prevIndex === 0 ? podkrepqshti.length - 1 : prevIndex - 1;
	const nextNextIndex = nextIndex < podkrepqshti.length - 1 ? nextIndex + 1 : 0;

	useEffect(() => {
		if (isPaused) return;
		const intervalId = setInterval(() => {
			setLiveIndex((prevIndex) => (prevIndex === podkrepqshti.length - 1 ? 0 : prevIndex + 1));
		}, 5000);
		return () => clearInterval(intervalId);
	}, [liveIndex, podkrepqshti.length, isPaused]);

	const livePodkrepqsht = podkrepqshti[liveIndex];
	invariant(livePodkrepqsht, 'Invalid sponsor/partner index');

	return (
		<div className="flex flex-wrap items-center justify-center align-middle">
			<ul className="relative mx-auto mt-20 w-64 sm:w-72 md:w-80 lg:w-96">
				<div className="pb-[50%] pt-[20%]">
					{podkrepqshti.map((podkrepqsht, index) => (
						<PodkrepqLogo
							key={podkrepqsht.name}
							podkrepqsht={podkrepqsht}
							index={index}
							prevIndex={prevIndex}
							liveIndex={liveIndex}
							nextIndex={nextIndex}
							nextNextIndex={nextNextIndex}
							prevPrevIndex={prevPervIndex}
							onClick={() => setLiveIndex(index)}
							priority={[prevIndex, liveIndex, nextIndex].includes(index) && imagePriority}
						/>
					))}
				</div>
			</ul>
			<div className="ml-10 hidden h-96 items-center md:mt-10 md:flex md:w-[400px] lg:mt-20 lg:w-[600px]">
				<Card className="flex w-full flex-col p-2">
					<CardTitle className="pt-5 text-center text-black">{livePodkrepqsht.name}</CardTitle>
					<CardContent className="h-full flex-shrink flex-grow p-5 text-black">
						<div className="h-full">
							{shouldShowDescription(livePodkrepqsht.description) ? (
								<>
									<div className="flex h-24 flex-shrink flex-grow flex-col overflow-clip">
										<div className="inline-flex h-full flex-1 flex-shrink flex-grow [mask-image:linear-gradient(to_bottom,white,calc(100%-20px),transparent)]">
											{livePodkrepqsht.description.split('\n').map((p) => (
												<p key={p} className="text-black">
													{p}
												</p>
											))}
										</div>
									</div>
									<PodkrepqReadMore
										name={livePodkrepqsht.name}
										url={livePodkrepqsht.url}
										description={livePodkrepqsht.description}
										onOpenChange={setIsPaused}
									/>
								</>
							) : (
								<div className="flex h-[150px] flex-col items-center justify-center gap-1">
									<p className="text-center text-xl font-bold">
										Благодарим на {livePodkrepqsht.name} за подкрепата!
									</p>
									<p>
										<Link href={livePodkrepqsht.url} className={readMoreClasses} target="_blank">
											{readMoreText}
										</Link>
									</p>
								</div>
							)}
						</div>
						<div
							className="flex flex-wrap justify-center align-middle"
							title={`Издания на Hack TUES, които ${livePodkrepqsht.name} подкрепи`}
						>
							{/* {livePodkrepqsht.supportedEditions?.map((h) => {
								const hackathon = getHackathonById(h);
								if (hackathon)
									return (
										<div className="p-2" key={h}>
											{hackathon.logo}
										</div>
									);
							})} */}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

function shouldShowDescription(description?: string) {
	return description && !description.toLowerCase().includes('lorem ipsum');
}

function PodkrepqReadMore({
	name,
	description,
	url,
	onOpenChange,
}: {
	name: string;
	description: string;
	url: string;
	onOpenChange?: (open: boolean) => void;
}) {
	return (
		<Dialog onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<button className={readMoreClasses}>{readMoreText}</button>
			</DialogTrigger>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle>{name}</DialogTitle>
				</DialogHeader>
				{description?.split('\n').map((p) => <p key={p}>{p}</p>)}
				<DialogFooter>
					<Button asChild variant="outline">
						<Link href={url} target="_blank">
							<Globe className="mr-2 h-4 w-4" />
							Уебсайт на {name}
						</Link>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function PodkrepqLogo({
	podkrepqsht,
	index,
	prevIndex,
	liveIndex,
	nextIndex,
	nextNextIndex,
	prevPrevIndex,
	onClick,
	priority,
}: {
	podkrepqsht: Podkrepqsht;
	index: number;
	prevIndex: number;
	liveIndex: number;
	nextIndex: number;
	nextNextIndex: number;
	prevPrevIndex: number;
	onClick: () => void;
	priority?: boolean;
}) {
	return (
		<li
			className={cn('absolute inset-0 my-4 [perspective:800px]', index === liveIndex && 'z-10')}
			title={podkrepqsht.name}
		>
			<Link
				href={podkrepqsht.url}
				onClick={
					[prevIndex, nextIndex].includes(index)
						? (e) => {
								e.preventDefault();
								onClick();
							}
						: undefined
				}
				tabIndex={[prevIndex, liveIndex, nextIndex].includes(index) ? 0 : -1}
				className={cn(
					'group z-0 grid aspect-video place-content-center overflow-clip rounded-lg bg-white p-4 opacity-0 shadow-md transition-all duration-700',
					index === prevIndex &&
						'z-10 opacity-50 [transform:rotateX(45deg)_translateY(-130%)] hover:opacity-75',
					index === liveIndex && 'z-50 opacity-100 hover:scale-[112.5%]',
					index === nextIndex &&
						'z-10 opacity-50 [transform:rotateX(-45deg)_translateY(130%)] hover:opacity-75',
					index === nextNextIndex &&
						'pointer-events-none opacity-0 [transform:translateY(110%)_rotateX(-90deg)_translateY(100%)]',
					index === prevPrevIndex &&
						'pointer-events-none opacity-0 [transform:translateY(-110%)_rotateX(90deg)_translateY(-100%)]',
					podkrepqsht.name == 'Yettel Bulgaria' && 'bg-[#B4FF00]',
					podkrepqsht.name == 'Инженер.bg' &&
						'bg-[linear-gradient(180deg,_#24587d_0%,_#1578b2_68%,_#1578b2_100%)]'
				)}
				target="_blank"
			>
				<Image
					className={cn(
						'h-[8rem] max-w-[14.2rem] object-contain px-3 py-5 sm:h-[9rem] sm:max-w-[16rem] md:h-[10rem] md:max-w-[17.7rem] lg:h-[12rem] lg:max-w-[21.3rem]',
						index === prevIndex && 'z-10',
						index === liveIndex && 'z-50',
						index === nextIndex && 'z-10 ',
						index === nextNextIndex && 'z-0',
						index === prevPrevIndex && 'z-0'
					)}
					src={podkrepqsht.logo}
					alt={podkrepqsht.name}
					priority={priority}
				/>
			</Link>
		</li>
	);
}
