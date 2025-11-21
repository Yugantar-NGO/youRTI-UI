'use client'

import { BaseProps, RTIStatus } from '@/types'
import { InfoIcon } from '../atoms'
import styles from './QASection.module.css'

export interface QAItem {
  question: string
  answer?: string
  status?: 'answered' | 'pending' | 'denied' | 'partial'
  sourceDocument?: string
  sourcePage?: number
}

interface QASectionProps extends BaseProps {
  qaItems: QAItem[]
  rtiStatus: RTIStatus
}

/**
 * QASection Component
 *
 * Displays questions and answers in a clean numbered format.
 * Shows different states: answered, pending, denied, partial.
 *
 * @example
 * <QASection qaItems={[...]} rtiStatus="answered" />
 */
export function QASection({ qaItems, rtiStatus, className = '' }: QASectionProps) {
  const getStatusBadge = (itemStatus: string = 'answered') => {
    const statusConfig = {
      answered: {
        label: '✓ ANSWERED',
        className: styles.statusAnswered,
      },
      pending: {
        label: '⏳ PENDING',
        className: styles.statusPending,
      },
      denied: {
        label: '✗ DENIED',
        className: styles.statusDenied,
      },
      partial: {
        label: '◐ PARTIAL',
        className: styles.statusPartial,
      },
    }

    const config = statusConfig[itemStatus as keyof typeof statusConfig] || statusConfig.answered

    return <div className={`${styles.statusBadge} ${config.className}`}>{config.label}</div>
  }

  return (
    <div className={`${styles.section} ${className}`}>
      <div className={styles.header}>
        <div className={styles.icon}>📋</div>
        <div className={styles.title}>Question-by-Question Breakdown</div>
        <InfoIcon tooltip="Detailed breakdown of each question asked in the RTI and the corresponding response from the department, including status and source documents." />
      </div>

      <div className={styles.qaList}>
        {qaItems.map((item, index) => {
          const itemStatus = item.status || (item.answer ? 'answered' : 'pending')
          const showAnswerContent = itemStatus === 'answered' || itemStatus === 'denied'

          return (
            <div key={index} className={`${styles.qaItem} ${styles[`qaItem${itemStatus}`]}`}>
              <div className={styles.questionHeader}>
                <div className={styles.questionLeft}>
                  <div className={styles.number}>{index + 1}</div>
                  <div className={styles.questionText}>{item.question}</div>
                </div>
                {getStatusBadge(itemStatus)}
              </div>

              {showAnswerContent && (
                <div className={styles.answerContent}>
                  <div className={itemStatus === 'denied' ? styles.deniedReason : styles.answerText}>
                    {item.answer ||
                      (itemStatus === 'denied'
                        ? 'Information denied under Section 8(1)(d) - commercial confidence and trade secrets. Disclosure would harm competitive position of third parties.'
                        : 'No answer provided.')}
                  </div>
                  {item.sourceDocument && itemStatus === 'answered' && (
                    <a href="#" className={styles.sourceLink}>
                      <span>📄</span>
                      <span>{item.sourceDocument}{item.sourcePage && `, Page ${item.sourcePage}`}</span>
                    </a>
                  )}
                </div>
              )}

              {!showAnswerContent && (
                <div className={styles.pendingContent}>
                  {rtiStatus === 'pending'
                    ? `Awaiting response from department. Response expected by deadline.`
                    : rtiStatus === 'transferred'
                    ? 'Awaiting response from new department after transfer.'
                    : 'Response pending...'}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
