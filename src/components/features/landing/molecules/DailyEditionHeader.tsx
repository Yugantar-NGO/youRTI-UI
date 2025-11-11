import styles from './DailyEditionHeader.module.css'

interface DailyEditionHeaderProps {
  editionDate: string
  className?: string
}

/**
 * DailyEditionHeader Component
 *
 * Section header for the daily edition with title, tagline, and date.
 * Provides context for the story-first section.
 *
 * @example
 * <DailyEditionHeader editionDate="2025-11-12" />
 */
export function DailyEditionHeader({ editionDate, className = '' }: DailyEditionHeaderProps) {
  const formattedDate = new Date(editionDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className={`${styles.header} ${className}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>RTI Transparency Dashboard</h1>
        <p className={styles.tagline}>
          "See what citizens asked, what government answered, and what changed."
        </p>
        <div className={styles.edition}>
          <span className={styles.editionLabel}>Edition:</span>
          <span className={styles.editionDate}>{formattedDate}</span>
          <span className={styles.editionNote}>• Updated daily from RTI records</span>
        </div>
      </div>
    </div>
  )
}
