import Image from 'next/image';
import Link from 'next/link';
import { FaYoutube } from 'react-icons/fa';
import invariant from 'tiny-invariant';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { ProjectType } from '@/app/projects/actions';
import { IfTFFeatureOn } from '@/lib/growthbook/react/client';
import { VoteSelectProjectButton } from './VoteButton';

export const ProjectCard = ({ project }: { project: ProjectType }) => {
	// FIXME: duplicate code, seen elsewhere
	const thumbnail = project.thumbnail ?? project.images[0];
	invariant(thumbnail, `Project with ID ${project.id} (${project.title}) has no thumbnail or images`);

	const href = `/projects/${project.id}`;

	return (
		<Card className="group z-20 max-w-[500px] transition-all duration-300 hover:shadow-lg">
			<CardContent className="relative mx-auto mt-4 w-[90%]" style={{ paddingTop: '56.25%' }}>
				<Link href={href}>
					<Image
						key={project.id}
						src={thumbnail}
						alt={project.title}
						className="absolute left-0 top-0 rounded-lg object-cover"
						layout="fill"
						objectFit="cover"
					/>
				</Link>
			</CardContent>
			<CardHeader className="flex h-full flex-row items-start justify-between">
				<CardTitle className="text-xl font-semibold">
					<Link href={href}>{project.title}</Link>
				</CardTitle>
				{project.youtubeId && (
					<YoutubeLink href={`https://www.youtube.com/watch?v=${encodeURIComponent(project.youtubeId)}`} />
				)}
			</CardHeader>
			<IfTFFeatureOn feature="project-voting">
				<CardFooter className="pt-0">
					<VoteSelectProjectButton
						project={{
							id: project.id,
							title: project.title,
							thumbnail,
							category: project.category,
						}}
						className="bg-primary hover:bg-primary/90 text-primary-foreground w-full font-medium transition-all duration-300 group-hover:scale-[1.02]"
						size="lg"
					/>
				</CardFooter>
			</IfTFFeatureOn>
		</Card>
	);
};

const YoutubeLink = ({ href }: { href: string }) => {
	return (
		<div className="hover:text-primary m-1 rounded-lg p-1 transition-all duration-100 hover:scale-110">
			<Link href={href} target="_blank">
				<FaYoutube size={32} />
			</Link>
		</div>
	);
};
