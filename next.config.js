/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
	redirects: async () => [
		{
			source: "/community",
			destination: "https://www.guilded.gg/i/kjeQPrR2",
			permanent: true
		}
	]
};

module.exports = nextConfig;
