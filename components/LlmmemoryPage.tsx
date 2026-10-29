"use client";

import { useEffect, useState } from "react";

import { ParticleBg } from "./ParticleBg";

const installCommand = "npm install -g llmmemory";
const VIOLET = "#a78bfa";
const VIOLET_SOFT = "#c4b5fd";
const VIOLET_DEEP = "#7c3aed";

function Section({ children, className = "", bg = "black" }: { children: React.ReactNode; className?: string; bg?: "black" | "navy" }) {
  const bgColor = bg === "navy" ? "#080c16" : "#0d1117";
  const borderColor = bg === "navy" ? "rgba(255,255,255,0.04)" : "transparent";
  return <section className={`py-16 sm:py-24 ${className}`} style={{ background: bgColor, borderTop: `1px solid ${borderColor}` }}>{children}</section>;
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-[960px] mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** A page with a folded corner: a memory is a Markdown file. */
function Mark({ size = 40, radius = 10 }: { size?: number; radius?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect width="48" height="48" rx={radius} fill="url(#lmg)" />
      <path d="M15 11h13l7 7v19a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2V13a2 2 0 0 1 2-2z" fill="#0d1117" />
      <path d="M28 11v7h7" stroke={VIOLET_SOFT} strokeWidth="2" strokeLinejoin="round" fill="none" />
      <path d="M18 25h12M18 30h12M18 35h7" stroke={VIOLET_SOFT} strokeWidth="2.2" strokeLinecap="round" />
      <defs>
        <linearGradient id="lmg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={VIOLET_SOFT} />
          <stop offset="1" stopColor={VIOLET_DEEP} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-[13px] px-1.5 py-0.5 rounded" style={{ background: "rgba(167,139,250,0.1)", color: VIOLET_SOFT, fontFamily: "var(--font-geist-mono)" }}>
      {children}
    </code>
  );
}

function Block({ children, label }: { children: string; label?: string }) {
  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.08)", background: "#080c16" }}>
      {label && (
        <div className="px-4 py-2 text-[12px] font-medium border-b" style={{ color: "#8b949e", borderColor: "rgba(255,255,255,0.06)" }}>
          {label}
        </div>
      )}
      <pre className="px-4 py-3.5 overflow-x-auto text-[12.5px] leading-relaxed" style={{ color: "#c9d1d9", fontFamily: "var(--font-geist-mono)" }}>
        {children}
      </pre>
    </div>
  );
}

const SESSION_INDEX = `llmmemory: 3 saved memories. Each line is a name and a summary.
This project:
- deploys-go-through-ship-sh: Deploys go through scripts/ship.sh,
  never straight to main. [deploy]
- sqlite-wal-mode: The database is SQLite in WAL mode.
All projects:
- short-answers: Prefers short answers without preamble.`;

const RECALLED = `you › how do I deploy this change?

<memory name="deploys-go-through-ship-sh" scope="project">
Deploys go through scripts/ship.sh, never straight to main.
It runs the checks first and squash-merges the PR.
</memory>`;

const MOMENTS: { label: string; title: string; body: React.ReactNode }[] = [
  {
    label: "Session start",
    title: "An index of what it knows",
    body: <>Every memory&apos;s name and one-line summary, project first, then the ones that follow you everywhere. Plus how to save new ones, so the agent keeps the memory growing on its own.</>,
  },
  {
    label: "Every message",
    title: "The memories that match",
    body: <>In Claude Code, Codex CLI and Gemini CLI, your message is matched against every memory. Up to three that fit are added in full, each only once per session. An unrelated message adds nothing.</>,
  },
  {
    label: "Any time",
    title: "Tools the agent can call",
    body: <>An MCP server with <Code>remember</Code>, <Code>recall</Code>, <Code>read_memory</Code>, <Code>forget</Code> and <Code>list_memories</Code>. Registered for every supported agent, and usable from any MCP client.</>,
  },
];

