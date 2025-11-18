import { BaseProps } from '@/types'
import { RTITimelineEvent } from '@/data/rtiDetailData'
import { Typography } from '@/components/ui/Typography'
import { Badge } from '@/components/ui/Badge'
import styles from './TimelineSection.module.css'

interface TimelineSectionProps extends BaseProps {
  events: RTITimelineEvent[]
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

  return (
    <div className={`${styles.timeline} ${styles[variant]} ${className}`} role="list" aria-label="RTI Timeline">
      <Typography variant="headline-small" as="h2" className={styles.header}>
        TIMELINE
      </Typography>

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
