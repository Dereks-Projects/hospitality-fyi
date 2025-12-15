import { Metadata } from 'next'
import Link from 'next/link'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About Us | HOSPITALITY.FYI',
  description: 'Learn about HOSPITALITY.FYI, our mission to elevate hospitality education, and the creator behind the platform.',
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
            HOSPITALITY.FYI is a digital magazine dedicated to hospitality excellence — bringing you 
            the insights, standards, and stories that define world-class service. 
            No memberships. No paywalls. Just quality knowledge, freely accessible.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.missionText}>
            The hospitality industry is built on <span className={styles.highlight}>extraordinary experiences</span> — 
            moments crafted by professionals who understand that true service goes far beyond taking orders 
            and delivering plates. From the Michelin-starred restaurants redefining dining to the luxury 
            hotels where every detail matters, hospitality is an art form practiced by dedicated 
            individuals who rarely receive the recognition they deserve.
          </p>
          <p className={styles.missionText}>
            We believe that <span className={styles.highlight}>hospitality knowledge should be accessible to everyone</span>. 
            Whether you're a front-line team member aspiring to grow, a manager seeking to elevate your 
            operation, or an enthusiast who appreciates the craft behind exceptional service — you deserve 
            access to quality education without barriers, gatekeepers, or expensive certification programs.
          </p>
          <p className={styles.missionText}>
            HOSPITALITY.FYI exists to <span className={styles.highlight}>democratize hospitality excellence</span>. We 
            explore what separates good service from unforgettable experiences, examine the rating systems 
            that define industry standards, profile the leaders shaping our field, and provide actionable 
            insights that help hospitality professionals thrive. From Forbes Travel Guide standards to 
            James Beard recognition, we bring you the knowledge that matters — no strings attached.
          </p>
        </div>
      </section>

      {/* About the Creator Section */}
      <section className={styles.creatorSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>About the Creator</h2>
          <p className={styles.sectionText}>
            HOSPITALITY.FYI was created by{' '}
            <a href="https://www.derekengles.com" target="_blank" rel="noopener noreferrer" className={styles.creatorLink}>
              Derek Engles
            </a>
            , a hospitality professional with over two decades of 
            experience in luxury service. After years working as a sommelier and wine director 
            at properties including Wynn Resort and MGM Grand — serving over 200,000 guests — Derek 
            transitioned into technology development, combining deep industry knowledge with modern 
            platforms to build educational resources that make a real impact in the hospitality space.
          </p>
        </div>
      </section>

      {/* Let's Collaborate Section */}
      <section className={styles.collaborateSection}>
        <div className={styles.collaborateContent}>
          <h2 className={styles.collaborateTitle}>Let's Collaborate</h2>
          <p className={styles.collaborateText}>
            Whether you're a hospitality brand looking to share your story, a hotel or restaurant group 
            seeking to elevate your team's knowledge, or an organization that wants to connect with 
            professionals who care about service excellence — we'd love to hear from you. We partner 
            with brands and businesses to create educational content that develops your team and 
            positions your brand in front of an audience that values quality and craft.
          </p>
          <a href="mailto:derekengles@gmail.com" className={styles.contactLink}>
            Get in Touch
          </a>
        </div>
      </section>

    </div>
  )
}