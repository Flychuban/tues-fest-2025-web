'use client';

import { useMemo } from 'react';
import { useQueryState } from 'nuqs';

import { ProjectType } from '@/app/projects/actions';
import { filterItems } from '@/lib/filter';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { ProjectCard } from './project/project-card';

export function ProjectList({ projects }: { projects: ProjectType[] }) {
	const [search] = useQueryState('search');
	const debouncedSearch = useDebounce(search, 300);

	const filteredProjects = useMemo(
		() =>
			debouncedSearch
				? filterItems(
						projects.sort((a, b) => a.id - b.id),
						debouncedSearch,
						(p) => [p.title, p.description, ...p.contributors.flatMap((c) => [c.name, c.class])]
					)
				: projects,
		[debouncedSearch, projects]
	);

	return (
		<div className="inline-grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			{filteredProjects.map((project) => (
				<ProjectCard key={project.title} project={project} />
			))}
		</div>
	);
}
