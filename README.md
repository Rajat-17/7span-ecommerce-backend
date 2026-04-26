# 7span E-commerce Backend

This repository contains the backend for the 7span e-commerce application (TypeScript + Express + Prisma).

**Purpose:** Provide step-by-step instructions so a non-technical person can run the application on Windows.

**Prerequisites**
- **Node.js:** Install Node.js 18 or newer from https://nodejs.org/
- **npm:** Included with Node.js
- **Git:** (optional) to clone the repository
- **Database:** A MySQL server reachable from your machine. You need a connection string for the `DATABASE_URL` environment variable.

**Quick folder map**
- **[prisma/schema.prisma](prisma/schema.prisma)**: Database schema and relations used by Prisma.
- **[prisma/migrations](prisma/migrations)**: Migration files to create DB schema.
- **[prisma/seed.ts](prisma/seed.ts)**: Optional seed script to populate initial data.
- **[src/server.ts](src/server.ts)**: App entry — starts the HTTP server on port 5000.
- **[src/app.ts](src/app.ts)**: Express app and route registration (`/api`).
- **[src/modules](src/modules)**: Feature modules (auth, product, cart, order, category).
- **[src/config/db.ts](src/config/db.ts)**: Prisma client import.

---

**Step-by-step: Run the application (Windows / PowerShell)**

1) Open PowerShell and change to the project folder (where this README is).

```powershell
cd C:\path\to\7span-ecommerce-backend
```

2) Create a `.env` file in the project root with your database connection. At minimum add:

```text
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
```

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE_NAME` with your MySQL details.

3) Install dependencies

```powershell
npm install
```

4) Generate Prisma client (updates TypeScript types)

```powershell
npx prisma generate
```

5) Apply database migrations (this will create tables). Use this if migrations exist (recommended):

```powershell
npx prisma migrate deploy
```

If you're in development and prefer an interactive migration (may prompt), you can use:

```powershell
npx prisma migrate dev
```

6) (Optional) Seed the database with sample data

```powershell
npx ts-node prisma/seed.ts
```

7) Start the development server

```powershell
npm run dev
```

The server listens on port `5000`. You should see the log: `Server running on port 5000`.

**Verification (simple checks a non-technical user can do)**
- Check the server log output in your terminal for `Server running on port 5000`.
- Open a new PowerShell window and run a quick API request to confirm the app responds.

Example: list products (public endpoint)

```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/product/list -Method Post -Body '{}' -ContentType 'application/json'
```

If everything is running you should receive a JSON response (an array). If the DB is empty you may get an empty array `[]`.

Another quick check: open a browser and visit `http://localhost:5000/api/product/1` — it will return product details or a 404 if that product ID doesn't exist.

**Troubleshooting tips**
- If `npm install` fails: ensure Node.js is installed and your PATH includes `node` and `npm`.
- If `npx prisma generate` fails: check `prisma/schema.prisma` for syntax errors.
- If migrations fail: ensure your `DATABASE_URL` is correct and the DB user has permissions to create tables.
- If `npm run dev` shows compilation errors: share the terminal output with a developer (or paste into an issue) — usually missing env variables or type errors from edited files.

**Helpful commands**
- Install dependencies: `npm install`
- Generate Prisma client: `npx prisma generate`
- Apply migrations: `npx prisma migrate deploy`
- Run seed script: `npx ts-node prisma/seed.ts`
- Start dev server: `npm run dev`
- Type-check project: `npx tsc --noEmit`

**When to verify**
- After running `npm run dev`, confirm the server log and run the verification curl/Invoke-RestMethod above.

---
