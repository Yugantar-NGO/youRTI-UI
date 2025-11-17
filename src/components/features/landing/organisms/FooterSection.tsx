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
          <a href="/about" className={styles.link}>About</a>
          <span className={styles.separator}>•</span>
          <a href="/browse" className={styles.link}>Browse RTIs</a>
          <span className={styles.separator}>•</span>
          <a href="/file-rti" className={styles.link}>File RTI</a>
          <span className={styles.separator}>•</span>
          <a href="/analytics" className={styles.link}>Analytics</a>
          <span className={styles.separator}>•</span>
          <a href="/api" className={styles.link}>API Documentation</a>
        </div>

        {/* Secondary Links */}
        <div className={styles.secondaryLinks}>
          <a href="/data-policy" className={styles.secondaryLink}>Data Policy</a>
          <span className={styles.separator}>•</span>
          <a href="/privacy" className={styles.secondaryLink}>Privacy</a>
          <span className={styles.separator}>•</span>
          <a href="/terms" className={styles.secondaryLink}>Terms</a>
          <span className={styles.separator}>•</span>
          <a href="/contact" className={styles.secondaryLink}>Contact</a>
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
