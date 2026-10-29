# DealVault implementation plan

## Scope and implementation approach

DealVault v1 will be delivered as a polished managed React/Express/tRPC/Drizzle web app with a reviewable investor showcase and operator console. The first release emphasizes the complete operating loop in a single product surface: browse curated projects, open a project brief, express interest, review the qualification pipeline, advance prospects through NDA/data-room stages, inspect documents/media, and review audit activity. The interface will use seeded portfolio and prospect data so the experience is immediately demonstrable.

The product will use the initialized server and managed database capabilities. The existing Manus OAuth session model will remain the authentication foundation; application roles and project access states will live in the application data model. The front end will keep public showcase, investor workspace, and operator dashboard as distinct routes, with sensible demo fallbacks while the backend data layer is being extended. Confidential file delivery, dynamic watermarking, signed URLs, e-signature provider integration, notifications, and advanced analytics will be represented in the product model and UI as extensible seams rather than falsely claiming production-grade legal/security guarantees in this first build.

## Project structure

- `client/src/App.tsx`: route map, global shell, and layout composition.
- `client/src/pages/Home.tsx`: public showcase and portfolio discovery.
- `client/src/pages/ProjectDetail.tsx`: non-confidential project brief, engagement CTA, and access-state presentation.
- `client/src/pages/InvestorWorkspace.tsx`: investor progress, requests, saved projects, and data-room readiness.
- `client/src/pages/AdminDashboard.tsx`: operator KPIs, pipeline, requests, project management, documents, media, diligence readiness, users/roles, analytics, imports/exports, activity, and settings views.
- `client/src/components/`: reusable UI primitives and DealVault-specific navigation/status components.
- `client/src/lib/`: client data helpers and formatting utilities.
- `server/routers.ts`: tRPC entry point for future persisted mutations and audit event hooks.
- `server/db.ts`: database access helpers.
- `drizzle/schema.ts`: application entities for projects, project content, users, interest requests, access grants, documents, media, notifications, and audit events.
- `public/manus-routes.json`: complete client route manifest for preview and publication tooling.
- `plan.md` and `TODO.md`: approved product direction and acceptance outcomes.

## Design direction

### Candidate styles

1. **Quiet capital / editorial infrastructure** (0.07): dark graphite, parchment, and mineral green with restrained serif headlines and dense operator-grade information design.
2. **Neon fintech command center** (0.05): black glass, electric cyan, and vivid charting with a more technical trading-terminal feeling.
3. **Warm boutique advisory** (0.08): ivory, oxblood, and brass with hospitality-like spacing and traditional wealth-management cues.

### Chosen style: Quiet capital / editorial infrastructure

- **Design movement:** contemporary private-capital editorial design, combining a financial annual report with a calm, high-trust operations console.
- **Core principles:** signal over decoration; private by default; clear stage communication; premium restraint.
- **Color philosophy:** graphite and ink ground the product in confidentiality and seriousness; parchment surfaces keep dense data approachable; mineral green marks progress and qualified opportunity; amber is reserved for attention and review states.
- **Layout paradigm:** an asymmetric two-column editorial frame for showcase pages, paired with a persistent left operator rail and right-side context panels for workflows.
- **Signature elements:** thin ruled dividers, compact uppercase metadata labels, and a distinctive emerald vertical accent that marks active or decision-ready states.
- **Interaction philosophy:** every action should disclose what happens next. Buttons use operational verbs such as “Express interest”, “Review request”, and “Approve access”; destructive or irreversible states are explicit.
- **Animation:** short 150–220ms fades and 2–4px lifts on cards; no distracting motion in the dashboard; status changes use a subtle emerald pulse only when a workflow advances.
- **Typography system:** `DM Sans` for UI/data with `Cormorant Garamond` for large editorial display headlines. Dense tables use 12–13px UI text with generous row rhythm.
- **Brand essence:** a private, operator-led investment room for credible opportunities and controlled disclosure. Personality: composed, discerning, dependable.
- **Brand voice:** concise, informed, quietly confident. Examples: “The next conversation starts with context.” and “See what is ready for review.”
- **Wordmark & logo:** a simple vault-door monogram formed from two offset vertical strokes and a small emerald hinge dot, paired with a spaced `DEALVAULT` wordmark.
- **Signature brand color:** `#6E9B82`, a mineral emerald that signals access and momentum without feeling like generic fintech green.

## Delivery sequence

1. Build the route shell, seeded data model, showcase, project detail, investor workspace, and admin dashboard.
2. Add interactive operational states for interest submission, status changes, tabs, filtering, and access controls.
3. Add database-ready schema and backend seams where they do not destabilize the reviewable UI.
4. Register route manifest, start Preview, run diagnostics/type checks and the production build.
5. Save the working version to the project repository/checkpoint after validation.

## Product boundaries for this first release

The UI must make clear that progressive disclosure levels, access approval, NDA verification, watermarking, signed URLs, analytics, imports/exports, diligence readiness, and audit trails are governed workflows. Demo actions can update the local review state so the product is explorable, but the implementation should avoid claiming that a visual demo is a completed legal-signature, secure-file, media-hosting, analytics, or compliance integration until those provider and storage connections are configured.
