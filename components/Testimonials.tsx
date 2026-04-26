"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "We replaced a six-step internal RFC-to-PR workflow with one aiagentflow command. Cycle time dropped from days to minutes — and the diffs are reviewable.",
        name: "Maya Okafor", role: "Staff Engineer, Resend", avatar: "MO",
    },
    {
        quote: "The DAG approach is the unlock. Loops were always a tax on my attention. With aiagentflow, the failure modes are inspectable and the wins are reproducible.",
        name: "Daniel Park", role: "Founding Engineer, Nuon", avatar: "DP",
    },
    {
        quote: "Local-first matters. We can't ship our trading code to a hosted agent. aiagentflow runs against our private fork of Llama on-prem and just works.",
        name: "Lior Avidan", role: "Head of Platform, Sigil Capital", avatar: "LA",
    },
    {
        quote: "I read the source on a Saturday and shipped a custom Reviewer agent on Sunday. The extension API is genuinely Unix-philosophy.",
        name: "Hana Sato", role: "OSS contributor", avatar: "HS",
    },
    {
        quote: "Pitched it to my team as 'GitHub Copilot, but it actually finishes the task.' Three months in, that pitch held up.",
        name: "Marcus Reyes", role: "Tech Lead, Plaid", avatar: "MR",
    },
    {
        quote: "Honest tooling. The Judge agent will tell you when the output isn't good enough — and stop, instead of pretending. Refreshing.",
        name: "Aiko Tanaka", role: "Principal Engineer, Vercel", avatar: "AT",
    },
];

export function Testimonials() {
    return (
        <section
            style={{
                padding: "clamp(72px, 10vw, 140px) 0",
                background: "var(--ds-bg)",
                borderTop: "1px solid var(--ds-line)",
            }}
        >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <span className="eyebrow">From engineers who ship</span>
                    <h2 style={{
                        fontFamily: "var(--font-geist-sans), -apple-system, sans-serif",
                        fontSize: "clamp(28px, 3.5vw, 48px)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.028em",
                        fontWeight: 500,
                        margin: "14px 0 16px",
                        color: "var(--ds-fg)",
                    }}>
                        Receipts.{" "}
                        <span style={{ color: "var(--ds-fg-3)" }}>Not vibes.</span>
                    </h2>
                    <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.55, color: "var(--ds-fg-2)", maxWidth: "60ch" }}>
                        What people building real products say about replacing their AI stack with aiagentflow.
                    </p>
                </motion.div>

                {/* masonry-style grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
                    {testimonials.map((t, i) => (
                        <motion.figure
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                            className="ds-card break-inside-avoid mb-5"
                            style={{ margin: "0 0 20px", padding: 24 }}
                        >
                            <svg width="20" height="14" viewBox="0 0 20 14" style={{ color: "var(--accent)", opacity: 0.7, marginBottom: 12, display: "block" }}>
                                <path d="M0 14V8C0 4 2 1 6 0L7 2C5 3 4 4 4 6H7V14H0ZM12 14V8C12 4 14 1 18 0L19 2C17 3 16 4 16 6H19V14H12Z" fill="currentColor" />
                            </svg>
                            <blockquote style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--ds-fg-1)" }}>
                                {t.quote}
                            </blockquote>
                            <figcaption style={{
                                marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--ds-line)",
                                display: "flex", alignItems: "center", gap: 12,
                            }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: "50%",
                                    background: "var(--ds-bg-2)", border: "1px solid var(--ds-line-hi)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                                    fontSize: 11, color: "var(--accent-hi)", fontWeight: 500,
                                    flexShrink: 0,
                                }}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <div style={{ fontSize: 13, color: "var(--ds-fg)", fontWeight: 500 }}>{t.name}</div>
                                    <div
                                        className="font-mono-var"
                                        style={{ fontSize: 11, color: "var(--ds-fg-3)" }}
                                    >
                                        {t.role}
                                    </div>
                                </div>
                            </figcaption>
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
