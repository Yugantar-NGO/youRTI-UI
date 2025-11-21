'use client'

import { BaseProps, RTIStatus } from '@/types'
import { InfoIcon } from '../atoms'
import styles from './KeyInfoCards.module.css'

export interface ImportancePoint {
  icon: string
  text: string
}

export interface RevealedFinding {
  icon: string
  text: string | React.ReactNode
}

export interface DisclosureItem {
  text: string
}

interface KeyInfoCardsProps extends BaseProps {
  status: RTIStatus
  whyThisMatters?: ImportancePoint[]
  whyThisMattersIntro?: string
  whatWasAsked: ImportancePoint[]
  whatWasRevealed?: RevealedFinding[]
  pendingMessage?: string
  disclosedItems?: DisclosureItem[]
  withheldItems?: DisclosureItem[]
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
  disclosedItems,
  withheldItems,
  className = '',
}: KeyInfoCardsProps) {
  // For answered status, show "Why This Is Important" and "What Was Revealed"
  // For partial status, show "Why This Is Important" and "What Was Disclosed & Withheld"
  // For other statuses, show "Why This Matters" and "What Was Asked"
  const showRevealedSection = status === 'answered' && whatWasRevealed && whatWasRevealed.length > 0
  const showDisclosureSection = status === 'partial' && disclosedItems && withheldItems

  return (
    <div className={`${styles.grid} ${className}`}>
      {/* Left Card - Why This Is Important/Matters */}
      {whyThisMatters && whyThisMatters.length > 0 && (
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.icon}>💡</div>
            <div className={styles.title}>
              {status === 'answered' || status === 'partial' ? 'Why This Is Important' : 'Why This Matters'}
            </div>
            <InfoIcon tooltip="Understand the broader significance of this RTI request—why it matters for transparency, accountability, and public interest." />
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

      {/* Right Card - What Was Revealed (answered), What Was Disclosed & Withheld (partial), or What Was Asked (other) */}
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.icon}>
            {showRevealedSection ? '🔍' : showDisclosureSection ? '📊' : '❓'}
          </div>
          <div className={styles.title}>
            {showRevealedSection
              ? 'What Was Revealed'
              : showDisclosureSection
              ? 'What Was Disclosed & Withheld'
              : 'What Was Asked'}
          </div>
          <InfoIcon
            tooltip={
              showRevealedSection
                ? 'Key findings and data disclosed through this RTI response—the facts and figures that came to light.'
                : showDisclosureSection
                ? 'Summary of information provided and information withheld by the department in this partial response.'
                : 'The specific questions submitted in this RTI application that the department is required to answer.'
            }
          />
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

        {/* Show disclosed/withheld sections for partial status */}
        {showDisclosureSection && (
          <div className={styles.disclosureGrid}>
            {/* Information Disclosed Block */}
            <div className={`${styles.disclosureBlock} ${styles.disclosedBlock}`}>
              <div className={styles.disclosureBlockTitle}>
                <span>✅</span>
                <span>Information Disclosed</span>
              </div>
              <div className={styles.disclosureItems}>
                {disclosedItems.map((item, index) => (
                  <div key={index} className={styles.disclosureItem}>
                    <span>•</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Information Withheld Block */}
            <div className={`${styles.disclosureBlock} ${styles.withheldBlock}`}>
              <div className={styles.disclosureBlockTitle}>
                <span>❌</span>
                <span>Information Withheld</span>
              </div>
              <div className={styles.disclosureItems}>
                {withheldItems.map((item, index) => (
                  <div key={index} className={styles.disclosureItem}>
                    <span>•</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Show questions for non-answered and non-partial status */}
        {!showRevealedSection && !showDisclosureSection && (
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
