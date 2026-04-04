import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function getDb(): Promise<Database> {
  if (db) return db;

  db = await open({
    filename: path.join(process.cwd(), 'database.sqlite'),
    driver: sqlite3.Database
  });

  await initDb(db);
  return db;
}

async function initDb(db: Database) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT,
      full_name TEXT,
      user_type TEXT,
      main_problem TEXT,
      focus_score INTEGER DEFAULT 0,
      discipline_score INTEGER DEFAULT 0,
      sleep_score INTEGER DEFAULT 0,
      purpose_score INTEGER DEFAULT 0,
      meaning TEXT,
      direction TEXT,
      insight TEXT,
      onboarding_completed BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS onboarding_responses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      question_key TEXT,
      answer TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      title TEXT,
      description TEXT,
      category TEXT,
      duration_minutes INTEGER,
      status TEXT DEFAULT 'pending',
      date TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS reflections (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      date TEXT,
      reflection_text TEXT,
      mood_label TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);
}
