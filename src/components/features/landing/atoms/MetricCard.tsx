import { KeyMetric } from '@/types'
import { Card, CardContent } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { TrendArrow } from '@/components/data/TrendIndicator'
import * as Icons from '@/lib/icons'
import { LucideIcon } from 'lucide-react'
import styles from './MetricCard.module.css'

interface MetricCardProps {
  metric: KeyMetric
  className?: string
}

/**
 * MetricCard Component
 *
 * Displays key metric with icon and optional trend indicator.
 * Used in the Key Metrics section.
 *
 * @example
 * <MetricCard metric={{ icon: 'FileText', title: 'RTIs this year', value: '2,847', trend: {...} }} />
 */
export function MetricCard({ metric, className = '' }: MetricCardProps) {
  const IconComponent = Icons[metric.icon as keyof typeof Icons] as LucideIcon

  return (
    <Card variant="bordered" className={`${styles.metricCard} ${className}`}>
      <CardContent>
        <div className={styles.header}>
          {IconComponent && (
            <div className={styles.iconWrapper}>
              <Icon icon={IconComponent} size="lg" />
            </div>
          )}
          <h3 className={styles.title}>{metric.title}</h3>
        </div>

        <div className={styles.valueSection}>
          <div className={styles.value}>{metric.value}</div>
          {metric.subtitle && (
            <div className={styles.subtitle}>{metric.subtitle}</div>
          )}
        </div>

        {metric.trend && (
          <div className={styles.trendSection}>
            <TrendArrow
              change={metric.trend.value}
              changeType={metric.trend.direction === 'up' ? 'increase' : metric.trend.direction === 'down' ? 'decrease' : 'neutral'}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
