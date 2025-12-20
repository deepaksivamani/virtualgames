import React from 'react';
import { useRouter } from 'next/router';
import { Trophy, RefreshCcw } from 'lucide-react';

interface GameOverLeaderboardProps {
    players: any[];
    teams?: { red: number; blue: number };
    isHost: boolean;
    onRestart: () => void;
}

export default function GameOverLeaderboard({ players, teams, isHost, onRestart }: GameOverLeaderboardProps) {
    const router = useRouter();

    const teamScoresExist = teams && (teams.red > 0 || teams.blue > 0);
    const winningTeam = teams && (teams.red > teams.blue ? 'Red Team' : (teams.blue > teams.red ? 'Blue Team' : 'Draw!'));

    return (
        <div style={{ marginTop: '20px', textAlign: 'center', width: '100%', maxWidth: '450px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
                <div style={{ filter: 'drop-shadow(0 0 20px rgba(234, 179, 8, 0.4))' }}>
                    <Trophy size={80} color="#eab308" fill="#eab308" />
                </div>

                {teamScoresExist ? (
                    <>
                        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{winningTeam} Wins!</h1>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '10px', alignItems: 'center', justifyContent: 'center' }}>
                             <div style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                 <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#ef4444' }} />
                                 Red: {teams?.red}
                             </div>
                             <div style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                 <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#3b82f6' }} />
                                 Blue: {teams?.blue}
                             </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{players[0]?.name} Wins!</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Top of the charts!</p>
                    </>
                )}
            </div>

            <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '5px', marginBottom: '30px', maxHeight: '300px', overflowY: 'auto' }}>
                {players.map((p: any, i: number) => {
                    const isWinner = i === 0;
                    return (
                        <div key={p.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '16px',
                            borderRadius: '12px',
                            background: isWinner ? 'linear-gradient(90deg, rgba(234, 179, 8, 0.1), transparent)' : 'transparent',
                            marginBottom: '2px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{
                                    fontWeight: 'bold',
                                    width: '28px', height: '28px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    borderRadius: '50%',
                                    background: i === 0 ? '#fbbf24' : (i === 1 ? '#94a3b8' : (i === 2 ? '#b45309' : 'rgba(255,255,255,0.1)')),
                                    color: i < 3 ? 'black' : 'white',
                                    fontSize: '0.8rem'
                                }}>
                                    {i + 1}
                                </span>
                                <span style={{ fontSize: '1.1rem', fontWeight: isWinner ? 700 : 400 }}>{p.name}</span>
                            </div>
                            <span style={{ fontWeight: 'bold', color: isWinner ? '#fbbf24' : 'var(--text-muted)', fontSize: '1.1rem' }}>{p.score}</span>
                        </div>
                    );
                })}
            </div>

            {isHost ? (
                <button onClick={onRestart} className="btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.2rem', marginBottom: '10px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        Play Again <RefreshCcw size={20} />
                    </span>
                </button>
            ) : (
                <div className="badge" style={{ display: 'inline-block', padding: '10px 20px', fontSize: '1rem', marginBottom: '15px' }}>Waiting for host to restart...</div>
            )}
            <button
                onClick={() => router.push('/')}
                style={{
                    width: '100%',
                    padding: '15px',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-muted)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '1rem'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
                Exit to Lobby
            </button>
        </div>
    );
}
