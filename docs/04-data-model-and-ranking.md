# Synphere Data Model and Ranking

## 1. Core Domain Model

The data model should center on users, music entities, Bubbles, interactions, and Rooms.

### 1.1 Primary Entities

### User

Represents a person using Synphere.

Key fields:

- `id`
- `email`
- `username`
- `display_name`
- `birthdate`
- `bio`
- `avatar_url`
- `banner_url`
- `status`
- `created_at`

### ProviderAccount

Stores a linked streaming provider account.

Key fields:

- `id`
- `user_id`
- `provider`
- `provider_user_id`
- `access_token_ref`
- `refresh_token_ref`
- `linked_at`
- `scopes`

### MusicEntity

Canonical representation of a shareable music object.

Key fields:

- `id`
- `provider`
- `provider_entity_id`
- `entity_type` (`track`, `album`, `artist`, `playlist`)
- `title`
- `subtitle`
- `artwork_url`
- `canonical_genres`
- `metadata_json`

### MusicPreview

Represents a playable preview asset.

Key fields:

- `id`
- `music_entity_id`
- `provider`
- `source_url`
- `duration_ms`
- `preview_track_entity_id`
- `availability_status`

### Bubble

Primary content object.

Key fields:

- `id`
- `author_id`
- `music_entity_id`
- `preview_id`
- `caption`
- `visibility`
- `language`
- `created_at`
- `deleted_at`

### BubbleTag

Normalized or custom tags attached to a Bubble.

Key fields:

- `bubble_id`
- `tag_type`
- `tag_value`

### Interaction

User actions on Bubbles.

Key fields:

- `id`
- `actor_id`
- `bubble_id`
- `interaction_type` (`like`, `save`, `repost`)
- `created_at`

### Comment

Text reply on a Bubble, with optional attached music entity in later phases.

Key fields:

- `id`
- `bubble_id`
- `author_id`
- `body`
- `attached_music_entity_id`
- `created_at`

### FollowEdge

Represents a directional follow relationship.

Key fields:

- `follower_id`
- `followed_id`
- `created_at`

### BlockEdge

Represents a directional block relationship.

Key fields:

- `blocker_id`
- `blocked_id`
- `created_at`

### SphereAffinity

Stores a user's weighted genre profile.

Key fields:

- `user_id`
- `genre_slug`
- `score`
- `last_event_at`
- `updated_at`

### Room

Represents a listening room.

Key fields:

- `id`
- `creator_id`
- `name`
- `visibility`
- `status`
- `tag_list`
- `created_at`
- `closed_at`

### RoomMember

Tracks room participation.

Key fields:

- `room_id`
- `user_id`
- `role`
- `joined_at`
- `last_seen_at`

### RoomQueueItem

Represents a queued preview track in a Room.

Key fields:

- `id`
- `room_id`
- `music_entity_id`
- `preview_id`
- `source_type` (`seed`, `user`)
- `submitted_by_user_id`
- `position_group`
- `enqueued_at`

### Notification

In-app or outbound notification.

Key fields:

- `id`
- `user_id`
- `type`
- `payload_json`
- `read_at`
- `created_at`

### Report

Moderation report.

Key fields:

- `id`
- `reporter_id`
- `entity_type`
- `entity_id`
- `reason_code`
- `status`
- `created_at`

## 2. Relationships

- a `User` can own many `ProviderAccount` records, but v1 allows only one active provider type
- a `User` authors many `Bubble` records
- a `Bubble` references exactly one `MusicEntity`
- a `Bubble` references one `MusicPreview`
- a `User` produces many `Interaction`, `Comment`, `FollowEdge`, and `Report` records
- a `User` has many `SphereAffinity` rows
- a `Room` has many `RoomMember`, `RoomQueueItem`, and room chat records

## 3. Event Model

The system should publish durable domain events through an outbox pattern.

Important events:

