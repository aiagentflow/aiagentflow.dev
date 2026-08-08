import type { Metadata } from "next";
import { AIScribePage } from "@/components/AIScribePage";
import { absoluteUrl, canonicalPath, languageAlternates } from "@/lib/seo";

interface AIScribeProps {
    params: { locale: string };
}

export async function generateMetadata({ params }: AIScribeProps): Promise<Metadata> {
    const canonical = canonicalPath(params.locale, "/aiscribe");

    return {
        metadataBase: new URL(absoluteUrl("/")),
        title: "AIScribe — Your AI's scribe. Every session, recorded.",
        description:
            "Never lose context across AI coding sessions. One command journals your git diff into a searchable, structured session log. Works with Claude Code, Cursor, Codex, or any AI coding tool.",
        alternates: {
            canonical,
            languages: languageAlternates("/aiscribe"),
        },
        openGraph: {
            title: "AIScribe — Your AI's scribe. Every session, recorded.",
            description:
                "One command after every AI coding session. AIScribe reads your git diff, generates a structured summary via LLM, and stores it forever.",
            url: absoluteUrl(canonical),
            type: "website",
        },
    };
}

export default function AIScribe() {
    return <AIScribePage />;
}
