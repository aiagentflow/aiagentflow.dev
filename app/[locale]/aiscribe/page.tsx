import type { Metadata } from "next";
import { AIScribePage } from "@/components/AIScribePage";
import { absoluteUrl, canonicalPath, languageAlternates } from "@/lib/seo";

interface AIScribeProps {
    params: { locale: string };
}

export async function generateMetadata({ params }: AIScribeProps): Promise<Metadata> {
    const canonical = canonicalPath(params.locale, "/aiscribe");
    const title = "AiScribe — Train LLM from the coding session";
    const description =
        "Open source CLI tool that journals AI coding sessions. Capture git diffs, full conversations, and export as training data to fine-tune your own LLM. Works with Claude Code, Cursor, pi, Codex, and any AI tool.";

    return {
        metadataBase: new URL(absoluteUrl("/")),
        title,
        description,
        keywords: [
            "ai coding journal", "ai session logger", "train llm from coding sessions", "ai training data",
            "cli tool ai", "git diff logger", "ai prompt capture", "fine tune llm coding data",
            "open source ai tool", "local first ai", "ai scribe", "coding session recorder",
            "claude code journal", "cursor session log", "ai agent context", "llm training dataset",
            "export ai conversations", "aiscribe", "ai pair programming log",
        ],
        alternates: {
            canonical,
            languages: languageAlternates("/aiscribe"),
        },
        openGraph: {
            title,
            description,
            url: absoluteUrl(canonical),
            siteName: "AiScribe",
            type: "website",
            images: [{
                url: absoluteUrl("/aiscribe/opengraph-image"),
                width: 1200,
                height: 630,
                alt: "AiScribe - Train LLM from the coding session",
            }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [absoluteUrl("/aiscribe/opengraph-image")],
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

export default function AIScribe() {
    return <AIScribePage />;
}
