import 'dotenv/config';

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  schema: "./src/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL  || "default-url-here"!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
});