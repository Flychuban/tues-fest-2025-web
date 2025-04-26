import React from 'react';
import { render } from '@react-email/render';

// Any is safe here because it's used in a template. This helps the type inference.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function renderEmail<C extends React.ComponentType<any>>(Component: C, props: React.ComponentProps<C>) {
	const [html, text] = await Promise.all([
		render(<Component {...props} />),
		render(<Component {...props} />, {
			plainText: true,
		}),
	]);
	return { html, text };
}
