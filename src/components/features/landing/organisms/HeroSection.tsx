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
            title="School Meal Budget Data Released"
            department="Education Dept"
            location="Bihar"
            impact={[
              '₹450 Cr budget data revealed',
              '45 districts affected',
              'Led to policy review',
            ]}
            date="3 days ago"
          />

          {/* Column 2: Most Urgent Unanswered RTI */}
          <UrgentUnansweredCard
            title="COVID Fund Utilization Details"
            department="Health Ministry"
            location="Maharashtra"
            daysOverdue={47}
            filedDate="Aug 15"
            deadline="Sep 15"
          />

          {/* Column 3: India Health Stats Context */}
          <div className={styles.contextCard}>
            <h3 className={styles.contextTitle}>India at a Glance</h3>
            <div className={styles.contextStats}>
              <div className={styles.contextStat}>
                <div className={styles.contextValue}>{INDIA_STATS.STATES}</div>
                <div className={styles.contextLabel}>States</div>
              </div>
              <div className={styles.contextStat}>
                <div className={styles.contextValue}>{INDIA_STATS.UNION_TERRITORIES} UT</div>
                <div className={styles.contextLabel}>Union Territories</div>
              </div>
              <div className={styles.contextStat}>
                <div className={styles.contextValue}>{INDIA_STATS.POPULATION}</div>
                <div className={styles.contextLabel}>Population</div>
              </div>
            </div>
            <div className={styles.contextFooter}>
              <p className={styles.contextNote}>
                Tracking transparency across all administrative levels
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
