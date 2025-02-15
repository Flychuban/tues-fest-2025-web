import Script from 'next/script';
import Footer from '@/partials/layout/Footer';
import Navigation from '@/partials/layout/Navigation';
import { Analytics } from '@vercel/analytics/react';

import './animation.css';
import './globals.css';

import { Toaster } from '@/components/ui/toaster';
import { DayProvider } from '@/context/day';
import VoteProvider from '@/context/vote';
import VotingLayout from '@/partials/layout/Voting';

// import VoteProvider from '@/context/vote';
// import VotingLayout from '@/partials/layout/Voting';

export const metadata = {
	title: {
		default: 'TUES Fest 2024',
		template: '%s | TUES Fest 2024',
	},
	description:
		'TUES Fest 2024 - ден на отворените врати на ТУЕС и изложение на ученически проекти. София Тех Парк - 20 и 21 април 2024.',
	keywords: [
		'tues',
		'tues fest',
		'tues fest 2024',
		'tuesfest',
		'tuesfest 2024',
		'tuesfest.bg',
		'tuesfest.bg 2024',
		'tuesfest 2024',
		'туес',
		'технологично училище електронни системи',
		'програмиране',
		'бал',
		'училища след 7ми клас',
		'кандидатстване',
		'бал',
		'минимален бал',
		'бал 2024',
		'бал 2024 туес',
		'туес бал 2024',
		'туес бал',
		'туес бал 2024',
		'ту софия',
		'високоплатени работи',
		'проекти',
		'ученици',
		'джон атанасов',
		'туес фест',
		'туес фест 2024',
		'туес фест 2024 програма',
		'туес фест 2024 програма',
		'най-добрите ученици',
		'училища софия',
		'най-добри гимназии',
		'топ училища',
		'топ гимназии',
		'ден на отворените врати',
		'ден на отворените врати 2024',
		'ден на отворените врати 2024 туес',
		'туес ден на отворените врати',
		'туес ден на отворените врати 2024',
		'отворени врати',
		'отворени врати 2024',
		'отворени врати 2024 туес',
		'нво',
		'нво 2024',
		'нво 2024 туес',
		'матури',
		'матури 2024',
		'матури 7ми клас',
		'матури 7 клас',
		'кандидатстване 7 клас',
		'батълботс',
		'батълботс 2024',
	],
	viewport: 'width=device-width, initial-scale=1',
	themeColor: '#141420',
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.png',
		apple: '/favicon.png',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'TUES Fest 2024',
		description:
			'TUES Fest 2024 - ден на отворените врати на ТУЕС и изложение на ученически проекти. София Тех Парк - 20 и 21 април 2024.',
		creator: '@tuesfest',
		images: ['https://tuesfest.bg/logo/motto.png'],
	},
	archives: ['https://2022.tuesfest.bg', 'https://2021.tuesfest.bg', 'https://2020.tuesfest.bg'],
	assets: ['https://tuesfest.bg/favicon.png', 'https://tuesfest.bg/logo/motto.png', 'https://tuesfest.bg/assets'],
	openGraph: {
		title: 'TUES Fest 2024',
		description:
			'TUES Fest 2024 - ден на отворените врати на ТУЕС и изложение на ученически проекти. София Тех Парк - 20 и 21 април 2024.',
		url: 'https://tuesfest.bg',
		siteName: 'TUES Fest 2024',
		images: [
			{
				url: 'https:/tuesfest.bg/logo/motto.png',
			},
		],
		locale: 'bg-BG',
		type: 'website',
	},
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
					<DayProvider>
						<Navigation />
						<VoteProvider>
							{children}
							<VotingLayout />
						</VoteProvider>
						<Toaster />
						<Footer />
						<Analytics />
					</DayProvider>
				</div>
			</body>
		</html>
	);
}
