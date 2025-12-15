import { Metadata } from 'next'
import Link from 'next/link'
import styles from '../legal-pages.module.css'

export const metadata: Metadata = {
  title: 'Content Disclaimer | HOSPITALITY.FYI',
  description: 'Content Disclaimer for HOSPITALITY.FYI - important information about our educational content.',
  alternates: {
    canonical: 'https://hospitality.fyi/disclaimer',
  },
}

export default function ContentDisclaimer() {
  return (
    <div className={styles.pageContainer}>
      
      <div className={styles.contentWrapper}>
        <section className={styles.section}>
          <h1 className={styles.title}>Content Disclaimer</h1>
          <p className={styles.lastUpdated}>Last Updated: December 11, 2025</p>
          
          <div className={styles.content}>
            <p>
              Please read this Content Disclaimer carefully before using HOSPITALITY.FYI. This disclaimer applies to all 
              articles, guides, and educational materials published on our website.
            </p>

            <h2>Educational Purpose Only</h2>
            <p>
              All content on HOSPITALITY.FYI is provided for educational and informational purposes only. Our articles, 
              guides, and reference materials are designed to enhance knowledge and appreciation of the hospitality 
              industry, service excellence, and professional development. This content is not intended to serve as:
            </p>
            <ul>
              <li>Professional certification or accreditation</li>
              <li>Legal advice regarding employment, labor laws, or business operations</li>
              <li>Financial or business consulting advice</li>
              <li>A substitute for formal hospitality training programs</li>
              <li>Official certification from any regulatory body or professional organization</li>
            </ul>

            <h2>Industry Standards and Ratings</h2>
            <p>
              HOSPITALITY.FYI provides educational content about various industry rating systems, standards, and 
              recognition programs including Michelin stars, Forbes Travel Guide ratings, AAA Diamond ratings, 
              James Beard Awards, and others. Our coverage of these programs is for informational purposes only:
            </p>
            <ul>
              <li>We are not affiliated with, endorsed by, or officially connected to any rating organization</li>
              <li>Our interpretations of standards and criteria reflect our editorial understanding</li>
              <li>Rating criteria and standards may change without notice</li>
              <li>Official information should be obtained directly from the respective organizations</li>
            </ul>

            <h2>Accuracy of Information</h2>
            <p>
              While we strive to provide accurate, well-researched content, HOSPITALITY.FYI makes no warranties or 
              representations regarding the completeness, accuracy, reliability, or suitability of the 
              information presented. The hospitality industry evolves continuously, and information about specific 
              establishments, standards, practices, and trends may change over time.
            </p>
            <p>
              Readers should verify critical information independently, particularly regarding:
            </p>
            <ul>
              <li>Employment laws and regulations in their jurisdiction</li>
              <li>Specific establishment details, policies, and offerings</li>
              <li>Certification and licensing requirements</li>
              <li>Health, safety, and operational guidelines</li>
              <li>Current industry standards and best practices</li>
            </ul>

            <h2>Professional Advice</h2>
            <p>
              The content on HOSPITALITY.FYI should not be relied upon as professional advice. For matters involving:
            </p>
            <ul>
              <li><strong>Legal Issues:</strong> Consult a qualified attorney familiar with hospitality and employment law</li>
              <li><strong>Financial Decisions:</strong> Seek guidance from certified financial professionals</li>
              <li><strong>Career Decisions:</strong> Consider consulting career counselors or industry mentors</li>
              <li><strong>Health and Safety:</strong> Follow official guidelines from relevant authorities</li>
              <li><strong>Business Operations:</strong> Work with qualified consultants and advisors</li>
            </ul>

            <h2>Establishment and Brand References</h2>
            <p>
              HOSPITALITY.FYI may reference specific hotels, restaurants, hospitality brands, and industry figures 
              for educational purposes. Unless explicitly stated otherwise:
            </p>
            <ul>
              <li>References do not constitute endorsements</li>
              <li>We do not receive compensation for mentioning specific establishments</li>
              <li>Brand names and trademarks belong to their respective owners</li>
              <li>Establishment details, quality, and services may vary and change over time</li>
            </ul>
            <p>
              Any sponsored content or paid partnerships will be clearly disclosed as such.
            </p>

            <h2>Career and Employment Information</h2>
            <p>
              Content related to hospitality careers, employment practices, and professional development is 
              provided for general guidance only. Employment conditions vary significantly based on:
            </p>
            <ul>
              <li>Geographic location and local labor laws</li>
              <li>Type and size of establishment</li>
              <li>Union agreements and employment contracts</li>
              <li>Individual qualifications and experience</li>
              <li>Current market conditions</li>
            </ul>
            <p>
              We encourage readers to research specific opportunities thoroughly and consult appropriate 
              professionals when making career decisions.
            </p>

            <h2>Professional Certification</h2>
            <p>
              Reading HOSPITALITY.FYI content does not qualify readers for any professional certification, license, 
              or credential. If you are pursuing a career in the hospitality industry, we encourage you to 
              seek formal training and certification through recognized programs and institutions such as:
            </p>
            <ul>
              <li>Accredited hospitality management programs</li>
              <li>Industry-recognized certification bodies</li>
              <li>Professional associations and organizations</li>
              <li>Employer-provided training programs</li>
            </ul>

            <h2>User Responsibility</h2>
            <p>
              By using HOSPITALITY.FYI, you acknowledge that:
            </p>
            <ul>
              <li>You will use the information as a starting point for further research</li>
              <li>You understand the limitations of online educational content</li>
              <li>You will seek professional advice for important decisions</li>
              <li>You will not hold HOSPITALITY.FYI liable for decisions made based on our content</li>
              <li>You will comply with all applicable laws and regulations in your jurisdiction</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>
              HOSPITALITY.FYI, its owners, authors, and contributors shall not be held liable for any damages, injuries, 
              or losses arising from the use of information presented on this website. This includes, but is not 
              limited to, damages resulting from reliance on content accuracy, career decisions, business decisions, 
              or any actions taken based on information provided on this website.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Content Disclaimer or concerns about any content on our website, 
              please contact us through the information provided on our <Link href="/about">About page</Link>.
            </p>

            <div className={styles.navigationLinks}>
              <Link href="/about" className={styles.navLink}>About</Link>
              <Link href="/" className={styles.navLink}>Home</Link>
            </div>
          </div>
        </section>
      </div>
      
    </div>
  )
}