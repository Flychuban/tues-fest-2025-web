import { ProjectType } from '@/app/projects/actions';
import { ProjectCard } from './project/project-card';

export function ProjectList({ projects }: { projects: ProjectType[] }) {
	return (
		<div className="inline-grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
			{projects.map((project) => (
				<ProjectCard key={project.title} project={project} />
			))}
		</div>
	);
}
