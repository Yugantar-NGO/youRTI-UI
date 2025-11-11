import { UnansweredRTI } from '@/types'
import { UnansweredListItem } from '../atoms/UnansweredListItem'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import styles from './UnansweredQuestions.module.css'

interface UnansweredQuestionsProps {
  questions: UnansweredRTI[]
  maxDisplay?: number
  className?: string
}

/**
 * UnansweredQuestions Component
 *
 * Displays list of important pending RTIs.
 * Highlights overdue items with warning styling.
 *
 * @example
 * <UnansweredQuestions questions={[...]} maxDisplay={3} />
 */
export function UnansweredQuestions({
  questions,
  maxDisplay = 5,
  className = '',
}: UnansweredQuestionsProps) {
  const displayedQuestions = questions.slice(0, maxDisplay)

  if (!questions || questions.length === 0) {
    return null
  }

  return (
    <Card variant="bordered" className={`${styles.unansweredQuestions} ${className}`}>
      <CardHeader>
        <CardTitle>
          <span className={styles.icon}>⏳</span> Important Questions Still Waiting for Answers
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className={styles.list}>
          {displayedQuestions.map((question) => (
            <UnansweredListItem key={question.id} unanswered={question} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
