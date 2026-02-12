import { Metadata } from 'next'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About Us | HOSPITALITY.FYI',
  description: 'Learn about HOSPITALITY.FYI, our mission to elevate hospitality education, and the company behind the platform.',
  alternates: {
    canonical: 'https://hospitality.fyi/about',
  },
}

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>About Us</h1>
          <p className={styles.heroSubtitle}>
            HOSPITALITY.FYI is a digital magazine dedicated to hospitality excellence — bringing 
            you the insights, standards, and stories that define world-class service. 
            No memberships. No paywalls. Just quality knowledge, freely accessible.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.missionText}>
            Great hospitality education shouldn't be locked behind expensive certifications or 
            scattered across countless sources that demand your email before offering a single 
            insight. HOSPITALITY.FYI exists to{' '}
            <span className={styles.highlight}>democratize hospitality excellence</span> — 
            presenting the standards, stories, and strategies that define world-class service 
            for professionals and enthusiasts alike. From Forbes Travel Guide standards to 
            Michelin-starred dining rooms, we bring you the knowledge that matters — no 
            strings attached.
          </p>
        </div>
      </section>

      {/* About Informative Media Section */}
      <section className={styles.companySection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>About Informative Media</h2>
          <p className={styles.sectionText}>
            HOSPITALITY.FYI is part of Informative Media, a hospitality education company operating a 
            portfolio of digital platforms dedicated to beverage knowledge and service excellence. 
            From wine and spirits to fine dining standards, our platforms serve professionals and 
            enthusiasts who believe that quality education should be accessible to everyone. 
            We combine over two decades of luxury hospitality experience with modern technology 
            to create content that makes a real impact.
          </p>
          <a
            href="https://informativemedia.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.companyLink}
          >
            Learn more about Informative Media →
          </a>
        </div>
      </section>

      {/* Let's Collaborate Section */}
      <section className={styles.collaborateSection}>
        <div className={styles.collaborateContent}>
          <h2 className={styles.collaborateTitle}>Let&#39;s Collaborate</h2>
          <p className={styles.collaborateText}>
            Whether you're a hospitality brand looking to share your story, a hotel or restaurant 
            group seeking to elevate your team's knowledge, or an organization that wants to 
            connect with professionals who care about service excellence — we'd love to hear from you.
          </p>
          <a href="mailto:derekengles@gmail.com" className={styles.contactLink}>
            Get in Touch
          </a>
        </div>
      </section>

    </div>
  )
}