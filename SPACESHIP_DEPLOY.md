# Deploying to Spaceship Hosting

Spaceship's cPanel includes a **Setup Node.js App** tool (CloudLinux + Phusion
Passenger), which is what makes it possible to run this Next.js app there.
It works differently from Vercel: there's no git-push auto-deploy — you build
the app and restart it yourself each time you update the site.

## Before you start — confirm two things in cPanel

1. Log in to cPanel → look for **Setup Node.js App** (usually under
   *Software* or *Advanced*). If it's not there, your plan doesn't include
   Node.js hosting and you'd need to upgrade the plan or use a different host
   for the app (the domain itself can stay at Spaceship either way).
2. Check the **Node.js versions offered**. This project needs **Node 18.17
   or newer** (Next.js 14's minimum). Pick the newest available 18.x or 20.x.

## One-time setup in cPanel

1. Open **Setup Node.js App** → **Create Application**.
2. Fill in:
   - **Node.js version**: 18.17+ or 20.x (whichever is available)
   - **Application mode**: Production
   - **Application root**: e.g. `ahealingvaastu` (a folder in your home dir)
   - **Application URL**: your domain (`ahealingvaastu.com`)
   - **Application startup file**: `server.js`
3. Click **Create**. cPanel gives you a command like:
   ```
   source /home/<user>/nodevenv/ahealingvaastu/18/bin/activate && cd /home/<user>/ahealingvaastu
   ```
   Keep this handy — you'll run it before any `npm` command over SSH.

## Environment variables (do this in cPanel, not a committed `.env`)

The contact form sends email through your own **Spacemail** mailbox (already
included with your Spaceship domain) — no third-party email service needed.

In the same Node.js App screen, add these under **Environment Variables**:

| Variable | Value |
|---|---|
| `SMTP_HOST` | `mail.spacemail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `contact@ahealingvaastu.com` (the real mailbox the site logs in as) |
| `SMTP_PASSWORD` | that mailbox's password (the one you use for webmail) |
| `SMTP_FROM` | `bookings@ahealingvaastu.com` (optional "from" address; an alias of the mailbox above) |
| `CONTACT_TO_EMAIL` | `contact@ahealingvaastu.com` (where leads land) |

`SMTP_USER` must be a real mailbox in Spacemail, not an alias: an alias has
no password of its own, so the site cannot log in as it. Aliases such as
`bookings@` can only be used as `SMTP_FROM`. If Spacemail refuses to send
from the alias, delete `SMTP_FROM` and emails will come from `SMTP_USER`.

If the Spacemail subscription lapses and is renewed, check the mailbox still
exists and its password still works in webmail, then re-enter
`SMTP_PASSWORD` here.

Save, then **Restart** the application so it picks them up.

## Uploading and building the app

**Option A — SSH (recommended, if your plan includes it):**

```bash
# 1. Upload the project (excluding node_modules and .next) via Git or SFTP
#    into the "Application root" folder you set above.

# 2. SSH in, then activate the app's Node environment:
source /home/<user>/nodevenv/ahealingvaastu/18/bin/activate
cd /home/<user>/ahealingvaastu

# 3. Install dependencies (including the build tools) and build:
npm ci --include=dev --no-audit
npm run build

# 4. Restart via cPanel's Node.js App screen (or):
touch tmp/restart.txt   # if your setup uses this Passenger convention
```

**Option B — cPanel UI only (no SSH):**

1. Upload the project files via **File Manager** into the application root
   (everything except `node_modules` and `.next`).
2. In **Setup Node.js App**, use the **Run NPM Install** button.
3. Building (`next build`) isn't exposed in the UI on most plans — if there's
   no SSH access, ask Spaceship support how to run a one-off build command,
   or upload a pre-built `.next` folder (built on your own machine with
   `npm run build`, using the same Node major version as the server).
4. Click **Restart**.

## Redeploying after future changes

Every time you change the site:

```bash
source /home/<user>/nodevenv/ahealingvaastu/18/bin/activate
cd /home/<user>/ahealingvaastu
git pull            # or re-upload changed files
npm ci --include=dev --no-audit
npm run build
```
Then click **Restart** in cPanel's Node.js App screen.

## Debugging

- **502/503 error**: almost always means the app failed to start. Check that
  `npm run build` completed successfully and that `server.js` is the
  configured startup file.
- **Logs**: cPanel's Node.js App screen usually links to the app's log file;
  `passenger-status` and `passenger-config restart-app <path>` are also
  available over SSH if your plan includes it.
- **Build fails with `Cannot find module 'tailwindcss'` or `Can't resolve '@/...'`**:
  the app runs in Production mode, so a plain `npm ci` skips the build tools.
  Install with `npm ci --include=dev`, then build again.
- **Form shows "We couldn't send your message right now"**: the app log has a
  line starting `[contact] email send failed`. `EAUTH` means a wrong
  `SMTP_USER` or `SMTP_PASSWORD`; `ECONNECTION`, `ETIMEDOUT` or `ENOTFOUND`
  mean a wrong host or port; a `550` error means the receiving mailbox does
  not exist.
- **Contact form "sends" but no email arrives**: check `SMTP_USER` and
  `SMTP_PASSWORD` are set correctly in cPanel's environment variables (not
  just your local `.env.local`, which never reaches the server), and that
  the mailbox itself exists and its password hasn't changed. Send yourself
  one real test submission after deploying and check the inbox (and spam
  folder, once — after marking it "not spam" it should stay out of spam
  going forward).

## Domain / DNS

Since the domain is already at Spaceship and the app is hosted on Spaceship
too, no external DNS changes should be needed — just point the Node.js App's
**Application URL** at your domain as shown above.
