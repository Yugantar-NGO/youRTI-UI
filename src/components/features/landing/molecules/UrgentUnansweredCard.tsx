import Link from 'next/link'
import styles from './UrgentUnansweredCard.module.css'

interface UrgentUnansweredCardProps {
  title: string
  department: string
  location: string
  daysOverdue: number
  filedDate: string
  deadline: string
  href: string
  className?: string
}

/**
 * UrgentUnansweredCard Molecule
 *
 * Displays the "Most Urgent Unanswered RTI" with red accent border,
 * overdue timeline, and department/location context.
 *
 * @example
 * <UrgentUnansweredCard
 *   title="COVID Fund Utilization Details"
 *   department="Health Ministry"
 *   location="Maharashtra"
 *   daysOverdue={47}
 *   filedDate="Aug 15, 2024"
 *   deadline="Sep 15, 2024"
 * />
 */
export function UrgentUnansweredCard({
  title,
  department,
  location,
  daysOverdue,
  filedDate,
  deadline,
  href,
  className = '',
}: UrgentUnansweredCardProps) {
  return (
    <article className={`${styles.card} ${className}`}>
      <div className={styles.header}>
        <span className={styles.badge}>Most Urgent</span>
        <span className={styles.overdueBadge}>{daysOverdue} days overdue</span>
      </div>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.metadata}>
        <span className={styles.metaItem}>
          <svg className={styles.metaIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L10.163 5.377L15 6.107L11.5 9.528L12.326 14.343L8 12.077L3.674 14.343L4.5 9.528L1 6.107L5.837 5.377L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {department}
        </span>
        <span className={styles.separator}>•</span>
        <span className={styles.metaItem}>
          <svg className={styles.metaIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 4V8L10.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {location}
        </span>
      </div>

      <div className={styles.timelineSection}>
        <div className={styles.timelineLabel}>Timeline:</div>
        <div className={styles.timeline}>
          <div className={styles.timelineTrack}>
            <div className={styles.timelineProgress} />
            <div className={styles.timelineOverdue} />
          </div>
          <div className={styles.timelineMarkers}>
            <div className={styles.markerGroup}>
              <div className={styles.marker} />
              <div className={styles.markerLabel}>Filed</div>
              <div className={styles.markerDate}>{filedDate}</div>
            </div>
            <div className={styles.markerGroup}>
              <div className={`${styles.marker} ${styles.markerDeadline}`} />
              <div className={styles.markerLabel}>Deadline</div>
              <div className={styles.markerDate}>{deadline}</div>
            </div>
            <div className={styles.markerGroup}>
              <div className={`${styles.marker} ${styles.markerCurrent}`} />
              <div className={styles.markerLabel}>Today</div>
              <div className={styles.markerDate}>{daysOverdue}d over</div>
            </div>
          </div>
        </div>
      </div>

      <Link href={href} className={styles.actionButton} aria-label="Track this RTI">
        Track This RTI →
      </Link>
    </article>
  )
}
