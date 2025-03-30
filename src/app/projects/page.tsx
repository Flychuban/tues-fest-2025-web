import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { TF_TITLE } from '@/constants/seo';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import Project from '@/partials/projects/project/Project';
// import Projects from '@/partials/projects/Projects';
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

const TABS = [
	{
		text: 'Всички',
		href: '/projects',
	},
	{
		text: 'Хардуер',
		href: '/projects/category/embedded',
	},
	{
		text: 'Софтуер',
		href: '/projects/category/software',
	},
	{
		text: 'Battle Bots',
		href: '/projects/category/battlebot',
	},
	{
		text: 'Мрежи',
		href: '/projects/category/networks',
	},
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

const ProjectsPage = async () => {
	const projects = await getProjects();
	//shuffle projects
	projects.sort(() => Math.random() - 0.5);

	return (
		<div className="container">
			<ProjectsPath path={PATH} />
			<div className="mb-28">
				<section className="pt-8">
					<div className="m-auto sm:mx-4">
						<Card className="border-stroke m-4 mb-14 rounded-lg border-2 bg-black px-5 py-4 text-white opacity-100">
							<div className="z-50 -mx-4 flex flex-wrap items-center justify-between">
								<div className="w-full px-4">
									<div className="flex flex-wrap justify-center gap-4 overflow-x-auto lg:justify-start">
										{TABS.map((tab) => (
											<LinkTab key={tab.href} {...tab} current={tab.text === 'Всички'} />
										))}
									</div>
								</div>
							</div>
						</Card>
					</div>
				</section>
				<div className="inline-grid w-full grid-cols-1 sm:m-4 md:grid-cols-2 lg:grid-cols-3">
					{projects ? (
						projects.map((project) => <Project key={project.title} project={project} />)
					) : (
						<div>Loading...</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProjectsPage;
