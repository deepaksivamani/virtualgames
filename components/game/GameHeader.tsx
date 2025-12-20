import React from 'react';
import { useRouter } from 'next/router';
import { Home, Link as LinkIcon, Clock } from 'lucide-react';

interface GameHeaderProps {
    roomCode: string;
    timeLeft: number; // Global time in seconds
    children?: React.ReactNode; // For optional right-side content (Round status)
}

export default function GameHeader({ roomCode, timeLeft, children }: GameHeaderProps) {
    const router = useRouter();

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="glass-panel" style={{ padding: '10px 15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', position: 'relative', zIndex: 50 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button
                    onClick={() => router.push('/')}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'var(--text)',
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    title="Back to Lobby"
                >
                    <Home size={20} />
                </button>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'Space Grotesk', fontWeight: 700 }}>Room: <span style={{ letterSpacing: '1px' }}>{roomCode}</span></h2>
                        <button
                            onClick={() => {
                                // Strip query params (like ?name=Host) to ensure new user sees the join screen
                                const url = `${window.location.origin}${window.location.pathname}`;
                                navigator.clipboard.writeText(url);
                                alert('Link Copied! Share it with others to join.');
                            }}
                            className="btn-primary"
                            style={{
                                fontSize: '0.75rem',
                                padding: '6px 12px',
                                background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                                border: 'none',
                                borderRadius: '50px',
                                boxShadow: '0 2px 10px rgba(139, 92, 246, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                cursor: 'pointer'
                            }}
                        >
                            <LinkIcon size={14} /> Invite
                        </button>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} />
                        <span>{formatTime(timeLeft)}</span>
                    </div>
                </div>
            </div>

            {/* Right Side: Game Specific Status */}
            <div style={{ textAlign: 'right', paddingLeft: '20px', borderLeft: '1px solid var(--border)' }}>
                {children}
            </div>
        </div>
    );
}
