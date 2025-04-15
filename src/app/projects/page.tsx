import { NuqsAdapter } from 'nuqs/adapters/next';

import { TF_TITLE } from '@/constants/seo';
import ProjectsPath, { type PathItem } from '@/partials/layout/ProjectsPath';
import { ProjectContainer } from '@/partials/projects/project-container';
import { ProjectFilter } from '@/partials/projects/project-filter';
import { ProjectList } from '@/partials/projects/project-list';
import { getProjects } from './actions';

const PATH: PathItem[] = [
	{
		name: TF_TITLE,
		url: '/',
	},
	{
		name: 'Проекти',
		url: '',
	},
];

const ProjectsPage = async () => {
	const projects = await getProjects();
	//shuffle projects
	projects.sort(() => Math.random() - 0.5);

	return (
		<ProjectContainer>
			<ProjectsPath path={PATH} />

			<NuqsAdapter>
				<ProjectFilter current="Всички" />

				<ProjectList projects={projects} />
			</NuqsAdapter>
		</ProjectContainer>
	);
};

export default ProjectsPage;
