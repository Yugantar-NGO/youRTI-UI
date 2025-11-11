import { RTIAnswer } from '@/types'
import styles from './AnswerListItem.module.css'

interface AnswerListItemProps {
  answer: RTIAnswer
  className?: string
}

/**
 * AnswerListItem Component
 *
 * Displays RTI answer in fresh answers list.
 * Shows question, answer summary, and metadata.
 *
 * @example
 * <AnswerListItem answer={{ question: '...', answerSummary: '...', department: 'Health' }} />
 */
export function AnswerListItem({ answer, className = '' }: AnswerListItemProps) {
  const daysBetween = Math.floor(
    (new Date(answer.answeredDate).getTime() - new Date(answer.filedDate).getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className={`${styles.answerItem} ${className}`}>
      <div className={styles.header}>
        <h4 className={styles.question}>{answer.question}</h4>
        <div className={styles.metadata}>
          <span className={styles.department}>Dept: {answer.department}</span>
          <span className={styles.separator}>|</span>
          <span className={styles.state}>State: {answer.state}</span>
          <span className={styles.separator}>|</span>
          <span className={styles.dates}>
            Filed: {new Date(answer.filedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} |
            Ans: {new Date(answer.answeredDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
          </span>
        </div>
      </div>
      <div className={styles.answer}>
        <span className={styles.label}>Answer: </span>
        {answer.answerSummary}
      </div>
      <div className={styles.footer}>
        <span className={styles.responseDays}>{daysBetween} days to respond</span>
        <a href={answer.viewLink} className={styles.viewLink}>
          View full answer & docs →
        </a>
      </div>
    </div>
  )
}
