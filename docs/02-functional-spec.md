# Synphere Functional Spec

## 1. Functional Requirements

Requirement priority uses:

- `P0`: required for first public release
- `P1`: important but can land after beta
- `P2`: future enhancement

## 1.1 Identity and Accounts

### AUTH-001 `P0`

The system shall allow users to register with email, username, display name, date of birth, and password.

### AUTH-002 `P0`

The system shall authenticate users using secure session-based or token-based authentication with refresh support.

### AUTH-003 `P0`

The system shall support password reset via verified email flow.

### AUTH-004 `P0`

The system shall allow users to edit profile data including display name, username, bio, avatar, banner image, and profile visibility settings.

### AUTH-005 `P0`

The system shall allow users to permanently delete their account and queue deletion of associated personal data according to retention policy.

### AUTH-006 `P1`

The system shall support multi-factor authentication for users who opt in and require it for administrator accounts.

## 1.2 Music Provider Integration

### INTEG-001 `P0`

The system shall allow a user to link one Spotify account through OAuth.

### INTEG-002 `P0`

The system shall import the linked account's top artists, top tracks, and available genre signals to improve onboarding and recommendation quality.

### INTEG-003 `P0`

The system shall store provider entity IDs, artwork metadata, preview URLs when available, and deep links for provider handoff.

### INTEG-004 `P1`

The system shall expose a provider adapter layer so additional services can be added without changing Bubble, feed, or room domain models.

## 1.3 Onboarding and Taste Capture

### ONBOARD-001 `P0`

The system shall ask new users to select favorite genres, moods, and artists during onboarding.

### ONBOARD-002 `P0`

The system shall seed each new user with an initial Sphere affinity profile and an initial For You feed based on onboarding signals and global content quality.

### ONBOARD-003 `P0`

The system shall encourage the user to create, like, save, or follow within the first session.

## 1.4 Bubble Creation and Content

### BUBBLE-001 `P0`

The system shall allow users to create a Bubble tied to a track, album, artist, or playlist.

### BUBBLE-002 `P0`

Every Bubble shall contain a single canonical music entity reference and a representative preview track selected automatically or chosen by the user if multiple tracks are available.

### BUBBLE-003 `P0`

The system shall allow users to add a caption and tags to a Bubble before publishing.

### BUBBLE-004 `P0`

The system shall support Bubble visibility levels of public, followers-only, and private draft.

### BUBBLE-005 `P0`

The system shall allow users to edit or delete their own Bubbles.

### BUBBLE-006 `P1`

The system shall allow replies that attach another music entity in addition to text.

### BUBBLE-007 `P1`

The system shall support multi-item editorial Bubble collections while preserving a single primary entity for ranking and preview.

## 1.5 Feed and Discovery

### FEED-001 `P0`

The system shall provide three main feed tabs: For You, Following, and Trending.

### FEED-002 `P0`

The For You feed shall rank Bubbles using a hybrid score that combines user preference affinity, follows, recent interactions, recency, diversity, and global quality.

### FEED-003 `P0`

The Following feed shall show recent Bubbles and reposts from followed users in reverse chronological order with light relevance boosts for high-engagement content.

### FEED-004 `P0`

The Trending feed shall surface globally rising Bubbles over configurable time windows.

### FEED-005 `P0`

Feeds shall support cursor pagination and impression logging.

### FEED-006 `P0`

The system shall support an auto-scroll mode in which previews advance automatically with smooth transitions and manual skip controls.

### FEED-007 `P1`

The system shall create daily recommendation sets derived from the same ranking signals, but with stronger novelty weighting.

## 1.6 Social Graph and Engagement

### SOCIAL-001 `P0`

The system shall allow users to follow and unfollow other users.

### SOCIAL-002 `P0`

The system shall allow users to like, repost, comment on, and save Bubbles.

### SOCIAL-003 `P0`

The system shall allow users to block other users. Blocking shall remove mutual discoverability in feeds, profiles, comments, and rooms where applicable.

### SOCIAL-004 `P0`

The system shall update downstream ranking and notification systems when a social action occurs.

### SOCIAL-005 `P1`

The system shall allow users to maintain a close-friends or special-users list for notification prioritization.

## 1.7 Profiles and Sphere

### PROFILE-001 `P0`

The system shall provide public user profiles with avatar, banner, display name, bio, counts, recent Bubbles, and representative tracks.

### PROFILE-002 `P0`

The system shall provide a Sphere view showing the user's weighted genre profile as an interactive floating visualization.

### PROFILE-003 `P0`

Selecting a genre node in the Sphere shall open related Bubbles, artists, and tracks associated with that user and genre.

### PROFILE-004 `P1`

The system shall allow a user to pin defining songs or artists on their profile.

## 1.8 Search

### SEARCH-001 `P0`

The system shall support unified search across users, Bubbles, artists, tracks, playlists, and tags.

### SEARCH-002 `P0`

Search results shall support prefix matching, fuzzy matching, and ranking by type-specific relevance.

### SEARCH-003 `P1`

