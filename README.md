# JobHub.pk

Pakistan-focused jobs, tenders and opportunities platform built with Next.js, React, Prisma and PostgreSQL.

## Stage A
This package contains the Stage A database-backed public listings and admin moderation workflow.

### Main routes
- `/` — homepage
- `/jobs` — verified active jobs with search/filtering
- `/jobs/[slug]` — verified job detail
- `/tenders` — verified active tenders
- `/tenders/[slug]` — tender detail
- `/admin` — live admin dashboard
- `/admin/jobs` — job moderation
- `/admin/jobs/new` — manual job entry

### Setup
```bash
npm install
cp .env.example .env
npx prisma generate
npm run typecheck
npm run build
```

Set `DATABASE_URL` and `AUTH_SECRET` in `.env`. Use a proper Prisma migration workflow for production databases.

### Verification rule
A job/tender is publicly visible only when it is verified, active and not expired. Manual submissions start unpublished and require verification.

Automatic newspaper scraping is intentionally not included in Stage A.
