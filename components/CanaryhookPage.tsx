"use client";

import { useEffect, useState } from "react";

import { ParticleBg } from "./ParticleBg";

const installCommand = "npm install -g canaryhook";
const YOUTUBE_ID = "JhmpOmZFiFk";
const AMBER = "#f2c744";
const AMBER_SOFT = "#ffd966";

function Section({ children, className = "", bg = "black" }: { children: React.ReactNode; className?: string; bg?: "black" | "navy" }) {
  const bgColor = bg === "navy" ? "#080c16" : "#0d1117";
  const borderColor = bg === "navy" ? "rgba(255,255,255,0.04)" : "transparent";
  return <section className={`py-16 sm:py-24 ${className}`} style={{ background: bgColor, borderTop: `1px solid ${borderColor}` }}>{children}</section>;
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-[960px] mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}

function Mark({ size = 40, radius = 10 }: { size?: number; radius?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect width="48" height="48" rx={radius} fill="url(#ckg)" />
      <path d="M24 11v15a7 7 0 0 1-7 7 7 7 0 0 1-7-7" stroke="#0d1117" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <circle cx="31" cy="16" r="4.6" fill="#0d1117" />
      <circle cx="32.6" cy="14.6" r="1.25" fill={AMBER_SOFT} />
      <defs>
        <linearGradient id="ckg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={AMBER_SOFT} />
          <stop offset="1" stopColor="#e0a81f" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function DemoCard({ src, title, desc }: { src: string; title: string; desc: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="rounded-xl overflow-hidden border-2 cursor-pointer group transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/30"
        style={{ borderColor: "rgba(242,199,68,0.2)", background: "#0d1117" }}
      >
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={title} className="w-full" loading="eager" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(0,0,0,0.4)" }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6M8 11h6" /></svg>
              <span className="text-[13px] font-medium text-white">Expand</span>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <code className="text-[14px] font-semibold" style={{ color: AMBER, fontFamily: "var(--font-geist-mono)" }}>{title}</code>
          <p className="text-[12px] mt-0.5" style={{ color: "#8b949e" }}>{desc}</p>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setOpen(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] rounded-xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={title} className="max-w-full max-h-[85vh] object-contain" />
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
              style={{ background: "rgba(0,0,0,0.6)" }}
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-[13px] px-1.5 py-0.5 rounded" style={{ background: "rgba(242,199,68,0.08)", color: AMBER_SOFT, fontFamily: "var(--font-geist-mono)" }}>
      {children}
    </code>
  );
}

function Block({ children, label }: { children: string; label?: string }) {
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#080c16" }}>
      {label && (
        <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] border-b" style={{ color: "#8b949e", borderColor: "rgba(255,255,255,0.06)" }}>
          {label}
        </div>
      )}
      <pre className="px-4 py-3.5 overflow-x-auto text-[12.5px] leading-relaxed" style={{ color: "#c9d1d9", fontFamily: "var(--font-geist-mono)" }}>
        {children}
      </pre>
    </div>
  );
}

const DECOYS: [string, string][] = [
  [".env.backup", "AWS-shaped access key and secret"],
  ["credentials.json.bak", "Stripe-shaped live secret key"],
  ["deploy_key.old", "OpenSSH private key block"],
  ["db_dump_2026.sql", "API token inside an INSERT statement"],
];

const COMMANDS: [string, string][] = [
  ["canaryhook init", "Plant the decoys and register the hooks for your agents"],
  ["canaryhook status", "Are the decoys planted, is every agent wired"],
  ["canaryhook doctor", "Fire a test payload through each hook and check the deny comes back"],
  ["canaryhook alerts", "List every recorded trip"],
  ["canaryhook verify", "Exit non-zero if anything tripped, for CI"],
  ["canaryhook clean", "Remove the decoys and unregister every hook"],
];

const AGENTS: [string, string, string][] = [
  ["Claude Code", "claude", ".claude/settings.json"],
  ["Cursor", "cursor", ".cursor/hooks.json"],
  ["Codex CLI", "codex", ".codex/hooks.json"],
  ["Antigravity CLI", "antigravity", ".agents/hooks.json"],
  ["Gemini CLI", "gemini", ".gemini/settings.json"],
];

