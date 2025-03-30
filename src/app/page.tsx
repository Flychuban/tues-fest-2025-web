'use client';

import Expectations from '@/partials/home/Expectations';
import Logos from '@/partials/home/Logos';
import Schedule from '@/partials/home/Schedule';
import Sponsors from '@/partials/home/Sponsors';
import Statistics from '@/partials/home/Statistics';
import Testimonial from '@/partials/home/Testimonial';

export default function Home() {
	return (
		<main className="mx-auto">
			<section className="flex min-h-screen w-full flex-col items-center justify-center gap-4 overflow-hidden p-1 pt-4 sm:p-4 md:gap-16 ">
				<Logos />
			</section>
			<div className="mx-6 max-w-screen-2xl md:mx-20 2xl:m-auto">
				<Statistics />
			</div>
			<div className="m-auto w-full max-w-screen-2xl">
				<Expectations />
				<Schedule />
				<Sponsors />
				<Testimonial />
			</div>
		</main>
	);
}
