import 'server-only';

import { cache } from 'react';
import { configureCache, GrowthBook, setPolyfills } from '@growthbook/growthbook';
import { Duration } from 'effect';

import { env } from '@/../env.mjs';
import type { TFFeatures } from './features';

// Tag fetch requests so they can be revalidated on demand
setPolyfills({
	fetch: cache((url: string, init: RequestInit) =>
		fetch(url, {
			...init,
			next: {
				// Cache feature definitions for a short time in dev
				// In prod, we use a higher value and use WebHooks to revalidate on-demand
				revalidate:
					env.NODE_ENV === 'development' ? Duration.toSeconds('10 seconds') : Duration.toSeconds('1 hour'),
				tags: ['growthbook'],
			},
		})
	),
});

// Disable the built-in cache since we're using Next.js's fetch cache instead
configureCache({
	disableCache: true,
});

export async function growthbook() {
	const gb = new GrowthBook<TFFeatures>({
		apiHost: env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
		clientKey: env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
	});

	await gb.init({
		timeout: Duration.toMillis('1 minute'),
	});

	/**
	 * You would set any user-identifying attributes here
	 *
	 * @see https://docs.growthbook.io/guide/nextjs-app-router#5-integrate-the-growthbook-sdk-into-our-nextjs-app
	 **/

	return gb;
}
