import Link from 'next/link';

import { OG_METADATA } from '@/constants/seo';

export const metadata = {
	title: '404 - Няма такъв проект :(',
	description: 'Линкът, който сте посетили, е остарял или невалиден',
	openGraph: {
		title: '404 - Няма такъв проект :(',
		description: 'Линкът, който сте посетили, е остарял или невалиден',
		siteName: OG_METADATA.siteName,
	},
};

export default function NotFound() {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-8">
			<h1 className="bg-gradient bg-clip-text text-5xl font-black text-transparent">
				404 - Няма такъв проект :(
			</h1>
			<Link
				href="/projects"
				className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[#353444] px-5 py-[10px] text-base font-semibold text-white transition-all hover:bg-primary"
			>
				Върни се към проектите
			</Link>
		</div>
	);
}
