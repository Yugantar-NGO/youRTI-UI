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
  AtAGlanceSection,
  QuickFactsSection,
  TheFindingSection,
  DepartmentProfileCard,
  DocumentsSection,
} from '../molecules'
import { AnswerSection } from './AnswerSection'
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
          daysElapsed={data.daysElapsed}
          daysRemaining={data.daysRemaining}
          daysOverdue={data.daysOverdue}
          transferredTo={data.transferredTo}
        />
      </header>

      {/* Impact Summary - Full Width */}
      <section className={styles.impact}>
        <ImpactSummaryCard
          status={data.status}
          impactOneLiner={data.impactOneLiner}
          statusMessage={data.statusMessage}
          statusDaysInfo={data.statusDaysInfo}
          metrics={data.impactMetrics}
          badges={data.impactBadges}
          viewCount={data.viewCount}
        />
      </section>

      {/* At a Glance + Quick Facts - Two Column on Desktop */}
      <div className={styles.glanceFactsWrapper}>
        {/* At a Glance - Left Column */}
        {data.keyFindings && data.keyFindings.length > 0 && (
          <div className={styles.glanceColumn}>
            <AtAGlanceSection keyFindings={data.keyFindings} />
          </div>
        )}

        {/* Quick Facts - Right Column */}
        <div className={styles.factsColumn}>
          <QuickFactsSection
            department={data.department}
            location={data.location}
            state={data.state}
            filedDate={data.filedDate}
            respondedDate={data.respondedDate}
            responseDays={data.responseDays}
            status={data.status}
            topics={['Healthcare', 'Data', 'Surprising_Stats', 'Transparency']}
          />
        </div>
      </div>

      {/* The Finding Section - Full Width */}
      {data.findingData && data.findingData.length > 0 && (
        <section className={styles.findingSection}>
          <TheFindingSection
            title="Bed Occupancy Breakdown (Oct-Dec 2024)"
            findingData={data.findingData}
            context={data.findingContext}
          />
        </section>
      )}

      {/* Question + Department Profile - Two Column on Desktop */}
      <div className={styles.questionDeptWrapper}>
        {/* Question Section - Left Column */}
        <div className={styles.questionColumn}>
          <QuestionSection
            questionText={data.questionText}
            questionPoints={data.questionPoints}
            attachments={data.questionAttachments}
          />
        </div>

        {/* Department Profile - Right Column */}
        {data.departmentStats && (
          <div className={styles.deptColumn}>
            <DepartmentProfileCard department={data.department} stats={data.departmentStats} />
          </div>
        )}
      </div>

      {/* Answer Section - Full Width */}
      <section className={styles.answerSection}>
        <AnswerSection data={data} />
      </section>

      {/* Documents + What We Found - Two Column on Desktop */}
      <div className={styles.docsFoundWrapper}>
        {/* Documents Section - Left Column */}
        {data.responseAttachments && data.responseAttachments.length > 0 && (
          <div className={styles.docsColumn}>
            <DocumentsSection documents={data.responseAttachments} />
          </div>
        )}

        {/* What We Found Section - Right Column */}
        {hasExtractedEntities && (
          <div className={styles.foundColumn}>
            <WhatWeFoundSection extractedEntities={data.extractedEntities} />
          </div>
        )}
      </div>

      {/* Timeline Section - Full Width */}
      <section className={styles.timelineSection}>
        <TimelineSection
          events={data.timeline}
          status={data.status}
          daysElapsed={data.daysElapsed}
          daysTotal={data.deadline ? 30 : undefined}
          daysRemaining={data.daysRemaining}
          daysOverdue={data.daysOverdue}
        />
      </section>

      {/* Related RTIs - Full Width */}
      <section className={styles.related}>
        <RelatedRTIsSection department={data.department} topic={data.topic} state={data.state} />
      </section>
    </div>
  )
}
