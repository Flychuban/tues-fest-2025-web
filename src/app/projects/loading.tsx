import { Card } from '@/components/ui/card';
import { PROJECT_CATEGORIES } from '@/constants/projects';
import { TF_TITLE } from '@/constants/seo';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import { ProjectFilter } from '@/partials/projects/project-filter';
import { ProjectList } from '@/partials/projects/project-list';

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
		<div className="container mx-auto space-y-5 px-3">
			<ProjectsPath path={PATH} />

			<ProjectFilter current={null} />
		</div>
	);
};

export default ProjectsLoading;
