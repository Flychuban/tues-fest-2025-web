import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { GradientHeading } from '@/components/ui/gradient-heading';
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
			<GradientHeading size="lg">404 - Няма такъв проект :(</GradientHeading>
			<Button asChild size="lg">
				<Link href="/projects">Върни се към проектите</Link>
			</Button>
		</div>
	);
}
