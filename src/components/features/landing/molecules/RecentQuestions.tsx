import { RecentQuestion } from '@/types'
import { QuestionListItem } from '../atoms/QuestionListItem'
import styles from './RecentQuestions.module.css'

interface RecentQuestionsProps {
  questions: RecentQuestion[]
  maxDisplay?: number
  className?: string
}

/**
 * RecentQuestions Component
 *
 * Displays "What People Are Asking" section per TODO Spec Section 5.
 * Horizontal scroll carousel of recently filed RTI questions.
 *
 * @example
 * <RecentQuestions questions={[...]} maxDisplay={4} />
 */
export function RecentQuestions({
  questions,
  maxDisplay = 4,
  className = '',
}: RecentQuestionsProps) {
  const displayedQuestions = questions.slice(0, maxDisplay)

  if (!questions || questions.length === 0) {
    return null
  }

  return (
    <div className={`${styles.recentQuestions} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          📝 What People Are Asking (this week)
        </h2>
      </div>

      <div className={styles.scrollContainer}>
        <div className={styles.list}>
          {displayedQuestions.map((question) => (
            <QuestionListItem key={question.id} question={question} />
          ))}
        </div>
      </div>
    </div>
  )
}
