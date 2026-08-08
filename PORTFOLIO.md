# AI Agent Flow — Marketing Website

**Live site:** https://aiagentflow.dev
**Role:** Solo developer — design, frontend build, content, SEO, i18n
**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, next-intl

A production marketing site for AI Agent Flow, an open-source CLI that orchestrates
multi-agent AI workflows for software development (architect, coder, reviewer,
security, tester, and judge agents working in a closed loop). Built end-to-end:
information architecture, custom design system, animated components, docs engine,
programmatic SEO, and internationalization.

## What's in the build

- **Custom design system** — no UI library. Hand-built components (Hero, Pipeline,
  TerminalAnimation, InteractiveDemo, Comparison, Testimonials) styled with CSS
  variables for light/dark theming and Framer Motion for scroll-triggered animation.
- **Docs engine** — Markdown-driven documentation (`/docs/[slug]`) with a table of
  contents, sidebar navigation, syntax-highlighted code blocks, and callout components,
  rendered via `react-markdown` + `remark-gfm` + `rehype` plugins.
- **Programmatic SEO** — a `content/pseo` collection driving comparison landing pages
  (e.g. "AI Agent Flow vs LangChain", "Devin alternative", "Cursor alternative") from
  structured Markdown + frontmatter, each with its own metadata and OG image.
- **Blog** — full Markdown blog (`/blog/[slug]`) with `gray-matter` frontmatter parsing,
  auto-generated slugs, and RSS-friendly structure.
- **Internationalization** — `next-intl` with locale-prefixed routing (`en`, `es`, `bn`),
  translated navigation and page copy, and locale-aware middleware.
- **Technical SEO** — dynamic `sitemap.ts`, `robots.ts`, an `llms.txt` route for AI
  crawler discoverability, and per-page OpenGraph image generation via
  `next/og`.
- **Performance-first** — App Router with server components by default, self-hosted
  variable fonts (Geist), no client-side bloat from third-party UI kits.

## Why it matters as a portfolio piece

This isn't a template. It shows I can take a product with zero existing brand
assets and ship:
1. A distinctive visual identity (not another shadcn/ui clone)
2. A content system non-technical stakeholders could extend (Markdown + frontmatter)
3. SEO infrastructure that actually drives organic traffic (pSEO, sitemaps, structured OG)
4. Multi-language support wired through routing, not just translated strings
5. Clean, typed, componentized code — the kind that's easy to hand off

## Links

- Live site: https://aiagentflow.dev
- Source (this repo): landing page / marketing site
- Related project: [AI Agent Flow CLI](https://github.com/aiagentflow/aiagentflow) — the open-source tool this site promotes
