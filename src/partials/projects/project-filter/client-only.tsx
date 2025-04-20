'use client';

import { useQueryState } from 'nuqs';

import { CategoryLinkText, FilterLinkList } from '@/components/filter-section';
import { SearchInput } from '@/components/ui/search-input';

export function InteractiveFilterLinkList({ current }: { current: CategoryLinkText | null }) {
	const [search] = useQueryState('search');

	return <FilterLinkList current={current} search={search} />;
}

export function InteractiveSearchInput() {
	const [search, setSearch] = useQueryState('search');

	return (
		<SearchInput
			value={search ?? ''}
			onChange={(e) => setSearch(e.target.value || null)}
			onBlur={(e) => setSearch(e.target.value.trim() || null)}
		/>
	);
}
