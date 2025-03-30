'use client';

import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TESTIMONIALS, TESTIMONIALS_TITLE } from '@/constants/home/testimonials';
import Quote from './testimonial/Quote';

const Testimonial = () => {
	const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
	return (
		<section className="relative z-20 min-h-[36rem] w-full p-8 md:p-12">
			<div className="flex h-full min-h-full flex-col justify-between gap-8">
				<div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
					<h2 className="bg-gradient bg-clip-text text-5xl font-black text-transparent">
						{TESTIMONIALS_TITLE}
					</h2>
				</div>
				<div className="flex justify-center">
					<Carousel
						opts={{
							loop: true,
						}}
						className="max-w-5/6 lg:max-w-1/2 w-full"
						plugins={[plugin.current]}
						onMouseEnter={plugin.current.stop}
						onMouseLeave={plugin.current.reset}
					>
						<CarouselContent className="">
							{TESTIMONIALS.map((item) => (
								<CarouselItem className="self-center" key={item.img.src}>
									<Quote
										img={item.img}
										name={item.testimonyName}
										text={item.testimonyBody}
										desc={item.testimonyDesc}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="" />
						<CarouselNext />
					</Carousel>
				</div>
			</div>
		</section>
	);
};

export default Testimonial;
