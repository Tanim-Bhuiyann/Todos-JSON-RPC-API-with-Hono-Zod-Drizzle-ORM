import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.DATABASE_URL  || "default-url-here",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
export const db = drizzle(client);

