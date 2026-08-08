"use client";

const installCommand = "npm install -g aiscribe@1.0.0";

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`max-w-[960px] mx-auto px-4 sm:px-6 py-20 sm:py-28 ${className}`}>{children}</section>;
}

export function AIScribePage() {
  return (
    <main style={{ background: "var(--ds-bg)" }}>
      {/* Product nav */}
      <div className="border-b" style={{ borderColor: "var(--ds-line)", background: "var(--ds-bg-1)" }}>
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/aiscribe" className="flex items-center gap-2">
              <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
                <rect x="0.5" y="0.5" width="25" height="25" rx="6" stroke="var(--accent)" strokeWidth="1.5"/>
                <line x1="8" y1="8" x2="18" y2="8" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="8" y1="11" x2="18" y2="11" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="8" y1="14" x2="14" y2="14" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="font-semibold text-[14px]" style={{ fontFamily: "var(--font-geist-mono)", color: "var(--ds-fg)" }}>AIScribe</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: "#23863622", color: "#3fb950", border: "1px solid #23863644" }}>v1.0</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/aiagentflow/aiscribe" target="_blank" rel="noopener" className="text-[13px]" style={{ color: "var(--ds-fg-2)" }}>GitHub</a>
            <a href="https://www.npmjs.com/package/aiscribe" target="_blank" rel="noopener" className="text-[13px]" style={{ color: "var(--ds-fg-2)" }}>npm</a>
            <a href="/" className="text-[13px]" style={{ color: "var(--ds-fg-3)" }}>aiagentflow →</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <Section>
        <div className="max-w-[720px] mx-auto text-center flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ background: "var(--ds-bg-2)", color: "var(--ds-fg-2)", border: "1px solid var(--ds-line)" }}>
            Part of the aiagentflow suite
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-[-0.02em]" style={{ fontFamily: "var(--font-geist-sans)" }}>
            Your AI&apos;s scribe.<br />
            <span style={{ color: "var(--accent)" }}>Every session, recorded.</span>
          </h1>

          <p className="text-[17px] sm:text-[19px] leading-relaxed max-w-[540px]" style={{ color: "var(--ds-fg-2)" }}>
            One command after every AI coding session. AIScribe journals your git diff and conversation context into a structured, searchable log. Works with pi, Claude Code, Cursor, Codex, or any AI tool.
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <button onClick={() => navigator.clipboard.writeText(installCommand)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-[14px] font-medium text-white transition-all duration-150 hover:-translate-y-px"
              style={{ background: "var(--accent)", boxShadow: "0 0 0 1px rgba(255,255,255,.08) inset, 0 4px 16px var(--accent-glow)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="3" y="3" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M2 11V2h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              {installCommand}
            </button>
            <a href="https://github.com/aiagentflow/aiscribe" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-[14px] font-medium transition-all duration-150"
              style={{ border: "1px solid var(--ds-line)", color: "var(--ds-fg-1)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 0a7 7 0 00-2.2 13.64c.35.06.48-.15.48-.34v-1.17c-2 .43-2.42-.96-2.42-.96a1.9 1.9 0 00-.8-1.05c-.66-.45.05-.44.05-.44a1.5 1.5 0 011.1.74 1.54 1.54 0 002.1.6 1.54 1.54 0 01.46-.96c-1.6-.18-3.29-.8-3.29-3.57a2.8 2.8 0 01.74-1.94 2.6 2.6 0 01.07-1.92s.6-.19 1.98.74a6.9 6.9 0 013.6 0c1.37-.93 1.98-.74 1.98-.74a2.6 2.6 0 01.07 1.92 2.8 2.8 0 01.74 1.94c0 2.78-1.69 3.39-3.3 3.57a1.73 1.73 0 01.5 1.34v1.98c0 .19.13.4.49.34A7 7 0 007 0z"/></svg>
              GitHub
            </a>
          </div>
        </div>
      </Section>

      {/* Terminal preview */}
      <Section className="!pt-0 sm:!pt-0">
        <div className="max-w-[620px] mx-auto">
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--ds-line)", background: "#0d1117" }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }}/>
              <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }}/>
              <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }}/>
              <span className="ml-2 text-[11px]" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-geist-mono)" }}>aiscribe log -c -n "stripe-refunds"</span>
            </div>
            <pre className="p-5 text-[13px] sm:text-[14px] leading-[1.7] overflow-x-auto" style={{ fontFamily: "var(--font-geist-mono)", color: "#c9d1d9" }}>
              <span style={{color:"#8b949e"}}>  Tool:</span> <span style={{color:"#58a6ff"}}>pi</span>{"\n"}
              <span style={{color:"#8b949e"}}>  Prompts:</span> 24{"  "}<span style={{color:"#8b949e"}}>Files:</span> 47{"  "}<span style={{color:"#8b949e"}}>Changes:</span> <span style={{color:"#3fb950"}}>+892</span>/<span style={{color:"#f85149"}}>-156</span>{"\n\n"}
              <span style={{color:"#3fb950"}}>  Session recorded!</span>{"\n"}
              <span style={{color:"#8b949e"}}>  .aiscribe/sessions/2026-08-08-stripe-refunds.md</span>
            </pre>
          </div>
        </div>
      </Section>

      {/* Features grid */}
      <Section>
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] mb-12 text-center" style={{ fontFamily: "var(--font-geist-sans)" }}>13 commands, one tool</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["aiscribe log", "Journal git diff + AI context"],
              ["aiscribe search", "Semantic and keyword search"],
              ["aiscribe hotspots", "Files that change most often"],
              ["aiscribe history", "Timeline for any file"],
              ["aiscribe context", "Export history for AI agents"],
              ["aiscribe watch", "Auto-detect session completion"],
              ["aiscribe status", "Active AI coding sessions"],
              ["aiscribe export", "JSON, CSV, AI format export"],
              ["aiscribe sync", "Push to Docker DB/server"],
              ["aiscribe server", "Web UI on localhost:3848"],
              ["aiscribe doctor", "Validate your setup"],
              ["aiscribe setup", "Docker files or reconfigure"],
            ].map(([cmd, desc]) => (
              <div key={cmd} className="rounded-lg p-3 border" style={{ borderColor: "var(--ds-line)", background: "var(--ds-bg-1)" }}>
                <code className="text-[12px] font-semibold" style={{ color: "var(--accent)", fontFamily: "var(--font-geist-mono)" }}>{cmd}</code>
                <p className="text-[12px] mt-1" style={{ color: "var(--ds-fg-3)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Providers */}
      <Section>
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] mb-4 text-center" style={{ fontFamily: "var(--font-geist-sans)" }}>Use any LLM</h2>
          <p className="text-[16px] text-center mb-10" style={{ color: "var(--ds-fg-2)" }}>Interactive onboarding on first run. Pick your provider, paste your key.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              ["OpenRouter", "200+ models"],
              ["DeepSeek", "$0.14/M tokens"],
              ["Anthropic", "Claude Sonnet"],
              ["OpenAI", "GPT-4o"],
              ["Ollama", "Local & free"],
              ["Custom", "Your endpoint"],
            ].map(([name, desc]) => (
              <div key={name} className="rounded-lg p-4 text-center border" style={{ borderColor: "var(--ds-line)", background: "var(--ds-bg-1)" }}>
                <div className="text-[15px] font-semibold mb-1" style={{ fontFamily: "var(--font-geist-sans)" }}>{name}</div>
                <div className="text-[12px]" style={{ color: "var(--ds-fg-3)" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="max-w-[560px] mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em]" style={{ fontFamily: "var(--font-geist-sans)" }}>Stop losing context.</h2>
          <p className="text-[17px] leading-relaxed" style={{ color: "var(--ds-fg-2)" }}>
            Your AI writes code. AIScribe remembers why.<br />One command. Every session. Forever.
          </p>
          <button onClick={() => navigator.clipboard.writeText(installCommand)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-[15px] font-medium text-white transition-all duration-150 hover:-translate-y-px"
            style={{ background: "var(--accent)", boxShadow: "0 0 0 1px rgba(255,255,255,.08) inset, 0 4px 16px var(--accent-glow)" }}>
            {installCommand}
          </button>
          <a href="https://github.com/aiagentflow/aiscribe" target="_blank" rel="noopener" className="text-[14px]" style={{ color: "var(--ds-fg-3)" }}>View on GitHub →</a>
        </div>
      </Section>
    </main>
  );
}
