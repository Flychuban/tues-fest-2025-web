module.exports = {
	siteUrl: process.env.SITE_URL || 'https://tuesfest.bg',
	generateRobotsTxt: true,
	sitemapSize: 7000,
	exclude: ['/iskren', '/api', '/api/*'],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
			},
			{
				userAgent: '*',
				disallow: '/api',
			},
			{
				userAgent: '*',
				disallow: '/admin',
			},
			{
				userAgent: '*',
				disallow: '/iskren',
			},
			{
				userAgent: '*',
				disallow: '/auth',
			},
		],
	},
};
