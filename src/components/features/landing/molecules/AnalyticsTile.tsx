import { ReactNode } from 'react'
import styles from './AnalyticsTile.module.css'

interface AnalyticsTileProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
  children?: ReactNode
  className?: string
}

/**
 * AnalyticsTile Component
 *
 * A card container for displaying analytics with a title, main value,
 * optional trend indicator, and chart visualization.
 *
 * @example
 * <AnalyticsTile
 *   title="Answer Timeliness"
 *   value="18.5 days"
 *   subtitle="Average response time"
 *   trend={{ value: 12, direction: 'down' }}
 * >
 *   <Sparkline data={[...]} />
 * </AnalyticsTile>
 */
export function AnalyticsTile({
  title,
  value,
  subtitle,
  trend,
  children,
  className = ''
}: AnalyticsTileProps) {
  return (
    <div className={`${styles.tile} ${className}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>

      <div className={styles.content}>
        <div className={styles.valueSection}>
          <div className={styles.mainValue}>{value}</div>
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
          {trend && (
            <div className={`${styles.trend} ${styles[trend.direction]}`}>
              <span className={styles.trendIcon}>
                {trend.direction === 'up' ? '↑' : '↓'}
              </span>
              <span className={styles.trendValue}>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        {children && (
          <div className={styles.visualization}>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}
