import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import ArticleCard from '@/components/homepage/ArticleCard'
import styles from '../../articles.module.css'

interface TagPageProps {
  params: Promise<{ tag: string }>
}

// Convert slug to display name: "fine-dining" → "fine dining"
function toDisplayName(slug: string): string {
  return slug.replace(/-/g, ' ')
}

// Convert slug to query format (tags are stored lowercase)
function toQueryFormat(slug: string): string {
  return slug.replace(/-/g, ' ').toLowerCase()
}

const tagQuery = groq`
  *[_type == "article" && category == "hospitality" && "hospitality" in sites && $tag in tags] | order(publishedAt desc) {
    _id,
    title,
    subtitle,
    slug,
    mainImage {
      asset -> {
        _id,
        url
      },
      alt
    },
    subcategory,
    category,
    tags,
    publishedAt,
    author
  }
`

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const displayName = toDisplayName(tag)

  return {
    title: `Articles tagged "${displayName}" | HOSPITALITY.FYI`,
    description: `Browse all hospitality articles tagged with "${displayName}".`,
    alternates: {
      canonical: `https://hospitality.fyi/articles/tag/${tag}`,
    },
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  
  const queryTag = toQueryFormat(tag)
  const displayName = toDisplayName(tag)

  const articles = await client.fetch(tagQuery, { tag: queryTag } as Record<string, string>)

  if (!articles || articles.length === 0) {
    notFound()
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Articles tagged "{displayName}"</h1>
        <nav className={styles.filterNav}>
          <Link href="/articles" className={styles.filterButton}>
            ← All Articles
          </Link>
        </nav>
      </header>

      <div className={styles.grid}>
        {articles.map((article: {
          _id: string
          title: string
          subtitle?: string
          slug: { current: string }
          mainImage?: { asset: { url: string }; alt?: string }
          subcategory?: string
        }) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>

      <footer className={styles.pageFooter}>
        <Link href="/articles" className={styles.backButton}>
          ← Back to All Articles
        </Link>
      </footer>
    </div>
  )
}