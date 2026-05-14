import { defineRelations } from 'drizzle-orm';
import * as D from 'drizzle-orm/pg-core';

export const usersTable = D.snakeCase.table('users', {
  id: D.serial().primaryKey(),
  name: D.text().notNull(),
});

export const postsTable = D.snakeCase.table('posts', {
  authorId: D.integer()
    .notNull()
    .references(() => usersTable.id),
  id: D.serial().primaryKey(),
  title: D.text().notNull(),
});

export const relations = defineRelations(
  {
    posts: postsTable,
    users: usersTable,
  },
  (r) => ({
    posts: {
      author: r.one.users({
        from: r.posts.authorId,
        optional: false,
        to: r.users.id,
      }),
    },
    users: {
      posts: r.many.posts(),
    },
  }),
);
