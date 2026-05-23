---
title: "Getting Started"
description: "How to install and run your first AI Agent Flow task."
date: "2026-02-28"
---



AI Agent Flow (`v1.3.0`) is a local-first, multi-agent orchestration framework designed for software engineering. This guide will help you install the CLI and run your first autonomous task.

<div class="doc-callout doc-callout-tip">
    <strong>Pro Tip:</strong> For the best results, use <strong>Claude Sonnet 4</strong> or <strong>GPT-4o</strong>. These models have superior reasoning capabilities for architecture and complex code generation.
</div>

## Prerequisites

- **Node.js**: Version 18 or higher.
- **LLM API Key**: You'll need an API key from a supported provider — or use a free-tier option to get started with no credit card:
  - **Free options**: [Groq](https://console.groq.com) or [OpenRouter](https://openrouter.ai) both have generous free tiers
  - **Cloud options**: Anthropic, OpenAI, or Google Gemini
  - **Local / no key**: [Ollama](https://ollama.com) runs models entirely on your machine

<div class="doc-callout doc-callout-warning">
    <strong>Security Note:</strong> Always keep your API keys private. Use environment variables or global config instead of hardcoding them in requests.
</div>

## Installation

Install the package globally via npm:

```bash
npm install -g @aiagentflow/cli
```

Verify the installation:

```bash
aiagentflow --version
```

## Running Your First Task

Navigate to your project directory and run:

```bash
aiagentflow run "Add a unit test for the authentication middleware"
```

The CLI will:
1.  **Analyze**: The Architect agent analyzes your codebase and drafts an implementation plan.
2.  **Code**: The Coder agent writes the changes across one or more files.
3.  **Review**: The Reviewer agent checks for bugs, style issues, and anti-patterns.
4.  **Security**: The Security agent scans for vulnerabilities (OWASP top-10, secret exposure, injection flaws).
5.  **Test**: The Tester agent writes and runs tests. The Fixer agent resolves any failures.
6.  **Approve**: The Judge agent makes the final call.

## Other Useful Commands

**Run in an isolated git worktree** — agents work on a fresh branch, leaving your working directory untouched:

```bash
aiagentflow run --isolate "Refactor the payment module"
```

After the workflow finishes you'll be prompted to merge, keep, or discard the branch. Use these commands to manage active worktree runs:

```bash
aiagentflow runs                          # list active runs
aiagentflow discard --merge <branch>      # merge and clean up
aiagentflow gc                            # prune runs older than 7 days
```

**Review the Architect's plan before coding starts:**

```bash
aiagentflow run --review-plan "Add OAuth2 support"
```

The workflow pauses after planning so you can approve, edit in `$EDITOR`, ask for a regeneration, or abort.

**Run batch tasks in parallel:**

```bash
aiagentflow run --batch tasks.txt --parallel 4 --auto
aiagentflow run --batch tasks.txt --parallel 2 --max-tokens 500000 --max-cost 2.00
```

**Address GitHub PR review comments automatically:**

```bash
aiagentflow run --pr 42 --isolate
```

Fetches the PR's review comments and change requests, then runs the full agent pipeline to resolve them. Requires the [GitHub CLI](https://cli.github.com) (`gh auth login`).

**Implement a GitHub issue end-to-end:**

```bash
aiagentflow run --issue 7 --isolate --auto
```

Fetches the issue body and labels as the task. After the Judge approves, a pull request is opened automatically.

**Inspect and test MCP server configuration:**

```bash
aiagentflow mcp list              # show configured servers and their tools
aiagentflow mcp test filesystem   # start a server and verify it exposes its tools
```

**Manage plugins (custom agents and providers):**

```bash
aiagentflow plugin list                         # show installed plugins
aiagentflow plugin install @my-org/aiagentflow-linter  # install from npm
aiagentflow plugin install ./local-plugin       # symlink a local plugin
aiagentflow plugin remove my-plugin             # uninstall
```

**Launch the terminal UI dashboard:**

```bash
aiagentflow ui
```

Shows a live auto-refreshing list of active worktree runs with status icons, token counts, and costs. Press `q` to quit.

**Talk to a single agent without running the full pipeline:**

```bash
aiagentflow chat reviewer --file src/auth.ts "review this for security issues"
```

**Generate a structured report from any past workflow session:**

```bash
aiagentflow export --format md --output report.md
```

**Generate a task list from a spec or PRD file:**

```bash
aiagentflow plan docs/spec.md --numbered -o tasks.txt
aiagentflow run --batch tasks.txt --auto
```

## Next Steps

Check out our [Configuration Guide](/docs/configuration) to learn how to set up your preferred AI providers and MCP servers.
