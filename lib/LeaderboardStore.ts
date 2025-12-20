import { getDB } from '../database/db';
import { v4 as uuidv4 } from 'uuid';

export interface GameResultPlayer {
    name: string;
    score: number;
    isWinner: boolean;
}

class LeaderboardStore {

    public async recordGameResult(players: GameResultPlayer[], gameType: string): Promise<void> {
        try {
            const db = await getDB();

            for (const p of players) {
                // Find or Create User
                let user = await db.get('SELECT id FROM users WHERE username = ?', p.name);

                if (!user) {
                    const newId = uuidv4();
                    await db.run('INSERT INTO users (id, username, totalScore, wins, losses) VALUES (?, ?, ?, ?, ?)',
                        [newId, p.name, p.score, p.isWinner ? 1 : 0, p.isWinner ? 0 : 1]);
                    user = { id: newId };
                } else {
                    await db.run(
                        `UPDATE users SET
                            totalScore = totalScore + ?,
                            wins = wins + ?,
                            losses = losses + ?
                        WHERE id = ?`,
                        [p.score, p.isWinner ? 1 : 0, p.isWinner ? 0 : 1, user.id]
                    );
                }

                // Add to Leaderboard (History) if score > 0
                if (p.score > 0) {
                     await db.run('INSERT INTO leaderboard (id, userId, score, lastUpdated) VALUES (?, ?, ?, ?)',
                        [uuidv4(), user.id, p.score, new Date().toISOString()]);
                }
            }

        } catch (e) {
            console.error("Error saving game results to DB:", e);
        }
    }

    public async getTopPlayers(limit: number = 10): Promise<any[]> {
        const db = await getDB();
        return await db.all('SELECT username, avatar, totalScore, wins, losses FROM users ORDER BY totalScore DESC LIMIT ?', limit);
    }
}

export default new LeaderboardStore();
