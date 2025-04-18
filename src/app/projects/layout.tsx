import { TF_DATE_STRING, TF_LOCATION, TF_YEAR } from '@/constants/event';
import { OG_METADATA, TF_TITLE, TWITTER_METADATA } from '@/constants/seo';

export const metadata = {
	metadataBase: new URL('https://tuesfest.bg/'),
	title: {
		default: 'Проекти',
		template: `%s – Проект на ТУЕС Фест ${TF_YEAR}`,
	},
	description: `Тук може да откриете проектите на учениците на ТУЕС. Тази година над 120 проекта ще бъдат представени само на ${TF_DATE_STRING} в ${TF_LOCATION}.`,
	keywords: [
		'туес',
		'туес фест',
		`туес фест ${TF_YEAR}`,
		'туесфест',
		`туесфест ${TF_YEAR}`,
		'туесфест.bg',
		'проекти',
		'ученически проекти',
		'ученици',
		'ученически',
		'инициативи',
		'инициатива',
		'иновации',
		'иновативни',
		'училища',
		'училища софия',
		'училища българия',
		'програмиране',
		'програмиране за деца',
		'програмиране за ученици',
	],
	twitter: {
		...TWITTER_METADATA,
		title: `Проекти | ${TF_TITLE}`,
		description: `Разгледайте над 120 ученически проекта на ${TF_TITLE}.`,
	},
	openGraph: {
		...OG_METADATA,
		title: `Проекти | ${OG_METADATA.siteName}`,
		description: `Разгледайте над 120 ученически проекта на ${TF_TITLE}.`,
	},
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
	return children;
}
