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
  const getStatusClass = () => {
    switch (rti.status) {
      case 'answered':
        return styles.statusAnswered
      case 'pending':
        return styles.statusPending
      case 'overdue':
        return styles.statusOverdue
      case 'transferred':
        return styles.statusTransferred
      case 'partial':
        return styles.statusPartial
      default:
        return styles.statusPending
    }
  }

  const getStatusLabel = () => {
    switch (rti.status) {
      case 'answered':
        return 'Answered'
      case 'pending':
        return 'Pending'
      case 'overdue':
        return 'Overdue'
      case 'transferred':
        return 'Transferred'
      case 'partial':
        return 'Partial'
      default:
        return 'Pending'
    }
  }

  const statusClass = getStatusClass()
  const statusLabel = getStatusLabel()

  // Timeline text
  const getTimelineText = () => {
    switch (rti.status) {
      case 'answered':
        return rti.responseDays
          ? `Filed: ${filedDateFormatted} • Responded: ${respondedDateFormatted} (${rti.responseDays} days)`
          : `Filed: ${filedDateFormatted} • Responded: ${respondedDateFormatted}`
      case 'overdue':
        return rti.daysOverdue
          ? `Filed: ${filedDateFormatted} • Still pending (${rti.daysOverdue} days late)`
          : `Filed: ${filedDateFormatted} • Still pending`
      case 'transferred':
        return `Filed: ${filedDateFormatted} • Transferred to new dept`
      case 'partial':
        return rti.responseDays
          ? `Filed: ${filedDateFormatted} • Partial response (${rti.responseDays} days)`
          : `Filed: ${filedDateFormatted} • Partial response received`
      default:
        return `Filed: ${filedDateFormatted} • Still pending`
    }
  }

  const getCtaText = () => {
    switch (rti.status) {
      case 'answered':
        return 'Read Full RTI →'
      case 'overdue':
        return 'Track This RTI →'
      case 'transferred':
        return 'Track Transfer →'
      case 'partial':
        return 'View Response →'
      default:
        return 'View Details →'
    }
  }

  const timelineText = getTimelineText()
  const ctaText = getCtaText()

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
