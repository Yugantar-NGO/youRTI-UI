import { RTIAnswer } from '@/types'
import styles from './AnswerListItem.module.css'

interface AnswerListItemProps {
  answer: RTIAnswer
  className?: string
}

/**
 * AnswerListItem Component
 *
 * Displays RTI answer as a clickable card.
 * Shows question, answer summary, and metadata with visual icons.
 *
 * @example
 * <AnswerListItem answer={{ question: '...', answerSummary: '...', department: 'Health' }} />
 */
export function AnswerListItem({ answer, className = '' }: AnswerListItemProps) {
  const daysBetween = Math.floor(
    (new Date(answer.answeredDate).getTime() - new Date(answer.filedDate).getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <a href={answer.viewLink} className={`${styles.answerCard} ${className}`}>
      <div className={styles.cardHeader}>
        <div className={styles.statusBadge}>
          <svg className={styles.iconCheck} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Answered</span>
        </div>
        <div className={styles.responseTime}>
          <svg className={styles.iconClock} width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 4V8L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>{daysBetween} days</span>
        </div>
      </div>

      <h4 className={styles.question}>{answer.question}</h4>

      <div className={styles.answerBox}>
        <div className={styles.answerLabel}>
          <svg className={styles.iconDocument} width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M9 1H3C2.44772 1 2 1.44772 2 2V14C2 14.5523 2.44772 15 3 15H13C13.5523 15 14 14.5523 14 14V6L9 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M9 1V6H14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          Answer Summary
        </div>
        <p className={styles.answerText}>{answer.answerSummary}</p>
      </div>

      <div className={styles.metadata}>
        <div className={styles.metaItem}>
          <svg className={styles.iconBuilding} width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 2V14M10 2V14M2 6H14M2 10H14" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span>{answer.department}</span>
        </div>
        <div className={styles.metaItem}>
          <svg className={styles.iconLocation} width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 14C8 14 13 10 13 6C13 3.23858 10.7614 1 8 1C5.23858 1 3 3.23858 3 6C3 10 8 14 8 14Z" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span>{answer.state}</span>
        </div>
        <div className={styles.metaItem}>
          <svg className={styles.iconCalendar} width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 1V5M11 1V5M2 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>Filed {new Date(answer.filedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
        </div>
        <div className={styles.metaItem}>
          <svg className={styles.iconCalendar} width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 1V5M11 1V5M2 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>Answered {new Date(answer.answeredDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
        </div>
      </div>

      <div className={styles.viewPrompt}>
        <span>View full answer & documents</span>
        <svg className={styles.iconArrow} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </a>
  )
}
