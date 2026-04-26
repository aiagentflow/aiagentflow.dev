"use client";

import { motion } from "framer-motion";

const models = [
    { id: "anthropic", name: "Anthropic", model: "claude-sonnet-4", tag: "Recommended", tagColor: "var(--ok)", body: "Best-in-class at architectural reasoning and large diffs. Pairs with the Architect role.", glyph: "A" },
    { id: "openai", name: "OpenAI", model: "gpt-4o, o1", tag: "Fast", body: "Speed and tool-use. We default to OpenAI for the Coder + Fixer roles in mixed-model setups.", glyph: "O" },
    { id: "gemini", name: "Google", model: "gemini-2.5-pro", tag: "2M context", body: "Use the massive context window to feed entire monorepos to the Architect in one pass.", glyph: "G" },
    { id: "groq", name: "Groq", model: "llama-3.3-70b", tag: "Free tier", body: "Sub-second inference. Great for rapid iteration loops and the Tester role.", glyph: "g" },
    { id: "openrouter", name: "OpenRouter", model: "100+ models", tag: "Free models", body: "One API key, every model. Mix-and-match per-agent without juggling credentials.", glyph: "R" },
    { id: "ollama", name: "Ollama", model: "llama3, deepseek, …", tag: "Local", tagColor: "var(--accent-hi)", body: "Total privacy, zero cost. Run any GGUF model on your hardware — laptop or H100.", glyph: "◐" },
];

export function Providers() {
    return (
        <section
            id="providers"
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
                    className="mb-12"
                >
                    <span className="eyebrow">Bring your own models</span>
                    <h2 style={{
                        fontFamily: "var(--font-geist-sans), -apple-system, sans-serif",
                        fontSize: "clamp(28px, 3.5vw, 48px)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.028em",
                        fontWeight: 500,
                        margin: "14px 0 16px",
                        color: "var(--ds-fg)",
                    }}>
                        Six providers.{" "}
                        <span style={{ color: "var(--ds-fg-3)" }}>One config line.</span>
                    </h2>
                    <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.55, color: "var(--ds-fg-2)", maxWidth: "60ch" }}>
                        Mix and match per agent. The Architect can run on Claude while the Tester runs on a local Llama. Auto-detection picks up whatever credentials are in your environment.
                    </p>
                </motion.div>

                {/* Model cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {models.map((m, i) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.07 }}
                            className="ds-card"
                            style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                        >
                            <div style={{
                                width: 44, height: 44, borderRadius: 10,
                                background: "var(--ds-bg-2)", border: "1px solid var(--ds-line-hi)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                                fontSize: 18, fontWeight: 500,
                                color: "var(--accent-hi)",
                                flexShrink: 0,
                            }}>
                                {m.glyph}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                    <h3 style={{ fontSize: 14.5, fontWeight: 500, margin: 0, color: "var(--ds-fg)" }}>{m.name}</h3>
                                    {m.tag && (
                                        <span className="ds-tag" style={{ fontSize: 10, padding: "2px 6px" }}>
                                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: m.tagColor || "var(--ds-fg-3)", display: "inline-block" }} />
                                            {m.tag}
                                        </span>
                                    )}
                                </div>
                                <div
                                    className="font-mono-var"
                                    style={{ fontSize: 11, color: "var(--ds-fg-3)", marginBottom: 8 }}
                                >
                                    {m.model}
                                </div>
                                <p style={{ fontSize: 13, color: "var(--ds-fg-2)", lineHeight: 1.5, margin: 0 }}>{m.body}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Config example */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                        background: "var(--ds-code-bg)", border: "1px solid var(--ds-line)",
                        borderRadius: 12, overflow: "hidden",
                    }}
                >
                    <div style={{
                        padding: "8px 14px", borderBottom: "1px solid var(--ds-line)",
                        background: "var(--ds-bg-2)",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                        <span className="font-mono-var" style={{ fontSize: 11, color: "var(--ds-fg-3)" }}>aiagentflow.config.ts</span>
                        <span className="font-mono-var" style={{ fontSize: 10, color: "var(--ds-fg-3)" }}>typescript</span>
                    </div>
                    <pre
                        className="font-mono-var overflow-x-auto no-scrollbar"
                        style={{ margin: 0, padding: "20px 24px", fontSize: 13, lineHeight: 1.65, color: "var(--ds-fg-1)" }}
                    >
                        <span style={{ color: "var(--ds-fg-2)" }}>export default </span>
                        <span style={{ color: "var(--accent-hi)" }}>defineConfig</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{"({"}{"\n"}</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{"  agents: {"}{"\n"}</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{"    architect: { provider: "}</span>
                        <span style={{ color: "var(--accent-hi)" }}>&apos;anthropic&apos;</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{", model: "}</span>
                        <span style={{ color: "var(--ok)" }}>&apos;claude-sonnet-4&apos;</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{" },"}{"\n"}</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{"    coder:     { provider: "}</span>
                        <span style={{ color: "var(--accent-hi)" }}>&apos;openai&apos;</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{",    model: "}</span>
                        <span style={{ color: "var(--ok)" }}>&apos;gpt-4o&apos;</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{" },"}{"\n"}</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{"    reviewer:  { provider: "}</span>
                        <span style={{ color: "var(--accent-hi)" }}>&apos;anthropic&apos;</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{", model: "}</span>
                        <span style={{ color: "var(--ok)" }}>&apos;claude-sonnet-4&apos;</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{" },"}{"\n"}</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{"    tester:    { provider: "}</span>
                        <span style={{ color: "var(--accent-hi)" }}>&apos;ollama&apos;</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{",    model: "}</span>
                        <span style={{ color: "var(--ok)" }}>&apos;llama3:70b&apos;</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{" },"}{"\n"}</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{"  },"}{"\n"}</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{"  context: ["}</span>
                        <span style={{ color: "var(--ok)" }}>&apos;docs/**/*.md&apos;</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{", "}</span>
                        <span style={{ color: "var(--ok)" }}>&apos;src/**/*.ts&apos;</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{"],"}{"\n"}</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{"  stream: "}</span>
                        <span style={{ color: "var(--accent-hi)" }}>true</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{","}{"\n"}</span>
                        <span style={{ color: "var(--ds-fg-2)" }}>{"});"}</span>
                    </pre>
                </motion.div>
            </div>
        </section>
    );
}
