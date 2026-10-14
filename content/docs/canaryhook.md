---
title: "canaryhook"
description: "Plant decoy credentials your AI agents should never touch, and block the call the moment one is read or leaks."
date: "2026-10-15"
keywords: ["canary token", "honeyfile", "prompt injection", "AI agent security", "claude code hooks", "exfiltration"]
---

`canaryhook` plants decoy credential files that nothing in your project should
ever read, then blocks and records the moment an agent reads one or lets a canary
string leave the machine. No model, no signatures, and close to zero false
positives by construction.

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
2. Registers a `PreToolUse` hook in `.claude/settings.json`, merging alongside
   any hooks you already have.
3. Adds the decoys and `.canaryhook/` to `.gitignore`. Pass `--commit` to track
   them instead.

| File | Bait |
| --- | --- |
| `.env.backup` | AWS-shaped access key and secret |
| `credentials.json.bak` | Stripe-shaped live secret key |
| `deploy_key.old` | OpenSSH private key block |
| `db_dump_2026.sql` | API token in an INSERT statement |

Nothing in your code, build, lint or test path references these files, which is
what keeps false positives near zero. A hit means something went looking for
credentials.

## The two detection paths

**Read path.** The hook trips when a tool call names a decoy path, whether that
is a `Read` with a `file_path`, a shell `cat`, or anything else that mentions it.

**Exfil path.** The hook trips when a canary string appears anywhere in a call's
input: a shell argument, a fetch URL or body, a file write, a commit message.
You do not have to enumerate every way a file can be read, only notice the value
leaving.

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
canaryhook init      # plant decoys, register the hook
canaryhook status    # are decoys planted, is the hook wired
canaryhook alerts    # list recorded trips
canaryhook verify    # exit non-zero if anything tripped
canaryhook clean     # remove decoys, unregister the hook
```

Every command takes `--json`. `init` also takes `--commit` and `--force`, and
`clean` takes `--keep-alerts`.

## In CI

`verify` exits non-zero when any trip was recorded, so it works as a gate:

```yaml
- run: npx canaryhook verify
```

<div class="doc-callout doc-callout-warning">
    <strong>What this is not:</strong> canaryhook detects, it does not prevent. An attacker that ignores the decoys is not caught, and a targeted one that reads only the real <code>.env</code> walks past. A sweep such as <code>grep -r AKIA .</code> reads the decoys without naming them, so it only trips later on the exfil path. It is a smoke detector, not a lock.
</div>

## Source

[github.com/aiagentflow/canaryhook](https://github.com/aiagentflow/canaryhook), MIT licensed.
