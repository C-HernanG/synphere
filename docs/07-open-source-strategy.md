# Synphere Open Source Strategy

## 1. Decision

Synphere should use an **open source codebase with a private hosted service model**.

That means:

- the application code, documentation, schema, and deployment scaffolding are public
- the production service at `synphere.com` remains the official hosted product
- production data, secrets, moderation operations, and internal business material remain private

For the initial launch, the default license should be **AGPL-3.0**.

## 2. Why AGPL-3.0

AGPL-3.0 is the best fit for Synphere because:

- Synphere is a hosted social product, not just a library
- the main clone risk is a closed hosted fork, not a packaged redistribution
- the code can remain public without giving away the right to run a private SaaS fork with no reciprocity

If Synphere later decides that maximum adoption matters more than anti-clone protection, the project can reconsider **Apache-2.0**. That is not the recommended default.

## 3. Open Source Boundary

The public repository should contain everything needed to understand, build, run, and contribute to Synphere in a development or self-hosted environment.

The public repository should **not** contain anything that exposes users, secrets, internal enforcement operations, or private business context.

## 4. What To Include In The Public Repository

The open source repo should include:

- the web application source code
- backend and domain logic
- database schema and migrations
- seed data for local development
- infrastructure and deployment configuration for local or staging use
- API contracts and integration adapters
- tests
- design system components
- product documentation and architecture documentation
- contribution guides, issue templates, and security policy
- `.env.example` files with placeholder values only
- scripts for local setup and bootstrap

## 5. What Must Not Be In The Public Repository

The open source repo must not include:

- real `.env` files
- API keys, OAuth secrets, signing keys, or service-account credentials
- production database dumps
- production analytics exports
- backups or internal logs from `synphere.com`
- user-uploaded production media
- moderation evidence archives
- internal abuse-detection rules, high-signal blocklists, or internal trust-and-safety playbooks
- private legal agreements, partnership documents, or commercial negotiations
- copyrighted third-party assets that Synphere does not have the right to redistribute
- internal admin-only dashboards or operational access credentials

## 6. Recommended Public Repository Contents

The public repo should eventually look like this:

```text
apps/
  web/
packages/
  domain/
  ui/
  config/
  analytics/
supabase/
  migrations/
  seed/
docs/
scripts/
.github/
LICENSE
README.md
CONTRIBUTING.md
CODE_OF_CONDUCT.md
SECURITY.md
.env.example
```

This structure is enough for contributors and self-hosters without exposing production internals.

## 7. Repo Hygiene Rules

To keep the public repository safe:

- commit only placeholder environment files
- use local seed data only, never real user exports
- scrub screenshots before publishing if they include real accounts or private metrics
- keep production-only admin tooling behind private repositories or private deployment modules
- use secret scanning in GitHub
- rotate any secret immediately if it is ever committed by mistake

## 8. What Can Be Public But Should Be Sanitized

These can live in the public repo, but only in sanitized form:

- example playlists
- demo screenshots
- analytics event schemas
- moderation workflow definitions
- fixture data for feeds, rooms, and profiles

Sanitized means no real user identifiers, no production URLs with tokens, and no confidential partner metadata.

## 9. Hosted Service vs Open Source Project

The open source repository and the hosted Synphere service should be treated as related but different things.

The open source project provides:

- the code
- the technical roadmap
- community contribution surface
- self-hosting capability

The hosted service provides:

- the official network
- the official moderation layer
- the official production deployment
- the official product data and community graph

The real moat of Synphere should be the network, execution quality, and product experience, not secrecy around application code.

## 10. Contribution Model

Synphere should keep contribution overhead low.

Recommended defaults:

- public issues and pull requests
- maintainer review required for architectural changes
- DCO sign-off instead of a heavy CLA, unless legal needs change later
- `SECURITY.md` with a private vulnerability reporting path
- clear labels for `good first issue`, `needs discussion`, and `breaking change`

## 11. Release Policy

The public repo should publish:

- tagged releases
- migration notes
- deployment notes for self-hosters
- changelogs for breaking changes

The hosted service at `synphere.com` may run the same codebase with:

- private environment configuration
- private moderation tooling
- private operational dashboards
- private analytics and production data

## 12. Third-Party Services and Open Source Limits

Synphere can be open source even if it uses hosted third-party services.

That means the repo may include integrations for:

- Vercel
- Supabase
- Spotify
- Resend
- PostHog

But it should not expose:

- provider secrets
- production project IDs unless they are intentionally public
- production callback secrets
- internal billing or quota dashboards

## 13. Practical Rule Of Thumb

If a file answers any of these questions with "yes", it should not be public:

- does it expose a secret?
- does it expose a real user?
- does it expose internal enforcement logic that attackers could exploit?
- does it expose private business information?
- does it contain third-party material that cannot legally be redistributed?

If none of those are true, it is usually a good candidate for the public repo.
