import Link from 'next/link';

import { PROJECT_CATEGORY_MAP } from '@/constants/projects';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function FilterSectionContainer({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<Card className="rounded-lg px-5 py-4">
				<div className="z-50 -mx-4 flex flex-wrap items-center justify-between">
					<div className="flex w-full flex-col items-center justify-between gap-4 px-4 lg:flex-row">
						{children}
					</div>
				</div>
			</Card>
		</section>
	);
}

interface CategoryLink {
	text: string;
	href: string;
}

interface CategoryLinkProps extends CategoryLink {
	isCurrent: boolean;
	search: string | null;
}

function CategoryLink({ text, href, isCurrent, search }: CategoryLinkProps) {
	return (
		<Button variant={isCurrent ? 'default' : 'outline'} size="lg" asChild>
			<Link href={search ? `${href}?${new URLSearchParams({ search })}` : href}>{text}</Link>
		</Button>
	);
}

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

export type CategoryLinkText = (typeof CATEGORIES)[number]['text'];

type CategoryLinkListProps = {
	current: CategoryLinkText | null;
	search: string | null;
};

export function FilterLinkList({ current, search }: CategoryLinkListProps) {
	return (
		<div className="flex flex-wrap justify-center gap-4 overflow-x-auto lg:justify-start">
			{CATEGORIES.map((link) => (
				<CategoryLink key={link.href} {...link} search={search} isCurrent={link.text === current} />
			))}
		</div>
	);
}
