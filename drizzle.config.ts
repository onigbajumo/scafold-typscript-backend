import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  schema: "./src/db/schema/index.ts",   
  out: "./drizzle",              
  dialect: "postgresql",          
  dbCredentials: {
    url: process.env.DATABASE_URL!,   
  },
  // optional:
  casing: "snake_case",
});
