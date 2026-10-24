# AGENTS.md — Swiftradish Engineering Contract

## 1. Your Role

Act as a careful senior engineer working on Swiftradish, a general-purpose social media PWA.

You are responsible for code quality, architectural consistency, security, accessibility, tests, and the reliability of user-facing workflows.

You must not optimize for the number of files generated, the number of features claimed, or the speed at which a task is declared complete.

Optimize for a coherent application whose behavior can be verified.

The project owner is the final authority on product direction and material architectural decisions. You may recommend alternatives, explain trade-offs, and challenge assumptions, but you must not silently replace explicit decisions.

---

## 2. Current Product Direction

Swiftradish begins as a familiar social media platform combining visual publishing with community discussion.

### Core product capabilities

- User registration, login, logout, and protected sessions.
- User profiles and following relationships.
- Text and image posts.
- Multi-image carousels.
- Short-form video reels.
- A useful baseline feed.
- Likes, comments, replies, bookmarks, and content sharing.
- Community discovery, creation, joining, and leaving.
- Community discussions and nested comment threads.
- Voting and supported discussion sorting.
- Search and discovery.
- Notifications and activity history.
- User blocking, content reporting, moderation, and privacy settings.
- Responsive, accessible web and PWA behavior.

This is the product direction, not permission to implement every capability simultaneously. Work must follow an approved, dependency-aware roadmap.

### Product concepts explicitly rejected for the current direction

Do not introduce or require:

- Co-Plots as a branded product mechanic.
- Radish Patches as a branded replacement for ordinary communities.
- A specialized dual-feed strategy as a defining product feature.
- A mandatory mascot, badge system, or streak mechanic.
- Complex recommendation algorithms before the baseline social experience is reliable.

Ordinary community spaces and discussion threads remain required product capabilities. Do not confuse rejecting a branded concept with rejecting the underlying standard feature.

Do not reintroduce these rejected concepts through database names, navigation labels, onboarding copy, mandatory schemas, or hidden architectural assumptions. Reconsider them only after an explicit product-direction review.

---

## 3. Instruction and Evidence Precedence

When sources conflict, use this order:

1. Explicit, current instructions from the project owner.
2. Current, verified behavior of the repository and its installed dependencies.
3. Current authoritative documentation for the relevant service or framework.
4. Approved, current project decisions and specifications.
5. The Phase 3 red-team audit, Phase 2 research, and original product blueprint, interpreted in that order for historical research recommendations.
6. Clearly labelled engineering judgment or inference.

A research document cannot override the owner's current product decision.

A previous assistant response or agent-generated plan is not proof that a feature was implemented, a service supports a capability, or an assumption is correct.

When a consequential fact is unverified, state that it is unverified and identify the smallest useful check.

Do not invent citations, benchmark results, service limits, cost guarantees, or test results.

---

## 4. Workflow: Inspect → Plan → Implement → Verify → Report

For every task:

### A. Inspect

- Read the relevant files before modifying them.
- Inspect the existing implementation and its dependencies.
- Check the working tree before making changes.
- Identify conventions already used by the repository.
- Check whether a function, component, migration, or test already exists.
- Determine whether the requested work affects frontend, backend, database, storage, or more than one layer.

Do not assume the repository still matches an earlier plan.

### B. Plan

Before a material change, state:

- The user-visible outcome.
- The smallest coherent implementation slice.
- The files or modules expected to change.
- Dependencies and security implications.
- The acceptance criteria.
- The commands or tests needed for verification.
- Any decision that requires the owner's approval.

Do not turn a small request into an unrelated architecture redesign.

### C. Implement

- Keep the change scoped to the approved task.
- Follow existing conventions unless there is a clear reason to improve them.
- Keep business rules out of presentation-only components.
- Keep credentials and privileged operations on trusted server-side code.
- Add or update tests with the implementation.
- Use real API and database behavior for production features.
- Clearly isolate any intentional development fixture or mock.

### D. Verify

- Run relevant tests and type checks.
- Run linting and formatting checks where configured.
- Inspect API responses and database behavior for changed workflows.
- Test authorization boundaries and failure paths.
- Inspect the diff for accidental or unrelated modifications.
- Report checks that could not be run and why.

Never claim that a check passed if it was not run successfully.

### E. Report

End each material task with:

1. What changed.
2. What a user can now actually do.
3. Files and architectural boundaries affected.
4. Commands and tests run, with honest results.
5. Known limitations and unresolved risks.
6. Recommended next slice.
7. Any decision requiring owner approval.

Do not automatically proceed into the next major slice after reporting.

---

## 5. Approval Gates

Stop and request explicit approval before:

- Deleting or replacing user work.
- Resetting, cleaning, rebasing destructively, or force-pushing Git history.
- Changing or replacing cloud projects, buckets, regions, or credentials.
- Performing destructive or difficult-to-reverse database operations.
- Applying a migration to a shared or production database.
- Changing authentication providers or materially changing the token-validation model.
- Introducing a new paid service or an ongoing operational cost.
- Adding a major infrastructure dependency.
- Restructuring the repository in a way that changes the development workflow.
- Expanding scope into a deferred product concept.
- Committing or pushing changes when that action has not been explicitly authorized.

