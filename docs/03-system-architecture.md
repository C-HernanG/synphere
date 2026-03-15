# Synphere System Architecture

## 1. Architecture Summary

Synphere should launch as a **modular monolith in code** and a **serverless managed system in deployment**.

This is the most optimized approach for the product's current stage because it:

- preserves speed of delivery
- reduces operational cost and coordination overhead
- keeps domain boundaries explicit
- aligns with a near-zero-cost launch goal
- allows later service extraction where usage proves it is needed

The right optimization is not "more services." It is "clear module seams plus operational simplicity."

For the first launch on `synphere.com`, the simplest deployable form is:

- one Next.js application deployed on Vercel
- one Supabase project for database, auth, storage, and realtime
- one transactional email provider
- optional add-on services only when limits are reached

## 2. Recommended Stack

### 2.1 Frontend

- **Next.js** web application deployed on **Vercel**
- **TypeScript**
- **React Server Components** for read-heavy pages
- **client-side realtime subscriptions** for Rooms and live updates
- **PWA support** for installability and future push readiness

### 2.2 Backend

- **Next.js Route Handlers and Server Actions** for the initial API surface
- **TypeScript domain modules** inside the same repository
- **Supabase Auth** for identity and session management
- **PostgreSQL SQL functions, row-level security, and views** where server-side data rules belong close to the database
- **Supabase Realtime** for Rooms presence, chat, and queue fan-out
- **Vercel Cron** for low-frequency daily maintenance jobs only

Synphere should not start with:

- a separate always-on API container
- a separate worker container
- a separate custom WebSocket server

### 2.3 Infrastructure

- **Supabase Postgres** as the source of truth
- **Supabase Storage** for user-uploaded media
- **Supabase Realtime** for presence and room synchronization
- **Vercel CDN and edge caching** for static assets and public pages
- **optional Upstash Redis/QStash** only if caching or queueing needs outgrow the zero-cost baseline

### 2.4 External Services

- Spotify Web API for provider integration
- Resend for transactional email
- PostHog for product analytics
- Cloudflare for domain registration and DNS
- optional dedicated error tracking only after built-in platform logs become insufficient

### 2.5 Zero-Cost Service Map

The initial recommended service stack is:

| Concern | Service | Why this is the default |
| --- | --- | --- |
| domain registration and DNS | Cloudflare Registrar + Cloudflare DNS | minimal recurring domain cost and free DNS |
| web app, SSR, API routes, CDN, custom domain | Vercel Hobby | simplest Next.js deployment path |
| database, auth, storage, realtime | Supabase Free | consolidates core backend services into one managed project |
| transactional email | Resend Free | simple API and enough headroom for early auth and notification traffic |
| analytics | PostHog Free | useful product analytics without building a data stack |
| cache or async queue, if later required | Upstash | adds Redis or queueing without running servers |

## 3. Monorepo Layout

An optimized repository layout should look like:

```text
apps/
  web/
packages/
  domain/
  ui/
  config/
  analytics/
```

This keeps the product in one codebase while matching the simplest deployment model: one application, one domain, one primary backend project.

If Synphere later outgrows this, an `api/` or `worker/` app can be extracted then, not before.

## 4. Domain Modules

The backend should still be organized into internal modules with strict ownership.

### 4.1 Identity Module

Owns:

- registration
- login
- password reset
- sessions
- account deletion
- auth audit logs

### 4.2 User Profile Module

Owns:

- profile data
- avatars and banners
- user preferences
- defining tracks

### 4.3 Social Graph Module

Owns:

- follows
- blocks
- counts
- social relationship queries

### 4.4 Music Catalog Module

Owns:

- provider adapters
- canonical music entity model
- artwork, previews, and provider links
- metadata normalization

### 4.5 Bubble Module

Owns:

- Bubble authoring
- captions and tags
- reposts
- comments
- saves
- content visibility

### 4.6 Feed Module

Owns:

- For You assembly
- Following and Trending feed generation
- ranking orchestration
- feed impression logging

### 4.7 Search Module

Owns:

- indexing
- query routing
- search ranking

### 4.8 Sphere Module

Owns:

- taste vector computation
- genre affinity aggregation
- Sphere snapshots and recompute jobs

### 4.9 Rooms Module

Owns:

- room lifecycle
- member presence
- queue management
- synchronized preview playback
- room moderation
- chat

### 4.10 Notification Module

Owns:

- in-app notifications
- email dispatch
- preference evaluation

### 4.11 Moderation Module

Owns:

- reports
- review queue
- enforcement actions
- admin tooling

## 5. Data and Control Flow

### 5.1 Request Path

1. Web client sends a request to `synphere.com` or to a Next.js route handler under `/api`.
2. The application authenticates the user through Supabase Auth.
3. The owning domain module reads or writes data in Supabase Postgres.
4. Lightweight derived updates happen inline or through SQL functions where possible.
5. Lower-priority maintenance work runs through daily cron, lazy expiration, or optional managed queueing only if needed later.

This preserves simplicity and avoids introducing a worker fleet before it is justified.

### 5.2 Real-Time Path

Rooms and selected live interactions should use Supabase Realtime rather than a self-managed socket service:

