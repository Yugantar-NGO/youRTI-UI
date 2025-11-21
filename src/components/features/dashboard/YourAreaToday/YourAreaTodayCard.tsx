/**
 * YourAreaTodayCard Component
 *
 * Displays local area statistics and top issues
 */

'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { DashboardDataRepository } from '@/services/repositories/DashboardDataRepository'
import { useEditionFilter } from '@/context/EditionContext'
import { formatNumber } from '@/lib/utils'
import styles from './YourAreaToday.module.css'

export function YourAreaTodayCard() {
  const { filter } = useEditionFilter()
  const stats = DashboardDataRepository.applyEditionFilter(filter).getLocalAreaStats()

  return (
    <Card variant="default" padding="md">
      <CardHeader>
        <CardTitle>📍 Your Area Today</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.location}>
          <strong>{stats.state}</strong>
          {stats.district && ` • ${stats.district}`}
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>RTIs filed this month:</div>
            <div className={styles.statValue}>{formatNumber(stats.filedThisMonth)}</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statLabel}>Responses received:</div>
            <div className={styles.statValue}>{formatNumber(stats.responsesReceived)}</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statLabel}>Pending beyond 30 days:</div>
            <div className={styles.statValue}>{formatNumber(stats.pendingBeyond30Days)}</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statLabel}>Avg. response time:</div>
            <div className={styles.statValue}>{stats.avgResponseDays} days</div>
          </div>
        </div>

        {stats.topIssues.length > 0 && (
          <div className={styles.topIssues}>
            <div className={styles.issuesTitle}>Top issues people are asking about:</div>
            <ul className={styles.issuesList}>
              {stats.topIssues.map((issue, index) => (
                <li key={index} className={styles.issueItem}>
                  <span>{issue.name}</span>
                  <span className={styles.issueCount}>({issue.count} RTIs)</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.viewAll}>
          <a href="/browse" className={styles.viewAllLink}>View all RTIs from your district →</a>
        </div>
      </CardContent>
    </Card>
  )
}
