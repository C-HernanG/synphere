# Synphere

Synphere is an open source social music discovery platform where people share tracks through Bubbles, explore their evolving taste Sphere, and join real-time listening Rooms.

## Status

This repository is the primary project scaffold. The product specification lives in [`docs/`](./docs), and the initial application workspace is under [`apps/web`](./apps/web).

The legacy prototype in `synphere-temp-page/` is intentionally excluded from the new root git repository so the product can move forward on a clean foundation.

## Repository Layout

```text
apps/
  web/               Next.js application
packages/
  analytics/         Shared event names and analytics contracts
  config/            Project-wide configuration helpers
  domain/            Core product constants and domain types
  ui/                Shared design tokens and UI primitives
supabase/
  migrations/        Database migration placeholders
  seed/              Local seed-data placeholders
docs/                Product, architecture, and delivery specs
scripts/             Bootstrap and maintenance script placeholders
assets/              Brand assets and static source materials
```

## Getting Started

1. Copy `.env.example` to `.env.local` inside `apps/web` or use your preferred environment loading strategy.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the web app:

   ```bash
   npm run dev
   ```

## Workspace Scripts

- `npm run dev`: start the Next.js app in `apps/web`
- `npm run build`: build the Next.js app
- `npm run typecheck`: run TypeScript checks for the web app

## Documentation

- [Specification index](./docs/README.md)
- [Product spec](./docs/01-product-spec.md)
- [Architecture](./docs/03-system-architecture.md)
- [Serverless deployment](./docs/06-serverless-deployment.md)
- [Open source strategy](./docs/07-open-source-strategy.md)
- [Commit schema](./docs/09-commit-schema.md)

## Open Source

The intended open-source model is documented in [`docs/07-open-source-strategy.md`](./docs/07-open-source-strategy.md). The repository is being scaffolded around an AGPL-3.0-oriented public codebase with a private hosted-service model.
