/**
 * CitizensWaiting Organism
 * Pending cases section with warm tone background and scrollable topic chips
 */

import React from 'react'
import { CaseCard } from '../molecules/CaseCard'
import { ChipStrip } from '../atoms/ChipStrip'
import type { PendingCase } from '@/types/dashboard'
import styles from './CitizensWaiting.module.css'

interface CitizensWaitingProps {
  cases: PendingCase[]
  topicSummaries?: string[]
}

export const CitizensWaiting: React.FC<CitizensWaitingProps> = ({
  cases,
  topicSummaries = []
}) => {
  return (
    <section className={styles.waitingSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>Citizens Still Waiting</h2>
            <p className={styles.subtitle}>
              Critical RTI requests overdue for answers
            </p>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{cases.length}</span>
              <span className={styles.statLabel}>Critical cases</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>
                {Math.max(...cases.map((c) => c.daysOverdue), 0)}
              </span>
              <span className={styles.statLabel}>Longest overdue (days)</span>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {cases.slice(0, 6).map((pendingCase) => (
            <CaseCard key={pendingCase.id} pendingCase={pendingCase} />
          ))}
        </div>

        {topicSummaries.length > 0 && (
          <div className={styles.summarySection}>
            <h3 className={styles.summaryTitle}>Topics waiting for answers</h3>
            <ChipStrip chips={topicSummaries} />
          </div>
        )}
      </div>
    </section>
  )
}
