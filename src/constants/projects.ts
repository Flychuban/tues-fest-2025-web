import { toLowerCase } from 'string-ts';

export const PROJECT_TYPES = {
	extra: 'Извънкласна дейност',
	class: 'Курсов проект',
	diploma: 'Дипломна работа',
} as const;

export type ProjectType = (typeof PROJECT_TYPES)[keyof typeof PROJECT_TYPES];

export const PROJECT_CATEGORIES = {
	software: 'Софтуер',
	embedded: 'Хардуер',
	networks: 'Компютърни мрежи',
	battlebot: 'Battle Bots',
} as const;

export type ProjectCategory = keyof typeof PROJECT_CATEGORIES;

export function isProjectCategory(value: string): value is ProjectCategory {
	return Object.hasOwn(PROJECT_CATEGORIES, value);
}

export const PROJECT_CATEGORY_MAP = Object.entries(PROJECT_CATEGORIES).reduce(
	(acc, [key, value]) => ({
		...acc,
		[key]: {
			text: value,
			href: `/projects/category/${toLowerCase(key)}`,
			category: key,
		},
	}),
	{} as {
		[key in ProjectCategory]: {
			text: (typeof PROJECT_CATEGORIES)[key];
			href: `/projects/category/${Lowercase<key>}`;
			category: key;
		};
	}
);

export type ProjectCategoryMapValue = (typeof PROJECT_CATEGORY_MAP)[keyof typeof PROJECT_CATEGORY_MAP];

export const PROJECT_CATEGORY_LIST = Object.values(PROJECT_CATEGORY_MAP);

export const PROJECT_REGISTRATION_FORM_URL = 'https://forms.gle/PjaNKUqpYcuFXLHu6';
