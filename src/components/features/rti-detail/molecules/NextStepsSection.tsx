'use client'

import { useState } from 'react'
import { BaseProps } from '@/types'
import { InfoIcon } from '../atoms'
import styles from './NextStepsSection.module.css'

export interface NextStep {
  icon: string
  title: string
  description: string
  details: string
}

interface NextStepsSectionProps extends BaseProps {
  steps: NextStep[]
  isOverdue?: boolean
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
export function NextStepsSection({ steps, isOverdue = false, className = '' }: NextStepsSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleStep = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className={`${styles.section} ${isOverdue ? styles.sectionOverdue : ''} ${className}`}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>⚖️</div>
        <div className={styles.title}>Next Steps</div>
        <InfoIcon tooltip="Recommended actions you can take based on this RTI response—including how to appeal, follow up, or use the information obtained." />
      </div>

      <div className={styles.stepsList}>
        {steps.map((step, index) => {
          const isOpen = expandedIndex === index

          return (
            <div key={index} className={`${styles.stepItem} ${isOverdue ? styles.stepItemOverdue : ''} ${isOpen ? styles.open : ''}`}>
              <div className={styles.stepHeader} onClick={() => toggleStep(index)}>
                <div className={`${styles.stepIconBox} ${isOverdue ? styles.stepIconBoxOverdue : ''}`}>{step.icon}</div>
                <div className={styles.stepContent}>
                  <div className={styles.stepTitle}>{step.title}</div>
                  <div className={styles.stepSubtitle}>{step.description}</div>
                </div>
                <div className={`${styles.stepArrow} ${isOverdue ? styles.stepArrowOverdue : ''}`}>→</div>
              </div>

              <div className={styles.stepDetails}>
                <div className={styles.stepDetailsInner}>
                  <div className={styles.stepDescription}>{step.details}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
