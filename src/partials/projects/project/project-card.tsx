import Image from 'next/image';
import Link from 'next/link';
import { FaYoutube } from 'react-icons/fa';
import invariant from 'tiny-invariant';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ProjectType } from '@/app/projects/actions';

export const ProjectCard = ({ project }: { project: ProjectType }) => {
	// FIXME: duplicate code, seen elsewhere
	const thumbnail = project.thumbnail ?? project.images[0];
	invariant(thumbnail, `Project with ID ${project.id} (${project.title}) has no thumbnail or images`);

	const href = `/projects/${project.id}`;

	return (
		<Card className="z-20 max-w-[500px]">
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
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-xl font-semibold">
					<Link href={href}>{project.title}</Link>
				</CardTitle>
				{project.youtubeId && (
					<YoutubeLink href={`https://www.youtube.com/watch?v=${encodeURIComponent(project.youtubeId)}`} />
				)}
			</CardHeader>
		</Card>
	);
};

const YoutubeLink = ({ href }: { href: string }) => {
	return (
		<div className="hover:text-primary m-1 rounded-lg p-1 transition-all duration-100 hover:scale-110">
			<Link href={href}>
				<FaYoutube size={32} />
			</Link>
		</div>
	);
};
