import { IndiaGlanceStats } from '@/types'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import styles from './IndiaGlanceCard.module.css'

interface IndiaGlanceCardProps {
  stats: IndiaGlanceStats
  className?: string
}

/**
 * IndiaGlanceCard Component
 *
 * Displays "India at a Glance" RTI performance statistics.
 * Shows breakdown of answered vs pending RTIs.
 *
 * @example
 * <IndiaGlanceCard stats={{ answeredInTime: {...}, answeredLate: {...}, inAppeal: {...} }} />
 */
export function IndiaGlanceCard({ stats, className = '' }: IndiaGlanceCardProps) {
  return (
    <Card variant="bordered" className={`${styles.indiaGlanceCard} ${className}`}>
      <CardHeader>
        <CardTitle>India at a Glance</CardTitle>
      </CardHeader>

      <CardContent>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={`${styles.percentage} ${styles.success}`}>
              {stats.answeredInTime.percentage}%
            </div>
            <div className={styles.label}>{stats.answeredInTime.label}</div>
          </div>

          <div className={styles.statItem}>
            <div className={`${styles.percentage} ${styles.warning}`}>
              {stats.answeredLate.percentage}%
            </div>
            <div className={styles.label}>{stats.answeredLate.label}</div>
          </div>

          <div className={styles.statItem}>
            <div className={`${styles.percentage} ${styles.neutral}`}>
              {stats.inAppeal.percentage}%
            </div>
            <div className={styles.label}>{stats.inAppeal.label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
