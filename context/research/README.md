# Swiftradish Research Corpus

This directory contains the original product and engineering research used to inform Swiftradish.

The documents are valuable inputs for understanding the product's history, proposed capabilities, architecture, security requirements, trade-offs, and unresolved questions. They are not all current implementation instructions.

**The current product direction is defined by the project owner's latest decisions, documented in the root `README.md` and enforced through `AGENTS.md`.**

---

## 1. Research Documents

Preserve these original files without modification:

1. `Swiftradish Product and Engineering Blueprint.pdf`
2. `Swiftradish Phase 2 Specification Research.pdf`
3. `Swiftradish Phase 3 Red-Team Audit.pdf`

The blueprint contains the broad product strategy, candidate features, competitive research, architecture proposals, and implementation ideas.

The Phase 2 research was intended to reconcile the original proposal, refine requirements, examine constraints, and create a more actionable specification.

The Phase 3 audit was intended to challenge the specification, identify risks, and assess implementation readiness.

These descriptions establish their intended roles; they do not mean every claim or recommendation has been independently verified.

If the actual filenames differ, inspect the files and update this index rather than renaming or replacing the originals without approval.

---

## 2. Current Product Direction Takes Precedence

Swiftradish is now being developed as a general-purpose social media platform with familiar, understandable functionality.

The immediate product direction includes:

- Profiles and user relationships.
- Image posts and multi-image carousels.
- Short-form video reels.
- A useful home feed.
- Likes, comments, replies, bookmarks, and sharing.
- Communities that users can discover, join, and participate in.
- Text-based discussions and nested comment threads.
- Voting and supported discussion sorting.
- Search, discovery, notifications, and activity.
- Reporting, blocking, moderation, and privacy controls.
- Responsive web and installable PWA behavior.

These features must be implemented in stages. Their inclusion in the product direction does not mean they are all approved for the first implementation slice.

### Previously proposed concepts that are not current requirements

The original research emphasizes several distinctive concepts:

- **Co-Plots:** structured shared activities, coordination, or collaborative media built around a post.
- **Radish Patches:** a branded concept for topic-oriented community spaces.
- **My Patch / Fresh Harvest:** a proposed distinction between a social-graph feed and a topic-oriented discovery feed.

The project owner has rejected these as the current defining product direction.

Therefore:

- Do not require Co-Plots in the MVP.
- Do not rename ordinary communities to Radish Patches.
- Do not require a dual-feed strategy to implement the initial feed.
- Do not let these concepts dictate database schemas, routes, navigation, onboarding, or core abstractions.
- Do not implement them speculatively because they appear in an older document.
- Do not describe them as accepted decisions in generated specifications.

Ordinary communities, collaborative discussion through comments, and media carousels remain in scope because they are part of the current general-purpose social product.

These rejected concepts are deferred from the current direction, not automatically approved for a future release. Reconsider them only after the owner explicitly requests a product-direction review.

---

## 3. Source Precedence and Evidence Labels

When using research to make a decision, distinguish the origin and certainty of the information.

Use these labels in specifications, plans, and decision records when useful:

| Label | Meaning |
|---|---|
| **Owner decision** | Explicitly selected or rejected by the project owner. |
| **Verified fact** | Checked against a reliable, relevant source or reproducible behavior. |
| **Research recommendation** | A recommendation contained in one of the research documents. |
| **Engineering inference** | A reasoned conclusion drawn from available evidence. |
| **Unverified assumption** | A claim that still needs confirmation. |
| **Open decision** | A choice that has not yet been made. |

### Rules for resolving conflicts

1. Follow the owner's current, explicit product and infrastructure decisions.
2. Inspect the actual repository and installed versions before assuming its state.
3. Verify time-sensitive technical, security, pricing, and service-limit claims against current authoritative documentation.
4. Use the research documents to understand the reasoning, evidence, and trade-offs behind earlier recommendations.
5. Prefer the later audit when interpreting the research's own historical conclusions, but do not treat it as more authoritative than current verified evidence.
6. Surface important contradictions rather than silently selecting whichever statement is convenient.
7. Keep unresolved, high-impact choices visible until the owner approves a decision.

Do not present a recommendation as a verified fact. Do not claim that a service supports a feature, a free tier meets requirements, or a design is secure solely because a research document says so.

---

## 4. How to Use the Research Before Implementation

Research should reduce implementation uncertainty rather than generate another disconnected collection of documents.

For a proposed feature or architecture change:

1. Identify the user problem and the required behavior.
2. Locate relevant passages in the research corpus.
3. Determine whether the recommendation is compatible with the current product direction.
4. Check whether the underlying claim still holds.
5. Identify dependencies, security concerns, operational costs, and failure cases.
6. Separate required behavior from one possible implementation.
7. Define acceptance criteria that can be tested.
8. Record important decisions and remaining uncertainties.

If a proposed idea conflicts with the current product direction, do not implement it just because the research is detailed.

If the research does not specify a necessary behavior, mark it as an open requirement or propose an explicit decision. Do not silently invent requirements and attribute them to the source.

Avoid rewriting the entire research corpus unless the owner asks for that work. Extract only the material necessary to make the next product or engineering decision.

