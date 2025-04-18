import { transliterate } from 'transliteration';

export function filterItems<Item>(items: Item[], searchTermString: string, searchValuesFn: (item: Item) => string[]) {
	const searchTerms = searchTermString
		.trim()
		.toLowerCase()
		.split(/ +/)
		.map<[string, string]>((t) => [t, transliterate(t)]);
	return items
		.map((item) => {
			const score = searchTerms.reduce((acc, [term, transliteratedTerm]) => {
				const haystack = searchValuesFn(item).join('').toLowerCase();
				const length = haystack.length;

				const ORIGINAL_MATCH_SCORE = 100;
				const TRANSLITERATED_MATCH_SCORE = 50;

				const ogMatchIndex = haystack.indexOf(term);
				const trValueMatchIndex = transliterate(haystack).indexOf(term);
				const trTermMatchIndex = haystack.indexOf(transliteratedTerm);

				const ogMatchCoeff = ogMatchIndex === -1 ? 0 : length - ogMatchIndex;
				const trValueMatchCoeff = trValueMatchIndex === -1 ? 0 : length - trValueMatchIndex;
				const trTermMatchCoeff = trTermMatchIndex === -1 ? 0 : length - trTermMatchIndex;

				return (
					acc +
					ogMatchCoeff * ORIGINAL_MATCH_SCORE +
					trValueMatchCoeff * TRANSLITERATED_MATCH_SCORE +
					trTermMatchCoeff * TRANSLITERATED_MATCH_SCORE
				);
			}, 0);

			return { item, score };
		})

		.filter(({ score }) => score > 0)
		.sort((a, b) => b.score - a.score)
		.map(({ item }) => item);
}
