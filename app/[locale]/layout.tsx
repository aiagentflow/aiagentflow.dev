import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getGitHubStats, getNpmVersion } from "@/lib/github";
import Script from "next/script";
import {
  languageAlternates,
  organizationJsonLd,
  projectDescription,
  siteName,
  siteUrl,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Agent Flow | Multi-Agent AI Workflow Orchestrator",
  description: projectDescription,
  keywords: [
    "ai agents", "multi-agent orchestration", "software development automation", "ai coding assistant",
    "local-first ai", "cli ai tool", "automated code review", "ai testing", "llm workflow", "open source ai agent",
    "ai engineer framework", "autonomous dev team", "ai pair programmer",
    "self hosting ai workflow", "aiagent flow", "ai task flow configuration", "automated ai engineering", "local ai orchestration"
  ],
  openGraph: {
    title: "AI Agent Flow | Your AI Engineering Team",
    description: projectDescription,
    url: siteUrl,
    siteName,
    images: [{ url: "https://aiagentflow.dev/opengraph-image", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Flow | Multi-Agent AI Workflow Orchestrator",
    description: projectDescription,
    images: ["https://aiagentflow.dev/opengraph-image"],
  },
  alternates: {
    canonical: "/",
    languages: languageAlternates("/"),
  },
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const [{ stars }, cliVersion] = await Promise.all([
    getGitHubStats(),
    getNpmVersion("@aiagentflow/cli"),
  ]);

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased min-h-screen`}
        style={{ background: "var(--ds-bg)", color: "var(--ds-fg)" }}
      >
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SDL9BLML9T" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SDL9BLML9T');
          `}
        </Script>
        <Script
          id="site-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationJsonLd(),
              websiteJsonLd(),
              softwareApplicationJsonLd(),
            ]),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Header version={cliVersion} stars={stars} />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
