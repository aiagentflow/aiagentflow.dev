import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/content';
import { siteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
    const staticLastModified = '2026-02-28';
    const routes = [
        '',
        '/docs',
        '/blog',
        '/privacy',
        '/terms'
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: staticLastModified,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const docs = getAllPosts('docs').map((post) => ({
        url: `${siteUrl}/docs/${post.metadata.slug}`,
        lastModified: post.metadata.date || staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const blogs = getAllPosts('blog').map((post) => ({
        url: `${siteUrl}/blog/${post.metadata.slug}`,
        lastModified: post.metadata.date || staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const pseo = getAllPosts('pseo').map((post) => ({
        url: `${siteUrl}/use-cases/${post.metadata.slug}`,
        lastModified: post.metadata.date || staticLastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    return [...routes, ...docs, ...blogs, ...pseo];
}
