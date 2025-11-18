import { RTIResultItem } from '@/types/dashboard'
import Link from 'next/link'
import styles from './RTIResultCard.module.css'

interface RTIResultCardProps {
  rti: RTIResultItem
  className?: string
}

/**
 * RTIResultCard Component
 *
 * Displays a single RTI result in the browse/filter page grid.
 * Shows status badge, title, metadata, timeline, and CTA.
 */
export function RTIResultCard({ rti, className = '' }: RTIResultCardProps) {
  // Format dates
  const filedDateObj = new Date(rti.filedDate)
  const filedDateFormatted = filedDateObj.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
  })

  const respondedDateFormatted = rti.respondedDate
    ? new Date(rti.respondedDate).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
      })
    : null

  // Calculate time ago
  const now = new Date()
  const diffInMs = now.getTime() - filedDateObj.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const timeAgo =
    diffInDays === 0
      ? 'Today'
      : diffInDays === 1
        ? 'Yesterday'
        : diffInDays < 7
          ? `${diffInDays} days ago`
          : diffInDays < 30
            ? `${Math.floor(diffInDays / 7)} weeks ago`
            : diffInDays < 365
              ? `${Math.floor(diffInDays / 30)} months ago`
              : `${Math.floor(diffInDays / 365)} years ago`

  // Status badge styling
  const statusClass =
    rti.status === 'answered'
      ? styles.statusAnswered
      : rti.status === 'pending'
        ? styles.statusPending
        : styles.statusOverdue

  const statusLabel =
    rti.status === 'answered'
      ? 'Answered'
      : rti.status === 'pending'
        ? 'Pending'
        : 'Overdue'

  // Timeline text
  const timelineText =
    rti.status === 'answered' && rti.responseDays
      ? `Filed: ${filedDateFormatted} • Responded: ${respondedDateFormatted} (${rti.responseDays} days)`
      : rti.status === 'overdue' && rti.daysOverdue
        ? `Filed: ${filedDateFormatted} • Still pending (${rti.daysOverdue} days late)`
        : `Filed: ${filedDateFormatted} • Still pending`

  const ctaText =
    rti.status === 'answered'
      ? 'Read Full RTI →'
      : rti.status === 'overdue'
        ? 'Track This RTI →'
        : 'View Details →'

  return (
    <Link href={rti.link} className={`${styles.card} ${className}`}>
      <div className={styles.header}>
        <span className={`${styles.statusBadge} ${statusClass}`}>{statusLabel}</span>
        <span className={styles.timeAgo}>{timeAgo}</span>
      </div>

      <h3 className={styles.title}>{rti.title}</h3>

      <div className={styles.metadata}>
        <span className={styles.metadataItem}>
          🏛️ {rti.department} {rti.state}
        </span>
        <span className={styles.separator}>•</span>
        <span className={styles.metadataItem}>📍 {rti.location}</span>
      </div>

      {rti.teaserText && <p className={styles.teaser}>{rti.teaserText}</p>}

      <div className={styles.timeline}>{timelineText}</div>

      <div className={styles.cta}>{ctaText}</div>
    </Link>
  )
}