const PATHS: { label: string; title: string; body: React.ReactNode; code: string }[] = [
  {
    label: "Read path",
    title: "The call names a decoy",
    body: <>A <Code>Read</Code> with a <Code>file_path</Code>, a shell <Code>cat</Code>, or a glob that expands to one, like <Code>cat .env*</Code>. Blocked before the tool runs, so the contents are never returned.</>,
    code: `Read { "file_path": ".env.backup" }\n  → deny`,
  },
  {
    label: "Exfil path",
    title: "The call carries a canary",
    body: <>A shell argument, a fetch URL or body, a file write, a commit message. Caught as written, lowercased, base64 or hex encoded, so wrapping the value does not hide it.</>,
    code: `Bash { "command": "curl -d $(base64 …)" }\n  → deny`,
  },
  {
    label: "Output path",
    title: "The result holds a canary",
    body: <>A sweep like <Code>grep -r AKIA .</Code> reads a decoy without naming it. After the call runs, its output is checked; a canary there is recorded and the agent is told the value is fake.</>,
    code: `grep -r AKIA .\n  → recorded, agent warned`,
  },
  {
    label: "Tamper path",
    title: "The call would blind it",
    body: <>Deleting <Code>.canaryhook/</Code>, running <Code>canaryhook clean</Code>, or removing the hook from an agent&apos;s config. An agent that tripped a decoy cannot erase the record and carry on.</>,
    code: `rm .canaryhook/alerts.jsonl\n  → deny`,
  },
];

const THREATS: [string, string][] = [
  ["Prompt injection", "A fetched page or GitHub issue body tells your agent to collect credentials and post them somewhere."],
  ["A hostile MCP server", "A tool description that looks helpful, backed by code that sweeps the repo for secrets."],
  ["A dependency script", "A postinstall that reads whatever it can reach during an ordinary npm install."],
  ["Your own agent", "No attacker at all. It cats a credentials file into context, and that context lands in a transcript you push."],
];

const FAQ: [string, string][] = [
  [
    "Does this need an AI model?",
    "No. canaryhook is a hook and a set of string comparisons. There is nothing to download, nothing to infer, and no API key. It adds no latency you can measure.",
  ],
  [
    "Will it fire on my own code?",
    "It should never fire. The decoys are files no build, test, lint or runtime path has any reason to open, and they are gitignored by default. A trip means something went looking for credentials.",
  ],
  [
    "What happens when it trips?",
    "The tool call is denied before it runs, so the agent never sees the file contents. The agent is told the file was a tripwire and not to retry, and the event is appended to .canaryhook/alerts.jsonl.",
  ],
  [
    "Can an attacker just read the real .env instead?",
    "Yes, and that is the honest limit. canaryhook is a smoke detector, not a lock. It catches indiscriminate credential hunting, which is what injected instructions and hostile tools actually do.",
  ],
  [
    "Which coding agents does it work with?",
    "Claude Code, Cursor, Codex CLI, Antigravity CLI and Gemini CLI. init wires Claude Code plus any agent whose config folder the project already has, or exactly the ones you name with --agents. Codex runs project hooks only after you approve them with /hooks.",
  ],
  [
    "Is it safe to run in CI?",
    "Yes. Run canaryhook init before the step that runs the agent and canaryhook verify after it: verify exits non-zero when any trip was recorded, and fails where canaryhook was never initialized rather than reporting a clean record it cannot have.",
  ],
];

