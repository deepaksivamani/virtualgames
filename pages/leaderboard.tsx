import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LeaderboardPage() {
    const [entries, setEntries] = useState<any[]>([]);

    useEffect(() => {
        // Fetch data
        fetch('/api/leaderboard')
            .then(res => res.json())
            .then(data => setEntries(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container" style={{ padding: '40px', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <Link href="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ⬅ Back to Lobby
                </Link>
                <h1 style={{ fontSize: '3rem', margin: 0, textShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }}>🏆 Global Hall of Fame</h1>
                <div style={{ width: '100px' }} /> {/* Spacer */}
            </div>

            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', maxWidth: '1000px', margin: '0 auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'rgba(255,255,255,0.05)', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px' }}>
                        <tr>
                            <th style={{ padding: '20px', width: '80px' }}>Rank</th>
                            <th style={{ padding: '20px' }}>Player</th>
                            <th style={{ padding: '20px', textAlign: 'right' }}>Total Score</th>
                            <th style={{ padding: '20px', textAlign: 'center' }}>Wins</th>
                            <th style={{ padding: '20px', textAlign: 'center' }}>Losses</th>
                            <th style={{ padding: '20px', textAlign: 'center' }}>Win Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.length === 0 ? (
                            <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>No records found. Be the first to play!</td></tr>
                        ) : (
                            entries.map((entry, i) => {
                                const totalGames = entry.wins + entry.losses;
                                const winRate = totalGames > 0 ? Math.round((entry.wins / totalGames) * 100) : 0;

                                return (
                                    <tr key={entry.username} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i < 3 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                                        <td style={{ padding: '20px', fontWeight: 'bold', fontSize: i === 0 ? '1.5rem' : '1.2rem', textAlign: 'center' }}>
                                            {i === 0 ? '🥇' : (i === 1 ? '🥈' : (i === 2 ? '🥉' : `#${i+1}`))}
                                        </td>
                                        <td style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <img src={entry.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.username}`} style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }} />
                                            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{entry.username}</span>
                                        </td>
                                        <td style={{ padding: '20px', color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'right' }}>
                                            {entry.totalScore.toLocaleString()}
                                        </td>
                                        <td style={{ padding: '20px', textAlign: 'center', color: '#4ade80' }}>
                                            {entry.wins}
                                        </td>
                                        <td style={{ padding: '20px', textAlign: 'center', color: '#f87171' }}>
                                            {entry.losses}
                                        </td>
                                        <td style={{ padding: '20px', textAlign: 'center', opacity: 0.8 }}>
                                            {winRate}%
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
