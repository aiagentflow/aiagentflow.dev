"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const examples = [
    {
        tag: "feature",
        title: "Add Stripe checkout to a Next.js 15 app",
        stack: "Next.js · TS · Tailwind",
        stats: { files: 7, lines: 284, time: "34s", cost: "$0.06" },
        log: [
            ["arch", "plan: 6 steps · webhook + UI + types"],
            ["code", "+ src/api/checkout/route.ts"],
            ["code", "+ src/components/CheckoutButton.tsx"],
            ["rev",  "flagged: missing webhook signature check"],
            ["fix",  "✓ added stripe.webhooks.constructEvent"],
            ["test", "✓ 4/4 passed · happy + 3 error paths"],
        ],
    },
    {
        tag: "bugfix",
        title: "Fix race condition in WebSocket reconnect logic",
        stack: "Node · ws · vitest",
        stats: { files: 2, lines: 41, time: "12s", cost: "$0.02" },
        log: [
            ["arch", "reproduced bug · isolated to onclose handler"],
            ["code", "~ src/transport/ws-client.ts (debounced + guard)"],
            ["rev",  "lgtm · suggested addtl. test for cleanup"],
            ["test", "+ test for double-close · ✓ 11/11"],
        ],
    },
    {
        tag: "refactor",
        title: "Extract auth hooks into a typed package",
        stack: "React · TS · pnpm workspaces",
        stats: { files: 14, lines: 612, time: "1m 18s", cost: "$0.11" },
        log: [
            ["arch", "detected 9 call sites · cyclic dep risk: low"],
            ["code", "+ packages/auth/src/* (3 hooks, 2 types)"],
            ["code", "~ 9 imports updated across web/"],
            ["rev",  "flagged: missing peerDep on react"],
            ["fix",  "✓ added peerDeps + range"],
            ["test", "✓ 23/23 · including new contract tests"],
        ],
    },
];

const palette: Record<string, string> = {
    arch: "var(--accent-hi)",
    code: "var(--info)",
    rev:  "var(--warn)",
    fix:  "var(--ok)",
    test: "var(--ok)",
};

const tagDotColor: Record<string, string> = {
    feature: "var(--accent-hi)",
    bugfix:  "var(--ok)",
    refactor: "var(--info)",
};

export function Examples() {
    const [active, setActive] = useState(0);
    const ex = examples[active];

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
                    <span className="eyebrow">Example runs</span>
                    <h2 style={{
                        fontFamily: "var(--font-geist-sans), -apple-system, sans-serif",
                        fontSize: "clamp(28px, 3.5vw, 48px)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.028em",
                        fontWeight: 500,
                        margin: "14px 0 16px",
                        color: "var(--ds-fg)",
                    }}>
                        Real prompts.{" "}
                        <span style={{ color: "var(--ds-fg-3)" }}>Real diffs. Real fast.</span>
                    </h2>
                    <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.55, color: "var(--ds-fg-2)", maxWidth: "60ch" }}>
                        Three runs from the wild. Each one was issued as a single prompt and shipped to a real codebase without manual intervention.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* example list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {examples.map((e, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                style={{
                                    textAlign: "left",
                                    padding: 20,
                                    borderRadius: 12,
                                    border: `1px solid ${i === active ? "var(--accent)" : "var(--ds-line)"}`,
                                    background: i === active ? "color-mix(in oklab, var(--accent), transparent 92%)" : "var(--ds-bg)",
                                    cursor: "pointer",
                                    transition: "border-color .15s, background .15s",
                                    display: "flex", flexDirection: "column", gap: 8,
                                    width: "100%",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                                    <span className="ds-tag" style={{ fontSize: 10, padding: "2px 8px" }}>
                                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: tagDotColor[e.tag], display: "inline-block" }} />
                                        {e.tag}
                                    </span>
                                    <span className="font-mono-var" style={{ fontSize: 10, color: "var(--ds-fg-3)" }}>{e.stack}</span>
                                </div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ds-fg)", lineHeight: 1.35 }}>{e.title}</div>
                                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                                    {[
                                        { k: "files", v: e.stats.files },
                                        { k: "lines", v: e.stats.lines },
                                        { k: "time",  v: e.stats.time },
                                        { k: "cost",  v: e.stats.cost },
                                    ].map(s => (
                                        <div key={s.k} style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                            <span className="font-mono-var" style={{ fontSize: 13, color: "var(--ds-fg-1)", fontWeight: 500 }}>{s.v}</span>
                                            <span className="font-mono-var" style={{ fontSize: 9, color: "var(--ds-fg-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.k}</span>
                                        </div>
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* log viewer */}
                    <motion.div
                        key={active}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            background: "var(--ds-code-bg)", border: "1px solid var(--ds-line)",
                            borderRadius: 12, overflow: "hidden",
                            display: "flex", flexDirection: "column",
                        }}
                    >
                        <div style={{
                            padding: "10px 14px", borderBottom: "1px solid var(--ds-line)",
                            background: "var(--ds-bg-2)",
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                        }}>
                            <span className="font-mono-var" style={{ fontSize: 11, color: "var(--ds-fg-3)" }}>
                                run_log_{String(4720 + active).padStart(4, "0")}.txt
                            </span>
                            <span className="ds-tag" style={{ fontSize: 10, gap: 5 }}>
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ok)", display: "inline-block" }} />
                                COMPLETED
                            </span>
                        </div>
                        <div className="font-mono-var" style={{ padding: "20px 22px", fontSize: 12, lineHeight: 1.85, flex: 1 }}>
                            <div style={{ color: "var(--ds-fg-3)", marginBottom: 14 }}>
                                $ aiagentflow run &quot;{ex.title.toLowerCase()}&quot;
                            </div>
                            {ex.log.map((line, i) => (
                                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 6 }}>
                                    <span style={{ color: palette[line[0]], width: 40, textTransform: "uppercase", fontSize: 10, paddingTop: 3, flexShrink: 0 }}>
                                        {line[0]}
                                    </span>
                                    <span style={{ color: "var(--ds-fg-1)" }}>{line[1]}</span>
                                </div>
                            ))}
                            <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--ds-line)", color: "var(--ok)" }}>
                                ◆ done · {ex.stats.files} files · {ex.stats.lines} lines · {ex.stats.time} · {ex.stats.cost}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
