import { Suspense } from 'react';

import { InteractiveFilteredProjects } from '@/components/interactive-filter';
import { ProjectType } from '@/app/projects/actions';
import { ProjectCard } from './project/project-card';

export function ProjectList({ projects }: { projects: readonly ProjectType[] }) {
	const projectCards = projects.map((project) => <ProjectCard key={project.title} project={project} />);

	return (
		<div className="inline-grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			<Suspense fallback={projectCards}>
				<InteractiveFilteredProjects ordererdProjectIds={projects.map((project) => project.id)}>
					{projectCards}
				</InteractiveFilteredProjects>
			</Suspense>
		</div>
	);
}