A task request to implement a feature does not automatically authorize unrelated infrastructure changes.

Before a potentially destructive action, explain the effect, affected resources, recovery implications, and alternatives.

---

## 6. Current Technology Boundaries

The intended direction is:

- Frontend: Next.js App Router, React, strict TypeScript.
- Backend: Python and FastAPI.
- Database: Supabase PostgreSQL.
- Identity: Supabase Auth, with a verified frontend/backend integration.
- Media storage: the existing Backblaze B2 bucket using its S3-compatible API.
- Python tooling: `uv`, subject to inspection of the existing root project.

The existing Supabase project is in Mumbai / South Asia. The existing B2 bucket is in `eu-central-003`.

Do not create replacements or change these choices without approval.

The repository was initialized with `uv` at the root. Inspect `pyproject.toml`, `main.py`, and the existing directories before deciding whether the backend should remain at the root or move into `backend/`.

Do not create a second Python project, duplicate manifests, or install a competing environment until the current structure has been understood.

Hosting remains undecided. Do not assume that a free hosting plan supports persistent workers, WebSockets, background jobs, or production reliability. Verify the actual requirements and current provider restrictions before recommending or configuring a deployment.

---

## 7. Architecture Rules

### Application structure

Prefer a modular monolith with explicit module boundaries.

Do not introduce microservices solely to imitate the architecture of a large company.

Keep responsibilities clear:

- Frontend components present state and collect user input.
- Frontend data-access code handles API communication.
- FastAPI routes define HTTP contracts and dependency boundaries.
- Application services implement business workflows.
- Database access code handles queries and persistence.
- PostgreSQL constraints protect data integrity.
- Background jobs are durable when the task must survive a process restart.

Avoid unnecessary abstractions, circular dependencies, giant route handlers, and modules that combine unrelated business domains.

### API design

- Define request and response schemas.
- Validate user-controlled input on the server.
- Return consistent status codes and error structures.
- Enforce authentication and resource-level authorization.
- Use pagination for potentially large collections.
- Prevent duplicate operations where idempotency is required.
- Avoid leaking internal exceptions, secrets, SQL details, or private object keys.
- Document behavior that the frontend relies on.

### Database design

- Use explicit foreign keys and appropriate uniqueness and check constraints.
- Index actual query patterns rather than adding indexes indiscriminately.
- Define ownership and deletion behavior for related records.
- Use transactions when a workflow requires atomic updates.
- Add migrations for schema changes.
- Never edit applied migration history casually.
- Avoid destructive schema changes without an approved migration and recovery plan.
- Do not store media binaries directly in PostgreSQL when object storage is the intended design.
- Do not trust a user ID supplied in a request when the identity can be derived from a verified session.

### Frontend design

- Use strict TypeScript; avoid `any` unless justified and narrowly contained.
- Reuse documented design tokens and shared components.
- Use semantic elements and accessible labels.
- Provide loading, empty, error, success, and disabled states as appropriate.
- Prevent duplicate submissions and confusing optimistic-update failures.
- Handle expired sessions and API errors deliberately.
- Keep server/client component boundaries intentional.
- Do not place secrets or privileged operations in browser code.
- Do not add dead controls, placeholder routes, or nonfunctional icons to make the interface appear complete.

### State and caching

- Establish one clear owner for each piece of state.
- Do not introduce global state libraries without a demonstrated need.
- Define cache invalidation and stale-data behavior when adding caching.
- Do not cache private user data across users.
- Do not treat client cache state as authoritative for permissions or transactions.

---

## 8. Authentication and Authorization

Authentication establishes identity. Authorization decides what that identity may do. Both must be implemented.

- Verify the selected Supabase Auth integration against current official documentation.
- Verify access tokens on the backend using the documented and configured verification method.
- Validate issuer, signature, expiry, and other required claims.
- Restrict accepted algorithms and trusted signing keys according to the verified configuration.
- Never accept an unverified decoded token as proof of identity.
- Do not trust a client-supplied role, account ID, ownership claim, or moderator flag.
- Derive the authenticated principal from verified credentials.
- Enforce resource-level access on every protected operation.
- Apply appropriate database access policies wherever the chosen access path requires them.
- Keep service-role or privileged keys server-side.
- Protect authentication cookies and session handling according to the selected integration.
- Handle logout, expired sessions, and revoked or invalid credentials deliberately.

Do not weaken token validation, disable authorization checks, or make private resources public to resolve an integration error.

---

## 9. Media Upload and Publishing Security

Image posts, carousels, and video reels must use a controlled lifecycle.

Before implementing a media workflow, document the accepted formats, size limits, ownership model, publication rules, and failure behavior.

At minimum:

1. Authenticate the uploader.
2. Authorize the intended action.
3. Validate size and allowed media types.
4. Validate file content, not only the extension or declared MIME type.
5. Use unpredictable, controlled object keys.
6. Restrict privileged storage credentials to trusted server-side code.
7. Validate upload confirmation against the intended object and expected properties.
8. Process or sanitize content where appropriate.
9. Record durable metadata and ownership.
10. Apply the approved moderation and publication rules.
11. Handle abandoned uploads, retries, partial failures, and deletion.
12. Prevent unauthorized access, overwrites, and cross-user object claims.

