---
title: "Provider Configuration"
description: "How to configure Anthropic, OpenAI, Gemini, Groq, OpenRouter, and Ollama with AI Agent Flow."
date: "2026-04-13"
---

AI Agent Flow supports six LLM providers — cloud and local. Configuration is handled interactively via `aiagentflow init`, which writes a `.aiagentflow/config.json` file in your project directory.

```bash
aiagentflow init
```

The wizard walks you through selecting providers, entering API keys, assigning models per agent role, and setting workflow preferences.

<div class="doc-callout doc-callout-tip">
    <strong>Pro Tip:</strong> Run <code>aiagentflow doctor</code> after setup to verify all providers can connect and list available models.
</div>

## Anthropic (Recommended)

Claude Sonnet 4 is the recommended model for architecture and coding tasks due to its strong reasoning and large context window.

Get your API key at [console.anthropic.com](https://console.anthropic.com).

**Default model:** `claude-sonnet-4-20250514`

## OpenAI

Compatible with GPT-4o, GPT-4o-mini, and o-series models.

Get your API key at [platform.openai.com](https://platform.openai.com).

**Default model:** `gpt-4o-mini`

## Google Gemini

Gemini's large context window makes it excellent for analyzing large codebases.

Get your API key at [aistudio.google.com](https://aistudio.google.com).

**Default model:** `gemini-2.0-flash`

## Groq

Groq provides extremely fast inference on open-source models. The free tier is generous — good for testing and rapid iteration.

Get your API key at [console.groq.com](https://console.groq.com).

**Default model:** `llama-3.3-70b-versatile`

## OpenRouter

OpenRouter proxies 100+ models through a single OpenAI-compatible API. Many models are available for free — no credit card required.

Get your API key at [openrouter.ai](https://openrouter.ai).

**Default model:** `meta-llama/llama-3.1-8b-instruct:free`

<div class="doc-callout doc-callout-tip">
    <strong>Free tier tip:</strong> Append <code>:free</code> to any model ID on OpenRouter to use the free version — e.g. <code>google/gemma-3-12b-it:free</code>.
</div>

## Ollama (Local First)

For maximum privacy, run AI Agent Flow entirely offline using local models via Ollama.

1. [Install Ollama](https://ollama.com/)
2. Pull a model:
   ```bash
   ollama pull llama3.2
   ```
3. Select Ollama during `aiagentflow init` — no API key needed.

**Default model:** `llama3.2:latest`

## Assigning Models Per Agent

During `aiagentflow init` you can assign different providers and models to each of the seven agent roles (Architect, Coder, Reviewer, Security, Tester, Fixer, Judge). This lets you use a powerful model for the Architect while using a faster/cheaper one for repetitive tasks like the Fixer.

The configuration is saved to `.aiagentflow/config.json` in your project root.

## Workflow Settings

These fields live under `workflow` in `.aiagentflow/config.json` and can also be overridden per-run with CLI flags.

### Worktree Isolation

```json
{
  "workflow": {
    "isolation": "inplace",
    "autoMerge": "never"
  }
}
```

| Field | Values | Default | Description |
|---|---|---|---|
| `isolation` | `"worktree"` / `"inplace"` | `"inplace"` | Run tasks in an isolated git worktree (`--isolate`) or directly in your working directory |
| `autoMerge` | `"never"` / `"on-judge-pass"` / `"always"` | `"never"` | When to auto-merge the worktree branch back into the source branch |

### Approval Gates

```json
{
  "workflow": {
    "approvalGates": ["architect"]
  }
}
```

`approvalGates` is a list of agent roles where the workflow pauses for human review before continuing. Setting `["architect"]` is equivalent to always passing `--review-plan`. Valid roles: `architect`, `coder`, `reviewer`, `security`, `tester`, `fixer`, `judge`.

## MCP Servers

Agents can call external tools — read files, query databases, post to Slack, etc. — via MCP (Model Context Protocol) servers. Add a `mcpServers` map to `.aiagentflow/config.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
      "allowedRoles": ["coder", "tester"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "ghp_..." }
    }
  }
}
```

| Field | Type | Description |
|---|---|---|
| `command` | `string` | Executable to run the server (e.g. `npx`, `python`, `node`) |
| `args` | `string[]` | Arguments passed to the command |
| `env` | `Record<string, string>` | Extra environment variables for the server process |
| `allowedRoles` | `string[]` | Agent roles that may call this server's tools. Omit to allow all roles. |

Use `aiagentflow mcp list` to see configured servers and `aiagentflow mcp test <name>` to verify a server starts and lists its tools correctly.

<div class="doc-callout doc-callout-tip">
    <strong>Finding MCP servers:</strong> Browse the <a href="https://github.com/modelcontextprotocol/servers">official MCP servers repo</a> for filesystem, GitHub, Postgres, Slack, and many more.
</div>

## Plugins

Custom agents and providers can be added via the plugin system. Plugins live in `.aiagentflow/plugins/` and are managed with `aiagentflow plugin install/list/remove`.

```bash
# Install from npm
aiagentflow plugin install @my-org/aiagentflow-linter

# Symlink a local plugin (for development)
aiagentflow plugin install ./plugins/my-custom-agent
```

Each plugin exports a `manifest` object declaring its name, version, and what it contributes (`agent`, `provider`, or `both`). Plugin-contributed agent roles appear in the workflow after their designated built-in anchor (e.g. `after: "tester"`).

Plugin names must not clash with built-in roles (`architect`, `coder`, `reviewer`, `security`, `tester`, `fixer`, `judge`) or built-in providers (`anthropic`, `openai`, `gemini`, `groq`, `ollama`, `openrouter`).
