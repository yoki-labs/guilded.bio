/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    redirects: async () => [
        {
            source: "/community",
            destination: "https://www.guilded.gg/i/kjeQPrR2",
            permanent: true,
        },
        {
            source: "/u/:userId",
            destination: "/users/:userId",
            permanent: true,
        },
    ],
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };
        return config;
    },
    images: {
        domains: ["s3-us-west-2.amazonaws.com"],
    },
    experimental: {
        images: {
            layoutRaw: true,
        },
    },
};

module.exports = nextConfig;
