# Synphere Product Spec

## 1. Product Summary

Synphere is a social discovery platform for music. Users express their taste through posts called **Bubbles**, build an evolving **Sphere** that visualizes their genre identity, and join **Rooms** where communities listen and react together in real time.

The product is not trying to replace Spotify or Apple Music. It sits one layer above streaming services and helps users discover what to hear next, why it matters, and who it came from.

## 2. Problem Statement

Current music platforms are strong at playback and weak at social discovery:

- recommendations are often personalized but context-poor
- sharing is usually external and fragmented
- identity is flattened into playlists and likes
- communal listening is either absent or too heavy to organize

Synphere solves this by treating music discovery as a social graph plus a taste graph.

## 3. Product Vision

Synphere should become the place where users answer three questions:

- What should I listen to next?
- Who shares my taste?
- How has my music identity evolved?

## 4. Target Users

### 4.1 Curious Listeners

Users who want fresh music without doing manual research. They need trusted discovery from people and genres that fit their taste.

### 4.2 Tastemakers

Users who enjoy sharing tracks, shaping scenes, and being recognized for good taste. They need expressive posting and visible impact.

### 4.3 Community Hosts

Users who gather friends or niche communities around genres, moods, or live listening sessions. They need easy rooms and moderation tools.

## 5. Product Principles

### 5.1 Discovery Over Passive Scroll

Every feed should help the user find something worth hearing, not just something worth tapping.

### 5.2 Context Matters

A Bubble is not only a song card. It is a recommendation with a face, a caption, tags, and social proof.

### 5.3 Identity Should Feel Alive

The Sphere must feel dynamic, playful, and personal. It is a product surface, not a gimmick.

### 5.4 Real-Time Should Be Lightweight

Rooms should be easy to enter and easy to understand. They are for shared discovery, not complex broadcasting.

### 5.5 Integrations Must Respect Licensing Reality

Synphere should share metadata, previews, and deep links. It should not promise platform-level playback rights it does not control.

## 6. Core Experience Pillars

### 6.1 Bubbles

Bubbles are the primary content object in Synphere. A Bubble contains:

- one music entity: track, album, playlist, or artist
- a representative preview track
- artwork
- a caption
- tags such as genre, mood, activity, or custom user tags
- social actions: like, repost, comment, save

What makes Bubbles valuable:

- they are opinionated and attributable
- they support fast preview listening
- they create content for ranking, search, and rooms

### 6.2 Sphere

The Sphere is the user's taste map. It visualizes top genres and sub-genres as floating bubbles whose size, position, and motion reflect affinity and recency.

The Sphere should support:

- tapping a genre bubble to open related posts and tracks
- playful motion and collision
- taste evolution over time
- profile differentiation

### 6.3 Rooms

Rooms are real-time spaces for shared listening and chat. Each room is organized around genres, moods, or micro-communities.

Rooms should feel:

- fast to create
- fast to join
- socially active
- musically coherent

For v1, room playback is based on synchronized previews, not full-song streaming.

## 7. V1 Scope

### 7.1 In Scope

- email/password sign up and login
- optional OAuth-based provider linking
- Spotify integration
- onboarding with genre and artist preference capture
- user profiles
- follow, unfollow, block, report
- bubble creation for track, album, artist, and playlist entities
- feed tabs: For You, Following, Trending
- likes, reposts, comments, saves
- searchable users, genres, tracks, artists, and bubbles
- Sphere generation and profile visualization
- public and private Rooms with queueing, chat, and moderation
- in-app notifications and email notifications for critical events
- auto-scroll feed mode
- admin moderation tools and audit logs

### 7.2 Explicitly Out of Scope for V1

- synchronized full-track playback
- Apple Music and SoundCloud support
- direct messaging
- close friends and special users lists
- creator payouts or subscriptions
- editorial multi-bubble publishing
- native mobile apps

## 8. Post-V1 Expansion

After v1 proves retention and content creation, Synphere can add:

- Apple Music and SoundCloud adapters
- native mobile apps
- DM and group messaging
- collaborative discovery playlists
- richer creator profiles
- embedding-based recommendation enhancements
- event and concert discovery

## 9. User Flows

### 9.1 New User Activation

1. User creates an account.
2. User selects favorite genres, moods, and artists.
3. User optionally links Spotify.
4. System imports top artists, tracks, and saved genres.
5. User sees a seeded For You feed and an initial Sphere.
6. User creates or interacts with their first Bubble within the first session.

### 9.2 Core Discovery Loop

1. User previews a Bubble in the feed.
2. User likes, saves, comments, or opens the provider link.
3. User follows the publisher or explores the related genre.
4. System adjusts the user's feed and Sphere affinity model.
5. User discovers a new artist, track, or community.

### 9.3 Community Loop

1. User enters a Room around a genre or mood.
2. User hears the active preview, reads chat, and adds a track.
3. Other users react, follow, or save the track.
4. The room becomes a recurring discovery habit.

## 10. Business Goals

Synphere's first business goal is not immediate monetization. It is to prove a defensible discovery network through:

- strong week-4 retention
- recurring content creation
- repeat room participation
- meaningful click-through into linked streaming providers

Possible future monetization:

- premium profile customization
- advanced analytics for creators
- branded rooms and sponsored discovery surfaces
- affiliate or partner referral revenue with providers and ticketing partners

## 11. Success Metrics

### 11.1 Activation

- account creation to onboarding completion rate
- onboarding completion to first Bubble interaction rate
- linked provider attach rate

### 11.2 Engagement

- daily and weekly active users
- average Bubbles previewed per session
- save rate and repost rate
- room join rate

### 11.3 Retention

- day-1, day-7, and day-30 retention
- percent of users returning to For You feed within 7 days
- percent of users revisiting Sphere within 14 days

### 11.4 Discovery Quality

- preview-to-provider click-through rate
- percent of saves that originate from For You versus Following
- diversity score of listened and saved genres over time

## 12. Product Risks

### 12.1 Playback Expectation Risk

Users may expect full streaming. The UI and onboarding must clearly explain that Synphere is a discovery layer with previews and provider handoff.

### 12.2 Cold Start Risk

Without enough social and behavioral data, early recommendations can feel generic. Onboarding, curated seed content, and exploration quotas are required.

### 12.3 Moderation Risk

Rooms and comments can degrade quickly without moderation tools, reporting flows, and admin operations from the start.
