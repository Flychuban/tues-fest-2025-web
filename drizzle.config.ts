import { type Config } from 'drizzle-kit';

import { TF_YEAR_SHORT } from '@/constants/event';
import { env } from './env.mjs';

export default {
	schema: './src/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.POSTGRES_URL,
	},
	tablesFilter: [`tf${TF_YEAR_SHORT}_*`],
	verbose: true,
} satisfies Config;
