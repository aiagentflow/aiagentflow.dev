import { getAllPosts, getPostBySlug } from "@/lib/content";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { TableOfContents } from "@/components/TableOfContents";
import {
    absoluteUrl,
    breadcrumbJsonLd,
    canonicalPath,
    languageAlternates,
    projectName,
    siteName,
    siteUrl,
} from "@/lib/seo";

interface DocSlugPageProps {
    params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: DocSlugPageProps): Promise<Metadata> {
    const post = getPostBySlug("docs", params.slug);

    if (!post) {
        return { title: "Documentation Not Found" };
    }

    const path = `/docs/${post.metadata.slug}`;
    const canonical = canonicalPath(params.locale, path);

    return {
        metadataBase: new URL(siteUrl),
        title: `${post.metadata.title} | ${siteName} Docs`,
        description: post.metadata.description,
        keywords: post.metadata.keywords,
        alternates: {
            canonical,
            languages: languageAlternates(path),
        },
        openGraph: {
            title: post.metadata.title,
            description: post.metadata.description,
            url: absoluteUrl(canonical),
            type: "article",
            publishedTime: post.metadata.date,
            modifiedTime: post.metadata.date,
        },
        twitter: {
            card: "summary_large_image",
            title: post.metadata.title,
            description: post.metadata.description,
        },
    };
}

export function generateStaticParams() {
    return getAllPosts("docs").map((post) => ({ slug: post.metadata.slug }));
}

export default function DocSlugPage({ params }: DocSlugPageProps) {
    const post = getPostBySlug("docs", params.slug);

    if (!post) {
        notFound();
    }

    const canonical = absoluteUrl(canonicalPath(params.locale, `/docs/${post.metadata.slug}`));
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: post.metadata.title,
            description: post.metadata.description,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            author: {
                "@type": "Organization",
                name: projectName,
                url: siteUrl,
            },
            publisher: {
                "@type": "Organization",
                name: projectName,
                url: siteUrl,
            },
            mainEntityOfPage: canonical,
        },
        breadcrumbJsonLd([
            { name: "Home", url: siteUrl },
            { name: "Documentation", url: absoluteUrl("/docs") },
            { name: post.metadata.title, url: canonical },
        ]),
    ];

    return (
        <div className="min-h-screen bg-brand-bg relative overflow-hidden transition-colors duration-500">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="flex flex-col lg:flex-row w-full max-w-[1400px] mx-auto relative z-10">
                <div className="flex-1 min-w-0 py-16 md:py-28 px-6 md:px-16 lg:px-20">
                    <article>
                        <header className="mb-16 pb-10 border-b border-slate-200 dark:border-white/10">
                            <Link
                                href="/docs"
                                className="text-sm font-semibold text-brand-primary hover:underline"
                            >
                                Documentation
                            </Link>
                            <h1 className="mt-6 text-4xl md:text-6xl font-serif text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.05] text-balance">
                                {post.metadata.title}
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                                {post.metadata.description}
                            </p>
                        </header>

                        <MarkdownRenderer content={post.content} />
                    </article>
                </div>

                <div className="hidden xl:block w-80 py-28 px-8 sticky top-0 h-screen overflow-y-auto">
                    <TableOfContents />
                </div>
            </div>
        </div>
    );
}
