// src/db/schema.ts
import { pgTable, uuid, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

