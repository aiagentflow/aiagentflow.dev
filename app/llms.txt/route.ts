import {
    absoluteUrl,
    blogLlmsEntries,
    comparisonLlmsEntries,
    docsLlmsEntries,
    githubUrl,
    npmUrl,
    projectDescription,
    projectName,
} from "@/lib/seo";

function section(title: string, entries: Array<{ title: string; url: string; description?: string }>) {
    return [
        `## ${title}`,
        "",
        ...entries.flatMap((entry) => [
            `- [${entry.title}](${entry.url})${entry.description ? `: ${entry.description}` : ""}`,
        ]),
        "",
    ].join("\n");
}

export function GET() {
    const body = [
        `# ${projectName}`,
        "",
        `> ${projectDescription}`,
        "",
        section("Project", [
            {
                title: "Homepage",
                url: absoluteUrl("/"),
                description: "Overview of AI Agent Flow and its local-first multi-agent workflow.",
            },
            {
                title: "AiScribe - AI Coding Session Journal",
                url: absoluteUrl("/aiscribe"),
                description: "Open source CLI tool to journal AI coding sessions. Export as training data to fine-tune your own LLM.",
            },
            {
                title: "GitHub repository",
                url: githubUrl,
                description: "Source code, issues, releases, and contribution workflow.",
            },
            {
                title: "npm package",
                url: npmUrl,
                description: "Installable CLI package for AI Agent Flow.",
            },
        ]),
        section("Documentation", [
            {
                title: "Documentation index",
                url: absoluteUrl("/docs"),
                description: "Core setup and concept guides.",
            },
            ...docsLlmsEntries(),
        ]),
        section("Comparisons", comparisonLlmsEntries()),
        section("Selected Articles", blogLlmsEntries()),
    ].join("\n").trimEnd();

    return new Response(`${body}\n`, {
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
        },
    });
}
