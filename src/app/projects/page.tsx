import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TF_TITLE } from '@/constants/seo';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import { ProjectFilter } from '@/partials/projects/project-filter';
import { ProjectList } from '@/partials/projects/project-list';
import { getProjects } from './actions';

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
