import { revalidateTag } from 'next/cache';
import { Webhook, WebhookVerificationError } from 'standardwebhooks';

import { env } from '@/../env.mjs';

const webhook = new Webhook(btoa(env.GROWTHBOOK_WEBHOOK_SECRET));

export const POST = StandardWebhookHandler({
	webhook,
	handleData: (data) => {
		if (isPayloadChangedEvent(data)) {
			revalidateTag('growthbook');
		}
	},
});

function isPayloadChangedEvent(data: unknown) {
	return typeof data === 'object' && data !== null && 'type' in data && data.type === 'payload.changed';
}

function StandardWebhookHandler(options: {
	webhook: Webhook;
	handleData: (data: unknown) => void | PromiseLike<void>;
}) {
	return async (req: Request) => {
		try {
			const data = options.webhook.verify(await req.text(), Object.fromEntries(req.headers));

			await options.handleData(data);

			return new Response(null, { status: 200 });
		} catch (e) {
			if (e instanceof WebhookVerificationError || e instanceof SyntaxError) {
				return new Response(env.NODE_ENV === 'development' ? e.message : null, {
					status: 400,
				});
			}
			throw e;
		}
	};
}
