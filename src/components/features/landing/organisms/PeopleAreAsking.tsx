import { TopicStatistics } from '@/types/dashboard'
import { TopicCard } from '../atoms/TopicCard'
import styles from './PeopleAreAsking.module.css'

interface PeopleAreAskingProps {
  topics: TopicStatistics[]
  className?: string
}

/**
 * PeopleAreAsking Component (What India Is Asking About)
 *
 * Displays "What India Is Asking About" section with a grid of topic cards.
 * Each card shows aggregated statistics for a specific RTI topic category,
 * including response rates, average response times, and latest questions.
 *
 * @example
 * <PeopleAreAsking topics={[...]} />
 */
export function PeopleAreAsking({ topics, className = '' }: PeopleAreAskingProps) {
  // Display up to 8 topics in 2x4 grid
  const displayedTopics = topics.slice(0, 8)

  if (!topics || topics.length === 0) {
    return null
  }

  return (
    <section className={`${styles.peopleAreAsking} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>What India Is Asking About</h2>
        <p className={styles.subtitle}>
          Real questions from citizens, tracked across {topics.length.toLocaleString()} RTIs
        </p>
      </div>

      <div className={styles.grid}>
        {displayedTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>

      <div className={styles.footer}>
        <a href="/topics" className={styles.viewAllLink}>
          View All 24 Topics →
        </a>
      </div>
    </section>
  )
}
