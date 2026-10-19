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
