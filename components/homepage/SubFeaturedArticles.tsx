import Link from 'next/link'
import styles from './SubFeaturedArticles.module.css'

interface Article {
  _id: string
  title: string
  subtitle?: string
  slug: { current: string }
  mainImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
  subcategory?: string
}

interface SubFeaturedArticlesProps {
  articles: Article[]
}

export default function SubFeaturedArticles({ articles }: SubFeaturedArticlesProps) {
  return (
    <div className={styles.container}>
      {articles.map((article) => (
        <article key={article._id} className={styles.card}>
          <Link href={`/articles/${article.slug.current}`} className={styles.imageLink}>
            {article.mainImage?.asset?.url && (
              <div className={styles.imageWrapper}>
                <img
                  src={article.mainImage.asset.url}
                  alt={article.mainImage.alt || article.title}
                  className={styles.image}
                />
                {article.subcategory && (
                  <span className={styles.subcategory}>{article.subcategory}</span>
                )}
              </div>
            )}
          </Link>
          
          <div className={styles.content}>
            <Link href={`/articles/${article.slug.current}`}>
              <h3 className={styles.title}>{article.title}</h3>
            </Link>
            
            {article.subtitle && (
              <p className={styles.subtitle}>{article.subtitle}</p>
            )}
            
            <Link href={`/articles/${article.slug.current}`} className={styles.readMore}>
              Read More
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}