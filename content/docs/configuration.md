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
