---
title: "llmmemory"
description: "Long-term memory for AI coding agents: plain Markdown memories, recalled into every session through hooks and an MCP server."
date: "2026-10-28"
keywords: ["llm memory", "ai agent memory", "claude code memory", "mcp memory server", "claude code hooks", "persistent context", "markdown memory"]
---

`llmmemory` gives AI coding agents a memory that lasts beyond one session. Facts
are saved as plain Markdown files and handed back at the right moment: an index
when a session starts, and the full memories that match each message you send.
No model, no server, no account, and nothing leaves your machine unless you
commit it.

<div class="doc-callout doc-callout-tip">
    <strong>Install:</strong> <code>npm install -g llmmemory</code>, then run <code>llmmemory init</code> inside your project.
</div>

## Why

Every agent session starts from zero. The decision you explained yesterday, the
command that finally fixed the build, the way you like answers written: all of
it has to be said again. `CLAUDE.md` helps, but you write and maintain it, and
it is loaded in full every time. llmmemory is the part the agent writes itself,
in small pieces, recalled only when a message needs them.

## Setup

```bash
npm install -g llmmemory
cd /your/project
llmmemory init
```

`init` does three things:

- Creates `.llmmemory/memories/` for this project's memories, and
  `~/.llmmemory/memories/` for memories shared by every project.
- Registers a `SessionStart` and a `UserPromptSubmit` hook in
  `.claude/settings.json`, merged with any hooks already there.
- Adds the llmmemory MCP server to `.mcp.json`. Claude Code asks you to approve
  it once. Pass `--no-mcp` to skip it.

`llmmemory` must be on your `PATH`, because the hooks call it by name.

## How recall works

| When | What the agent gets |
| --- | --- |
| A session starts | An index: each memory's name and one-line summary, plus how to save new ones |
| You send a message | The full text of up to 3 memories that match it, each recalled once per session |
| Any time | MCP tools: `remember`, `recall`, `read_memory`, `forget`, `list_memories` |

Matching is keyword search with BM25-style ranking. Rare words count for more
than common ones, and a match in a memory's name or tags outweighs one in its
body. A single common word deep in a body is not enough to recall a memory, so
unrelated messages add nothing to the context.

## Saving memories

The agent is told at the start of every session what is worth saving
(preferences, decisions and their reasons, non-obvious facts about the project)
and what is not (anything the code, git history or docs already record). You can
save memories yourself too:

```bash
llmmemory add "Deploys go through scripts/ship.sh, never straight to main." --tags deploy
llmmemory add "Prefers short answers without preamble." --global
echo "A longer note..." | llmmemory add -
```

The name is derived from the first sentence. Pass `--name` with an existing name
to update that memory instead of adding a near-duplicate:

```bash
llmmemory add "Deploys now run in GitHub Actions." --name deploys-go-through-scripts-ship-sh
```

## Commands

| Command | What it does |
| --- | --- |
| `llmmemory init` | Create `.llmmemory/` and wire the hooks and MCP server |
| `llmmemory add "<fact>"` | Save a memory. `--global`, `--tags a,b`, `--description`, `--name` |
| `llmmemory list` | Every memory, project then global. `--project` or `--global` to filter |
| `llmmemory search <words>` | Find memories by keyword, best match first. `--limit n` |
| `llmmemory show <name>` | Print one memory in full |
| `llmmemory forget <name>` | Delete a memory |
| `llmmemory status` | Where memories live and what is wired |
| `llmmemory clean` | Unwire the hooks and MCP server. Memories are kept |

Every command takes `--json`.

## The memory format

Each memory is one Markdown file with a short frontmatter block. Edit or delete
them by hand whenever you like; a file without frontmatter still loads, with its
first sentence as the summary.

```markdown
---
name: deploys-go-through-scripts-ship-sh
description: Deploys go through scripts/ship.sh, never straight to main.
tags: [deploy]
created: 2026-10-28T04:11:07.449Z
updated: 2026-10-28T04:11:07.449Z
---

Deploys go through scripts/ship.sh, never straight to main.
```

Commit `.llmmemory/` to share project memories with your team, or add it to
`.gitignore` to keep them to yourself. Set `LLMMEMORY_HOME` to move the global
store.

## Other agents

The MCP server works with any MCP client, including Cursor, Codex CLI and Gemini
CLI: register `llmmemory mcp` as a stdio server, run from the project directory.
Automatic recall through hooks is Claude Code only for now.

## Security

Recalled memories are wrapped and labelled as notes from earlier sessions, not
instructions from the user, and a memory cannot close its own wrapper to pose as
something else. Still, anything in `.llmmemory/` reaches the agent's context, so
review memory files in pull requests the way you would a `CLAUDE.md` change.

## Limits

- Recall matches words, not meaning. Tags close most of that gap.
- Automatic recall needs Claude Code. Elsewhere the agent has to call the
  `recall` tool itself.
- A memory is only as good as the fact behind it. The agent is told to check
  memories against the code before acting on them.

Source and issues: [github.com/aiagentflow/llmmemory](https://github.com/aiagentflow/llmmemory).
