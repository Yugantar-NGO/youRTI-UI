import { TrendData } from '@/types'
import styles from './TrendIndicator.module.css'

interface TrendIndicatorProps {
  trend: TrendData
  className?: string
}

/**
 * TrendIndicator Component
 *
 * Displays trend data with arrow indicators and percentage change.
 * Color-coded based on trend direction (green up, red down, gray neutral).
 *
 * @example
 * <TrendIndicator trend={{
 *   value: 2456,
 *   change: 23,
 *   changeType: 'increase',
 *   period: 'vs last month'
 * }} />
 */
export function TrendIndicator({ trend, className = '' }: TrendIndicatorProps) {
  const { value, change, changeType, period } = trend

  return (
    <div className={`${styles.trendIndicator} ${className}`}>
      <div className={styles.value}>
        {value.toLocaleString()}
      </div>
      <div className={`${styles.change} ${styles[changeType]}`}>
        {changeType === 'increase' && '↑'}
        {changeType === 'decrease' && '↓'}
        {changeType === 'neutral' && '→'}
        <span className={styles.percentage}>
          {Math.abs(change)}%
        </span>
      </div>
      {period && <div className={styles.period}>{period}</div>}
    </div>
  )
}

/**
 * Simple trend arrow component (compact version)
 */
export function TrendArrow({
  changeType,
  change,
}: {
  changeType: 'increase' | 'decrease' | 'neutral'
  change: number
}) {
  return (
    <span className={`${styles.trendArrow} ${styles[changeType]}`}>
      {changeType === 'increase' && '↑'}
      {changeType === 'decrease' && '↓'}
      {changeType === 'neutral' && '→'}
      {' '}
      {Math.abs(change)}%
    </span>
  )
}
