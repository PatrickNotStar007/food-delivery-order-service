import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('statuses', ['pending', 'recieved']);

export const ordersTable = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerName: varchar('customerName', { length: 100 }).notNull(),
  item: varchar('item', { length: 100 }).notNull(),
  quantity: integer('quantity').notNull(),
  status: statusEnum('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const Order = typeof ordersTable.$inferSelect;
export const NewOrder = typeof ordersTable.$inferInsert;
