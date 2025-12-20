import express from 'express';
import { createServer } from 'http';
import next from 'next';
import { Server } from 'socket.io';
import GameManager from './lib/GameManager';
import { initDB } from './database/init';
import { getDB } from './database/db';
import { v4 as uuidv4 } from 'uuid';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
    // 1. Initialize Database
    try {
        await initDB();
    } catch (e) {
        console.error("Database init failed:", e);
    }

    const server = express();
    const httpServer = createServer(server);
    const io = new Server(httpServer);
    const gameManager = new GameManager(io);

    server.use(express.json());

    // 2. API Routes

    server.get('/api/health', (req, res) => {
        res.json({ status: 'active', platform: 'VirtualGames' });
    });

    server.get('/api/leaderboard', async (req, res) => {
        try {
            const db = await getDB();
            const rows = await db.all('SELECT username, avatar, totalScore, wins, losses FROM users ORDER BY totalScore DESC LIMIT 20');
            res.json(rows);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Failed to fetch leaderboard' });
        }
    });

    server.post('/api/user', async (req, res) => {
        const { username, avatar } = req.body;
        if (!username) return res.status(400).json({ error: 'Username required' });

        try {
            const db = await getDB();
            let user = await db.get('SELECT * FROM users WHERE username = ?', username);

            if (!user) {
                const id = uuidv4();
                // Default avatar if none provided
                const userAvatar = avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
                await db.run('INSERT INTO users (id, username, avatar) VALUES (?, ?, ?)',
                    [id, username, userAvatar]);
                user = { id, username, avatar: userAvatar, wins: 0, losses: 0, totalScore: 0 };
            } else if (avatar && user.avatar !== avatar) {
                await db.run('UPDATE users SET avatar = ? WHERE id = ?', [avatar, user.id]);
                user.avatar = avatar;
            }
            res.json(user);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Database error' });
        }
    });

    // 3. Game Sockets
    io.on('connection', (socket) => {

        socket.on('create_room', ({ name, gameType, company, product }, callback) => {
            // "VirtualGames" default gameType logic
            const type = gameType || 'rebus'; // Default to first game
            const roomCode = gameManager.createRoom(name, socket.id, type, { company, product });
            socket.join(roomCode);
            if (callback) callback({ success: true, roomCode });
        });

        socket.on('join_room', ({ name, roomCode }, callback) => {
            const room = gameManager.addPlayer(roomCode, name, socket.id);
            if (room) {
                socket.join(roomCode);
                if (callback) callback({ success: true, room });
            } else {
                if (callback) callback({ success: false, error: 'Room not found' });
            }
        });

        socket.on('start_game', ({ roomCode, settings }) => {
            gameManager.startGame(roomCode, settings);
        });

        socket.on('restart_game', ({ roomCode }) => {
            gameManager.resetGame(roomCode);
        });

        socket.on('submit_guess', ({ roomCode, guess }) => {
            gameManager.handleGuess(roomCode, socket.id, guess);
        });

        socket.on('send_chat', ({ roomCode, message }) => {
            gameManager.handleGuess(roomCode, socket.id, message);
        });

        // Draw Game
        socket.on('select_word', ({ roomCode, word }) => {
            gameManager.selectWord(roomCode, socket.id, word);
        });

        socket.on('draw_stroke', ({ roomCode, data }) => {
            gameManager.handleDrawStroke(roomCode, socket.id, data);
        });

        socket.on('disconnect', () => {
            gameManager.removePlayer(socket.id);
        });
    });

    // 4. Next.js Request Handler (Must be last)
    server.all('*all', (req, res) => {
        return handle(req, res);
    });

    const port = parseInt(process.env.PORT || '3000', 10);
    httpServer.listen(port, () => {
        console.log(`> VirtualGames Server Ready on http://localhost:${port}`);
    });
});
