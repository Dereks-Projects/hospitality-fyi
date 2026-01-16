# Portfolio Template: Article-Centric Magazine Sites

## Overview

This template describes how to build a mobile-first magazine-style site using Next.js and Sanity.io. These sites are built for acquisition — clean code, enterprise-grade SEO, and professional architecture that appeals to major hospitality companies.

**Reference implementation:** BACKBAR (backbar.fyi)

**All sites use the same Sanity content lake, filtered by different categories.**

---

## The SEO Philosophy

SEO is not an afterthought — it is the foundation. When you have 12 interconnected sites with perfect technical SEO, you create a network effect that individual competitors cannot match. Every decision in this template prioritizes:

1. **Crawlability** — Search engines find and understand every page
2. **Indexability** — Every page has unique, optimized metadata
3. **Structured Data** — JSON-LD tells Google exactly what each page contains
4. **Internal Linking** — Related articles, tags, and subcategories create a web of relevance
5. **Speed** — Server-side rendering, optimized images, minimal JavaScript
6. **Authority** — Canonical URLs, proper redirects, no duplicate content

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.0.7 | App Router, SSR, SEO |
| Sanity.io | Latest | Headless CMS, shared content lake |
| CSS Modules | — | Scoped styling, no Tailwind |
| pnpm | Latest | Fast package management |
| Vercel | — | Hosting, edge functions, analytics |
| GoDaddy | — | DNS management |

---

## Architecture

### One Sanity Project, Multiple Sites

All sites pull from the same Sanity project (`21zbxo34`, dataset `production`). Each site filters by:
- `category` field (e.g., "spirits", "wine", "hospitality")
- `sites` array field (e.g., "backbar", "somm", "hospitality")

This architecture means:
- One place to manage all content
- Articles can appear on multiple sites
- Consistent data structure across properties
- Single source of truth

---

## Folder Structure

```
project-root/
├── middleware.ts                    # Geo-blocking (China/Russia) - ROOT LEVEL
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout (Header, Footer, fonts, metadata)
│   ├── globals.css                 # Global styles
│   ├── page.module.css             # Homepage styles
│   ├── icon.png                    # Favicon (MUST be here, not just public/)
│   ├── sitemap.ts                  # Dynamic sitemap generation
│   ├── robots.ts                   # Robots.txt generation
│   ├── not-found.tsx               # Custom 404 page
│   ├── not-found.module.css        # 404 styles
│   ├── legal-pages.module.css      # Shared legal page styles
│   ├── about/
│   │   ├── page.tsx                # About page
│   │   └── about.module.css
│   ├── privacy/
│   │   └── page.tsx                # Privacy policy
│   ├── terms/
│   │   └── page.tsx                # Terms of use
│   ├── cookies/
│   │   └── page.tsx                # Cookie policy
│   ├── disclaimer/
│   │   └── page.tsx                # Content disclaimer
│   └── articles/
│       ├── page.tsx                # Articles archive (page 1)
│       ├── articles.module.css     # Archive styles
│       ├── [slug]/
│       │   ├── page.tsx            # Individual article (JSON-LD, full SEO)
│       │   └── article.module.css
│       ├── page/
│       │   └── [page]/
│       │       └── page.tsx        # Pagination (page 2, 3, etc.)
│       ├── subcategory/
│       │   └── [subcategory]/
│       │       └── page.tsx        # Filtered by subcategory
│       └── tag/
│           └── [tag]/
│               └── page.tsx        # Filtered by tag
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Client Component (hamburger menu)
│   │   ├── Header.module.css
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   ├── homepage/
│   │   ├── FeaturedArticle.tsx + .module.css
│   │   ├── SubFeaturedArticles.tsx + .module.css
│   │   ├── ArticleCard.tsx + .module.css
│   │   ├── ArticleGrid.tsx + .module.css
│   │   └── SubcategoryDropdown.tsx + .module.css
│   └── article/
│       └── RelatedArticles.tsx + .module.css
├── public/
│   ├── [site]-favicon.png          # Favicon image
│   └── [site]-socialcard.png       # OG image (1200x630)
├── sanity/
│   ├── lib/
│   │   └── client.ts               # Sanity client
│   ├── env.ts                      # Environment variables
│   └── queries.ts                  # GROQ queries
└── .env.local                      # Credentials (never committed)
```

