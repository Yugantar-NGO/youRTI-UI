import Link from 'next/link'
import { BigWinCard } from '../molecules/BigWinCard'
import { UrgentUnansweredCard } from '../molecules/UrgentUnansweredCard'
import { DASHBOARD_STATS, INDIA_STATS } from '@/constants/dashboard.constants'
import styles from './HeroSection.module.css'

interface HeroSectionProps {
  className?: string
}

/**
 * HeroSection Organism
 *
 * Task 2 Redesign: 3-column grid layout with Big Win of the Week,
 * Most Urgent Unanswered RTI, and page context with India statistics.
 * Dark gradient background with centered content.
 *
 * @example
 * <HeroSection />
 */
export function HeroSection({ className = '' }: HeroSectionProps) {
  return (
    <section className={`${styles.heroSection} ${className}`}>
      <div className={styles.container}>
        {/* Page Context Header */}
        <div className={styles.contextHeader}>
          <h1 className={styles.pageTitle}>RTI Transparency Dashboard</h1>
          <p className={styles.pageDescription}>
            Real-time tracking of Right to Information requests across India
          </p>
          <div className={styles.statsStrip}>
            <span className={styles.statItem}>
              <strong>{DASHBOARD_STATS.ACTIVE_RTIS.toLocaleString()}</strong> Active RTIs
            </span>
            <span className={styles.statSeparator}>•</span>
            <span className={styles.statItem}>
              <strong>{DASHBOARD_STATS.ON_TIME_RESPONSE_RATE}%</strong> On-time responses
            </span>
            <span className={styles.statSeparator}>•</span>
            <span className={styles.statItem}>
              <strong>{DASHBOARD_STATS.DEPARTMENT_COUNT}+</strong> Departments
            </span>
          </div>
        </div>

        {/* 3-Column Grid: Big Win, Urgent Case, Context */}
        <div className={styles.heroGrid}>
          {/* Column 1: Big Win of the Week */}
          <BigWinCard
            title="MG Road Pothole Repairs - Costs Revealed"
            department="Public Works Dept"
            location="Maharashtra"
            impact={[
              '₹12.4 Cr spent (3x initial estimate)',
              'No tender process followed',
              'Project delayed 15 days',
            ]}
            date="Jan 28, 2024"
            href="/rti/status-answered"
          />

          {/* Column 2: Most Urgent Unanswered RTI */}
          <UrgentUnansweredCard
            title="Hospital Bed Availability Data"
            department="Health Dept"
            location="Delhi"
            daysOverdue={15}
            filedDate="Jan 20"
            deadline="Feb 19"
            href="/rti/status-overdue"
          />

          {/* Column 3: Live Activity */}
          <div className={styles.contextCard}>
            <div className={styles.liveHeader}>
              <span className={styles.liveIndicator}>🔴</span>
              <h3 className={styles.contextTitle}>Live Activity</h3>
            </div>

            <div className={styles.liveMetrics}>
              <div className={styles.liveMetric}>
                <div className={styles.metricRow}>
                  <div className={styles.metricValue}>126</div>
                  <div className={styles.metricTrend}>↑18% this month</div>
                </div>
                <div className={styles.metricLabel}>RTIs filed</div>
              </div>

              <div className={styles.liveMetric}>
                <div className={styles.metricRow}>
                  <div className={styles.metricValue}>18.5 days</div>
                  <div className={styles.metricTrend}>↓12%</div>
                </div>
                <div className={styles.metricLabel}>avg response</div>
              </div>

              <div className={styles.liveMetric}>
                <div className={styles.metricRow}>
                  <div className={styles.metricValue}>234</div>
                  <div className={styles.metricTrend}>↓6%</div>
                </div>
                <div className={styles.metricLabel}>cases overdue</div>
              </div>
            </div>

            <div className={styles.recentActivity}>
              <div className={styles.activityHeader}>RECENT ACTIVITY:</div>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>• 2m ago: MCD overdue (47d)</div>
                <div className={styles.activityItem}>• 8m ago: New RTI filed (BLR)</div>
                <div className={styles.activityItem}>• 15m ago: Response received (TN)</div>
              </div>
            </div>

            <div className={styles.contextFooter}>
              <Link href="/analytics" className={styles.viewDashboardLink}>
                View Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