The system shall support discovery browse pages by genre, mood, and trend window.

## 1.9 Rooms

### ROOM-001 `P0`

The system shall allow users to create public or private Rooms with one or more genre or mood tags.

### ROOM-002 `P0`

The system shall seed a newly created Room with an initial queue of recommended tracks based on room tags.

### ROOM-003 `P0`

The system shall allow members to add tracks to the queue. User-added tracks must be appended to a user queue that takes priority over the seed queue after the current track finishes.

### ROOM-004 `P0`

The system shall synchronize room state including active preview, queue order, playback position, member list, and chat events for connected clients.

### ROOM-005 `P0`

The room creator shall be the initial moderator and shall be able to assign additional moderators.

### ROOM-006 `P0`

Moderators shall be able to remove users, mute chat, lock the queue, and close the Room.

### ROOM-007 `P0`

The system shall automatically close a Room after 60 minutes with no connected members.

### ROOM-008 `P1`

The system shall allow invitation-based private Rooms and reusable room templates.

## 1.10 Notifications

### NOTIF-001 `P0`

The system shall maintain an in-app notification center.

### NOTIF-002 `P0`

The system shall notify users about follows, likes, reposts, comments, mentions, room invitations, and moderation events.

### NOTIF-003 `P0`

The system shall send email notifications for critical account and safety events.

### NOTIF-004 `P1`

The system shall support web push notifications for opted-in users.

### NOTIF-005 `P1`

The system shall allow users to configure notification preferences by category.

## 1.11 Moderation and Administration

### MOD-001 `P0`

The system shall allow users to report Bubbles, comments, profiles, and Rooms.

### MOD-002 `P0`

The system shall provide an admin review queue for reported entities.

### MOD-003 `P0`

The system shall maintain an audit log for authentication events, moderation actions, and sensitive administrative changes.

### MOD-004 `P1`

The system shall support policy-driven temporary restrictions such as posting cooldowns or room creation limits.

## 2. Non-Functional Requirements

## 2.1 Performance

### PERF-001

95% of API requests shall complete within 400 ms at steady-state load, excluding external provider latency.

### PERF-002

The initial web experience shall target:

- Largest Contentful Paint under 2.5 seconds on a mid-range mobile device over a 4G connection
- Time to Interactive under 3.5 seconds on the same profile

### PERF-003

Feed pagination requests shall return within 700 ms at p95 for warm paths.

### PERF-004

Like, save, repost, and follow actions shall acknowledge within 250 ms at p95.

## 2.2 Scalability

### SCALE-001

The first public architecture shall support at least 5,000 concurrently active sessions and scale horizontally without a redesign of domain boundaries.

### SCALE-002

The system shall support bursty traffic from feed reads and room join events through indexed database reads, CDN caching, and optional managed cache or queue services only when free-tier limits are reached.

## 2.3 Reliability

### REL-001

The service shall target 99.9% monthly availability excluding planned maintenance.

### REL-002

Critical asynchronous workflows shall use idempotent, serverless-safe patterns such as PostgreSQL outbox rows, database functions, lazy expiration, or managed queues only when the simpler path is no longer sufficient.

### REL-003

Backups for primary relational data shall run daily with tested restoration procedures.

## 2.4 Security

### SEC-001

Sensitive data shall be encrypted in transit and at rest.

### SEC-002

Passwords shall be stored using a modern adaptive hashing algorithm.

### SEC-003

OAuth tokens and provider refresh credentials shall be stored securely with rotation support.

### SEC-004

The system shall enforce role-based access for administrative capabilities.

### SEC-005

The system shall support rate limiting, bot protection, and abuse detection on auth, feed mutation, and room actions.

## 2.5 Privacy and Compliance

### PRIV-001

The system shall provide users with controls to delete their account and export core personal data.

### PRIV-002

The system shall store only the provider data needed for functionality, not full provider libraries when unnecessary.

### PRIV-003

The product shall clearly disclose how provider-linked data influences recommendations and the Sphere.

## 2.6 Accessibility and Usability

### UX-001

The web client shall target WCAG 2.1 AA conformance.

### UX-002

Audio previews, animated Sphere interactions, and auto-scroll mode shall expose accessible controls and reduced-motion behavior.

### UX-003

New users shall be able to complete onboarding and play a first preview within 5 minutes without outside help.

## 2.7 Observability

### OBS-001

All services shall emit structured logs, metrics, and traces with correlation IDs.

### OBS-002

The system shall monitor room connection health, feed latency, provider API failures, queue depth, and moderation backlog.

## 2.8 Cost and Operational Simplicity

### COST-001

The launch architecture shall avoid mandatory recurring infrastructure cost beyond domain registration, assuming usage remains within free-tier limits.

### COST-002

The launch architecture shall avoid always-on compute. Runtime logic shall execute through serverless functions, managed database features, realtime subscriptions, or request-time evaluation.

### COST-003

The launch architecture shall prefer a single public application domain at `synphere.com` and shall avoid paid backend custom-domain add-ons unless they provide clear product or compliance value.