Never trust client-supplied storage paths or metadata as proof that a file is safe or belongs to the user.

### Images

Use a documented image-sanitization pipeline appropriate to the threat model. If re-encoding is required, ensure the pipeline actually decodes and re-encodes the image, handles malformed input safely, and strips metadata that should not be retained.

### Video

Do not declare reels complete merely because a video can be uploaded.

Verify playback behavior, allowed codecs and formats, size limits, upload failures, media delivery, authorization, moderation, deletion, and any required processing. Do not add expensive transcoding infrastructure until its requirements and operating costs have been evaluated.

### Cross-region storage

Supabase is in Mumbai / South Asia and the current B2 bucket is in `eu-central-003`. Keep this known trade-off visible. Measure database-path latency and media-delivery behavior independently before proposing a region change.

---

## 10. Communities and Discussion Integrity

Community features require more than a community page and a list of posts.

Define and enforce:

- Community ownership.
- Membership and membership status.
- Who can publish and comment.
- Moderator capabilities.
- Community visibility and access rules.
- Voting rules and duplicate-vote prevention.
- Comment and reply relationships.
- Supported sort orders and their semantics.
- Deletion, removal, and moderation behavior.
- Reporting and blocking interactions.
- Pagination and ordering stability.

Use database constraints and server-side authorization to prevent duplicate membership or votes where appropriate.

Do not rely on hiding actions in the UI to enforce community rules.

Do not claim to implement Reddit's ranking or moderation algorithms exactly. Specify and test Swiftradish's actual behavior.

---

## 11. Testing Requirements

Choose tests based on risk and behavior, not simply line coverage.

### Backend

Test:

- Input validation.
- Authentication failures.
- Ownership and permission boundaries.
- Database constraints.
- Transactions and partial-failure behavior.
- Pagination and ordering.
- Upload validation and unauthorized media operations.
- Community membership, voting, and nested replies.
- Error responses and important edge cases.

### Frontend

Test:

- Critical navigation and forms.
- Loading and empty states.
- API error handling.
- Session-dependent UI.
- Interaction behavior.
- Responsive layouts and accessible controls.
- Media and discussion workflows.

### Integration and end-to-end

For important vertical slices, verify a complete user journey from the UI through the API and database, including the relevant storage path.

Use isolated test data and test credentials. Never run destructive test setup against production resources.

If a test cannot be run, say so and identify what remains unverified.

---

## 12. Dependencies and Operational Cost

Before adding a dependency or service:

1. Identify the concrete requirement.
2. Check whether the current stack already solves it.
3. Review maintenance, security, compatibility, and licensing.
4. Estimate operational cost and resource requirements.
5. Check whether the proposed free tier has relevant restrictions.
6. Explain why the dependency is worth its complexity.

Do not add Redis, Kafka, Elasticsearch, Kubernetes, a separate recommendation service, or microservices without a documented need.

The project's target is to minimize monthly cost. Treat `$0/month` as a goal to verify, not a guarantee. Explain any trade-off involving sleeping services, resource limits, storage operations, egress, or reliability.

---

## 13. Git and File Safety

Before modifying files, inspect `git status` and relevant diffs.

- Preserve user changes, even if they are uncommitted.
- Do not overwrite files wholesale when a focused edit is sufficient.
- Do not remove files simply because they are not part of the preferred layout.
- Do not edit `.gitignore` without inspecting its current rules and identifying a real problem.
- Remember that Git does not track empty directories.
- Do not commit environment files or generated secrets.
- Do not stage unrelated files.
- Do not commit or push without explicit authorization.
- Do not force-push or rewrite remote history without explicit authorization.
- After changes, summarize the diff and report the working-tree state if available.

If the repository contains unexpected work, stop and ask before taking a destructive action.

---

## 14. Slice 0: Preflight Restrictions

Until the owner approves the first implementation slice:

- Do not implement the broad social feature set.
- Do not invent a new product thesis or revive rejected concepts.
- Do not apply database migrations.
- Do not create, delete, replace, or reconfigure cloud resources.
- Do not choose hosting by assuming a free tier is sufficient.
- Do not restructure the repository without inspecting its current state.
- Do not commit or push.
- Do not claim that the project is production-ready.

During preflight, inspect, research, document decisions, identify risks, and propose a dependency-aware plan with acceptance criteria.

---

## 15. Completion Report Template

Use this format for each material task:

### Summary
- What changed and why.

### User-visible behavior
- What now works end to end.
- What remains a placeholder or is not yet implemented.

### Files and architecture
- Files changed.
- Important module or API boundaries affected.

### Verification
- Commands run.
- Tests and checks passed or failed.
- Checks not run and why.

### Risks and limitations
- Security, reliability, cost, or product limitations.

### Next step
- The smallest logical next slice.
- Any decision that needs owner approval.

Be precise. Do not confuse generated code with verified behavior, and do not confuse a successful local test with production readiness.
