# Hospitality.fyi

A digital magazine dedicated to hospitality excellence — covering service standards, industry insights, leadership profiles, and career development for hospitality professionals.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black)
![Sanity](https://img.shields.io/badge/Sanity-CMS-red)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

---

## Overview

Hospitality.fyi is a server-rendered magazine site built for SEO performance and acquisition readiness. It's part of a portfolio of .fyi sites sharing a unified Sanity content lake.

**Live site:** [https://hospitality.fyi](https://hospitality.fyi)

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16.0.7 | App Router, SSR, SEO optimization |
| Sanity.io | Headless CMS, shared content lake |
| CSS Modules | Scoped component styling |
| TypeScript | Type safety |
| Vercel | Hosting, edge functions, analytics |
| pnpm | Package management |

---

## Features

- **Server-Side Rendering** — Every page is server-rendered for optimal SEO
- **Dynamic Sitemap** — Auto-generated from Sanity content
- **JSON-LD Structured Data** — Article and breadcrumb schemas on every article
- **Responsive Design** — Mobile-first approach, optimized for all devices
- **Dynamic Filtering** — Subcategory and tag pages generated from content
- **Related Articles** — Intelligent recommendations based on subcategory
- **Geo-Blocking** — Restricts access from specified countries
- **Custom 404** — Branded error page with navigation options

---

## Project Structure

```
hospitality-fyi/
├── middleware.ts                    # Geo-blocking middleware
├── app/
│   ├── layout.tsx                   # Root layout, metadata, fonts
│   ├── page.tsx                     # Homepage
│   ├── globals.css                  # Global styles
│   ├── sitemap.ts                   # Dynamic sitemap
│   ├── robots.ts                    # Robots.txt
│   ├── not-found.tsx                # Custom 404 page
│   ├── about/                       # About page
│   ├── privacy/                     # Privacy policy
│   ├── terms/                       # Terms of use
│   ├── cookies/                     # Cookie policy
│   ├── disclaimer/                  # Content disclaimer
│   └── articles/
│       ├── page.tsx                 # Article collection
│       ├── [slug]/                  # Individual articles
│       ├── page/[page]/             # Pagination
│       ├── subcategory/[subcategory]/ # Subcategory filter
│       └── tag/[tag]/               # Tag filter
├── components/
│   ├── layout/
│   │   ├── Header.tsx               # Navigation header
│   │   └── Footer.tsx               # Site footer
│   ├── homepage/
│   │   ├── FeaturedArticle.tsx      # Hero article
│   │   ├── SubFeaturedArticles.tsx  # Secondary features
│   │   ├── ArticleCard.tsx          # Reusable card
│   │   ├── ArticleGrid.tsx          # Article grid
│   │   └── SubcategoryDropdown.tsx  # Filter dropdown
│   └── article/
│       └── RelatedArticles.tsx      # Related content
├── sanity/
│   ├── lib/client.ts                # Sanity client
│   ├── env.ts                       # Environment config
│   └── queries.ts                   # GROQ queries
└── public/
    ├── hospitality-favicon.png      # Favicon
    └── hospitality-socialcard.png   # OG image
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Dereks-Projects/hospitality-fyi.git
cd hospitality-fyi

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=21zbxo34
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

---

## Sanity CMS

This site pulls content from a shared Sanity project. Articles are filtered by:

```javascript
category == "hospitality" && "hospitality" in sites
```

### Content Requirements

- **Category:** hospitality
- **Sites array:** Must include "hospitality"
- **Required fields:** title, slug, mainImage, body, subcategory, publishedAt

### CORS Origins

Ensure these origins are added in Sanity:
- `http://localhost:3000` (development)
- `https://hospitality.fyi` (production)

---

## Deployment

### Vercel

1. Connect repository to Vercel
2. Add environment variables
3. Deploy

### DNS (GoDaddy)

Configure DNS with values provided by Vercel:
- **A record (@):** Vercel IP
- **CNAME (www):** Vercel CNAME

### Auto-Deploy Webhook

Sanity webhook triggers Vercel rebuild on content changes:
- **Filter:** `_type == "article" && "hospitality" in sites`
- **Trigger:** Create, Update, Delete

---

## SEO Implementation

### Every Page Includes

- Unique meta title and description
- Canonical URL
- Open Graph tags
- Twitter Card tags

### Article Pages Also Include

- JSON-LD Article schema
- JSON-LD Breadcrumb schema
- Dynamic metadata via `generateMetadata`

### Sitemap Coverage

- Homepage (priority: 1.0)
- Article collection (priority: 0.9)
- Individual articles (priority: 0.8)
- About page (priority: 0.7)
- Subcategory pages (priority: 0.6)
- Tag pages (priority: 0.5)
- Legal pages (priority: 0.3)

---

## Security

### Geo-Blocking

Middleware blocks traffic from:
- China (CN)
- Russia (RU)

### Headers

- `target="_blank"` links include `rel="noopener noreferrer"`
- External links are explicitly marked

---

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run linter
```

---

## Related Projects

Part of the Informative Media portfolio:
- [backbar.fyi](https://backbar.fyi) — Spirits education
- [somm.site](https://somm.site) — Wine education
- [beverage.fyi](https://beverage.fyi) — Comprehensive beverage knowledge

---

## License

Proprietary. All rights reserved.

---

## Contact

**Derek Engles**  
[derek@informativemedia.com](mailto:derek@informativemedia.com)  
[derekengles.com](https://www.derekengles.com)