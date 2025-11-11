/**
 * DashboardHero Component
 *
 * Hero section with gradient background, key statistics, and quick action buttons
 * Displays high-level RTI metrics at a glance
 */

'use client'

import { DashboardStats } from '@/types/dashboard'
import { DashboardDataRepository } from '@/services/repositories/DashboardDataRepository'
import { useEditionFilter } from '@/context/EditionContext'
import { formatNumber } from '@/lib/utils'
import styles from './DashboardHero.module.css'

export function DashboardHero() {
  const { filter } = useEditionFilter()
  const stats: DashboardStats = DashboardDataRepository.applyEditionFilter(filter).getDashboardStats()

  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>RTI Transparency Dashboard</h1>
          <p className={styles.subtitle}>India&apos;s Right to Information – at a glance</p>
          <p className={styles.tagline}>
            &ldquo;See what citizens are asking, how government responds, and what it means for you.&rdquo;
          </p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>RTIs Filed (this year)</div>
            <div className={styles.statValue}>{formatNumber(stats.totalFiledThisYear)}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Responses Within 30 Days</div>
            <div className={styles.statValue}>{formatNumber(stats.responsesWithin30Days)}</div>
            <div className={styles.statMeta}>≈{stats.responseRate}%</div>
            <div className={styles.statDetail}>Avg. response: {stats.avgResponseDays} days</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Pending</div>
            <div className={styles.statValue}>{formatNumber(stats.pending)}</div>
            <div className={styles.statDetail}>Oldest pending: {stats.oldestPendingDays} days</div>
          </div>
        </div>

        <div className={styles.quickActions}>
          <QuickActionButton icon="🏠" label="Your Area" />
          <QuickActionButton icon="🗺" label="Your State" />
          <QuickActionButton icon="🏢" label="Departments Overview" />
          <QuickActionButton icon="📂" label="Topics (Issues)" />
          <QuickActionButton icon="📚" label="How to File RTI" />
        </div>
      </div>
    </div>
  )
}

function QuickActionButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className={styles.quickActionButton}>
      <span className={styles.buttonIcon}>{icon}</span>
      <span className={styles.buttonLabel}>{label}</span>
    </button>
  )
}
