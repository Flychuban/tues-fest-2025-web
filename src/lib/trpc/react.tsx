'use client';

import { useState } from 'react';
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink, httpBatchStreamLink, loggerLink, splitLink } from '@trpc/client';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import SuperJSON from 'superjson';

import { type AppRouter } from '@/server/api/root';
import { createQueryClient } from './query-client';

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
	if (typeof window === 'undefined') {
		// Server: always make a new query client
		return createQueryClient();
	}
	// Browser: use singleton pattern to keep the same query client
	clientQueryClientSingleton ??= createQueryClient();

	return clientQueryClientSingleton;
};

const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
export { useTRPC };

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider(props: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	const [trpcClient] = useState(() =>
		createTRPCClient<AppRouter>({
			links: [
				loggerLink({
					enabled: (op) =>
						process.env.NODE_ENV === 'development' ||
						(op.direction === 'down' && op.result instanceof Error),
				}),
				splitLink({
					// HACK: This is a workaround to prevent the registerVoter mutation from being streamed
					// because it sets the cookie, but headers cannot be set on the stream.
					condition: (op) => !op.context.disableStreaming,
					true: httpBatchStreamLink({
						transformer: SuperJSON,
						url: getBaseUrl() + '/t',
						headers: () => {
							const headers = new Headers();
							headers.set('x-trpc-source', 'nextjs-react');
							return headers;
						},
					}),
					false: httpBatchLink({
						transformer: SuperJSON,
						url: getBaseUrl() + '/t',
						headers: () => {
							const headers = new Headers();
							headers.set('x-trpc-source', 'nextjs-react');
							return headers;
						},
					}),
				}),
			],
		})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
				{props.children}
			</TRPCProvider>
		</QueryClientProvider>
	);
}

function getBaseUrl() {
	if (typeof window !== 'undefined') return window.location.origin;
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
	return `http://localhost:${process.env.PORT ?? 3000}`;
}
