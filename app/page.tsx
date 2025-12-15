import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { allArticlesQuery } from '@/sanity/queries'
import FeaturedArticle from '@/components/homepage/FeaturedArticle'
import SubFeaturedArticles from '@/components/homepage/SubFeaturedArticles'
import ArticleGrid from '@/components/homepage/ArticleGrid'
import styles from './page.module.css'

export default async function Home() {
  const articles = await client.fetch(allArticlesQuery)

  if (!articles || articles.length === 0) {
    return (
      <main className={styles.main}>
        <p>No articles found. Check back soon!</p>
      </main>
    )
  }

  const featuredArticle = articles[0]
  const subFeaturedArticles = articles.slice(1, 3)
  const gridArticles = articles.slice(3, 12)

  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <div className={styles.featuredColumn}>
          <FeaturedArticle article={featuredArticle} />
        </div>
        <div className={styles.subFeaturedColumn}>
          <SubFeaturedArticles articles={subFeaturedArticles} />
        </div>
      </section>

      {gridArticles.length > 0 && (
        <ArticleGrid articles={gridArticles} />
      )}

      {articles.length > 12 && (
        <div className={styles.moreButtonWrapper}>
          <Link href="/articles" className={styles.moreButton}>
            More
          </Link>
        </div>
      )}
    </main>
  )
}