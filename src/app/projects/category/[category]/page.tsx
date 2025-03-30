// IMPORTATN - THIS IS THE DUMBES SOLUTION, BUT I WANT SWEEEET SERVER COMPONENTS
import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Card } from '@/components/ui/card';
import { PROJECT_CATEGORIES, PROJECT_CATEGORY_MAP } from '@/constants/projects';
import { TF_TITLE } from '@/constants/seo';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import ProjectsLoading from '@/partials/projects/loader/ProjectsLoading';
import Project from '@/partials/projects/project/Project';
import { getProjectsByCategory } from '../../actions';

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

const TABS = [
	{
		text: 'Всички',
		category: 'all',
		href: '/projects',
	},
	PROJECT_CATEGORY_MAP.embedded,
	PROJECT_CATEGORY_MAP.software,
	PROJECT_CATEGORY_MAP.battlebot,
	{ ...PROJECT_CATEGORY_MAP.networks, text: 'Мрежи' },
];

const LinkTab = ({ text, href, current }: { text: string; href: string; current: boolean }) => (
	<Link
		href={href}
		className={`inline-flex items-center justify-center whitespace-nowrap rounded-md ${
			current ? 'border border-white' : 'bg-[#353444]'
		} hover:bg-primary px-5 py-[10px] text-base font-semibold text-white transition-all`}
	>
		{text}
	</Link>
);

export function generateStaticParams() {
	return Object.keys(PROJECT_CATEGORIES).map((category) => ({
		category,
	}));
}

const ProjectsPage = async (props: {
	params: Promise<{
		category: string;
	}>;
}) => {
	const params = await props.params;
	const category = params.category.toString();

	if (!Object.hasOwn(PROJECT_CATEGORIES, category)) {
		redirect('/projects');
	}

	const projects = await getProjectsByCategory(category);

	projects?.sort(() => Math.random() - 0.5);

	return (
		<div className="container">
			<ProjectsPath path={PATH} />
			<div className="mb-28">
				<section className="pt-8">
					<div className="mx-4">
						<Card className="border-stroke m-4 mb-14 rounded-lg border-2 bg-black px-5 py-4 text-white opacity-100">
							<div className="z-50 -mx-4 flex flex-wrap items-center justify-between">
								<div className="w-full px-4">
									<div className="flex flex-wrap justify-center gap-4 overflow-x-auto lg:justify-start">
										{TABS.map((tab) => (
											<LinkTab key={tab.href} {...tab} current={tab.category === category} />
										))}
									</div>
								</div>
							</div>
						</Card>
					</div>
				</section>
				{/* <ErrorBoundary FallbackComponent={ProjectsError}> */}
				<Suspense fallback={<ProjectsLoading />}>
					<div className="inline-grid w-full grid-cols-1 sm:m-4 md:grid-cols-2 lg:grid-cols-3">
						{projects ? (
							projects.map((project) => <Project key={project.title} project={project} />)
						) : (
							<div>Loading...</div>
						)}
					</div>{' '}
				</Suspense>
			</div>
		</div>
	);
};

export default ProjectsPage;
