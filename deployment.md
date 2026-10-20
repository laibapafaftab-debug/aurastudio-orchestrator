# Deployment (single server with Docker)

You need a small Linux server (VPS) with Docker, and two domain names pointing at it (for example `dashboard.example.com` and `api.example.com`).

1. **DNS:** create A records for both domains pointing to the server's IP.
2. **Copy the project** to the server and create `.env` from `.env.example`.
3. **Set production values:**
   - `APP_ENV=production`, `COOKIE_SECURE=true`, `TRUST_PROXY=true`
   - a long random `SECRET_KEY` and `N8N_ENCRYPTION_KEY`
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` (see `backend/scripts/hash_password.py`)
   - `SITE_ORIGINS=https://your-website-domain`
   - `DASHBOARD_DOMAIN`, `API_DOMAIN`
   - `N8N_WEBHOOK_URL=http://n8n:5678/webhook/aurastudio-lead` and a `N8N_WEBHOOK_SECRET`
4. **Start:** `docker compose -f docker-compose.prod.yml up -d --build`
5. **Check:** open `https://API_DOMAIN/health`, then sign in at `https://DASHBOARD_DOMAIN`.
6. **Reach the n8n editor** (optional): by default n8n is only reachable inside the Docker network, which is the safest setup, and the backend talks to it directly. To open the editor in your browser:
   - add `N8N_DOMAIN` to `.env`, create its DNS record, and uncomment the n8n block in `infra/caddy/Caddyfile`;
   - restart with the `up -d --build` command, then **open the n8n address immediately and create the owner account with a strong password**. Until an owner exists, whoever reaches the page first can claim it.
7. **Point the website** at the API: set `WEBHOOK_URL` in the site's `script.js` and add `connect-src https://API_DOMAIN` to its CSP.

## Server hygiene
- Allow only ports 22, 80 and 443 in the firewall. Use SSH keys, disable password SSH login.
- Turn on automatic security updates for the OS.
- Back up the Docker volumes `aura_data` and `n8n_data` (or use Supabase backups).
- Update by pulling changes and re-running the `up -d --build` command; keep an eye on Dependabot pull requests.
