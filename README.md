# Swiftradish

**A modern social platform for sharing media, discovering people, and participating in communities.**

Swiftradish is a social media Progressive Web App (PWA) being built from the ground up. It combines visual publishing and short-form media with text-based discussions and interest-based communities in one cohesive application.

The goal is to create a genuinely usable product—not just an attractive interface or a collection of disconnected features. Core interactions must work end to end, persist correctly, enforce permissions, handle failures, and remain usable on mobile and desktop.

---

## 1. Product Direction

Swiftradish starts with familiar, understandable social experiences inspired by established platforms such as Instagram and Reddit.

### Visual social experience

- Create and edit user profiles.
- Follow and unfollow users.
- Publish image posts.
- Publish multi-image carousels.
- Publish short-form video reels.
- Browse a feed of posts and media.
- Like and unlike posts.
- Comment on posts and reply to comments.
- Save and unsave posts.
- Share or copy links to content.
- View user profiles and their published content.
- Explore and discover content.

### Communities and discussions

- Create and manage communities.
- Browse, search, and join communities.
- Leave communities.
- Publish text-based discussions.
- Support image attachments where appropriate.
- Comment on discussions.
- Reply to comments using nested discussion threads.
- Vote on eligible posts and comments.
- Sort discussions using supported ordering options.
- View community-specific posts and activity.
- Give authorized community moderators appropriate moderation controls.

### Essential social infrastructure

- Authentication and session management.
- User profiles and social relationships.
- Search across relevant users, posts, and communities.
- Notifications and an activity center.
- Bookmarks or saved posts.
- Content reporting and user blocking.
- Privacy and account settings.
- Responsive navigation and accessible interaction states.
- Pagination or cursor-based loading for growing collections.
- Useful empty, loading, success, and error states.
- An installable PWA experience where supported.

These capabilities form the product direction, not a requirement to implement everything in one release. Each capability must be prioritized and delivered in dependency-aware slices.

### Explicit product decisions

- **Product name:** Swiftradish.
- **Product category:** General-purpose social media platform.
- **Initial product emphasis:** Visual publishing, feeds, user relationships, discussions, and communities.
- **Community model:** Familiar, understandable communities; no custom terminology is required.
- **Initial feed strategy:** A reliable, explainable baseline feed before advanced recommendation systems.
- **Initial media scope:** Images, multi-image carousels, and short-form video, introduced only when their complete upload, storage, playback, and moderation lifecycles are feasible.
- **Architecture approach:** A modular application with clear boundaries, not premature microservices.
- **Delivery approach:** Research and plan first, then implement one reviewable vertical slice at a time.

### Deferred product concepts

The following are not part of the current product requirements:

- Co-Plots as a distinct product feature.
- Radish Patches as a branded community concept.
- A specialized, differentiated-feed strategy as a core product requirement.
- A mandatory mascot, badge, or gamification system.
- Advanced recommendation algorithms before a dependable baseline feed exists.

Ordinary communities, media posts, and discussion threads remain in scope. The deferred concepts may only be reconsidered after the core platform is functional and the decision is explicitly revisited.

---

## 2. Development Principles

1. **Functional completeness over superficial breadth.** A small, complete feature is better than many unfinished screens.
2. **One source of truth.** Persist application data in the appropriate backend service; do not use local mock arrays as the production source of truth.
3. **Explicit authorization.** Hiding a button is not access control. The backend and database policies must enforce permissions.
4. **Media is a lifecycle.** Uploading a file is not the same as safely publishing and serving it.
5. **Design consistency.** Use a coherent design system, responsive layouts, accessible controls, and reusable components.
6. **Measured complexity.** Add infrastructure only when a specific requirement justifies it.
7. **Evidence over assumptions.** Verify service limits, pricing, APIs, security behavior, and deployment constraints against current documentation.
8. **Reviewable changes.** Inspect the existing repository before restructuring it, and review every implementation diff before accepting it.
9. **No fake functionality.** Do not present an interaction as complete if it only changes client-side state without fulfilling its intended behavior.
10. **Safe defaults.** Protect secrets, validate inputs, restrict uploads, and fail closed when security checks cannot be completed.

---

## 3. Technology Direction

The intended application architecture is:

| Layer | Current direction |
|---|---|
| Frontend | Next.js App Router, React, strict TypeScript |
| UI | Responsive PWA, reusable components, documented design tokens |
| Backend API | Python and FastAPI |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth, subject to verification of the chosen integration |
| Media storage | Existing Backblaze B2 bucket through its S3-compatible API |
| Database migrations | Explicit, version-controlled migrations, selected after repository inspection |
| Python environment | `uv`, subject to confirmation of the current project layout |
| Hosting | Not finalized; compare real deployment requirements and current free-tier restrictions before choosing |

