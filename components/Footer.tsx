"use client";

import { Link } from "@/i18n/navigation";

function BrandGlyph({ size = 24 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <defs>
                <linearGradient id="fg-glyph" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="var(--accent-hi)" />
                    <stop offset="1" stopColor="var(--accent-lo)" />
                </linearGradient>
            </defs>
            <rect x="0.5" y="0.5" width="25" height="25" rx="6" stroke="url(#fg-glyph)" strokeWidth="1" />
            <circle cx="7" cy="7" r="2" fill="var(--accent)" />
            <circle cx="19" cy="7" r="2" fill="var(--accent)" />
            <circle cx="7" cy="19" r="2" fill="var(--accent)" />
            <circle cx="19" cy="19" r="2" fill="var(--accent)" />
            <path d="M7 7 L19 7 L7 19 L19 19" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85" />
            <path d="M7 7 L19 19" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </svg>
    );
}

const cols = [
    {
        title: "Product",
        links: [
            { label: "Documentation", href: "https://www.npmjs.com/package/@aiagentflow/cli" },
            { label: "Comparisons", href: "/use-cases/aiagentflow-vs-langchain", internal: true },
            { label: "Changelog", href: "https://github.com/aiagentflow/aiagentflow/releases" },
            { label: "Roadmap", href: "https://github.com/aiagentflow/aiagentflow/issues" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Blog", href: "/blog", internal: true },
            { label: "Examples", href: "https://github.com/aiagentflow/aiagentflow/tree/main/examples" },
            { label: "API reference", href: "https://github.com/aiagentflow/aiagentflow#readme" },
            { label: "Cookbook", href: "https://github.com/aiagentflow/aiagentflow" },
        ],
    },
    {
        title: "Community",
        links: [
            { label: "GitHub", href: "https://github.com/aiagentflow/aiagentflow" },
            { label: "Contribute", href: "https://github.com/aiagentflow/aiagentflow/blob/main/CONTRIBUTING.md" },
            { label: "Good first issues", href: "https://github.com/aiagentflow/aiagentflow/labels/good%20first%20issue" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "License (MIT)", href: "https://opensource.org/licenses/MIT" },
            { label: "Privacy", href: "/privacy", internal: true },
            { label: "Terms", href: "/terms", internal: true },
        ],
    },
];

export function Footer() {
    return (
        <footer style={{ borderTop: "1px solid var(--ds-line)", background: "var(--ds-bg-1)", paddingTop: 64, paddingBottom: 32 }}>
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]"
                    style={{ gap: "clamp(32px, 4vw, 48px)", marginBottom: 64 }}
                >
                    {/* Brand column */}
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 mb-4 group"
                            style={{
                                fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                                fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em",
                                color: "var(--ds-fg)",
                                textDecoration: "none",
                            }}
                        >
                            <BrandGlyph size={24} />
                            <span>aiagentflow</span>
                        </Link>
                        <p style={{ marginTop: 16, color: "var(--ds-fg-2)", fontSize: 13, lineHeight: 1.55, maxWidth: "34ch" }}>
                            Open-source multi-agent orchestration for software engineering. Local-first, model-agnostic, MIT-licensed.
                        </p>
                        <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
                            <a
                                href="https://github.com/aiagentflow/aiagentflow"
                                target="_blank"
                                rel="noreferrer"
                                className="ds-kbd"
                                aria-label="GitHub"
                                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--ds-line-hi)")}
                                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--ds-line)")}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                    <path d="M7 0a7 7 0 0 0-2.2 13.6c.35.07.48-.15.48-.34v-1.2c-1.95.42-2.36-.94-2.36-.94-.32-.81-.78-1.03-.78-1.03-.64-.43.05-.43.05-.43.7.05 1.07.72 1.07.72.62 1.07 1.64.76 2.04.58.06-.45.24-.76.44-.94-1.55-.18-3.18-.78-3.18-3.46 0-.76.27-1.39.72-1.88-.07-.18-.31-.9.07-1.87 0 0 .59-.19 1.92.72.56-.16 1.16-.23 1.75-.23.6 0 1.2.07 1.75.23 1.34-.91 1.92-.72 1.92-.72.38.97.14 1.69.07 1.87.45.49.72 1.12.72 1.88 0 2.69-1.64 3.28-3.2 3.45.25.22.48.65.48 1.31v1.94c0 .19.13.42.49.34A7 7 0 0 0 7 0Z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Link columns */}
                    {cols.map(col => (
                        <div key={col.title}>
                            <span className="eyebrow" style={{ marginBottom: 14, display: "block" }}>{col.title}</span>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                                {col.links.map(l => (
                                    <li key={l.label}>
                                        {l.internal ? (
                                            <Link
                                                href={l.href}
                                                style={{ fontSize: 13, color: "var(--ds-fg-2)", textDecoration: "none", transition: "color .15s" }}
                                                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "var(--ds-fg)")}
                                                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "var(--ds-fg-2)")}
                                            >
                                                {l.label}
                                            </Link>
                                        ) : (
                                            <a
                                                href={l.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ fontSize: 13, color: "var(--ds-fg-2)", textDecoration: "none", transition: "color .15s" }}
                                                onMouseEnter={e => (e.currentTarget.style.color = "var(--ds-fg)")}
                                                onMouseLeave={e => (e.currentTarget.style.color = "var(--ds-fg-2)")}
                                            >
                                                {l.label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div style={{
                    paddingTop: 24, borderTop: "1px solid var(--ds-line)",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    flexWrap: "wrap", gap: 12,
                }}>
                    <div
                        className="font-mono-var"
                        style={{ fontSize: 11, color: "var(--ds-fg-3)" }}
                    >
                        © {new Date().getFullYear()} aiagentflow contributors · MIT License
                    </div>
                    <div
                        className="font-mono-var"
                        style={{ fontSize: 11, color: "var(--ds-fg-3)", display: "flex", alignItems: "center", gap: 8 }}
                    >
                        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--ok)", boxShadow: "0 0 8px var(--ok)" }} />
                        All systems operational
                    </div>
                </div>
            </div>
        </footer>
    );
}
