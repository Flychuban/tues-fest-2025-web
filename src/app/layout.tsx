import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

import Footer from '@/partials/layout/Footer';
import { Navigation } from '@/partials/layout/Navigation';

import './animation.css';
import './globals.css';

import { Metadata, Viewport } from 'next';
import { Rubik_Mono_One } from 'next/font/google';
import localFont from 'next/font/local';
import { GeistSans } from 'geist/font/sans';

import { Toaster } from '@/components/ui/sonner';
import { TF_YEAR } from '@/constants/event';
import { FIRST_ARCHIVE_YEAR, KEYWORDS, OG_METADATA, TF_DESCRIPTION, TWITTER_METADATA } from '@/constants/seo';
import VoteProvider from '@/context/vote';
import { cn } from '@/lib/utils';
import VotingLayout from '@/partials/layout/Voting';

// import VoteProvider from '@/context/vote';
// import VotingLayout from '@/partials/layout/Voting';

export const viewport: Viewport = {
	themeColor: '#141420',
	width: 'device-width',
	initialScale: 1,
};

export const metadata: Metadata = {
	metadataBase: new URL('https://tuesfest.bg'),
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
	assets: ['https://tuesfest.bg/favicon.png', 'https://tuesfest.bg/assets', 'https://tuesfest.bg/_next/static'],
	openGraph: OG_METADATA,
};

// const warzone = localFont({
// 	src: '../assets/fonts/warzone97.ttf',
// 	variable: '--font-warzone',
// });

const rubikMonoOne = Rubik_Mono_One({
	subsets: ['latin', 'cyrillic'],
	weight: '400',
	variable: '--font-rubik-mono-one',
});

// const origin = localFont({
// 	src: '../assets/fonts/origintech.woff',
// 	variable: '--font-origin',
// });

const glitch = localFont({
	src: '../assets/fonts/glitch.woff2',
	variable: '--font-glitch',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="bg"
			className="scroll-pt-(--header-height) dark [--footer-height:calc(theme(spacing.24))] [--header-height:calc(theme(spacing.20))]"
		>
			<head>
				<Script src="https://www.googletagmanager.com/gtag/js?id=G-1H1H1CR559" strategy="afterInteractive" />
				<link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any"></link>
			</head>
			<body
				className={cn(
					GeistSans.variable,
					// warzone.variable,
					rubikMonoOne.variable,
					glitch.variable,
					// origin.variable,
					'font-sans',
					'dark h-full w-screen items-center justify-center overflow-hidden overflow-x-hidden overflow-y-scroll bg-[url(../assets/wave-36.jpg)] bg-cover bg-fixed bg-center lg:bg-[url(../assets/wave-39.jpg)]'
				)}
			>
				<Navigation />
				<VoteProvider>
					<main className="mx-auto min-h-[calc(100vh-var(--header-height)-var(--footer-height))] max-w-screen-2xl">
						{children}
					</main>
					<VotingLayout />
				</VoteProvider>
				<Toaster />
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
