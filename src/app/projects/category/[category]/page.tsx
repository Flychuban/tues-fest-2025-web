// IMPORTATN - THIS IS THE DUMBES SOLUTION, BUT I WANT SWEEEET SERVER COMPONENTS
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { isProjectCategory, PROJECT_CATEGORIES, PROJECT_CATEGORY_MAP } from '@/constants/projects';
import { TF_TITLE } from '@/constants/seo';
import ProjectsPath, { PathItem } from '@/partials/layout/ProjectsPath';
import { ProjectFilter } from '@/partials/projects/project-filter';
import { ProjectList } from '@/partials/projects/project-list';
import { getProjectsByCategory } from '../../actions';

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

export function generateStaticParams() {
	return Object.keys(PROJECT_CATEGORIES).map((category) => ({
		category,
	}));
}

export default async function ProjectsPage(props: {
	params: Promise<{
		category: string;
	}>;
}) {
	const params = await props.params;
	const category = params.category.toString();

	if (!isProjectCategory(category) || category === 'battlebot') {
		redirect('/projects');
	}

	const projects = await getProjectsByCategory(category);

	projects?.sort(() => Math.random() - 0.5);

	return (
		<div className="container mx-auto space-y-5 px-3">
			<ProjectsPath path={PATH} />

			{/* HACK: weird inconsistency in the names, this is a code smell... */}
			<ProjectFilter current={category === 'networks' ? 'Мрежи' : PROJECT_CATEGORIES[category]} />

			<ProjectList projects={projects} />
		</div>
	);
}
