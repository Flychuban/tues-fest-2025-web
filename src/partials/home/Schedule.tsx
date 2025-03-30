'use client';

import { useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SCHEDULE_DAY1 } from '@/constants/home/schedule';

function Schedule() {
	useEffect(() => {
		const hash = window.location.hash;
		if (hash === '#schedule') {
			setTimeout(() => {
				const el = document.getElementById('schedule');
				if (el) {
					el.scrollIntoView({ behavior: 'smooth' });
				}
			}, 0);
		}
	}, []);

	return (
		<>
			<section id="schedule" className='gap-16" relative z-20 flex flex-col px-6 py-6 md:px-8'>
				<h2 className="text-accent-foreground font-title mb-8 text-5xl font-black">Програма</h2>

				<div className="flex flex-col gap-16 pt-4">
					{SCHEDULE_DAY1.map((item) => (
						<div key={item.title} className="flex flex-col gap-4 sm:flex-row sm:items-start md:gap-6">
							{/* Time Card */}
							<Card className="w-full shrink-0 sm:w-32">
								<CardContent className="flex flex-col items-center justify-center p-4 text-center">
									<p className="text-primary text-lg font-semibold">{item.start}</p>
									<Separator className="my-2" />
									<p className="text-primary text-lg font-semibold">{item.end}</p>
								</CardContent>
							</Card>

							{/* Content Card */}
							<Card className="w-full">
								<CardHeader className="pb-2">
									<CardTitle>{item.title}</CardTitle>
								</CardHeader>
								<Separator className="mx-6" />
								<CardContent className="pt-4">
									<div
										className="text-muted-foreground"
										dangerouslySetInnerHTML={{
											__html: item.description,
										}}
									/>
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			</section>
		</>
	);
}

export default Schedule;
