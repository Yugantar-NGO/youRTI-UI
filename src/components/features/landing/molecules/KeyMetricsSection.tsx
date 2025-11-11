import { KeyMetric } from '@/types'
import { MetricCard } from '../atoms/MetricCard'
import styles from './KeyMetricsSection.module.css'

interface KeyMetricsSectionProps {
  metrics: KeyMetric[]
  className?: string
}

/**
 * Get icon color based on metric position
 * Provides semantic colors for different metric types
 */
function getMetricColor(index: number): string {
  const colors = [
    '#0ea5e9', // sky-500 - primary/blue
    '#10b981', // emerald-500 - success/green
    '#f59e0b', // amber-500 - warning/orange
    '#8b5cf6', // violet-500 - analytics/purple
    '#06b6d4', // cyan-500 - info/teal
    '#6366f1', // indigo-500 - activity/indigo
  ]
  return colors[index % colors.length]
}

/**
 * KeyMetricsSection Component
 *
 * Displays key metrics in a 3-column grid.
 * Shows high-level RTI statistics with trends.
 *
 * @example
 * <KeyMetricsSection metrics={[...]} />
 */
export function KeyMetricsSection({ metrics, className = '' }: KeyMetricsSectionProps) {
  return (
    <div className={`${styles.keyMetricsSection} ${className}`}>
      <h2 className={styles.title}>📊 Key Metrics</h2>
      <div className={styles.grid}>
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            iconColor={getMetricColor(index)}
          />
        ))}
      </div>
    </div>
  )
}
