'use client'

import { BaseProps, RTIStatus } from '@/types'
import styles from './KeyInfoCards.module.css'

export interface ImportancePoint {
  icon: string
  text: string
}

export interface RevealedFinding {
  icon: string
  text: string | React.ReactNode
}

interface KeyInfoCardsProps extends BaseProps {
  status: RTIStatus
  whyThisMatters?: ImportancePoint[]
  whyThisMattersIntro?: string
  whatWasAsked: ImportancePoint[]
  whatWasRevealed?: RevealedFinding[]
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
  whyThisMattersIntro,
  whatWasAsked,
  whatWasRevealed,
  pendingMessage,
  className = '',
}: KeyInfoCardsProps) {
  // For answered status, show "Why This Is Important" and "What Was Revealed"
  // For other statuses, show "Why This Matters" and "What Was Asked"
  const showRevealedSection = status === 'answered' && whatWasRevealed && whatWasRevealed.length > 0

  return (
    <div className={`${styles.grid} ${className}`}>
      {/* Left Card - Why This Is Important/Matters */}
      {whyThisMatters && whyThisMatters.length > 0 && (
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.icon}>💡</div>
            <div className={styles.title}>
              {status === 'answered' ? 'Why This Is Important' : 'Why This Matters'}
            </div>
          </div>

          {status === 'answered' && whyThisMattersIntro && (
            <div className={styles.intro}>
              {whyThisMattersIntro}
            </div>
          )}

          <div className={styles.list}>
            {whyThisMatters.map((point, index) => (
              <div key={index} className={`${styles.item} ${styles.importanceItem}`}>
                <div className={styles.itemIcon}>{point.icon}</div>
                <div className={styles.itemText}>{point.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Right Card - What Was Revealed (answered) or What Was Asked (other) */}
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.icon}>{showRevealedSection ? '🔍' : '❓'}</div>
          <div className={styles.title}>{showRevealedSection ? 'What Was Revealed' : 'What Was Asked'}</div>
        </div>

        {/* Show revealed findings for answered status */}
        {showRevealedSection && (
          <div className={`${styles.list} ${styles.findingsList}`}>
            {whatWasRevealed.map((finding, index) => (
              <div key={index} className={`${styles.item} ${styles.findingItem}`}>
                <div className={styles.itemIcon}>{finding.icon}</div>
                <div className={styles.findingText}>{finding.text}</div>
              </div>
            ))}
          </div>
        )}

        {/* Show questions for non-answered status */}
        {!showRevealedSection && (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
