import { getDB } from './db';

export async function initDB() {
    const db = await getDB();

    console.log('Validating database schema...');

    // USERS Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            avatar TEXT,
            wins INTEGER DEFAULT 0,
            losses INTEGER DEFAULT 0,
            totalScore INTEGER DEFAULT 0,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // LEADERBOARD Table
    // We can use a view or a separate table. Requirement asks for a table.
    await db.exec(`
        CREATE TABLE IF NOT EXISTS leaderboard (
            id TEXT PRIMARY KEY,
            userId TEXT,
            rank INTEGER,
            score INTEGER,
            lastUpdated TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(userId) REFERENCES users(id)
        );
    `);

    // ROOMS Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS rooms (
            roomId TEXT PRIMARY KEY,
            gameType TEXT,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'active'
        );
    `);

    console.log('Database initialized successfully.');
}
