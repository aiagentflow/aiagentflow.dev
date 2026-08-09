"use client";

const installCommand = "npm install -g aiscribe";

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`max-w-[960px] mx-auto px-4 sm:px-6 py-16 sm:py-24 ${className}`}>{children}</section>;
}

export function AIScribePage() {
  return (
    <main style={{ background: "var(--ds-bg)" }}>
      {/* Product nav */}
      <div className="border-b sticky top-0 z-50" style={{ borderColor: "var(--ds-line)", background: "rgba(13,17,23,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 h-[56px] flex items-center justify-between">
          <a href="/aiscribe" className="flex items-center gap-2.5">
            <img src="/aiscribe/logo.png" alt="AIScribe" width="28" height="28" className="rounded-md" />
            <span className="font-bold text-[15px] tracking-[-0.01em]" style={{ fontFamily: "var(--font-geist-sans)", color: "var(--ds-fg)" }}>AIScribe</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(255,99,84,0.13)", color: "#ff8a7a", border: "1px solid rgba(255,99,84,0.27)" }}>v1.0</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="https://github.com/aiagentflow/aiscribe" target="_blank" rel="noopener" className="text-[13px] hover:underline" style={{ color: "var(--ds-fg-2)" }}>GitHub</a>
            <a href="https://www.npmjs.com/package/aiscribe" target="_blank" rel="noopener" className="text-[13px] hover:underline" style={{ color: "var(--ds-fg-2)" }}>npm</a>
            <a href="/" className="text-[12px]" style={{ color: "var(--ds-fg-3)" }}>aiagentflow.dev →</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <Section className="!pb-8">
        <div className="max-w-[680px] mx-auto text-center flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]" style={{ background: "var(--ds-bg-2)", color: "var(--ds-fg-2)", border: "1px solid var(--ds-line)" }}>
            Part of aiagentflow
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-[-0.03em]" style={{ fontFamily: "var(--font-geist-sans)" }}>
            Your AI writes code.<br />
            <span style={{ background: "linear-gradient(135deg, #ff6354, #ff8a7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              AIScribe remembers why.
            </span>
          </h1>

          <p className="text-[17px] sm:text-[19px] leading-relaxed max-w-[520px]" style={{ color: "var(--ds-fg-2)" }}>
            One command after every AI coding session. Your conversation, file changes, and decisions — recorded forever.
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center mt-2">
            <button onClick={() => navigator.clipboard.writeText(installCommand)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95"
              style={{ background: "#d94a3a", boxShadow: "0 0 0 1px rgba(255,255,255,.06) inset, 0 8px 24px rgba(217,74,58,.25)" }}>
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><rect x="3" y="3" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M2 11V2h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              {installCommand}
            </button>
          </div>

          <p className="text-[12px]" style={{ color: "var(--ds-fg-3)" }}>Node.js ≥ 20 · Works with pi, Claude Code, Cursor, Codex · Open source</p>
        </div>
      </Section>

      {/* Terminal Demos */}
      <Section className="!pt-0">
        <div className="max-w-[960px] mx-auto">
          <h2 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.02em] mb-6 text-center" style={{ fontFamily: "var(--font-geist-sans)" }}>See it in action</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { src: "/aiscribe/demos/demo-log.gif", title: "aiscribe log", desc: "Journal a session" },
              { src: "/aiscribe/demos/demo-search.gif", title: "aiscribe search", desc: "Find by meaning" },
              { src: "/aiscribe/demos/demo-analytics.gif", title: "aiscribe hotspots", desc: "Codebase analytics" },
            ].map(({ src, title, desc }) => (
              <div key={title} className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--ds-line)", background: "#0d1117" }}>
                <img src={src} alt={title} className="w-full" />
                <div className="px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <code className="text-[13px] font-semibold" style={{ color: "#ff6354", fontFamily: "var(--font-geist-mono)" }}>{title}</code>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--ds-fg-3)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Three value props */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: "💬", title: "Full Conversation", desc: "Captures every prompt and response from your AI coding sessions. Not just git diffs." },
            { icon: "🔍", title: "Search by Meaning", desc: "Vector embeddings let you find sessions by describing what happened, not keywords." },
            { icon: "📖", title: "Session Book", desc: "Web UI at localhost:3848. Browse, read, and search every session like a journal." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-3">
              <div className="text-3xl">{icon}</div>
              <h3 className="text-[17px] font-semibold" style={{ color: "var(--ds-fg)" }}>{title}</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: "var(--ds-fg-2)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Commands + Features */}
      <Section>
        <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] mb-3 text-center" style={{ fontFamily: "var(--font-geist-sans)" }}>Everything you need</h2>
        <p className="text-[15px] text-center mb-10" style={{ color: "var(--ds-fg-2)" }}>13 commands. Zero configuration required.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
            <div key={cmd} className="rounded-lg p-3 border transition-colors hover:border-[#30363d]" style={{ borderColor: "var(--ds-line)", background: "var(--ds-bg-1)" }}>
              <code className="text-[12px] font-semibold" style={{ color: "#ff6354", fontFamily: "var(--font-geist-mono)" }}>{cmd}</code>
              <p className="text-[11px] mt-1" style={{ color: "var(--ds-fg-3)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Two modes */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border p-8" style={{ borderColor: "var(--ds-line)", background: "var(--ds-bg-1)" }}>
            <div className="text-2xl mb-3">🤖</div>
            <h3 className="text-[20px] font-bold mb-2" style={{ color: "var(--ds-fg)" }}>AI-Powered Summary</h3>
            <p className="text-[14px] mb-4" style={{ color: "var(--ds-fg-2)" }}>Uses your LLM key (DeepSeek, OpenAI, Claude, Ollama) to generate structured summaries with risk scores, key decisions, and suspicious change flags.</p>
            <code className="text-[13px]" style={{ color: "#ff8a7a", fontFamily: "var(--font-geist-mono)" }}>aiscribe log -c</code>
          </div>
          <div className="rounded-2xl border p-8" style={{ borderColor: "var(--ds-line)", background: "var(--ds-bg-1)" }}>
            <div className="text-2xl mb-3">📝</div>
            <h3 className="text-[20px] font-bold mb-2" style={{ color: "var(--ds-fg)" }}>Raw Chat Log</h3>
            <p className="text-[14px] mb-4" style={{ color: "var(--ds-fg-2)" }}>No API key? No problem. Store the full conversation log as-is. Searchable, exportable, and always available offline.</p>
            <code className="text-[13px]" style={{ color: "#ff8a7a", fontFamily: "var(--font-geist-mono)" }}>aiscribe log -c -f</code>
          </div>
        </div>
      </Section>

      {/* Train your own LLM */}
      <Section>
        <div className="rounded-2xl border p-8 sm:p-12 text-center" style={{ borderColor: "var(--ds-line)", background: "linear-gradient(135deg, rgba(255,99,84,0.05), rgba(255,138,122,0.04))" }}>
          <h2 className="text-[28px] font-bold mb-3" style={{ fontFamily: "var(--font-geist-sans)" }}>Train your own LLM</h2>
          <p className="text-[16px] max-w-[500px] mx-auto mb-6" style={{ color: "var(--ds-fg-2)" }}>
            Every session you capture becomes training data. Export your conversations and fine-tune a local model on your coding style, decisions, and patterns.
          </p>
          <code className="text-[14px] px-4 py-2 rounded-lg inline-block" style={{ background: "#161b22", color: "#ff8a7a", border: "1px solid #21262d", fontFamily: "var(--font-geist-mono)" }}>
            aiscribe export --format ai --output training-data.txt
          </code>
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em]" style={{ fontFamily: "var(--font-geist-sans)" }}>Stop losing context.</h2>
        <p className="text-[17px] mt-3 mb-8" style={{ color: "var(--ds-fg-2)" }}>One command. Every session. Forever.</p>
        <button onClick={() => navigator.clipboard.writeText(installCommand)}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95"
          style={{ background: "#d94a3a", boxShadow: "0 0 0 1px rgba(255,255,255,.06) inset, 0 8px 24px rgba(217,74,58,.25)" }}>
          {installCommand}
        </button>
        <div className="mt-4">
          <a href="https://github.com/aiagentflow/aiscribe" target="_blank" rel="noopener" className="text-[14px]" style={{ color: "var(--ds-fg-3)" }}>View on GitHub →</a>
        </div>
      </Section>

      {/* Footer */}
      <div className="border-t text-center py-8" style={{ borderColor: "var(--ds-line)" }}>
        <p className="text-[12px]" style={{ color: "var(--ds-fg-3)" }}>Part of <a href="/" className="hover:underline" style={{ color: "var(--ds-fg-2)" }}>aiagentflow</a> · MIT Licensed</p>
      </div>
    </main>
  );
}