---

## 5. Architecture and Infrastructure Facts to Preserve

The following existing choices must be treated as current constraints unless the owner changes them:

- **Product:** Swiftradish.
- **Frontend direction:** Next.js App Router, React, and strict TypeScript.
- **Backend direction:** Python and FastAPI.
- **Database:** the existing Supabase PostgreSQL project in Mumbai / South Asia.
- **Media storage:** the existing Backblaze B2 bucket in `eu-central-003`.
- **Python tooling:** `uv` has already been initialized at the repository root.
- **Repository:** `https://github.com/Leeladhar-Kaluru/Swiftradish.git`.
- **Local working directory:** `C:\projects\Swiftradish`.
- **Hosting:** not finalized.
- **Cost objective:** minimize recurring cost, with a target of $0/month where feasible; this must be verified against actual provider restrictions.

Do not create replacement cloud projects or buckets, migrate regions, switch storage providers, or restructure the repository simply because an older document suggests a different architecture.

The database and object storage are in different regions. Keep the resulting latency and operational trade-offs visible, and evaluate database requests and media delivery separately before recommending a change.

The repository's root Python project must be inspected before deciding whether it remains at the root or moves into `backend/`. Do not duplicate manifests or Python environments.

These are owner-provided project constraints, not independently verified claims about provider performance, current pricing, or deployment suitability.

---

## 6. Research Questions That Still Need Evidence

Before committing to an architecture or a costly implementation, investigate the questions relevant to the current slice.

### Product and UX

- Which social actions are essential to a coherent initial release?
- What should the feed display when a user follows nobody?
- How should content discovery work before the platform has much content?
- How should communities, their members, discussions, and moderators relate?
- Which interactions require optimistic updates, and how should failures be recovered?
- How should video playback and media-heavy feeds behave on slower networks?
- Which accessibility and responsive behaviors are required?

### Data and backend

- Which entities and relationships are required for users, posts, media, follows, comments, votes, communities, and notifications?
- Which invariants must be enforced by database constraints?
- Which queries require indexes and pagination?
- How will API authentication, resource-level authorization, and database access policies work together?
- Which operations require transactions?
- How will deletion, ownership transfer, and orphaned media be handled?

### Media and safety

- What image and video formats, file sizes, and dimensions will be supported?
- How will uploads be validated and associated with an authenticated owner?
- Which image-sanitization and moderation steps are required?
- What video processing is necessary for the chosen playback approach?
- How will upload failures, abandoned uploads, and deletion be handled?
- How will private or restricted media be accessed safely?

### Operations and cost

- Which hosting options can support the actual FastAPI process, frontend, database connectivity, and any required background workers?
- Which services sleep, impose resource limits, or restrict persistent processes and WebSockets?
- What are the current storage, request, and data-transfer limits?
- What latency is caused by the current database and storage regions?
- Which operational features can be omitted safely from the initial architecture?

Do not research every question repeatedly. Prioritize the questions that materially affect the next approved slice.

---

## 7. Research Quality Rules

When conducting new research:

- Prefer official product documentation for API behavior, security configuration, limits, and pricing.
- Use primary technical publications and reproducible evidence where possible.
- Use competitor analysis to identify patterns and trade-offs, not to prove that every competitor feature belongs in Swiftradish.
- Distinguish observed behavior from marketing claims and opinion.
- Include the date of verification for facts that may change.
- Cite sources in new research documents.
- State limitations when evidence is weak or contradictory.
- Do not fabricate benchmarks, costs, user research, or adoption statistics.
- Do not present legal interpretations as definitive legal advice.

For material decisions, summarize the alternatives considered, the selected approach, the reason for selection, its trade-offs, and what evidence would justify revisiting it.

---

## 8. Research Output and Decision Records

Keep the original PDFs intact.

If additional research is necessary, create a separate, clearly named document rather than modifying an original report.

A useful decision record contains:

- **Decision:** What is being decided?
- **Status:** Proposed, approved, rejected, or superseded.
- **Context:** Why is the decision necessary?
- **Evidence:** What supports the decision?
- **Alternatives:** What credible options were considered?
- **Trade-offs:** What is gained and what is sacrificed?
- **Security and cost impact:** What changes operationally?
- **Consequences:** What becomes easier or harder?
- **Revisit condition:** What new evidence would justify changing the decision?

Do not create a new architecture or product strategy document merely to repeat existing material. Produce the smallest artifact that closes a real decision gap.

---

## 9. Immediate Research Boundary

The current work is repository and architecture preflight followed by staged development of the general-purpose social platform.

Until the owner approves the first implementation slice:

- Inspect and reconcile; do not begin broad feature implementation.
- Do not revive rejected product concepts.
- Do not treat an old MVP screen count or roadmap as automatically approved.
- Do not create or modify cloud resources.
- Do not apply database migrations.
- Do not perform destructive Git operations.
- Do not claim hosting or a $0 operating cost has been validated.

The first implementation plan must identify a coherent, testable vertical slice, its dependencies, its acceptance criteria, and the risks that remain.

**The objective of research is to make Swiftradish easier to build correctly—not to delay implementation indefinitely or to make the product more complicated than it needs to be.**
