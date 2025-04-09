/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './env.mjs';

/** @type {import('next').NextConfig} */
export default {
	redirects: async () => {
		return [
			{
				source: '/vote',
				destination: '/projects',
				permanent: false, // fear of commitment
			},
		];
	},
};
