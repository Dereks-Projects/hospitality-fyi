import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.message}>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        
        <nav className={styles.navigation}>
          <Link href="/" className={styles.primaryButton}>
            Back to Home
          </Link>
          <Link href="/articles" className={styles.secondaryButton}>
            Browse Articles
          </Link>
        </nav>

        <div className={styles.helpSection}>
          <p className={styles.helpText}>Looking for something specific?</p>
          <ul className={styles.helpLinks}>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/articles">Article Collection</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}