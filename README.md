# Md Tamim Hossain — Developer Portfolio

Personal developer portfolio built with Next.js 16, TypeScript, and Tailwind CSS v4.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animations | Motion (Framer Motion v12) |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Deployment | Vercel |
| Fonts | Geist Sans + Geist Mono (next/font) |

## Project Structure

```
my-portfolio/
├── app/                    # Next.js App Router pages and routes
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── projects/           # Projects index + [slug] case study pages
│   ├── resume/             # Resume page (web + print)
│   ├── layout.tsx          # Root layout with metadata, ThemeProvider
│   ├── page.tsx            # Home page
│   ├── sitemap.ts          # Auto-generated sitemap
│   ├── robots.ts           # robots.txt
│   ├── manifest.ts         # Web app manifest
│   ├── not-found.tsx       # 404 page
│   ├── error.tsx           # Route error boundary
│   └── global-error.tsx    # Root error boundary
│
├── components/
│   ├── case-study/         # Case study page sub-components
│   ├── layout/             # Header, Footer, Container, Section, etc.
│   ├── motion/             # FadeIn animation wrappers
│   ├── providers/          # ThemeProvider
│   ├── sections/           # Full page sections (About, Skills, Projects, Contact)
│   └── ui/                 # Primitive components (Button, Badge, Card, etc.)
│
├── lib/
│   ├── actions/            # Server Actions (contact form)
│   ├── validations/        # Zod schemas
│   ├── projects.ts         # Project data model + content
│   ├── site.ts             # Site config, about content, education, values
│   ├── skills.ts           # Skills data
│   ├── rate-limit.ts       # In-memory rate limiter
│   └── utils.ts            # cn() utility
│
└── public/
    └── images/projects/    # Project cover images and screenshots
        └── [slug]/
            ├── cover.jpg
            └── screenshot-*.jpg
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Local Development

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your values

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

### Lint + Type Check

```bash
npm run lint
npx tsc --noEmit
```

## Environment Variables

See [`.env.example`](.env.example) for all required and optional variables.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Canonical site URL |
| `RESEND_API_KEY` | Yes (for email) | Resend API key |
| `CONTACT_EMAIL` | Yes (for email) | Destination email for contact form |
| `RATE_LIMIT_MAX` | No | Max submissions per IP (default: 3) |
| `RATE_LIMIT_WINDOW` | No | Window in seconds (default: 600) |

## Adding a Project

1. Open `lib/projects.ts`
2. Add a new object to the `projects` array following the existing structure
3. Set `featured: true` to display it on the home page
4. Add images to `public/images/projects/[slug]/`
4. Run `npm run build` to verify

No UI code changes required.

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SITE_URL`
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Deploy

### Vercel Configuration

No `vercel.json` required — Next.js 16 is auto-detected. Default build command (`next build`) and output directory (`.next`) are correct.

For custom domains: configure in Vercel dashboard → Project → Domains.

## Updating Personal Information

| What to update | Where |
|----------------|-------|
| Name, role, bio, social links | `lib/site.ts` → `siteConfig` |
| About page content | `lib/site.ts` → `aboutContent` |
| Education | `lib/site.ts` → `education` |
| Values | `lib/site.ts` → `values` |
| Skills | `lib/skills.ts` → `skillGroups` |
| Projects | `lib/projects.ts` → `projects` array |
| Resume PDF | Replace `public/resume.pdf`, update `siteConfig.resumePdfUrl` |

## Pre-Deployment Checklist

- [ ] Replace all `[PLACEHOLDER: ...]` values in `lib/site.ts`
- [ ] Replace all `[PLACEHOLDER: ...]` values in `lib/skills.ts`
- [ ] Add real projects to `lib/projects.ts`
- [ ] Add project images to `public/images/projects/`
- [ ] Add `public/resume.pdf`
- [ ] Set `NEXT_PUBLIC_SITE_URL` in Vercel
- [ ] Set `RESEND_API_KEY` in Vercel
- [ ] Set `CONTACT_EMAIL` in Vercel
- [ ] Verify contact form sends email in production
- [ ] Update Twitter handle in `app/layout.tsx` metadata if applicable
- [ ] Test on mobile, tablet, desktop
- [ ] Test dark mode and light mode
- [ ] Test keyboard navigation

## License

Personal portfolio — all rights reserved.
