import styles from './ProjectCTA.module.css'

export default function ProjectCTA() {
  return (
    <aside className={styles.ctaBanner} aria-label="Partner promotion">
      <div className={styles.ctaContent}>
        <p className={styles.ctaHook}>Raise the Bar at Your Restaurant</p>
        <p className={styles.ctaMessage}>
          Streamline service standards and deliver a five-star guest experience, consistently.
        </p>
        <a
          href="https://www.restaurantstandards.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaButton}
        >
          Explore RestaurantStandards.com
        </a>
      </div>
    </aside>
  )
}