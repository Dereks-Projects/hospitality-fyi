import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { allArticlesQuery } from '@/sanity/queries'
import ArticleCard from '@/components/homepage/ArticleCard'
import SubcategoryDropdown from '@/components/homepage/SubcategoryDropdown'
import styles from '../../articles.module.css'

const ARTICLES_PER_PAGE = 12

interface PageProps {
  params: Promise<{ page: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params
  const pageNum = parseInt(page)

  return {
    title: `Article Collection - Page ${pageNum} | HOSPITALITY.FYI`,
    description: 'Browse all hospitality industry articles covering service excellence, leadership, operations, and more.',
    alternates: {
      canonical: `https://hospitality.fyi/articles/page/${pageNum}`,
    },
  }
}

export default async function ArticlesPagePaginated({ params }: PageProps) {
  const { page } = await params
  const pageNum = parseInt(page)

  // Page 1 should use /articles, not /articles/page/1
  if (pageNum === 1) {
    notFound()
  }

  const allArticles = await client.fetch(allArticlesQuery)

  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE)

  // Invalid page number
  if (pageNum < 1 || pageNum > totalPages) {
    notFound()
  }

  const startIndex = (pageNum - 1) * ARTICLES_PER_PAGE
  const articles = allArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE)

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

      <footer className={styles.pageFooter}>
        {pageNum === 2 ? (
          <Link href="/articles" className={styles.backButton}>
            ← Back
          </Link>
        ) : (
          <Link href={`/articles/page/${pageNum - 1}`} className={styles.backButton}>
            ← Back
          </Link>
        )}
        {pageNum < totalPages && (
          <Link href={`/articles/page/${pageNum + 1}`} className={styles.nextButton}>
            More Articles →
          </Link>
        )}
      </footer>
    </div>
  )
}