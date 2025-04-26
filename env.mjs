import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		POSTGRES_URL: z.string().url(),
		NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
		GROWTHBOOK_WEBHOOK_SECRET: z.string(),

		EMAIL_SMTP_HOST: z.string(),
		EMAIL_SMTP_USER: z.string(),
		EMAIL_SMTP_PASSWORD: z.string(),
		EMAIL_SMTP_SECURE: z.coerce.boolean(),
		EMAIL_SMTP_FROM: z.string().email(),
	},
	client: {
		NEXT_PUBLIC_GROWTHBOOK_API_HOST: z.string().url(),
		NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: z.string(),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_GROWTHBOOK_API_HOST: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
		NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
	},
});
