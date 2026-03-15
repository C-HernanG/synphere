# Synphere Commit Schema

## 1. Goal

Synphere should keep a readable, machine-friendly commit history.

The repository uses a **Conventional Commits-style schema** so commits are:

- easy to scan
- easy to group in changelogs
- clear about intent
- consistent across contributors

## 2. Format

Use this format:

```text
type(scope): short summary
```

Breaking changes use:

```text
type(scope)!: short summary
```

## 3. Allowed Types

- `feat`: new user-facing or developer-facing functionality
- `fix`: bug fix or regression fix
- `docs`: documentation-only change
- `refactor`: code change without a behavior change goal
- `perf`: performance improvement
- `test`: test additions or test-only changes
- `build`: package, tooling, dependency, or build-system change
- `ci`: CI pipeline or automation change
- `chore`: repository maintenance that does not fit another category
- `style`: formatting-only change with no logic impact
- `revert`: revert of a previous commit

## 4. Recommended Scopes

Use the most relevant scope for the change:

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

If a change spans several areas, use the dominant scope or omit the scope if that reads more clearly.

## 5. Writing Rules

- keep `type` and `scope` lowercase
- write the subject in the imperative mood
- do not end the subject with a period
- keep the subject concise
- use a body when the reason is not obvious from the diff
- add footer lines for issue references or breaking changes when relevant

## 6. Examples

Good examples:

- `feat(web): add initial app shell`
- `docs(architecture): add serverless deployment plan`
- `fix(auth): prevent invalid refresh token loop`
- `refactor(feed): isolate ranking feature mapping`
- `ci(infra): add build and typecheck workflow`
- `feat(api)!: change bubble payload contract`

Bad examples:

- `update stuff`
- `WIP`
- `changes`
- `fixed bug`
- `Feat(Web): Added homepage.`

## 7. Body and Footer

Recommended extended structure:

```text
type(scope): short summary

Explain why the change exists, what constraints shaped it, and any
important tradeoffs if they are not obvious.

Refs: #123
BREAKING CHANGE: describe the incompatible behavior change
```

## 8. Practical Guidance

- one commit should represent one coherent change
- avoid mixing scaffolding, refactors, and unrelated docs in the same commit when possible
- if a commit is only documentation, use `docs(...)`
- if a commit changes deployment or repository automation, prefer `build(...)`, `ci(...)`, or `infra` as the scope

## 9. Initial Repository Convention

Until more tooling is added, the schema is enforced by team convention rather than automated commit linting.

The repository includes a reusable template in [`/.gitmessage`](/Users/chernang/Dev/synphere/.gitmessage) to make the format easy to follow.