---

## SEO Implementation (Critical)

### Every Page Must Have

1. **Unique title** — `Page Name | SITENAME`
2. **Unique description** — Compelling, keyword-rich, under 160 characters
3. **Canonical URL** — Prevents duplicate content issues
4. **Open Graph tags** — Facebook, LinkedIn sharing
5. **Twitter Card tags** — Twitter sharing

### Article Pages Must Also Have

6. **JSON-LD Article schema** — Tells Google this is an article
7. **JSON-LD Breadcrumb schema** — Shows site structure
8. **Dynamic metadata via generateMetadata** — Unique per article

### Required SEO Files

#### app/sitemap.ts
Dynamic sitemap that queries Sanity for all content:
- Homepage (priority: 1.0)
- Article collection (priority: 0.9)
- Individual articles (priority: 0.8)
- About page (priority: 0.7)
- Subcategory pages (priority: 0.6)
- Tag pages (priority: 0.5)
- Legal pages (priority: 0.3)

#### app/robots.ts
```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/studio/'],
    },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

### JSON-LD Implementation

Every article page includes two JSON-LD blocks injected via `<script type="application/ld+json">`:

**Article Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Article subtitle",
  "image": "https://cdn.sanity.io/images/...",
  "datePublished": "2025-01-15T00:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SITENAME",
    "url": "https://yourdomain.com"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://yourdomain.com/articles/slug"
  }
}
```

**Breadcrumb Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://..." },
    { "@type": "ListItem", "position": 2, "name": "Articles", "item": "https://..." },
    { "@type": "ListItem", "position": 3, "name": "Subcategory", "item": "https://..." },
    { "@type": "ListItem", "position": 4, "name": "Article Title", "item": "https://..." }
  ]
}
```

### generateMetadata Pattern

```typescript
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await client.fetch(articleBySlugQuery, { slug })
  
  if (!article) {
    return { title: 'Article Not Found | SITENAME' }
  }

  return {
    title: `${article.title} | SITENAME`,
    description: article.subtitle || `Read ${article.title} on SITENAME`,
    alternates: {
      canonical: `https://domain.com/articles/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.subtitle,
      url: `https://domain.com/articles/${slug}`,
      siteName: 'SITENAME',
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author || 'Default Author'],
      images: article.mainImage?.asset?.url ? [{
        url: article.mainImage.asset.url,
        width: 1200,
        height: 630,
        alt: article.mainImage.alt || article.title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.subtitle,
      images: article.mainImage?.asset?.url ? [article.mainImage.asset.url] : [],
    },
  }
}
```

---

## Sanity Queries

### Query Pattern

All queries filter by BOTH category AND sites array:

```javascript
*[_type == "article" && category == "spirits" && "backbar" in sites]
```

For a new site, change both values:

```javascript
*[_type == "article" && category == "hospitality" && "hospitality" in sites]
```

### TypeScript Type Casting

When passing parameters to `client.fetch()`, TypeScript requires explicit casting:

```typescript
// WRONG — TypeScript error
const articles = await client.fetch(tagQuery, { tag: queryTag })

