import { RecentQuestion } from '@/types'
import { QuestionListItem } from '../atoms/QuestionListItem'
import styles from './PeopleAreAsking.module.css'

interface PeopleAreAskingProps {
  questions: (RecentQuestion & { hookLine?: string })[]
  className?: string
}

/**
 * PeopleAreAsking Component (Task 5)
 *
 * Displays "People Are Asking This Week" section with 2x3 grid of question cards.
 * Each card shows an RTI question with topic pill, status badge, and LLM-generated hook line.
 *
 * @example
 * <PeopleAreAsking questions={[...]} />
 */
export function PeopleAreAsking({ questions, className = '' }: PeopleAreAskingProps) {
  // Display up to 6 questions in 2x3 grid
  const displayedQuestions = questions.slice(0, 6)

  if (!questions || questions.length === 0) {
    return null
  }

  return (
    <section className={`${styles.peopleAreAsking} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>People Are Asking This Week</h2>
        <p className={styles.subtitle}>
          Recent RTI questions filed by citizens across India
        </p>
      </div>

      <div className={styles.grid}>
        {displayedQuestions.map((question) => (
          <QuestionListItem key={question.id} question={question} />
        ))}
      </div>

      <div className={styles.footer}>
        <a href="/questions" className={styles.viewAllLink}>
          View All Questions
          <svg
            className={styles.arrowIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}
