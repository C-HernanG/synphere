# Synphere Delivery Roadmap

## 1. Delivery Strategy

Synphere should be shipped in controlled phases. The goal is to validate the discovery loop first, then deepen the social and real-time layers.

The wrong approach would be to build every idea before launch. The optimized approach is to ship the smallest version that still feels unmistakably like Synphere.

The delivery plan also assumes a **serverless, near-zero-cost launch**. The only unavoidable recurring cost at the beginning should be the `synphere.com` domain itself.

## 2. Recommended Release Phases

### Phase 0: Foundation

Duration: 3 to 4 weeks

Goals:

- establish monorepo structure
- connect `synphere.com` through Cloudflare DNS to a Vercel project
- implement authentication and profile foundations
- provision a Supabase project for Postgres, Auth, Storage, and Realtime
- define provider adapter contract
- build design system primitives for feed, Bubble, profile, and Room
- configure observability, CI, and environments

Exit criteria:

- users can sign up and manage a profile
- Spotify OAuth linking works in a test environment
- `synphere.com` resolves to the deployed web app
- core domain schemas are stable
- the stack runs within free-tier limits except for domain registration

### Phase 1: Discovery Core

Duration: 5 to 7 weeks

Goals:

- onboarding and taste capture
- Bubble creation and publication
- For You, Following, and Trending feeds
- likes, saves, reposts, comments
- search
- first version of Sphere
- keep all discovery features inside the Vercel + Supabase baseline with no added paid services

Exit criteria:

- a new user can complete onboarding, preview content, and publish a Bubble
- feed ranking works with basic hybrid scoring
- Sphere updates from real user actions

### Phase 2: Rooms and Notifications

Duration: 4 to 6 weeks

Goals:

- public and private Rooms
- synchronized preview playback
- room queueing and moderation
- in-app notifications
- reporting and admin moderation flows

Implementation note:

- room expiration should be enforced by lazy checks plus a daily cron, not by a dedicated always-on scheduler

Exit criteria:

- users can create and join Rooms reliably
- queue behavior is deterministic
- reports reach an actionable admin queue

### Phase 3: Beta Hardening

Duration: 3 to 4 weeks

Goals:

- performance tuning
- abuse protection
- feed iteration from analytics
- accessibility improvements
- onboarding optimization

Exit criteria:

- p95 latency and client performance targets are met
- moderation and analytics dashboards are usable
- beta cohort can be expanded safely

### Phase 4: Growth Features

Duration: after product-market signal

Candidate additions:

- Vercel Pro or an alternative commercial-ready app host
- Supabase Pro
- Apple Music adapter
- richer profile identity surfaces
- push notifications
- collaborative playlist export
- advanced recommendation models

## 3. MVP Definition

Synphere's MVP is complete when all of the following are true:

- a user can sign up, link Spotify, and complete onboarding
- a user can publish a Bubble tied to a music entity
- a user can browse a working For You feed and interact with Bubbles
- a user can view a meaningful Sphere
- a user can create or join a Room and hear synchronized previews
- moderation and reporting exist well enough to operate a closed beta

If any of those are missing, the product is still a prototype rather than an MVP.

## 4. Team Recommendation

Lean but practical team:

- 1 product designer
- 2 full-stack engineers
- 1 backend or platform-focused engineer
- 1 part-time product owner or founder operator

If staffing is smaller than that, Rooms should slip behind feed and Sphere rather than compromising the core discovery loop.

If budget is also constrained, avoid adding new vendors before validating retention. Complexity and cost tend to arrive together.

## 5. Major Risks and Mitigations

### 5.1 Provider Dependency

Risk:

- Spotify API limits, metadata gaps, or preview coverage may constrain UX

Mitigation:

- adapter abstraction
- graceful fallbacks for missing previews
- provider handoff as a first-class action

### 5.2 Recommendation Cold Start

Risk:

- early feeds may feel generic before there is enough interaction data

Mitigation:

- strong onboarding
- curated seed pools
- exploration slot guarantees

### 5.3 Real-Time Operational Complexity

Risk:

- Rooms can create stability problems if over-engineered

Mitigation:

- preview synchronization only
- single managed realtime layer
- deterministic queue rules

### 5.4 Moderation Load

Risk:

- user-generated content and live chat invite abuse

Mitigation:

- reporting at launch
- moderator tools in Rooms
- admin review queue and audit logs

## 6. KPI Checkpoints

The team should review these checkpoints after each phase:

- onboarding completion rate
- first-session interaction rate
- Bubble creation per active user
- save rate
- provider handoff click-through
- Room participation rate
- day-7 retention

If retention is weak, the team should improve recommendation quality and content supply before expanding feature breadth.

## 7. Technical Milestones

Milestones should be tracked in this order:

1. domain and deployment foundation on Cloudflare, Vercel, and Supabase
2. auth foundation and provider linking
3. canonical music entity ingestion
4. Bubble publication and feed delivery
5. interaction events and Sphere computation
6. Rooms realtime engine
7. moderation and analytics hardening

This order minimizes rework because each later milestone depends on the earlier data model.

## 8. Go-To-Beta Criteria

Synphere should not open beta broadly until:

- account creation, posting, and feed stability are reliable
- average preview playback works across major browsers
- moderation queue and block/report flows are operational
- top crash and latency issues are resolved
- the team has instrumentation for activation and retention funnels
- free-tier operational limits and upgrade thresholds are understood before opening traffic broadly
