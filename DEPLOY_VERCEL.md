# DealVault handoff: GitHub and Vercel

This bundle contains the complete DealVault source code, including the React client, Express/tRPC server, Drizzle schema and migrations, project documentation, and the CafePass pitch deck.

## Vercel deployment with authentication

The included `vercel.json` now deploys the Node backend, authentication API, and static frontend together. The application includes registration, login, logout, persistent 30-day sessions, dynamic user profiles, and protected workspace/operator routes.

1. Create a new GitHub repository.
2. Upload or push the contents of this folder to the repository root.
3. In Vercel, choose **Add New Project → Import Git Repository**.
4. Add the Vercel environment variable `DATABASE_URL` for a MySQL-compatible production database.
5. Add `DEALVAULT_ADMIN_EMAIL` with the email address that should receive the first administrator role.
6. Deploy, then run the checked-in migration against the same database with `pnpm db:migrate` from a trusted environment.

The first account registered with the configured `DEALVAULT_ADMIN_EMAIL` becomes an administrator. All other registrations receive the investor role. The operator pages are protected in the browser and the `/api/admin/*` backend namespace rejects unauthenticated or non-admin requests.

The CafePass PowerPoint is included under `docs/` and is also registered in the seeded document library. The current browser demo shows the document entry and controlled access state; production-grade authenticated downloads require connecting the server/storage layer described below.

## Full application path

The repository also contains the Express/tRPC server and Dockerfile. For a full production deployment, run `pnpm install --frozen-lockfile`, set the required runtime environment variables, run `pnpm db:migrate` against the chosen MySQL database, run `pnpm build`, and start with `pnpm start` or the included Dockerfile.

The current server still contains the original Manus OAuth compatibility helpers, but the standalone Vercel login flow uses the application database and password sessions. Do not put private credentials in the client or in GitHub. Use a managed MySQL provider for `DATABASE_URL`, enable TLS, and run migrations before inviting users.

## Local commands

```bash
corepack enable
corepack prepare pnpm@10.18.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

Useful checks:

```bash
pnpm check
pnpm build
pnpm build:static
pnpm test
```

## Included operational artifacts

- `docs/CafePass_Pitch_Deck_(2).pptx` — original 15-slide CafePass deck.
- `docs/CafePass_Level0_Public_Teaser.md` — public teaser source.
- `client/public/manus-routes.json` — user-facing route manifest.
- `Dockerfile` — full Node/Express container path.
- `vercel.json` — static Vercel showcase path.
