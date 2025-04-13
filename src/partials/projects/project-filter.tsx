import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PROJECT_CATEGORY_MAP } from '@/constants/projects';

const CATEGORIES = [
	{
		text: 'Всички',
		category: 'all',
		href: '/projects',
	},
	PROJECT_CATEGORY_MAP.embedded,
	PROJECT_CATEGORY_MAP.software,
	{ ...PROJECT_CATEGORY_MAP.networks, text: 'Мрежи' },
] as const;

const CategoryLink = ({ text, href, current }: { text: string; href: string; current: boolean }) => (
	<Button variant={current ? 'default' : 'outline'} size="lg" asChild>
		<Link href={href}>{text}</Link>
	</Button>
);

export function ProjectFilter({ current }: { current: (typeof CATEGORIES)[number]['text'] | null }) {
	return (
		<section>
			<Card className="rounded-lg border-2 px-5 py-4">
				<div className="z-50 -mx-4 flex flex-wrap items-center justify-between">
					<div className="w-full px-4">
						<div className="flex flex-wrap justify-center gap-4 overflow-x-auto lg:justify-start">
							{CATEGORIES.map((tab) => (
								<CategoryLink key={tab.href} {...tab} current={tab.text === current} />
							))}
						</div>
					</div>
				</div>
			</Card>
		</section>
	);
}
