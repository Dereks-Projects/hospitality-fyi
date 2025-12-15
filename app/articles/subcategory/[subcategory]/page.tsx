import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { articlesBySubcategoryQuery } from '@/sanity/queries'
import ArticleCard from '@/components/homepage/ArticleCard'
import styles from '../../articles.module.css'

interface SubcategoryPageProps {
  params: Promise<{ subcategory: string }>
}

// Convert slug to display name: "ratings-systems" → "Ratings Systems"
function toDisplayName(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const { subcategory } = await params
  const displayName = toDisplayName(subcategory)

  return {
    title: `${displayName} Articles | HOSPITALITY.FYI`,
    description: `Explore our collection of in-depth articles about ${displayName}. Expert education for hospitality professionals.`,
    alternates: {
      canonical: `https://hospitality.fyi/articles/subcategory/${subcategory}`,
    },
  }
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { subcategory } = await params
  
  // Convert URL slug to query format: "ratings-systems" → "Ratings Systems"
  const querySubcategory = toDisplayName(subcategory)

  const articles = await client.fetch(articlesBySubcategoryQuery, {
    subcategory: querySubcategory,
  })

  if (!articles || articles.length === 0) {
    notFound()
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{querySubcategory}</h1>
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