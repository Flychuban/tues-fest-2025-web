import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

import Footer from '@/partials/layout/Footer';
import Navigation from '@/partials/layout/Navigation';

import './animation.css';
import './globals.css';

import { Toaster } from '@/components/ui/toaster';
import { TF_YEAR } from '@/constants/event';
import { FIRST_ARCHIVE_YEAR, KEYWORDS, OG_METADATA, TF_DESCRIPTION, TWITTER_METADATA } from '@/constants/seo';
import VoteProvider from '@/context/vote';
import VotingLayout from '@/partials/layout/Voting';

// import VoteProvider from '@/context/vote';
// import VotingLayout from '@/partials/layout/Voting';

export const viewport = {
	themeColor: '#141420',
	width: 'device-width',
	initialScale: 1,
};

export const metadata = {
	title: {
		default: `TUES Fest ${TF_YEAR}`,
		template: `%s | TUES Fest ${TF_YEAR}`,
	},
	description: TF_DESCRIPTION,
	keywords: KEYWORDS,
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.png',
		apple: '/favicon.png',
	},
	twitter: TWITTER_METADATA,
	archives: Array.from({ length: TF_YEAR - FIRST_ARCHIVE_YEAR }, (_, i) => `https://${TF_YEAR - i - 1}.tuesfest.bg`),
	assets: [
		'https://tuesfest.bg/favicon.png',
		'https://tuesfest.bg/logo/motto.png',
		'https://tuesfest.bg/assets',
		'https://tuesfest.bg/_next/static',
	],
	openGraph: OG_METADATA,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="bg">
			<head>
				<Script src="https://www.googletagmanager.com/gtag/js?id=G-1H1H1CR559" strategy="afterInteractive" />
				<link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any"></link>
			</head>
			<body className=" h-full w-screen items-center justify-center overflow-hidden overflow-x-hidden overflow-y-scroll bg-bg-color bg-repeat text-white">
				<div className="">
					<Navigation />
					<VoteProvider>
						{children}
						<VotingLayout />
					</VoteProvider>
					<Toaster />
					<Footer />
					<Analytics />
				</div>
			</body>
		</html>
	);
}
