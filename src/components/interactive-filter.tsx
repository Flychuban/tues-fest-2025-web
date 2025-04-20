'use client';

import React, { use } from 'react';
import { useQueryState } from 'nuqs';
import invariant from 'tiny-invariant';

import { CategoryLinkText, FilterLinkList } from '@/components/filter-section';
import { SearchInput } from '@/components/ui/search-input';

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

export function InteractiveProjectList({
	children,
	ordererdProjectIds,
}: {
	children: React.ReactNode;
	ordererdProjectIds: number[];
}) {
	const projects = use(projectsPromise);
	const [search] = useQueryState('search');

	if (!search) return children;

	const childrenCount = React.Children.count(children);
	invariant(
		childrenCount === ordererdProjectIds.length,
		`[InteractiveProjectList] Number of children must match number of ordered project ids passed. Expected ${childrenCount}, got ${ordererdProjectIds.length}`
	);

	return React.Children.toArray(children)
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
}
