import React from 'react';
import { unstable_cache } from 'next/cache';

import TF2024ProjectsAdapter from '@/app/projects/adapter';

const adapter = TF2024ProjectsAdapter();

// TODO: add cache
export const getProjectById = React.cache(adapter.getProjectById);

export type ProjectType = Exclude<Awaited<ReturnType<typeof getProjectById>>, null>;

export const getProjects = unstable_cache(React.cache(adapter.getProjects), ['all-projects'], {
	revalidate: 20 * 60 * 1000,
});

export const getProjectsByCategory = unstable_cache(
	React.cache(adapter.getProjectsByCategory),
	['projects-by-category'],
	{
		revalidate: 20 * 60 * 1000,
	}
);
