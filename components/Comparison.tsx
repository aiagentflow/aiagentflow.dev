"use client";

import { motion } from "framer-motion";

const cols = ["aiagentflow", "LangChain", "AutoGPT", "Devin", "GitHub Copilot"];
const rows = [
    { k: "Local-first execution",       v: ["yes", "partial", "no", "no", "no"] },
    { k: "Multi-agent DAG (not loops)", v: ["yes", "no", "no", "yes", "no"] },
    { k: "Self-healing test/fix loop",  v: ["yes", "no", "partial", "yes", "no"] },
    { k: "BYO model (6+ providers)",    v: ["yes", "yes", "partial", "no", "no"] },
    { k: "Open source (MIT)",           v: ["yes", "yes", "yes", "no", "no"] },
    { k: "Deterministic replay",        v: ["yes", "no", "no", "partial", "no"] },
    { k: "Per-agent prompt overrides",  v: ["yes", "partial", "no", "no", "no"] },
    { k: "Zero-dep core",               v: ["yes", "no", "no", "no", "no"] },
    { k: "Cost per run (avg)",          v: ["$0.04", "$0.12", "$0.30", "$2.25", "—"] },
];

function Cell({ val, isUs }: { val: string; isUs: boolean }) {
    if (val === "yes") return <span style={{ color: isUs ? "var(--ok)" : "var(--ds-fg-2)", fontSize: 18 }}>●</span>;
    if (val === "no") return <span style={{ color: "var(--ds-fg-4)", fontSize: 18 }}>—</span>;
    if (val === "partial") return <span style={{ color: "var(--warn)", fontSize: 18 }}>◐</span>;
    return (
        <span
            className="font-mono-var"
            style={{ fontSize: 12, color: isUs ? "var(--ds-fg)" : "var(--ds-fg-2)" }}
        >
            {val}
        </span>
    );
}

export function Comparison() {
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
                    <span className="eyebrow">Honest comparison</span>
                    <h2 style={{
                        fontFamily: "var(--font-geist-sans), -apple-system, sans-serif",
                        fontSize: "clamp(28px, 3.5vw, 48px)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.028em",
                        fontWeight: 500,
                        margin: "14px 0 16px",
                        color: "var(--ds-fg)",
                    }}>
                        How we stack up against{" "}
                        <span style={{ color: "var(--ds-fg-3)" }}>the usual suspects.</span>
                    </h2>
                    <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.55, color: "var(--ds-fg-2)", maxWidth: "60ch" }}>
                        Same task — &ldquo;add an OAuth flow to a Next.js app&rdquo; — run across five tools. We&apos;re the right answer for shipping production code locally.
                    </p>
                </motion.div>

                {/* Table — horizontally scrollable on mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{ overflowX: "auto" }}
                >
                    <div style={{
                        border: "1px solid var(--ds-line)", borderRadius: 12,
                        overflow: "hidden", background: "var(--ds-bg-1)",
                        minWidth: 560,
                    }}>
                        {/* header row */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1.6fr repeat(5, 1fr)",
                            background: "var(--ds-bg-2)",
                            borderBottom: "1px solid var(--ds-line)",
                        }}>
                            <div style={{ padding: "14px 20px" }}>
                                <span
                                    className="font-mono-var"
                                    style={{ fontSize: 11, color: "var(--ds-fg-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}
                                >
                                    capability
                                </span>
                            </div>
                            {cols.map((c, i) => (
                                <div key={c} style={{
                                    padding: "14px 8px", textAlign: "center",
                                    borderLeft: "1px solid var(--ds-line)",
                                    background: i === 0 ? "color-mix(in oklab, var(--accent), transparent 88%)" : "transparent",
                                }}>
                                    <div style={{ fontSize: 12, fontWeight: 500, color: i === 0 ? "var(--accent-hi)" : "var(--ds-fg-1)" }}>
                                        {c}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* data rows */}
                        {rows.map((r, ri) => (
                            <div key={r.k} style={{
                                display: "grid",
                                gridTemplateColumns: "1.6fr repeat(5, 1fr)",
                                borderBottom: ri === rows.length - 1 ? "none" : "1px solid var(--ds-line)",
                            }}>
                                <div style={{ padding: "14px 20px", fontSize: 13, color: "var(--ds-fg-1)" }}>{r.k}</div>
                                {r.v.map((v, vi) => (
                                    <div key={vi} style={{
                                        padding: "14px 8px", textAlign: "center",
                                        borderLeft: "1px solid var(--ds-line)",
                                        background: vi === 0 ? "color-mix(in oklab, var(--accent), transparent 92%)" : "transparent",
                                    }}>
                                        <Cell val={v} isUs={vi === 0} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div
                    className="font-mono-var"
                    style={{ fontSize: 11, color: "var(--ds-fg-3)", marginTop: 16, textAlign: "right" }}
                >
                    ● supported · ◐ partial · — not supported
                </div>
            </div>
        </section>
    );
}
