import { Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import invariant from 'tiny-invariant';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { OG_METADATA, TF_TITLE, TWITTER_METADATA } from '@/constants/seo';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import Contributors from '@/partials/projects/project/Contributors';
import Gallery from '@/partials/projects/project/Gallery';
import LinksContainer from '@/partials/projects/project/Links';
import Video from '@/partials/projects/project/Video';
import VoteButton from '@/partials/projects/project/VoteButton';
import { getProjectById, getProjects } from '../actions';

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
export async function generateMetadata(props: { params: Promise<{ projectId: string }> }) {
	const params = await props.params;
	const projectId = parseInt(params.projectId, 10);
	const project = await getProjectById(projectId);

	if (project === undefined || project === null) notFound();

	return {
		title: project.title,
		description: project.description,
		twitter: {
			...TWITTER_METADATA,
			title: `${project.title} | ${TF_TITLE}`,
			description: project.description,
			images: project.images.map((image) => ({
				url: image.src,
			})),
		},
		openGraph: {
			...OG_METADATA,
			title: `${project.title} | ${OG_METADATA.siteName}`,
			description: project.description,
			url: `https://tuesfest.bg/projects/${project.id}`,
			images: project.images.map((image) => ({
				url: image.src,
			})),
		},
	};
}

export async function generateStaticParams() {
	const projects = await getProjects();
	return projects.map((project) => ({
		projectId: project.id.toString(),
	}));
}

const ProjectPage = async (props: { params: Promise<{ projectId: string }> }) => {
	const params = await props.params;
	const projectId = parseInt(params.projectId, 10);
	const project = await getProjectById(projectId);
	if (!project) notFound();

	const path = [
		{
			name: TF_TITLE,
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

	// FIXME: duplicate code, seen elsewhere
	const thumbnail = project.thumbnail ?? project.images[0];
	invariant(thumbnail, `Project with ID ${project.id} (${project.title}) has no thumbnail or images`);

	return (
		<div className="container">
			<Suspense fallback={<div>Loading...</div>}>
				<ProjectsPath path={path} />
			</Suspense>
			<div className="container mb-20 pt-16 sm:px-8">
				<Card className="border-stroke m-auto w-full border bg-black text-white opacity-100 sm:px-4 md:w-[90%] lg:w-[70%]">
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
									src={thumbnail}
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
								thumbnail={thumbnail.src}
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
					<Gallery
						name={project.title}
						images={project.images.length > 0 ? project.images : [project.thumbnail!]}
					/>
				</div>
				<LinksContainer links={project.links} />
			</div>
		</div>
	);
};

export default ProjectPage;
