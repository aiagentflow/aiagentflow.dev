"use client";

import { motion } from "framer-motion";

const features = [
    {
        icon: "lock",
        title: "Local-first by default",
        body: "Runs on your machine. Your code, prompts, and traces never leave the box unless you point it at a hosted model.",
    },
    {
        icon: "stack",
        title: "Framework agnostic",
        body: "TypeScript, Python, Rust, Go. React, Vue, Django, FastAPI. If you can build it, it can orchestrate it.",
    },
    {
        icon: "context",
        title: "Context-grounded",
        body: "Inject ADRs, API specs, design system docs, and PRDs as first-class context. Hallucinations drop, fidelity climbs.",
    },
    {
        icon: "heal",
        title: "Self-healing loops",
        body: "The Fixer, Tester, and Judge close the loop automatically. Most failures are resolved before they reach you.",
    },
    {
        icon: "plug",
        title: "Extensible primitives",
        body: "Write custom agents in TypeScript. Override prompts. Plug in your own tools, validators, and gates.",
    },
    {
        icon: "live",
        title: "Streams to your terminal",
        body: "--stream pipes diffs, traces, and tokens live. Auto-detects Anthropic, OpenAI, Gemini, Groq, OpenRouter, Ollama.",
    },
];

function FeatureIcon({ kind }: { kind: string }) {
    const s = { stroke: "currentColor", strokeWidth: 1.2, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    const icons: Record<string, React.ReactNode> = {
        lock: <g {...s}><rect x="4" y="9" width="14" height="10" rx="1.5" /><path d="M7 9V6a4 4 0 0 1 8 0v3" /><circle cx="11" cy="14" r="1.2" fill="currentColor" stroke="none" /></g>,
        stack: <g {...s}><path d="M11 3 L19 7 L11 11 L3 7 Z" /><path d="M3 11 L11 15 L19 11" /><path d="M3 15 L11 19 L19 15" /></g>,
        context: <g {...s}><rect x="3" y="4" width="16" height="14" rx="1.5" /><path d="M3 8 L19 8" /><path d="M6 12 L11 12 M6 15 L14 15" /></g>,
        heal: <g {...s}><path d="M11 4 L11 18 M4 11 L18 11" /><circle cx="11" cy="11" r="4" /></g>,
        plug: <g {...s}><rect x="6" y="4" width="10" height="11" rx="1.5" /><path d="M9 4 V2 M13 4 V2" /><path d="M11 15 V20" /></g>,
        live: <g {...s}><circle cx="11" cy="11" r="2" /><path d="M6 6 Q3 11 6 16 M16 6 Q19 11 16 16" /><path d="M8 8 Q6 11 8 14 M14 8 Q16 11 14 14" /></g>,
    };
    return (
        <svg width="22" height="22" viewBox="0 0 22 22" style={{ color: "var(--accent-hi)" }}>
            {icons[kind]}
        </svg>
    );
}

export function Features() {
    return (
        <section
            id="why"
            style={{
                padding: "clamp(72px, 10vw, 140px) 0",
                background: "var(--ds-bg-1)",
                borderTop: "1px solid var(--ds-line)",
                borderBottom: "1px solid var(--ds-line)",
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
                    <span className="eyebrow">Why aiagentflow</span>
                    <h2 style={{
                        fontFamily: "var(--font-geist-sans), -apple-system, sans-serif",
                        fontSize: "clamp(28px, 3.5vw, 48px)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.028em",
                        fontWeight: 500,
                        margin: "14px 0 16px",
                        color: "var(--ds-fg)",
                        maxWidth: "22ch",
                    }}>
                        Built for autonomous engineering, not{" "}
                        <span style={{ color: "var(--ds-fg-3)" }}>generic conversation.</span>
                    </h2>
                    <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.55, color: "var(--ds-fg-2)", maxWidth: "60ch" }}>
                        Six principles guide the framework. None of them involve hoping an LLM gets it right.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.07 }}
                            className="ds-card"
                            style={{ display: "flex", flexDirection: "column", gap: 14, minHeight: 200 }}
                        >
                            <div style={{
                                width: 36, height: 36, borderRadius: 8,
                                border: "1px solid var(--ds-line-hi)",
                                background: "var(--ds-bg-2)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <FeatureIcon kind={f.icon} />
                            </div>
                            <h3 style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--ds-fg)", margin: 0 }}>
                                {f.title}
                            </h3>
                            <p style={{ fontSize: 14, color: "var(--ds-fg-2)", lineHeight: 1.55, margin: 0 }}>{f.body}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
