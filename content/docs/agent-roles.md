---
title: "Agent Roles"
description: "Understanding all seven agents: Architect, Coder, Reviewer, Security, Tester, Fixer, and Judge."
date: "2026-04-13"
---

AI Agent Flow uses a multi-agent pipeline to ensure high-quality, reliable output. Each agent has a specific role in the process — no single model handles everything.

<div class="doc-callout doc-callout-tip">
    <strong>Developer Insight:</strong> This multi-agent separation prevents "hallucination cascade" — where a single model might ignore its own errors. Each agent acts as an independent check on the previous one.
</div>

## 🏛️ The Architect

The Architect is the first agent to act. Its job is to:
- Analyze the user request and relevant codebase context
- Draft a step-by-step implementation plan
- Identify potential edge cases and dependencies
- Produce a detailed spec that the Coder follows

## 💻 The Coder

The Coder follows the Architect's plan precisely. It:
- Writes the actual code changes across one or more files
- Ensures syntax correctness for the target language and framework
- Implements the logic specified in the plan — no improvisation

## 🔍 The Reviewer

The Reviewer acts as a second pair of eyes after code is generated. It looks for:
- Logic bugs and off-by-one errors
- Security vulnerabilities (injection, auth issues, unsafe defaults)
- Style guide violations and anti-patterns
- Missing edge case handling

If the Reviewer rejects the code, the Fixer agent is invoked automatically.

## 🔒 The Security Agent

The Security Agent runs after the Reviewer approves the code and before tests are written. It scans the generated output for:
- **Injection flaws** — SQL, command, LDAP, XSS, and template injection
- **Secret exposure** — hardcoded credentials, API keys, or PII in logs
- **Broken access control** — insecure direct object references, missing authorization checks
- **Cryptographic weaknesses** — weak algorithms, predictable tokens, hardcoded salts
- **Dangerous function calls** — `eval`, `exec`, shell passthrough, unsafe file operations
- **Security misconfiguration** — open CORS, debug flags, default credentials

If the Security Agent returns `FAIL`, the Fixer agent is invoked with the findings as context — the same fix loop used for review rejections.

## 🧪 The Tester

The Tester writes unit and integration tests for the generated code. It:
- Generates test files covering happy paths and edge cases
- Runs the project's configured test command (`npm test`, `vitest run`, etc.)
- Reports pass/fail results back to the workflow engine

## 🐛 The Fixer

The Fixer resolves issues surfaced by the Reviewer or Tester. It:
- Reads the specific review feedback or test failure output
- Makes targeted fixes without rewriting unrelated code
- Re-triggers the Reviewer after each fix (up to `maxIterations`)

## ⚖️ The Judge

The Judge performs final QA validation. It:
- Cross-references the output with the original user request
- Checks that all Reviewer feedback has been addressed
- Decides whether to `PASS` the task or send it back for another iteration
- Only approves when the output fully satisfies the original requirements
