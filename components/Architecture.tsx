"use client";

import { motion } from "framer-motion";

function ArchitectureDiagram() {
    const nodes = [
        { x: 60,  y: 40,  w: 140, h: 44, label: "CLI / SDK",       sub: "cli, programmatic",     layer: "input" },
        { x: 320, y: 40,  w: 200, h: 44, label: "DAG Orchestrator", sub: "state · gates · replay", layer: "core" },
        { x: 640, y: 40,  w: 140, h: 44, label: "Workspace",        sub: "fs · shell · git",       layer: "tool" },

        { x: 80,  y: 130, w: 120, h: 60, label: "Architect",      sub: "plan",       layer: "agent" },
        { x: 220, y: 130, w: 120, h: 60, label: "Coder",          sub: "write",      layer: "agent" },
        { x: 360, y: 130, w: 120, h: 60, label: "Reviewer",       sub: "audit",      layer: "agent" },
        { x: 500, y: 130, w: 120, h: 60, label: "Tester",         sub: "verify",     layer: "agent" },
        { x: 640, y: 130, w: 120, h: 60, label: "Fixer + Judge",  sub: "close loop", layer: "agent" },

        { x: 60,  y: 240, w: 140, h: 40, label: "Anthropic",   layer: "model" },
        { x: 215, y: 240, w: 110, h: 40, label: "OpenAI",      layer: "model" },
        { x: 340, y: 240, w: 110, h: 40, label: "Gemini",      layer: "model" },
        { x: 465, y: 240, w: 90,  h: 40, label: "Groq",        layer: "model" },
        { x: 570, y: 240, w: 110, h: 40, label: "OpenRouter",  layer: "model" },
        { x: 695, y: 240, w: 85,  h: 40, label: "Ollama",      layer: "model" },
    ];

    const layerColor: Record<string, string> = {
        input: "var(--info)",
        core:  "var(--accent)",
        agent: "var(--accent-hi)",
        tool:  "var(--ok)",
        model: "var(--ds-fg-2)",
    };

    return (
        <svg viewBox="0 0 840 320" style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
                <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0 0 L10 5 L0 10 Z" fill="var(--ds-line-hi)" />
                </marker>
            </defs>

            <text x="20" y="64" fontFamily="var(--font-geist-mono), ui-monospace" fontSize="9.5" fill="var(--ds-fg-3)" textAnchor="end" transform="rotate(-90 20 64)">I/O</text>
            <text x="20" y="160" fontFamily="var(--font-geist-mono), ui-monospace" fontSize="9.5" fill="var(--ds-fg-3)" textAnchor="end" transform="rotate(-90 20 160)">AGENTS</text>
            <text x="20" y="260" fontFamily="var(--font-geist-mono), ui-monospace" fontSize="9.5" fill="var(--ds-fg-3)" textAnchor="end" transform="rotate(-90 20 260)">MODELS</text>

            <g stroke="var(--ds-line-hi)" strokeWidth="1" fill="none">
                <path d="M200 62 L320 62" markerEnd="url(#arr)" />
                <path d="M520 62 L640 62" markerEnd="url(#arr)" />
                <path d="M420 84 Q140 110 140 130" />
                <path d="M420 84 Q280 110 280 130" />
                <path d="M420 84 Q420 110 420 130" />
                <path d="M420 84 Q560 110 560 130" />
                <path d="M420 84 Q700 110 700 130" />
                <path d="M140 190 L130 240" />
                <path d="M280 190 L270 240" />
                <path d="M420 190 L395 240" />
                <path d="M560 190 L510 240" />
                <path d="M700 190 L625 240" />
            </g>

            {nodes.map((n, i) => (
                <g key={i}>
                    <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="8"
                        fill="var(--ds-bg-1)"
                        stroke={layerColor[n.layer]} strokeOpacity="0.5" strokeWidth="1" />
                    <text x={n.x + n.w / 2} y={n.y + (n.sub ? n.h / 2 - 2 : n.h / 2 + 4)} textAnchor="middle"
                        fontFamily="var(--font-geist-sans), -apple-system, sans-serif"
                        fontSize="11.5" fontWeight="500" fill="var(--ds-fg)">
                        {n.label}
                    </text>
                    {n.sub && (
                        <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 13} textAnchor="middle"
                            fontFamily="var(--font-geist-mono), ui-monospace" fontSize="9" fill="var(--ds-fg-3)">
                            {n.sub}
                        </text>
                    )}
                </g>
            ))}
        </svg>
    );
}

export function Architecture() {
    return (
        <section
            style={{
                padding: "clamp(72px, 10vw, 140px) 0",
                background: "var(--ds-bg-1)",
                borderTop: "1px solid var(--ds-line)",
                borderBottom: "1px solid var(--ds-line)",
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
                    <span className="eyebrow">Architecture</span>
                    <h2 style={{
                        fontFamily: "var(--font-geist-sans), -apple-system, sans-serif",
                        fontSize: "clamp(28px, 3.5vw, 48px)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.028em",
                        fontWeight: 500,
                        margin: "14px 0 16px",
                        color: "var(--ds-fg)",
                    }}>
                        Under the hood:{" "}
                        <span style={{ color: "var(--ds-fg-3)" }}>schemas, gates, and DAGs.</span>
                    </h2>
                    <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.55, color: "var(--ds-fg-2)", maxWidth: "60ch" }}>
                        Every step is a typed contract. Every transition is a verifiable gate. The orchestrator is ~3,000 lines of zero-dependency TypeScript.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{
                        background: "var(--ds-bg-2)",
                        border: "1px solid var(--ds-line)",
                        borderRadius: 12,
                        padding: "clamp(20px, 3vw, 48px)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "linear-gradient(to right, var(--ds-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--ds-grid) 1px, transparent 1px)",
                        backgroundSize: "56px 56px",
                        opacity: 0.4,
                        borderRadius: "inherit",
                        pointerEvents: "none",
                    }} />
                    <div style={{ position: "relative", overflowX: "auto" }}>
                        <div style={{ minWidth: 480 }}>
                            <ArchitectureDiagram />
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
                    {[
                        { k: "Schema validation", v: "Zod-typed contracts at every step boundary. Invalid output is rejected before it propagates." },
                        { k: "Run replay", v: "Every run is a deterministic trace. Replay to debug, fork to A/B test prompts." },
                        { k: "Tool sandbox", v: "File + shell tools execute in a workspace sandbox. Diffs are previewed before apply." },
                        { k: "Cost budget", v: "Per-run + per-agent token budgets. Pipelines halt before they exceed your limit." },
                    ].map((b, i) => (
                        <motion.div
                            key={b.k}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                        >
                            <div
                                className="font-mono-var"
                                style={{ fontSize: 11, color: "var(--accent-hi)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}
                            >
                                {b.k}
                            </div>
                            <p style={{ fontSize: 13, color: "var(--ds-fg-2)", lineHeight: 1.55, margin: 0 }}>{b.v}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
