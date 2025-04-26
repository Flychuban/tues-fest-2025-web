import { TF_TITLE } from '@/constants/seo';
import ProjectsPath, { type PathItem } from '@/partials/layout/ProjectsPath';
import { ProjectContainer } from '@/partials/projects/project-container';
import { InteractiveProjectFilter } from '@/partials/projects/project-filter/static';
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
	const shuffledProjects = [...projects].sort(() => Math.random() - 0.5);

	return (
		<ProjectContainer>
			<ProjectsPath path={PATH} />

			<InteractiveProjectFilter current="Всички" />

			<ProjectList projects={shuffledProjects} />
		</ProjectContainer>
	);
};

export default ProjectsPage;
