import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProjectCTA from '@/components/layout/ProjectCTA'
import styles from './course.module.css'

import course1 from '@/data/courses/mastering-guest-service/the-first-10-seconds.json'
import course2 from '@/data/courses/mastering-guest-service/reading-the-room.json'
import course3 from '@/data/courses/mastering-guest-service/the-language-of-service.json'
import course4 from '@/data/courses/mastering-guest-service/when-things-go-wrong.json'
import course5 from '@/data/courses/mastering-guest-service/building-a-service-culture.json'

const allCourses = [course1, course2, course3, course4, course5]

interface CoursePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params
  const course = allCourses.find((c) => c.id === slug)

  if (!course) {
    return {
      title: 'Course Not Found | HOSPITALITY.FYI',
    }
  }

  return {
    title: course.seo.metaTitle,
    description: course.seo.metaDescription,
    alternates: {
      canonical: course.seo.canonical,
    },
    openGraph: {
      title: course.seo.metaTitle,
      description: course.seo.metaDescription,
      url: course.seo.canonical,
      siteName: 'HOSPITALITY.FYI',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: course.seo.metaTitle,
      description: course.seo.metaDescription,
    },
  }
}

export function generateStaticParams() {
  return allCourses.map((course) => ({
    slug: course.id,
  }))
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params
  const course = allCourses.find((c) => c.id === slug)

  if (!course) {
    notFound()
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: course.title,
    description: course.description,
    image: `https://hospitality.fyi${course.heroImage}`,
    author: {
      '@type': 'Person',
      name: 'Derek Engles',
    },
    publisher: {
      '@type': 'Organization',
      name: 'HOSPITALITY.FYI',
      url: 'https://hospitality.fyi',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': course.seo.canonical,
    },
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
      {
        '@type': 'ListItem',
        position: 3,
        name: course.title,
        item: course.seo.canonical,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className={styles.course}>
        <div className={styles.container}>
          {/* Back to course */}
          <Link href="/courses/mastering-guest-service" className={styles.backToCourse}>
            ← Back to course
          </Link>

          {/* Class counter */}
          <p className={styles.classCounter}>
            CLASS {course.courseNumber} OF {course.totalCourses}
          </p>

          {/* Title and meta */}
          <h1 className={styles.title}>{course.title}</h1>
          <p className={styles.subtitle}>{course.subtitle}</p>
          <span className={styles.duration}>{course.duration}</span>

          {/* Description */}
          <p className={styles.description}>{course.description}</p>

          {/* Hero image */}
          <figure className={styles.imageWrapper}>
            <img
              src={course.heroImage}
              alt={course.heroImageAlt}
              className={styles.image}
            />
          </figure>


          {/* Callout box */}
          <div className={styles.callout}>
            <p className={styles.calloutHeading}>{course.callout.heading}</p>
            <p className={styles.calloutBody}>{course.callout.body}</p>
          </div>

          {/* Intro */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>{course.content.intro.heading}</h2>
            <p className={styles.paragraph}>{course.content.intro.body}</p>
          </section>

          {/* Image 1 */}
          <figure className={styles.imageWrapper}>
            <img
              src={course.content.image1.src}
              alt={course.content.image1.alt}
              className={styles.image}
            />
          </figure>

          {/* Paragraph 1 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>{course.content.paragraph1.heading}</h2>
            <p className={styles.paragraph}>{course.content.paragraph1.part1}</p>
            <p className={styles.paragraph}>{course.content.paragraph1.part2}</p>
          </section>

          {/* Paragraph 2 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>{course.content.paragraph2.heading}</h2>
            <p className={styles.paragraph}>{course.content.paragraph2.part1}</p>
            <p className={styles.paragraph}>{course.content.paragraph2.part2}</p>
          </section>

          {/* Image 2 */}
          <figure className={styles.imageWrapper}>
            <img
              src={course.content.image2.src}
              alt={course.content.image2.alt}
              className={styles.image}
            />
          </figure>

          {/* Paragraph 3 */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>{course.content.paragraph3.heading}</h2>
            <p className={styles.paragraph}>{course.content.paragraph3.part1}</p>
            <p className={styles.paragraph}>{course.content.paragraph3.part2}</p>
          </section>

          {/* Conclusion */}
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>{course.content.conclusion.heading}</h2>
            <p className={styles.paragraph}>{course.content.conclusion.body}</p>
          </section>

          {/* Key Takeaways */}
          <div className={styles.takeaways}>
            <h3 className={styles.takeawaysTitle}>Key Takeaways</h3>
            <ul className={styles.takeawaysList}>
              {course.content.keyTakeaways.map((item, index) => (
                <li key={index} className={styles.takeawayItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Closing Quote */}
          <p className={styles.closingQuote}>{course.content.closingQuote}</p>

          {/* Prev / Next Navigation */}
          <nav className={styles.courseNav}>
            {course.previousCourse ? (
              <Link
                href={`/courses/mastering-guest-service/${course.previousCourse.slug}`}
                className={styles.navPrev}
              >
                <span className={styles.navLabel}>PREVIOUS</span>
                <span className={styles.navTitle}>{course.previousCourse.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {course.nextCourse ? (
              <Link
                href={`/courses/mastering-guest-service/${course.nextCourse.slug}`}
                className={styles.navNext}
              >
                <span className={styles.navLabel}>NEXT</span>
                <span className={styles.navTitle}>{course.nextCourse.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </div>
      </article>

      <ProjectCTA />
    </>
  )
}