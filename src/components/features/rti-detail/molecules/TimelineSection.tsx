import { BaseProps, RTIStatus } from '@/types'
import { RTITimelineEvent } from '@/data/rtiDetailData'
import { Typography } from '@/components/ui/Typography'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '../atoms'
import styles from './TimelineSection.module.css'

interface TimelineSectionProps extends BaseProps {
  events: RTITimelineEvent[]
  status?: RTIStatus
  daysElapsed?: number
  daysTotal?: number
  daysRemaining?: number
  daysOverdue?: number
  variant?: 'sidebar' | 'inline'
}

/**
 * TimelineSection Component
 *
 * Displays a vertical timeline of RTI events with connector lines.
 * Supports sidebar (narrow) and inline (full-width) variants.
 *
 * @example
 * <TimelineSection
 *   events={timelineEvents}
 *   variant="sidebar"
 * />
 */
export function TimelineSection({
  events,
  status,
  daysElapsed,
  daysTotal = 30,
  daysRemaining,
  daysOverdue,
  variant = 'inline',
  className = '',
}: TimelineSectionProps) {
  const getEventColor = (type: RTITimelineEvent['type']): string => {
    const colorMap: Record<RTITimelineEvent['type'], string> = {
      filed: styles.filed,
      acknowledged: styles.acknowledged,
      transferred: styles.transferred,
      answered: styles.answered,
      appeal: styles.appeal,
      reminder: styles.reminder,
    }
    return colorMap[type] || styles.filed
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Get progress bar variant based on status
  const getProgressVariant = (): 'success' | 'warning' | 'danger' | 'info' => {
    if (!status) return 'info'

    switch (status) {
      case 'answered':
        return 'success'
      case 'pending':
        return daysElapsed && daysElapsed > 20 ? 'warning' : 'info'
      case 'overdue':
        return 'danger'
      case 'transferred':
      case 'third-party':
        return 'info'
      default:
        return 'info'
    }
  }

  // Get progress label based on status
  const getProgressLabel = (): string | undefined => {
    if (!daysElapsed) return undefined

    switch (status) {
      case 'pending':
        return `${daysElapsed} of ${daysTotal} days elapsed (${daysRemaining || 0} days remaining)`
      case 'overdue':
        return `${daysElapsed} days elapsed (${daysOverdue || 0} days overdue - ${Math.round((daysElapsed / daysTotal) * 100)}% of deadline)`
      case 'transferred':
      case 'third-party':
        return `${daysElapsed} of ${daysTotal} days elapsed (extended deadline)`
      case 'answered':
        return `Response received in ${daysElapsed} days (${daysElapsed <= daysTotal ? 'within' : 'exceeded'} deadline)`
      default:
        return undefined
    }
  }

  const showProgress = status && ['pending', 'overdue', 'transferred', 'third-party'].includes(status)

  return (
    <div className={`${styles.timeline} ${styles[variant]} ${className}`} role="list" aria-label="RTI Timeline">
      <Typography variant="headline-small" as="h2" className={styles.header}>
        TIMELINE
      </Typography>

      {/* Progress Bar for active statuses */}
      {showProgress && daysElapsed !== undefined && (
        <div className={styles.progressSection}>
          <ProgressBar
            current={status === 'overdue' ? daysTotal : daysElapsed}
            total={daysTotal}
            label={getProgressLabel()}
            variant={getProgressVariant()}
            showPercentage={false}
          />
          {status === 'overdue' && daysOverdue && (
            <ProgressBar
              current={daysOverdue}
              total={daysOverdue + 10}
              label={`Overdue by ${daysOverdue} days`}
              variant="danger"
              showPercentage={false}
            />
          )}
        </div>
      )}

      <div className={styles.events}>
        {events.map((event, index) => (
          <div key={event.id} className={styles.event} role="listitem">
            <div className={`${styles.dot} ${getEventColor(event.type)}`} aria-hidden="true" />
            <div className={styles.content}>
              <div className={styles.dateRow}>
                <time className={styles.date} dateTime={event.date}>
                  {formatDate(event.date)}
                </time>
                {event.daysFromFiling !== undefined && (
                  <span className={styles.daysFromFiling}>Day {event.daysFromFiling}</span>
                )}
                {event.isEarly && (
                  <Badge variant="default" className={styles.earlyBadge}>
                    Early
                  </Badge>
                )}
                {event.isLate && (
                  <Badge variant="overdue" className={styles.lateBadge}>
                    Late
                  </Badge>
                )}
              </div>
              <Typography variant="body-text" className={styles.title}>
                {event.title}
              </Typography>
              {event.description && (
                <Typography variant="body-text-small" className={styles.description}>
                  {event.description}
                </Typography>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
