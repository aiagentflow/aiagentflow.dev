"use client";

export function LogoStrip() {
    const logos = ["VERCEL", "STRIPE/labs", "Linear", "Resend", "Supabase", "Railway", "Plaid", "Sentry", "Notion", "Cursor"];
    const doubled = [...logos, ...logos];
    return (
        <section style={{ padding: "48px 0", borderTop: "1px solid var(--ds-line)", borderBottom: "1px solid var(--ds-line)" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
                <span className="eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>
                    Trusted by engineers at
                </span>
            </div>
            <div style={{
                position: "relative", overflow: "hidden", width: "100%",
                maskImage: "linear-gradient(to right, transparent, #000 15%, #000 85%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, #000 15%, #000 85%, transparent)",
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
        </section>
    );
}
