import { type ReactNode } from 'react';
import Link from 'next/link';
import { TbBrandGit, TbBrandGithub, TbBrandGoogleDrive, TbGlobe } from 'react-icons/tb';
import invariant from 'tiny-invariant';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type Links } from '@/app/projects/[projectId]/page';

const Linky = ({ text, url, icon }: { text: string; url: string; icon: ReactNode }) => (
	<Button asChild variant="outline" size="lg" className="w-full">
		<Link href={url} target="_blank" rel="noreferrer">
			{icon}
			<span className="text-md font-semibold">{text}</span>
		</Link>
	</Button>
);

const LinksContainer = ({ links }: { links: Readonly<Links> }) => (
	<div className="m-auto mx-auto mt-4 w-[96%] md:w-[90%] lg:w-[80%]">
		<Card>
			<CardContent className="flex flex-col gap-4 px-8 py-4">
				<div className="flex gap-4">
					<GithubLink repoUrls={links.repoUrls} />
					{links.demoUrl && <Linky text="Уебсайт" url={links.demoUrl} icon={<TbGlobe size={28} />} />}
				</div>
			</CardContent>
		</Card>
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

const GithubLink = ({ repoUrls }: { repoUrls: readonly string[] }) => {
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
