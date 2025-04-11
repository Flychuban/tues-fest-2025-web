'use client';

import Link from 'next/link';
import { ChevronDown, Clock4, MapPin, Rocket } from 'lucide-react';

import Countdown from '@/components/countdown';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TF_DATE_STRING, TF_LOCATION, TF_YEAR } from '@/constants/event';
import { cn } from '@/lib/utils';

export default function EventLanding() {
	return (
		<div className="mx-auto w-11/12 sm:w-2/3 md:w-3/4 lg:w-1/2">
			<Card>
				<CardContent className="flex flex-col gap-6 p-4 sm:p-6 md:p-8">
					{/* Logo section */}
					<div className="relative flex flex-col items-center justify-center text-center">
						<h1>
							<span className="font-glitch text-primary block text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
								TUES FEST
							</span>
							<span className="font-glitch text-3xl text-indigo-500 sm:text-4xl md:text-5xl lg:text-6xl">
								{TF_YEAR}
							</span>
						</h1>
						<p className="font-title text-foreground/90 mt-8 text-xl tracking-widest sm:text-2xl md:text-3xl">
							IT ALL STARTS HERE
						</p>
					</div>

					<Separator className="bg-border" />

					<Countdown />

					<Button size="xl" className="font-bold uppercase" asChild>
						<Link href="/projects">
							<Rocket className="mr-2 size-5" />
							<span>Разгледай проектите</span>
						</Link>
					</Button>

					{/* Event details - flex-col on mobile, flex-row on desktop */}
					<div className="flex flex-col items-stretch gap-4 text-center sm:flex-row sm:gap-6">
						<div
							className={cn(
								buttonVariants({ variant: 'outline', size: 'xl' }),
								'flex w-full items-center justify-center gap-2 sm:flex-1'
							)}
						>
							<Clock4 className="text-primary h-5 w-5" />
							<p className="text-foreground">{TF_DATE_STRING}</p>
						</div>

						<Button
							variant="outline"
							size="xl"
							asChild
							className="flex w-full items-center justify-center gap-2 sm:flex-1"
						>
							<Link href="/location">
								<MapPin className="text-primary h-5 w-5" />
								<span>{TF_LOCATION}</span>
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
			<div className="hidden justify-center py-6 sm:flex">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								asChild
								variant="secondary"
								size="icon"
								className="bg-secondary/50 size-12 backdrop-blur-lg motion-safe:animate-bounce"
							>
								<Link href="#about">
									<ChevronDown className="stroke-[4]" size={24} />
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Виж повече</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
}
