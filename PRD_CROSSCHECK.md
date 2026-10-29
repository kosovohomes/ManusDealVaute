# DealVault PRD cross-check

## Finding

The original v2 PRD and v2.1 are substantially aligned. v2.1 did not remove a core investor, NDA, document-security, audit, privacy, or launch requirement. It expanded the original operator dashboard into explicit project management, bulk import/export, document management, media/video management, branding/settings, analytics, and role permissions.

The main wording changes are intentional expansions: “operator dashboard” became “Super Admin dashboard”; “document access and tracking” became “document and media access tracking”; the architecture gained analytics, private media/video processing, import/export jobs, and stronger performance/security detail; and the launch criteria became more explicit about project/media administration and analytics.

## Requirements from v2 that were not yet visible in the first build

The first build was a reviewable workflow prototype with seeded data. Its main gaps against the combined v2/v2.1 scope were:

- A dedicated media/video management surface with visibility, captions/transcript, access level, view duration, and completion signals.
- Dedicated user and role management with Super Admin, Reviewer/Delegate, Internal Project Lead, and Investor/Prospect permissions.
- Dedicated analytics with traffic, project performance, funnel progression, media engagement, and security/operational signals.
- Dedicated import/export controls with dry-run validation, row-level errors, audit records, and export scope language.
- Clearer separation between commercial pipeline stage and access-grant state, including expiry and revocation.
- Complete investor qualification capture for relevant experience/portfolio focus and preferred contact method.
- A project sponsor/team section on project briefs.
- Explicit project/media administration states for archive, publish/unpublish, and private media.

## Changes made in this iteration

The DealVault build now includes operator navigation and reviewable screens for Media, Users, Analytics, and Imports & exports; a project brief sponsor/team and investment opportunity block; fuller interest form fields; and separate access-state presentation in the operator experience. These are still demo-backed UI workflows until production authentication, database persistence, private storage, signed URLs, watermarking, video hosting, email, and e-signature providers are connected.

## Still intentionally deferred

The original and revised PRDs both identify several provider- and policy-dependent capabilities that should not be faked in a prototype: real email/password or provider authentication, email verification, private object storage, server-side authorization, dynamic PDF derivatives, e-signature webhooks, retention/deletion workflows, real analytics collection, rate limiting, backups, incident response, and production security testing. They remain explicit in the delivery checklist and implementation plan rather than being silently treated as complete.
