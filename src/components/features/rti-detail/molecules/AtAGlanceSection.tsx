'use client'

import { BaseProps } from '@/types'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import styles from './AtAGlanceSection.module.css'

interface AtAGlanceSectionProps extends BaseProps {
  keyFindings: string[]
}

/**
 * AtAGlanceSection Component
 *
 * Displays key findings in a highlighted card format.
 * Shows bullet points of the most important findings from the RTI response.
 *
 * @example
 * <AtAGlanceSection
 *   keyFindings={[
 *     'Average occupancy only 60%',
 *     'Peak reached 78% in November',
 *   ]}
 * />
 */
export function AtAGlanceSection({ keyFindings, className = '' }: AtAGlanceSectionProps) {
  if (!keyFindings || keyFindings.length === 0) {
    return null
  }

  return (
    <Card variant="bordered" padding="lg" className={`${styles.card} ${className}`}>
      {/* Section Header */}
      <div className={styles.header}>
        <span className={styles.icon}>🤖</span>
        <Typography variant="headline-small" as="h2" className={styles.title}>
          KEY FINDINGS
        </Typography>
      </div>

      {/* Findings List */}
      <div className={styles.findings}>
        <ul className={styles.findingsList}>
          {keyFindings.map((finding, index) => (
            <li key={index} className={styles.findingItem}>
              {finding}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
