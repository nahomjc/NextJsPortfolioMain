/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [{ source: "/sitemap.xml", destination: "/api/sitemap" }];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "miro.medium.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.medium.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn-images-1.medium.com",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
