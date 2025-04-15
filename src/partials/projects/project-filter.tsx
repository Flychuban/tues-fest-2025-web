'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
	const [search, setSearch] = useQueryState('search');

	return (
		<section>
			<Card className="rounded-lg px-5 py-4">
				<div className="z-50 -mx-4 flex flex-wrap items-center justify-between">
					<div className="flex w-full flex-col justify-between gap-4 px-4 lg:flex-row">
						<div className="flex flex-wrap justify-center gap-4 overflow-x-auto lg:justify-start">
							{CATEGORIES.map((tab) => (
								<CategoryLink
									key={tab.href}
									{...tab}
									{...(search && {
										href: `${tab.href}?${new URLSearchParams({ search }).toString()}`,
									})}
									current={tab.text === current}
								/>
							))}
						</div>
						<SearchInput search={search} setSearch={setSearch} />
					</div>
				</div>
			</Card>
		</section>
	);
}

function SearchInput(props: { search: string | null; setSearch: (search: string | null) => void }) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const controller = new AbortController();

		document.addEventListener(
			'keydown',
			(e: KeyboardEvent) => {
				const isCtrlF = (e.ctrlKey || e.metaKey) && e.key === 'f';
				const isSlash = e.key === '/';

				if ((isCtrlF || isSlash) && document.activeElement !== inputRef.current) {
					e.preventDefault();
					inputRef.current?.focus();
				}
			},
			{ signal: controller.signal }
		);

		return () => controller.abort();
	}, []);

	return (
		<div className="grow-1 relative flex items-center lg:max-w-lg">
			<Input
				ref={inputRef}
				className="h-10 pl-8 lg:pr-7"
				placeholder="Търси сред проектите..."
				value={props.search ?? ''}
				onChange={(e) => props.setSearch(e.target.value || null)}
			/>
			<Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
			<kbd className="pointer-events-none absolute right-2 top-1/2 hidden size-4 -translate-y-1/2 select-none text-sm tracking-widest opacity-60 lg:inline-flex">
				⌘F
			</kbd>
		</div>
	);
}
