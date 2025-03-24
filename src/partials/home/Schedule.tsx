'use client';

import { useEffect } from 'react';
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
				<h2 className="mb-8 bg-gradient bg-clip-text text-5xl font-black text-transparent">Програма</h2>

				<div className="flex flex-col gap-16 pt-4">
					{SCHEDULE_DAY1.map((item) => {
						return (
							<div
								key={item.title}
								className={`flex flex-col items-center gap-4 sm:flex-row md:gap-8
										`}
							>
								<div className="flex w-full flex-col items-center justify-center gap-2 rounded-xl bg-stroke p-[2px] hover:bg-gradient sm:!aspect-square sm:w-[unset] sm:rounded-full">
									<div className="flex aspect-auto w-full flex-col items-center justify-center gap-2 rounded-xl bg-bg-color px-4 py-3 sm:!aspect-square sm:h-28 sm:w-28 sm:rounded-full sm:py-8">
										<p className="text-lg font-bold">{item.start}</p>
										<div className="h-[2px] w-full shrink-0 rounded-full bg-border" />
										<p className="text-lg font-bold">{item.end}</p>
									</div>
								</div>
								<div className="flex w-full max-w-3xl flex-col gap-2 rounded-xl bg-stroke p-[2px] hover:bg-gradient sm:w-3/5">
									<div className="flex w-full flex-col gap-2 rounded-xl bg-bg-color p-4">
										<h3 className="mr-4 text-3xl font-bold">{item.title}</h3>
										<div className="h-[2px] w-full rounded-full bg-border" />
										<div
											className="text-gray-500 text-lg"
											dangerouslySetInnerHTML={{
												__html: item.description,
											}}
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</section>
		</>
	);
}

export default Schedule;
