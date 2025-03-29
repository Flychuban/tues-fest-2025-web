import './env.mjs';

/** @type {import('next').NextConfig} */
export default {
	reactStrictMode: true,
	swcMinify: true,
	optimizeFonts: false,
	redirects: async () => {
		return [
			{
				source: '/vote',
				destination: '/projects',
				permanent: false,
			},
		];
	},
};
