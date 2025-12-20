import React, { useState } from 'react';
import { Flame, Shield } from 'lucide-react';
import TeamSettingsModal from './TeamSettingsModal';

interface GameSettingsProps {
    isHost: boolean;
    duration: number;
    setDuration: (val: number) => void;
    turnTime: number;
    setTurnTime: (val: number) => void;
    hardcore: boolean;
    setHardcore: (val: boolean) => void;
    teamMode: boolean;
    setTeamMode: (val: boolean) => void;
    onStart: () => void;
    isPlaying?: boolean;
    players?: any[]; // For team selection
    gameType?: 'draw' | 'rebus'; // To show correct rules
    setTeamConfig?: (config: any) => void; // Store manual team config
    teamConfig?: any; // Persist config
}

export default function GameSettings({
    isHost, duration, setDuration, turnTime, setTurnTime,
    hardcore, setHardcore, teamMode, setTeamMode,
    onStart, isPlaying, players = [], gameType = 'draw', setTeamConfig, teamConfig
}: GameSettingsProps) {
    const [showTeamModal, setShowTeamModal] = useState(false);

    if (!isHost || isPlaying) return null;

    const handleTeamToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            // Opening modal to configure
            setShowTeamModal(true);
        } else {
            // Turning off
            setTeamMode(false);
            if (setTeamConfig) setTeamConfig(null);
        }
    };

    const handleTeamConfirm = (config: any) => {
        setTeamMode(true);
        if (setTeamConfig) setTeamConfig(config);
        setShowTeamModal(false);
    };

    return (
        <div style={{ marginTop: 'auto', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ marginBottom: '15px' }}>Game Settings</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '15px' }}>
                <label style={{ fontSize: '0.9rem', opacity: 0.8 }}>Game Duration (Minutes)</label>
                <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="input-field"
                    style={{ appearance: 'none', cursor: 'pointer' }}
                >
                    <option value={1}>1 Minute (Test)</option>
                    <option value={5}>5 Minutes</option>
                    <option value={10}>10 Minutes</option>
                    <option value={15}>15 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes</option>
                    <option value={60}>1 Hour (Marathon)</option>
                </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Turn Time (Seconds)</label>
                <select
                    value={turnTime}
                    onChange={(e) => setTurnTime(Number(e.target.value))}
                    className="input-field"
                    style={{ appearance: 'none', cursor: 'pointer' }}
                >
                    <option value={10}>10s (Blitz)</option>
                    <option value={30}>30s (Fast)</option>
                    <option value={45}>45s (Standard)</option>
                    <option value={60}>60s (Relaxed)</option>
                    <option value={90}>90s (Slow)</option>
                </select>
            </div>

            {/* NEW MODES */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Flame size={16} color="var(--error)" /> Hardcore Mode
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No hints, strict timers</span>
                    </div>
                    <input
                        type="checkbox"
                        checked={hardcore}
                        onChange={(e) => setHardcore(e.target.checked)}
                        style={{ width: '20px', height: '20px', accentColor: 'var(--error)', cursor: 'pointer' }}
                    />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Shield size={16} color="var(--accent)" /> Team Battle
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Red vs Blue (Beta)</span>
                    </div>
                    <input
                        type="checkbox"
                        checked={teamMode}
                        onChange={handleTeamToggle}
                        style={{ width: '20px', height: '20px', accentColor: 'var(--accent)', cursor: 'pointer' }}
                    />
                </label>
            </div>

            <button onClick={onStart} className="btn-primary" style={{ width: '100%' }}>Start Game</button>

            <TeamSettingsModal
                isOpen={showTeamModal}
                onClose={() => setShowTeamModal(false)}
                onConfirm={handleTeamConfirm}
                players={players}
                gameType={gameType}
                currentConfig={teamConfig}
            />
        </div>
    );
}