- `user.registered`
- `provider.account_linked`
- `bubble.created`
- `bubble.updated`
- `bubble.deleted`
- `bubble.liked`
- `bubble.saved`
- `bubble.reposted`
- `comment.created`
- `follow.created`
- `follow.deleted`
- `room.created`
- `room.joined`
- `room.left`
- `room.queue_item_added`
- `room.closed`
- `report.created`

Consumers use these events for:

- notification generation
- Sphere recomputation
- feed materialization or cache invalidation
- search indexing
- analytics pipelines

## 4. Feed Ranking Model

### 4.1 Ranking Objective

The For You feed should maximize high-quality discovery, not only engagement.

The ranker should balance:

- familiarity
- novelty
- freshness
- social trust
- taste fit

### 4.2 Candidate Sources

Candidates are pulled from:

- followed users
- users with overlapping Sphere affinity
- Bubbles tagged with the user's top genres
- globally rising Bubbles
- editorial or exploration seed pools

### 4.3 Feature Set

Each candidate should be scored with features such as:

- genre affinity overlap
- author follow status
- prior positive interactions with the author
- preview completion rate
- save rate
- repost rate
- recency
- diversity relative to recent feed history
- negative feedback risk

### 4.4 Suggested Initial Scoring Formula

V1 can start with a weighted linear formula:

```text
feed_score =
  0.30 * genre_affinity +
  0.20 * social_affinity +
  0.15 * engagement_quality +
  0.15 * freshness +
  0.10 * exploration_boost +
  0.10 * diversity_boost -
  0.20 * fatigue_penalty
```

This is intentionally simple. It is explainable, tunable, and appropriate before large-scale ML training data exists.

### 4.5 Feed Guardrails

After scoring, apply constraints:

- no more than 2 consecutive Bubbles from the same author
- reserve at least 20% of slots for exploration
- suppress blocked, muted, or already hidden content
- reduce repeated genre overconcentration
- respect Bubble visibility and moderation state

## 5. Sphere Computation Model

The Sphere should be derived from weighted actions with time decay.

### 5.1 Inputs

- onboarding genre selections
- provider-imported top artists and tracks
- Bubble creation tags
- likes, saves, reposts, comments
- preview completion
- room participation

### 5.2 Genre Attribution

Each music entity must map to one or more normalized genres.

Genre mapping sources:

- provider metadata
- internal taxonomy mappings
- inferred tags from user content

### 5.3 Suggested Affinity Weights

```text
onboarding_genre_select   +10
provider_top_artist       +8
bubble_created            +7
bubble_saved              +6
bubble_liked              +3
preview_completed         +2
room_track_added          +4
room_track_skipped        -3
explicit_hide             -8
```

### 5.4 Time Decay

Scores should decay exponentially so recent actions matter more than old ones. This keeps the Sphere alive and prevents early onboarding from locking identity permanently.

### 5.5 Presentation Rules

The visible Sphere should show:

- top 8 to 15 genres depending on screen size
- bubble size proportional to normalized affinity
- motion intensity proportional to recent activity
- click-through into related Bubbles and tracks

## 6. Room Queue Model

The room queue should be deterministic and easy to reason about.

### 6.1 Queue Segments

Each Room has three states:

- current item
- user queue
- seed queue

### 6.2 Ordering Rule

- when the Room is created, the seed queue is populated with recommended tracks
- when a member adds a track, it is appended to the user queue
- when the current item ends, the next item is pulled from the user queue if present
- if the user queue is empty, the system pulls from the seed queue

This preserves the original idea that user-submitted tracks take priority without disrupting the currently playing preview.

### 6.3 Queue Refill

When the seed queue falls below a threshold, the system backfills additional recommendations based on room tags and recent room behavior.

### 6.4 Playback State

The room authority should store:

- active queue item ID
- preview start timestamp
- paused state
- sequence number

Clients should reconcile on sequence number to avoid drift.

## 7. Analytics Events

The analytics layer should track at minimum:

- feed impression
- preview started
- preview completed
- provider handoff click
- Bubble published
- like/save/repost/comment
- search query
- room joined
- room track added
- room message sent
- report submitted

These events power retention, discovery quality, and ranking iteration.
