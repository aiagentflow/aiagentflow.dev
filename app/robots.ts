import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/_next/', '/api/'],
        },
        sitemap: 'https://aiagentflow.dev/sitemap.xml',
        host: 'https://aiagentflow.dev',
    };
}
