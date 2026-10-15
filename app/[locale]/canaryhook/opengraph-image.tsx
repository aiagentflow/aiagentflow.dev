import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'canaryhook - honeyfiles and canary tokens for AI coding agents';
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
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
                    <div style={{
                        width: 96, height: 96, borderRadius: 24,
                        background: 'linear-gradient(135deg, #ffd966, #e0a81f)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 52, fontWeight: 800, color: '#0d1117',
                        boxShadow: '0 20px 60px rgba(242,199,68,0.25)',
                    }}>
                        C
                    </div>
                </div>

                <div style={{
                    fontSize: 62, fontWeight: 800, color: '#f0f6fc',
                    textAlign: 'center', letterSpacing: '-0.02em',
                    lineHeight: 1.1, marginBottom: 14,
                }}>
                    canaryhook
                </div>

                <div style={{
                    fontSize: 28, color: '#8b949e', textAlign: 'center',
                    maxWidth: 820, lineHeight: 1.4, marginBottom: 36,
                }}>
                    Plant decoy credentials your AI agents should never touch. Catch the call that reads one.
                </div>

                <div style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '14px 28px', borderRadius: 14,
                    background: 'rgba(242,199,68,0.1)',
                    border: '1px solid rgba(242,199,68,0.3)',
                    fontSize: 24, color: '#ffd966',
                    fontFamily: 'monospace',
                }}>
                    npm install -g canaryhook
                </div>

                <div style={{ display: 'flex', gap: 24, marginTop: 36, fontSize: 20, color: '#484f58' }}>
                    <span>No model</span>
                    <span>·</span>
                    <span>No signatures</span>
                    <span>·</span>
                    <span>Fails open</span>
                    <span>·</span>
                    <span>MIT</span>
                </div>
            </div>
        ),
        { ...size }
    );
}
