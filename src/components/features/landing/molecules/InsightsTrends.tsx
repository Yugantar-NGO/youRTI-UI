import { InsightItem } from '@/types'
import { InsightCard } from '../atoms/InsightCard'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import styles from './InsightsTrends.module.css'

interface InsightsTrendsProps {
  insights: InsightItem[]
  className?: string
}

/**
 * InsightsTrends Component
 *
 * Displays insights and trends from RTI data.
 * Vertical list of insight cards with icons.
 *
 * @example
 * <InsightsTrends insights={[...]} />
 */
export function InsightsTrends({ insights, className = '' }: InsightsTrendsProps) {
  return (
    <Card variant="bordered" className={`${styles.insightsTrends} ${className}`}>
      <CardHeader>
        <CardTitle>💡 Insights & Trends</CardTitle>
      </CardHeader>

      <CardContent>
        <div className={styles.list}>
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
