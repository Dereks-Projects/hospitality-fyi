import { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { allArticlesQuery } from '@/sanity/queries'
import ArticleCard from '@/components/homepage/ArticleCard'
import SubcategoryDropdown from '@/components/homepage/SubcategoryDropdown'
import styles from './articles.module.css'

const ARTICLES_PER_PAGE = 12

export const metadata: Metadata = {
  title: 'Article Collection | HOSPITALITY.FYI',
  description: 'Browse all hospitality industry articles covering service excellence, leadership, operations, and more.',
  alternates: {
    canonical: 'https://hospitality.fyi/articles',
  },
}

export default async function ArticlesPage() {
  const allArticles = await client.fetch(allArticlesQuery)
  
  const articles = allArticles.slice(0, ARTICLES_PER_PAGE)
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE)

  // Get unique subcategories for dropdown
  const subcategories = [...new Set(
    allArticles
      .map((article: { subcategory?: string }) => article.subcategory)
      .filter((sub: string | undefined): sub is string => Boolean(sub))
  )] as string[]

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Article Collection</h1>
        <SubcategoryDropdown subcategories={subcategories} />
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

      {totalPages > 1 && (
        <footer className={styles.pageFooter}>
          <Link href="/articles/page/2" className={styles.nextButton}>
            More Articles →
          </Link>
        </footer>
      )}
    </div>
  )
}