import { RTIAnswer } from '@/types'
import { AnswerListItem } from '../atoms/AnswerListItem'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import styles from './FreshAnswers.module.css'

interface FreshAnswersProps {
  answers: RTIAnswer[]
  maxDisplay?: number
  className?: string
}

/**
 * FreshAnswers Component
 *
 * Displays list of recently answered RTIs.
 * Shows most recent RTI responses with summaries.
 *
 * @example
 * <FreshAnswers answers={[...]} maxDisplay={3} />
 */
export function FreshAnswers({ answers, maxDisplay = 5, className = '' }: FreshAnswersProps) {
  const displayedAnswers = answers.slice(0, maxDisplay)

  if (!answers || answers.length === 0) {
    return null
  }

  return (
    <Card variant="bordered" className={`${styles.freshAnswers} ${className}`}>
      <CardHeader>
        <CardTitle>
          <span className={styles.icon}>✅</span> Fresh Answers (recent RTI replies)
        </CardTitle>
      </CardHeader>

      <CardContent className={styles.content}>
        <div className={styles.list}>
          {displayedAnswers.map((answer) => (
            <AnswerListItem key={answer.id} answer={answer} />
          ))}
        </div>
      </CardContent>

      {answers.length > maxDisplay && (
        <CardFooter>
          <a href="/recent-answers" className={styles.viewAllLink}>
            View all recent answers →
          </a>
        </CardFooter>
      )}
    </Card>
  )
}
