import { TF_TITLE } from '@/constants/seo';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import { ProjectContainer } from '@/partials/projects/project-container';
import { ProjectFilter } from '@/partials/projects/project-filter';

const PATH: {
	name: string;
	url: string;
}[] = [
	{
		name: TF_TITLE,
		url: '/',
	},
	{
		name: 'Проекти',
		url: '',
	},
];

const ProjectsLoading = () => {
	return (
		<ProjectContainer>
			<ProjectsPath path={PATH} />

			<ProjectFilter current={null} />
		</ProjectContainer>
	);
};

export default ProjectsLoading;
