# Aurastudio-orchestrator
# AuraStudio — AI Lead Capture & Automation

Marketing website for **AuraStudio**, an AI lead-capture and follow-up automation studio. Built with plain HTML, CSS and JavaScript so it can be hosted free on GitHub Pages and moved to a custom domain later.

## Page structure

Announcement bar, sticky header with a Services dropdown, hero with an illustrative lead workflow, six-card "what you get" grid, audience cards, four-step process, two feature deep-dives (lead capture, follow-up), tools, recent builds, ways to work together, FAQ accordion, contact form and a four-column footer.

## Features

- Dark and light themes: follows the visitor's system setting on first visit, then remembers their choice
- Responsive layout with a mobile menu and accessible dropdown
- FAQ accordion, dismissible announcement bar, active-section highlighting in the nav
- Scroll-reveal and hero entrance animations (disabled for visitors who prefer reduced motion; content stays visible without JavaScript)
- Lead form with inline validation that posts to a webhook (n8n-ready)
- Semantic HTML, skip link, visible focus states, meta description and Open Graph tags

## Files

```
├── index.html
├── style.css
├── script.js
├── favicon.svg
├── SECURITY.md
└── README.md
```

## Before you publish

1. **Connect the lead form.** Open `script.js` and set `WEBHOOK_URL` to your n8n webhook URL. In the n8n Webhook node, set *Allowed Origins* to your site address. Until a URL is set, the form tells visitors it is not connected, so no lead is lost silently.
2. **Review every line of copy.** The offers, FAQ answers and "Working together" cards are drafts. Edit them so they match what you actually deliver.
3. **Add real proof when you have it.** Add client results or testimonials only once they are real, with permission.
4. **Add a social image.** Create a 1200x630 image and add `og:image` and `og:url` meta tags in `index.html` once the domain is live.

## Deploy on GitHub Pages

1. Create a repository (for example `aurastudio-site`) and upload all files to the root.
2. Go to **Settings → Pages**, choose the `main` branch and the root folder, then save.
3. The site goes live at `https://<your-username>.github.io/<repo-name>/`.

## Connect a custom domain later

1. Buy the domain from any registrar.
2. In **Settings → Pages → Custom domain**, enter the domain and save (GitHub adds a `CNAME` file).
3. At the registrar, add the DNS records GitHub lists for your domain type (A records for an apex domain, or a CNAME for `www`).
4. Tick **Enforce HTTPS** once it becomes available.
5. Update `og:url` in `index.html` to the new domain.

## Security

Protections built into the site:

- **Content Security Policy** (meta tag in `index.html`): only the site's own files, Google Fonts and the form service can load or connect. No inline scripts or inline styles, so injected code is blocked.
- **Form protection:** hidden honeypot field, minimum-fill-time check, 30-second cooldown, length limits and control-character stripping. These stop simple bots only, so also turn on spam protection in your form service (for example reCAPTCHA in Formspree).
- **Clickjacking guard:** the page refuses to run inside someone else's frame.
- External links use `rel="noopener noreferrer"`, the email address is assembled by script, and all dynamic text is inserted as plain text, never as HTML.
- `form-action 'none'` and `upgrade-insecure-requests` in the policy.

**If you change the form service** (for example to an n8n webhook), add its address to `connect-src` in the CSP meta tag, otherwise the browser will block the form.

Account security matters more than code for a static site. Before launch:

- [ ] Two-factor authentication on GitHub (authenticator app or passkey) and on the email used for it
- [ ] Unique, long passwords in a password manager
- [ ] Two-factor, domain lock and auto-renew at the domain registrar
- [ ] **Enforce HTTPS** ticked in GitHub Pages settings
- [ ] Spam protection enabled in the form service
- [ ] No passwords, tokens or API keys in any file in the repository

Limits to know about: GitHub Pages cannot set HTTP security headers, so a few protections (such as `frame-ancestors`) are not available. If you need them later, put Cloudflare in front of your custom domain.

## Tech stack

HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JavaScript, Google Fonts (Bricolage Grotesque and Instrument Sans).
# AuraStudio Orchestrator

