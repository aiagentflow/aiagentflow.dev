import Hero from "@/components/Hero";
import { Pipeline } from "@/components/Pipeline";
import { Features } from "@/components/Features";
import { LogoStrip } from "@/components/LogoStrip";
import { Providers } from "@/components/Providers";
import { Architecture } from "@/components/Architecture";
import { Comparison } from "@/components/Comparison";
import { Examples } from "@/components/Examples";
import { Testimonials } from "@/components/Testimonials";
import { InstallGuide } from "@/components/InstallGuide";
import { Community } from "@/components/Community";
import { getGitHubStats, getNpmVersion } from "@/lib/github";
import type { Metadata } from "next";
import { absoluteUrl, canonicalPath, languageAlternates, projectDescription, siteName } from "@/lib/seo";

interface HomeProps {
    params: { locale: string };
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
    const canonical = canonicalPath(params.locale, "/");

    return {
        metadataBase: new URL(absoluteUrl("/")),
        title: `${siteName} | Multi-Agent AI Workflow Orchestrator`,
        description: projectDescription,
        alternates: {
            canonical,
            languages: languageAlternates("/"),
        },
        openGraph: {
            title: `${siteName} | Your AI Engineering Team`,
            description: projectDescription,
            url: absoluteUrl(canonical),
            type: "website",
        },
    };
}

export default async function Home() {
    const [{ stars, contributors, prs, goodFirstIssues }, version] = await Promise.all([
        getGitHubStats(),
        getNpmVersion("@aiagentflow/cli"),
    ]);

    return (
        <main style={{ background: "var(--ds-bg)" }}>
            <Hero stars={stars} version={version} />
            <Pipeline />
            <LogoStrip />
            <Features />
            <Providers />
            <Architecture />
            <Comparison />
            <Examples />
            <Testimonials />
            <InstallGuide />
            <Community stars={stars} contributors={contributors} prs={prs} goodFirstIssues={goodFirstIssues} />
        </main>
    );
}
