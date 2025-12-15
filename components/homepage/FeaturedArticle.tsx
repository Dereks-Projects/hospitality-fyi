import Link from 'next/link'
import styles from './FeaturedArticle.module.css'

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
  excerpt?: string
}

interface FeaturedArticleProps {
  article: Article
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <article className={styles.featured}>
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
          <h2 className={styles.title}>{article.title}</h2>
        </Link>
        
        {article.subtitle && (
          <p className={styles.subtitle}>{article.subtitle}</p>
        )}
        
        {article.excerpt && (
          <p className={styles.excerpt}>{article.excerpt}</p>
        )}
        
        <Link href={`/articles/${article.slug.current}`} className={styles.readMore}>
          Read More
        </Link>
      </div>
    </article>
  )
}