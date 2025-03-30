'use client';

import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import { TF_TITLE } from '@/constants/seo';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const Video = ({ name, id }: { name: string; id: string }) => {
	if (!id)
		return (
			<p className="bg-gradient flex h-full w-full items-center justify-center bg-clip-text text-4xl font-black text-transparent">
				{'няма видео :('}
			</p>
		);

	return <LiteYouTubeEmbed id={id} title={`${name} | ${TF_TITLE}`} poster="hqdefault" />;
};

export default Video;
