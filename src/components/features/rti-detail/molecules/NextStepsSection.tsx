'use client'

import { useState } from 'react'
import { BaseProps } from '@/types'
import styles from './NextStepsSection.module.css'

export interface NextStep {
  icon: string
  title: string
  description: string
  details: string
}

interface NextStepsSectionProps extends BaseProps {
  steps: NextStep[]
}

/**
 * NextStepsSection Component
 *
 * Displays expandable action steps for RTI follow-up.
 * Each step can be clicked to reveal detailed information.
 *
 * @example
 * <NextStepsSection steps={[...]} />
 */
export function NextStepsSection({ steps, className = '' }: NextStepsSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className={`${styles.section} ${className}`}>
      <div className={styles.header}>
        <div className={styles.icon}>⚖️</div>
        <div className={styles.title}>Next Steps</div>
      </div>

      <div className={styles.stepsList}>
        {steps.map((step, index) => {
          const isExpanded = expandedIndex === index

          return (
            <div key={index} className={styles.stepWrapper}>
              <div
                className={`${styles.stepCard} ${isExpanded ? styles.expanded : ''}`}
                onClick={() => toggleExpanded(index)}
              >
                <div className={styles.stepIcon}>{step.icon}</div>
                <div className={styles.stepContent}>
                  <div className={styles.stepName}>{step.title}</div>
                  <div className={styles.stepDescription}>{step.description}</div>
                </div>
                <div className={styles.stepArrow}>{isExpanded ? '↑' : '↓'}</div>
              </div>

              {isExpanded && (
                <div className={styles.stepDetails}>
                  <div className={styles.stepDetailsText}>{step.details}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
