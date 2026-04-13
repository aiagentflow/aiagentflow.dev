"use client";

import { Link } from "@/i18n/navigation";
import { Logo } from "./Logo";
import { useTranslations } from "next-intl";

export function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="bg-slate-50 dark:bg-[#020617] border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
                            <Logo className="w-6 h-6 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                                AI Agent Flow
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm">
                            {t("description")}
                        </p>
                        <div className="flex items-center gap-4">
                            {/* GitHub */}
                            <a href="https://github.com/aiagentflow/aiagentflow" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="GitHub">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            {/* npm */}
                            <a href="https://www.npmjs.com/package/@aiagentflow/cli" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-red-500 transition-colors" aria-label="npm">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">{t("resources")}</h3>
                        <ul className="space-y-3">
                            <li><Link href="/blog" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors">{t("blog")}</Link></li>
                            <li><Link href="/docs/getting-started" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors">{t("docs")}</Link></li>
                            <li><Link href="/use-cases/aiagentflow-vs-langchain" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors">Alternatives</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">{t("legal")}</h3>
                        <ul className="space-y-3">
                            <li><Link href="/privacy" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors">{t("privacy")}</Link></li>
                            <li><Link href="/terms" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors">{t("terms")}</Link></li>
                            <li><a href="https://opensource.org/licenses/MIT" target="_blank" rel="noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors">{t("license")}</a></li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        &copy; {new Date().getFullYear()} {t("allRightsReserved")}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">

                    </div>
                </div>
            </div>
        </footer>
    );
}