The existing Supabase project is in the Mumbai / South Asia region. The existing Backblaze B2 bucket is in `eu-central-003`.

These resources are intentional existing decisions. Do not create replacement projects or buckets, migrate regions, or replace Backblaze B2 with another storage provider without an explicit decision.

The database and media storage are in different regions. Record this as a known architecture trade-off and measure relevant latency before considering a migration. Database requests and media delivery must be evaluated separately.

### Important integration rule

Supabase Auth, PostgreSQL, FastAPI, and the frontend have different responsibilities. The implementation must explicitly define how authentication tokens are issued, transported, verified, and authorized.

Do not assume that frontend authentication automatically secures FastAPI endpoints. Do not trust client-supplied user IDs or roles. Verify the selected authentication flow and authorization model before implementing protected features.

---

## 4. Architecture Principles

Start with a modular monolith unless verified requirements establish a concrete need for separate services.

- **Frontend:** presentation, navigation, client interaction, and appropriately scoped server/client data access.
- **FastAPI:** business rules, validation, authorization checks, API contracts, and application workflows.
- **PostgreSQL:** durable relational data, constraints, indexes, and transactional consistency.
- **Supabase Auth:** identity and session-related capabilities according to the verified integration.
- **Backblaze B2:** binary media storage, with private credentials restricted to trusted server-side code.
- **Background processing:** introduce a durable job mechanism when a feature requires asynchronous work that must survive process restarts.
- **Observability:** structured logs, useful errors, and health checks appropriate to the deployment.
- **Testing:** unit, API, database, permission, and critical end-to-end tests.

Do not add Redis, Kafka, a search cluster, Kubernetes, a separate microservice fleet, or a dedicated recommendation service merely because a large social platform might use them. Establish the need first.

### Media architecture

Media must not be treated as an ordinary database field.

A media workflow should account for:

1. Validating the authenticated user's upload permission.
2. Enforcing file size and supported-format restrictions.
3. Validating actual file content, not only its extension or browser-provided MIME type.
4. Safely processing or sanitizing uploaded content where applicable.
5. Storing media using a controlled object key.
6. Recording media metadata and ownership in the database.
7. Applying moderation and publication rules.
8. Handling failed, abandoned, deleted, or expired uploads.
9. Serving media using an access model appropriate to its visibility.
10. Preventing unauthorized users from replacing, deleting, or claiming another user's media.

Images, carousels, and video have different operational requirements. Reels must not be considered complete until upload, processing requirements, playback, authorization, deletion, and failure handling have been addressed.

---

## 5. Repository Layout

The intended logical structure is:

```text
Swiftradish/
├── AGENTS.md
├── README.md
├── DESIGN.md
├── research/
│   ├── README.md
│   ├── Swiftradish Product and Engineering Blueprint.pdf
│   ├── Swiftradish Phase 2 Specification Research.pdf
│   └── Swiftradish Phase 3 Red-Team Audit.pdf
├── frontend/
│   ├── .env.example
│   └── ...
└── backend/
    ├── .env.example
    └── ...
```

This is a target layout, not permission to move existing files blindly.

The repository currently has a root Python project initialized with `uv`, including `pyproject.toml` and `main.py`, as well as a `frontend/` directory. Inspect the actual files and dependencies before deciding whether the Python project remains at the root or moves into `backend/`.

Do not duplicate project manifests or create competing Python environments. Preserve the current setup until a migration plan is approved.

Git tracks files, not empty directories. A directory containing only ignored files may not appear in `git status`; this alone does not justify changing `.gitignore`.

---

## 6. Environment Configuration

Use `.env.example` files to document required variable names and safe placeholders. Keep real secrets in local environment files that are excluded from Git.

Likely configuration categories include:

- Frontend public application URL.
- Frontend Supabase URL and publishable/anonymous key, according to the selected current Supabase configuration.
- Backend Supabase URL and required server-side credentials.
- Database connection configuration if direct PostgreSQL connections are used.
- Backblaze B2 S3-compatible endpoint, bucket, region, access key, and secret key.
- Allowed frontend origins for CORS.
- Application environment and logging configuration.
- Any signing or encryption secrets actually required by the selected architecture.

This is a checklist, not a claim that every variable is already required. Verify the exact SDKs and connection methods before finalizing names.

Rules:

- Never commit `.env`, `.env.local`, API keys, database passwords, signing secrets, or storage credentials.
- Never put a Backblaze secret key or privileged Supabase key in frontend code.
- Treat any value prefixed with `NEXT_PUBLIC_` as publicly exposed.
- Do not ask the user to paste secrets into chat or logs.
- Do not weaken security to make a connection test pass.
- If a credential may have been exposed, recommend rotating it.

---

## 7. Product Delivery Plan