1. Client authenticates and subscribes to the Room's realtime channels.
2. Presence, chat messages, and queue changes are broadcast through Supabase Realtime.
3. Durable room state lives in Postgres tables.
4. Playback position is reconciled by timestamp and sequence number on clients.

This removes the need for a dedicated realtime gateway at launch while still supporting Rooms for a closed beta.

## 6. Music Provider Strategy

The provider layer is a critical design choice.

Synphere should define a common adapter contract for:

- search entities
- fetch entity details
- fetch representative preview track
- build deep links
- import top artists and tracks

This creates a stable internal model:

- `music_entity`
- `music_preview`
- `provider_account`

Only Spotify should be implemented for v1. The adapter interface should exist from the start so new providers do not force a schema rewrite.

## 7. Playback and Licensing Model

The system should not attempt to run synchronized full-song playback for public Rooms in v1.

Instead:

- all public content uses provider-approved previews where available
- Bubble playback defaults to the preview asset
- Rooms synchronize preview clips and queue transitions
- users can deep-link into their provider for full listening

This is the safest and most practical architecture for a discovery-first product.

## 8. Feed Architecture

The feed system should use a layered pipeline:

### 8.1 Candidate Generation

Candidates come from:

- followed users
- similar genres
- recent high-quality Bubbles
- saved or reposted content from adjacent taste clusters
- exploration pool

### 8.2 Feature Enrichment

Each candidate is enriched with:

- affinity score
- freshness
- engagement velocity
- author relationship
- content diversity markers
- negative feedback flags

### 8.3 Ranking

A hybrid scorer orders candidates and then applies rule-based constraints:

- no author overconcentration
- minimum novelty quota
- freshness floor
- blocked content removal
- visibility and safety filtering

## 9. Search Architecture

V1 search should live entirely inside Supabase Postgres using full-text search plus trigram indexes.

Move to a dedicated search engine only when one of these becomes true:

- query volume becomes operationally expensive
- ranking sophistication materially outgrows Postgres
- autocomplete latency becomes unacceptable

Do not add Algolia, Meilisearch, or Elasticsearch in v1.

## 10. Security Architecture

Core controls:

- strong password hashing through the managed auth provider
- secure session handling
- encrypted provider credentials
- row-level security for protected data access
- role-based admin access
- audit logs for sensitive changes
- rate limits on auth, search, posting, and room mutations

The moderation/admin surface must be isolated behind stricter permissions than standard user APIs.

## 11. Observability

Synphere should be observable by default.

Required signals:

- request latency and error rates by module
- provider API failure rates
- room connection counts and disconnect reasons
- feed generation latency
- moderation backlog
- storage and database usage trends

For the first launch, operational visibility can rely on:

- Vercel request and function logs
- Supabase database, auth, and realtime dashboards
- PostHog product analytics

Only add a dedicated error tracking vendor once native platform logs stop being enough.

## 12. Deployment Model

### 12.1 Initial Deployment

- `synphere.com` and `www.synphere.com` point to a single Vercel project
- Cloudflare manages the domain and DNS
- Next.js serves the product UI, SSR, and `/api/*` endpoints
- Supabase hosts Postgres, Auth, Storage, and Realtime
- Resend sends transactional emails

At this stage, Synphere should not use:

- a separate `api.synphere.com` service
- a paid Supabase custom domain
- an always-on worker
- a separate Redis cluster unless free-tier limits force it

### 12.2 Scaling Path

The first components likely to split out later are:

1. feed ranking workers or queue processors
2. a dedicated realtime layer if Supabase Realtime limits are reached
3. a dedicated search service if Postgres search becomes insufficient

These are natural extraction boundaries because they have distinct scaling behavior.

### 12.3 Domain Layout

The recommended first domain layout is:

- `synphere.com`: primary app and marketing surface
- `www.synphere.com`: redirect to `synphere.com`
- internal APIs: `https://synphere.com/api/*`

Avoid separate public subdomains until they solve a real problem. Every additional public domain adds DNS, auth, CORS, and cookie complexity.

### 12.4 Background Job Strategy

To preserve the no-cost objective:

- use Vercel Cron only for low-frequency daily jobs such as stale room cleanup, digest generation, or maintenance backfills
- use request-time checks and lazy expiration for room auto-close logic
- update Sphere affinity and feed-supporting counters inline on write where practical
- add Upstash QStash or another managed queue only when asynchronous fan-out becomes operationally necessary

This is important because Vercel Hobby cron is limited to daily execution, so the product must not depend on minute-level schedulers at launch.

## 13. Why Not Microservices on Day One

Early microservices would create:

- duplicated auth and observability concerns
- slower local development
- harder data consistency
- more DevOps burden than product value

Synphere should earn its service boundaries through load and team growth, not speculation.

## 14. Why Not Always-On Servers on Day One

Always-on API instances, workers, and socket servers would immediately work against the no-cost objective.

They would create:

- recurring infrastructure spend before product validation
- more operational surface area
- more deployment complexity for a small team
- pressure to over-design asynchronous workflows early

Synphere should start serverless and managed, then add persistent infrastructure only when usage makes it unavoidable.