// CORRECT — Explicit type casting
const articles = await client.fetch(tagQuery, { tag: queryTag } as Record<string, string>)
```

### Required Queries

Define these in `sanity/queries.ts`:

1. **allArticlesQuery** — Homepage and collection, ordered by publishedAt desc
2. **articleBySlugQuery** — Single article with full body content
3. **articlesBySubcategoryQuery** — Filtered by subcategory parameter
4. **articlesByTagQuery** — Filtered by tag parameter
5. **relatedArticlesQuery** — Same subcategory, excludes current, limit 3
6. **relatedArticlesByCategoryQuery** — Fallback if subcategory has <3 articles

---

## Geo-Blocking Middleware

Create `middleware.ts` in the **project root** (not in app folder):

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BLOCKED_COUNTRIES = ['CN', 'RU']

export function middleware(request: NextRequest) {
  const country = request.headers.get('x-vercel-ip-country') || ''

  if (BLOCKED_COUNTRIES.includes(country)) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Access Restricted | SITENAME</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, sans-serif;
              background-color: #00171f;
              color: #ffffff;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding: 20px;
            }
            .container { max-width: 500px; }
            h1 { font-size: 32px; margin-bottom: 16px; }
            p { font-size: 16px; opacity: 0.8; line-height: 1.6; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Access Restricted</h1>
            <p>SITENAME is not available in your region.</p>
          </div>
        </body>
      </html>`,
      {
        status: 403,
        headers: { 'Content-Type': 'text/html' },
      }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)'],
}
```

**Important:** 
- Do NOT use `request.geo` — TypeScript doesn't recognize it
- Use `request.headers.get('x-vercel-ip-country')` instead
- Only works on Vercel production, not localhost

---

## Custom 404 Page

Create `app/not-found.tsx` with:
- Large "404" heading
- "Page Not Found" title
- Helpful message
- "Back to Home" button (primary/accent color)
- "Browse Articles" button (secondary/outline)
- Help links section (About, Articles, Privacy)
- Branded styling matching site colors

Next.js automatically uses this for all 404 errors.

---

## Homepage "More" Button

Simple approach (recommended): Link to /articles page

```tsx
{articles.length > 12 && (
  <div className={styles.moreButtonWrapper}>
    <Link href="/articles" className={styles.moreButton}>
      More
    </Link>
  </div>
)}
```

**Why not dynamic "Load More"?**
- Same SEO value — articles indexed via /articles and sitemap
- Less code, fewer bugs
- Cleaner architecture
- All content is crawlable

---

## Dynamic Filtering

Subcategory and tag pages query Sanity directly — no hardcoded lists.

**Why:** If you add a new subcategory in Sanity, it works automatically without code changes.

**How:** URL slug is converted to query value:
- URL: `/articles/subcategory/other-spirits`
- Conversion: dashes → spaces, capitalize each word
- Query: `subcategory == "Other Spirits"`

For tags:
- URL: `/articles/tag/fine-dining`
- Conversion: dashes → spaces, lowercase
- Query: `$tag in tags` where tag = "fine dining"

---

## Data Conventions in Sanity

Maintain consistency across all sites:

| Field | Format | Example |
|-------|--------|---------|
| Subcategories | Title Case | "Bourbon", "Other Spirits", "Service" |
| Tags | lowercase | "cocktail history", "fine dining" |
| Slugs | lowercase-dashes | "buffalo-trace-distillery" |
| Author | Full Name | "Derek Engles" |

The code handles display formatting — Sanity stores the canonical version.

---

## Client vs Server Components

Next.js App Router defaults to Server Components. Use Client Components (`'use client'`) only when needed.

**Server Components (default):**
- Pages
- Layouts
- Article content
- Static sections

**Client Components (add 'use client'):**
- Header (hamburger menu state)
- SubcategoryDropdown (onChange handler)
- Any component with useState, useEffect, onClick, onChange

---

## Critical Pitfalls — Do NOT Do These

### 1. Do NOT use `next/image` without full CSS preparation
**Problem:** `next/image` with `fill` prop requires parent elements to have `position: relative` and defined dimensions. Without this, images break across entire site.
**Solution:** Stick with `<img>` tags unless you're prepared to update all related CSS.

### 2. Do NOT use `scroll-behavior: smooth` in globals.css
**Problem:** Conflicts with Next.js App Router navigation. Pages load at wrong scroll position.
**Solution:** Remove from CSS entirely. Next.js handles scroll reset automatically.

### 3. Do NOT upgrade Next.js blindly
**Problem:** Running `pnpm add next@latest` can break every TSX file.
**Solution:** Use specific patch versions (e.g., `pnpm add next@16.0.7`). Test locally before pushing.

### 4. Do NOT dump multiple files at once
**Problem:** Files get saved to wrong locations, causing cascading errors.
**Solution:** One file at a time, with exact folder path, wait for confirmation.

### 5. Do NOT put favicon only in public/
**Problem:** May not be picked up by Next.js consistently.
**Solution:** Copy favicon to `app/icon.png` for guaranteed detection.

### 6. Do NOT hardcode subcategory or tag lists
**Problem:** Breaks when articles have values not in the list.
**Solution:** Query Sanity dynamically. Extract unique values from actual data.

### 7. Do NOT use event handlers in Server Components
**Problem:** `onChange`, `onClick` fail silently in Server Components.
**Solution:** Extract interactive elements into separate Client Components with `'use client'`.

### 8. Do NOT pass query params to client.fetch without type casting
**Problem:** TypeScript strict mode rejects `{ tag: queryTag }` as parameter.
**Solution:** Cast params: `client.fetch(query, { tag: queryTag } as Record<string, string>)`

### 9. Do NOT assume Vercel auto-deploys immediately
**Problem:** Git integration may not trigger automatically on first push.
**Solution:** After first push, check Deployments tab. Click Redeploy if needed.

### 10. Do NOT hardcode DNS values
**Problem:** Vercel provides project-specific DNS values, not generic ones.
**Solution:** After adding domain in Vercel, use the EXACT values Vercel displays.

### 11. Do NOT use request.geo in middleware
**Problem:** TypeScript doesn't recognize the geo property on NextRequest.
**Solution:** Use `request.headers.get('x-vercel-ip-country')` instead.

### 12. Do NOT skip local build verification
**Problem:** TypeScript errors that pass in dev mode fail on Vercel.
**Solution:** Always run `pnpm build` before pushing. Fix all errors first.

---

## Customization Per Site

When creating a new site, change these values:

| Item | Example Change |
|------|----------------|
| Header/Footer color | `#002228` → `#00171f` |
| Accent color | `#c9a227` → `#ffde59` |
| Page background | Usually keep `#fafafa` |
| Font family | Roboto → Source Sans Pro |
| Site name | "BACKBAR" → "HOSPITALITY.FYI" |
| Category filter | `category == "spirits"` → `category == "hospitality"` |
| Sites filter | `"backbar" in sites` → `"hospitality" in sites` |
| Domain | backbar.fyi → hospitality.fyi |
| All metadata | Titles, descriptions, canonical URLs |
| Public assets | socialcard.png, favicon.png |
| Legal page content | Site name, focus area, contact info |
| About page content | Mission, creator bio |

