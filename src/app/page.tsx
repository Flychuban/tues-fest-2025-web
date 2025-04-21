import { Card, CardContent } from '@/components/ui/card';
import About from '@/partials/home/About';
import Expectations from '@/partials/home/Expectations';
import EventLanding from '@/partials/home/Logos';
import Schedule from '@/partials/home/Schedule';
import Sponsors from '@/partials/home/Sponsors';
import Statistics from '@/partials/home/Statistics';
import Testimonial from '@/partials/home/Testimonial';

export const revalidate = 0;

export default function Home() {
	return (
		<>
			<section className="flex min-h-[calc(100vh-var(--header-height))] w-full flex-col items-center justify-center gap-4 overflow-hidden p-1 pt-4 sm:p-4 md:gap-16 ">
				<EventLanding />
			</section>
			<div className="mx-6 max-w-screen-2xl md:mx-20 2xl:m-auto">
				<Card>
					<CardContent className="p-6 md:p-8">
						<About />
						<Statistics />
					</CardContent>
				</Card>
			</div>
			<div className="mx-auto w-full max-w-screen-2xl">
				<Expectations />
				<Schedule />
				<Sponsors />
				<Testimonial />
			</div>
		</>
	);
}
