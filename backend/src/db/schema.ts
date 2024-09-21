import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name'),
    email: text('email'),
    passwordHash: text('passwordHash'),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(sql`(CURRENT_TIMESTAMP)`),
});

export const images = sqliteTable('images', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    contentType: text('content_type'),
    name: text('name'),
    ownerId: text('ownerId'),
    tags: text('tags'),
    createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`),
});
