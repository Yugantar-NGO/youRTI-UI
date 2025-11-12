'use client'

import { AnalyticsTile } from '../molecules/AnalyticsTile'
import { Sparkline } from '../atoms/Sparkline'
import { BarChart } from '../atoms/BarChart'
import { StackedBar } from '../atoms/StackedBar'
import { useSystemAnalytics } from '@/hooks/useSystemAnalytics'
import styles from './SystemPulse.module.css'

interface SystemPulseProps {
  className?: string
}

/**
 * SystemPulse Component
 *
 * Displays system analytics for the last 30 days including:
 * - Answer Timeliness with sparkline
 * - New High-Impact Filings with bar chart
 * - Appeals & Escalations with stacked bar
 *
 * @example
 * <SystemPulse />
 */
export function SystemPulse({ className = '' }: SystemPulseProps) {
  // Get memoized analytics data from custom hook
  const { timelinessData, highImpactData, appealsData } = useSystemAnalytics()

  return (
    <section className={`${styles.systemPulse} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>System Pulse (Last 30 Days)</h2>
        <p className={styles.subtitle}>
          Real-time analytics on RTI processing and system performance
        </p>
      </div>

      <div className={styles.grid}>
        <AnalyticsTile
          title="Answer Timeliness"
          value="18.5 days"
          subtitle="Average response time"
          trend={{ value: 12, direction: 'down' }}
        >
          <Sparkline
            data={timelinessData}
            width={250}
            height={60}
            color="var(--color-accent)"
          />
        </AnalyticsTile>

        <AnalyticsTile
          title="New High-Impact Filings"
          value="126"
          subtitle="This month"
          trend={{ value: 18, direction: 'up' }}
        >
          <BarChart
            data={highImpactData}
            height={140}
            color="var(--color-secondary-accent)"
          />
        </AnalyticsTile>

        <AnalyticsTile
          title="Appeals & Escalations"
          value="180"
          subtitle="Total this month"
        >
          <StackedBar
            data={appealsData}
            height={110}
          />
        </AnalyticsTile>
      </div>
    </section>
  )
}
