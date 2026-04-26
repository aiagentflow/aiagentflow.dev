import Hero from "@/components/Hero";
import { Pipeline } from "@/components/Pipeline";
import { Features } from "@/components/Features";
import { Providers } from "@/components/Providers";
import { Architecture } from "@/components/Architecture";
import { Comparison } from "@/components/Comparison";
import { Examples } from "@/components/Examples";
import { Testimonials } from "@/components/Testimonials";
import { InstallGuide } from "@/components/InstallGuide";
import { Community } from "@/components/Community";
import { getGitHubStats, getNpmVersion } from "@/lib/github";

export default async function Home() {
    const [{ stars, contributors, prs, goodFirstIssues }, version] = await Promise.all([
        getGitHubStats(),
        getNpmVersion("@aiagentflow/cli"),
    ]);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "AI Agent Flow",
        "operatingSystem": "Any with Node.js",
        "applicationCategory": "DeveloperApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
        },
        "description": "Open-source multi-agent AI orchestration framework for software development."
    };

    return (
        <main style={{ background: "var(--ds-bg)" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero stars={stars} version={version} />
            <Pipeline />
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