The detailed scope and acceptance criteria must be reconciled with the research corpus before implementation. The following is a proposed dependency order, not a claim that the research documents already approved this exact roadmap.

### Stage 0 — Repository and architecture preflight

- Inspect the existing Git state, repository structure, manifests, environment templates, and dependencies.
- Reconcile product requirements with the three research documents.
- Confirm the authentication and authorization model.
- Confirm the database access and migration strategy.
- Define media storage and upload security.
- Verify service limits, deployment options, and estimated operating costs.
- Agree on the first vertical slice and its acceptance tests.

**Exit condition:** documented decisions, known risks, and an approved implementation plan. No broad feature implementation during preflight.

### Stage 1 — Application foundation and identity

- Establish the frontend/backend development workflow.
- Implement verified authentication and protected sessions.
- Create and view profiles.
- Enforce authorization at the API and data layers.
- Establish error handling, validation, and a minimal test suite.

### Stage 2 — Core social graph and text content

- Implement following relationships.
- Create and view text posts.
- Build the initial feed.
- Add post detail pages, comments, and replies.
- Implement likes and bookmarks where they fit the approved slice.
- Ensure pagination, ownership, permissions, and durable persistence work.

### Stage 3 — Visual publishing

- Add secure image uploads and image posts.
- Support multi-image carousels.
- Complete media validation, sanitization, storage metadata, and deletion behavior.
- Verify mobile and desktop presentation, accessible controls, and media loading failures.

### Stage 4 — Communities and discussion threads

- Create and browse communities.
- Join and leave communities.
- Publish community discussions.
- Add nested replies and voting.
- Add community roles and moderation rules.
- Enforce community membership and moderator permissions on the backend.

### Stage 5 — Short-form video

- Implement the video lifecycle only after image publishing is reliable.
- Verify upload limits, processing or playback requirements, object storage behavior, and failure recovery.
- Build the reels browsing and playback experience.
- Test performance on realistic network conditions and supported devices.

### Stage 6 — Discovery, notifications, and hardening

- Improve search and content discovery.
- Implement durable notifications and their read states.
- Add blocking, reporting, moderation workflows, and privacy controls.
- Validate accessibility, performance, security, and deployment readiness.
- Reassess advanced messaging, recommendations, creator tools, and monetization only after the core experience is stable.

Each stage may be subdivided into smaller vertical slices. Do not start the next slice merely because its UI exists; start it when its dependencies and acceptance criteria are satisfied.

---

## 8. Definition of Done

A feature is not complete until its relevant checks pass.

- The user journey works from the actual UI.
- Data persists in the intended backend.
- Refreshing or reopening the page does not silently lose durable state.
- API inputs and outputs are validated.
- Authentication and authorization are enforced server-side.
- Database constraints and migrations are appropriate.
- Loading, empty, success, and error states are handled.
- Mobile and desktop layouts are usable.
- Keyboard navigation and accessible labels are provided for relevant controls.
- Uploads and user-generated content follow the approved security and moderation rules.
- Tests cover important success paths, failure paths, and permission boundaries.
- No secrets, debug credentials, or unexplained mock implementations are committed.
- The implementation report identifies tests run, known limitations, and any remaining risks.

---

## 9. Research and Decision Records

The `research/` directory preserves the original product blueprint, Phase 2 specification research, and Phase 3 red-team audit.

These documents are evidence and historical decision inputs, not unquestionable implementation instructions. The current product direction in this README supersedes earlier recommendations that assume a Co-Plot-first product.

Keep the original PDFs unchanged. Record new decisions and explain significant changes rather than silently rewriting the original research.

Before implementing an architectural or product decision, identify whether it is:

- An explicit owner decision.
- Verified against current authoritative documentation.
- A recommendation from the research corpus.
- An engineering inference.
- Still unverified.

See `research/README.md` for the document-handling and reconciliation rules.

---

## 10. Development Workflow

For every slice:

1. Inspect the relevant files and current state.
2. State the intended outcome and the files likely to change.
3. Identify dependencies, risks, and acceptance criteria.
4. Implement only the approved slice.
5. Run relevant automated checks.
6. Review the diff for correctness, security, scope, and accidental changes.
7. Report what works, what was tested, and what remains incomplete.
8. Wait for review before proceeding to a materially different slice.

Never assume that an agent's completion message proves that the implementation works. Verify the code and test results.

Do not reset, clean, overwrite, force-push, or otherwise destroy user work without explicit approval.

---

## 11. Initial Working Agreement

The immediate goal is **not to build the entire social network in one pass**. It is to establish a reliable foundation and then build the essential social workflows in a deliberate order.

No new cloud resources, database migrations, major repository restructuring, or destructive Git operations should be performed during preflight without explicit approval.

Swiftradish should become a coherent social product through a sequence of working, tested capabilities—not a growing collection of disconnected screens.
