import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Vercel handles standard Next.js deployments automatically.
    // Removing output: 'export' to ensure i18n middleware works.
    output: "standalone",
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.producthunt.com",
            },
        ],
    },
    experimental: {
        outputFileTracingRoot: process.cwd(),
    },
};

export default withNextIntl(nextConfig);
