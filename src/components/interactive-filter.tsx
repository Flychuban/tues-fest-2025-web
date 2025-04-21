'use client';

import React, { use } from 'react';
import { useQueryState } from 'nuqs';
import invariant from 'tiny-invariant';

import { CategoryLinkText, FilterLinkList } from '@/components/filter-section';
import { SearchInput } from '@/components/ui/search-input';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function InteractiveFilterLinkList({ current }: { current: CategoryLinkText | null }) {
	const [search] = useQueryState('search');

	return <FilterLinkList current={current} search={search} />;
}

export function InteractiveSearchInput() {
	const [search, setSearch] = useQueryState('search');

	return (
		<SearchInput
			value={search ?? ''}
			onChange={(e) => setSearch(e.target.value || null)}
			onBlur={(e) => setSearch(e.target.value.trim() || null)}
		/>
	);
}

// HACK: If the site uses a DB, we cannot import this module on the client
const projectsPromise = import('@/app/projects/adapter').then(
	(module) => new Map(module.PROJECTS.map((project) => [project.id, project]))
);

export function InteractiveFilteredProjects({
	children,
	ordererdProjectIds,
}: {
	children: React.ReactNode;
	ordererdProjectIds: number[];
}) {
	const projects = use(projectsPromise);
	const [search, setSearch] = useQueryState('search');

	if (!search) return children;

	const childrenCount = React.Children.count(children);
	invariant(
		childrenCount === ordererdProjectIds.length,
		`[InteractiveProjectList] Number of children must match number of ordered project ids passed. Expected ${childrenCount}, got ${ordererdProjectIds.length}`
	);

	const filteredChildren = React.Children.toArray(children)
		.map((child, index) => {
			const project = projects.get(ordererdProjectIds[index]!);
			invariant(project, `[InteractiveProjectList] Project with id ${ordererdProjectIds[index]} not found`);
			return {
				child,
				project,
			};
		})
		.sort((a, b) => a.project.id - b.project.id)
		.filter(({ project }) => project.title.toLowerCase().includes(search?.toLowerCase() ?? ''))
		.map(({ child }) => child);

	if (filteredChildren.length === 0) {
		return (
			<Card className="p-10 text-center md:col-span-2 lg:col-span-3">
				<h3 className="text-2xl font-bold">Няма намерени проекти</h3>
				<p className="text-muted-foreground text-lg">
					Не успяхме да намерим проекти, съответстващи на вашето търсене.
				</p>
				{search && (
					<Button onClick={() => setSearch(null)} variant="outline" className="mx-auto w-fit">
						Изчисти търсенето
					</Button>
				)}
			</Card>
		);
	}

	return filteredChildren;
}
