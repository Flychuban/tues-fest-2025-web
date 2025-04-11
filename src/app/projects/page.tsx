import { TF_TITLE } from '@/constants/seo';
import ProjectsPath, { type PathItem } from '@/partials/layout/ProjectsPath';
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
		<div className="container mx-auto space-y-5 px-3">
			<ProjectsPath path={PATH} />

			<ProjectFilter current="Всички" />

			<ProjectList projects={projects} />
		</div>
	);
};

export default ProjectsPage;
