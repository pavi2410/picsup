import { Database } from 'bun:sqlite';
import { sql } from "drizzle-orm";
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { SQLITE_DB_FILE } from "./config";

const sqlite = new Database(SQLITE_DB_FILE);
export const db = drizzle(sqlite);

export const users = sqliteTable('users', {
  id: text('id'),
  name: text('name'),
  email: text('email'),
  passwordHash: text('passwordHash'),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const images = sqliteTable('images', {
  _id: text('id'),
  content_type: text('content_type'),
  name: text('name'),
  ownerId: text('ownerId'),
  tags: text('tags'),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`),
});
