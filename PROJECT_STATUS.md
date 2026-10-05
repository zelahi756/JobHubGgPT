# JobHub.pk — Stage A Status

## Stage A completed in this package
- Public Jobs pages use PostgreSQL/Prisma instead of demo `lib/data.ts` records.
- Public jobs are gated to `verified=true`, `active=true`, and `deadline >= now`.
- Job search/filtering supports keyword, province, city, category, job type, BPS, education, experience and sorting.
- Public job detail is database-backed and exposes official/source links separately.
- Public Tenders listing/detail are database-backed and gated to verified, active, non-expired records.
- Manual Admin Add Job creates a real database record as pending/unpublished.
- Admin Job Management provides edit, verify, reject and expire actions.
- Admin dashboard counters are database-backed.
- Audit logs are written for create/edit/verify/reject/expire actions.
- Admin RBAC supports USER, EDITOR, VERIFIER, ADMIN and SUPER_ADMIN; middleware and server-side checks use the same role model.
- Automatic expiry endpoint is included for scheduled execution; it deactivates expired jobs and tenders.
- Public APIs return only eligible verified/active/non-expired records.
- Sitemap no longer depends on demo records.
- `.env.example` contains placeholders only; no secrets are included.

## Important production setup
1. Copy `.env.example` to `.env` and set a real PostgreSQL `DATABASE_URL` and `AUTH_SECRET`.
2. Install dependencies with `npm install`.
3. Generate Prisma Client with `npx prisma generate`.
4. Apply the Prisma schema using your chosen production migration workflow.
5. Create the first privileged account securely; normal registration creates `USER` accounts.
6. Configure a scheduled POST to `/api/admin/expire` with `Authorization: Bearer <CRON_SECRET>` before production use.

## Validation status
The project was source-reviewed and the Stage A implementation was applied. A production `npm install` could not complete in this environment because access to the npm registry timed out. Therefore `npm run typecheck` / `npm run build` are **not claimed as successfully executed here**.

The ZIP is intentionally source-only and GitHub-ready; it does not contain `node_modules`, `.env`, build output, or secrets.
