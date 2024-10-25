import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const todosTable = sqliteTable("todos", {
  id: text().primaryKey(),
  title: text(),
  status: text(),
  createdAt: integer(),
  updatedAt: integer(),
});
