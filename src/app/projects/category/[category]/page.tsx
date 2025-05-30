import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';

import { isProjectCategory, PROJECT_CATEGORIES } from '@/constants/projects';
import { TF_TITLE } from '@/constants/seo';
import ProjectsPath, { PathItem } from '@/partials/layout/ProjectsPath';
import { ProjectContainer } from '@/partials/projects/project-container';
import { InteractiveProjectFilter, ProjectFilter } from '@/partials/projects/project-filter/static';
import { ProjectList } from '@/partials/projects/project-list';
import { getProjectsByCategory } from '../../actions';

const PATH: PathItem[] = [
	{
		name: TF_TITLE,
		url: '/',
	},
	{
		name: 'Проекти',
		url: '/projects',
	},
];

export function generateStaticParams() {
	return Object.keys(PROJECT_CATEGORIES).map((category) => ({
		category,
	}));
}

type PageProps = {
	params: Promise<{
		category: string;
	}>;
};

export async function generateMetadata(props: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
	const params = await props.params;
	const category = params.category.toString();

	if (!isProjectCategory(category)) {
		return {};
	}

	const newDescriptionSentence = `Разгледайте ученическите проекти на ${TF_TITLE} в категорията "${PROJECT_CATEGORIES[category]}"`;

	const alterDescription = (original: string) => {
		const sentences = original.split('.');
		sentences[0] = newDescriptionSentence;
		return sentences.join('.');
	};

	const parentMetadata = await parent;

	return {
		title: {
			absolute: `${PROJECT_CATEGORIES[category]} – Проекти на ${TF_TITLE}`,
		},
		description: alterDescription(parentMetadata.description ?? ''),
		openGraph: {
			title: `Категория "${PROJECT_CATEGORIES[category]}" – Проекти на ${TF_TITLE}`,
			description: `${newDescriptionSentence}.`,
		},
		twitter: {
			title: `Проекти в ${PROJECT_CATEGORIES[category]} на ${TF_TITLE}`,
			description: `${newDescriptionSentence}.`,
			card: 'summary_large_image',
		},
	};
}

export default async function ProjectsPage(props: PageProps) {
	const params = await props.params;
	const category = params.category.toString();

	if (!isProjectCategory(category) || category === 'battlebot') {
		redirect('/projects');
	}

	const projects = await getProjectsByCategory(category);

	const shuffledProjects = [...projects].sort(() => Math.random() - 0.5);

	return (
		<ProjectContainer>
			<ProjectsPath path={[...PATH, { name: PROJECT_CATEGORIES[category], url: '' }]} />

			{/* HACK: weird inconsistency in the names, this is a code smell... */}
			<InteractiveProjectFilter current={category === 'networks' ? 'Мрежи' : PROJECT_CATEGORIES[category]} />

			<ProjectList projects={shuffledProjects} />
		</ProjectContainer>
	);
}
