"use client";

const installCommand = "npm install -g aiscribe";
const usageExample = `$ aiscribe log

📋 Scanning git diff...
   Branch: stripe-refunds
   Files: 47
   Changes: +892 / -156

🤖 Generating session summary...

✅ Session recorded!
   .aiscribe/sessions/2026-08-08-stripe-refunds.md

📖 View: cat .aiscribe/sessions/2026-08-08-stripe-refunds.md`;

const sessionOutput = `# Session: stripe-refunds

**Date:** 2026-08-08T14:32:00.000Z
**Files changed:** 47
**Lines:** +892 / -156

## Summary
Implemented Stripe refund processing with webhook support.
Added refund state machine to order service.

## Chunks
- **Payment API** (6 files, Risk: Medium)
  - Purpose: Stripe refund processing + webhook handler
  - Files: payment/refund.ts, payment/webhook.ts, ...
- **Database** (2 files, Risk: Low)
  - Purpose: Refund schema migration (additive only)
  - Files: migrations/2026-08-08-refund.sql
- **Frontend** (8 files, Risk: Low)
  - Purpose: Refund UI components
  - Files: components/Refund*.tsx

## Key Decisions
- Used Stripe webhooks instead of polling for refund status
- Idempotency key based on Stripe refund ID

## Suspicious Changes
- auth.ts — touched but unrelated to refunds. Worth a closer look.`;

function Section({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`max-w-[1280px] mx-auto px-4 sm:px-6 py-20 sm:py-28 ${className}`}
        >
            {children}
        </section>
    );
}

