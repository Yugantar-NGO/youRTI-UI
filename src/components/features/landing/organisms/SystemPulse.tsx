'use client'

import styles from './SystemPulse.module.css'

interface SystemPulseProps {
  className?: string
}

interface DepartmentPerformance {
  name: string
  responseRate: number
  avgDays: number
  overdue?: number
}

/**
 * SystemPulse Component - The Accountability Gap
 *
 * Displays department accountability comparison showing:
 * - Leading departments with high response rates
 * - Departments needing urgent attention
 * - RTI Journey visualization
 *
 * @example
 * <SystemPulse />
 */
export function SystemPulse({ className = '' }: SystemPulseProps) {
  const leadingDepts: DepartmentPerformance[] = [
    { name: 'IT Dept Karnataka', responseRate: 92, avgDays: 8 },
    { name: 'Education Tamil Nadu', responseRate: 87, avgDays: 11 },
    { name: 'PWD Kerala', responseRate: 84, avgDays: 14 },
    { name: 'Health Gujarat', responseRate: 81, avgDays: 16 },
    { name: 'Revenue Gujarat', responseRate: 78, avgDays: 18 },
  ]

  const needsAttention: DepartmentPerformance[] = [
    { name: 'MCD Delhi', responseRate: 34, avgDays: 47, overdue: 89 },
    { name: 'Railways Western Zone', responseRate: 41, avgDays: 39, overdue: 67 },
    { name: 'PWD Maharashtra', responseRate: 45, avgDays: 35, overdue: 54 },
    { name: 'Police Delhi', responseRate: 48, avgDays: 32, overdue: 43 },
  ]

  return (
    <section className={`${styles.systemPulse} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>The Accountability Gap</h2>
        <p className={styles.subtitle}>
          Which departments respond? Which don&apos;t? Compare.
        </p>
      </div>

      {/* Department Comparison */}
      <div className={styles.comparisonGrid}>
        {/* Leading Departments */}
        <div className={styles.performancePanel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelIcon}>✅</span>
            <h3 className={styles.panelTitle}>LEADING THE WAY</h3>
          </div>
          <div className={styles.departmentList}>
            {leadingDepts.map((dept, index) => (
              <div key={index} className={styles.departmentItem}>
                <div className={styles.deptName}>
                  {index + 1}. {dept.name}
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${dept.responseRate}%` }}
                  />
                  <span className={styles.progressLabel}>{dept.responseRate}%</span>
                </div>
                <div className={styles.deptMeta}>Avg: {dept.avgDays} days</div>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Attention */}
        <div className={`${styles.performancePanel} ${styles.needsAttention}`}>
          <div className={styles.panelHeader}>
            <span className={styles.panelIcon}>⚠️</span>
            <h3 className={styles.panelTitle}>NEEDS URGENT ATTENTION</h3>
          </div>
          <div className={styles.departmentList}>
            {needsAttention.map((dept, index) => (
              <div key={index} className={styles.departmentItem}>
                <div className={styles.deptName}>
                  {index + 1}. {dept.name}
                </div>
                <div className={`${styles.progressBar} ${styles.poor}`}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${dept.responseRate}%` }}
                  />
                  <span className={styles.progressLabel}>{dept.responseRate}%</span>
                </div>
                <div className={styles.deptMeta}>
                  Avg: {dept.avgDays} days
                  {dept.overdue && (
                    <>
                      <br />
                      {dept.overdue} overdue cases
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RTI Journey */}
      <div className={styles.journeyPanel}>
        <div className={styles.journeyHeader}>
          <span className={styles.journeyIcon}>🗺️</span>
          <h3 className={styles.journeyTitle}>THE RTI JOURNEY: FROM FILING TO ANSWER</h3>
        </div>
        <div className={styles.journeyContent}>
          <div className={styles.journeyTotal}>10,000 RTIs Filed This Month</div>

          <div className={styles.journeyStages}>
            <div className={styles.journeyStage}>
              <div className={styles.stageLine}>
                <span className={styles.stageRange}>0-15 days</span>
                <div className={styles.stageBar}>
                  <div className={styles.stageBarFill} style={{ width: '45%' }} />
                </div>
                <span className={styles.stageCount}>4,500 ✓ Excellent</span>
              </div>
              <div className={styles.stageStates}>[KA] [TN] [KL] [GJ]</div>
            </div>

            <div className={styles.journeyStage}>
              <div className={styles.stageLine}>
                <span className={styles.stageRange}>16-30 days</span>
                <div className={styles.stageBar}>
                  <div className={styles.stageBarFill} style={{ width: '28%' }} />
                </div>
                <span className={styles.stageCount}>2,800 ✓ On-time</span>
              </div>
              <div className={styles.stageStates}>[MH] [DL] [UP]</div>
            </div>

            <div className={styles.journeyStage}>
              <div className={styles.stageLine}>
                <span className={styles.stageRange}>31-60 days</span>
                <div className={`${styles.stageBar} ${styles.late}`}>
                  <div className={styles.stageBarFill} style={{ width: '15%' }} />
                </div>
                <span className={styles.stageCount}>1,500 ⚠️ Late</span>
              </div>
              <div className={styles.stageStates}>[MH] [DL] [BR]</div>
            </div>

            <div className={styles.journeyStage}>
              <div className={styles.stageLine}>
                <span className={styles.stageRange}>60+ days</span>
                <div className={`${styles.stageBar} ${styles.lost}`}>
                  <div className={styles.stageBarFill} style={{ width: '12%' }} />
                </div>
                <span className={styles.stageCount}>1,200 🚨 Lost</span>
              </div>
              <div className={styles.stageStates}>[DL] [MH] [UP]</div>
            </div>
          </div>

          <div className={styles.journeyFooter}>
            <p className={styles.journeyNote}>Top performers in green • Laggards in red</p>
          </div>
        </div>
      </div>
    </section>
  )
}
