export const TF_YEAR = 2025;

export const TF_LOCATION = 'пл. Независимост';

export const TF_DATE = new Date(TF_YEAR, 3, 27, 20, 30);

export const TF_YEAR_SHORT = TF_YEAR % 100;

export const TF_DATE_STRING = TF_DATE.toLocaleDateString('bg-BG', {
	day: '2-digit',
	month: 'long',
	year: 'numeric',
});

export const TF_DATE_STRING_SHORT = TF_DATE.toLocaleDateString('bg-BG', {
	day: '2-digit',
	month: 'long',
});

export const TUES_FOUNDED_YEAR = 1988;
export const TUES_AGE = new Date().getFullYear() - TUES_FOUNDED_YEAR;
