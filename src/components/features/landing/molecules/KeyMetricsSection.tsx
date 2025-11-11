import { KeyMetric } from '@/types'
import { MetricCard } from '../atoms/MetricCard'
import styles from './KeyMetricsSection.module.css'

interface KeyMetricsSectionProps {
  metrics: KeyMetric[]
  className?: string
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
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
    </div>
  )
}
