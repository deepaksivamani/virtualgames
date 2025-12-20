import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import { Menu, X } from 'lucide-react';
import ChatBox from '../../../components/game/ChatBox';
import PlayerList from '../../../components/game/PlayerList';
import GameSettings from '../../../components/game/GameSettings';
import GameOverLeaderboard from '../../../components/game/GameOverLeaderboard';
import GameHeader from '../../../components/game/GameHeader';

let socket: any;

export default function RebusGameRoom() {
  const router = useRouter();
  const { roomCode, name } = router.query;
  const [room, setRoom] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [puzzle, setPuzzle] = useState<any>(null);
  const [maskedAnswer, setMaskedAnswer] = useState('');
  const [roundResult, setRoundResult] = useState<any>(null);
  const [gameOver, setGameOver] = useState<any>(null);
  const [duration, setDuration] = useState(5);
  const [puzzleDuration, setPuzzleDuration] = useState(30);
  const [hardcore, setHardcore] = useState(false);
  const [teamMode, setTeamMode] = useState(false);
  const [teamConfig, setTeamConfig] = useState<any>(null);
  const [puzzleTimeLeft, setPuzzleTimeLeft] = useState(0);
  const chatEndRef = useRef<any>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  useEffect(() => {
    if (!router.isReady) return;

    socket = io();

    socket.emit('join_room', { name, roomCode }, (response: any) => {
      if (response.success) {
        setRoom(response.room);
        if (response.room.maskedAnswer) setMaskedAnswer(response.room.maskedAnswer);
        if (response.room.timeLeft !== undefined) setTimeLeft(response.room.timeLeft);
        if (response.room.puzzleTimeLeft) setPuzzleTimeLeft(response.room.puzzleTimeLeft);
        if (response.room.puzzleTimeLimit) setPuzzleDuration(response.room.puzzleTimeLimit);
      } else {
        alert(response.error);
        router.push('/rebus');
      }
    });

    socket.on('update_room', (updatedRoom: any) => {
      setRoom(updatedRoom);
      if (updatedRoom.maskedAnswer) setMaskedAnswer(updatedRoom.maskedAnswer);
      if (updatedRoom.timeLeft !== undefined) setTimeLeft(updatedRoom.timeLeft);
    });

    socket.on('round_start', (data: any) => {
      setPuzzle(data.puzzle);
      setMaskedAnswer(data.maskedAnswer);
      setTimeLeft(data.timeLeft);
      setPuzzleTimeLeft(data.puzzleTime);
      setRoundResult(null);
      setGameOver(null);
      addLog('System', `Puzzle ${data.round} started!`, 'system');
    });

    socket.on('round_end', (data: any) => {
       if (data.reason === 'timeout') {
            addLog('System', `Time's Up! Answer: ${data.answer}`, 'error');
       } else {
            addLog('System', `Solved! Answer: ${data.answer}`, 'system');
       }
       setPuzzle(null);
       setRoundResult(data);
    });

    socket.on('player_guessed', ({ playerId, points }: any) => {
       // logic if needed
    });

    socket.on('correct_guess', ({ points }: any) => {
       addLog('Game', `Correct! You scored ${points} points!`, 'correct');
    });

    socket.on('chat_message', (msg: any) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on('game_over', (data: any) => {
        addLog('System', `Game Over! Winner: ${data.players[0].name}`, 'system');
        setRoundResult(null);
        setGameOver(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [router.isReady, name, roomCode]);

  // Global Timer
  useEffect(() => {
    if (timeLeft > 0 && room?.state === 'PLAYING') {
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }
  }, [timeLeft, room?.state]);

  // Puzzle Timer
  useEffect(() => {
    if (puzzleTimeLeft > 0 && room?.state === 'PLAYING' && puzzle) {
        const timer = setInterval(() => setPuzzleTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }
  }, [puzzleTimeLeft, room?.state, puzzle]);

  useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit('send_chat', { roomCode, message });
    setMessage('');
  };

  const startGame = () => {
    socket.emit('start_game', { roomCode, settings: { duration: Number(duration), puzzleTime: Number(puzzleDuration), hardcore, teamMode, teamConfig } });
  };

  const restartGame = () => {
      socket.emit('restart_game', { roomCode });
  };

  const addLog = (name: string, text: string, type = 'chat') => {
      setMessages(prev => [...prev, { id: Date.now(), playerName: name, text, type }]);
  };

  if (!room) return <div className="lobby-container">Loading...</div>;

  const isHost = room.players.find((p: any) => p.name === name)?.isHost;

  return (
    <div className="container">
      {/* Mobile Toggle */}
      <div className="mobile-toggle" onClick={() => setShowSidebar(!showSidebar)} style={{ zIndex: 101, background: 'rgba(0,0,0,0.5)', padding: '5px', borderRadius: '50%' }}>
         {showSidebar ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
      </div>

      {showSidebar && (
          <div className="overlay-backdrop" style={{ zIndex: 150 }} onClick={() => setShowSidebar(false)} />
      )}
      {/* GAME OVER MODAL */}
      {gameOver && (
          <div className="overlay-backdrop">
              <div className="overlay-card" style={{ maxWidth: '600px' }}>
                   <GameOverLeaderboard
                        players={gameOver.players}
                        teams={gameOver.teams}
                        isHost={isHost}
                        onRestart={restartGame}
                    />
              </div>
          </div>
      )}

      {/* OVERLAY MODAL */}
      {roundResult && !gameOver && (
        <div className="overlay-backdrop">
            <div className="overlay-card">
                <h2 style={{ color: 'var(--text-muted)' }}>Solved!</h2>
                <h1 style={{ fontSize: '3rem', margin: '20px 0', background: 'linear-gradient(to right, #22d3ee, #d946ef)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {roundResult.answer}
                </h1>

                <div className="countdown-ring">
                    Next Puzzle...
                </div>
            </div>
        </div>
      )}

      <GameHeader roomCode={room.code} timeLeft={timeLeft}>
           <div style={{ textAlign: 'right' }}>
                {room.state === 'LOBBY' && (
                    <span className="badge">Waiting for players ({room.players.length})</span>
                )}
                {room.state === 'PLAYING' && (
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <span>Puzzle #{room.currentRound}</span>
                    </div>
                )}
           </div>
      </GameHeader>

      <div className="game-layout">
        <div className={`glass-panel sidebar ${showSidebar ? 'open' : ''}`}>
          <h3>Players</h3>
          <PlayerList players={room.players} myId={socket?.id} />

           <GameSettings
                isHost={isHost}
                duration={duration}
                setDuration={setDuration}
                turnTime={puzzleDuration}
                setTurnTime={setPuzzleDuration}
                hardcore={hardcore}
                setHardcore={setHardcore}
                teamMode={teamMode}
                setTeamMode={setTeamMode}
                onStart={startGame}
                isPlaying={room.state !== 'LOBBY' && room.state !== 'ENDED'}
                players={room.players}
                gameType="rebus"
                setTeamConfig={setTeamConfig}
                teamConfig={teamConfig}
           />

           {!isHost && room.state === 'LOBBY' && (
               <div style={{ marginTop: 'auto', textAlign: 'center', opacity: 0.7 }}>
                   Waiting for host...
               </div>
           )}
        </div>

        <div className="glass-panel main-stage">
            {room.state === 'PLAYING' && puzzle ? (
                <>
                <div
                    className="rebus-card"
                    style={{
                        flexDirection: puzzle.type === 'text' ? 'column' : 'row',
                        gap: '20px'
                    }}
                >
                    {puzzle.type === 'text' && (
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{puzzle.content}</pre>
                    )}
                    {puzzle.type === 'icon' && (
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {puzzle.content.map((icon: string, idx: number) => (
                                <span key={idx} style={{ fontSize: '4rem' }}>{icon}</span>
                            ))}
                        </div>
                    )}
                    {puzzle.type === 'html' && (
                        <div dangerouslySetInnerHTML={{ __html: puzzle.content }} />
                    )}

                    {!puzzle.type && puzzle.puzzle}
                </div>

                {maskedAnswer && (
                    <div style={{
                        marginTop: '30px',
                        fontSize: '2.5rem',
                        letterSpacing: '8px',
                        fontFamily: 'monospace',
                        color: 'var(--accent)',
                        textShadow: '0 0 15px rgba(34, 211, 238, 0.4)',
                        fontWeight: 'bold'
                    }}>
                        {maskedAnswer}
                    </div>
                )}
                </>
            ) : (
                <div style={{ textAlign: 'center', fontSize: '1.5rem', opacity: 0.5 }}>
                    {room.state === 'ENDED' ? 'Game Over!' : 'Get Ready!'}
                </div>
            )}

            {room.state === 'PLAYING' && puzzle && (
                <div style={{ width: '100%', maxWidth: '400px', margin: '20px auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span>Time Limit</span>
                        <span style={{ color: puzzleTimeLeft < 10 ? 'var(--error)' : 'white' }}>{puzzleTimeLeft}s</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                            width: `${(puzzleTimeLeft / puzzleDuration) * 100}%`,
                            height: '100%',
                            background: puzzleTimeLeft < 10 ? 'var(--error)' : 'var(--accent)',
                            transition: 'width 1s linear'
                        }} />
                    </div>
                </div>
            )}

            {puzzle && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    Hint: {puzzle.hint}
                </div>
            )}
        </div>

        <ChatBox
             messages={messages}
             onSendMessage={(msg) => socket.emit('send_chat', { roomCode, message: msg })}
             className="chat-box"
        />
      </div>
    </div>
  );
}
