"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const cmds: Record<string, string> = {
    npm:  "npm i -g @aiagentflow/cli",
    pnpm: "pnpm add -g @aiagentflow/cli",
    bun:  "bun add -g @aiagentflow/cli",
    brew: "brew install aiagentflow/tap/aiagentflow",
};

export function InstallGuide() {
    const [tab, setTab] = useState("npm");
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard?.writeText(cmds[tab]);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <section
            id="install"
            style={{
                padding: "clamp(72px, 10vw, 140px) 0",
                background: "var(--ds-bg-1)",
                borderTop: "1px solid var(--ds-line)",
            }}
        >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                {/* Header — centered */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                    style={{ maxWidth: 720, margin: "0 auto 48px" }}
                >
                    <span className="eyebrow" style={{ justifyContent: "center" }}>Get started</span>
                    <h2 style={{
                        fontFamily: "var(--font-geist-sans), -apple-system, sans-serif",
                        fontSize: "clamp(28px, 3.5vw, 48px)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.028em",
                        fontWeight: 500,
                        margin: "14px 0 16px",
                        color: "var(--ds-fg)",
                    }}>
                        Install once.{" "}
                        <span style={{ color: "var(--ds-fg-3)" }}>Run anywhere.</span>
                    </h2>
                    <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.55, color: "var(--ds-fg-2)" }}>
                        Zero dependencies. Auto-detects models from your environment. First run wizard takes 90 seconds.
                    </p>
                </motion.div>

                <div style={{ maxWidth: 760, margin: "0 auto" }}>
                    {/* pkg manager tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <div style={{
                            display: "inline-flex", padding: 4, gap: 2,
                            background: "var(--ds-bg-2)", border: "1px solid var(--ds-line)",
                            borderRadius: 10, marginBottom: 16,
                        }}>
                            {Object.keys(cmds).map(k => (
                                <button
                                    key={k}
                                    onClick={() => setTab(k)}
                                    className="font-mono-var"
                                    style={{
                                        padding: "6px 14px", borderRadius: 6,
                                        fontSize: 12,
                                        color: tab === k ? "var(--ds-fg)" : "var(--ds-fg-3)",
                                        background: tab === k ? "var(--ds-bg)" : "transparent",
                                        fontWeight: tab === k ? 500 : 400,
                                        transition: "all .15s",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    {k}
                                </button>
                            ))}
                        </div>

                        {/* command box */}
                        <div style={{
                            background: "var(--ds-code-bg)", border: "1px solid var(--ds-line-hi)",
                            borderRadius: 12, padding: "20px 24px",
                            display: "flex", alignItems: "center", gap: 14,
                            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                            fontSize: 15,
                        }}>
                            <span style={{ color: "var(--ds-fg-3)" }}>$</span>
                            <span style={{ flex: 1, color: "var(--ds-fg)" }}>{cmds[tab]}</span>
                            <button
                                onClick={copy}
                                className="ds-kbd"
                                style={{ cursor: "pointer", transition: "border-color .15s" }}
                                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--ds-line-hi)")}
                                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--ds-line)")}
                            >
                                {copied ? (
                                    <span style={{ color: "var(--ok)" }}>copied</span>
                                ) : "copy"}
                            </button>
                        </div>
                    </motion.div>

                    {/* 3-step guide */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        style={{
                            marginTop: 32,
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 1,
                            background: "var(--ds-line)",
                            border: "1px solid var(--ds-line)",
                            borderRadius: 12,
                            overflow: "hidden",
                        }}
                        className="grid-cols-1 sm:grid-cols-3"
                    >
                        {[
                            { n: "01", title: "Install", body: "One-line install via your favorite package manager." },
                            { n: "02", title: "Auto-detect", body: "aiagentflow init scans for ANTHROPIC_API_KEY, OPENAI_API_KEY, ollama, etc." },
                            { n: "03", title: "Run", body: 'aiagentflow run "your task"' },
                        ].map(s => (
                            <div key={s.n} style={{ background: "var(--ds-bg)", padding: "24px 20px" }}>
                                <div className="font-mono-var" style={{ fontSize: 11, color: "var(--ds-fg-3)", marginBottom: 12, letterSpacing: "0.06em" }}>{s.n}</div>
                                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ds-fg)", marginBottom: 6 }}>{s.title}</div>
                                <div className="font-mono-var" style={{ fontSize: 12, color: "var(--ds-fg-2)", lineHeight: 1.55 }}>{s.body}</div>
                            </div>
                        ))}
                    </motion.div>

                    <div style={{ marginTop: 24, textAlign: "center", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a
                            href="https://github.com/aiagentflow/aiagentflow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-150"
                            style={{
                                border: "1px solid var(--ds-line-hi)", color: "var(--ds-fg)",
                                background: "transparent",
                            }}
                            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--ds-bg-2)")}
                            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                        >
                            Read the docs →
                        </a>
                        <a
                            href="https://github.com/aiagentflow/aiagentflow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-150"
                            style={{
                                border: "1px solid var(--ds-line-hi)", color: "var(--ds-fg)",
                                background: "transparent",
                            }}
                            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--ds-bg-2)")}
                            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                        >
                            View on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
