import Link from 'next/link'
import { RecentQuestion } from '@/types'
import { StatusBadge, StatusType } from './StatusBadge'
import styles from './QuestionListItem.module.css'

interface QuestionListItemProps {
  question: RecentQuestion & { hookLine?: string }
  className?: string
}

/**
 * QuestionListItem Component (Task 5 Redesign)
 *
 * Displays recent RTI question as a clickable card.
 * Shows question text with LLM-generated hook line, topic pill, and status badge.
 *
 * @example
 * <QuestionListItem question={{ question: '...', topic: 'Health', status: 'pending', hookLine: '...' }} />
 */
export function QuestionListItem({ question, className = '' }: QuestionListItemProps) {
  const questionLink = `/questions/${question.id}`

  // Map RecentQuestion status to StatusBadge status type
  const getStatusType = (status: string): StatusType => {
    switch (status) {
      case 'filed':
        return 'filed'
      case 'answered':
        return 'answered'
      case 'pending':
        return 'pending'
      default:
        return 'filed'
    }
  }

  return (
    <Link href={questionLink} className={`${styles.questionCard} ${className}`}>
      <div className={styles.cardHeader}>
        <div className={styles.topicBadge}>
          <svg className={styles.iconTag} width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M1 8.5L7.5 15L15 7.5V1H7.5L1 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="11" cy="5" r="1" fill="currentColor"/>
          </svg>
          <span>{question.topic}</span>
        </div>
        <StatusBadge status={getStatusType(question.status)} />
      </div>

      {question.hookLine && (
        <p className={styles.hookLine}>{question.hookLine}</p>
      )}

      <p className={styles.question}>{question.question}</p>

      <div className={styles.metadata}>
        <div className={styles.metaItem}>
          <svg className={styles.iconBuilding} width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 2V14M10 2V14M2 6H14M2 10H14" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span>{question.department}</span>
        </div>
        <div className={styles.metaItem}>
          <svg className={styles.iconCalendar} width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 1V5M11 1V5M2 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>Filed {new Date(question.filedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      <div className={styles.viewPrompt}>
        <span>View question details</span>
        <svg className={styles.iconArrow} width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </Link>
  )
}
