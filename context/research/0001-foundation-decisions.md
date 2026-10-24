# 0001 — Foundation decisions

Status: approved for Phase A on 14 Oct 2026 by the request to implement the foundation plan. This note records those decisions. It does not apply them to a running application.

The original PDFs in this directory are unchanged.

Labels used below:

- **Owner decision.** The project owner selected or rejected this.
- **Verified fact.** Checked against this repository, or against a cited official page, on the date given.
- **Recommendation.** A proposed choice. "Accepted" means it was adopted for the stated scope. It is not a measured production result.
- **Inference.** A conclusion drawn from cited figures. It is not a measurement of this project.
- **Unverified.** Not yet established, or established only enough to remain an open decision.

## Decision

Swiftradish proceeds as a general-purpose social PWA. Foundation work writes the design contract, the environment templates, and one gitignore exception. It does not scaffold the app, install packages, move the Python project, or change cloud resources.

## Product

- **Owner decision.** Profiles, follows, a chronological feed, text and image posts, carousels, likes, comments, bookmarks, sharing, and short-form video in a later phase. Ordinary communities have membership, discussions, threaded replies, voting, sorting, and moderation. Search, notifications, privacy, reporting, blocking, and an installable PWA stay in the product direction.
- **Owner decision.** The first usable release is the text social graph: account, profile, follow, text post, chronological feed, like, comment, bookmark, and copy-link share. Images, communities, reels, search, notifications, safety, and PWA install follow in that order.
- **Owner decision. Rejected.** Co-Plots, Radish Patches as a branded mechanic, mandatory community joins, the My Patch / Fresh Harvest dual feed, recommendation ranking, badges, and streaks.
- **Owner decision.** The mascot is a visual character with a bible and a system for 100 or more consistent poses. Artwork is not part of Phase A. The working name is "the radish." "Pip" is a research finding, not a decision.

## Architecture

- **Owner decision.** Next.js, FastAPI, the existing Supabase project in Mumbai (`ap-south-1`), and the existing Backblaze B2 bucket in `eu-central-003`. One `uv` project stays at the repository root.
- **Recommendation, accepted for local development.** A long-lived FastAPI process uses the Supabase session pooler on port 5432. `NullPool` and the transaction pooler on port 6543 are for a future serverless host only.
- **Recommendation, accepted as the authorization model.** FastAPI checks the verified `sub`. Tables live in schema `app`, outside the Data API. The application role is `swiftradish_app`, not the superuser. Alembic is the only migration path. `create_all()` is banned. No SQL was applied in Phase A.
- **Unverified, and gated.** This project's JWT signing algorithm. The verifier is not written until the dashboard signing keys and the public JWKS are inspected. ES256 is not assumed. HS256 is not mixed into an asymmetric allowlist. If the JWKS is empty, work stops before anyone copies the JWT secret into the app.
- **Recommendation, accepted for the foundation only.** No Redis, Kafka, Elasticsearch, Cloudflare Worker, second bucket, or CDN is added in the foundation. That is not a rejection of Workers as a later host. Restart-safe work uses a Postgres outbox when that migration is separately approved. Notifications are stored rows the client polls. WebSockets wait until a host that stays awake is chosen.
- **Unverified.** Hosting. No host is selected. Local development is the only execution model. `$0/month` is a goal, not a measured result. The comparison below does not add separate free allowances into a total cost. Supabase in Mumbai and B2 in `eu-central-003` stay the existing resources. This comparison is only about where the Next.js app and the FastAPI process could run later.
- **Verified fact.** The root `uv` project was not moved. `pyproject.toml` is still at the repository root, named `swiftradish`, with `requires-python` `>=3.13` and no dependencies. `.python-version` is `3.13`. `main.py` and `.venv` remain. Phase A installed no packages, applied no migration, and changed no cloud resource.
- **Unverified here.** PDF claims about CVE-2026-102266 and India takedown clocks. They are not implementation requirements.

## Environment files

