import { ImpactMeter } from '../molecules/ImpactMeter'
import styles from './ImpactMeterSection.module.css'

interface KeyMetric {
  label: string
  value: string | number
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
}

interface ImpactMeterSectionProps {
  healthScore?: number
  className?: string
}

/**
 * ImpactMeterSection Component
 *
 * Displays the RTI Health Score meter alongside key metrics in a 6/6 column split.
 * Left side: Impact Meter with radial gauge
 * Right side: 2x2 grid of compact key metrics
 *
 * @example
 * <ImpactMeterSection healthScore={78} />
 */
export function ImpactMeterSection({
  healthScore = 78,
  className = ''
}: ImpactMeterSectionProps) {
  const keyMetrics: KeyMetric[] = [
    {
      label: 'Top Performing Dept',
      value: 'Health & Family Welfare',
      trend: { value: 5, direction: 'up' }
    },
    {
      label: 'Most Filed Topic',
      value: 'Public Works',
      trend: { value: 12, direction: 'up' }
    },
    {
      label: 'Avg Fulfillment Rate',
      value: '72%',
      trend: { value: 3, direction: 'up' }
    },
    {
      label: 'Cases Overdue',
      value: '234',
      trend: { value: 8, direction: 'down' }
    }
  ]

  return (
    <section className={`${styles.impactMeterSection} ${className}`}>
      <div className={styles.container}>
        <div className={styles.meterColumn}>
          <div className={styles.meterCard}>
            <ImpactMeter score={healthScore} />
          </div>
        </div>

        <div className={styles.metricsColumn}>
          <h3 className={styles.metricsTitle}>Key Metrics</h3>
          <div className={styles.metricsGrid}>
            {keyMetrics.map((metric, index) => (
              <div key={index} className={styles.metricTile}>
                <div className={styles.metricLabel}>{metric.label}</div>
                <div className={styles.metricValue}>{metric.value}</div>
                {metric.trend && (
                  <div className={`${styles.metricTrend} ${styles[metric.trend.direction]}`}>
                    <span className={styles.trendIcon}>
                      {metric.trend.direction === 'up' ? '↑' : '↓'}
                    </span>
                    <span className={styles.trendValue}>{metric.trend.value}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