export function AIScribePage() {
    return (
        <main style={{ background: "var(--ds-bg)" }}>
            {/* Hero */}
            <Section>
                <div className="max-w-[720px] mx-auto text-center flex flex-col items-center gap-6">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em]"
                        style={{
                            background: "var(--ds-bg-2)",
                            color: "var(--ds-fg-2)",
                            border: "1px solid var(--ds-line)",
                        }}
                    >
                        Part of the aiagentflow suite
                    </div>

                    <h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-[-0.02em]"
                        style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                        Your AI&apos;s scribe.
                        <br />
                        <span style={{ color: "var(--accent)" }}>
                            Every session, recorded.
                        </span>
                    </h1>

                    <p
                        className="text-[17px] sm:text-[19px] leading-relaxed max-w-[540px]"
                        style={{ color: "var(--ds-fg-2)" }}
                    >
                        Never lose context across AI coding sessions. One command
                        after every session journals your git diff into a
                        structured, searchable log. Works with any AI coding tool.
                    </p>

                    <div className="flex items-center gap-3 flex-wrap justify-center">
                        {/* Copy install command */}
                        <button
                            onClick={() => navigator.clipboard.writeText(installCommand)}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-[14px] font-medium text-white transition-all duration-150 hover:-translate-y-px cursor-copy"
                            style={{
                                background: "var(--accent)",
                                boxShadow:
                                    "0 0 0 1px rgba(255,255,255,.08) inset, 0 4px 16px var(--accent-glow)",
                            }}
                            title="Click to copy"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <rect
                                    x="3"
                                    y="3"
                                    width="9"
                                    height="9"
                                    rx="2"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                />
                                <path
                                    d="M2 11V2h9"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                    strokeLinecap="round"
                                />
                            </svg>
                            {installCommand}
                        </button>
                        <a
                            href="https://github.com/aiagentflow/aiscribe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-[14px] font-medium transition-all duration-150"
                            style={{
                                border: "1px solid var(--ds-line)",
                                color: "var(--ds-fg-1)",
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                <path d="M7 0a7 7 0 00-2.2 13.64c.35.06.48-.15.48-.34v-1.17c-2 .43-2.42-.96-2.42-.96a1.9 1.9 0 00-.8-1.05c-.66-.45.05-.44.05-.44a1.5 1.5 0 011.1.74 1.54 1.54 0 002.1.6 1.54 1.54 0 01.46-.96c-1.6-.18-3.29-.8-3.29-3.57a2.8 2.8 0 01.74-1.94 2.6 2.6 0 01.07-1.92s.6-.19 1.98.74a6.9 6.9 0 013.6 0c1.37-.93 1.98-.74 1.98-.74a2.6 2.6 0 01.07 1.92 2.8 2.8 0 01.74 1.94c0 2.78-1.69 3.39-3.3 3.57a1.73 1.73 0 01.5 1.34v1.98c0 .19.13.4.49.34A7 7 0 007 0z" />
                            </svg>
                            GitHub
                        </a>
                    </div>

                    <p
                        className="text-[12px] mt-1"
                        style={{ color: "var(--ds-fg-3)" }}
                    >
                        Requires Node.js ≥ 20 · OpenRouter, Anthropic, OpenAI, or Ollama API key
                    </p>
                </div>
            </Section>

            {/* Terminal demo */}
            <Section className="!pt-0 sm:!pt-0">
                <div className="max-w-[720px] mx-auto">
                    <div
                        className="rounded-xl overflow-hidden border"
                        style={{ borderColor: "var(--ds-line)", background: "#0d1117" }}
                    >
                        {/* Title bar */}
                        <div
                            className="flex items-center gap-2 px-4 py-3 border-b"
                            style={{ borderColor: "rgba(255,255,255,0.08)" }}
                        >
                            <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                            <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                            <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
                            <span
                                className="ml-2 text-[11px]"
                                style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-geist-mono)" }}
                            >
                                terminal — aiscribe log
                            </span>
                        </div>
                        {/* Content */}
                        <pre
                            className="p-5 text-[13px] sm:text-[14px] leading-[1.7] overflow-x-auto"
                            style={{
                                fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                                color: "#c9d1d9",
                            }}
                        >
{usageExample}
                        </pre>
                    </div>
                </div>
            </Section>

            {/* How It Works */}
            <Section>
                <div className="max-w-[720px] mx-auto">
                    <h2
                        className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] mb-12 text-center"
                        style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                        How it works
                    </h2>
                    <div className="grid gap-8">
                        {[
                            {
                                step: "1",
                                title: "You finish an AI coding session",
                                desc: "Any tool — Claude Code, Cursor, Codex, Aider, Windsurf. It doesn't matter. AIScribe works on git diffs.",
                            },
                            {
                                step: "2",
                                title: "Run one command",
                                desc: "aiscribe log reads your git diff (staged + unstaged), sends it to an LLM, and generates a structured summary.",
                            },
                            {
                                step: "3",
                                title: "Session recorded forever",
                                desc: "The summary is saved as a markdown file in .aiscribe/sessions/. Git-trackable. Grep-able. Never lose context again.",
                            },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-5 items-start">
                                <div
                                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-[14px] font-bold"
                                    style={{
                                        background: "var(--ds-bg-2)",
                                        color: "var(--accent)",
                                        border: "1px solid var(--ds-line)",
                                    }}
                                >
                                    {item.step}
                                </div>
                                <div>
                                    <h3
                                        className="text-[17px] font-semibold mb-1"
                                        style={{ fontFamily: "var(--font-geist-sans)" }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="text-[15px] leading-relaxed" style={{ color: "var(--ds-fg-2)" }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Session output preview */}
            <Section>
                <div className="max-w-[720px] mx-auto">
                    <h2
                        className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] mb-4 text-center"
                        style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                        What you get
                    </h2>
                    <p
                        className="text-[16px] text-center mb-10"
                        style={{ color: "var(--ds-fg-2)" }}
                    >
                        Every session becomes a rich, structured document — not just a file list.
                    </p>
                    <div
                        className="rounded-xl overflow-hidden border p-6 sm:p-8"
                        style={{
                            borderColor: "var(--ds-line)",
                            background: "var(--ds-bg-1)",
                        }}
                    >
                        <pre
                            className="text-[13px] sm:text-[14px] leading-[1.65] whitespace-pre-wrap"
                            style={{
                                fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                                color: "var(--ds-fg-1)",
                            }}
                        >
                            {sessionOutput}
                        </pre>
                    </div>
                </div>
            </Section>

            {/* Providers */}
            <Section>
                <div className="max-w-[720px] mx-auto">
                    <h2
                        className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] mb-4 text-center"
                        style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                        Use any LLM
                    </h2>
                    <p
                        className="text-[16px] text-center mb-10"
                        style={{ color: "var(--ds-fg-2)" }}
                    >
                        One API key. 200+ models. Or run fully local.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { name: "OpenRouter", desc: "200+ models, one key" },
                            { name: "Anthropic", desc: "Claude" },
                            { name: "OpenAI", desc: "GPT-4o" },
                            { name: "Ollama", desc: "Local & free" },
                        ].map((provider) => (
                            <div
                                key={provider.name}
                                className="rounded-lg p-4 text-center border"
                                style={{
                                    borderColor: "var(--ds-line)",
                                    background: "var(--ds-bg-1)",
                                }}
                            >
                                <div
                                    className="text-[15px] font-semibold mb-1"
                                    style={{ fontFamily: "var(--font-geist-sans)" }}
                                >
                                    {provider.name}
                                </div>
                                <div className="text-[12px]" style={{ color: "var(--ds-fg-3)" }}>
                                    {provider.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-[13px] text-center mt-6" style={{ color: "var(--ds-fg-3)" }}>
                        Also supports DeepSeek, Qwen, Gemini, Mistral, and more via OpenRouter.
                    </p>
                </div>
            </Section>

            {/* CTA */}
            <Section>
                <div className="max-w-[560px] mx-auto text-center flex flex-col items-center gap-6">
                    <h2
                        className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em]"
                        style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                        Stop losing context.
                    </h2>
                    <p className="text-[17px] leading-relaxed" style={{ color: "var(--ds-fg-2)" }}>
                        Your AI writes code. AIScribe remembers why.
                        <br />
                        One command. Every session. Forever.
                    </p>
                    <button
                        onClick={() => navigator.clipboard.writeText(installCommand)}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-[15px] font-medium text-white transition-all duration-150 hover:-translate-y-px cursor-copy"
                        style={{
                            background: "var(--accent)",
                            boxShadow:
                                "0 0 0 1px rgba(255,255,255,.08) inset, 0 4px 16px var(--accent-glow)",
                        }}
                        title="Click to copy"
                    >
                        {installCommand}
                    </button>
                    <a
                        href="https://github.com/aiagentflow/aiscribe"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px]"
                        style={{ color: "var(--ds-fg-3)" }}
                    >
                        View on GitHub →
                    </a>
                </div>
            </Section>
        </main>
    );
}
