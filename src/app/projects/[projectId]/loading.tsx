import { TF_TITLE } from '@/constants/seo';
import ProjectsPath from '@/partials/layout/ProjectsPath';

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
		url: '/projects',
	},
];

const ProjectLoading = () => {
	return <ProjectsPath path={PATH} />;
};

export default ProjectLoading;
