import { getPostBySlug, getAllPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { TableOfContents } from "@/components/TableOfContents";
import Image from "next/image";
import { Clock, ChevronLeft, ChevronRight, Twitter, Facebook, Copy } from "lucide-react";
import {
    absoluteUrl,
    breadcrumbJsonLd,
    canonicalPath,
    languageAlternates,
    projectName,
    siteUrl,
} from "@/lib/seo";

interface PostPageProps {
    params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const post = getPostBySlug("blog", params.slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    const path = `/blog/${post.metadata.slug}`;
    const canonical = canonicalPath(params.locale, path);

    return {
        metadataBase: new URL(siteUrl),
        title: `${post.metadata.title} | AI Agent Flow Blog`,
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
            authors: post.metadata.author ? [post.metadata.author] : [],
            images: post.metadata.image ? [{ url: post.metadata.image }] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: post.metadata.title,
            description: post.metadata.description,
            images: post.metadata.image ? [post.metadata.image] : undefined,
        }
    };
}

export default function BlogPost({ params }: PostPageProps) {
    const post = getPostBySlug("blog", params.slug);
    const allPosts = getAllPosts("blog");

    if (!post) {
        notFound();
    }

    // Calculate Reading Time
    const readingTime = Math.ceil(post.content.split(/\s/g).length / 200);

    // Calculate Next/Prev
    const currentIndex = allPosts.findIndex(p => p.metadata.slug === params.slug);
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const canonical = absoluteUrl(canonicalPath(params.locale, `/blog/${post.metadata.slug}`));
    const image = post.metadata.image ? absoluteUrl(post.metadata.image) : undefined;
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            description: post.metadata.description,
            image,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            author: {
                "@type": "Organization",
                name: post.metadata.author || projectName,
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
            { name: "Blog", url: absoluteUrl("/blog") },
            { name: post.metadata.title, url: canonical },
        ]),
    ];

    return (
        <div className="min-h-screen bg-brand-bg relative transition-colors duration-500">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Massive Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] min-h-[500px] w-full overflow-hidden">
                <Image
                    src={post.metadata.image || "/blog-placeholder.jpg"}
                    alt={post.metadata.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6">
                    <div className="max-w-4xl w-full text-center">
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-primary text-white text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-2xl">
                            {post.metadata.category || "Engineering"}
                        </div>
                        <h1 className="text-4xl md:text-7xl font-serif text-white mb-8 tracking-tighter leading-[1.05] text-balance drop-shadow-2xl">
                            {post.metadata.title}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-bold text-sm uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500">By</span>
                                <span>{post.metadata.author || "AI Agent Flow Team"}</span>
                            </div>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                            <time dateTime={post.metadata.date}>
                                {new Date(post.metadata.date!).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric"
                                })}
                            </time>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-brand-primary" />
                                {readingTime} min read
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row w-full max-w-[1440px] mx-auto">
                {/* Main Content Area */}
                <div className="flex-1 min-w-0 py-16 md:py-32 px-6 md:px-16 lg:px-24">
                    <article className="min-w-0 w-full overflow-hidden">
                        <MarkdownRenderer content={post.content} />

                        {/* Social Share & Backlinks */}
                        <div className="mt-24 pt-12 border-t border-slate-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-8">
                            <div className="flex flex-wrap gap-4 items-center">
                                <span className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">Share this insight:</span>
                                <button className="p-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </button>
                                <button className="p-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </button>
                                <button className="p-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors">
                                    <Copy className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex gap-4">
                                {post.metadata.keywords?.slice(0, 3).map(kw => (
                                    <span key={kw} className="px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest">
                                        #{kw.replace(/\s+/g, '')}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Next/Prev Navigation */}
                        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {prevPost ? (
                                <Link
                                    href={`/blog/${prevPost.metadata.slug}`}
                                    className="group flex flex-col gap-3 p-6 sm:p-10 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-brand-primary/30 transition-all text-left min-w-0 overflow-hidden"
                                >
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
                                        Previous Insight
                                    </span>
                                    <span className="text-slate-900 dark:text-white font-serif text-2xl group-hover:text-brand-primary transition-colors">
                                        {prevPost.metadata.title}
                                    </span>
                                </Link>
                            ) : <div />}

                            {nextPost ? (
                                <Link
                                    href={`/blog/${nextPost.metadata.slug}`}
                                    className="group flex flex-col gap-3 p-6 sm:p-10 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-brand-primary/30 transition-all text-right min-w-0 overflow-hidden"
                                >
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center justify-end gap-2">
                                        Next Insight
                                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                    </span>
                                    <span className="text-slate-900 dark:text-white font-serif text-2xl group-hover:text-brand-primary transition-colors">
                                        {nextPost.metadata.title}
                                    </span>
                                </Link>
                            ) : <div />}
                        </div>

                        {/* Conversion CTA */}
                        <div className="mt-24 pt-24 border-t border-white/5 relative">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-32 bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-tertiary/20 to-transparent" />

                            <div className="text-center relative z-10 space-y-8">
                                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                                    <span className="text-slate-900 dark:text-white">Build your </span>
                                    <br className="hidden md:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-blue-500 to-brand-tertiary">
                                        local AI team today.
                                    </span>
                                </h3>

                                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                    Stop wrestling with complex abstractions. Use our opinionated CLI to orchestrate your custom, local AI developers.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                                    <Link
                                        href="/"
                                        className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(var(--brand-primary),0.5)] flex items-center justify-center w-full sm:w-auto"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 to-brand-tertiary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="relative flex items-center gap-2">
                                            Get Started Free
                                            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </Link>

                                    <a
                                        href="https://github.com/aiagentflow/aiagentflow"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white font-medium transition-all flex items-center gap-2 justify-center w-full sm:w-auto border border-slate-200 dark:border-white/10"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                        Star on GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>

                {/* Right Sidebar: Table of Contents */}
                <div className="hidden xl:block w-80 py-32 px-8 sticky top-0 h-screen overflow-y-auto">
                    <TableOfContents />
                </div>
            </div>
        </div>
    );
}
