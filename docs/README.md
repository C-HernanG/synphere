# Synphere Specification

This directory contains the rewritten project specification for Synphere.

The original notes describe a compelling product, but they assume too much complexity too early, especially around microservices, multi-provider playback, and real-time streaming. This spec keeps the core identity of Synphere while optimizing for:

- a distinct user experience centered on music discovery, identity, and community
- a legally safer playback model based on previews and provider deep links
- a faster delivery path using a modular monolith with clean extraction boundaries
- a serverless-first runtime that can start on free tiers
- a realistic v1 scope that can ship, learn, and scale

## Product Thesis

Synphere is a web-first social music discovery platform built around three signature experiences:

- **Bubbles**: music-rich social posts tied to tracks, albums, artists, or playlists
- **Sphere**: a living visualization of each user's taste graph
- **Rooms**: lightweight real-time listening spaces organized around genres, moods, or communities

The product is optimized for discovery, not passive consumption. Users should find music through people, context, and shared taste rather than endless generic feeds.

## Core Product Decisions

### 1. Start with one provider, not many

V1 should launch with **Spotify only** through an adapter-based integration layer. Apple Music, SoundCloud, and other providers remain supported by architecture, but they should not block the first release.

### 2. Use preview playback, not full-track synchronized streaming

Synphere should use 30-second previews plus deep links to the provider for full playback. This preserves the discovery model, reduces legal and technical risk, and makes public content accessible even to users without a linked provider account.

### 3. Build a modular monolith first

The original idea assumes microservices from day one. That is unnecessary overhead for an early-stage product. Synphere should start as a **TypeScript modular monolith** with:

- explicit domain modules
- serverless route handlers and managed backend services
- request-time or database-driven derived updates
- clear service extraction boundaries

This gives most of the benefits of microservices without the operational drag.

### 4. Let the recommendation system evolve

V1 should use a hybrid ranker based on follows, explicit preferences, interactions, freshness, and diversity. Advanced embeddings and heavier AI ranking can be added once there is enough behavioral data.

### 5. Optimize for near-zero operating cost

Synphere should launch with a **serverless, free-tier-first** deployment model. The only unavoidable recurring cost at the very beginning should be the `synphere.com` domain registration itself.

That means:

- a single web deployment instead of separate app and API services
- managed Postgres/Auth/Storage/Realtime instead of self-managed infrastructure
- no always-on workers
- no paid custom backend domains unless they become operationally necessary

## Document Map

- [01-product-spec.md](./01-product-spec.md): product vision, users, scope, UX principles, success metrics
- [02-functional-spec.md](./02-functional-spec.md): detailed functional and non-functional requirements
- [03-system-architecture.md](./03-system-architecture.md): target technical architecture and deployment model
- [04-data-model-and-ranking.md](./04-data-model-and-ranking.md): core entities, events, feed logic, sphere logic, room queueing
- [05-delivery-roadmap.md](./05-delivery-roadmap.md): phased delivery plan, risks, and milestones
- [06-serverless-deployment.md](./06-serverless-deployment.md): concrete service choices, domain layout, free-tier assumptions, and upgrade triggers
- [07-open-source-strategy.md](./07-open-source-strategy.md): public-repo policy, license choice, and what must stay private
- [08-microservice-extraction-roadmap.md](./08-microservice-extraction-roadmap.md): when to split services, extraction order, and readiness criteria
- [09-commit-schema.md](./09-commit-schema.md): commit message convention and examples for repository history

## What This Spec Intentionally Defers

The following ideas are valid, but should not be part of v1:

- native iOS and Android apps
- true synchronized full-song playback across users
- launching with more than one streaming provider
- direct messages
- creator monetization
- multi-bubble editorial publishing
- advanced AI-only recommendation strategies

Those features become much more valuable after the core discovery loop is proven.
