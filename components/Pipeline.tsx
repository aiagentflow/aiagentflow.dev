"use client";

import { motion } from "framer-motion";

const steps = [
    {
        n: "01", tag: "plan", title: "Architect",
        lead: "Reads your codebase, prior decisions, and PRDs. Drafts a step-by-step plan before any code is written.",
        bullets: ["Embedding-indexed repo context", "Existing pattern detection", "Risk + change-surface analysis"],
    },
    {
        n: "02", tag: "write", title: "Coder",
        lead: "Executes the plan one step at a time. Writes diffs, not whole files. Respects your conventions.",
        bullets: ["Uses your formatter, linter, types", "Streams diffs to your editor", "Pauses for ambiguous decisions"],
    },
    {
        n: "03", tag: "review", title: "Reviewer",
        lead: "Audits each diff for bugs, security, accessibility, and style — like a staff engineer doing an honest review.",
        bullets: ["400+ rule heuristics", "OWASP-aware static checks", "Inline review comments"],
    },
    {
        n: "04", tag: "verify", title: "Tester + Judge",
        lead: "Generates unit tests, runs them, and the Fixer + Judge agents close the loop until acceptance criteria are met.",
        bullets: ["Auto-retry on failure", "Coverage-gap detection", "Acceptance-criteria gating"],
    },
];

export function Pipeline() {
    return (
        <section
            id="how"
            style={{
                padding: "clamp(72px, 10vw, 140px) 0",
                background: "var(--ds-bg)",
                borderTop: "1px solid var(--ds-line)",
            }}
        >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 md:mb-16"
                >
                    <span className="eyebrow">How it works</span>
                    <h2
                        style={{
                            fontFamily: "var(--font-geist-sans), -apple-system, sans-serif",
                            fontSize: "clamp(28px, 3.5vw, 48px)",
                            lineHeight: 1.05,
                            letterSpacing: "-0.028em",
                            fontWeight: 500,
                            margin: "14px 0 16px",
                            color: "var(--ds-fg)",
                            maxWidth: "22ch",
                        }}
                    >
                        A deterministic pipeline.{" "}
                        <span style={{ color: "var(--ds-fg-3)" }}>Not a chat loop.</span>
                    </h2>
                    <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.55, color: "var(--ds-fg-2)", maxWidth: "60ch" }}>
                        Most agent frameworks are LLMs talking to themselves. aiagentflow is a Directed Acyclic Graph — predictable inputs, locally verifiable outputs, no hand-wavy reasoning chains.
                    </p>
                </motion.div>

                {/* Steps grid */}
                <div
                    style={{
                        gap: 1,
                        background: "var(--ds-line)",
                        border: "1px solid var(--ds-line)",
                        borderRadius: 12,
                        overflow: "hidden",
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {steps.map((s, i) => (
                        <motion.div
                            key={s.n}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            style={{
                                background: "var(--ds-bg-1)",
                                padding: "28px 24px",
                                display: "flex", flexDirection: "column", gap: 16,
                                minHeight: 300,
                                position: "relative",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <span
                                    className="font-mono-var"
                                    style={{ fontSize: 11, color: "var(--ds-fg-3)", letterSpacing: "0.06em" }}
                                >
                                    {s.n}
                                </span>
                                <span className="ds-tag">
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
                                    {s.tag}
                                </span>
                            </div>

                            <div style={{ marginTop: 8 }}>
                                <h3 style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--ds-fg)", margin: "0 0 8px" }}>
                                    {s.title}
                                </h3>
                                <p style={{ fontSize: 13.5, color: "var(--ds-fg-2)", lineHeight: 1.55, margin: 0 }}>{s.lead}</p>
                            </div>

                            <ul style={{ marginTop: "auto", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                                {s.bullets.map((b, j) => (
                                    <li
                                        key={j}
                                        className="font-mono-var"
                                        style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--ds-fg-2)" }}
                                    >
                                        <span style={{ color: "var(--accent)" }}>›</span>
                                        {b}
                                    </li>
                                ))}
                            </ul>

                            {/* arrow connector */}
                            {i < 3 && (
                                <div className="hidden lg:flex" style={{
                                    position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)",
                                    width: 20, height: 20, borderRadius: "50%",
                                    background: "var(--ds-bg)", border: "1px solid var(--ds-line)",
                                    alignItems: "center", justifyContent: "center",
                                    zIndex: 2, color: "var(--accent)",
                                }}>
                                    <svg width="8" height="8" viewBox="0 0 8 8">
                                        <path d="M1 4 L7 4 M5 1 L7 4 L5 7" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