- **Verified fact.** On 15 Oct 2026, `git check-ignore -q` ignored `backend/.env` and `frontend/.env.local` (exit 0) and did not ignore `backend/.env.example` or `frontend/.env.example` (exit 1). The last matching rule for the backend example is `!backend/.env.example`. That exception stays, because `backend/.env.*` would otherwise hide the template. `frontend/.env.production`, `backend/.env.production`, and `backend/.env.local` are ignored. `git status -uall` lists the two examples and does not list the local secret files. `.gitignore` was not changed in this pass.
- **Verified fact.** The example files use `replace_with_*` for secrets. Their other values are public defaults: the app name, `development`, localhost origins, JWT audience `authenticated`, B2 region `eu-central-003`, and the public B2 S3 endpoint. `B2_PUBLIC_BASE_URL` is empty in the backend example, matching its comment.
- **Verified fact.** In the ignored local files, the secret-bearing keys differ from those placeholders, so they are not the unresolved template strings. Keys that still match the examples are the same public defaults: `APP_NAME`, `APP_ENV`, `LOG_LEVEL`, `API_V1_PREFIX`, `FRONTEND_ORIGINS`, `SUPABASE_JWT_AUDIENCE`, `B2_REGION`, `B2_ENDPOINT_URL`, `NEXT_PUBLIC_APP_URL`, and `NEXT_PUBLIC_API_URL`. `B2_PUBLIC_BASE_URL` is empty locally as well. The filled values were not checked against Supabase or Backblaze. They are not copied here.
- `.env.development` was not created.
- FastAPI will load `backend/.env` from the repo root when the settings module exists. Next.js will load `frontend/.env.local` when `next dev` runs inside `frontend/`. Neither loader exists yet.
- **Recommendation, for that future settings module.** Validate configuration per feature. Startup must not require B2, a JWKS URL, or a database URL for a feature that is not turned on. The backend example already says the B2 values are used when media uploads are enabled.
- Browser variables are only `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Database URLs, the B2 application key, and any Supabase secret key are absent from the frontend.

## Hosting comparison

**Unverified. Open decision.** Checked against official documentation on 15 Oct 2026. No host is chosen. A free allowance on one service does not prove a `$0` total.

- **Verified fact.** Cloudflare Pages is the static path. The Next.js guide, updated 25 Aug 2026, says full-stack Next.js should use vinext on Workers, and Pages is for a static export. [Pages Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/). Free Pages limits, updated 5 Sep 2026: 500 builds per month, one build at a time, 20,000 files, and 100 custom domains. [Pages limits](https://developers.cloudflare.com/pages/platform/limits/). Static asset requests are unlimited. Pages Functions count against the Workers Free quota. [Pages Functions pricing](https://developers.cloudflare.com/pages/functions/pricing/).
- **Verified fact.** Cloudflare Workers documents FastAPI through `workers.asgi`. The Python Workers page, updated 17 Sep 2026, still requires the `python_workers` compatibility flag. [FastAPI on Workers](https://developers.cloudflare.com/workers/languages/python/packages/fastapi/). [Python Workers](https://developers.cloudflare.com/workers/languages/python/). Limits, updated 12 Oct 2026, for the Free plan: 100,000 requests per day, 10 ms of CPU per invocation, 128 MB of memory, 50 subrequests, six connections waiting on response headers, and a 64 MiB uncompressed bundle. Network wait is excluded from CPU time. [Workers limits](https://developers.cloudflare.com/workers/platform/limits/). That official size limit replaces an older third-party claim of a 3 MiB gzip cap. A Worker is not the long-lived process accepted for local development. The session-pooler recommendation stands for that process. `NullPool` and the transaction pooler remain the note for a future serverless host. **Unverified:** whether this FastAPI app would stay inside 10 ms of CPU.
- **Verified fact.** Render documents a FastAPI web service and a Free plan that spins down after 15 minutes without inbound HTTP or WebSocket traffic, then takes about a minute to return. The filesystem is ephemeral. Free instance hours are 750 per month, and a spun-down service does not consume them. [Render free](https://render.com/docs/free). [Deploy FastAPI](https://render.com/docs/deploy-fastapi). The web-service docs list the free size as 0.1 CPU and 512 MB. [Web services](https://render.com/docs/web-services). It can run a normal FastAPI process. It is not an always-on host.
- **Verified fact.** Railway documents FastAPI deployment. The Free plan is `$0` with `$1` of monthly credit that does not roll over, capped at 1 vCPU, 0.5 GB, and one replica. [Railway pricing](https://docs.railway.com/pricing). [Railway FastAPI](https://docs.railway.com/guides/fastapi). The public rate table is about `$10` per GB-month of memory and `$20` per vCPU-month. [railway.com/pricing](https://railway.com/pricing). **Inference:** an always-on 0.5 GB service exceeds that `$1` credit. This is not a measured invoice.
- **Verified fact.** Koyeb documents one free web service per organization: 512 MB, 0.1 vCPU, 2 GB SSD, Frankfurt or Washington only. It is not for production, it cannot be a worker service, and it scales to zero after one hour without traffic. [Koyeb instances](https://www.koyeb.com/docs/reference/instances).
- **Verified fact.** Google Cloud Run can scale to zero. On the pricing page checked 15 Oct 2026, request-based billing's us-central1 free tier is 180,000 vCPU-seconds, 360,000 GiB-seconds, and 2 million requests per month. Instance-based billing has a different free tier: 240,000 vCPU-seconds and 450,000 GiB-seconds. Cloud Build and Artifact Registry are billed separately. Mumbai (`asia-south1`) is listed as Tier 1. [Cloud Run pricing](https://cloud.google.com/run/pricing). This does not prove a `$0` bill.
- **Verified fact.** Fly.io's pricing page says new organizations have no free tier. The trial is 2 machine-hours or 7 days, whichever comes first. [Fly.io pricing](https://docs.fly.io/about/pricing). [Fly.io trial](https://fly.io/docs/about/free-trial/). It is not an ongoing `$0` FastAPI option.
- **Verified fact, and not a host choice.** Supabase's pricing page says a Free project pauses after one week of inactivity, with a limit of two active projects. The pausing guide says the trigger is low database activity over the past week, with a warning email and restore for up to one year. [Supabase pricing](https://supabase.com/pricing). [Project pausing](https://supabase.com/docs/guides/platform/free-project-pausing). Rechecked 15 Oct 2026.

## Design

`DESIGN.md` is the design-research record and the proposed UI contract. It compares three visual directions and does not approve one. Semantic tokens, both themes, one icon set, motion ceilings tied to WCAG 2.2.3 and Material's short and medium bands, and screenshot QA at 390, 768, and 1280 remain. Lucide is the recommended icon set; its current license is ISC, with a Feather-derived MIT subset. The palette hex values and Source Sans 3 stay recommendations. Contrast for those hex values was calculated on 15 Oct 2026: several dark-surface pairs fail normal-text AA, and spark on white fails the 3:1 non-text threshold. No replacement hex was chosen. The mascot system still targets 100 or more poses. Three views, six arm poses, and eight faces equal 144 combinations; that figure is arithmetic, not proof the poses will cohere. Artwork was not generated. Screen design waits for the approval gate in `DESIGN.md`.

## Consequences

Phase B still needs a separate approval before any install or scaffold. Frontend implementation also waits for the visual approval gate: direction, tokens, component rules, mascot direction, and representative desktop and mobile screens. The first migration needs its own approval, and it cannot start until schema exposure, grants, and the authorization tests are specified in that change. JWT verification cannot start until the signing-key inspection is done. No host is selected by this note.

## Revisit when

- A host is chosen.
- The JWKS inspection shows a symmetric key or an unexpected algorithm.
- A visual direction is approved, or the first shell screenshots reject the palette or type.
- A failing contrast pair is replaced.
- The seven-pose validation sheet cannot share one silhouette.
