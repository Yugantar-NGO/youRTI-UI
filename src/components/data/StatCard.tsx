import { BaseProps, Statistic } from '@/types'
import styles from './StatCard.module.css'

interface StatCardProps extends BaseProps {
  stat: Statistic
}

/**
 * StatCard Component
 *
 * Displays a single statistic with monospace numbers and optional trend indicator.
 * Uses newspaper box-shadow styling for visual emphasis.
 *
 * @example
 * <StatCard stat={{
 *   label: 'Filed',
 *   value: 24567,
 *   change: 12,
 *   changeType: 'increase'
 * }} />
 */
export function StatCard({ stat, className = '' }: StatCardProps) {
  const { label, value, change, changeType, unit = '' } = stat

  return (
    <div className={`${styles.statCard} ${className}`}>
      <div className={styles.value}>
        {value.toLocaleString()}
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
      <div className={styles.label}>{label}</div>
      {change !== undefined && changeType && (
        <div className={`${styles.change} ${styles[changeType]}`}>
          {changeType === 'increase' && '↑ '}
          {changeType === 'decrease' && '↓ '}
          {changeType === 'neutral' && '→ '}
          {Math.abs(change)}%
        </div>
      )}
    </div>
  )
}

/**
 * StatGrid Component
 *
 * Grid layout for displaying multiple statistics in a row.
 *
 * @example
 * <StatGrid stats={[stat1, stat2, stat3]} />
 */
export function StatGrid({
  stats,
  className = '',
}: {
  stats: Statistic[]
  className?: string
}) {
  return (
    <div className={`${styles.statGrid} ${className}`}>
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  )
}
