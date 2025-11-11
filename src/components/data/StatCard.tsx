import { BaseProps, Statistic } from '@/types'
import { Icon } from '@/components/ui/Icon'
import { TrendingUp, TrendingDown, Minus } from '@/lib/icons'
import { LucideIcon } from 'lucide-react'
import styles from './StatCard.module.css'

interface StatCardProps extends BaseProps {
  stat: Statistic
  icon?: LucideIcon
}

/**
 * StatCard Component
 *
 * Displays a single statistic with theme-agnostic styling.
 * Supports optional icons and trend indicators.
 *
 * @example
 * import { FileText } from '@/lib/icons'
 * <StatCard
 *   icon={FileText}
 *   stat={{
 *     label: 'Filed',
 *     value: 24567,
 *     change: 12,
 *     changeType: 'increase'
 *   }}
 * />
 */
export function StatCard({ stat, icon, className = '' }: StatCardProps) {
  const { label, value, change, changeType, unit = '' } = stat

  // Trend icon mapping
  const trendIconMap = {
    increase: TrendingUp,
    decrease: TrendingDown,
    neutral: Minus,
  }

  return (
    <div className={`${styles.statCard} ${className}`}>
      {icon && (
        <div className={styles.iconWrapper}>
          <Icon icon={icon} size="lg" />
        </div>
      )}
      <div className={styles.value}>
        {value.toLocaleString()}
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
      <div className={styles.label}>{label}</div>
      {change !== undefined && changeType && (
        <div className={`${styles.change} ${styles[changeType]}`}>
          <Icon icon={trendIconMap[changeType]} size="xs" />
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
