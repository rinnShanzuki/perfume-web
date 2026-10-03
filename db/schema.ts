import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const journalEntries=sqliteTable('journal_entries',{path:text('path').primaryKey(),raw:text('raw').notNull(),updatedAt:text('updated_at').notNull()});
export const settings=sqliteTable('editor_settings',{key:text('key').primaryKey(),value:text('value').notNull()});
export const inquiries=sqliteTable('inquiries',{id:text('id').primaryKey(),name:text('name').notNull(),email:text('email').notNull(),interest:text('interest').notNull(),message:text('message').notNull(),createdAt:text('created_at').notNull()});
export const actions=sqliteTable('inquiry_actions',{id:text('id').primaryKey(),action:text('action').notNull(),page:text('page').notNull(),createdAt:text('created_at').notNull()});
