# Contributing to Synphere

## Principles

- keep changes small and well-scoped
- prefer clear technical reasoning over broad rewrites
- align implementation work with the specs in `docs/`
- do not commit secrets, production data, or private operational material

## Local Workflow

1. Create a branch from `main`.
2. Make focused changes.
3. Run the relevant checks locally.
4. Open a pull request with context, tradeoffs, and any follow-up work.

## Pull Request Expectations

Each pull request should include:

- a short summary of the change
- why the change is needed
- any product or architecture docs updated alongside it
- screenshots or recordings for UI work, if relevant

## Commit Schema

Synphere uses a Conventional Commits style schema:

```text
type(scope): short summary
```

Examples:

- `feat(web): add initial app shell`
- `docs(architecture): add microservice extraction roadmap`
- `fix(auth): prevent invalid session refresh loop`

Allowed `type` values:

- `feat`
- `fix`
- `docs`
- `refactor`
- `perf`
- `test`
- `build`
- `ci`
- `chore`
- `style`
- `revert`

Recommended `scope` values:

- `web`
- `domain`
- `ui`
- `config`
- `analytics`
- `docs`
- `infra`
- `auth`
- `feed`
- `rooms`
- `sphere`
- `search`

Rules:

- use lowercase for `type` and `scope`
- write the summary in the imperative mood
- keep the subject line concise
- use `!` for breaking changes, for example: `feat(api)!: change feed response shape`
- add a body when the reasoning is not obvious
- add footer lines for references or breaking-change notes when needed

## Security and Privacy

- never commit real environment files
- never commit real user data
- never commit provider credentials or service tokens
- report security issues through the private path in `SECURITY.md`

## Discussion

Architecture changes, schema changes, or product-scope changes should reference the relevant document in `docs/` before implementation lands.
