# Synphere Microservice Extraction Roadmap

## 1. Purpose

This document defines **when** Synphere should split parts of the system into microservices and **when it should not**.

The default position is:

- keep Synphere as a modular monolith in code
- keep deployment simple for as long as possible
- extract services only when a boundary is already expensive to keep inside the main application

Microservices are a scaling tool, not a starting posture.

## 2. Decision Rule

A module should be extracted only when **all** of the following are true:

- its domain boundary is already clear in the codebase
- it has runtime behavior meaningfully different from the rest of the app
- keeping it in the monolith is creating measurable cost, reliability, or delivery pain
- the team can define stable interfaces and ownership for it

If those conditions are not met, keep it in the monolith.

## 3. Good Reasons To Extract

Microservice extraction is justified when one or more of these become true:

- one subsystem needs very different scaling characteristics
- one subsystem needs a different deployment cadence or rollback policy
- one subsystem is causing a disproportionate share of incidents
- request-time behavior is becoming too slow because of heavy asynchronous work
- the module boundary is stable enough to expose a clean contract
- team ownership would clearly improve if the component had its own deployment unit

## 4. Bad Reasons To Extract

Do not split services because:

- microservices feel more modern
- the architecture looks more impressive on paper
- future scale is imagined but not observed
- the current team is too small to justify service ownership overhead
- the boundary is still changing every week

These are the most common ways a startup burns time on infrastructure before proving the product.

## 5. Extraction Readiness Checklist

Before extracting any service, validate:

- API contract is defined and documented
- data ownership is clear
- failure modes are understood
- observability exists for the current in-process module
- deployment and rollback plan exists
- idempotency strategy exists if asynchronous events are involved
- authentication and authorization model is defined across the boundary
- local development remains usable after the split

If any of those are weak, the boundary is probably not ready.

## 6. Recommended Extraction Order

For Synphere, the most likely extraction order is:

1. async jobs / worker service
2. realtime Rooms service
3. search service
4. feed ranking service
5. dedicated public API service, only if needed later

This order is based on runtime differences, not on abstract architecture purity.

## 7. First Extraction: Async Jobs / Worker Service

This is the most likely first service because asynchronous work naturally diverges from request-response traffic.

### 7.1 What It Would Own

- notification fan-out
- provider imports and refresh jobs
- feed-supporting materialization jobs
- Sphere recomputation jobs
- moderation backfill or cleanup tasks
- digest generation and maintenance tasks

### 7.2 Extraction Triggers

Extract an `apps/worker` service when:

- user writes are getting slower because too much derived work happens inline
- daily cron is no longer enough for operational workloads
- retries and background failures need better isolation
- queue depth and job latency become first-class operational metrics
- background processing needs different scaling than web traffic

### 7.3 Keep It In The Monolith While

- derived writes are still cheap
- cron plus lazy expiration is enough
- retries are rare and manageable
- background logic still changes frequently

## 8. Second Extraction: Realtime Rooms Service

Rooms are the next likely candidate because realtime traffic behaves differently from normal web requests.

### 8.1 What It Would Own

- room presence
- room chat fan-out
- queue synchronization
- playback state authority
- room moderation event flow

### 8.2 Extraction Triggers

Extract a dedicated realtime service when:

- Supabase Realtime limits are consistently reached
- room concurrency grows faster than the rest of the product
- message rates require tighter control over transport and fan-out
- playback drift or room-state consistency becomes a major product problem
- room-specific incidents need their own operational boundary

### 8.3 Keep It In The Monolith / Managed Stack While

- Rooms are still closed-beta sized
- Supabase Realtime handles usage comfortably
- state reconciliation is simple
- the product is still validating whether Rooms are a core retention driver

## 9. Third Extraction: Search Service

Search should remain inside Postgres until evidence shows it no longer belongs there.

### 9.1 What It Would Own

- indexing pipelines
- autocomplete
- cross-entity ranking
- search-specific caches

### 9.2 Extraction Triggers

Extract search when:

- query latency is no longer acceptable
- autocomplete quality or speed is limited by the relational path
- indexing frequency becomes operationally heavy
- search relevance needs specialized tooling beyond SQL ranking

### 9.3 Keep It In The Monolith While

- Postgres full-text and trigram search remain fast enough
- the search feature set is still basic
- index refresh cost is low

## 10. Fourth Extraction: Feed Ranking Service

Feed ranking should be extracted later, not early.

### 10.1 What It Would Own

- candidate generation jobs
- feature enrichment pipelines
- heavier ranking models
- experimentation and ranking configuration

### 10.2 Extraction Triggers

Extract feed ranking when:

- ranking becomes computationally heavy enough to hurt app performance
- experimentation requires isolated pipelines and rollback
- ranking models need their own release lifecycle
- candidate generation or feature pipelines become substantial systems on their own

### 10.3 Keep It In The Monolith While

- ranking is still a mostly SQL plus application-logic problem
- feature definitions change frequently
- there is not yet enough data to justify a separate ranking platform

## 11. When To Consider a Dedicated API Service

A dedicated `apps/api` service should not be one of the first extractions.

It is justified only when:

- multiple clients need a stable independent backend surface
- deployment separation from the web app creates real value
- server actions and route handlers are becoming an organizational bottleneck
- auth, rate limiting, and versioning requirements justify a separate boundary

Until then, Next.js route handlers inside the main app are simpler and cheaper.

## 12. Data Ownership Rules After Extraction

When services are extracted:

- each service must have a clearly owned subset of data or behavior
- avoid bidirectional write dependencies
- prefer event publication over cross-service transactional coupling
- define explicit idempotency and retry behavior

Do not extract services that still require constant synchronous cross-calls just to complete basic user actions.

## 13. Service Boundaries To Avoid Early

Avoid these early splits:

- auth service
- user profile service
- social graph service
- moderation service

These remain too tightly connected to core product behavior early on, and splitting them too soon usually adds complexity without reducing risk.

## 14. Observable Triggers

Use measurable triggers instead of intuition.

Examples:

- p95 write latency increases because of inline fan-out
- room traffic becomes the dominant source of operational incidents
- search p95 latency remains above target even after indexing improvements
- ranking jobs require their own resource profile or queue depth management
- deploys to one subsystem are blocked by unrelated changes in the main app

If there is no measurable pain, there is usually no extraction case.

## 15. Repository Evolution Path

The expected repository evolution is:

### Phase A

- `apps/web`
- `packages/*`
- `supabase/`

### Phase B

- add `apps/worker`

### Phase C

- add `apps/realtime` or equivalent realtime service if needed

### Phase D

- add `apps/search` or a search integration layer if needed

### Phase E

- add `apps/api` only if separate backend deployment becomes justified

This keeps the repository aligned with actual product maturity.

## 16. Final Rule

Synphere should not become a microservice system because it was planned that way.

It should become one only when:

- a specific subsystem is clearly mature
- its runtime needs are clearly different
- the current monolith boundary is demonstrably too expensive

Until then, the correct architecture is a disciplined modular monolith.
