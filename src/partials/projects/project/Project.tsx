import Image from 'next/image';
import Link from 'next/link';
import type { ProjectType } from '@/app/projects/actions';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import VoteButton from '@/partials/projects/project/VoteButton';
import { FaYoutube } from 'react-icons/fa';
import invariant from 'tiny-invariant';

const Project = ({ project }: { project: ProjectType }) => {
	// FIXME: duplicate code, seen elsewhere
	const thumbnail = project.thumbnail || project.images[0];
	invariant(thumbnail, `Project with ID ${project.id} (${project.title}) has no thumbnail or images`);

	return (
		<Card className="z-20 m-4 max-w-[500px] bg-black text-white opacity-100">
			<div className="relative mx-auto mt-4 w-[90%]" style={{ paddingTop: '56.25%' }}>
				<Image
					key={project.id}
					src={project.thumbnail || project.images[0]}
					alt={project.title}
					className="absolute left-0 top-0 rounded-lg object-cover"
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<CardHeader className="flex flex-row items-center justify-between">
				<Link
					className="text-xl font-semibold hover:cursor-pointer hover:text-sand"
					href={`/projects/${project.id}`}
				>
					{project.title}
				</Link>
				{project.youtubeId && (
					<YoutubeLink
						href={`https://www.youtube.com/watch?v=${encodeURIComponent(project.youtubeId ?? '')}`}
					/>
				)}
			</CardHeader>
			<CardContent>
				<VoteButton
					id={project.id}
					name={project.title}
					thumbnail={(project.thumbnail || project.images[0]).src}
					category={project.category}
				/>
			</CardContent>
		</Card>
	);
};

const YoutubeLink = ({ href }: { href: string }) => {
	return (
		<div className="m-1 rounded-lg p-1 duration-100 hover:scale-110 hover:text-error">
			<Link href={href}>
				<FaYoutube size={32} />
			</Link>
		</div>
	);
};

export default Project;
