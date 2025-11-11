import { UnansweredRTI } from '@/types'
import { Badge } from '@/components/ui/Badge'
import styles from './UnansweredListItem.module.css'

interface UnansweredListItemProps {
  unanswered: UnansweredRTI
  className?: string
}

/**
 * UnansweredListItem Component
 *
 * Displays important unanswered RTI with overdue warning.
 * Shows question, impact explanation, status, and tracking link.
 *
 * @example
 * <UnansweredListItem unanswered={{ question: '...', whyMatters: '...', status: 'pending' }} />
 */
export function UnansweredListItem({ unanswered, className = '' }: UnansweredListItemProps) {
  const isOverdue = unanswered.daysOverdue > 0

  const statusMap = {
    pending: 'pending' as const,
    first_appeal: 'appealed' as const,
    second_appeal: 'appealed' as const,
  }

  const statusLabel = {
    pending: `Pending (${unanswered.daysElapsed} days; ${unanswered.daysOverdue} days overdue)`,
    first_appeal: `First Appeal (${unanswered.daysElapsed} days; ${unanswered.daysOverdue} days overdue)`,
    second_appeal: `Second Appeal (${unanswered.daysElapsed} days; ${unanswered.daysOverdue} days overdue)`,
  }

  return (
    <div className={`${styles.unansweredItem} ${isOverdue ? styles.overdue : ''} ${className}`}>
      <div className={styles.header}>
        <h4 className={styles.question}>{unanswered.question}</h4>
        <Badge variant={statusMap[unanswered.status]} />
      </div>

      <div className={styles.impact}>
        <span className={styles.impactLabel}>Why it matters: </span>
        {unanswered.whyMatters}
      </div>

      <div className={styles.metadata}>
        <span className={styles.status}>{statusLabel[unanswered.status]}</span>
        <span className={styles.separator}>|</span>
        <span className={styles.department}>Dept: {unanswered.department}</span>
        <span className={styles.separator}>|</span>
        <span className={styles.state}>State: {unanswered.state}</span>
      </div>

      <div className={styles.footer}>
        <a href={unanswered.trackLink} className={styles.trackLink}>
          Track this RTI →
        </a>
      </div>
    </div>
  )
}
