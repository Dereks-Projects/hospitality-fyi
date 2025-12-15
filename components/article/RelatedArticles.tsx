import Link from 'next/link'
import styles from './RelatedArticles.module.css'

interface Article {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
}

interface RelatedArticlesProps {
  articles: Article[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Related Articles</h2>
      <div className={styles.grid}>
        {articles.map((article) => (
          <Link
            key={article._id}
            href={`/articles/${article.slug.current}`}
            className={styles.card}
          >
            {article.mainImage?.asset?.url && (
              <div className={styles.imageWrapper}>
                <img
                  src={article.mainImage.asset.url}
                  alt={article.mainImage.alt || article.title}
                  className={styles.image}
                />
              </div>
            )}
            <h3 className={styles.title}>{article.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}