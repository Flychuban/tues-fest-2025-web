import { Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import Contributors from '@/partials/projects/project/Contributors';
import Gallery from '@/partials/projects/project/Gallery';
import LinksContainer from '@/partials/projects/project/Links';
import Video from '@/partials/projects/project/Video';
import VoteButton from '@/partials/projects/project/VoteButton';

import { getProjectById } from '../actions';

export type Links = {
	repoUrls: string[];
	demoUrl: string | null;
};

export type Contributor = {
	name: string;
	class: string;
};

export type Picture = {
	url: string;
	is_thumbnail: boolean;
};

export type Project = {
	id: number;
	title: string;
	description: string;
	video: string;
	type: string;
	category: string;
	has_thumbnail: boolean;
	links: Links;
	creators: Contributor[];
	images: Picture[];
	next_id: number;
	prev_id: number;
};
export async function generateMetadata({ params }: { params: { projectId: string } }) {
	const projectId = parseInt(params.projectId, 10);
	const project = await getProjectById(projectId);

	if (project === undefined || project === null) notFound();

	return {
		title: project.title,
		description: project.description,
		twitter: {
			card: 'summary_large_image',
			title: `${project.title} | TUES Fest 2024`,
			description: project.description,
			creator: '@tuesfest',
			images: project.images.map((image) => ({
				url: image.src,
			})),
		},
		openGraph: {
			title: `${project.title} | TUES Fest 2024`,
			description: project.description,
			url: `https://tuesfest.bg/projects/${project.id}`,
			siteName: 'TUES Fest 2024',
			images: project.images.map((image) => ({
				url: image.src,
			})),
			locale: 'bg-BG',
			type: 'website',
		},
	};
}

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
	const projectId = parseInt(params.projectId, 10);
	const project = await getProjectById(projectId);
	if (!project) notFound();

	const path = [
		{
			name: 'TUES Fest 2024',
			url: '/',
		},
		{
			name: 'Проекти',
			url: '/projects',
		},
		{
			name: project.title,
			url: '',
		},
	];

	return (
		<div className="container">
			<Suspense fallback={<div>Loading...</div>}>
				<ProjectsPath path={path} />
			</Suspense>
			<div className="container mb-20 pt-16 sm:px-8">
				<Card className="m-auto w-full border border-stroke bg-black text-white opacity-100 sm:px-4 md:w-[90%] lg:w-[70%]">
					<CardHeader className="pt-10">
						<CardTitle className="text-center text-3xl">{project.title}</CardTitle>
					</CardHeader>
					<CardContent className="my-4">
						{project.youtubeId && (
							<div className="m-auto w-full overflow-hidden rounded-xl border-2 border-white">
								<Video name={project.title} id={project.youtubeId} />
							</div>
						)}
						{!project.youtubeId && (
							<div
								className="relative m-auto w-full rounded-xl border-2 border-white"
								style={{ paddingTop: '56.25%' }}
							>
								<Image
									key={project.id}
									src={project.thumbnail || project.images[0]}
									alt={project.title}
									className="absolute left-0 top-0 rounded-lg object-cover"
									layout="fill"
									objectFit="cover"
								/>
							</div>
						)}
						<div className="mt-4">
							<VoteButton
								id={project.id}
								name={project.title}
								thumbnail={(project.thumbnail || project.images[0]).src}
								category={project.category}
							/>
						</div>
						{project.description.length > 250 ? (
							<ScrollArea className="text-md my-4 h-[150px] overflow-y-scroll sm:text-lg">
								{project.description}
							</ScrollArea>
						) : (
							<CardDescription className="text-md my-6 sm:text-lg">{project.description}</CardDescription>
						)}
						<Contributors contributors={project.contributors} />
					</CardContent>
				</Card>
				<div className="m-auto mx-auto mt-4 w-[96%] md:w-[90%] lg:w-[70%]">
					<Gallery name={project.title} images={project.images} />
				</div>
				<LinksContainer links={project.links} />
			</div>
		</div>
	);
};

export default ProjectPage;
