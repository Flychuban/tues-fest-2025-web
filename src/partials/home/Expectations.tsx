import { ReactElement } from 'react';

import { EXPECTATIONS } from '@/constants/home/expectations';

const Expectation = ({ icon, title, text }: { icon: ReactElement; title: string; text: string }) => (
	<div className=" w-full md:w-2/5 lg:w-1/3 2xl:w-1/4">
		<div className="group mb-10 h-full rounded-xl border border-[#FEFEFE] bg-opacity-0 p-7 backdrop-blur-sm backdrop-filter transition-all duration-300 hover:scale-105 sm:border-2 sm:backdrop-blur-md">
			<div className="bg-stroke mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full">{icon}</div>
			<h3 className="mb-2 text-xl font-bold text-white transition">{title}</h3>
			<p className="text-body-color text-base font-medium">{text}</p>
		</div>
	</div>
);

const Expectations = () => (
	<section id="expectations" className="relative z-20 flex flex-col gap-8 p-8 md:px-12">
		<h2 className="bg-gradient bg-clip-text text-5xl font-black text-transparent">На ТУЕС Фест очаквайте</h2>
		<div className="flex flex-wrap items-stretch justify-center gap-4">
			{EXPECTATIONS.map((expectation) => (
				<Expectation key={expectation.title} {...expectation} />
			))}
		</div>
	</section>
);

export default Expectations;
