const path = require('path');

const securityHeaders = [
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on'
	},
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload'
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block'
	},
	{
		key: 'X-Frame-Options',
		value: 'deny'
	},
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff'
	},
	{
		key: 'Referrer-Policy',
		value: 'origin-when-cross-origin'
	},
	{
		key: 'Content-Security-Policy',
		value: "default-src 'self'; img-src https://*; child-src 'none';"
	}
]

module.exports = {
	reactStrictMode: true,
	env: {
		API_URL: process.env.NEXT_API_URL,
		NEXT_URL: process.env.NEXT_FRONT_URL,
		GOOGLE_ID: process.env.NEXT_GOOGLE_ID,
		GOOGLE_SECRET: process.env.NEXT_GOOGLE_SECRET,
		FACEBOOK_ID: process.env.NEXT_FACEBOOK_ID,
		FACEBOOK_SECRET: process.env.NEXT_FACEBOOK_SECRET,
		LINKAJA_DEEPLINK: process.env.LINKAJA_DEEPLINK,
		BISA_TANGKAP_ENABLED: true,
		BISA_JAWAB_ENABLED: true,
		SHARES_ENABLED: false,
		DAILY_MISSION_URL: `https://linkaja.id/home/dashboard`,
		LINKAJA_DEEPLINK: process.env.LINKAJA_DEEPLINK,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	async headers() {
		return [
			{
				// Apply these headers to all routes in your application.
				source: '/(.*)',
				headers: securityHeaders,
			},
		]
	},
}
