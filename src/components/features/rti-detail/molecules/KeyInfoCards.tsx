'use client'

import { BaseProps, RTIStatus } from '@/types'
import styles from './KeyInfoCards.module.css'

export interface ImportancePoint {
  icon: string
  text: string
}

interface KeyInfoCardsProps extends BaseProps {
  status: RTIStatus
  whyThisMatters?: ImportancePoint[]
  whatWasAsked: ImportancePoint[]
  pendingMessage?: string
}

/**
 * KeyInfoCards Component
 *
 * Two-column cards showing "Why This Matters" and "What Was Asked".
 * Layout changes based on status (pending shows message, others show answers).
 *
 * @example
 * <KeyInfoCards status="answered" whyThisMatters={[...]} whatWasAsked={[...]} />
 */
export function KeyInfoCards({
  status,
  whyThisMatters,
  whatWasAsked,
  pendingMessage,
  className = '',
}: KeyInfoCardsProps) {
  return (
    <div className={`${styles.grid} ${className}`}>
      {/* Why This Matters */}
      {whyThisMatters && whyThisMatters.length > 0 && (
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.icon}>💡</div>
            <div className={styles.title}>Why This Matters</div>
          </div>

          <div className={styles.list}>
            {whyThisMatters.map((point, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.itemIcon}>{point.icon}</div>
                <div className={styles.itemText}>{point.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What Was Asked */}
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.icon}>❓</div>
          <div className={styles.title}>What Was Asked</div>
        </div>

        {/* Pending message for pending/transferred status */}
        {(status === 'pending' || status === 'transferred') && pendingMessage && (
          <div className={styles.pendingMessage}>
            <div className={styles.pendingTitle}>
              <span>⏳</span>
              <span>Response Pending</span>
            </div>
            <div className={styles.pendingText}>{pendingMessage}</div>
          </div>
        )}

        {/* Questions list */}
        <div className={styles.list}>
          {whatWasAsked.map((point, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemIcon}>{point.icon}</div>
              <div className={styles.itemText}>{point.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
