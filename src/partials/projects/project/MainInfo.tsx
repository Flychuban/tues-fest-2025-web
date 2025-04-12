import ShareButton from '@/components/shareButton';
import { PROJECT_TYPES } from '@/constants/projects';
import Video from './Video';

const MainInfo = ({
	name,
	video,
	type,
	category,
}: {
	name: string;
	video: string;
	type: string;
	category: string;
	id: number;
	thumbnail: string;
}) => (
	<div className="flex w-full max-w-screen-lg gap-4">
		<div className="border-border bg-background w-full shrink rounded-xl border">
			<div className="border-b-border relative aspect-video overflow-hidden rounded-xl border-b-2">
				{/* Share Button */}
				<ShareButton />
				<Video name={name} id={video} />
			</div>
			<div className="flex items-center justify-between px-8 py-4">
				<h2 className="text-2xl font-bold">{name}</h2>
				<div className="flex items-center gap-4">
					<div className="text-right text-sm opacity-70">
						{/* @ts-expect-error TODO: fix */}
						{PROJECT_TYPES[type]}, {category}
					</div>
					{/* <VoteButton id={id} name={name} thumbnail={thumbnail} category={category} /> */}
				</div>
			</div>
		</div>
	</div>
);

export default MainInfo;

// THIS WOULDVE BEEN THE SEXY ONE - mitko: nz murzi me da vidq kakvo e
// bozho: preimenuvah pictures na images, srry :D

/* 					<div className="relative h-full w-full flex flex-col bg-background rounded-xl border-2 border-border">
						<div className="h-[calc(75%-2rem)] overflow-y-auto">
							<div className=" shrink-0 flex flex-col gap-4">
								<div className="flex flex-wrap p-4 gap-4 items-center justify-center">
									{project.pictures.map((picture) => (
										<div
											className="w-[calc(50%-1rem)] overflow-hidden rounded-xl border-2 border-border"
											key={picture.url}
										>
											<img
												src={picture.url}
												alt={project.name}
												className="w-full aspect-square object-cover hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
											/>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="w-full p-4 flex flex-col gap-4 absolute bottom-0">
							<div className="flex flex-col gap-4">
								<div className="flex gap-4">
									<a
										href={project.links.github}
										target="_blank"
										rel="noreferrer"
										className="w-full flex items-center gap-2 px-4 py-2 bg-background rounded-xl border-2 border-border hover:bg-background-hover"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
										<span className="text-sm">GitHub</span>
									</a>
									<a
										href={project.links.demo}
										target="_blank"
										rel="noreferrer"
										className="w-full flex items-center gap-2 px-4 py-2 bg-background rounded-xl border-2 border-border hover:bg-background-hover"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
										<span className="text-sm">Demo</span>
									</a>
								</div>
							</div>
						</div>
					</div> */
