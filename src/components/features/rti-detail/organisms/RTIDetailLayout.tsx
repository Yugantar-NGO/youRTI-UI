'use client'

import { BaseProps } from '@/types'
import { RTIDetailData } from '@/data/rtiDetailData'
import {
  RTIDetailHeader,
  ImpactSummaryCard,
  QuestionSection,
  WhatWeFoundSection,
  TimelineSection,
  RelatedRTIsSection,
} from '../molecules'
import { AnswerSection } from './AnswerSection'
import { SectionDivider } from '../atoms'
import styles from './RTIDetailLayout.module.css'

interface RTIDetailLayoutProps extends BaseProps {
  data: RTIDetailData
}

/**
 * RTIDetailLayout Component
 *
 * Main layout organism for RTI detail page.
 * - Desktop: Two-column layout with timeline sidebar (scrolls with content) and main content
 * - Mobile: Single-column layout with all sections stacked vertically
 *
 * Layout structure:
 * - Header (full width)
 * - Impact Summary (full width)
 * - Desktop: Timeline (left) | Main Content (right)
 * - Mobile: Main Content → Timeline (stacked)
 * - Related RTIs (full width)
 *
 * @example
 * <RTIDetailLayout data={rtiDetailData} />
 */
export function RTIDetailLayout({ data, className = '' }: RTIDetailLayoutProps) {
  // Check if we have extracted entities to show
  const hasExtractedEntities =
    data.extractedEntities &&
    Object.values(data.extractedEntities).some((items) => items && items.length > 0)

  return (
    <div className={`${styles.layout} ${className}`}>
      {/* Header Section - Full Width */}
      <header className={styles.header}>
        <RTIDetailHeader
          title={data.title}
          status={data.status}
          department={data.department}
          location={data.location}
          state={data.state}
          filedDate={data.filedDate}
          respondedDate={data.respondedDate}
        />
      </header>

      {/* Impact Summary - Full Width */}
      <section className={styles.impact}>
        <ImpactSummaryCard
          impactOneLiner={data.impactOneLiner}
          metrics={data.impactMetrics}
          badges={data.impactBadges}
          viewCount={data.viewCount}
        />
      </section>

      <SectionDivider />

      {/* Main Content Area - Two Column on Desktop, Single Column on Mobile */}
      <div className={styles.contentWrapper}>
        {/* Timeline Sidebar - Desktop Left, Mobile Below Main Content */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <TimelineSection events={data.timeline} />
          </div>
        </aside>

        {/* Main Content - Desktop Right, Mobile Top */}
        <main className={styles.mainContent}>
          {/* Question Section */}
          <QuestionSection
            questionText={data.questionText}
            questionPoints={data.questionPoints}
            attachments={data.questionAttachments}
          />

          <SectionDivider />

          {/* Answer Section - Dynamic based on responseType */}
          <AnswerSection data={data} />

          {/* What We Found Section - Only if entities exist */}
          {hasExtractedEntities && (
            <>
              <SectionDivider />
              <WhatWeFoundSection extractedEntities={data.extractedEntities} />
            </>
          )}
        </main>
      </div>

      <SectionDivider />

      {/* Related RTIs - Full Width */}
      <section className={styles.related}>
        <RelatedRTIsSection department={data.department} topic={data.topic} state={data.state} />
      </section>
    </div>
  )
}
