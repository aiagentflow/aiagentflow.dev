"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

const providers = [
    { name: "OpenAI", models: "GPT-4o, GPT-4 Turbo", color: "from-emerald-400 to-teal-500" },
    { name: "Anthropic", models: "Claude 3.5 Sonnet, Opus", color: "from-amber-400 to-orange-500" },
    { name: "Google", models: "Gemini 1.5 Pro, Flash", color: "from-blue-400 to-indigo-500" },
    { name: "Ollama (Local)", models: "Llama 3, Mistral", color: "from-slate-400 to-slate-600" },
];

export function InstallGuide() {
    const t = useTranslations("Install");
    const [copied, setCopied] = useState(false);

    const npmCommand = "npm install @aiagentflow/cli";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(npmCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="install" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#030014] transition-colors duration-500 border-t border-slate-200 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Install Instructions */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center space-x-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6 tracking-wide"
                        >
                            {t("badge")}
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight"
                        >
                            {t("headlinePrefix")}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                                {t("headlineSuffix")}
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg text-slate-600 dark:text-slate-400 mb-8"
                        >
                            {t("description")}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="relative group min-w-0 w-full"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative flex items-center justify-between bg-white dark:bg-[#09090b] border border-slate-200 dark:border-white/10 rounded-xl p-3 sm:p-4 overflow-hidden w-full">
                                <div className="overflow-x-auto flex-1 font-mono text-slate-800 dark:text-slate-300 py-1 no-scrollbar text-sm md:text-base">
                                    <span className="text-brand-primary select-none">$ </span>
                                    <span className="whitespace-nowrap">{npmCommand}</span>
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className="ml-2 sm:ml-4 p-2 shrink-0 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 dark:focus:ring-offset-[#09090b]"
                                    aria-label="Copy command"
                                >
                                    {copied ? (
                                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-4 flex items-center gap-2"
                        >
                            <a
                                href="https://www.npmjs.com/package/@aiagentflow/cli"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors"
                            >
                                <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
                                </svg>
                                View on npm
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column: Model Providers Grid */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid sm:grid-cols-2 gap-4"
                    >
                        {providers.map((provider, index) => (
                            <motion.div
                                key={provider.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 * index }}
                                className="bg-white dark:bg-[#09090b] border border-slate-200 dark:border-white/5 rounded-2xl p-6 hover:border-brand-primary/30 transition-colors group"
                            >
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${provider.color} p-[1px] mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}>
                                    <div className="w-full h-full bg-white dark:bg-[#09090b] rounded-[7px] flex items-center justify-center">
                                        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${provider.color}`} />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                                    {provider.name}
                                </h3>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                    {provider.models}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