export function CanaryhookPage() {
  const [stars, setStars] = useState<string | null>(null);
  const [downloads, setDownloads] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/repos/aiagentflow/canaryhook")
      .then(r => r.json())
      .then(d => {
        const count = d.stargazers_count || 0;
        if (count >= 10) setStars(count.toString());
      })
      .catch(() => {});
    fetch("https://api.npmjs.org/downloads/point/last-week/canaryhook")
      .then(r => r.json())
      .then(d => {
        const n = d.downloads;
        if (n >= 1000) setDownloads((n / 1000).toFixed(1) + "k");
        else if (n > 0) setDownloads(n.toString());
      })
      .catch(() => {});
  }, []);

  const trackInstall = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
    try {
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag("event", "install_copy", { event_category: "conversion", event_label: "npm_install_canaryhook", value: 1 });
      }
    } catch {}
  };

  const installButton = (
    <button
      onClick={trackInstall}
      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
      style={{ background: AMBER, color: "#0d1117", boxShadow: "0 0 0 1px rgba(255,255,255,.06) inset, 0 8px 24px rgba(242,199,68,.2)" }}
    >
      <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><rect x="3" y="3" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.3" /><path d="M2 11V2h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
      {copied ? "copied" : installCommand}
    </button>
  );

  return (
    <main style={{ background: "#0d1117" }}>
      <ParticleBg />

      {/* Nav */}
      <div className="border-b sticky top-0 z-50" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(13,17,23,0.94)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 h-[56px] flex items-center justify-between">
          <a href="/canaryhook" className="flex items-center gap-2.5">
            <Mark size={32} radius={8} />
            <span className="font-bold text-[16px] tracking-[-0.01em]" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>canaryhook</span>
          </a>
          <div className="flex items-center gap-1">
            <a href="/docs/canaryhook" className="hidden sm:block px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors" style={{ color: "#8b949e" }}>Docs</a>
            <a href="https://github.com/aiagentflow/canaryhook" target="_blank" rel="noopener" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium" style={{ color: "#8b949e" }} aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="#f0f6fc"><path d="M8 0a8 8 0 00-2.5 15.6c.4.07.55-.17.55-.38v-1.34c-2.24.48-2.7-1.08-2.7-1.08-.37-.93-.9-1.18-.9-1.18-.73-.5.06-.49.06-.49.8.06 1.23.82 1.23.82a1.75 1.75 0 002.4.67c.3-.47.7-.82 1.27-1.02-2.23-.25-4.57-1.11-4.57-4.95a3.88 3.88 0 011.03-2.69 3.6 3.6 0 01.1-2.66s.84-.27 2.75 1.03a9.5 9.5 0 015 0c1.91-1.3 2.75-1.03 2.75-1.03a3.6 3.6 0 01.1 2.66 3.87 3.87 0 011.03 2.69c0 3.85-2.34 4.7-4.58 4.95.47.4.89 1.2.89 2.42v3.58c0 .27.18.46.55.38A8 8 0 008 0z" /></svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a href="https://www.npmjs.com/package/canaryhook" target="_blank" rel="noopener" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium" style={{ color: "#8b949e" }} aria-label="npm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#CB3837"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" /></svg>
              <span className="hidden sm:inline">npm</span>
            </a>
            <span className="mx-1 w-px h-5" style={{ background: "rgba(255,255,255,0.1)" }} />
            <a href="/" className="text-[12px] px-2 py-1.5 rounded-lg" style={{ color: "#484f58" }}>aiagentflow.dev</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <Section className="!pb-10">
        <div className="max-w-[760px] mx-auto text-center flex flex-col items-center gap-6 px-4">
          <Mark size={88} radius={20} />
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.06] tracking-[-0.03em]" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>
            Your agent reads every file it can.
            <br />
            <span style={{ background: `linear-gradient(135deg, ${AMBER_SOFT}, #e0a81f)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Leave one it should not.
            </span>
          </h1>
          <p className="text-[17px] sm:text-[19px] leading-relaxed max-w-[600px]" style={{ color: "#8b949e" }}>
            canaryhook plants decoy credentials in your project, then blocks the tool call the moment an agent reads one or carries the value off the machine. No model, no signatures, no false positives by construction.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center mt-2">{installButton}</div>
          <p className="text-[12px]" style={{ color: "#484f58" }}>
            Claude Code · Cursor · Codex · Antigravity · Gemini CLI · No API key · Open source · MIT
          </p>
          {(stars || downloads) && (
            <div className="flex items-center gap-1" style={{ color: "#8b949e" }}>
              {stars && (
                <a href="https://github.com/aiagentflow/canaryhook" target="_blank" rel="noopener" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium hover:bg-white/5" title="GitHub stars">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="#d29922"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.751.751 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" /></svg>
                  <span className="text-white font-semibold">{stars}</span>
                  <span className="text-[#484f58]">stars</span>
                </a>
              )}
              {downloads && (
                <span className="flex items-center gap-2 px-4 py-2 rounded-lg text-[14px] font-semibold" style={{ background: "rgba(203,56,55,0.1)", border: "1px solid rgba(203,56,55,0.25)" }} title="Live from the npm API">
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#CB3837", boxShadow: "0 0 8px #CB3837" }} />
                  <span className="text-white">{downloads}</span>
                  <span className="text-[#8b949e]">installs/week</span>
                </span>
              )}
            </div>
          )}
          <div className="mt-2">
            <a href="https://peerlist.io/raajkhan/project/canaryhook--protect-your-credentials" target="_blank" rel="noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://peerlist.io/api/v1/projects/embed/PRJHEOG7GQ9DJMP6B1BGRKLGGMN9DM?showUpvote=true&theme=dark"
                alt="canaryhook on Peerlist"
                style={{ height: 48 }}
              />
            </a>
          </div>
        </div>
      </Section>

      {/* Demos */}
      <Section className="!pt-0" bg="navy">
        <Container>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-2 text-center" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>See it in action</h2>
          <p className="text-[14px] text-center mb-8" style={{ color: "#8b949e" }}>Real terminal output, click to expand</p>
          <div className="rounded-xl overflow-hidden border-2 mb-6 aspect-video" style={{ borderColor: "rgba(242,199,68,0.2)", background: "#0d1117" }}>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0`}
              title="canaryhook in 80 seconds"
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DemoCard src="/canaryhook/demos/demo-init.gif" title="canaryhook init" desc="Plant the decoys, wire the hook" />
            <DemoCard src="/canaryhook/demos/demo-trip.gif" title="the trip" desc="A credential hunt, denied and recorded" />
          </div>
        </Container>
      </Section>

      {/* Four detection paths */}
      <Section>
        <Container>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-3 text-center" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>Four ways to trip it</h2>
          <p className="text-[15px] text-center mb-10 max-w-[620px] mx-auto" style={{ color: "#8b949e" }}>
            Every tool call passes through the hook before it runs, and again after. Plain string comparisons over the call&apos;s own input and output.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PATHS.map(({ label, title, body, code }) => (
              <div key={label} className="rounded-2xl border p-6" style={{ borderColor: "rgba(242,199,68,0.18)", background: "linear-gradient(135deg, rgba(242,199,68,0.05), transparent)" }}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-3" style={{ color: AMBER }}>{label}</div>
                <h3 className="text-[18px] font-semibold mb-2" style={{ color: "#f0f6fc" }}>{title}</h3>
                <p className="text-[14px] leading-relaxed mb-4" style={{ color: "#8b949e" }}>{body}</p>
                <Block>{code}</Block>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Agents */}
      <Section bg="navy">
        <Container>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-3" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>Works with your agent</h2>
          <p className="text-[15px] mb-8 max-w-[640px]" style={{ color: "#8b949e" }}>
            <Code>init</Code> wires Claude Code plus any agent the project already uses, merging with the hooks you have. Name them yourself with <Code>--agents</Code>.
          </p>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {AGENTS.map(([name, flag, file], i) => (
              <div key={flag} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-5 py-4" style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)", background: i % 2 ? "rgba(255,255,255,0.012)" : "transparent" }}>
                <span className="text-[14.5px] font-semibold sm:w-[170px] shrink-0" style={{ color: "#f0f6fc" }}>{name}</span>
                <code className="text-[13px] sm:w-[130px] shrink-0" style={{ color: AMBER, fontFamily: "var(--font-geist-mono)" }}>{flag}</code>
                <code className="text-[13px]" style={{ color: "#8b949e", fontFamily: "var(--font-geist-mono)" }}>{file}</code>
              </div>
            ))}
          </div>
          <div className="mt-6"><Block>{`canaryhook init --agents claude,cursor,codex`}</Block></div>
          <p className="text-[13px] mt-4" style={{ color: "#484f58" }}>
            Codex runs project hooks only once you approve them with <Code>/hooks</Code>. Antigravity does not hand hooks a tool&apos;s output, so the output path is not available there.
          </p>
        </Container>
      </Section>

      {/* Decoys */}
      <Section>
        <Container>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-3" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>What gets planted</h2>
          <p className="text-[15px] mb-8 max-w-[640px]" style={{ color: "#8b949e" }}>
            Four files, each holding a unique, realistic, completely dead fake secret. Nothing in your code, build, lint or test path references them, which is what keeps false positives near zero.
          </p>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {DECOYS.map(([file, bait], i) => (
              <div key={file} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-5 py-4" style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)", background: i % 2 ? "rgba(255,255,255,0.012)" : "transparent" }}>
                <code className="text-[13.5px] font-semibold sm:w-[220px] shrink-0" style={{ color: AMBER, fontFamily: "var(--font-geist-mono)" }}>{file}</code>
                <span className="text-[14px]" style={{ color: "#8b949e" }}>{bait}</span>
              </div>
            ))}
          </div>
          <p className="text-[13px] mt-4" style={{ color: "#484f58" }}>
            The canary strings live in <Code>.canaryhook/canaries.json</Code>, which is watched too. Decoys are gitignored by default; pass <Code>--commit</Code> to track them.
          </p>
        </Container>
      </Section>

      {/* How to use */}
      <Section bg="navy">
        <Container>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-10 text-center" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>How to use it</h2>
          <div className="flex flex-col gap-8">
            {[
              {
                step: "1",
                title: "Install and plant",
                body: <>One command per project. <Code>init</Code> plants the decoys, merges canaryhook&apos;s hooks into each agent&apos;s config alongside any hooks you already have, and gitignores the bait.</>,
                code: `npm install -g canaryhook\ncd /your/project\ncanaryhook init`,
              },
              {
                step: "2",
                title: "Prove it is armed",
                body: <><Code>doctor</Code> runs each registered hook for real with a planted payload and checks the deny comes back, so an install that quietly fails open shows up now, not after an incident.</>,
                code: `canaryhook doctor`,
              },
              {
                step: "3",
                title: "Work normally",
                body: <>Nothing changes until something goes looking for credentials. When it does, the call is denied, the agent is told the file was a tripwire, and the event is appended to <Code>.canaryhook/alerts.jsonl</Code>.</>,
                code: `{"at":"2026-10-15T06:19:38.156Z","reason":"canary-exfil",\n "decoy":".env.backup","tool":"Bash",\n "detail":"canary string from .env.backup appears in the tool call"}`,
              },
              {
                step: "4",
                title: "Gate it in CI",
                body: <>Plant the decoys before the step that runs the agent, check the record after it. <Code>verify</Code> exits non-zero when any trip was recorded, so an agent-driven pipeline fails loudly instead of quietly shipping.</>,
                code: `- run: npm install -g canaryhook && canaryhook init\n# ... the step that runs the agent ...\n- run: canaryhook verify`,
              },
            ].map(({ step, title, body, code }) => (
              <div key={step} className="flex flex-col sm:flex-row gap-5">
                <div className="shrink-0">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[15px] font-bold" style={{ background: "rgba(242,199,68,0.12)", color: AMBER, border: "1px solid rgba(242,199,68,0.25)" }}>{step}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[18px] font-semibold mb-2" style={{ color: "#f0f6fc" }}>{title}</h3>
                  <p className="text-[14.5px] leading-relaxed mb-4" style={{ color: "#8b949e" }}>{body}</p>
                  <Block>{code}</Block>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Commands */}
      <Section>
        <Container>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-3" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>Six commands</h2>
          <p className="text-[15px] mb-8" style={{ color: "#8b949e" }}>Every one takes <Code>--json</Code>.</p>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {COMMANDS.map(([cmd, desc], i) => (
              <div key={cmd} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-5 py-4" style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)" }}>
                <code className="text-[13.5px] font-semibold sm:w-[200px] shrink-0" style={{ color: AMBER, fontFamily: "var(--font-geist-mono)" }}>{cmd}</code>
                <span className="text-[14px]" style={{ color: "#8b949e" }}>{desc}</span>
              </div>
            ))}
          </div>
          <p className="text-[13px] mt-4" style={{ color: "#484f58" }}>
            Flags: <Code>--agents</Code>, <Code>--commit</Code> and <Code>--force</Code> on init, <Code>--keep-alerts</Code> on clean.
          </p>
        </Container>
      </Section>

      {/* Why */}
      <Section bg="navy">
        <Container>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-3" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>What it is actually for</h2>
          <p className="text-[15px] mb-8 max-w-[640px]" style={{ color: "#8b949e" }}>
            Signature scanning fails against code that rewrites itself. canaryhook does not look at the attacker at all. The trap lives in the environment, and nothing can tell a decoy credential from a real one without reading it.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {THREATS.map(([title, desc]) => (
              <div key={title} className="rounded-xl border p-5" style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.012)" }}>
                <h3 className="text-[15.5px] font-semibold mb-2" style={{ color: "#f0f6fc" }}>{title}</h3>
                <p className="text-[13.5px] leading-relaxed" style={{ color: "#8b949e" }}>{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Limits */}
      <Section>
        <Container>
          <div className="rounded-2xl border p-7 sm:p-10" style={{ borderColor: "rgba(210,153,34,0.25)", background: "linear-gradient(135deg, rgba(210,153,34,0.07), transparent)" }}>
            <h2 className="text-[24px] sm:text-[28px] font-bold mb-4" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>What it does not do</h2>
            <div className="flex flex-col gap-3 text-[14.5px] leading-relaxed" style={{ color: "#8b949e" }}>
              <p>canaryhook detects, it does not prevent. An attacker that ignores the decoys is not caught, and a targeted one that reads only the real <Code>.env</Code> walks straight past.</p>
              <p>A broad sweep such as <Code>grep -r AKIA .</Code> reads the decoys without naming them, so it cannot be blocked. It is recorded after it runs, on the output path, and the agent is told the value is fake.</p>
              <p>It is a smoke detector, not a lock. The value is that it costs nothing to run, needs no model, and stays quiet enough that you leave it installed.</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section bg="navy">
        <Container>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-8 text-center" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>Questions</h2>
          <div className="flex flex-col gap-5">
            {FAQ.map(([q, a]) => (
              <div key={q} className="rounded-xl border p-5" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                <h3 className="text-[15.5px] font-semibold mb-2" style={{ color: "#f0f6fc" }}>{q}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: "#8b949e" }}>{a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="text-center">
        <Container>
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em]" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>Know the moment it happens.</h2>
          <p className="text-[17px] mt-3 mb-8" style={{ color: "#8b949e" }}>One command. Four decoys. No model.</p>
          {installButton}
          <div className="mt-4 flex items-center justify-center gap-5">
            <a href="https://github.com/aiagentflow/canaryhook" target="_blank" rel="noopener" className="text-[14px]" style={{ color: "#484f58" }}>View on GitHub →</a>
            <a href="/docs/canaryhook" className="text-[14px]" style={{ color: "#484f58" }}>Read the docs →</a>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "#080c16" }}>
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                <Mark size={36} radius={9} />
                <span className="font-bold text-[15px]" style={{ color: "#f0f6fc" }}>canaryhook</span>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: "#484f58" }}>
                Honeyfiles and canary tokens for AI coding agents.
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-3" style={{ color: "#8b949e" }}>Product</h4>
              <div className="flex flex-col gap-2">
                <a href="https://github.com/aiagentflow/canaryhook" target="_blank" rel="noopener" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>GitHub</a>
                <a href="https://www.npmjs.com/package/canaryhook" target="_blank" rel="noopener" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>npm</a>
                <a href="/docs/canaryhook" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>Docs</a>
                <a href="https://github.com/aiagentflow/canaryhook/blob/main/LICENSE" target="_blank" rel="noopener" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>MIT License</a>
              </div>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-3" style={{ color: "#8b949e" }}>Commands</h4>
              <div className="flex flex-col gap-2">
                {COMMANDS.slice(0, 4).map(([cmd]) => (
                  <code key={cmd} className="text-[12px]" style={{ color: AMBER, fontFamily: "var(--font-geist-mono)" }}>{cmd}</code>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-3" style={{ color: "#8b949e" }}>More</h4>
              <div className="flex flex-col gap-2">
                <a href="/" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>aiagentflow</a>
                <a href="/aiscribe" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>AiScribe</a>
                <a href="/blog" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>Blog</a>
                <a href="/privacy" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>Privacy</a>
              </div>
            </div>
          </div>
          <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <span className="text-[12px]" style={{ color: "#484f58" }}>Part of the aiagentflow suite</span>
            <p className="text-[12px]" style={{ color: "#484f58" }}>© {new Date().getFullYear()} aiagentflow. Built for AI-native developers</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
