import { type ReactNode } from 'react';
import Link from 'next/link';
import { type Links } from '@/app/projects/[projectId]/page';
import { TbBrandGit, TbBrandGithub, TbBrandGoogleDrive, TbGlobe } from 'react-icons/tb';
import invariant from 'tiny-invariant';

const Linky = ({ text, url, icon }: { text: string; url: string; icon: ReactNode }) => (
	<Link
		href={url}
		target="_blank"
		rel="noreferrer"
		className="hover:bg-bg-color-hover flex w-full items-center gap-2 rounded-xl border-2 border-border bg-black px-4 py-2 hover:bg-bg-color"
	>
		{icon}
		<span className="text-md font-semibold">{text}</span>
	</Link>
);

const LinksContainer = ({ links }: { links: Links }) => (
	<div className="m-auto mx-auto mt-4 w-[96%] text-white opacity-100 md:w-[90%] lg:w-[70%]">
		<div className=" rounded-xl  border-2 border-stroke bg-black">
			<div className="flex flex-col gap-4 px-8 py-4">
				<div className="flex gap-4">
					<GithubLink repoUrls={links.repoUrls} />
					{links.demoUrl && <Linky text="Уебсайт" url={links.demoUrl} icon={<TbGlobe size={28} />} />}
				</div>
			</div>
		</div>
	</div>
);

const GithubIcon = ({ repoUrl, size }: { repoUrl: string; size: number }) => {
	if (repoUrl.includes('https://github.com')) {
		return <TbBrandGithub size={size} />;
	}
	if (repoUrl.includes('https://drive.google.com')) {
		return <TbBrandGoogleDrive size={size} />;
	}
	return <TbBrandGit size={size} />;
};

const GithubLink = ({ repoUrls }: { repoUrls: string[] }) => {
	if (repoUrls.length !== 1) {
		return (
			<>
				{repoUrls.map((url, i) => (
					<Linky
						key={i}
						text={new URL(url).pathname}
						url={url}
						icon={<GithubIcon repoUrl={url} size={28} />}
					/>
				))}
			</>
		);
	}
	const firstRepoUrl = repoUrls[0];
	invariant(firstRepoUrl, 'No repo URLs');
	return <Linky text="Код на проекта" url={firstRepoUrl} icon={<GithubIcon repoUrl={firstRepoUrl} size={28} />} />;
};

export default LinksContainer;
