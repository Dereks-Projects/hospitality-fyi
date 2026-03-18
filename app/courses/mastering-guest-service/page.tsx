import { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

import course1 from '@/data/courses/mastering-guest-service/the-first-10-seconds.json'
import course2 from '@/data/courses/mastering-guest-service/reading-the-room.json'
import course3 from '@/data/courses/mastering-guest-service/the-language-of-service.json'
import course4 from '@/data/courses/mastering-guest-service/when-things-go-wrong.json'
import course5 from '@/data/courses/mastering-guest-service/building-a-service-culture.json'

const courses = [course1, course2, course3, course4, course5]

export const metadata: Metadata = {
  title: 'Hospitality Guest Service Course: Mastering Guest Service | HOSPITALITY.FYI',
  description:
    'A free hospitality guest service course covering the psychology of first impressions, nonverbal communication, service language, complaint recovery, and building a service culture. Built for hotel, resort, and restaurant professionals.',
  alternates: {
    canonical: 'https://hospitality.fyi/courses/mastering-guest-service',
  },
  keywords: [
    'hospitality guest service course',
    'guest service training',
    'hotel guest service training',
    'restaurant service training',
    'hospitality training online',
    'guest experience course',
    'service recovery hospitality',
    'hotel service excellence',
    'resort guest service',
    'hospitality professional development',
  ],
  openGraph: {
    title: 'Hospitality Guest Service Course: Mastering Guest Service',
    description:
      'A free five-part guest service training course for hotel, resort, and restaurant professionals. Learn the psychology of first impressions, nonverbal communication, service language, recovery, and culture building.',
    url: 'https://hospitality.fyi/courses/mastering-guest-service',
    siteName: 'HOSPITALITY.FYI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hospitality Guest Service Course: Mastering Guest Service',
    description:
      'A free five-part guest service training course for hotel, resort, and restaurant professionals. Learn the psychology of first impressions, service language, recovery, and culture building.',
  },
}

export default function MasteringGuestServicePage() {
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Mastering Guest Service: A Hospitality Guest Service Course',
    description:
      'A free five-part hospitality guest service course covering the psychology of first impressions, nonverbal communication, service language, complaint recovery, and building a service culture. Designed for hotel, resort, and restaurant professionals.',
    provider: {
      '@type': 'Organization',
      name: 'HOSPITALITY.FYI',
      url: 'https://hospitality.fyi',
    },
    isAccessibleForFree: true,
    inLanguage: 'en',
    audience: {
      '@type': 'Audience',
      audienceType: 'Hospitality Professionals',
    },
    about: [
      { '@type': 'Thing', name: 'Guest Service' },
      { '@type': 'Thing', name: 'Hospitality Training' },
      { '@type': 'Thing', name: 'Hotel Service Excellence' },
      { '@type': 'Thing', name: 'Restaurant Service Standards' },
    ],
    hasCourseInstance: courses.map((course) => ({
      '@type': 'CourseInstance',
      name: course.title,
      description: course.description,
      courseMode: 'Online',
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hospitality.fyi',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Mastering Guest Service',
        item: 'https://hospitality.fyi/courses/mastering-guest-service',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className={styles.page}>
        <div className={styles.container}>
          {/* Breadcrumbs */}
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.separator}>/</span>
            <span>Mastering Guest Service</span>
          </nav>

          {/* Hero */}
          <header className={styles.hero}>
            <h1 className={styles.title}>Mastering Guest Service</h1>
            <p className={styles.subtitle}>
              A five-part course on the psychology of hospitality, built for professionals who
              believe great service is a discipline, not a personality trait.
            </p>
          </header>

          {/* Callout */}
          <div className={styles.callout}>
            <p className={styles.calloutHeading}>
              Service is a system. Hospitality is a culture. This course teaches both.
            </p>
            <p className={styles.calloutBody}>
              Across five classes, you will learn how guests form perceptions, how professionals
              read and respond to unspoken needs, how language shapes experience, how recovery
              builds loyalty, and how culture makes all of it sustainable. Every concept is
              grounded in behavioral science and built for real-world application across hotels,
              resorts, and restaurants.
            </p>
          </div>

          {/* Meta */}
          <div className={styles.meta}>
            <span className={styles.metaItem}>60-75 minutes total</span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaItem}>
              Front Desk, Hosts, Servers, Managers, Concierge
            </span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.metaItem}>Foundational to Advanced</span>
          </div>

          {/* Course Cards */}
          <div className={styles.courseList}>
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/mastering-guest-service/${course.id}`}
                className={styles.courseCard}
              >
                <div className={styles.courseNumber}>{course.courseNumber}</div>
                <div className={styles.courseContent}>
                  <h2 className={styles.courseTitle}>{course.title}</h2>
                  <p className={styles.courseSubtitle}>{course.subtitle}</p>
                  <p className={styles.courseDescription}>{course.description}</p>
                  <span className={styles.courseDuration}>{course.duration}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Back */}
          <div className={styles.backLink}>
            <Link href="/">← Back to Home</Link>
          </div>
        </div>
      </div>
    </>
  )
}