const COMMANDS: [string, string][] = [
  ["llmmemory init", "Create .llmmemory/ and wire the hooks and MCP server"],
  ['llmmemory add "<fact>"', "Save a memory; --global for every project, --name to update one"],
  ["llmmemory list", "Every memory, project then global"],
  ["llmmemory search <words>", "Find memories by keyword, best match first"],
  ["llmmemory show <name>", "Print one memory in full"],
  ["llmmemory edit <name>", "Open a memory in your editor"],
  ["llmmemory forget <name>", "Delete a memory that turned out wrong"],
  ["llmmemory import", "Copy CLAUDE.md, AGENTS.md, GEMINI.md and Claude Code's memory in"],
  ["llmmemory doctor", "Run every wired hook and the MCP server to prove they answer"],
  ["llmmemory status", "Where memories live and what each agent gets"],
  ["llmmemory clean", "Unwire every agent; memories are kept"],
];

const WORTH: [string, string][] = [
  ["Your preferences", "How you like answers written, which tools you reach for, what you never want it to do again."],
  ["Decisions and why", "Why the queue is Postgres and not Redis. The reason is what the next session needs, and the code never says it."],
  ["Hard-won fixes", "The build flag that took an afternoon to find. Next time it is one recall away."],
  ["Project lore", "The staging server's name, the deploy day, the module nobody should touch without asking."],
];

const FAQ: [string, string][] = [
  [
    "Doesn't Claude Code already have memory?",
    "Claude Code reads CLAUDE.md files, which you write and maintain. llmmemory is the part the agent writes: small facts saved as they come up, recalled only when a message needs them, instead of one file loaded in full every time. Already keep facts in CLAUDE.md or Claude Code's own memory? llmmemory import copies them in, so every agent sees them.",
  ],
  [
    "Does it need an AI model or an API key?",
    "No. Recall is keyword search with BM25-style ranking: rare words count for more, and a match in a memory's name or tags outweighs one in its body. Common developer synonyms count as one word, so "shipping" finds a deploy memory. It runs in milliseconds, and nothing leaves your machine.",
  ],
  [
    "Where are my memories stored?",
    "As Markdown files in .llmmemory/memories/ for the project and ~/.llmmemory/memories/ for facts that apply everywhere. Read them, edit them, delete them, or commit the project folder to share it with your team.",
  ],
  [
    "Will it fill my context window?",
    "No. A session starts with one line per memory, capped in size. A message pulls in at most three memories, each only once per session, and a lone common word is not enough to recall anything.",
  ],
  [
    "Which agents does it work with?",
    "Claude Code, Codex CLI, Gemini CLI, Cursor and Antigravity CLI. All five get the memory index when a session starts and the MCP tools. Claude Code, Codex and Gemini CLI also get matching memories added to each message; Cursor and Antigravity do not show their hooks the message, so there the agent looks memories up through MCP.",
  ],
  [
    "Can a memory hijack my agent?",
    "Recalled memories are wrapped and labelled as notes from earlier sessions, not instructions from you, and a memory cannot close its own wrapper. Still, anything in .llmmemory/ reaches the agent, so review memory files in pull requests the way you would a CLAUDE.md change.",
  ],
];

