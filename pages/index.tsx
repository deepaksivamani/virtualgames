import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Sun, Moon, Brain, Palette, Trophy, User } from 'lucide-react';
import { useRouter } from 'next/router';

const AVATARS = [
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Zack',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Trouble',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Bailey',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Spooky',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Ginger'
];

export default function GameCenter() {
  const [theme, setTheme] = useState('dark');
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
      const storedTheme = localStorage.getItem('theme');
      if(storedTheme === 'light') {
          setTheme('light');
          document.body.classList.add('light-mode');
      }

      // Check LocalStorage for user
      const savedUser = localStorage.getItem('virtualgames_user');
      if (savedUser) {
          const u = JSON.parse(savedUser);
          setUsername(u.username);
          setSelectedAvatar(u.avatar);
          if (u.username) setIsLoggedIn(true);
      }
  }, []);

  const toggleTheme = () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      if(newTheme === 'light') document.body.classList.add('light-mode');
      else document.body.classList.remove('light-mode');
  };

  const handleLogin = async () => {
      if (!username.trim()) return;

      // Register/Login via API
      try {
          const res = await fetch('/api/user', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, avatar: selectedAvatar })
          });

          if (res.ok) {
              const u = await res.json();
              localStorage.setItem('virtualgames_user', JSON.stringify({ username: u.username, avatar: u.avatar }));
              setIsLoggedIn(true);
          }
      } catch (e) {
          console.error("Login failed", e);
      }
  };

  if (!isLoggedIn) {
      return (
        <div className="lobby-container center-content" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>VirtualGames</h1>
                <p style={{ marginBottom: '30px', opacity: 0.7 }}>Enter your name to join the action!</p>

                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '10px' }}>Choose Avatar</label>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {AVATARS.map(url => (
                            <img
                                key={url}
                                src={url}
                                alt="avatar"
                                onClick={() => setSelectedAvatar(url)}
                                style={{
                                    width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer',
                                    border: selectedAvatar === url ? '3px solid var(--accent)' : '3px solid transparent',
                                    transition: 'all 0.2s'
                                }}
                            />
                        ))}
                    </div>
                </div>

                <input
                    className="input-field"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ fontSize: '1.2rem', padding: '15px', textAlign: 'center', marginBottom: '20px', width: '100%' }}
                />

                <button className="btn-primary" style={{ width: '100%', fontSize: '1.2rem' }} onClick={handleLogin}>
                    Enter Lobby
                </button>
            </div>

            <button onClick={toggleTheme} style={{ position: 'fixed', top: 20, right: 20, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-color)' }}>
                {theme === 'dark' ? <Sun /> : <Moon />}
            </button>
        </div>
      );
  }

  return (
    <div className="lobby-container" style={{ position: 'relative' }}>

      {/* Header */}
      <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: '1rem', alignItems: 'center', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.2)', padding: '5px 15px', borderRadius: '30px' }}>
            <img src={selectedAvatar} style={{ width: 30, height: 30, borderRadius: '50%' }} />
            <span style={{ fontWeight: 'bold' }}>{username}</span>
        </div>
        <button
            onClick={toggleTheme}
            style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '50%',
                width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer'
            }}
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <h1 className="lobby-title">
        VirtualGames Lobby
      </h1>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>

        <Link href={`/rebus?username=${encodeURIComponent(username)}`} style={{ textDecoration: 'none' }}>
            <div className="glass-panel game-card">
                <div className="card-icon" style={{
                    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                }}>
                    <Brain size={80} color="white" strokeWidth={1.5} />
                </div>
                <h2>Word Guess</h2>
                <p style={{ color: 'var(--text-muted)' }}>
                    Solve visual riddles against time!
                </p>
                <div className="btn-primary" style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Play Now
                </div>
            </div>
        </Link>

        {/* DRAW & GUESS CARD */}
        <Link href={`/draw?username=${encodeURIComponent(username)}`} style={{ textDecoration: 'none' }}>
            <div className="glass-panel game-card">
                <div className="card-icon" style={{
                    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                }}>
                    <Palette size={80} color="white" strokeWidth={1.5} />
                </div>
                <h2>Draw & Guess</h2>
                <p style={{ color: 'var(--text-muted)' }}>
                    Sketch your way to victory.
                </p>
                 <div className="btn-primary" style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Play Now
                </div>
            </div>
        </Link>

        {/* LEADERBOARD CARD */}
        <Link href="/leaderboard" style={{ textDecoration: 'none' }}>
            <div className="glass-panel game-card">
                <div style={{
                    height: '150px',
                    background: 'linear-gradient(135deg, #fbbf24, #d97706)',
                    borderRadius: '12px',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Trophy size={80} color="white" strokeWidth={1.5} />
                </div>
                <h2>Global Rankings</h2>
                <p style={{ color: 'var(--text-muted)' }}>
                    See the top champions!
                </p>
                 <div className="btn-primary" style={{ marginTop: '1rem', textAlign: 'center', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: 'none' }}>
                    View Stats
                </div>
            </div>
        </Link>
      </div>

      <style jsx>{`
        .game-card {
            width: 300px;
            padding: 24px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .game-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            border-color: rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.07);
        }
        .card-icon {
            height: 160px;
            border-radius: 20px;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
            transition: transform 0.4s ease;
        }
        .game-card:hover .card-icon {
            transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
