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
        <div className={styles.links}>
          <a href="/about" className={styles.link}>About</a>
          <span className={styles.separator}>|</span>
          <a href="/data-sources" className={styles.link}>Data Sources</a>
          <span className={styles.separator}>|</span>
          <a href="/how-to-file" className={styles.link}>How to File RTI</a>
          <span className={styles.separator}>|</span>
          <a href="/contact" className={styles.link}>Contact</a>
        </div>

        <div className={styles.attribution}>
          <p className={styles.text}>
            Community-sourced data from YouRTI & public records.
            Auto-generated daily from RTI logs, replies and decisions.
          </p>
          <p className={styles.text}>
            <a href="/governance" className={styles.dashboardLink}>
              View Governance Analytics Dashboard →
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
