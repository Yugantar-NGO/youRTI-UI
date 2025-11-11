import { ActivityItem } from '@/types'
import { ActivityItemComponent } from '../atoms/ActivityItemComponent'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import styles from './ActivityFeed.module.css'

interface ActivityFeedProps {
  activities: ActivityItem[]
  maxDisplay?: number
  className?: string
}

/**
 * ActivityFeed Component
 *
 * Displays recent RTI activity timeline.
 * Shows filed, answered, denied, and other status updates.
 *
 * @example
 * <ActivityFeed activities={[...]} maxDisplay={5} />
 */
export function ActivityFeed({ activities, maxDisplay = 10, className = '' }: ActivityFeedProps) {
  const displayedActivities = activities.slice(0, maxDisplay)

  return (
    <Card variant="bordered" className={`${styles.activityFeed} ${className}`}>
      <CardHeader>
        <CardTitle>📡 Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        <div className={styles.timeline}>
          {displayedActivities.map((activity) => (
            <ActivityItemComponent key={activity.id} activity={activity} showIcon />
          ))}
        </div>
      </CardContent>

      {activities.length > maxDisplay && (
        <CardFooter className={styles.footer}>
          <a href="/activity" className={styles.viewAllLink}>
            View All RTIs →
          </a>
        </CardFooter>
      )}
    </Card>
  )
}
