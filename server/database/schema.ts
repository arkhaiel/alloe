import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

export const users = sqliteTable('users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  name: text('name'),
  email: text('email').unique(),
  avatar: text('avatar'),
  createdAt: text('created_at').$defaultFn(() => Date.now().toString()),
})

export const authMethods = sqliteTable('auth_methods', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  type: text({ enum: ['password']}).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  counter: integer('counter').default(0).notNull(),
  identifier: text('identifier'),
  hashedPassword: text('password'),
  providerData: text('provider_data'),
  createdAt: text('created_at').$defaultFn(() => Date.now().toString()),
})

// Handle the chapters system
export const chapters = sqliteTable('chapters', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  createdAt: text('created_at').$defaultFn(() => Date.now().toString()),
  updatedAt: text('updated_at').$onUpdateFn(() => Date.now().toString()),
  title: text('title'),
  root: text('root'),
  authorId: text('author_id').references(() => users.id),
  text: text('text').notNull(),
  public: integer('id', { mode: 'boolean' }).default(false),
})

// Handle forum and tickets system
export const posts = sqliteTable('posts', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  createdAt: text('created_at').$defaultFn(() => Date.now().toString()),
  updatedAt: text('updated_at').$onUpdateFn(() => Date.now().toString()),
  title: text('title'),
  root: text('root'),
  authorId: text('author_id').references(() => users.id),
  text: text('text').notNull(),
  public: integer('id', { mode: 'boolean' }).default(false),
})