A self-hosted lead-capture and follow-up system for [AuraStudio](https://github.com/laibapafaftab-debug). It sits behind a website's contact form, scores every enquiry with AI, stores it, hands it to an n8n workflow, and shows everything in a private dashboard.

> **Status:** first version. After installing, run the backend tests (`pytest`) and `npm run build`, and fix anything your environment shows before deploying to production.

## Contents

- [What it does](#what-it-does)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Repository structure](#repository-structure)
- [Quick start (Docker)](#quick-start-docker)
- [Run without Docker](#run-without-docker)
- [Configuration](#configuration)
- [API reference](#api-reference)
- [Connect your website](#connect-your-website)
- [Connect n8n](#connect-n8n)
- [AI scoring](#ai-scoring)
- [Use Supabase (Postgres)](#use-supabase-postgres)
- [Security](#security)
- [Testing](#testing)
- [Deploy to production](#deploy-to-production)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing and license](#contributing-and-license)

## What it does

1. A visitor fills in the contact form on your website.
2. The backend validates and saves the enquiry, and answers immediately.
3. In the background, the lead is scored (intent, fit, suggested next step) by Claude, or by simple rules if no AI key is set.
4. The lead is sent to an n8n workflow (signed webhook) for follow-up, such as an alert to you and a booking link to the lead.
5. You review leads, change their status, and see every n8n delivery in the dashboard.

## Architecture

```
Visitor ──► Website (static)
                │  POST /api/v1/leads   (CORS: only your site)
                ▼
          Caddy (HTTPS) ──► Backend (FastAPI) ──► Postgres / SQLite
                │                  │
                │                  ├─► Lead scoring (Claude, or rules fallback)
                │                  └─► n8n webhook (HMAC signed) ──► follow-up workflow
                ▼
          Dashboard (Next.js) ──proxies /api──► Backend
```

More detail in [docs/architecture.md](docs/architecture.md).

## Tech stack

| Part | Technology |
|---|---|
| Backend | Python 3.12, FastAPI, SQLAlchemy 2, Pydantic 2, PyJWT, bcrypt, httpx |
| Dashboard | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS |
| Database | SQLite (local) or Postgres / Supabase |
| Automation | n8n |
| AI scoring | Anthropic Claude API (optional, with rules fallback) |
| Deployment | Docker Compose, Caddy (automatic HTTPS) |
| CI | GitHub Actions, Dependabot |

## Repository structure

```
aurastudio-orchestrator/
├── .github/
│   ├── workflows/ci.yml            tests + build on every push and pull request
│   ├── dependabot.yml              automatic dependency and security update PRs
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── backend/                        FastAPI
│   ├── app/
│   │   ├── api/                    routes: auth, leads, workflows (+ shared deps)
│   │   ├── core/                   config, database, security, rate limiting
│   │   ├── services/               lead scoring, n8n client, background pipeline
│   │   ├── models/                 tables.py (database) and schemas.py (requests/responses)
│   │   └── main.py
│   ├── scripts/hash_password.py
│   ├── tests/
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                       Next.js dashboard
│   ├── src/
│   │   ├── app/                    login + (app)/ dashboard, leads, workflows, settings
│   │   ├── components/             reusable UI
│   │   ├── lib/                    API helper, formatting
│   │   └── types/
│   └── Dockerfile
├── infra/caddy/Caddyfile           HTTPS reverse proxy config (production)
├── n8n/workflows/                  exported n8n workflows (versioned)
├── docs/                           architecture.md, deployment.md
├── docker-compose.yml              local development stack
├── docker-compose.prod.yml         production stack (only ports 80 and 443 public)
├── .env.example
├── CONTRIBUTING.md
├── SECURITY.md
└── README.md
```

## Quick start (Docker)

Requirements: Docker with Docker Compose, and Python 3 (only to generate secrets).

1. Create your settings file.
   ```bash
   cp .env.example .env              # Windows PowerShell: Copy-Item .env.example .env
   ```
2. Generate secrets and put them in `.env`.
   ```bash
   python -c "import secrets; print(secrets.token_urlsafe(48))"   # run twice: SECRET_KEY and N8N_ENCRYPTION_KEY
   pip install bcrypt
   python backend/scripts/hash_password.py                        # prints the ADMIN_PASSWORD_HASH line
   ```
   Also set `ADMIN_EMAIL`. Keep the single quotes around the hash.
3. Start everything.
   ```bash
   docker compose up --build
   ```
4. Open:

   | What | Address |
   |---|---|
   | Dashboard | http://localhost:3000 |
   | n8n | http://localhost:5678 |
   | API health check | http://localhost:8000/health |
   | API docs (development only) | http://localhost:8000/docs |

All ports are bound to `127.0.0.1`, so nothing is reachable from the internet in this mode.

## Run without Docker

```bash
# Backend
cd backend
python -m venv .venv
source .venv/bin/activate            # Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
cp ../.env.example ../.env           # then set DATABASE_URL=sqlite:///./data/aurastudio.db
uvicorn app.main:app --reload

# Dashboard (new terminal)
cd frontend
npm install
npm run dev                          # http://localhost:3000, proxies /api to http://localhost:8000
```

## Configuration

All settings are environment variables, normally set in `.env` (never commit it).

| Variable | Required | Description |
|---|---|---|
| `APP_ENV` | no | `development` (default) or `production`. Production refuses to start with a weak secret or insecure cookies, and hides the API docs. |
| `SECRET_KEY` | yes | Long random string (32+ characters) used to sign sessions and hash IPs. |
| `ADMIN_EMAIL` | yes | Dashboard login email (single admin). |
| `ADMIN_PASSWORD_HASH` | yes | bcrypt hash from `scripts/hash_password.py`. Keep single quotes in `.env`. |
| `DATABASE_URL` | no | SQLite by default. Postgres example: `postgresql+psycopg://USER:PASS@HOST:5432/postgres?sslmode=require`. |
| `SITE_ORIGINS` | yes | Websites allowed to post leads. Exact origins, comma separated, no trailing slash. |
| `COOKIE_SECURE` | prod | `true` when the dashboard is served over HTTPS. Required in production. |
| `TRUST_PROXY` | no | `true` only behind your own reverse proxy that sets `X-Forwarded-For` (Caddy does). Never when the backend is directly exposed. |
| `SESSION_HOURS` | no | Login session length. Default `8`. |
| `ANTHROPIC_API_KEY` | no | Enables AI scoring. Without it, rules are used. |
| `SCORING_MODEL` | no | Claude model used for scoring. Default `claude-haiku-5-5`. |
| `N8N_WEBHOOK_URL` | no | Where new leads are sent, for example `http://n8n:5678/webhook/aurastudio-lead`. |
| `N8N_WEBHOOK_SECRET` | no | Shared secret sent to n8n (header and HMAC signature). |
| `N8N_ENCRYPTION_KEY` | Docker | Key the n8n container uses to encrypt its stored credentials. |
| `TZ` | no | Time zone for n8n, for example `Asia/Karachi`. |
| `DASHBOARD_DOMAIN`, `API_DOMAIN` | prod | Domain names for Caddy (production compose file). |
| `N8N_DOMAIN`, `N8N_SECURE_COOKIE` | optional | Only if you expose the n8n editor through Caddy. |

## API reference

Base path: `/api/v1`. The dashboard routes need the login cookie **and** the header `X-Requested-By: aurastudio` on writes.

| Method and path | Access | Purpose |
|---|---|---|
| `GET /health` | public | Health check |
| `POST /leads` | public (CORS-limited) | Submit an enquiry. Returns `202`. |
| `POST /auth/login` | public | Sign in (rate limited). Sets the session cookie. |
| `POST /auth/logout` | public | Clear the session cookie |
| `GET /auth/me` | admin | Who is signed in |
| `GET /leads` | admin | List leads. Query: `status` (`new`, `contacted`, `won`, `lost`), `limit` (1-200), `offset` |
| `GET /leads/stats` | admin | Totals, high-intent count, last 7 days, counts by status |
| `PATCH /leads/{id}` | admin | Change status |
| `DELETE /leads/{id}` | admin | Delete a lead and its workflow log |
| `GET /workflows` | admin | Recent n8n deliveries and whether n8n is configured |
| `POST /workflows/leads/{id}/retrigger` | admin | Send a lead to n8n again (`409` if n8n is not configured) |

Public lead body (`POST /leads`):

| Field | Rules |
|---|---|
| `name` | required, 1-80 characters |
| `email` | required, valid address, up to 120 characters |
| `message` | required, 10-2000 characters |
| `role` | optional, up to 40 characters |
| `source` | optional, up to 40 characters (default `website`) |
| `hp_field` | honeypot. Must stay empty. If filled, the request is silently ignored. |

Other fields are ignored. Responses: `202` accepted, `422` invalid input, `429` too many requests, `413` body too large.

## Connect your website

In the website's `script.js`, set the form address:

```js
var WEBHOOK_URL = 'https://api.yourdomain.com/api/v1/leads';
```

Then:

1. Add the website's address to `SITE_ORIGINS` (for example `https://aurastudio.pro`).
2. Add the API address to the site's Content Security Policy: `connect-src https://api.yourdomain.com`.

The AuraStudio site form already sends `name`, `email`, `role` and `message` in the format the API expects.

## Connect n8n

1. In n8n create a workflow that starts with a **Webhook** node: method `POST`, path `aurastudio-lead`.
2. Set authentication to **Header Auth**: header name `X-Aura-Secret`, value the same as `N8N_WEBHOOK_SECRET`.
3. Add your follow-up steps. The lead arrives under `body`, for example `{{ $json.body.email }}`, `{{ $json.body.intent }}`, `{{ $json.body.next_step }}`. A good first workflow: if `intent` is `high`, alert yourself and send the lead a booking link.
4. **Activate** the workflow, then set in `.env`:
   ```
   N8N_WEBHOOK_URL=http://n8n:5678/webhook/aurastudio-lead
   N8N_WEBHOOK_SECRET=<the same secret>
   ```
   (`/webhook-test/...` only works while you are listening in the editor. Use `/webhook/...` for real traffic.)
5. Restart the backend. The **Workflows** page logs every hand-off and has a "Send again" button.

Each request also carries `X-Aura-Signature: sha256=<hmac>`, the HMAC-SHA256 of the raw JSON body with your secret, in case you want to verify it in a Code node. Save exported workflows in `n8n/workflows/`.

Payload fields: `id`, `name`, `email`, `role`, `message`, `source`, `score`, `intent`, `fit`, `next_step`, `created_at`.

## AI scoring

Set `ANTHROPIC_API_KEY` to score leads with Claude. Each lead gets a score (0-100), intent (`high`, `medium`, `low`), fit (`good`, `ok`, `poor`) and a suggested next step (book a call, send overview, review manually).

- Without a key, or if the call fails, simple keyword rules score the lead, so no lead is ever left unscored.
- Lead text is treated as untrusted. The model is told to ignore instructions inside it, and its answer is checked against fixed options before anything is stored, so free text from the model never reaches the database or n8n.
- Scoring runs in the background, so the website form never waits for it.
- When AI scoring is on, enquiry text is sent to the AI provider. Say so in your privacy notice.

## Use Supabase (Postgres)

Supabase is Postgres, so only one setting changes:

```
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST:5432/postgres?sslmode=require
```

Tables are created when the backend starts. Once the schema starts to change, add Alembic migrations.

## Security

- **Admin login:** bcrypt password hash, signed session in an `HttpOnly`, `SameSite=Lax` cookie (`Secure` when `COOKIE_SECURE=true`), 10 attempts per 15 minutes per IP, same work whether or not the email exists.
- **CSRF:** every write needs the `X-Requested-By` header, which other websites cannot send; CORS allows only your own site origins.
- **Public endpoint:** strict length limits, control-character stripping, honeypot field, 5 enquiries per 10 minutes per IP, 20 KB body limit.
- **Privacy:** only a keyed hash of the visitor's IP is stored, not the address.
- **Headers:** `nosniff`, `X-Frame-Options: DENY`, `no-store`, HSTS in production. API docs are off in production.
- **Startup guard:** `APP_ENV=production` refuses to start with a weak `SECRET_KEY` or without `COOKIE_SECURE=true`.
- **Secrets** live only in `.env` (git-ignored). The n8n hand-off is signed.
- **Supply chain:** Dependabot opens update pull requests; CI runs `npm audit`.

Known limits (fix when you outgrow them):

- Rate limits are in memory and per process. With several workers or servers, use Redis.
- Sessions are stateless: logging out removes the cookie, but a stolen cookie stays valid until it expires.
- One admin account only.
- With `TRUST_PROXY=false` the backend sees the dashboard container as the client, so all dashboard logins share one rate-limit bucket. Behind Caddy, set `TRUST_PROXY=true`.
- Keep Next.js on the latest 14.2.x patch and review `npm audit` regularly.

Report vulnerabilities as described in [SECURITY.md](SECURITY.md).

## Testing

```bash
cd backend
pytest -q                              # full API tests
python -m unittest tests.test_pure     # no-dependency tests: scoring, rate limiter, signing
```

```bash
cd frontend
npm run build                          # type-checks and builds the dashboard
```

CI runs both on every push and pull request.

## Deploy to production

Short version (full steps in [docs/deployment.md](docs/deployment.md)):

1. A small Linux server with Docker, and two domain names pointing at it.
2. Set `APP_ENV=production`, `COOKIE_SECURE=true`, `TRUST_PROXY=true`, strong secrets, `SITE_ORIGINS`, `DASHBOARD_DOMAIN`, `API_DOMAIN` in `.env`.
3. `docker compose -f docker-compose.prod.yml up -d --build`
4. Check `https://API_DOMAIN/health`, sign in at `https://DASHBOARD_DOMAIN`, then point your website at the API.

Checklist before going live:

- [ ] HTTPS in front of everything (the production compose file uses Caddy)
- [ ] Long admin password, strong `SECRET_KEY`, `COOKIE_SECURE=true`
- [ ] n8n owner account created immediately with a strong password, n8n version pinned in the compose file
- [ ] n8n editor and the database not exposed to the internet
- [ ] Two-factor authentication on GitHub, your server provider and Supabase
- [ ] Firewall allows only ports 22, 80 and 443; SSH keys only
- [ ] Backups of the `aura_data` and `n8n_data` volumes (or Supabase backups)
- [ ] Privacy notice mentions that enquiries are stored and processed

## Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Website form says it is "not connected yet" | `WEBHOOK_URL` in the site's `script.js` is empty. Set it to your API address. |
| Browser blocks the form (CORS or CSP error) | Add the site's exact origin to `SITE_ORIGINS`, and the API address to the site's CSP `connect-src`. |
| Backend stops at startup in production | The guard found a weak `SECRET_KEY` (under 32 characters) or `COOKIE_SECURE` is not `true`. |
| Cannot log in | Check `ADMIN_EMAIL` and that `ADMIN_PASSWORD_HASH` is in single quotes. After 10 failed attempts you are blocked for 15 minutes (`429`). |
| Logged out immediately on HTTPS | `COOKIE_SECURE` must match how you serve the dashboard (`true` for HTTPS, `false` for plain http locally). |
| Leads show "Scoring..." | The background task is still running or failed. Check the backend logs. |
| n8n does not receive leads | Workflow not **activated**, wrong path, or you used the `/webhook-test/` URL. The Workflows page shows the HTTP status. |
| `npm run build` fails | Run it and send the error output; make sure Node 20 is used. |
| Docker volume permission errors | Use the named volumes in the compose files (already the default), not bind mounts. |

## Roadmap

- Database migrations (Alembic)
- Redis-based rate limiting and session revocation
- Multiple dashboard users and roles
- Email notifications and CSV export
- Lead detail view with notes and history

## Contributing and license

See [CONTRIBUTING.md](CONTRIBUTING.md). Pull requests should include tests and pass CI.

No license has been chosen yet. Until a `LICENSE` file is added, all rights are reserved by the author.

Built by Laiba Aftab, AuraStudio.
