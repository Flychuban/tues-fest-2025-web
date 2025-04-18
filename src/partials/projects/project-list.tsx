'use client';

import { useMemo } from 'react';
import { useQueryState } from 'nuqs';

import { ProjectType } from '@/app/projects/actions';
import { filterItems } from '@/lib/filter';
import { ProjectCard } from './project/project-card';

export function ProjectList({ projects }: { projects: ProjectType[] }) {
	const [search] = useQueryState('search');

	const filteredProjects = useMemo(
		() =>
			search
				? filterItems(
						projects.sort((a, b) => a.id - b.id),
						search,
						(p) => [p.title, p.description, ...p.contributors.flatMap((c) => [c.name, c.class])]
					)
				: projects,
		[search, projects]
	);

	return (
		<div className="inline-grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			{filteredProjects.map((project) => (
				<ProjectCard key={project.title} project={project} />
			))}
		</div>
	);
}
