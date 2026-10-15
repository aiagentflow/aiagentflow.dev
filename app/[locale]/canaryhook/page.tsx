import type { Metadata } from "next";
import { CanaryhookPage } from "@/components/CanaryhookPage";
import { absoluteUrl, canonicalPath, languageAlternates } from "@/lib/seo";

interface CanaryhookProps {
    params: { locale: string };
}

const title = "canaryhook: catch the moment an AI agent goes looking for your credentials";
const description =
    "Open source CLI that plants decoy credentials in your project, then blocks the tool call the moment an AI coding agent reads one or carries the value off the machine. No model, no signatures, near-zero false positives. MIT.";

export async function generateMetadata({ params }: CanaryhookProps): Promise<Metadata> {
    const canonical = canonicalPath(params.locale, "/canaryhook");

    return {
        metadataBase: new URL(absoluteUrl("/")),
        title,
        description,
        keywords: [
            "canary token", "honeyfile", "honeytoken", "ai agent security", "prompt injection",
            "claude code hooks", "pretooluse hook", "mcp security", "credential exfiltration",
            "agent guardrails", "ai coding agent security", "decoy credentials", "canaryhook",
            "secret leak detection", "tripwire", "open source security cli", "local first security",
            "agent sandbox alternative", "supply chain postinstall",
        ],
        alternates: {
            canonical,
            languages: languageAlternates("/canaryhook"),
        },
        openGraph: {
            title,
            description,
            url: absoluteUrl(canonical),
            siteName: "canaryhook",
            type: "website",
            images: [{
                url: absoluteUrl("/canaryhook/opengraph-image"),
                width: 1200,
                height: 630,
                alt: "canaryhook - honeyfiles and canary tokens for AI coding agents",
            }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [absoluteUrl("/canaryhook/opengraph-image")],
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
            name: "canaryhook",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "macOS, Linux, Windows",
            description,
            url: absoluteUrl("/canaryhook"),
            downloadUrl: "https://www.npmjs.com/package/canaryhook",
            softwareVersion: "0.1.0",
            license: "https://github.com/aiagentflow/canaryhook/blob/main/LICENSE",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            author: { "@type": "Organization", name: "aiagentflow", url: absoluteUrl("/") },
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                ["Does canaryhook need an AI model?", "No. It is a hook and a set of string comparisons. Nothing to download, nothing to infer, and no API key."],
                ["Will canaryhook fire on my own code?", "It should never fire. The decoys are files no build, test, lint or runtime path has any reason to open, and they are gitignored by default."],
                ["What happens when it trips?", "The tool call is denied before it runs, so the agent never sees the file contents, and the event is appended to .canaryhook/alerts.jsonl."],
                ["Can an attacker read the real .env instead?", "Yes, and that is the honest limit. canaryhook is a smoke detector, not a lock. It catches indiscriminate credential hunting."],
                ["Is canaryhook safe to run in CI?", "Yes. canaryhook verify exits non-zero when any trip was recorded, and a malformed hook payload always exits 0, so a broken install fails open."],
            ].map(([q, a]) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
            })),
        },
    ],
};

export default function Canaryhook() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <CanaryhookPage />
        </>
    );
}