export function LlmmemoryPage() {
  const [stars, setStars] = useState<string | null>(null);
  const [downloads, setDownloads] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/repos/aiagentflow/llmmemory")
      .then(r => r.json())
      .then(d => {
        const count = d.stargazers_count || 0;
        if (count >= 10) setStars(count.toString());
      })
      .catch(() => {});
    fetch("https://api.npmjs.org/downloads/point/last-week/llmmemory")
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
        gtag("event", "install_copy", { event_category: "conversion", event_label: "npm_install_llmmemory", value: 1 });
      }
    } catch {}
  };

  const installButton = (
    <button
      onClick={trackInstall}
      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95"
      style={{ background: VIOLET, color: "#0d1117", boxShadow: "0 0 0 1px rgba(255,255,255,.06) inset, 0 8px 24px rgba(167,139,250,.22)" }}
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
          <a href="/llmmemory" className="flex items-center gap-2.5">
            <Mark size={32} radius={8} />
            <span className="font-bold text-[16px] tracking-[-0.01em]" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>llmmemory</span>
          </a>
          <div className="flex items-center gap-1">
            <a href="/docs/llmmemory" className="hidden sm:block px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors" style={{ color: "#8b949e" }}>Docs</a>
            <a href="https://github.com/aiagentflow/llmmemory" target="_blank" rel="noopener" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium" style={{ color: "#8b949e" }} aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="#f0f6fc"><path d="M8 0a8 8 0 00-2.5 15.6c.4.07.55-.17.55-.38v-1.34c-2.24.48-2.7-1.08-2.7-1.08-.37-.93-.9-1.18-.9-1.18-.73-.5.06-.49.06-.49.8.06 1.23.82 1.23.82a1.75 1.75 0 002.4.67c.3-.47.7-.82 1.27-1.02-2.23-.25-4.57-1.11-4.57-4.95a3.88 3.88 0 011.03-2.69 3.6 3.6 0 01.1-2.66s.84-.27 2.75 1.03a9.5 9.5 0 015 0c1.91-1.3 2.75-1.03 2.75-1.03a3.6 3.6 0 01.1 2.66 3.87 3.87 0 011.03 2.69c0 3.85-2.34 4.7-4.58 4.95.47.4.89 1.2.89 2.42v3.58c0 .27.18.46.55.38A8 8 0 008 0z" /></svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a href="https://www.npmjs.com/package/llmmemory" target="_blank" rel="noopener" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium" style={{ color: "#8b949e" }} aria-label="npm">
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
            Your agent forgets
            <br />
            <span style={{ background: `linear-gradient(135deg, ${VIOLET_SOFT}, ${VIOLET_DEEP})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              every session.
            </span>
          </h1>
          <p className="text-[17px] sm:text-[19px] leading-relaxed max-w-[600px]" style={{ color: "#8b949e" }}>
            llmmemory gives it a memory. Facts are saved as plain Markdown files and handed back at the right moment: an index when a session starts, and the memories that match each message you send. No model, no server, no account.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center mt-2">{installButton}</div>
          <p className="text-[12px]" style={{ color: "#484f58" }}>
            Claude Code · Codex · Gemini CLI · Cursor · Antigravity · No API key · MIT
          </p>
          {(stars || downloads) && (
            <div className="flex items-center gap-1" style={{ color: "#8b949e" }}>
              {stars && (
                <a href="https://github.com/aiagentflow/llmmemory" target="_blank" rel="noopener" className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium hover:bg-white/5" title="GitHub stars">
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
        </div>
      </Section>

      {/* What the agent sees */}
      <Section className="!pt-0" bg="navy">
        <Container>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-2 text-center" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>What your agent sees</h2>
          <p className="text-[14px] text-center mb-8" style={{ color: "#8b949e" }}>Real hook output, trimmed for width</p>
          <div className="flex flex-col gap-6 max-w-[720px] mx-auto">
            <Block label="When a session starts">{SESSION_INDEX}</Block>
            <Block label="When you send a message">{RECALLED}</Block>
          </div>
        </Container>
      </Section>

      {/* Demos */}
      <Section>
        <Container>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-2 text-center" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>See it in action</h2>
          <p className="text-[14px] text-center mb-8" style={{ color: "#8b949e" }}>Real terminal recordings</p>
          <div className="flex flex-col gap-8 max-w-[820px] mx-auto">
            {[
              ["/llmmemory/demos/demo-init.gif", "llmmemory init", "Wire your agents, save a few facts"],
              ["/llmmemory/demos/demo-recall.gif", "the recall", "One Claude Code session saves a fact, the next one uses it"],
            ].map(([src, title, desc]) => (
              <figure key={src} className="rounded-xl overflow-hidden border-2" style={{ borderColor: "rgba(167,139,250,0.22)", background: "#0d1117" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${title}: ${desc}`} className="w-full" loading="lazy" />
                <figcaption className="px-4 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <code className="text-[14px] font-semibold" style={{ color: VIOLET, fontFamily: "var(--font-geist-mono)" }}>{title}</code>
                  <p className="text-[12px] mt-0.5" style={{ color: "#8b949e" }}>{desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* Three moments */}
      <Section bg="navy">
        <Container>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-3 text-center" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>Remembered at the right moment</h2>
          <p className="text-[15px] text-center mb-10 max-w-[620px] mx-auto" style={{ color: "#8b949e" }}>
            Not one big file loaded every time. Small memories, each pulled in when the conversation needs it.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOMENTS.map(({ label, title, body }) => (
              <div key={label} className="rounded-2xl border p-6" style={{ borderColor: "rgba(167,139,250,0.2)", background: "linear-gradient(135deg, rgba(167,139,250,0.06), transparent)" }}>
                <div className="text-[13px] font-semibold mb-3" style={{ color: VIOLET }}>{label}</div>
                <h3 className="text-[18px] font-semibold mb-2" style={{ color: "#f0f6fc" }}>{title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: "#8b949e" }}>{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Files you own */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-4" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>Memories are files you own</h2>
              <div className="flex flex-col gap-3 text-[15px] leading-relaxed" style={{ color: "#8b949e" }}>
                <p>One Markdown file per memory. Read it, fix it, delete it by hand. No database to inspect, no format to decode.</p>
                <p>Project memories live in <Code>.llmmemory/memories/</Code>. Commit the folder and your whole team&apos;s agents share what each one learned. Facts about you go in <Code>~/.llmmemory/</Code> and follow you to every project.</p>
              </div>
            </div>
            <Block label=".llmmemory/memories/deploys-go-through-ship-sh.md">{`---
name: deploys-go-through-ship-sh
description: Deploys go through scripts/ship.sh,
  never straight to main.
tags: [deploy]
created: 2026-10-28T04:11:07.449Z
updated: 2026-10-28T04:11:07.449Z
---

Deploys go through scripts/ship.sh, never
straight to main. It runs the checks first
and squash-merges the PR.`}</Block>
          </div>
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
                title: "Install and wire it up",
                body: <>One command per project. <Code>init</Code> creates the memory folder and wires Claude Code plus every agent the project already uses, merging with the hooks you have. <Code>doctor</Code> then runs each hook for real, so a broken install never looks like an empty memory.</>,
                code: `npm install -g llmmemory\ncd /your/project\nllmmemory init\nllmmemory doctor`,
              },
              {
                step: "2",
                title: "Bring what you already have",
                body: <>Facts in <Code>CLAUDE.md</Code>, <Code>AGENTS.md</Code>, <Code>GEMINI.md</Code> or Claude Code&apos;s own memory only reach one agent. <Code>import</Code> copies them in, one memory per section, and never changes the originals. Running it again skips what is already saved.</>,
                code: `llmmemory import --dry-run\nllmmemory import`,
              },
              {
                step: "3",
                title: "Let the agent save what it learns",
                body: <>Every session is told what is worth keeping: preferences, decisions and their reasons, non-obvious facts. And what is not: anything the code or git history already records.</>,
                code: `llmmemory add "Deploys go through scripts/ship.sh." --tags deploy`,
              },
              {
                step: "4",
                title: "Teach it about you once",
                body: <>Global memories apply in every project, so a preference stated once is never asked again.</>,
                code: `llmmemory add "Prefers short answers without preamble." --global`,
              },
              {
                step: "5",
                title: "Keep it honest",
                body: <>Search what it knows, edit or update a memory that changed, forget one that turned out wrong. Updating by name keeps one memory per fact, and a new memory that mostly repeats an old one comes back with a pointer to it, so near-duplicates do not pile up. A memory untouched for about six months shows its last update, and the agent is told to confirm it before relying on it.</>,
                code: `llmmemory search deploy\nllmmemory edit deploys-go-through-ship-sh\nllmmemory add "Deploys now run in GitHub Actions." --name deploys-go-through-ship-sh\nllmmemory forget sqlite-wal-mode`,
              },
            ].map(({ step, title, body, code }) => (
              <div key={step} className="flex flex-col sm:flex-row gap-5">
                <div className="shrink-0">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[15px] font-bold" style={{ background: "rgba(167,139,250,0.12)", color: VIOLET, border: "1px solid rgba(167,139,250,0.28)" }}>{step}</div>
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

      {/* Worth remembering */}
      <Section>
        <Container>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-3" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>What is worth remembering</h2>
          <p className="text-[15px] mb-8 max-w-[640px]" style={{ color: "#8b949e" }}>
            The things you explain to a new teammate in their first week, and then never have to explain again.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WORTH.map(([title, desc]) => (
              <div key={title} className="rounded-xl border p-5" style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.012)" }}>
                <h3 className="text-[15.5px] font-semibold mb-2" style={{ color: "#f0f6fc" }}>{title}</h3>
                <p className="text-[13.5px] leading-relaxed" style={{ color: "#8b949e" }}>{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Commands */}
      <Section bg="navy">
        <Container>
          <h2 className="text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] mb-3" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>Eleven commands</h2>
          <p className="text-[15px] mb-8" style={{ color: "#8b949e" }}>Every one takes <Code>--json</Code>.</p>
          <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {COMMANDS.map(([cmd, desc], i) => (
              <div key={cmd} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-5 py-4" style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)" }}>
                <code className="text-[13.5px] font-semibold sm:w-[240px] shrink-0" style={{ color: VIOLET, fontFamily: "var(--font-geist-mono)" }}>{cmd}</code>
                <span className="text-[14px]" style={{ color: "#8b949e" }}>{desc}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Limits */}
      <Section>
        <Container>
          <div className="rounded-2xl border p-7 sm:p-10" style={{ borderColor: "rgba(167,139,250,0.25)", background: "linear-gradient(135deg, rgba(167,139,250,0.07), transparent)" }}>
            <h2 className="text-[24px] sm:text-[28px] font-bold mb-4" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>What it does not do</h2>
            <div className="flex flex-col gap-3 text-[14.5px] leading-relaxed" style={{ color: "#8b949e" }}>
              <p>Recall matches words, not meaning. Common synonyms such as &quot;ship&quot; and &quot;deploy&quot; are folded together, but a message about &quot;going live&quot; still misses a memory that only says &quot;deploy&quot;. Tags close most of that gap, and the agent can always search.</p>
              <p>Cursor and Antigravity CLI do not show their hooks your message, so they get the index at session start and recall the rest through the MCP server, when the agent decides to call it.</p>
              <p>It remembers what gets saved. A memory is only as good as the fact behind it, so the agent is told to check memories against the code before acting on them.</p>
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
          <h2 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em]" style={{ fontFamily: "var(--font-geist-sans)", color: "#f0f6fc" }}>Stop explaining it twice.</h2>
          <p className="text-[17px] mt-3 mb-8" style={{ color: "#8b949e" }}>One command. Plain files. No model.</p>
          {installButton}
          <div className="mt-4 flex items-center justify-center gap-5">
            <a href="https://github.com/aiagentflow/llmmemory" target="_blank" rel="noopener" className="text-[14px]" style={{ color: "#484f58" }}>View on GitHub →</a>
            <a href="/docs/llmmemory" className="text-[14px]" style={{ color: "#484f58" }}>Read the docs →</a>
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
                <span className="font-bold text-[15px]" style={{ color: "#f0f6fc" }}>llmmemory</span>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: "#484f58" }}>
                Long-term memory for AI coding agents.
              </p>
            </div>
            <div>
              <h4 className="text-[12px] font-semibold mb-3" style={{ color: "#8b949e" }}>Product</h4>
              <div className="flex flex-col gap-2">
                <a href="https://github.com/aiagentflow/llmmemory" target="_blank" rel="noopener" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>GitHub</a>
                <a href="https://www.npmjs.com/package/llmmemory" target="_blank" rel="noopener" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>npm</a>
                <a href="/docs/llmmemory" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>Docs</a>
                <a href="https://github.com/aiagentflow/llmmemory/blob/main/LICENSE" target="_blank" rel="noopener" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>MIT License</a>
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-semibold mb-3" style={{ color: "#8b949e" }}>Commands</h4>
              <div className="flex flex-col gap-2">
                {COMMANDS.slice(0, 4).map(([cmd]) => (
                  <code key={cmd} className="text-[12px]" style={{ color: VIOLET, fontFamily: "var(--font-geist-mono)" }}>{cmd}</code>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[12px] font-semibold mb-3" style={{ color: "#8b949e" }}>More</h4>
              <div className="flex flex-col gap-2">
                <a href="/" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>aiagentflow</a>
                <a href="/aiscribe" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>AiScribe</a>
                <a href="/canaryhook" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>canaryhook</a>
                <a href="/blog" className="text-[13px] hover:underline" style={{ color: "#484f58" }}>Blog</a>
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
