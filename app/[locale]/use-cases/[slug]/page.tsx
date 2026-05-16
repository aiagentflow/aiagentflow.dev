import { getPostBySlug, getAllPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { TableOfContents } from "@/components/TableOfContents";
import { CallToAction } from "@/components/CallToAction";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    absoluteUrl,
    breadcrumbJsonLd,
    canonicalPath,
    languageAlternates,
    projectName,
    siteUrl,
} from "@/lib/seo";

interface PseoPageProps {
    params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: PseoPageProps): Promise<Metadata> {
    const post = getPostBySlug("pseo", params.slug);

    if (!post) {
        return { title: 'Not Found' };
    }

    const path = `/use-cases/${post.metadata.slug}`;
    const canonical = canonicalPath(params.locale, path);

    return {
        metadataBase: new URL(siteUrl),
        title: `${post.metadata.title} | AI Agent Flow`,
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
        },
        twitter: {
            card: "summary_large_image",
            title: post.metadata.title,
            description: post.metadata.description,
        }
    };
}

export default function PseoPage({ params }: PseoPageProps) {
    const post = getPostBySlug("pseo", params.slug);
    const allPosts = getAllPosts("pseo");

    if (!post) {
        notFound();
    }

    // Calculate Next/Prev
    const currentIndex = allPosts.findIndex(p => p.metadata.slug === params.slug);
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const canonical = absoluteUrl(canonicalPath(params.locale, `/use-cases/${post.metadata.slug}`));
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
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
            { name: "Use Cases", url: absoluteUrl("/use-cases/aiagentflow-vs-langchain") },
            { name: post.metadata.title, url: canonical },
        ]),
    ];

    return (
        <div className="min-h-screen bg-brand-bg relative overflow-hidden transition-colors duration-500">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Premium Dynamic Grid & Glow Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--brand-primary),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--brand-primary),0.05)_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-[-10%] w-[40%] h-[600px] bg-brand-primary/5 blur-[150px] rounded-full pointer-events-none opacity-30" />

            <div className="flex flex-col lg:flex-row w-full max-w-[1400px] mx-auto relative z-10">
                {/* Main Content Area */}
                <div className="flex-1 min-w-0 py-16 md:py-32 px-6 md:px-16 lg:px-20">
                    <article>
                        <header className="mb-20 pb-12 border-b border-white/5">
                            <div className="inline-flex items-center space-x-2 bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary px-4 py-1.5 rounded-full text-xs font-semibold mb-8 uppercase tracking-wider backdrop-blur-sm">
                                Comparison Guide
                            </div>
                            <h1 className="text-4xl md:text-7xl font-serif text-slate-900 dark:text-white mb-8 tracking-tight leading-[1.05] text-balance">
                                {post.metadata.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                                {post.metadata.description}
                            </p>
                        </header>

                        <MarkdownRenderer
                            content={post.content}
                            className="prose dark:prose-invert prose-slate prose-lg md:prose-xl max-w-none 
                            prose-h1:font-serif prose-h1:text-4xl md:prose-h1:text-5xl lg:prose-h1:text-6xl prose-h1:text-slate-900 dark:prose-h1:text-white prose-h1:tracking-tighter
                            prose-h2:font-serif prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:text-slate-900 dark:prose-h2:text-white/95 prose-h2:mt-24 prose-h2:mb-10 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-white/10
                            prose-h3:font-serif prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:text-slate-800 dark:prose-h3:text-white/90 prose-h3:mt-16 prose-h3:mb-6
                            prose-a:text-brand-primary hover:prose-a:text-brand-secondary prose-a:transition-colors prose-a:underline-offset-4
                            prose-code:text-brand-primary prose-code:bg-slate-100 dark:prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:border prose-code:border-slate-200 dark:prose-code:border-white/10 prose-code:before:content-none prose-code:after:content-none
                            prose-pre:bg-slate-900 dark:prose-pre:bg-[#09090b] prose-pre:border prose-pre:border-slate-800 dark:prose-pre:border-white/10 prose-pre:shadow-[0_0_40px_-10px_rgba(var(--brand-primary),0.15)] prose-pre:rounded-2xl
                            prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-bold
                            prose-table:border-collapse prose-th:bg-slate-50 dark:prose-th:bg-white/5 prose-th:p-5 prose-th:border prose-th:border-slate-200 dark:prose-th:border-white/10 prose-th:font-black prose-th:text-slate-900 dark:prose-th:text-white prose-td:p-5 prose-td:border prose-td:border-slate-200 dark:prose-td:border-white/10"
                        />

                        {/* Next/Prev Navigation */}
                        <div className="mt-32 pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row gap-4 justify-between">
                            {prevPost ? (
                                <Link
                                    href={`/use-cases/${prevPost.metadata.slug}`}
                                    className="group flex flex-col gap-2 p-8 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-brand-primary/30 dark:hover:border-brand-primary/30 transition-all text-left max-w-sm"
                                >
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                        Previous Comparison
                                    </span>
                                    <span className="text-slate-900 dark:text-white font-bold group-hover:text-brand-primary dark:group-hover:text-brand-primary transition-colors text-lg">
                                        {prevPost.metadata.title}
                                    </span>
                                </Link>
                            ) : <div />}

                            {nextPost ? (
                                <Link
                                    href={`/use-cases/${nextPost.metadata.slug}`}
                                    className="group flex flex-col gap-2 p-8 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-brand-primary/30 dark:hover:border-brand-primary/30 transition-all text-right max-w-sm"
                                >
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-end gap-2">
                                        Next Comparison
                                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                    <span className="text-slate-900 dark:text-white font-bold group-hover:text-brand-primary dark:group-hover:text-brand-primary transition-colors text-lg">
                                        {nextPost.metadata.title}
                                    </span>
                                </Link>
                            ) : <div />}
                        </div>

                        {/* High Converting Premium CTA Box */}
                        <CallToAction
                            headlinePrefix="Ready to build "
                            headlineGradient="better software?"
                            description="Stop wrestling with abstraction layers. Use our opinionated, high-performance CLI to orchestrate your local AI engineering team."
                            primaryButtonText="Start Building"
                        />
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
