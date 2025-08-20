🚀 TypeScript Express Scaffold














A lightweight, production-ready TypeScript + Express starter for building REST APIs.
Includes PostgreSQL + Drizzle ORM, Swagger UI, Redoc, security middleware, CORS, and structured logging.

✨ Features

TypeScript + Express foundation

PostgreSQL + Drizzle ORM (migrations & typed queries)

API Docs

Swagger UI → /api-docs (interactive)

Redoc → /docs (read-only)

OpenAPI JSON → /openapi.json

Security & Reliability

helmet, cors, express-rate-limit, cookie-parser

gzip compression

centralized CORS + security config

Logging

winston (app logs) + morgan (HTTP logs)

DX

.env support


modular folder structure, easy to extend

📦 Tech Stack

Runtime: Node.js 18+

Web: Express 4, TypeScript 5

DB/ORM: PostgreSQL, Drizzle ORM

Docs: swagger-jsdoc, swagger-ui-express, redoc-express

Security: helmet, cors, cookie-parser, express-rate-limit

Logging: winston, morgan

📁 Project Structure
src/
 ├─ app.ts                    # Express app wiring
 ├─ server.ts                 # Server entry
 ├─ config/
 │   ├─ swagger.ts            # OpenAPI/Swagger config (swagger-jsdoc)
 │   ├─ cors.ts               # Central CORS options (env-driven)
 │   ├─ security.ts           # helmet, compression, cookies, rate-limit
 │   └─ logger.ts             # winston + morgan
 ├─ db/
 │   ├─ schema/               # Drizzle table definitions (split by domain)
 │   │   ├─ user.schema.ts
 │   │   └─ index.ts          # re-exports all tables
 │   └─ client.ts             # Drizzle + pg Pool connection
 ├─ routes/
 │   └─ user.route.ts         # example routes with JSDoc @openapi
 ├─ controllers/
 │   └─ user.controller.ts
 └─ middlewares/
     └─ errorHandler.ts
drizzle.config.ts             # Drizzle Kit config (dialect/url)
drizzle/                      # Generated migrations (output)
public/swagger/               # (optional) static Swagger bundle

🛠 Prerequisites

Node.js 18+

A PostgreSQL URL (e.g., Supabase/Neon/Render/Local)

🔐 Environment

Create .env:

NODE_ENV=development
PORT=5000

# Postgres (include sslmode where required, e.g. Supabase)
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB?sslmode=require

# CORS (comma-separated, no trailing slashes)
ALLOWED_ORIGINS=http://localhost:5000,http://127.0.0.1:5000,http://localhost:3000

# Cookies & logging
COOKIE_SECRET=change-me
LOG_LEVEL=debug

🚀 Run
# install
npm install

# dev
npm run dev

# build & start
npm run build
npm start


Visit:


Swagger UI: GET /api-docs

Redoc: GET /docs

OpenAPI JSON: GET /openapi.json

🗄 Database (PostgreSQL + Drizzle)

Install & configure Drizzle:

npm i drizzle-orm pg
npm i -D drizzle-kit


drizzle.config.ts (modern format):

import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  schema: "./src/db/schema/index.ts", // or ./src/db/schema.ts
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
});


Define a table (example src/db/schema/user.schema.ts):

import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});


Export in src/db/schema/index.ts:

export * from "./user.schema";


Generate & apply migrations:

npx drizzle-kit generate
npx drizzle-kit push



🔒 Security, CORS, Cookies

CORS is centralized in src/config/cors.ts and reads ALLOWED_ORIGINS.
Include exact origins (protocol://host:port)—no trailing slash.

Helmet, compression, cookie-parser, rate-limit are wired in src/config/security.ts and applied in app.ts.

Secure cookies example lives in src/lib/cookies.ts (httpOnly, sameSite, secure in prod).

🧾 Logging

winston for structured logs (logger.info/error/debug)

morgan for HTTP access logs (piped to winston)

Process-level crash handlers (unhandledRejection, uncaughtException) in config/logger.ts

🧪 Quick Test (cURL)

# create user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'

# list users
curl http://localhost:5000/api/users

☁️ Deploy (Render/Vercel/Any Node Host)

Set DATABASE_URL, COOKIE_SECRET, ALLOWED_ORIGINS in host env.

If using Render, keep app.set('trust proxy', 1) for secure cookies.

Build command: npm run build

Start command: npm start

Optional render.yaml example:

services:
  - type: web
    name: ts-express-scaffold
    runtime: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: NODE_ENV
        value: production

🧰 Troubleshooting

CORS on POST (GET works, POST fails):
Ensure ALLOWED_ORIGINS includes your exact origin(s) and that CORS is mounted before routes. Handle preflights:


DB “table does not exist”:
Run migrations: npx drizzle-kit generate && npx drizzle-kit push.

Supabase connection errors:
Use direct connection (port 5432) and add ?sslmode=require to DATABASE_URL.

🤝 Contributing

Fork the repo

Create a branch: feat/your-feature

Commit & push

Open a PR 🎉

📄 License

MIT — free for personal & commercial use.