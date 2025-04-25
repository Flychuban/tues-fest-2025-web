import type { PropsWithChildren } from 'react';

import { env } from '@/../env.mjs';
import { growthbook } from '../server';
import { GrowthBookClientProvider } from './client';

export async function GrowthBookServerProvider({ children }: PropsWithChildren) {
	const gb = await growthbook();
	/**
	 * NOTE: The example uses `getDecryptedPayload`, but that feels insecure. This may not
	 * support encrypted payloads, but it's fine because we don't use encryption.
	 * If you're attempting to use encrypted payloads and it doesn't work, you
	 * may need to use `getDecryptedPayload` instead.
	 **/
	const payload = gb.getPayload();
	const attributes = gb.getAttributes();

	return (
		<GrowthBookClientProvider
			payload={payload}
			attributes={attributes}
			enableDevMode={env.NODE_ENV === 'development'}
		>
			{children}
		</GrowthBookClientProvider>
	);
}
