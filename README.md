# A Healing Vaastu

Marketing website for **A Healing Vaastu** — a Vastu Shastra & Vedic astrology
consultancy led by Anjli Gupta, serving clients across Canada, the US, India,
and worldwide.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion**.

## Features

- Mesh-gradient hero with a 3D 8-direction Vastu compass and a hovering isometric home
- Scroll-triggered animations throughout (Framer Motion + IntersectionObserver lotus blooms)
- Animated stat counters, testimonial slider (8 client stories across 3 continents)
- Inverted-gradient "outro" footer that mirrors the hero
- Working booking form backed by an email-sending API route (`/api/contact`),
  sent via your own Spacemail (Spaceship email) mailbox — no third-party email service
- Fully responsive, accessible, `prefers-reduced-motion` aware

## Getting started

```bash
npm install
cp .env.example .env.local   # add your Spacemail mailbox credentials (optional in dev)
npm run dev                  # http://localhost:3000
```

The form works in development **without any secrets** — with no `SMTP_USER` /
`SMTP_PASSWORD` set, the API route validates the submission and logs it to
the server console, returning success. Add credentials to actually send email.

## Project structure

```
app/
  layout.tsx            fonts (Fraunces + Hanken Grotesk) + metadata
  page.tsx              assembles the sections
  globals.css            design tokens, mesh gradients, compass/lotus animation
  api/contact/route.ts  POST endpoint → validates + emails via Spacemail SMTP (Nodemailer)
components/
  ui/                   Reveal, Lotus, VastuCompass, SectionHeading (reusable)
  sections/             Nav, Hero, TrustBar, Stats, Services, Elements,
                        About, Process, Testimonials, Blog, Contact, Footer
lib/content.ts          all copy & data in one place
public/logo.png         brand logo
public/iso-home.png     isometric home illustration used in the hero
server.js               production entry point for cPanel/Passenger hosting
                        (not used by `npm run dev` or Vercel)
```

## Environment variables

See `.env.example`. All optional in development.

| Variable | Purpose |
|----------|---------|
| `SMTP_HOST` | Spacemail SMTP host (`mail.spacemail.com`) |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | the sending mailbox's full address |
| `SMTP_PASSWORD` | that mailbox's password |
| `CONTACT_TO_EMAIL` | inbox that receives booking leads |

## Deploy

This project is hosted on **Spaceship** (cPanel + Node.js Selector /
Phusion Passenger) — see [`SPACESHIP_DEPLOY.md`](./SPACESHIP_DEPLOY.md) for
the full step-by-step guide, including one-time setup and how to redeploy
after future changes.

It also deploys to [Vercel](https://vercel.com) with zero extra config if
you ever want an alternate/staging host — just add the environment
variables in the project settings and push (Vercel ignores `server.js`, it
isn't needed there).

## Personalising further

- Replace the About portrait placeholder with a real photo of Anjli
- Point social links to real profiles (`components/sections/Footer.tsx`)
- Add real blog articles under the Blog section once written
