"use client";

export function LogoStrip() {
    const logos = ["VERCEL", "STRIPE", "Linear", "Resend", "Supabase", "Railway", "Plaid", "Sentry", "Notion", "Cursor"];
    return (
        <section style={{ padding: "48px 0", borderTop: "1px solid var(--ds-line)", borderBottom: "1px solid var(--ds-line)" }}>
            <div className="max-w-[960px] mx-auto px-4 sm:px-6 text-center">
                <span className="eyebrow" style={{ display: "block", marginBottom: 24 }}>
                    Trusted by engineers at
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32, rowGap: 16 }}>
                    {logos.map((l, i) => (
                        <span
                            key={i}
                            className="font-mono-var"
                            style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.01em", color: "var(--ds-fg-3)", opacity: 0.7 }}
                        >
                            {l}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
