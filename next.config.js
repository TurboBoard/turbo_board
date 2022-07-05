/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["images.igdb.com", "images.turboboard.io"],
	},
};

module.exports = nextConfig;
