"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";

function BrandGlyph({ size = 26 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <defs>
                <linearGradient id="bg-glyph" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="var(--accent-hi)" />
                    <stop offset="1" stopColor="var(--accent-lo)" />
                </linearGradient>
            </defs>
            <rect x="0.5" y="0.5" width="25" height="25" rx="6" stroke="url(#bg-glyph)" strokeWidth="1" />
            <circle cx="7" cy="7" r="2" fill="var(--accent)" />
            <circle cx="19" cy="7" r="2" fill="var(--accent)" />
            <circle cx="7" cy="19" r="2" fill="var(--accent)" />
            <circle cx="19" cy="19" r="2" fill="var(--accent)" />
            <path d="M7 7 L19 7 L7 19 L19 19" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85" />
            <path d="M7 7 L19 19" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </svg>
    );
}

export function Header({ version = "v1.0.2" }: { version?: string }) {
    const t = useTranslations("Header");
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { id: "docs", label: t("docs"), href: "https://www.npmjs.com/package/@aiagentflow/cli", external: true },
        { id: "comparisons", label: t("comparisons"), href: "/use-cases/aiagentflow-vs-langchain" },
        { id: "blog", label: t("blog"), href: "/blog" },
        { id: "github", label: t("github"), href: "https://github.com/aiagentflow/aiagentflow", external: true },
    ];

    const isActive = (href: string) => {
        if (href === "/blog") return pathname.startsWith("/blog");
        if (href.startsWith("/use-cases")) return pathname.startsWith("/use-cases");
        if (href.includes("github.com/aiagentflow") && pathname.startsWith("/docs")) return true;
        return false;
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                backdropFilter: "blur(16px) saturate(140%)",
                WebkitBackdropFilter: "blur(16px) saturate(140%)",
                background: scrolled
                    ? "color-mix(in oklab, var(--ds-bg), transparent 20%)"
                    : "transparent",
                borderBottom: `1px solid ${scrolled ? "var(--ds-line)" : "transparent"}`,
                transition: "background 0.3s ease, border-color 0.3s ease",
            }}
        >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between gap-4 sm:gap-6">

                {/* Mobile menu toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 -ml-2"
                    style={{ color: "var(--ds-fg-2)" }}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Brand — centered on mobile, left on desktop */}
                <div className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
                        <BrandGlyph size={26} />
                        <span
                            className="hidden sm:block font-semibold text-[13px] tracking-[-0.01em]"
                            style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace", color: "var(--ds-fg)" }}
                        >
                            aiagentflow
                        </span>
                        <span
                            className="hidden sm:inline-flex"
                            style={{
                                fontSize: 11, color: "var(--ds-fg-3)", padding: "2px 6px",
                                border: "1px solid var(--ds-line)", borderRadius: 4, fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                            }}
                        >
                            {version}
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            item.external ? (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[13px] px-[10px] py-[6px] rounded-md transition-colors duration-150"
                                    style={{ color: "var(--ds-fg-2)" }}
                                    onMouseEnter={e => (e.currentTarget.style.color = "var(--ds-fg)")}
                                    onMouseLeave={e => (e.currentTarget.style.color = "var(--ds-fg-2)")}
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className="text-[13px] px-[10px] py-[6px] rounded-md transition-colors duration-150"
                                    style={{
                                        color: isActive(item.href) ? "var(--ds-fg)" : "var(--ds-fg-2)",
                                        background: isActive(item.href) ? "var(--ds-bg-2)" : "transparent",
                                    }}
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </nav>
                </div>

                {/* Right: star + theme + CTA */}
                <div className="flex items-center gap-2">
                    <a
                        href="https://github.com/aiagentflow/aiagentflow"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-[6px] text-[12px] px-[10px] py-[6px] rounded-md border transition-colors duration-150"
                        style={{
                            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                            border: "1px solid var(--ds-line)",
                            color: "var(--ds-fg-1)",
                        }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--ds-line-hi)")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "var(--ds-line)")}
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M6 1 L7.4 4.2 L11 4.6 L8.3 7 L9.1 10.6 L6 8.8 L2.9 10.6 L3.7 7 L1 4.6 L4.6 4.2 Z" />
                        </svg>
                        38
                    </a>
                    <ThemeToggle />
                    <a
                        href="#install"
                        className="hidden sm:inline-flex items-center gap-2 px-[14px] py-[7px] rounded-lg text-[13px] font-medium text-white transition-all duration-150 hover:-translate-y-px"
                        style={{
                            background: "var(--accent)",
                            border: "1px solid var(--accent)",
                            boxShadow: "0 0 0 1px rgba(255,255,255,.08) inset, 0 4px 16px var(--accent-glow)",
                        }}
                    >
                        Install
                        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5 L8 5 M5 2 L8 5 L5 8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </a>
                </div>
            </div>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden border-b"
                        style={{ background: "var(--ds-bg-1)", borderColor: "var(--ds-line)" }}
                    >
                        <nav className="flex flex-col px-6 py-5 gap-1">
                            {navItems.map((item) => (
                                item.external ? (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-base font-medium px-3 py-2 rounded-md transition-colors"
                                        style={{ color: "var(--ds-fg-1)" }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                ) : (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className="text-base font-medium px-3 py-2 rounded-md transition-colors"
                                        style={{ color: isActive(item.href) ? "var(--accent)" : "var(--ds-fg-1)" }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            ))}
                            <a
                                href="#install"
                                className="mt-3 px-4 py-3 rounded-lg text-center text-sm font-semibold text-white"
                                style={{ background: "var(--accent)" }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Install
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
