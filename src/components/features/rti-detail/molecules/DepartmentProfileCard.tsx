'use client'

import { BaseProps } from '@/types'
import { DepartmentStats } from '@/data/rtiDetailData'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight } from '@/lib/icons'
import { Icon } from '@/components/ui/Icon'
import Link from 'next/link'
import styles from './DepartmentProfileCard.module.css'

interface DepartmentProfileCardProps extends BaseProps {
  department: string
  stats: DepartmentStats
}

/**
 * DepartmentProfileCard Component
 *
 * Displays department performance statistics including:
 * - Response rate
 * - Average response time
 * - Total RTIs breakdown
 *
 * @example
 * <DepartmentProfileCard
 *   department="Health Department, Delhi"
 *   stats={{
 *     responseRate: 68,
 *     totalRTIs: 1247,
 *     answeredRTIs: 847,
 *     pendingRTIs: 312,
 *     overdueRTIs: 88,
 *     averageResponseDays: 23,
 *     targetResponseDays: 21,
 *   }}
 * />
 */
export function DepartmentProfileCard({
  department,
  stats,
  className = '',
}: DepartmentProfileCardProps) {
  const responseRatePercent = stats.responseRate
  const isAboveTarget = stats.averageResponseDays > stats.targetResponseDays

  return (
    <Card variant="bordered" padding="lg" className={`${styles.card} ${className}`}>
      {/* Department Name */}
      <Typography variant="headline-small" as="h3" className={styles.departmentName}>
        {department}
      </Typography>

      {/* Response Rate */}
      <div className={styles.statSection}>
        <Typography variant="label" className={styles.statLabel}>
          Response Rate
        </Typography>
        <div className={styles.responseRate}>
          <Typography variant="headline-medium" className={styles.rateValue}>
            {responseRatePercent}%
          </Typography>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${responseRatePercent}%` }}
              role="progressbar"
              aria-valuenow={responseRatePercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <Typography variant="label" className={styles.rateDescription}>
            {stats.answeredRTIs} out of {stats.totalRTIs} RTIs answered
          </Typography>
        </div>
      </div>

      {/* Average Response Time */}
      <div className={styles.statSection}>
        <Typography variant="label" className={styles.statLabel}>
          Average Response Time
        </Typography>
        <div className={styles.responseTime}>
          <Typography variant="headline-medium" className={styles.timeValue}>
            {stats.averageResponseDays} days
          </Typography>
          <div className={styles.timeComparison}>
            <span className={isAboveTarget ? styles.aboveTarget : styles.belowTarget}>
              ⏱ {isAboveTarget ? 'Slightly above' : 'Below'} {stats.targetResponseDays}-day target
            </span>
          </div>
        </div>
      </div>

      {/* Total RTIs Breakdown */}
      <div className={styles.statSection}>
        <Typography variant="label" className={styles.statLabel}>
          Total RTIs
        </Typography>
        <div className={styles.totalRTIs}>
          <Typography variant="headline-medium" className={styles.totalValue}>
            {stats.totalRTIs.toLocaleString()}
          </Typography>
          <div className={styles.rtiBreakdown}>
            <Badge variant="answered" className={styles.breakdownBadge}>
              {stats.answeredRTIs} Answered
            </Badge>
            <Badge variant="pending" className={styles.breakdownBadge}>
              {stats.pendingRTIs} Pending
            </Badge>
            <Badge variant="overdue" className={styles.breakdownBadge}>
              {stats.overdueRTIs} Overdue
            </Badge>
          </div>
        </div>
      </div>

      {/* View All Link */}
      <Link href="/browse" className={styles.viewAllLink}>
        <span>View All {department} RTIs</span>
        <Icon icon={ArrowRight} size="sm" />
      </Link>
    </Card>
  )
}
