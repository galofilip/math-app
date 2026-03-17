import * as SQLite from 'expo-sqlite';
import { ALL_CREATE_STATEMENTS } from './schema';

let db: SQLite.SQLiteDatabase | null = null;

export function getDb(): SQLite.SQLiteDatabase {
  if (!db) {
    db = SQLite.openDatabaseSync('mathquest.db');
  }
  return db;
}

/**
 * Run all CREATE TABLE IF NOT EXISTS statements.
 * Safe to call on every app start.
 */
export function initDatabase(): void {
  const database = getDb();
  database.withTransactionSync(() => {
    for (const sql of ALL_CREATE_STATEMENTS) {
      database.execSync(sql);
    }
  });
  // Ensure a 'guest' progress row always exists
  database.runSync(
    `INSERT OR IGNORE INTO user_progress (user_id) VALUES ('guest');`
  );
}
