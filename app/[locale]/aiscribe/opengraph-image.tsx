import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'AiScribe - Train LLM from the coding session. Open source journal for AI-powered developers.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #080c16 0%, #0d1117 50%, #080c16 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    padding: 80,
                }}
            >
                {/* Logo area */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
                    <div style={{
                        width: 100, height: 100, borderRadius: 24,
                        background: 'linear-gradient(135deg, #ff6354, #ff8a7a)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 48, fontWeight: 800, color: '#fff',
                        boxShadow: '0 20px 60px rgba(255,99,84,0.3)',
                    }}>
                        A
                    </div>
                </div>

                {/* Title */}
                <div style={{
                    fontSize: 64, fontWeight: 800, color: '#f0f6fc',
                    textAlign: 'center', letterSpacing: '-0.02em',
                    lineHeight: 1.1, marginBottom: 16,
                }}>
                    AiScribe
                </div>

                {/* Tagline */}
                <div style={{
                    fontSize: 30, fontWeight: 500, color: '#8b949e',
                    textAlign: 'center', maxWidth: '80%', marginBottom: 40,
                }}>
                    Your AI shipped 50 files yesterday. Can you explain any of them today?
                </div>

                {/* Bottom bar */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    fontSize: 22, color: '#484f58',
                }}>
                    <span>Open source</span>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff6354' }} />
                    <span>Local-first</span>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff6354' }} />
                    <span>CLI tool</span>
                </div>
            </div>
        ),
        { ...size }
    );
}
