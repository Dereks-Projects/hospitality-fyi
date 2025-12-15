import Link from 'next/link'
import styles from './ArticleCard.module.css'

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

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className={styles.card}>
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
  )
}