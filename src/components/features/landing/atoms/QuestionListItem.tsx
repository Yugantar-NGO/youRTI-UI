import { RecentQuestion } from '@/types'
import { Badge } from '@/components/ui/Badge'
import styles from './QuestionListItem.module.css'

interface QuestionListItemProps {
  question: RecentQuestion
  className?: string
}

/**
 * QuestionListItem Component
 *
 * Displays recent RTI question in a list format.
 * Shows question text with metadata and status badge.
 *
 * @example
 * <QuestionListItem question={{ question: '...', topic: 'Health', status: 'pending' }} />
 */
export function QuestionListItem({ question, className = '' }: QuestionListItemProps) {
  return (
    <div className={`${styles.questionItem} ${className}`}>
      <div className={styles.content}>
        <p className={styles.question}>{question.question}</p>
        <div className={styles.metadata}>
          <span className={styles.topic}>[{question.topic}]</span>
          <span className={styles.separator}>•</span>
          <span className={styles.department}>Dept: {question.department}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.date}>Filed: {new Date(question.filedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>
      <div className={styles.status}>
        <Badge variant={question.status} showIcon />
      </div>
    </div>
  )
}
