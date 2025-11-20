'use client'

import { BaseProps } from '@/types'
import { FindingData } from '@/data/rtiDetailData'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import styles from './TheFindingSection.module.css'

interface TheFindingSectionProps extends BaseProps {
  title?: string
  findingData: FindingData[]
  context?: string
}

/**
 * TheFindingSection Component
 *
 * Displays data findings with horizontal bar charts and context.
 * Shows percentage-based visualizations with actual numbers.
 *
 * @example
 * <TheFindingSection
 *   title="Bed Occupancy Breakdown (Oct-Dec 2024)"
 *   findingData={[
 *     { label: 'General wards', value: 58, unit: '(4,897 / 6,200)' },
 *     { label: 'ICU/Critical', value: 72, unit: '(1,044 / 1,450)' },
 *   ]}
 *   context="The data shows..."
 * />
 */
export function TheFindingSection({
  title = 'Bed Occupancy Breakdown',
  findingData,
  context,
  className = '',
}: TheFindingSectionProps) {
  if (!findingData || findingData.length === 0) {
    return null
  }

  return (
    <Card variant="bordered" padding="lg" className={`${styles.section} ${className}`}>
      {/* Section Header */}
      <div className={styles.header}>
        <span className={styles.icon}>📊</span>
        <Typography variant="headline-medium" as="h2" className={styles.title}>
          THE FINDING
        </Typography>
      </div>

      {/* Subtitle */}
      {title && (
        <Typography variant="headline-small" as="h3" className={styles.subtitle}>
          {title}
        </Typography>
      )}

      {/* Bar Charts */}
      <div className={styles.charts}>
        {findingData.map((item, index) => (
          <div key={index} className={styles.chartRow}>
            <div className={styles.chartLabel}>{item.label}</div>
            <div className={styles.barWrapper}>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${item.value}%` }}
                  role="progressbar"
                  aria-valuenow={item.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <div className={styles.barValues}>
                <span className={styles.percentage}>{item.value}%</span>
                {item.unit && <span className={styles.unit}>{item.unit}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Context */}
      {context && (
        <div className={styles.context}>
          <div className={styles.contextHeader}>
            <span className={styles.contextIcon}>💡</span>
            <Typography variant="label" className={styles.contextLabel}>
              WHY THIS MATTERS
            </Typography>
          </div>
          <Typography variant="body-text" as="div" className={styles.contextText}>
            {context}
          </Typography>
        </div>
      )}
    </Card>
  )
}
