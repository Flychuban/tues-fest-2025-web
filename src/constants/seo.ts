import { Metadata } from 'next';

import { TF_DATE_STRING, TF_LOCATION, TF_YEAR } from './event';

export const TF_TITLE = `TUES Fest ${TF_YEAR}`;

export const TF_DESCRIPTION = `TUES Fest ${TF_YEAR} - ден на отворените врати на ТУЕС и изложение на ученически проекти. ${TF_LOCATION} - ${TF_DATE_STRING}`;

export const KEYWORDS = [
	'tues',
	'tues fest',
	`tues fest ${TF_YEAR}`,
	'tuesfest',
	`tuesfest ${TF_YEAR}`,
	'tuesfest.bg',
	`tuesfest.bg ${TF_YEAR}`,
	`tuesfest ${TF_YEAR}`,
	'туес',
	'технологично училище електронни системи',
	'програмиране',
	'бал',
	'училища след 7ми клас',
	'кандидатстване',
	'бал',
	'минимален бал',
	`бал ${TF_YEAR}`,
	`бал ${TF_YEAR} туес`,
	`туес бал ${TF_YEAR}`,
	'туес бал',
	`туес бал ${TF_YEAR}`,
	'ту софия',
	'високоплатени работи',
	'проекти',
	'ученици',
	'джон атанасов',
	'туес фест',
	`туес фест ${TF_YEAR}`,
	`туес фест ${TF_YEAR} програма`,
	`туес фест ${TF_YEAR} програма`, // should remove, but keep it for now pls
	'най-добрите ученици',
	'училища софия',
	'най-добри гимназии',
	'топ училища',
	'топ гимназии',
	'ден на отворените врати',
	`ден на отворените врати ${TF_YEAR}`,
	`ден на отворените врати ${TF_YEAR} туес`,
	'туес ден на отворените врати',
	`туес ден на отворените врати ${TF_YEAR}`,
	'отворени врати',
	`отворени врати ${TF_YEAR}`,
	`отворени врати ${TF_YEAR} туес`,
	'нво',
	`нво ${TF_YEAR}`,
	`нво ${TF_YEAR} туес`,
	'матури',
	`матури ${TF_YEAR}`,
	'матури 7ми клас',
	`матури 7 клас`,
	'кандидатстване 7 клас',
	'батълботс',
	`батълботс ${TF_YEAR}`,
];

export const FIRST_ARCHIVE_YEAR = 2020;

export const OG_METADATA = {
	title: TF_TITLE,
	description: TF_DESCRIPTION,
	url: 'https://tuesfest.bg',
	siteName: TF_TITLE,
	images: [
		{
			url: 'https:/tuesfest.bg/logo/motto.png',
		},
	],
	locale: 'bg-BG',
	type: 'website',
} satisfies Metadata['openGraph'];

export const TWITTER_METADATA = {
	card: 'summary_large_image',
	title: TF_TITLE,
	description: TF_DESCRIPTION,
	creator: '@hacktuesfest',
	images: ['https://tuesfest.bg/logo/motto.png'],
} satisfies Metadata['twitter'];
