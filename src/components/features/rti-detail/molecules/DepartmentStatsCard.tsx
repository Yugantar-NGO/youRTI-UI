'use client'

import { BaseProps, RTIStatus } from '@/types'
import styles from './DepartmentStatsCard.module.css'

interface DepartmentStats {
  avgResponseDays: number
  onTimeRate: number
  totalRTIs: number
  pendingCount: number
}

interface DepartmentStatsCardProps extends BaseProps {
  department: string
  stats: DepartmentStats
  status: RTIStatus
}

/**
 * DepartmentStatsCard Component
 *
 * Displays department performance statistics with gradient background.
 * Color changes based on RTI status.
 *
 * @example
 * <DepartmentStatsCard department="Health Dept" stats={...} status="answered" />
 */
export function DepartmentStatsCard({
  department,
  stats,
  status,
  className = '',
}: DepartmentStatsCardProps) {
  const gradientConfig: Record<string, string> = {
    answered: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    overdue: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    partial: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    pending: 'linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)',
    transferred: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  }

  const gradient = gradientConfig[status] || gradientConfig.answered

  return (
    <div
      className={`${styles.card} ${className}`}
      style={{ background: gradient }}
    >
      <div className={styles.header}>
        <div className={styles.icon}>🏛️</div>
        <div className={styles.name}>{department}</div>
        <div className={styles.subtitle}>Department Performance</div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{stats.avgResponseDays}d</div>
          <div className={styles.statLabel}>Avg Response</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{stats.onTimeRate}%</div>
          <div className={styles.statLabel}>On-Time Rate</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{stats.totalRTIs.toLocaleString()}</div>
          <div className={styles.statLabel}>Total RTIs</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{stats.pendingCount}</div>
          <div className={styles.statLabel}>Pending Now</div>
        </div>
      </div>

      <div className={styles.performanceBar}>
        <div className={styles.performanceFill} style={{ width: `${stats.onTimeRate}%` }} />
      </div>
      <div className={styles.performanceLabel}>{stats.onTimeRate}% answered on time</div>

      <a href="#" className={styles.link}>
        <span>View Department Profile</span>
        <span>→</span>
      </a>
    </div>
  )
}
