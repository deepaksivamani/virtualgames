import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function getDB() {
    if (db) return db;

    const dbPath = path.join(process.cwd(), 'database', 'virtualgames.sqlite');
    db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    return db;
}
