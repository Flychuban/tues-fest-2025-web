import Image from 'next/image';
import { notFound } from 'next/navigation';
import invariant from 'tiny-invariant';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { OG_METADATA, TF_TITLE, TWITTER_METADATA } from '@/constants/seo';
import { cn } from '@/lib/utils';
import ProjectsPath from '@/partials/layout/ProjectsPath';
import { ProjectContainer } from '@/partials/projects/project-container';
import Contributors from '@/partials/projects/project/Contributors';
import { ProjectDescription } from '@/partials/projects/project/Description';
import Gallery from '@/partials/projects/project/Gallery';
import LinksContainer from '@/partials/projects/project/Links';
import Video from '@/partials/projects/project/Video';
import { VoteSelectProjectButton } from '@/partials/projects/project/VoteButton';
import { getProjectById, getProjects } from '../actions';

export type Links = {
	repoUrls: readonly string[];
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
		<ProjectContainer>
			<ProjectsPath path={path} />
			<div className="container">
				<Card className="m-auto w-full border sm:px-4 md:w-[90%] lg:w-[80%]">
					<CardHeader className="pt-10">
						<CardTitle className="text-center text-3xl">{project.title}</CardTitle>
					</CardHeader>
					<CardContent className="my-4">
						{project.youtubeId && (
							<div className="m-auto w-full overflow-hidden rounded-xl border-2">
								<Video name={project.title} id={project.youtubeId} />
							</div>
						)}
						{!project.youtubeId && (
							<div
								className="relative m-auto w-full rounded-xl border-2"
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
						<div className="grid gap-6 md:grid-cols-[2fr,1fr]">
							<CardDescription className="prose prose-sm prose-slate sm:prose-lg max-w-none">
								<ScrollArea
									className={cn({
										'relative h-[175px] [mask-image:linear-gradient(to_bottom,transparent,black_20px,black_calc(100%-40px),transparent)]':
											project.description.length > 250,
									})}
								>
									<ProjectDescription description={project.description} />
								</ScrollArea>
							</CardDescription>

							<div className="bg-primary/5 relative flex flex-col gap-4 rounded-xl border p-6">
								<div className="flex items-start justify-between gap-4">
									<div className="space-y-1">
										<h3 className="font-semibold">
											Гласувай за {project.contributors.length > 1 ? 'нас' : 'мен'}!
										</h3>
										<p className="text-muted-foreground text-sm">
											Ако смяташ, че {project.contributors.length > 1 ? 'нашия' : 'моя'} проект
											заслужава да спечели наградата за избор на публиката, гласувай за него сега!
										</p>
									</div>
								</div>
								<VoteSelectProjectButton
									project={{
										id: project.id,
										title: project.title,
										thumbnail,
										category: project.category,
									}}
									className="w-full"
									size="lg"
								/>
							</div>
						</div>
						<Contributors contributors={project.contributors} />
					</CardContent>
				</Card>
				<div className="m-auto mx-auto mt-4 w-[96%] md:w-[90%] lg:w-[80%]">
					<Gallery
						name={project.title}
						images={project.images.length > 0 ? project.images : [project.thumbnail!]}
					/>
				</div>
				<LinksContainer links={project.links} />
			</div>
		</ProjectContainer>
	);
};

export default ProjectPage;
