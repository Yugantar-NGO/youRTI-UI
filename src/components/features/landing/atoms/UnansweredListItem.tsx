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
 * Displays important unanswered RTI as a clickable card.
 * Shows question, impact explanation, status, and visual indicators.
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

  const statusDisplay = {
    pending: 'Pending',
    first_appeal: 'First Appeal',
    second_appeal: 'Second Appeal',
  }

  return (
    <a href={unanswered.trackLink} className={`${styles.unansweredCard} ${isOverdue ? styles.overdue : ''} ${className}`}>
      <div className={styles.cardHeader}>
        <div className={styles.statusInfo}>
          <Badge variant={statusMap[unanswered.status]} />
          <span className={styles.statusText}>{statusDisplay[unanswered.status]}</span>
        </div>
        <div className={`${styles.timeElapsed} ${isOverdue ? styles.overdueTime : ''}`}>
          <svg className={styles.iconHourglass} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 2H11M5 14H11M8 8L5 5V2H11V5L8 8ZM8 8L11 11V14H5V11L8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{unanswered.daysElapsed} days</span>
          {isOverdue && <span className={styles.overdueLabel}>({unanswered.daysOverdue} overdue)</span>}
        </div>
      </div>

      <h4 className={styles.question}>{unanswered.question}</h4>

      <div className={styles.impactBox}>
        <div className={styles.impactHeader}>
          <svg className={styles.iconAlert} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L1 14H15L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M8 6V9M8 11.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className={styles.impactLabel}>Why this matters</span>
        </div>
        <p className={styles.impactText}>{unanswered.whyMatters}</p>
      </div>

      <div className={styles.metadata}>
        <div className={styles.metaItem}>
          <svg className={styles.iconBuilding} width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 2V14M10 2V14M2 6H14M2 10H14" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span>{unanswered.department}</span>
        </div>
        <div className={styles.metaItem}>
          <svg className={styles.iconLocation} width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 14C8 14 13 10 13 6C13 3.23858 10.7614 1 8 1C5.23858 1 3 3.23858 3 6C3 10 8 14 8 14Z" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span>{unanswered.state}</span>
        </div>
      </div>

      <div className={styles.viewPrompt}>
        <span>Track this RTI application</span>
        <svg className={styles.iconArrow} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </a>
  )
}
