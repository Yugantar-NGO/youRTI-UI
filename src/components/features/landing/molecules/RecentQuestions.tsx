import { RecentQuestion } from '@/types'
import { QuestionListItem } from '../atoms/QuestionListItem'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import styles from './RecentQuestions.module.css'

interface RecentQuestionsProps {
  questions: RecentQuestion[]
  maxDisplay?: number
  className?: string
}

/**
 * RecentQuestions Component
 *
 * Displays "What People Are Asking" section.
 * Shows recently filed RTI questions with status.
 *
 * @example
 * <RecentQuestions questions={[...]} maxDisplay={4} />
 */
export function RecentQuestions({
  questions,
  maxDisplay = 6,
  className = '',
}: RecentQuestionsProps) {
  const displayedQuestions = questions.slice(0, maxDisplay)

  if (!questions || questions.length === 0) {
    return null
  }

  return (
    <Card variant="bordered" className={`${styles.recentQuestions} ${className}`}>
      <CardHeader>
        <CardTitle>
          <span className={styles.icon}>📝</span> What People Are Asking (this week)
        </CardTitle>
      </CardHeader>

      <CardContent className={styles.content}>
        <div className={styles.list}>
          {displayedQuestions.map((question) => (
            <QuestionListItem key={question.id} question={question} />
          ))}
        </div>
      </CardContent>

      {questions.length > maxDisplay && (
        <CardFooter>
          <a href="/all-questions" className={styles.browseLink}>
            Browse all RTI questions →
          </a>
        </CardFooter>
      )}
    </Card>
  )
}
