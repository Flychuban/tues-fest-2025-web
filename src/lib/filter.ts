import { transliterate } from 'transliteration';

type StringKey<T> = {
	[K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

function temp<T>(t: T, tKey: StringKey<T>) {
	const x = t[tKey];
}

export function filterItems<Item>(items: Item[], searchTermString: string, searchKeys: StringKey<Item>[]) {
	return items
		.map((item) => {
			const score = searchKeys.reduce((acc, key, keyIndex) => {
				const x = item[key];
				const remainder = searchKeys.length - keyIndex;

				// FIXME: weird type assertion
				const value = (item[key] as string).toLowerCase();
				const transliteratedValue = transliterate(value);
				return (
					acc +
					searchTermString
						.toLowerCase()
						.split(/ +/)
						.reduce((acc, term) => {
							const matchIdx = value.indexOf(term);
							if (matchIdx === 0) {
								return acc + remainder * 40;
							} else if (matchIdx > 0) {
								return acc + remainder * 30;
							}

							const transliteratedValueMatchIdx = transliteratedValue.indexOf(term);
							if (transliteratedValueMatchIdx === 0) {
								return acc + remainder * 20;
							} else if (transliteratedValueMatchIdx > 0) {
								return acc + remainder * 10;
							}

							const transliteratedTermMatchIdx = value.indexOf(transliterate(term));
							if (transliteratedTermMatchIdx === 0) {
								return acc + remainder * 20;
							} else if (transliteratedTermMatchIdx > 0) {
								return acc + remainder * 10;
							}

							return acc;
						}, 0)
				);
			}, 0);

			return { item, score };
		})

		.filter(({ score }) => score > 0)
		.sort((a, b) => b.score - a.score)
		.map(({ item }) => item);
}
