"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Providers() {
    const t = useTranslations("Providers");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section id="providers" className="py-24 relative overflow-hidden bg-white dark:bg-transparent">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
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
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
                    >
                        {t("headline")}
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                >
                    {/* Anthropic Card */}
                    <motion.div
                        variants={cardVariants}
                        className="relative group p-8 rounded-[2.5rem] bg-slate-50 dark:bg-[#030014] border border-slate-200 dark:border-white/10 hover:border-brand-primary/30 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center mb-6 border border-slate-200 dark:border-white/5 shadow-sm">
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-400 to-orange-600">A</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t("anthropic.title")}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{t("anthropic.description")}</p>
                        </div>
                    </motion.div>

                    {/* OpenAI Card */}
                    <motion.div
                        variants={cardVariants}
                        className="relative group p-8 rounded-[2.5rem] bg-slate-50 dark:bg-[#030014] border border-slate-200 dark:border-white/10 hover:border-emerald-500/30 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center mb-6 border border-slate-200 dark:border-white/5 shadow-sm">
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-emerald-400 to-emerald-600">O</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t("openai.title")}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{t("openai.description")}</p>
                        </div>
                    </motion.div>

                    {/* Google Gemini Card */}
                    <motion.div
                        variants={cardVariants}
                        className="relative group p-8 rounded-[2.5rem] bg-slate-50 dark:bg-[#030014] border border-slate-200 dark:border-white/10 hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center mb-6 border border-slate-200 dark:border-white/5 shadow-sm">
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-fuchsia-500">G</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t("gemini.title")}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{t("gemini.description")}</p>
                        </div>
                    </motion.div>

                    {/* Groq Card */}
                    <motion.div
                        variants={cardVariants}
                        className="relative group p-8 rounded-[2.5rem] bg-slate-50 dark:bg-[#030014] border border-slate-200 dark:border-white/10 hover:border-red-500/30 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center mb-6 border border-slate-200 dark:border-white/5 shadow-sm">
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-red-400 to-orange-500">G</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t("groq.title")}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{t("groq.description")}</p>
                        </div>
                    </motion.div>

                    {/* OpenRouter Card */}
                    <motion.div
                        variants={cardVariants}
                        className="relative group p-8 rounded-[2.5rem] bg-slate-50 dark:bg-[#030014] border border-slate-200 dark:border-white/10 hover:border-sky-500/30 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center mb-6 border border-slate-200 dark:border-white/5 shadow-sm">
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-sky-400 to-blue-500">R</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t("openrouter.title")}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{t("openrouter.description")}</p>
                        </div>
                    </motion.div>

                    {/* Ollama Card */}
                    <motion.div
                        variants={cardVariants}
                        className="relative group p-8 rounded-[2.5rem] bg-slate-50 dark:bg-[#030014] border border-slate-200 dark:border-white/10 hover:border-brand-secondary/30 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center mb-6 border border-slate-200 dark:border-white/5 shadow-sm">
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-cyan-400">O</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{t("ollama.title")}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{t("ollama.description")}</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
