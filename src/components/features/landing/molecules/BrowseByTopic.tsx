import { TopicHub } from '@/types'
import { TopicCard } from '../atoms/TopicCard'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import styles from './BrowseByTopic.module.css'

interface BrowseByTopicProps {
  topics: TopicHub[]
  className?: string
}

/**
 * BrowseByTopic Component
 *
 * Displays topic hubs in a grid for browsing RTIs by category.
 * Each topic shows count and links to topic page.
 *
 * @example
 * <BrowseByTopic topics={[...]} />
 */
export function BrowseByTopic({ topics, className = '' }: BrowseByTopicProps) {
  return (
    <Card variant="bordered" className={`${styles.browseByTopic} ${className}`}>
      <CardHeader>
        <CardTitle>🗂 Browse by Topic</CardTitle>
      </CardHeader>

      <CardContent>
        <div className={styles.grid}>
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <a href="/topics" className={styles.viewAllLink}>
          View all topics →
        </a>
      </CardFooter>
    </Card>
  )
}
