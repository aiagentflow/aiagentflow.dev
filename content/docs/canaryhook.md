---
title: "canaryhook"
description: "Plant decoy credentials your AI agents should never touch, and block the call the moment one is read or leaks."
date: "2026-10-15"
keywords: ["canary token", "honeyfile", "prompt injection", "AI agent security", "claude code hooks", "cursor hooks", "codex hooks", "gemini cli hooks", "exfiltration"]
---

`canaryhook` plants decoy credential files that nothing in your project should
ever read, then blocks and records the moment an agent reads one or lets a canary
string leave the machine. No model, no signatures, and close to zero false
positives by construction. It works with Claude Code, Cursor, Codex CLI,
Antigravity CLI and Gemini CLI.

<div class="doc-callout doc-callout-tip">
    <strong>Install:</strong> <code>npm install -g canaryhook</code>, then run <code>canaryhook init</code> inside your project.
</div>

## Why a tripwire instead of a scanner

Signature scanning fails against an agent that rewrites its own code, and the
attack surface around coding agents keeps growing:

- Prompt injection hidden in a fetched page or a GitHub issue body
- A hostile MCP server whose tool sweeps the repo for secrets
- A dependency `postinstall` script doing the same
- Your own agent being overzealous and reading a credentials file into its
  context, where it then lands in a transcript you push somewhere

canaryhook does not look at the attacker at all. The trap lives in the
environment. An attacker cannot tell a decoy credential from a real one without
reading it, and reading it is the trip.

## Setup

```bash
npm install -g canaryhook
cd /your/project
canaryhook init
```

`init` does three things:

1. Plants four decoys, each holding a unique, realistic, dead fake secret.
2. Registers canaryhook's hooks for each agent you use, merging alongside any
   hooks you already have.
3. Adds the decoys and `.canaryhook/` to `.gitignore`. Pass `--commit` to track
   them instead.

Then run `canaryhook doctor`. It fires a planted payload through each
registered hook and checks the deny comes back, so an install that fails open
shows up straight away.

| File | Bait |
| --- | --- |
| `.env.backup` | AWS-shaped access key and secret |
| `credentials.json.bak` | Stripe-shaped live secret key |
| `deploy_key.old` | OpenSSH private key block |
| `db_dump_2026.sql` | API token in an INSERT statement |

Nothing in your code, build, lint or test path references these files, which is
what keeps false positives near zero. A hit means something went looking for
credentials.

## Agents

By default `init` wires Claude Code plus any agent the project already uses,
judged by its config folder. Name them yourself with `--agents`:

```bash
canaryhook init --agents claude,cursor,codex
```

| Agent | `--agents` | Config file |
| --- | --- | --- |
| Claude Code | `claude` | `.claude/settings.json` |
| Cursor | `cursor` | `.cursor/hooks.json` |
| Codex CLI | `codex` | `.codex/hooks.json` |
| Antigravity CLI | `antigravity` | `.agents/hooks.json` |
| Gemini CLI | `gemini` | `.gemini/settings.json` |

<div class="doc-callout doc-callout-tip">
    <strong>Codex CLI:</strong> Codex runs project hooks only once you trust them. After <code>init</code>, run <code>/hooks</code> in Codex and approve canaryhook's.
</div>

Antigravity CLI does not pass a tool's output to its hooks, so the output path
below is not available there. On Gemini CLI, a result that holds a canary is
hidden from the model entirely.

## The four detection paths

**Read path.** The hook trips when a tool call names a decoy path, whether that
is a `Read` with a `file_path`, a shell `cat`, or anything else that mentions
it. A shell glob that expands to a decoy counts too: `cat .env*` or
`grep key *.bak` in the project root.

**Exfil path.** The hook trips when a canary string appears anywhere in a call's
input: a shell argument, a fetch URL or body, a file write, a commit message.
It matches the string as written, lowercased, base64 or hex encoded. You do not
have to enumerate every way a file can be read, only notice the value leaving.

**Output path.** After a call runs, the hook checks what it returned. A canary
string in the output means a decoy was read by a call that never named it, like
`grep -r AKIA .`. The call already ran, so it cannot be blocked, but it is
recorded and the agent is told the value is fake.

**Tamper path.** The hook trips when a call would blind canaryhook: deleting or
rewriting `.canaryhook/`, running `canaryhook clean`, removing the hook from an
agent's config, or switching hooks off there. You can still do all of these
yourself from a terminal, where no hook runs.

On a trip, canaryhook returns a `deny` decision so the tool call never runs,
tells the agent the file was a tripwire and not to retry, and appends a line to
`.canaryhook/alerts.jsonl`:

```json
{"at":"2026-10-14T21:53:40.809Z","reason":"canary-exfil","decoy":".env.backup","tool":"Bash","detail":"canary string from .env.backup appears in the tool call"}
```

A malformed hook payload never blocks a call, so a broken install fails open
rather than wedging your session.

## Commands

```bash
canaryhook init      # plant decoys, register the hooks
canaryhook status    # are decoys planted, is every agent wired
canaryhook doctor    # fire a test payload through each hook
canaryhook alerts    # list recorded trips
canaryhook verify    # exit non-zero if anything tripped
canaryhook clean     # remove decoys, unregister every hook
```

Every command takes `--json`. `init` also takes `--agents`, `--commit` and
`--force`, and `clean` takes `--keep-alerts`. A mistyped flag is an error, not
silently ignored.

## In CI

The decoys and `.canaryhook/` are gitignored, so they only exist in a job that
ran `init`. Plant them before the step that runs the agent and check the record
after it:

```yaml
- run: npm install -g canaryhook && canaryhook init
# ... the step that runs the agent ...
- run: canaryhook verify
```

`verify` exits non-zero when any trip was recorded, and fails where canaryhook
was never initialized rather than reporting a clean record it cannot have.

<div class="doc-callout doc-callout-warning">
    <strong>What this is not:</strong> canaryhook detects, it does not prevent. An attacker that ignores the decoys is not caught, and a targeted one that reads only the real <code>.env</code> walks past. A sweep such as <code>grep -r AKIA .</code> reads the decoys without naming them, so it cannot be blocked, only recorded after it runs. It is a smoke detector, not a lock.
</div>

## Source

[github.com/aiagentflow/canaryhook](https://github.com/aiagentflow/canaryhook), MIT licensed.
