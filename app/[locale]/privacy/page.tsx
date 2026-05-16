import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { canonicalPath, languageAlternates, siteName, siteUrl } from '@/lib/seo';

interface PrivacyPolicyProps {
    params: { locale: string };
}

export async function generateMetadata({ params }: PrivacyPolicyProps): Promise<Metadata> {
    const path = '/privacy';

    return {
        metadataBase: new URL(siteUrl),
        title: `Privacy | ${siteName}`,
        description: 'Privacy policy for the AI Agent Flow website and local-first CLI.',
        alternates: {
            canonical: canonicalPath(params.locale, path),
            languages: languageAlternates(path),
        },
    };
}

export default function PrivacyPolicy() {
    const t = useTranslations('Footer');

    return (
        <div className="min-h-screen bg-brand-bg text-white py-24 px-6 md:px-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[50%] h-[300px] bg-brand-primary/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{t('privacy')}</h1>
                    <p className="text-slate-400 text-lg">
                        Last Updated: February 28, 2026
                    </p>
                </header>

                <div className="prose prose-invert prose-slate max-w-none">
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-white border-b border-white/10 pb-2">1. Local-First Architecture</h2>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            AI Agent Flow is designed with a <strong>local-first</strong> philosophy. When you use our CLI tool:
                        </p>
                        <ul className="list-disc list-inside text-slate-400 space-y-2 ml-4">
                            <li>Your source code never leaves your machine unless you explicitly configure a cloud provider.</li>
                            <li>Orchestration logic happens locally on your hardware.</li>
                            <li>We do not have access to your internal repositories, file systems, or proprietary logic.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-white border-b border-white/10 pb-2">2. Data Collection (Website)</h2>
                        <p className="text-slate-400 leading-relaxed mb-4">
                            This website (aiagentflow.dev) collects minimal data to improve our promotional efforts:
                        </p>
                        <ul className="list-disc list-inside text-slate-400 space-y-2 ml-4">
                            <li><strong>Analytics:</strong> We use aggregated, anonymized metrics to understand page traffic.</li>
                            <li><strong>Preferences:</strong> We store your theme (dark/light) and language selection in local storage.</li>
                            <li><strong>Visitor Counter:</strong> A simple counter tracks unique visits without storing personal identifiers.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-white border-b border-white/10 pb-2">3. CLI Telemetry</h2>
                        <p className="text-slate-400 leading-relaxed">
                            The AI Agent Flow CLI does <strong>not</strong> include hidden telemetry or tracking. We believe in transparency.
                            Any future opt-in telemetry for bug reporting will be clearly documented and disabled by default.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-white border-b border-white/10 pb-2">4. Third-Party AI Providers</h2>
                        <p className="text-slate-400 leading-relaxed">
                            When you configure the CLI to use providers like Anthropic (Claude) or OpenAI, your prompts are sent to those respective services.
                            We recommend reviewing the privacy policies of any AI provider you choose to integrate.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-white border-b border-white/10 pb-2">5. Data Security</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Since most of your data stays on your machine, you are responsible for its security.
                            We encourage practicing standard security measures like disk encryption and secure environment variable management for API keys.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4 text-white border-b border-white/10 pb-2">6. Contact</h2>
                        <p className="text-slate-400 leading-relaxed">
                            For privacy concerns or questions about our local-first implementation, please open an issue on our
                            <a href="https://github.com/aiagentflow/aiagentflow" className="text-brand-secondary hover:underline ml-1">GitHub repository</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
