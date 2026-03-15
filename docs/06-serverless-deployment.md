# Synphere Serverless Deployment

## 1. Goal

Synphere should launch on `synphere.com` with a **serverless, near-zero-cost** architecture.

At the beginning, the only unavoidable recurring cost should be the domain registration itself. Everything else should run on free tiers for as long as the closed beta and early public beta allow.

This document turns that constraint into concrete service choices.

## 2. Recommended Domain Layout

For the first launch, keep the public surface simple:

- `synphere.com`: primary product and marketing site
- `www.synphere.com`: redirect to `synphere.com`
- `https://synphere.com/api/*`: internal application API routes

Avoid `api.synphere.com`, `app.synphere.com`, and other public subdomains at launch unless a real operational need appears. A single domain is simpler for DNS, cookies, OAuth callbacks, CORS, and deployment.

## 3. Recommended Services by Concern

| Concern | Service | Use in Synphere | Free-tier or cost note |
| --- | --- | --- | --- |
| domain registration | Cloudflare Registrar | register or transfer `synphere.com` | not free, but sold at registry cost without markup |
| DNS and DNSSEC | Cloudflare DNS | authoritative DNS, HTTPS-friendly setup, redirect support | free |
| frontend hosting, SSR, route handlers, CDN | Vercel Hobby | host the Next.js app on `synphere.com` | free forever, but meant for personal non-commercial use |
| custom domain on app | Vercel | attach apex and `www` | included on Hobby |
| daily scheduled jobs | Vercel Cron | daily cleanup and maintenance | available on Hobby, but only once per day |
| database | Supabase Postgres | source of truth for users, Bubbles, interactions, Rooms | free plan includes 500 MB database size |
| auth | Supabase Auth | email/password auth, sessions, OAuth support | free plan includes 50,000 monthly active users |
| file storage | Supabase Storage | avatars, banners, user uploads | free plan includes 1 GB storage |
| realtime | Supabase Realtime | room presence, chat, queue updates | free plan includes 2 million realtime messages and 200 peak connections |
| transactional email | Resend Free | password reset, verification, safety emails | free tier supports 3,000 emails/month and 100/day |
| product analytics | PostHog Free | activation, retention, feed and room usage events | free tiers are generous enough for beta |
| optional cache and queue | Upstash Redis / QStash | add only if feed caching or async fan-out becomes necessary | Redis free tier includes 256 MB and 500K commands/month; not required on day one |
| code hosting and CI | GitHub + Vercel Git integration | deploy from git pushes | GitHub Actions is optional; GitHub Free includes 2,000 minutes/month for standard private-repo runners and standard runners are free for public repos |

## 4. Initial Runtime Design

### 4.1 Web App and API

Use a single Next.js app deployed to Vercel.

This app owns:

- all page rendering
- all server actions
- all route handlers under `/api`
- integration with Supabase and Spotify

Do not split out a separate backend service at launch.

### 4.2 Database and Auth

Use one Supabase project for:

- Postgres
- Auth
- Storage
- Realtime

This is the biggest simplification in the stack because it removes the need to separately operate:

- a database host
- an auth provider
- a websocket layer
- a file storage system

### 4.3 Rooms

Implement Rooms with Supabase Realtime channels and Postgres-backed room state.

For the first version:

- room presence comes from Realtime presence
- chat events are broadcast through Realtime
- queue changes are persisted in Postgres and broadcast to subscribers
- playback synchronization uses preview timestamps and sequence numbers

Do not run a custom socket server on day one.

### 4.4 Search

Keep search inside Postgres using:

- full-text search
- trigram indexes
- rank-weighted SQL queries

Do not introduce Algolia, Meilisearch, or Elasticsearch for the first release.

### 4.5 Background Work

At launch, background work should use the simplest possible pattern:

- inline updates for small derived counters
- SQL functions where the write path can safely own the update
- lazy expiration for stale Rooms
- daily Vercel Cron for cleanup and non-urgent recomputation