---

## Files to Copy vs Customize

### Copy structure exactly:
- `sanity/lib/client.ts`
- `sanity/env.ts`
- Component file structures
- `middleware.ts` structure
- `app/sitemap.ts` structure
- `app/robots.ts` structure

### Customize for each site:
- `sanity/queries.ts` — Change category and sites filters
- `app/layout.tsx` — Site name, colors, metadata, fonts
- All `.module.css` files — Brand colors
- Legal pages — Site name, content focus
- About page — Mission statement, collaboration section
- `.env.local` — Verify credentials

---

## Sanity Setup for New Sites

1. **Add CORS origin** in Sanity dashboard → API tab → CORS origins
   - Add `http://localhost:3000` (development)
   - Add `https://yourdomain.com` (production)

2. **Verify site value exists** in article.ts schema sites field

3. **Tag articles** with new site value in Sanity Studio

4. **Create webhook** for auto-deploy (see Deployment section)

---

## Pre-Deploy Verification

**Before pushing to GitHub, ALWAYS run locally:**

```bash
pnpm build
```

This catches TypeScript errors that will fail on Vercel. The build must complete with zero errors before pushing.

**Common errors this catches:**
- Type mismatches in client.fetch calls
- Missing imports
- Invalid props
- Middleware issues

---

## Deployment Process

### Step 1: Git Setup

```bash
git init
git add .
git commit -m "Initial commit: sitename complete site"
git branch -M main
git remote add origin https://github.com/USERNAME/repo-name.git
git push -u origin main
```

### Step 2: Vercel Deployment

1. Go to vercel.com → Add New → Project
2. Import repository from GitHub
3. Configure:
   - Framework: Next.js (auto-detected)
   - Root Directory: `.`
   - Build Command: Default
   - Output Directory: Default

4. Add Environment Variables:
   | Key | Value |
   |-----|-------|
   | NEXT_PUBLIC_SANITY_PROJECT_ID | 21zbxo34 |
   | NEXT_PUBLIC_SANITY_DATASET | production |
   | NEXT_PUBLIC_SANITY_API_VERSION | 2024-01-01 |

5. Click Deploy

### Step 3: Add Domain in Vercel

1. Vercel → Project → Settings → Domains
2. Enter your domain (e.g., hospitality.fyi)
3. Click Add
4. Choose "Add both" for www and non-www
5. **Copy the DNS values Vercel displays** — do NOT use generic values

