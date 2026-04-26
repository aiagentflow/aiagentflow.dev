"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

function AgentDAG() {
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setTick(t => t + 1), 80);
        return () => clearInterval(id);
    }, []);

    const phase = (tick % 80) / 80;
    const activeIdx = Math.floor(phase * 4);

    const agents = [
        { id: "arch", label: "Architect", glyph: "A", x: 80, y: 100 },
        { id: "code", label: "Coder", glyph: "C", x: 240, y: 60 },
        { id: "rev", label: "Reviewer", glyph: "R", x: 240, y: 160 },
        { id: "test", label: "Tester", glyph: "T", x: 400, y: 100 },
    ];

    const edges = [
        { from: 0, to: 1, activeAt: 0 },
        { from: 0, to: 2, activeAt: 0 },
        { from: 1, to: 3, activeAt: 1 },
        { from: 2, to: 3, activeAt: 2 },
    ];

    return (
        <div
            style={{
                position: "relative",
                aspectRatio: "5 / 3",
                background: "var(--ds-bg-1)",
                border: "1px solid var(--ds-line)",
                borderRadius: 12,
                overflow: "hidden",
            }}
        >
            {/* faint grid */}
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "linear-gradient(to right, var(--ds-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--ds-grid) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
            }} />

            {/* top labels */}
            <div style={{
                position: "absolute", top: 12, left: 16, right: 16,
                display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
                <span
                    className="font-mono-var"
                    style={{ fontSize: 10, color: "var(--ds-fg-3)", letterSpacing: "0.06em", textTransform: "uppercase" }}
                >
                    pipeline · run #4720
                </span>
                <span className="ds-tag" style={{ fontSize: 10, gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 8px var(--accent-glow)", animation: "pulse-dot 1.6s ease-in-out infinite", display: "inline-block" }} />
                    EXECUTING
                </span>
            </div>

            <svg viewBox="0 0 480 220" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
                <defs>
                    <linearGradient id="edge-flow" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
                        <stop offset="0.5" stopColor="var(--accent-hi)" stopOpacity="1" />
                        <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                    <radialGradient id="node-glow">
                        <stop offset="0" stopColor="var(--accent)" stopOpacity="0.6" />
                        <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {edges.map((e, i) => {
                    const from = agents[e.from];
                    const to = agents[e.to];
                    const isActive = e.activeAt === activeIdx;
                    const t = (tick % 20) / 20;
                    const px = from.x + 22 + (to.x - 22 - (from.x + 22)) * t;
                    const py = from.y + (to.y - from.y) * t;
                    return (
                        <g key={i}>
                            <line x1={from.x + 22} y1={from.y} x2={to.x - 22} y2={to.y}
                                stroke="var(--ds-line-hi)" strokeWidth="1" strokeDasharray="3 3" />
                            {isActive && (
                                <>
                                    <line x1={from.x + 22} y1={from.y} x2={to.x - 22} y2={to.y}
                                        stroke="url(#edge-flow)" strokeWidth="2"
                                        style={{ animation: "dash-flow 1.2s linear infinite" }} />
                                    <circle cx={px} cy={py} r="3" fill="var(--accent-hi)" />
                                    <circle cx={px} cy={py} r="6" fill="var(--accent)" opacity="0.3" />
                                </>
                            )}
                        </g>
                    );
                })}

                {agents.map((a, i) => {
                    const isActive = i === activeIdx;
                    return (
                        <g key={a.id}>
                            {isActive && <circle cx={a.x} cy={a.y} r="40" fill="url(#node-glow)" />}
                            <circle cx={a.x} cy={a.y} r="22"
                                fill="var(--ds-bg-2)"
                                stroke={isActive ? "var(--accent)" : "var(--ds-line-hi)"}
                                strokeWidth={isActive ? 1.5 : 1} />
                            <text x={a.x} y={a.y + 5} textAnchor="middle"
                                fontFamily="var(--font-geist-mono), ui-monospace, monospace"
                                fontSize="14" fontWeight="600"
                                fill={isActive ? "var(--accent-hi)" : "var(--ds-fg-2)"}>
                                {a.glyph}
                            </text>
                            <text x={a.x} y={a.y + 42} textAnchor="middle"
                                fontFamily="var(--font-geist-mono), ui-monospace, monospace"
                                fontSize="9.5" letterSpacing="0.04em"
                                fill={isActive ? "var(--ds-fg)" : "var(--ds-fg-3)"}
                                style={{ textTransform: "uppercase" }}>
                                {a.label}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* status footer */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "10px 16px",
                borderTop: "1px solid var(--ds-line)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                fontSize: 10, color: "var(--ds-fg-3)",
                background: "var(--ds-bg-1)",
            }}>
                <span>step {activeIdx + 1}/4 · {agents[activeIdx].label.toLowerCase()}</span>
                <span className="hidden sm:inline">↳ {["planning", "writing src/Header.tsx", "auditing diff", "running vitest"][activeIdx]}</span>
                <span>tokens: {(2420 + tick * 7).toLocaleString()}</span>
            </div>
        </div>
    );
}

function StreamingTerminal() {
    const lines = [
        { t: "cmd", s: '$ aiagentflow run "Build a responsive Next.js header" --stream' },
        { t: "sys", s: "◇ resolved 14 context files · 8.2k tokens" },
        { t: "agent", s: "┌ architect ─────────────────────────────────────────" },
        { t: "out", s: "│ analyzing layout/, components/header/, design-system.md" },
        { t: "out", s: "│ ✓ identified 3 breakpoints · drafted 5-step plan" },
        { t: "agent", s: "├ coder ─────────────────────────────────────────────" },
        { t: "out", s: "│ writing components/Header.tsx ░░░░░░ 100%" },
        { t: "out", s: "│ writing components/MobileNav.tsx ▓▓▓▓░░ 68%" },
        { t: "agent", s: "├ reviewer ──────────────────────────────────────────" },
        { t: "warn", s: "│ ⚠ a11y: button needs aria-label (line 42)" },
        { t: "agent", s: "├ fixer ─────────────────────────────────────────────" },
        { t: "ok", s: "│ ✓ resolved 1 review comment" },
        { t: "agent", s: "├ tester ────────────────────────────────────────────" },
        { t: "ok", s: "│ ✓ 8/8 unit tests passed in 1.4s" },
        { t: "agent", s: "└ judge ─────────────────────────────────────────────" },
        { t: "ok", s: "  ✓ all acceptance criteria met" },
        { t: "sys", s: "" },
        { t: "sys", s: "◆ done · 2 files changed · 142 lines · 18.4s" },
    ];

    const [shown, setShown] = useState(0);

    useEffect(() => {
        if (shown >= lines.length) {
            const id = setTimeout(() => setShown(0), 3000);
            return () => clearTimeout(id);
        }
        const delay = lines[shown].t === "agent" ? 200 : lines[shown].t === "out" ? 280 : 160;
        const id = setTimeout(() => setShown(shown + 1), delay);
        return () => clearTimeout(id);
    }, [shown]);

    const palette: Record<string, string> = {
        cmd: "var(--ds-fg)",
        sys: "var(--ds-fg-3)",
        agent: "var(--accent-hi)",
        out: "var(--ds-fg-2)",
        warn: "var(--warn)",
        ok: "var(--ok)",
        err: "var(--err)",
    };

    return (
        <div style={{
            background: "var(--ds-code-bg)",
            border: "1px solid var(--ds-line)",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 24px 64px -24px rgba(0,0,0,.4)",
        }}>
            {/* chrome */}
            <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 14px",
                borderBottom: "1px solid var(--ds-line)",
                background: "var(--ds-bg-2)",
            }}>
                <div style={{ display: "flex", gap: 6 }}>
                    {["var(--ds-bg-3)", "var(--ds-bg-3)", "var(--ds-bg-3)"].map((bg, i) => (
                        <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: bg, border: "1px solid var(--ds-line-hi)" }} />
                    ))}
                </div>
                <span
                    style={{ fontSize: 11, color: "var(--ds-fg-3)", marginLeft: 8, fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
                    className="hidden sm:inline"
                >
                    ~/projects/acme-app — zsh
                </span>
                <span style={{ marginLeft: "auto" }}>
                    <span className="ds-tag" style={{ fontSize: 10, gap: 5 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", animation: "pulse-dot 1.6s ease-in-out infinite", display: "inline-block" }} />
                        STREAMING
                    </span>
                </span>
            </div>
            <div
                className="font-mono-var"
                style={{
                    padding: "16px 18px",
                    fontSize: "clamp(10px, 2.5vw, 12px)", lineHeight: 1.65,
                    minHeight: 240, maxHeight: 240, overflow: "hidden",
                    overflowX: "hidden",
                    display: "flex", flexDirection: "column",
                }}
            >
                {lines.slice(0, shown).map((l, i) => (
                    <div key={i} style={{ color: palette[l.t], whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {l.s || " "}
                    </div>
                ))}
                {shown < lines.length && (
                    <span style={{
                        display: "inline-block", width: 8, height: 14,
                        background: "var(--accent)",
                        animation: "cursor-blink 1s steps(2) infinite",
                        marginTop: 2,
                    }} />
                )}
            </div>
        </div>
    );
}

function LogoStrip() {
    const logos = ["VERCEL", "STRIPE/labs", "Linear", "Resend", "Supabase", "Railway", "Plaid", "Sentry", "Notion", "Cursor"];
    const doubled = [...logos, ...logos];
    return (
        <div style={{
            position: "relative", overflow: "hidden",
            maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
        }}>
            <div style={{ display: "flex", gap: 56, width: "max-content", animation: "marquee 40s linear infinite" }}>
                {doubled.map((l, i) => (
                    <div
                        key={i}
                        className="font-mono-var"
                        style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--ds-fg-3)", whiteSpace: "nowrap", opacity: 0.7 }}
                    >
                        {l}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Hero({ stars = "38", version = "v1.0.2" }: { stars?: string; version?: string }) {
    return (
        <section
            style={{
                position: "relative",
                paddingTop: "clamp(64px, 8vw, 120px)",
                paddingBottom: "clamp(48px, 6vw, 96px)",
                overflow: "hidden",
                background: "var(--ds-bg)",
            }}
        >
            {/* bg grid */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: "linear-gradient(to right, var(--ds-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--ds-grid) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
                maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000 30%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, #000 30%, transparent 70%)",
            }} />
            {/* glow */}
            <div style={{
                position: "absolute", width: 720, height: 720,
                top: -240, left: "50%", transform: "translateX(-50%)",
                background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)",
                filter: "blur(40px)",
                pointerEvents: "none", opacity: 0.55,
            }} />

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* Left: copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        {/* badge */}
                        <div
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 8,
                                padding: "5px 10px 5px 6px",
                                border: "1px solid var(--ds-line-hi)",
                                borderRadius: 999,
                                fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                                fontSize: 11, color: "var(--ds-fg-1)",
                                background: "var(--ds-bg-1)",
                                marginBottom: 24,
                            }}
                        >
                            <span style={{
                                background: "var(--accent)", color: "#fff",
                                fontSize: 10, fontWeight: 600, letterSpacing: "0.04em",
                                padding: "2px 6px", borderRadius: 999, textTransform: "uppercase",
                            }}>{version}</span>
                            Self-healing pipelines now in beta
                            <svg width="10" height="10" viewBox="0 0 10 10" style={{ opacity: 0.6 }}>
                                <path d="M3 2 L7 5 L3 8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                            </svg>
                        </div>

                        {/* headline */}
                        <h1
                            style={{
                                fontFamily: "var(--font-geist-sans), -apple-system, sans-serif",
                                fontSize: "clamp(36px, 6vw, 80px)",
                                lineHeight: 0.96,
                                letterSpacing: "-0.035em",
                                fontWeight: 500,
                                margin: "0 0 20px",
                                color: "var(--ds-fg)",
                            }}
                        >
                            Ship code with a<br />
                            <span style={{
                                background: "linear-gradient(120deg, var(--ds-fg) 30%, var(--accent-hi) 50%, var(--ds-fg) 70%)",
                                backgroundSize: "200% 100%",
                                WebkitBackgroundClip: "text", backgroundClip: "text",
                                color: "transparent",
                                animation: "shimmer 6s linear infinite",
                            }}>
                                team of agents,
                            </span><br />
                            not a chat box.
                        </h1>

                        {/* lead */}
                        <p style={{
                            fontSize: "clamp(15px, 1.2vw, 18px)",
                            lineHeight: 1.55,
                            color: "var(--ds-fg-2)",
                            maxWidth: "52ch",
                            margin: "0 0 32px",
                        }}>
                            <strong style={{ color: "var(--ds-fg)", fontWeight: 500 }}>aiagentflow</strong> is a local-first orchestration framework for software engineering.
                            A deterministic DAG of specialized agents — Architect, Coder, Reviewer, Tester — that plan, write, audit, and verify changes from your terminal.
                        </p>

                        {/* CTAs */}
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                            <a
                                href="#install"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-150 hover:-translate-y-px"
                                style={{
                                    background: "var(--accent)",
                                    border: "1px solid var(--accent)",
                                    boxShadow: "0 0 0 1px rgba(255,255,255,.08) inset, 0 6px 20px var(--accent-glow)",
                                }}
                            >
                                Get started
                                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6 L10 6 M6 2 L10 6 L6 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </a>
                            <CopyInstallButton />
                        </div>

                        {/* stats strip */}
                        <div
                            style={{
                                display: "flex", gap: 24, marginTop: 40, paddingTop: 24,
                                borderTop: "1px solid var(--ds-line)",
                                flexWrap: "wrap",
                            }}
                        >
                            {[
                                { value: "100% OSS", label: "MIT licensed" },
                                { value: "6+", label: "Models supported" },
                                { value: "< 30s", label: "Avg run latency" },
                                { value: stars, label: "GitHub stars" },
                            ].map(s => (
                                <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <div
                                        className="font-mono-var"
                                        style={{ fontSize: 18, color: "var(--ds-fg)", fontWeight: 500, letterSpacing: "-0.01em" }}
                                    >
                                        {s.value}
                                    </div>
                                    <div
                                        className="font-mono-var"
                                        style={{ fontSize: 10, color: "var(--ds-fg-3)", textTransform: "uppercase", letterSpacing: "0.06em" }}
                                    >
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: visuals */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                        style={{ display: "flex", flexDirection: "column", gap: 16 }}
                    >
                        <AgentDAG />
                        <StreamingTerminal />
                    </motion.div>
                </div>

                {/* logo strip */}
                <div style={{ marginTop: "clamp(64px, 8vw, 96px)" }}>
                    <div className="eyebrow" style={{ justifyContent: "center", display: "flex", marginBottom: 20 }}>
                        Trusted by engineers at
                    </div>
                    <LogoStrip />
                </div>
            </div>
        </section>
    );
}

function CopyInstallButton() {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard?.writeText("npm i -g @aiagentflow/cli");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }, []);

    return (
        <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all duration-150"
            style={{
                background: "var(--ds-bg-1)",
                border: "1px solid var(--ds-line-hi)",
                fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                color: "var(--ds-fg-1)",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--ds-fg-3)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--ds-line-hi)")}
        >
            <span style={{ color: "var(--ds-fg-3)" }}>$</span>
            <span>npm i -g @aiagentflow/cli</span>
            {copied ? (
                <span style={{ color: "var(--ok)", marginLeft: 8, paddingLeft: 10, borderLeft: "1px solid var(--ds-line)", fontSize: 11 }}>copied</span>
            ) : (
                <span style={{ marginLeft: 6, paddingLeft: 10, borderLeft: "1px solid var(--ds-line)", color: "var(--ds-fg-3)" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <rect x="3.5" y="3.5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" />
                        <path d="M2.5 7.5V2.5h5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                </span>
            )}
        </button>
    );
}