Only add a real queue when this stops being sufficient.

### 4.6 Notifications

Use:

- in-app notifications stored in Postgres
- Resend for transactional email

Push notifications can wait until after initial retention is validated.

### 4.7 Analytics and Monitoring

Use:

- PostHog for product analytics
- Vercel logs for request and function visibility
- Supabase dashboards for DB/Auth/Realtime health

That is enough for an early beta. A dedicated error monitoring tool can be added later if necessary.

## 5. Cost Guardrails

To keep Synphere near zero cost at the beginning:

- do not use a paid Supabase custom domain
- do not run a separate always-on API container
- do not run a separate always-on worker
- do not run a separate websocket server
- do not add a managed search service
- do not add Redis until Postgres queries or rate limits justify it

Those are the main places where startup projects accidentally introduce recurring spend before they have usage.

## 6. Known Platform Constraints

The chosen stack is simple, but not unlimited.

### 6.1 Vercel Hobby Constraint

Vercel Hobby is a strong default for the first version, but its plan is positioned for personal and non-commercial use. When Synphere becomes a commercial product, team product, or production business workload, the project should move to Vercel Pro or an alternative production host.

### 6.2 Vercel Cron Constraint

Vercel Hobby cron can only run once per day. Synphere therefore must not depend on minute-by-minute scheduled jobs at launch.

This is why:

- room cleanup is lazy
- feed updates are mostly computed on read or inline on write
- maintenance jobs run daily

### 6.3 Supabase Custom Domain Constraint

Supabase custom domains are a paid add-on. As of the verified docs date, they are billed at about `$10/month` per active custom domain. For the zero-cost launch, Synphere should use the default `*.supabase.co` project URL internally and keep the public user-facing domain only on Vercel.

### 6.4 Supabase Realtime Constraint

The free plan is enough for a closed beta, but Rooms should be designed with message efficiency in mind. Broadcast state diffs, not noisy full snapshots.

## 7. Upgrade Triggers

Upgrade or add services only when one of these becomes true:

- Vercel Hobby is no longer appropriate because the product is now commercial or the team needs Pro-only features
- Supabase Realtime limits are consistently hit
- Postgres search latency becomes unacceptable
- daily cron is no longer enough for maintenance workflows
- email volume exceeds the free Resend quota
- feed or notification fan-out becomes too expensive to perform inline

When that happens, the clean upgrade path is:

1. Vercel Pro for app hosting
2. Supabase Pro for database and realtime headroom
3. Upstash for cache or queueing
4. dedicated error monitoring or search only if metrics justify it

## 8. Official References

The service choices above were checked against official provider documentation and pricing pages on **March 15, 2026**.

- Cloudflare Registrar and DNS: [Cloudflare Registrar docs](https://developers.cloudflare.com/registrar/), [Cloudflare DNS FAQ](https://developers.cloudflare.com/dns/troubleshooting/faq/)
- Vercel pricing, domains, and cron limits: [Vercel Pricing](https://vercel.com/pricing), [Add a domain](https://vercel.com/docs/getting-started-with-vercel/domains), [Cron usage and pricing](https://vercel.com/docs/cron-jobs/usage-and-pricing)
- Supabase free-plan usage and custom-domain pricing: [Supabase billing](https://supabase.com/docs/guides/platform/billing-on-supabase), [Supabase custom domains](https://supabase.com/docs/guides/platform/custom-domains), [Supabase custom domain usage](https://supabase.com/docs/guides/platform/manage-your-usage/custom-domains)
- Resend free tier: [Resend pricing](https://resend.com/pricing), [Resend sending limits](https://resend.com/docs/knowledge-base/resend-sending-limits)
- Upstash free limits: [Upstash Redis pricing](https://upstash.com/docs/redis/overall/pricing)
- GitHub Actions free allowance: [GitHub Actions billing](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions)
- PostHog free tiers: [PostHog](https://posthog.com/)
