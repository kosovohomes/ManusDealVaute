# DealVault authentication update — manual upload

Copy the contents of this ZIP into the root of your existing `ManusDealVaute` GitHub repository, preserving the folder paths. Replace existing files when prompted.

This update adds:

- Registration, login, logout, and current-session API endpoints.
- Persistent 30-day hashed sessions stored in MySQL.
- Dynamic user identity and profile menu instead of the Amelia Reed demo identity.
- Protected investor workspace routes.
- Administrator-only operator routes and `/api/admin/*` backend protection.
- Vercel catch-all API function support.
- Drizzle schema and migration files for users and sessions.

After uploading the files:

1. Commit and push them to the `main` branch.
2. In Vercel, add `DATABASE_URL` for your MySQL-compatible production database.
3. Add `DEALVAULT_ADMIN_EMAIL` with the first administrator’s email.
4. Run `pnpm db:migrate` against the same production database, or apply `drizzle/0001_bouncy_solo.sql` using your database migration process.
5. Redeploy Vercel.

Do not upload real passwords, API keys, or private database credentials to GitHub. The included `.env.example` contains placeholders only.
