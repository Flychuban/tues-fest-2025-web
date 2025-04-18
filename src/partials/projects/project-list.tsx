'use client';

import { useMemo } from 'react';
import { useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProjectType } from '@/app/projects/actions';
import { filterItems } from '@/lib/filter';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { ProjectCard } from './project/project-card';

export function ProjectList({ projects }: { projects: ProjectType[] }) {
	const [search, setSearch] = useQueryState('search');
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

	if (filteredProjects.length === 0) {
		return (
			<Card className="p-10 text-center">
				<h3 className="text-2xl font-bold">Няма намерени проекти</h3>
				<p className="text-muted-foreground text-lg">
					Не успяхме да намерим проекти, съответстващи на вашето търсене.
				</p>
				{debouncedSearch && (
					<Button onClick={() => setSearch(null)} variant="outline" className="mx-auto w-fit">
						Изчисти търсенето
					</Button>
				)}
			</Card>
		);
	}

	return (
		<div className="inline-grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			{filteredProjects.map((project) => (
				<ProjectCard key={project.title} project={project} />
			))}
		</div>
	);
}
