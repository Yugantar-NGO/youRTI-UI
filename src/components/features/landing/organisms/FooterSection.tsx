import Link from 'next/link'
import styles from './FooterSection.module.css'

interface FooterSectionProps {
  className?: string
}

/**
 * FooterSection Organism
 *
 * Simple footer with links and attribution.
 *
 * @example
 * <FooterSection />
 */
export function FooterSection({ className = '' }: FooterSectionProps) {
  return (
    <footer className={`${styles.footerSection} ${className}`}>
      <div className={styles.container}>
        {/* Primary Links */}
        <div className={styles.primaryLinks}>
          <Link href="/about" className={styles.link}>About</Link>
          <span className={styles.separator}>•</span>
          <Link href="/browse" className={styles.link}>Browse RTIs</Link>
          <span className={styles.separator}>•</span>
          <Link href="/file-rti" className={styles.link}>File RTI</Link>
          <span className={styles.separator}>•</span>
          <Link href="/analytics" className={styles.link}>Analytics</Link>
          <span className={styles.separator}>•</span>
          <Link href="/api" className={styles.link}>API Documentation</Link>
        </div>

        {/* Secondary Links */}
        <div className={styles.secondaryLinks}>
          <Link href="/data-policy" className={styles.secondaryLink}>Data Policy</Link>
          <span className={styles.separator}>•</span>
          <Link href="/privacy" className={styles.secondaryLink}>Privacy</Link>
          <span className={styles.separator}>•</span>
          <Link href="/terms" className={styles.secondaryLink}>Terms</Link>
          <span className={styles.separator}>•</span>
          <Link href="/contact" className={styles.secondaryLink}>Contact</Link>
        </div>

        {/* Tagline */}
        <div className={styles.tagline}>
          Built for transparency. Powered by citizens.
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          © 2025 yourRTI
        </div>
      </div>
    </footer>
  )
}
