import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).notNull(),
  username: varchar('username', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  products: many(products),
}));

export const sessions = pgTable('sessions', {
  sid: varchar('sid', { length: 255 }).primaryKey(),
  sess: varchar('sess', { length: 2048 }).notNull(),
  expire: timestamp('expire').notNull(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  imageURL: varchar('imageURL', { length: 256 }),
  createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow(),
  userId: integer('userId'),
});

export const productsRelations = relations(products, ({ one }) => ({
  author: one(users, {
    fields: [products.userId],
    references: [users.id],
  }),
}));
