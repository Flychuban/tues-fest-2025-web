import Image from 'next/image';

import { GradientHeading } from '@/components/ui/gradient-heading';

const CATEGORIES = [
	{
		name: 'Софтуер',
		img: '/assets/projects/categories/software.png',
	},
	{
		name: 'Роботика',
		img: '/assets/projects/categories/robotics.png',
	},
	{
		name: 'Батъл ботове',
		img: '/assets/projects/categories/battlebots.png',
	},
	{
		name: 'Компютърни мрежи',
		img: '/assets/projects/categories/networks.png',
	},
];

const Category = ({ name, img }: { name: string; img: string }) => (
	<div className="relative aspect-video w-full duration-300 hover:scale-105 sm:w-8/12 md:w-2/5">
		<div className="absolute h-full w-full">
			{/* <div className="w-full h-full bg-gradient-to-b from-black to-transparent" />
			<div className="w-full h-full bg-gradient-to-t from-black to-transparent" /> */}
		</div>
		<div className="absolute flex h-full w-full items-center justify-center">
			<h3 className="text-center text-3xl font-bold text-white drop-shadow-2xl">{name}</h3>
		</div>
		<img src={img} alt={name} className="h-full w-full rounded-lg border object-cover" />
	</div>
);

const ComingSoon = () => (
	<div className="flex min-h-screen flex-col items-center gap-8 px-8 pb-16 pt-32 md:px-12">
		<GradientHeading size="lg">Очаквайте скоро</GradientHeading>
		<div className="flex h-full w-full flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
			{CATEGORIES.map((category) => (
				<Category key={category.name} {...category} />
			))}
		</div>
	</div>
);

export default ComingSoon;
