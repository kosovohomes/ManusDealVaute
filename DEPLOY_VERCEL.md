# DealVault handoff: GitHub and Vercel

This bundle contains the complete DealVault source code, including the React client, Express/tRPC server, Drizzle schema and migrations, project documentation, and the CafePass pitch deck.

## Fastest Vercel path: showcase deployment

The included `vercel.json` uses `pnpm build:static` and publishes `dist/public`. This is the fastest way to put the current seeded DealVault showcase online. It includes the portfolio, CafePass project page, Project in a Nutshell pages, working client-side search, operator UI previews, and the controlled document-library presentation.

1. Create a new GitHub repository.
2. Upload or push the contents of this folder to the repository root.
3. In Vercel, choose **Add New Project → Import Git Repository**.
4. Keep the detected install, build, and output settings from `vercel.json`.
5. Deploy.

The CafePass PowerPoint is included under `docs/` and is also registered in the seeded document library. The current browser demo shows the document entry and controlled access state; production-grade authenticated downloads require connecting the server/storage layer described below.

## Full application path

The repository also contains the Express/tRPC server and Dockerfile. For a full production deployment, run `pnpm install --frozen-lockfile`, set the required runtime environment variables, run `pnpm db:migrate` against the chosen MySQL database, run `pnpm build`, and start with `pnpm start` or the included Dockerfile.

The current server uses Manus-managed OAuth, storage, and platform configuration helpers. Those integrations are not automatically portable to a standalone Vercel project. To run the full authenticated production application outside Manus, replace or adapt the OAuth, database, storage, and platform configuration helpers to the services you choose, then deploy the server as Vercel Functions or on a Node-capable host. Do not put private credentials in the client or in GitHub.

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
