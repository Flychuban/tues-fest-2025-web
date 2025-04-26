import React from 'react';
import { render } from '@react-email/render';

export async function renderEmail<C extends React.ComponentType<any>>(Component: C, props: React.ComponentProps<C>) {
	const [html, text] = await Promise.all([
		render(<Component {...props} />),
		render(<Component {...props} />, {
			plainText: true,
		}),
	]);
	return { html, text };
}
