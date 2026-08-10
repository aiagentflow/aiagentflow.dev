"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { ParticleBg } from "./ParticleBg";

const installCommand = "npm install -g aiscribe";

function Section({ children, className = "", bg = "black" }: { children: React.ReactNode; className?: string; bg?: "black" | "navy" }) {
  const bgColor = bg === "navy" ? "#080c16" : "#0d1117";
  const borderColor = bg === "navy" ? "rgba(255,255,255,0.04)" : "transparent";
  return <section className={`py-16 sm:py-24 ${className}`} style={{ background: bgColor, borderTop: `1px solid ${borderColor}` }}>{children}</section>;
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-[960px] mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}

function DemoCard({ src, title, desc }: { src: string; title: string; desc: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="rounded-xl overflow-hidden border cursor-pointer group transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/30"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "#0d1117" }}
      >
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={title} className="w-full" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(0,0,0,0.4)" }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
              <span className="text-[13px] font-medium text-white">Expand</span>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <code className="text-[14px] font-semibold" style={{ color: "#ff6354", fontFamily: "var(--font-geist-mono)" }}>{title}</code>
          <p className="text-[12px] mt-0.5" style={{ color: "#8b949e" }}>{desc}</p>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] rounded-xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={title} className="max-w-full max-h-[85vh] object-contain" />
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
              style={{ background: "rgba(0,0,0,0.6)" }}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 text-center" style={{ background: "rgba(0,0,0,0.7)" }}>
              <code className="text-[14px] font-semibold" style={{ color: "#ff6354", fontFamily: "var(--font-geist-mono)" }}>{title}</code>
              <span className="text-[12px] ml-2" style={{ color: "#8b949e" }}>{desc}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function AIScribePage() {
  const [stars, setStars] = useState<string | null>(null);
  const [downloads, setDownloads] = useState<string | null>(null);
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/aiagentflow/aiscribe")
      .then(r => r.json())
      .then(d => setStars(d.stargazers_count?.toString() || null))
      .catch(() => {});
    fetch("https://api.npmjs.org/downloads/point/last-month/aiscribe")
      .then(r => r.json())
      .then(d => {
        const n = d.downloads;
        if (n >= 1000) setDownloads((n / 1000).toFixed(1) + "k");
        else setDownloads(n?.toString() || null);
      })
      .catch(() => {});
    fetch("/api/aiscribe-views", { method: "POST" })
      .then(r => r.json())
      .then(d => setViews(d.count))
      .catch(() => setViews(42));
  }, []);

  const trackInstall = () => {
    navigator.clipboard.writeText(installCommand);
    try {
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag("event", "install_copy", {
          event_category: "conversion",
          event_label: "npm_install_aiscribe",
          value: 1,
        });
      }
    } catch {}
  };

  return (
    <main style={{ background: "#0d1117" }}>
      <ParticleBg />
      {/* Nav */}
      <div className="border-b sticky top-0 z-50" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(13,17,23,0.94)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 h-[56px] flex items-center justify-between">
          <a href="https://github.com/aiagentflow/aiscribe" target="_blank" rel="noopener"
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg"
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="#f0f6fc"><path d="M8 0a8 8 0 00-2.5 15.6c.4.07.55-.17.55-.38v-1.34c-2.24.48-2.7-1.08-2.7-1.08-.37-.93-.9-1.18-.9-1.18-.73-.5.06-.49.06-.49.8.06 1.23.82 1.23.82a1.75 1.75 0 002.4.67c.3-.47.7-.82 1.27-1.02-2.23-.25-4.57-1.11-4.57-4.95a3.88 3.88 0 011.03-2.69 3.6 3.6 0 01.1-2.66s.84-.27 2.75 1.03a9.5 9.5 0 015 0c1.91-1.3 2.75-1.03 2.75-1.03a3.6 3.6 0 01.1 2.66 3.87 3.87 0 011.03 2.69c0 3.85-2.34 4.7-4.58 4.95.47.4.89 1.2.89 2.42v3.58c0 .27.18.46.55.38A8 8 0 008 0z"/></svg>
          </a>
          <a href="/aiscribe" className="flex items-center gap-2.5 mx-auto sm:mx-0">
            <Image src="/aiscribe/logo.png" alt="AIScribe" width={38} height={38} className="rounded-lg ring-1 ring-white/10" />
            <span className="hidden sm:inline font-bold text-[16px] tracking-[-0.01em]" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>AiScribe</span>
          </a>
          <div className="hidden sm:flex items-center gap-1">
            <a href="https://github.com/aiagentflow/aiscribe" target="_blank" rel="noopener"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
              style={{ color: "#8b949e" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#c9d1d9"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8b949e"; }}>
              <svg width="20" height="20" viewBox="0 0 16 16" fill="#f0f6fc"><path d="M8 0a8 8 0 00-2.5 15.6c.4.07.55-.17.55-.38v-1.34c-2.24.48-2.7-1.08-2.7-1.08-.37-.93-.9-1.18-.9-1.18-.73-.5.06-.49.06-.49.8.06 1.23.82 1.23.82a1.75 1.75 0 002.4.67c.3-.47.7-.82 1.27-1.02-2.23-.25-4.57-1.11-4.57-4.95a3.88 3.88 0 011.03-2.69 3.6 3.6 0 01.1-2.66s.84-.27 2.75 1.03a9.5 9.5 0 015 0c1.91-1.3 2.75-1.03 2.75-1.03a3.6 3.6 0 01.1 2.66 3.87 3.87 0 011.03 2.69c0 3.85-2.34 4.7-4.58 4.95.47.4.89 1.2.89 2.42v3.58c0 .27.18.46.55.38A8 8 0 008 0z"/></svg>
              GitHub
            </a>
            <a href="https://www.npmjs.com/package/aiscribe" target="_blank" rel="noopener"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
              style={{ color: "#8b949e" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#c9d1d9"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8b949e"; }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#CB3837"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z"/></svg>
              npm
            </a>
            <span className="mx-1 w-px h-5" style={{ background: "rgba(255,255,255,0.1)" }} />
            <a href="/" className="text-[12px] px-2 py-1.5 rounded-lg transition-colors"
              style={{ color: "#484f58" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#8b949e")}
              onMouseLeave={e => (e.currentTarget.style.color = "#484f58")}>
              aiagentflow.dev
            </a>
          </div>
          <a href="https://www.npmjs.com/package/aiscribe" target="_blank" rel="noopener"
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-lg"
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            aria-label="npm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#CB3837"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z"/></svg>
          </a>
        </div>
      </div>

      {/* Hero */}
      <Section className="!pb-8">
        <div className="max-w-[680px] mx-auto text-center flex flex-col items-center gap-6 px-4">
          <Image src="/aiscribe/logo.png" alt="AiScribe" width={96} height={96} className="rounded-2xl ring-1 ring-white/10 shadow-2xl shadow-black/50" />
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]" style={{ background: "rgba(255,255,255,0.04)", color: "#8b949e", border: "1px solid rgba(255,255,255,0.06)" }}>
            Part of aiagentflow
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.06] tracking-[-0.03em]" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>
            Your AI writes code.<br />
            <span style={{ background: "linear-gradient(135deg, #ff6354, #ff8a7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              AIScribe remembers why.
            </span>
          </h1>
          <p className="text-[17px] sm:text-[19px] leading-relaxed max-w-[520px]" style={{ color: "#8b949e" }}>
            One command journals your AI coding session. Captures git diffs, full conversations, and exports everything as training data for your own models.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center mt-2">
            <button onClick={trackInstall}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95"
              style={{ background: "#d94a3a", boxShadow: "0 0 0 1px rgba(255,255,255,.06) inset, 0 8px 24px rgba(217,74,58,.25)" }}>
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><rect x="3" y="3" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M2 11V2h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              {installCommand}
            </button>
          </div>
          <p className="text-[12px]" style={{ color: "#484f58" }}>Node.js ≥ 20 · Works with pi, Claude Code, Cursor, Codex · Open source</p>
          {(stars || downloads || views) && (
            <div className="flex items-center gap-1" style={{ color: "#8b949e" }}>
              {stars && (
                <a href="https://github.com/aiagentflow/aiscribe" target="_blank" rel="noopener"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors hover:bg-white/5"
                  title="GitHub stars">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="#d29922"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.751.751 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>
                  <span className="text-white font-semibold">{stars}</span>
                  <span className="text-[#484f58]">stars</span>
                </a>
              )}
              {downloads && (
                <span
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium"
                  title="Monthly npm installs">
                  <svg width="16" height="16" viewBox="0 0 576 512" fill="#CB3837"><path d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"/></svg>
                  <span className="text-white font-semibold">{downloads}</span>
                  <span className="text-[#484f58]">installs/mo</span>
                </span>
              )}
              {views && (
                <span
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium"
                  title="Page views">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <span className="text-white font-semibold">{views.toLocaleString()}</span>
                  <span className="text-[#484f58]">views</span>
                </span>
              )}
            </div>
          )}
          <div className="mt-2">
            <a href="https://peerlist.io/raajkhan/project/aiscribe--log-prompts--agents-response" target="_blank" rel="noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://peerlist.io/api/v1/projects/embed/PRJH7B8EJLG777A88F69ENKP96JDKG?showUpvote=true&theme=dark"
                alt="AiScribe on Peerlist"
                style={{ height: 48 }}
              />
            </a>
          </div>
        </div>
      </Section>

      {/* Terminal Demos */}
      <Section className="!pt-0" bg="navy">
        <Container>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-2 text-center" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>See it in action</h2>
          <p className="text-[14px] text-center mb-8" style={{ color: "#8b949e" }}>Click any demo to expand</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: "/aiscribe/demos/demo-log.gif", title: "aiscribe log", desc: "Journal a session" },
              { src: "/aiscribe/demos/demo-search.gif", title: "aiscribe search", desc: "Find by meaning" },
              { src: "/aiscribe/demos/demo-analytics.gif", title: "aiscribe hotspots", desc: "Codebase analytics" },
            ].map(({ src, title, desc }) => (
              <DemoCard key={title} src={src} title={title} desc={desc} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Three value props */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: "💬", title: "Full Conversation", desc: "Captures every prompt and response from your AI coding sessions. Export them as training data." },
              { icon: "🔍", title: "Search by Meaning", desc: "Vector embeddings let you find sessions by describing what happened, not keywords." },
              { icon: "🔄", title: "Train Your Own Model", desc: "Export sessions in AI format. Fine-tune a local LLM on your coding style and decisions." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <div className="text-3xl">{icon}</div>
                <h3 className="text-[17px] font-semibold" style={{ color: "#f0f6fc" }}>{title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: "#8b949e" }}>{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Commands */}
      <Section bg="navy">
        <Container>
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] mb-3 text-center" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>Everything you need</h2>
          <p className="text-[15px] text-center mb-10" style={{ color: "#8b949e" }}>13 commands. Zero configuration required.</p>
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
              <div key={cmd} className="rounded-lg p-3 border transition-colors hover:border-[#30363d]" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0d1117" }}>
                <code className="text-[12px] font-semibold" style={{ color: "#ff6354", fontFamily: "var(--font-geist-mono)" }}>{cmd}</code>
                <p className="text-[11px] mt-1" style={{ color: "#484f58" }}>{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Two modes */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border p-8" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#161b22" }}>
              <div className="text-2xl mb-3">🤖</div>
              <h3 className="text-[20px] font-bold mb-2" style={{ color: "#f0f6fc" }}>AI-Powered Summary</h3>
              <p className="text-[14px] mb-4" style={{ color: "#8b949e" }}>Uses your LLM key (DeepSeek, OpenAI, Claude, Ollama) to generate structured summaries with risk scores, key decisions, and suspicious change flags.</p>
              <code className="text-[13px]" style={{ color: "#ff8a7a", fontFamily: "var(--font-geist-mono)" }}>aiscribe log -c</code>
            </div>
            <div className="rounded-2xl border p-8" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#161b22" }}>
              <div className="text-2xl mb-3">📝</div>
              <h3 className="text-[20px] font-bold mb-2" style={{ color: "#f0f6fc" }}>Raw Chat Log</h3>
              <p className="text-[14px] mb-4" style={{ color: "#8b949e" }}>No API key? No problem. Store the full conversation log as-is. Searchable, exportable, and always available offline.</p>
              <code className="text-[13px]" style={{ color: "#ff8a7a", fontFamily: "var(--font-geist-mono)" }}>aiscribe log -c -f</code>
            </div>
          </div>
        </Container>
      </Section>

      {/* Train LLM */}
      <Section bg="navy">
        <Container>
          <div className="rounded-2xl border p-8 sm:p-12 text-center" style={{ borderColor: "rgba(255,255,255,0.06)", background: "linear-gradient(135deg, rgba(255,99,84,0.06), rgba(255,138,122,0.03))" }}>
            <h2 className="text-[28px] font-bold mb-3" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>Train your own LLM</h2>
            <p className="text-[16px] max-w-[500px] mx-auto mb-6" style={{ color: "#8b949e" }}>
              Every session you capture becomes training data. Export your conversations and fine-tune a local model on your coding style, decisions, and patterns.
            </p>
            <code className="text-[14px] px-4 py-2 rounded-lg inline-block" style={{ background: "#0d1117", color: "#ff8a7a", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "var(--font-geist-mono)" }}>
              aiscribe export --format ai --output training-data.txt
            </code>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <Container>
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em]" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>Stop losing context.</h2>
          <p className="text-[17px] mt-3 mb-8" style={{ color: "#8b949e" }}>One command. Every session. Forever.</p>
          <button onClick={trackInstall}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-95"
            style={{ background: "#d94a3a", boxShadow: "0 0 0 1px rgba(255,255,255,.06) inset, 0 8px 24px rgba(217,74,58,.25)" }}>
            {installCommand}
          </button>
          <div className="mt-4">
            <a href="https://github.com/aiagentflow/aiscribe" target="_blank" rel="noopener" className="text-[14px]" style={{ color: "#484f58" }}>View on GitHub →</a>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "#080c16" }}>
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                <Image src="/aiscribe/logo.png" alt="AIScribe" width={40} height={40} className="rounded-lg" />
                <span className="font-bold text-[15px]" style={{ color: "#f0f6fc" }}>AIScribe</span>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: "#484f58" }}>
                Your AI&apos;s scribe. Every session, recorded and backed up.
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-3" style={{ color: "#8b949e" }}>Product</h4>
              <div className="flex flex-col gap-2">
                <a href="https://github.com/aiagentflow/aiscribe" target="_blank" rel="noopener" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>GitHub</a>
                <a href="https://www.npmjs.com/package/aiscribe" target="_blank" rel="noopener" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>npm</a>
                <a href="https://github.com/aiagentflow/aiscribe/blob/main/docs/CLI.md" target="_blank" rel="noopener" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>Docs</a>
                <a href="https://github.com/aiagentflow/aiscribe/blob/main/LICENSE" target="_blank" rel="noopener" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>MIT License</a>
              </div>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-3" style={{ color: "#8b949e" }}>Commands</h4>
              <div className="flex flex-col gap-2">
                <code className="text-[12px]" style={{ color: "#ff6354", fontFamily: "var(--font-geist-mono)" }}>aiscribe log</code>
                <code className="text-[12px]" style={{ color: "#ff6354", fontFamily: "var(--font-geist-mono)" }}>aiscribe search</code>
                <code className="text-[12px]" style={{ color: "#ff6354", fontFamily: "var(--font-geist-mono)" }}>aiscribe watch</code>
                <code className="text-[12px]" style={{ color: "#ff6354", fontFamily: "var(--font-geist-mono)" }}>aiscribe server</code>
              </div>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-3" style={{ color: "#8b949e" }}>More</h4>
              <div className="flex flex-col gap-2">
                <a href="/" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>aiagentflow</a>
                <a href="/blog" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>Blog</a>
                <a href="/docs" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>Docs</a>
                <a href="/privacy" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>Privacy</a>
              </div>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-4">
              <a href="https://github.com/aiagentflow/aiscribe" target="_blank" rel="noopener" className="hover:opacity-80 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 16 16" fill="#f0f6fc"><path d="M8 0a8 8 0 00-2.5 15.6c.4.07.55-.17.55-.38v-1.34c-2.24.48-2.7-1.08-2.7-1.08-.37-.93-.9-1.18-.9-1.18-.73-.5.06-.49.06-.49.8.06 1.23.82 1.23.82a1.75 1.75 0 002.4.67c.3-.47.7-.82 1.27-1.02-2.23-.25-4.57-1.11-4.57-4.95a3.88 3.88 0 011.03-2.69 3.6 3.6 0 01.1-2.66s.84-.27 2.75 1.03a9.5 9.5 0 015 0c1.91-1.3 2.75-1.03 2.75-1.03a3.6 3.6 0 01.1 2.66 3.87 3.87 0 011.03 2.69c0 3.85-2.34 4.7-4.58 4.95.47.4.89 1.2.89 2.42v3.58c0 .27.18.46.55.38A8 8 0 008 0z"/></svg>
              </a>
              <a href="https://www.npmjs.com/package/aiscribe" target="_blank" rel="noopener" className="hover:opacity-80 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#CB3837"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z"/></svg>
              </a>
            </div>
            <p className="text-[12px]" style={{ color: "#484f58" }}>
              © {new Date().getFullYear()} aiagentflow. Built for AI-native developers
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