### Step 4: GoDaddy DNS Configuration

1. Go to GoDaddy → DNS Management for your domain
2. Edit the **A record** (@ / root):
   - Change Data to the IP address Vercel provided
3. Edit the **CNAME record** (www):
   - Change Data to the CNAME value Vercel provided
4. Leave all other records unchanged
5. Return to Vercel and click Refresh until green checkmarks appear

**DNS propagation takes 5-30 minutes. Be patient.**

### Step 5: Sanity Webhook for Auto-Deploy

1. **Create Deploy Hook in Vercel:**
   - Vercel → Project → Settings → Git → Deploy Hooks
   - Name: `sanity-publish`
   - Branch: `main`
   - Copy the generated URL

2. **Create Webhook in Sanity:**
   - sanity.io/manage → Project → API → Webhooks → Add webhook
   - Name: `[SITENAME] Deploy`
   - URL: Paste Vercel deploy hook URL
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - Filter: `_type == "article" && "[sitename]" in sites`
   - HTTP method: POST
   - Save

Now publishing an article in Sanity auto-deploys the site in 30-60 seconds.

---

## Deployment Checklist

Run through this for every new site:

### Pre-Development
- [ ] Domain purchased and accessible in GoDaddy
- [ ] Site value added to Sanity schema if new
- [ ] Articles tagged with new site value in Sanity
- [ ] CORS origin added in Sanity for localhost

### Development Complete
- [ ] All pages render correctly on localhost
- [ ] Mobile responsive on all pages
- [ ] `pnpm build` completes with zero errors
- [ ] Favicon displays in browser tab
- [ ] All links work (navigation, articles, tags, subcategories)

### Files Verified
- [ ] middleware.ts in root folder (geo-blocking)
- [ ] app/icon.png exists (favicon)
- [ ] app/not-found.tsx exists (404 page)
- [ ] app/sitemap.ts exists
- [ ] app/robots.ts exists
- [ ] public/[site]-socialcard.png exists (1200x630)

### Deployment
- [ ] Git initialized and pushed to GitHub
- [ ] Vercel project created and connected
- [ ] Environment variables set in Vercel
- [ ] Build succeeds on Vercel
- [ ] Domain added in Vercel
- [ ] DNS configured in GoDaddy with Vercel's values
- [ ] SSL certificate issued (automatic, may take minutes)
- [ ] CORS origin added in Sanity for production domain
- [ ] Sanity webhook created for auto-deploy

### Post-Launch SEO
- [ ] Site accessible at https://yourdomain.com
- [ ] Sitemap accessible at https://yourdomain.com/sitemap.xml
- [ ] Robots.txt accessible at https://yourdomain.com/robots.txt
- [ ] Google Search Console property added
- [ ] Sitemap submitted to Google Search Console
- [ ] Google Analytics configured
- [ ] Test OG tags with Facebook Sharing Debugger
- [ ] Test Twitter Cards with Twitter Card Validator

---

## Commands Reference

```bash
# Start development server
pnpm dev

# Build for production (ALWAYS run before pushing)
pnpm build

# Install a package
pnpm add [package-name]

# Install specific Next.js version (safer than latest)
pnpm add next@16.0.7

# Git workflow
git add .
git commit -m "descriptive message"
git push

# Check git status
git status
```

---

## Post-Launch Monitoring

After launch, regularly check:

1. **Google Search Console**
   - Index coverage
   - Crawl errors
   - Core Web Vitals

2. **Google Analytics**
   - Traffic sources
   - Page performance
   - User behavior

3. **Vercel Analytics**
   - Build times
   - Edge function performance
   - Error rates

4. **Manual Testing**
   - Publish new article in Sanity
   - Verify auto-deploy triggers
   - Check article appears on site

---

## The Network Effect

When all 12 sites are live with perfect SEO:

- **Cross-linking opportunities** — Related content across properties
- **Domain authority compounds** — Quality backlinks benefit all sites
- **Content syndication** — One article, multiple audiences
- **Unified analytics** — See the full picture
- **Acquisition appeal** — Clean, professional, scalable

This template ensures every site meets the same high standard. No shortcuts. No technical debt. Enterprise-ready from day one.