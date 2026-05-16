import { getAllPosts } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import { BookOpen, ChevronRight } from "lucide-react";
import {
    absoluteUrl,
    breadcrumbJsonLd,
    canonicalPath,
    languageAlternates,
    projectDescription,
    siteName,
    siteUrl,
} from "@/lib/seo";

interface DocsIndexProps {
    params: { locale: string };
}

export async function generateMetadata({ params }: DocsIndexProps): Promise<Metadata> {
    const path = "/docs";

    return {
        metadataBase: new URL(absoluteUrl("/")),
        title: `Documentation | ${siteName}`,
        description: "Install AI Agent Flow, configure providers, and understand the multi-agent roles used by the CLI.",
        alternates: {
            canonical: canonicalPath(params.locale, path),
            languages: languageAlternates(path),
        },
        openGraph: {
            title: `Documentation | ${siteName}`,
            description: projectDescription,
            url: absoluteUrl(canonicalPath(params.locale, path)),
            type: "website",
        },
    };
}

export default function DocsIndex() {
    const docs = getAllPosts("docs");
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "AI Agent Flow documentation",
            description: "Install AI Agent Flow, configure providers, and understand the multi-agent roles used by the CLI.",
            url: absoluteUrl("/docs"),
            mainEntity: {
                "@type": "ItemList",
                itemListElement: docs.map((doc, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: doc.metadata.title,
                    url: absoluteUrl(`/docs/${doc.metadata.slug}`),
                })),
            },
        },
        breadcrumbJsonLd([
            { name: "Home", url: siteUrl },
            { name: "Documentation", url: absoluteUrl("/docs") },
        ]),
    ];

    return (
        <div className="min-h-screen bg-brand-bg text-slate-900 dark:text-white py-24 px-6 md:px-12 relative overflow-hidden transition-colors duration-500">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="absolute top-0 left-1/4 w-[50%] h-[300px] bg-brand-primary/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none opacity-50" />

            <div className="max-w-5xl mx-auto relative z-10">
                <header className="mb-16">
                    <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary px-4 py-1.5 rounded-full text-xs font-semibold mb-8 uppercase tracking-wider">
                        <BookOpen className="h-4 w-4" />
                        Documentation
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif mb-6 tracking-tight">
                        AI Agent Flow documentation
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                        AI Agent Flow is an open-source, local-first multi-agent orchestration CLI for software engineering. These guides cover installation, provider setup, and the agent roles in the workflow.
                    </p>
                </header>

                <div className="grid gap-4">
                    {docs.map((doc) => (
                        <Link
                            key={doc.metadata.slug}
                            href={`/docs/${doc.metadata.slug}`}
                            className="group flex items-center justify-between gap-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-6 transition-colors hover:border-brand-primary/40"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                    {doc.metadata.title}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {doc.metadata.description}
                                </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-primary" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
