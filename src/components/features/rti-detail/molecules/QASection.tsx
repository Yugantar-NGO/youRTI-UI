'use client'

import { BaseProps, RTIStatus } from '@/types'
import styles from './QASection.module.css'

export interface QAItem {
  question: string
  answer?: string
  status?: 'answered' | 'pending' | 'denied' | 'partial'
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
        label: '✓ Answered',
        bg: '#D1FAE5',
        color: '#065F46',
      },
      pending: {
        label: '⏳ Pending',
        bg: '#FEF3C7',
        color: '#92400E',
      },
      denied: {
        label: '✗ Denied',
        bg: '#FEE2E2',
        color: '#991B1B',
      },
      partial: {
        label: '◐ Partial',
        bg: '#FFEDD5',
        color: '#9A3412',
      },
    }

    const config = statusConfig[itemStatus as keyof typeof statusConfig] || statusConfig.answered

    return (
      <div className={styles.statusBadge} style={{ background: config.bg, color: config.color }}>
        {config.label}
      </div>
    )
  }

  return (
    <div className={`${styles.section} ${className}`}>
      <div className={styles.header}>
        <div className={styles.icon}>❓</div>
        <div className={styles.title}>Questions & Answers</div>
      </div>

      <div className={styles.qaList}>
        {qaItems.map((item, index) => {
          const itemStatus = item.status || (item.answer ? 'answered' : 'pending')

          return (
            <div key={index} className={styles.qaItem}>
              <div className={styles.questionHeader}>
                <div className={styles.questionLeft}>
                  <div className={styles.number}>{index + 1}</div>
                  <div className={styles.questionText}>{item.question}</div>
                </div>
                {getStatusBadge(itemStatus)}
              </div>

              <div className={styles.answerText}>
                {item.answer || (
                  <span className={styles.pendingMessage}>
                    {rtiStatus === 'pending'
                      ? `Awaiting response from department. Response expected by deadline.`
                      : rtiStatus === 'transferred'
                      ? 'Awaiting response from new department after transfer.'
                      : 'No answer provided.'}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
