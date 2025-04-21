import { Suspense } from 'react';

import { CategoryLinkText, FilterLinkList, FilterSectionContainer } from '@/components/filter-section';
import { InteractiveFilterLinkList, InteractiveSearchInput } from '@/components/interactive-filter';
import { SearchInput } from '@/components/ui/search-input';

export function ProjectFilter({ current }: { current: CategoryLinkText | null }) {
	return (
		<FilterSectionContainer>
			<FilterLinkList current={current} search={null} />
			<SearchInput disabled />
		</FilterSectionContainer>
	);
}

export function InteractiveProjectFilter({ current }: { current: CategoryLinkText | null }) {
	return (
		<FilterSectionContainer>
			<Suspense fallback={<FilterLinkList current={current} search={null} />}>
				<InteractiveFilterLinkList current={current} />
			</Suspense>
			<Suspense fallback={<SearchInput disabled />}>
				<InteractiveSearchInput />
			</Suspense>
		</FilterSectionContainer>
	);
}
