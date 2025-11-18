'use client'

import { BaseProps } from '@/types'
import { ImpactMetricData } from '@/data/rtiDetailData'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { Badge } from '@/components/ui/Badge'
import { Eye } from '@/lib/icons'
import { Icon } from '@/components/ui/Icon'
import styles from './ImpactSummaryCard.module.css'

interface ImpactSummaryCardProps extends BaseProps {
  impactOneLiner: string
  metrics: ImpactMetricData[]
  badges: string[]
  viewCount: number
}

/**
 * ImpactSummaryCard Component
 *
 * Displays impact summary with one-liner, metrics grid, badges, and view count.
 * Responsive 2x2 grid on desktop, single column on mobile.
 *
 * @example
 * <ImpactSummaryCard
 *   impactOneLiner="₹2.3 Cr contract details revealed"
 *   metrics={[...]}
 *   badges={['🏆 DATA RELEASED', '💰 MONEY TRAIL']}
 *   viewCount={2400}
 * />
 */
export function ImpactSummaryCard({
  impactOneLiner,
  metrics,
  badges,
  viewCount,
  className = '',
}: ImpactSummaryCardProps) {
  return (
    <Card variant="bordered" padding="lg" className={`${styles.card} ${className}`}>
      {/* One-liner */}
      <Typography variant="headline-small" as="h2" className={styles.oneLiner}>
        {impactOneLiner}
      </Typography>

      {/* Metrics Grid */}
      <div className={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <div key={index} className={styles.metricCard}>
            <div className={styles.metricIcon}>{metric.icon}</div>
            <div className={styles.metricContent}>
              <div className={styles.metricValue}>{metric.value}</div>
              <div className={styles.metricLabel}>{metric.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Badges Row */}
      {badges.length > 0 && (
        <div className={styles.badgesWrapper}>
          <div className={styles.badges}>
            {badges.map((badge, index) => (
              <Badge key={index} variant="default" className={styles.badge}>
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* View Count */}
      <div className={styles.viewCount}>
        <Icon icon={Eye} size="sm" />
        <span className={styles.viewCountText}>
          {viewCount.toLocaleString()} {viewCount === 1 ? 'view' : 'views'}
        </span>
      </div>
    </Card>
  )
}
