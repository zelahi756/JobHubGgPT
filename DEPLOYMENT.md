# Deployment

## GitHub → Cloudflare
Commit the project to GitHub. Configure the deployment from the `main` branch. Set production environment variables in the Cloudflare deployment settings; never commit `.env`.

Required: `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`. Configure email variables when alerts are enabled.

## Production database
Run Prisma migrations from a trusted deployment environment:
`npx prisma migrate deploy`

Generate client when needed:
`npx prisma generate`

## Important
This codebase intentionally does not auto-scrape newspapers. Add only legitimate/authorized ingestion sources and require human verification before publication, as specified in the project brief.
