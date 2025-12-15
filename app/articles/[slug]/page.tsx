import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { articleBySlugQuery, relatedArticlesQuery, relatedArticlesByCategoryQuery } from '@/sanity/queries'
import RelatedArticles from '@/components/article/RelatedArticles'
import styles from './article.module.css'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await client.fetch(articleBySlugQuery, { slug })

  if (!article) {
    return {
      title: 'Article Not Found | HOSPITALITY.FYI',
    }
  }

  return {
    title: `${article.title} | HOSPITALITY.FYI`,
    description: article.subtitle || `Read ${article.title} on HOSPITALITY.FYI`,
    alternates: {
      canonical: `https://hospitality.fyi/articles/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.subtitle || `Read ${article.title} on HOSPITALITY.FYI`,
      url: `https://hospitality.fyi/articles/${slug}`,
      siteName: 'HOSPITALITY.FYI',
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author || 'Derek Engles'],
      images: article.mainImage?.asset?.url
        ? [
            {
              url: article.mainImage.asset.url,
              width: 1200,
              height: 630,
              alt: article.mainImage.alt || article.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.subtitle || `Read ${article.title} on HOSPITALITY.FYI`,
      images: article.mainImage?.asset?.url ? [article.mainImage.asset.url] : [],
    },
  }
}

// Custom components for PortableText rendering
const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset: { url: string }; alt?: string; caption?: string } }) => (
      <figure className={styles.bodyImage}>
        <img
          src={value.asset?.url}
          alt={value.alt || 'Article image'}
          className={styles.bodyImageImg}
        />
        {value.caption && <figcaption className={styles.caption}>{value.caption}</figcaption>}
      </figure>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className={styles.h2}>{children}</h2>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className={styles.blockquote}>{children}</blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className={styles.paragraph}>{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <a href={value?.href} className={styles.link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await client.fetch(articleBySlugQuery, { slug })

  if (!article) {
    notFound()
  }

  // Fetch related articles
  let relatedArticles = await client.fetch(relatedArticlesQuery, {
    subcategory: article.subcategory,
    currentSlug: slug,
  })

  // Fallback to category-based if not enough subcategory matches
  if (!relatedArticles || relatedArticles.length < 3) {
    relatedArticles = await client.fetch(relatedArticlesByCategoryQuery, {
      currentSlug: slug,
    })
  }

  // Format date
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.subtitle,
    image: article.mainImage?.asset?.url,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author || 'Derek Engles',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HOSPITALITY.FYI',
      url: 'https://hospitality.fyi',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hospitality.fyi/articles/${slug}`,
    },
  }

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hospitality.fyi',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: 'https://hospitality.fyi/articles',
      },
      ...(article.subcategory
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: article.subcategory,
              item: `https://hospitality.fyi/articles/subcategory/${article.subcategory.toLowerCase().replace(/\s+/g, '-')}`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: article.title,
              item: `https://hospitality.fyi/articles/${slug}`,
            },
          ]
        : [
            {
              '@type': 'ListItem',
              position: 3,
              name: article.title,
              item: `https://hospitality.fyi/articles/${slug}`,
            },
          ]),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className={styles.article}>
        <div className={styles.container}>
          {/* Breadcrumbs */}
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.separator}>/</span>
            <Link href="/articles">Articles</Link>
            {article.subcategory && (
              <>
                <span className={styles.separator}>/</span>
                <Link href={`/articles/subcategory/${article.subcategory.toLowerCase().replace(/\s+/g, '-')}`}>
                  {article.subcategory}
                </Link>
              </>
            )}
          </nav>

          {/* Header */}
          <header className={styles.header}>
            <h1 className={styles.title}>{article.title}</h1>
            {article.subtitle && <p className={styles.subtitle}>{article.subtitle}</p>}
            <div className={styles.meta}>
              {article.author && <span className={styles.author}>By {article.author}</span>}
              {article.author && formattedDate && <span className={styles.metaSeparator}>•</span>}
              {formattedDate && <time className={styles.date}>{formattedDate}</time>}
            </div>
          </header>

          {/* Main Image */}
          {article.mainImage?.asset?.url && (
            <figure className={styles.mainImageWrapper}>
              <img
                src={article.mainImage.asset.url}
                alt={article.mainImage.alt || article.title}
                className={styles.mainImage}
              />
            </figure>
          )}

          {/* Article Body */}
          <div className={styles.body}>
            <PortableText value={article.body} components={portableTextComponents} />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className={styles.tagsSection}>
              <span className={styles.tagsLabel}>Tags:</span>
              <div className={styles.tags}>
                {article.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/articles/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className={styles.tag}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles && relatedArticles.length > 0 && (
            <RelatedArticles articles={relatedArticles} />
          )}

          {/* Back to Articles */}
          <div className={styles.backLink}>
            <Link href="/articles">← Back to Articles</Link>
          </div>
        </div>
      </article>
    </>
  )
}