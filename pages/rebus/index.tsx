import { useState } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

export default function RebusLobby() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [product, setProduct] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');

  const createRoom = async () => {
    if (!name.trim()) return setError('Please enter your name');
    const socket = io();
    socket.emit('create_room', { name, gameType: 'rebus', company, product }, (response: any) => {
      if (response.success) {
        router.push(`/rebus/room/${response.roomCode}?name=${encodeURIComponent(name)}`);
      }
    });
  };

  const joinRoom = async () => {
    if (!name.trim()) return setError('Please enter your name');
    if (!roomCode.trim()) return setError('Please enter a room code');

    router.push(`/rebus/room/${roomCode}?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="lobby-container">
      <div className="glass-panel" style={{ padding: '3rem', maxWidth: '500px', width: '90%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #ec4899, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Word Guess Game
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Decipher the visual riddles using brainpower!
        </p>

        {error && <div style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Metadata for Room Creation */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input
                type="text"
                placeholder="Company"
                className="input-field"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
               <input
                type="text"
                placeholder="Product"
                className="input-field"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
          </div>
          <input
            type="text"
            placeholder="Your Nickname"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
             <button onClick={createRoom} className="btn-primary" style={{ height: '50px' }}>
               Create Room
             </button>
             <div style={{ position: 'relative' }}>
               <input
                 type="text"
                 placeholder="Room Code"
                 className="input-field"
                 style={{ height: '50px', paddingRight: '5px' }}
                 value={roomCode}
                 onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
               />
               <button
                 onClick={joinRoom}
                 style={{
                   position: 'absolute',
                   right: '5px',
                   top: '5px',
                   bottom: '5px',
                   border: 'none',
                   background: 'rgba(255,255,255,0.1)',
                   color: 'white',
                   borderRadius: '4px',
                   cursor: 'pointer',
                   padding: '0 10px'
                 }}>
                 Join
               </button>
             </div>
          </div>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
             <button onClick={() => router.push('/')} className="btn-secondary" style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>
                ← Back to Game Lobby
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
