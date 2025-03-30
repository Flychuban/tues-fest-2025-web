'use client';

import Link from 'next/link';
import { Clock4, MapPin } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TF_DATE_STRING, TF_LOCATION } from '@/constants/event';
import { cn } from '@/lib/utils';

export default function EventLanding() {
	return (
		<div className="mx-auto w-11/12 sm:w-2/3 md:w-3/4 lg:w-1/2">
			<Card className="bg-background/80 border-border backdrop-blur-sm">
				<CardContent className="flex flex-col gap-6 p-4 sm:p-6 md:p-8">
					{/* Desktop logo section */}
					<div className="hidden md:block">
						<div className="flex w-full">
							<img src="/35.png" alt="35elsys" className="h-auto w-2/6" />
							<img src="/moto1.png" alt="tues-fest-moto" className="h-auto w-2/3" />
						</div>
					</div>

					{/* Mobile logo section */}
					<div className="block md:hidden">
						<img src="/assets/TitleMobile.webp" alt="titleMobile" className="w-full" />
						<div className="mt-2 flex w-full">
							<img src="/35.png" alt="35elsys" className="h-auto w-2/6" />
							<img src="/moto1.png" alt="tues-fest-moto" className="h-auto w-2/3" />
						</div>
					</div>

					<Separator className="bg-border" />

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
