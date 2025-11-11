'use client'

import { useState } from 'react'
import { RTIAnswer, UnansweredRTI } from '@/types'
import { AnswerListItem } from '../atoms/AnswerListItem'
import { UnansweredListItem } from '../atoms/UnansweredListItem'
import styles from './RTIActivityHighlights.module.css'

interface RTIActivityHighlightsProps {
  freshAnswers: RTIAnswer[]
  unansweredQuestions: UnansweredRTI[]
  className?: string
}

type TabType = 'fresh' | 'waiting'

/**
 * RTIActivityHighlights Organism
 *
 * Per TODO Spec Section 4: Tabbed interface for Fresh Answers and Waiting for Answers.
 * Full-width section with tab bar to switch between answered and pending RTIs.
 *
 * @example
 * <RTIActivityHighlights freshAnswers={[...]} unansweredQuestions={[...]} />
 */
export function RTIActivityHighlights({
  freshAnswers,
  unansweredQuestions,
  className = '',
}: RTIActivityHighlightsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('fresh')

  return (
    <section className={`${styles.activitySection} ${className}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>RTI Activity Highlights</h2>
        </div>

        {/* Tab Bar */}
        <div className={styles.tabBar} role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'fresh'}
            aria-controls="fresh-answers-panel"
            className={`${styles.tab} ${activeTab === 'fresh' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('fresh')}
          >
            Fresh Answers
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'waiting'}
            aria-controls="waiting-answers-panel"
            className={`${styles.tab} ${activeTab === 'waiting' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('waiting')}
          >
            Waiting for Answers
          </button>
        </div>

        {/* Tab Panels */}
        <div className={styles.tabContent}>
          {activeTab === 'fresh' && (
            <div
              role="tabpanel"
              id="fresh-answers-panel"
              aria-labelledby="fresh-answers-tab"
              className={styles.panel}
            >
              <div className={styles.grid}>
                {freshAnswers.slice(0, 4).map((answer) => (
                  <AnswerListItem key={answer.id} answer={answer} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'waiting' && (
            <div
              role="tabpanel"
              id="waiting-answers-panel"
              aria-labelledby="waiting-answers-tab"
              className={styles.panel}
            >
              <div className={styles.grid}>
                {unansweredQuestions.slice(0, 4).map((question) => (
                  <UnansweredListItem key={question.id} unanswered={question} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
