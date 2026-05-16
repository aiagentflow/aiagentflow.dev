import { getAllPosts } from "@/lib/content";
import { BlogGrid } from "@/components/BlogGrid";
import type { Metadata } from "next";
import { absoluteUrl, canonicalPath, languageAlternates, projectDescription, siteName } from "@/lib/seo";

interface BlogIndexProps {
    params: { locale: string };
}

export async function generateMetadata({ params }: BlogIndexProps): Promise<Metadata> {
    const path = "/blog";
    const canonical = canonicalPath(params.locale, path);

    return {
        metadataBase: new URL(absoluteUrl("/")),
        title: `Blog | ${siteName}`,
        description: "Articles about local AI workflows, multi-agent software engineering, and AI coding automation.",
        alternates: {
            canonical,
            languages: languageAlternates(path),
        },
        openGraph: {
            title: `Blog | ${siteName}`,
            description: projectDescription,
            url: absoluteUrl(canonical),
            type: "website",
        },
    };
}

export default function BlogIndex() {
    const allPosts = getAllPosts("blog");

    return (
        <div className="min-h-screen bg-brand-bg text-slate-900 dark:text-white py-24 px-6 md:px-12 relative overflow-hidden transition-colors duration-500">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[50%] h-[300px] bg-brand-primary/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none opacity-50" />
            <div className="absolute top-1/4 right-0 w-[40%] h-[400px] bg-brand-secondary/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none opacity-50" />

            <div className="max-w-7xl mx-auto relative z-10">
                <BlogGrid allPosts={allPosts} />
            </div>
        </div>
    );
}
