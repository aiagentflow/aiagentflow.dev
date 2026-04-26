"use client";

import { motion } from "framer-motion";

export function Community({ stars = "38", contributors = "0", prs = "0", goodFirstIssues = "0" }: { stars?: string; contributors?: string; prs?: string; goodFirstIssues?: string }) {
    return (
        <section
            id="community"
            style={{
                padding: "clamp(72px, 10vw, 140px) 0",
                background: "var(--ds-bg)",
                borderTop: "1px solid var(--ds-line)",
                position: "relative", overflow: "hidden",
            }}
        >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: "relative",
                        borderRadius: 18,
                        padding: "clamp(32px, 5vw, 80px)",
                        background: "linear-gradient(135deg, var(--ds-bg-1), var(--ds-bg-2))",
                        border: "1px solid var(--ds-line)",
                        overflow: "hidden",
                    }}
                >
                    {/* decorative DAG */}
                    <svg
                        viewBox="0 0 600 200"
                        style={{ position: "absolute", right: -80, top: -40, width: 640, opacity: 0.15, color: "var(--accent)", pointerEvents: "none" }}
                        aria-hidden="true"
                    >
                        <g stroke="currentColor" strokeWidth="1" fill="none">
                            {Array.from({ length: 30 }).map((_, i) => (
                                <circle key={i} cx={(i * 31) % 600} cy={(i * 47) % 200} r="2.5" fill="currentColor" />
                            ))}
                            <path d="M40 40 L120 80 L60 130 L180 100 L240 60 L320 120 L400 80 L480 140 L560 90" />
                            <path d="M80 160 L160 110 L260 150 L360 100 L460 60" />
                        </g>
                    </svg>

                    <div style={{ position: "relative", maxWidth: 720 }}>
                        <span className="eyebrow">Open source</span>
                        <h2 style={{
                            fontFamily: "var(--font-geist-sans), -apple-system, sans-serif",
                            fontSize: "clamp(28px, 3.5vw, 48px)",
                            lineHeight: 1.05,
                            letterSpacing: "-0.028em",
                            fontWeight: 500,
                            margin: "14px 0 16px",
                            color: "var(--ds-fg)",
                        }}>
                            From the community,{" "}
                            <span style={{ color: "var(--ds-fg-3)" }}>for the community.</span>
                        </h2>
                        <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.55, color: "var(--ds-fg-2)", marginBottom: 32 }}>
                            MIT licensed. {stars} stars. {contributors} contributors. We review PRs within 48 hours and ship a release every two weeks. The roadmap lives in the open.
                        </p>

                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                            <a
                                href="https://github.com/aiagentflow/aiagentflow"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 hover:-translate-y-px"
                                style={{ background: "var(--ds-fg)", color: "var(--ds-bg)", border: "1px solid var(--ds-fg)" }}
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                    <path d="M7 0a7 7 0 0 0-2.2 13.6c.35.07.48-.15.48-.34v-1.2c-1.95.42-2.36-.94-2.36-.94-.32-.81-.78-1.03-.78-1.03-.64-.43.05-.43.05-.43.7.05 1.07.72 1.07.72.62 1.07 1.64.76 2.04.58.06-.45.24-.76.44-.94-1.55-.18-3.18-.78-3.18-3.46 0-.76.27-1.39.72-1.88-.07-.18-.31-.9.07-1.87 0 0 .59-.19 1.92.72.56-.16 1.16-.23 1.75-.23.6 0 1.2.07 1.75.23 1.34-.91 1.92-.72 1.92-.72.38.97.14 1.69.07 1.87.45.49.72 1.12.72 1.88 0 2.69-1.64 3.28-3.2 3.45.25.22.48.65.48 1.31v1.94c0 .19.13.42.49.34A7 7 0 0 0 7 0Z" />
                                </svg>
                                Star on GitHub · {stars}
                            </a>
                            <a
                                href="https://github.com/aiagentflow/aiagentflow"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
                                style={{
                                    background: "transparent", color: "var(--ds-fg)",
                                    border: "1px solid var(--ds-line-hi)",
                                }}
                                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "var(--ds-bg-2)")}
                                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                            >
                                Good first issues · {goodFirstIssues}
                            </a>
                        </div>

                        {/* stats grid */}
                        <div style={{
                            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
                            background: "var(--ds-line)", border: "1px solid var(--ds-line)",
                            borderRadius: 8, overflow: "hidden",
                        }}
                            className="grid-cols-2 sm:grid-cols-4"
                        >
                            {[
                                { v: stars,        k: "GitHub stars" },
                                { v: contributors, k: "contributors" },
                                { v: prs,          k: "merged PRs" },
                                { v: "14d",   k: "release cadence" },
                            ].map(s => (
                                <div key={s.k} style={{ background: "var(--ds-bg-1)", padding: "16px 20px" }}>
                                    <div
                                        className="font-mono-var"
                                        style={{ fontSize: 22, color: "var(--ds-fg)", fontWeight: 500, letterSpacing: "-0.01em" }}
                                    >
                                        {s.v}
                                    </div>
                                    <div
                                        className="font-mono-var"
                                        style={{ fontSize: 10, color: "var(--ds-fg-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 2 }}
                                    >
                                        {s.k}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
