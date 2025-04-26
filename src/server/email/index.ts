import { env } from 'env.mjs';
import { createTransport } from 'nodemailer';

export type Mailer = ReturnType<typeof createTransport>;

/**
 * Cache the mailer in development. This avoids creating a new mailer on every HMR
 * update.
 */
const globalForMailer = globalThis as unknown as {
	mailer: Mailer | undefined;
};

export const mailer =
	globalForMailer.mailer ??
	createTransport({
		tls: {
			rejectUnauthorized: false,
		},
		host: env.EMAIL_SMTP_HOST,
		secure: env.EMAIL_SMTP_SECURE,
		auth: {
			user: env.EMAIL_SMTP_USER,
			pass: env.EMAIL_SMTP_PASSWORD,
		},
	});

if (env.NODE_ENV !== 'production') globalForMailer.mailer = mailer;
