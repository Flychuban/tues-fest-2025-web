'use client';

import Link from 'next/link';
import { Clock4, MapPin } from 'lucide-react';

import Countdown from '@/components/countdown';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TF_DATE_STRING, TF_LOCATION, TF_YEAR } from '@/constants/event';
import { cn } from '@/lib/utils';

export default function EventLanding() {
	return (
		<div className="mx-auto w-11/12 sm:w-2/3 md:w-3/4 lg:w-1/2">
			<Card className="bg-background/80 border-border backdrop-blur-sm">
				<CardContent className="flex flex-col gap-6 p-4 sm:p-6 md:p-8">
					{/* Logo section */}
					<div className="relative flex flex-col items-center justify-center text-center">
						<h1>
							<span className="font-glitch text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
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

					{/* Event details - flex-col on mobile, flex-row on desktop */}
					<div className="flex flex-col items-stretch gap-4 text-center sm:flex-row sm:gap-6">
						<div
							className={cn(
								buttonVariants({ variant: 'outline' }),
								'flex h-auto w-full items-center justify-center gap-2 sm:flex-1'
							)}
						>
							<Clock4 className="text-primary h-5 w-5" />
							<p className="text-foreground">{TF_DATE_STRING}</p>
						</div>

						<Link
							href="/location"
							className={cn(
								buttonVariants({ variant: 'outline' }),
								'flex h-auto w-full items-center justify-center gap-2 sm:flex-1'
							)}
						>
							<MapPin className="text-primary h-5 w-5" />
							<span>{TF_LOCATION}</span>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
