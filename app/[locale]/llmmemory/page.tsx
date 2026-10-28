import type { Metadata } from "next";
import { LlmmemoryPage } from "@/components/LlmmemoryPage";
import { absoluteUrl, canonicalPath, languageAlternates } from "@/lib/seo";

interface LlmmemoryProps {
    params: { locale: string };
}

const title = "llmmemory: long-term memory for AI coding agents";
const description =
    "Open source CLI that gives AI coding agents a memory across sessions. Facts are saved as plain Markdown files and recalled through Claude Code hooks and an MCP server: an index when a session starts, and the memories that match each message. No model, no server, no account. MIT.";

export async function generateMetadata({ params }: LlmmemoryProps): Promise<Metadata> {
    const canonical = canonicalPath(params.locale, "/llmmemory");

    return {
        metadataBase: new URL(absoluteUrl("/")),
        title,
        description,
        keywords: [
            "llm memory", "ai agent memory", "claude code memory", "long-term memory for ai agents",
            "persistent memory llm", "mcp memory server", "claude code hooks", "sessionstart hook",
            "userpromptsubmit hook", "agent context", "markdown memory", "cursor mcp memory",
            "codex cli memory", "gemini cli memory", "llmmemory", "local first ai tools", "open source cli",
        ],
        alternates: {
            canonical,
            languages: languageAlternates("/llmmemory"),
        },
        openGraph: {
            title,
            description,
            url: absoluteUrl(canonical),
            siteName: "llmmemory",
            type: "website",
            images: [{
                url: absoluteUrl("/llmmemory/opengraph-image"),
                width: 1200,
                height: 630,
                alt: "llmmemory - long-term memory for AI coding agents",
            }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [absoluteUrl("/llmmemory/opengraph-image")],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "SoftwareApplication",
            name: "llmmemory",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "macOS, Linux, Windows",
            description,
            url: absoluteUrl("/llmmemory"),
            downloadUrl: "https://www.npmjs.com/package/llmmemory",
            softwareVersion: "0.1.0",
            license: "https://github.com/aiagentflow/llmmemory/blob/main/LICENSE",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Organization", name: "aiagentflow", url: absoluteUrl("/") },
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                ["Does llmmemory need an AI model?", "No. Recall is keyword search with BM25-style ranking. Nothing to download, no API key, and nothing leaves your machine."],
                ["Where does llmmemory store memories?", "As Markdown files in .llmmemory/memories/ for the project and ~/.llmmemory/memories/ for facts that apply to every project."],
                ["How does the agent get its memories?", "A SessionStart hook hands it an index of every memory, a UserPromptSubmit hook adds the memories that match each message, and an MCP server offers remember, recall and forget tools."],
                ["Will llmmemory fill my context window?", "No. The index is one capped line per memory, and each message pulls in at most three memories, each only once per session."],
                ["Which coding agents does llmmemory work with?", "Automatic recall works with Claude Code. The MCP server works with any MCP client, including Cursor, Codex CLI and Gemini CLI."],
            ].map(([q, a]) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
            })),
        },
    ],
};

export default function Llmmemory() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <LlmmemoryPage />
        </>
    );
}
