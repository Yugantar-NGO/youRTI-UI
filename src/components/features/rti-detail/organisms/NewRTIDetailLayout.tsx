'use client'

import { BaseProps, RTIStatus } from '@/types'
import { RTIDetailData } from '@/data/rtiDetailData'
import React from 'react'
import {
  TopNavigation,
  SidebarOverviewCard,
  DepartmentStatsCard,
  StatusBanner,
  ImprovedTimeline,
  KeyInfoCards,
  QASection,
  DocumentsSection,
  NextStepsSection,
  SimilarRTIsSection,
} from '../molecules'
import { Breadcrumb, DataHighlight } from '../atoms'
import { QAItem } from '../molecules/QASection'
import { NextStep } from '../molecules/NextStepsSection'
import { ImportancePoint, RevealedFinding } from '../molecules/KeyInfoCards'
import { SimilarRTI } from '../molecules/SimilarRTIsSection'
import styles from './NewRTIDetailLayout.module.css'

interface NewRTIDetailLayoutProps extends BaseProps {
  data: RTIDetailData
}

// Define supported statuses
const SUPPORTED_STATUSES: RTIStatus[] = ['answered', 'overdue', 'partial', 'pending', 'transferred']

/**
 * NewRTIDetailLayout Component
 *
 * Completely redesigned RTI detail layout matching the new HTML designs.
 * Features:
 * - Sticky top navigation
 * - Breadcrumbs
 * - Two-column layout: Sticky sidebar (left) + Main content (right)
 * - Status-specific banners and components
 * - Improved timeline, Q&A, documents, and next steps sections
 *
 * @example
 * <NewRTIDetailLayout data={rtiDetailData} />
 */
export function NewRTIDetailLayout({ data, className = '' }: NewRTIDetailLayoutProps) {
  // Only render for supported statuses
  if (!SUPPORTED_STATUSES.includes(data.status)) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
        <h2>Status &quot;{data.status}&quot; is not yet supported in the new design.</h2>
        <p>Supported statuses: answered, overdue, partial, pending, transferred</p>
      </div>
    )
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Browse RTIs', href: '/browse' },
    { label: data.title, href: `/rti/${data.id}`, current: true },
  ]

  // Prepare QA items with proper answers for answered status
  const qaItems: QAItem[] =
    data.status === 'answered'
      ? [
          {
            question: 'What was the total project cost for MG Road pothole repairs?',
            answer:
              'The total expenditure amounted to ₹12,42,50,000 (Twelve Crore Forty Two Lakh Fifty Thousand Rupees). This includes material costs of ₹8.5 Cr and labor costs of ₹3.92 Cr. The project covered approximately 2.3 km stretch of MG Road with an average depth of repair at 150mm.',
            status: 'answered',
            sourceDocument: 'Response Letter',
            sourcePage: 2,
          },
          {
            question: 'Who was the contractor and what was the tender process?',
            answer:
              'The project was awarded to ABC Construction Pvt Ltd (Reg No: MH/2019/12345). Work was commissioned under emergency provisions as per Section 17(3) of Municipal Act, allowing direct appointment without public tender due to "urgent nature of repairs before monsoon season."',
            status: 'answered',
            sourceDocument: 'Contractor Details',
            sourcePage: 5,
          },
          {
            question: 'List of major land conversion applicants (companies/individuals) with plot sizes',
            answer: '',
            status: 'denied',
          },
        ]
      : data.questionPoints
      ? data.questionPoints.map((q, index) => ({
          question: q,
          answer: data.responseText || undefined,
          status:
            data.status === 'pending' || data.status === 'transferred'
              ? 'pending'
              : data.status === 'partial'
              ? index % 2 === 0
                ? 'answered'
                : 'denied'
              : 'answered',
        }))
      : [
          {
            question: data.questionText,
            answer: data.responseText,
            status: data.status === 'pending' || data.status === 'transferred' ? 'pending' : 'answered',
          },
        ]

  // Next steps data
  const nextSteps: NextStep[] = [
    {
      icon: '📝',
      title: 'File First Appeal',
      description: 'Appeal to Appellate Authority within 30 days of deadline',
      details:
        "If you're unsatisfied with the response or didn't receive one within the statutory time limit, you can file a first appeal with the Appellate Authority. The appeal must be filed within 30 days of receiving the response or 30 days after the deadline has passed. Include all relevant documents and clearly state your grounds for appeal.",
    },
    {
      icon: '⚖️',
      title: 'Escalate to Information Commission',
      description: 'Complaint to State Information Commission for non-compliance',
      details:
        "If your first appeal is rejected or you don't receive a satisfactory response, you can escalate to the State Information Commission. File a second appeal within 90 days of the first appeal decision. The Commission has the power to impose penalties and enforce compliance.",
    },
    {
      icon: '✉️',
      title: 'Contact Department Head',
      description: 'Send formal complaint to Secretary or Department Head',
      details:
        'Write a formal letter to the Department Head or Secretary explaining the delay and requesting immediate action. Include your RTI reference number, filing date, and a copy of the original application. This often expedites the response process.',
    },
    {
      icon: '👥',
      title: 'Rally Community Support',
      description: 'Share this RTI to build pressure for response',
      details:
        'Public attention can be a powerful tool. Share your RTI on social media and community forums to create awareness about the delay. When more citizens track and support your RTI, departments are more likely to respond promptly.',
    },
  ]

  // Sample similar RTIs
  const similarRTIs: SimilarRTI[] = [
    {
      id: 'rti-similar-1',
      title: 'Ring Road repair budget allocation and tender process documentation',
      status: 'answered',
      department: 'PWD Maharashtra',
      location: 'Mumbai',
      daysElapsed: 18,
      highlight: '₹8.7 Cr disclosed',
    },
    {
      id: 'rti-similar-2',
      title: 'Contractor quality inspection reports for water supply projects',
      status: 'answered',
      department: 'PWD Maharashtra',
      location: 'Pune',
      daysElapsed: 22,
      highlight: '12 projects reviewed',
    },
  ]

  // Why this matters points - updated for answered status
  const whyThisMatters: ImportancePoint[] =
    data.status === 'answered'
      ? [
          {
            icon: '💸',
            text: 'Ensures taxpayer money is spent efficiently on infrastructure projects',
          },
          {
            icon: '📋',
            text: 'Verifies that proper tender processes were followed for contractor selection',
          },
          {
            icon: '🔎',
            text: 'Helps identify potential irregularities in public procurement',
          },
          {
            icon: '⚖️',
            text: 'Establishes accountability for cost overruns and project delays',
          },
        ]
      : [
          {
            icon: '🔍',
            text: 'Ensures infrastructure spending is properly documented and justified',
          },
          {
            icon: '📊',
            text: 'Helps residents understand ongoing maintenance work affecting their area',
          },
          {
            icon: '💰',
            text: 'Enables tracking of project completion timelines and budget adherence',
          },
          {
            icon: '⚖️',
            text: 'Creates accountability for quality standards in critical public infrastructure',
          },
        ]

  // What was asked points
  const whatWasAsked: ImportancePoint[] = data.questionPoints
    ? data.questionPoints.map((q, index) => ({
        icon: `${index + 1}️⃣`,
        text: q,
      }))
    : [
        {
          icon: '1️⃣',
          text: data.questionText,
        },
      ]

  // What was revealed findings - only for answered status
  const whatWasRevealed: RevealedFinding[] =
    data.status === 'answered'
      ? [
          {
            icon: '💰',
            text: (
              <>
                Project cost was <DataHighlight type="amount">₹12.4 Crore</DataHighlight>,{' '}
                <DataHighlight type="multiplier">3x</DataHighlight> the initial estimate of{' '}
                <DataHighlight type="amount">₹4.1 Crore</DataHighlight>
              </>
            ),
          },
          {
            icon: '🏢',
            text: (
              <>
                Contractor <DataHighlight type="entity">ABC Construction Ltd</DataHighlight> appointed
                directly without public tender under emergency provisions
              </>
            ),
          },
          {
            icon: '⏱️',
            text: (
              <>
                Project completed <DataHighlight type="duration">15 days</DataHighlight> past deadline
                despite emergency classification
              </>
            ),
          },
          {
            icon: '❌',
            text: (
              <>
                <DataHighlight type="negative">Quality inspection reports withheld</DataHighlight>, marked
                as "under review"
              </>
            ),
          },
        ]
      : []

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {/* Top Navigation */}
      <TopNavigation />

      {/* Breadcrumbs */}
      <div className={styles.breadcrumbsWrapper}>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Main Container - Two Column Layout */}
      <div className={styles.container}>
        {/* Sidebar - Left Column (Sticky) */}
        <aside className={styles.sidebar}>
          <SidebarOverviewCard
            status={data.status}
            referenceId={data.id}
            title={data.title}
            filedDate={data.filedDate}
            respondedDate={data.respondedDate}
            expectedDate={data.deadline}
            daysElapsed={data.daysElapsed}
            daysRemaining={data.daysRemaining}
            daysOverdue={data.daysOverdue}
            completionPercentage={data.status === 'partial' ? 60 : undefined}
            department={data.department}
            location={data.location}
            state={data.state}
            topics={[data.topic]}
            transferredFrom={data.status === 'transferred' ? data.department : undefined}
            transferredTo={data.transferredTo}
            transferReason={data.status === 'transferred' ? 'Subject matter jurisdiction' : undefined}
          />

          <DepartmentStatsCard
            department={data.transferredTo || data.department}
            stats={{
              avgResponseDays: data.departmentStats?.averageResponseDays || 28,
              onTimeRate: data.departmentStats?.responseRate || 65,
              totalRTIs: data.departmentStats?.totalRTIs || 1200,
              pendingCount: data.departmentStats?.pendingRTIs || 150,
            }}
            status={data.status}
          />
        </aside>

        {/* Main Content - Right Column */}
        <main className={styles.content}>
          {/* Status-specific banner */}
          <StatusBanner
            status={data.status}
            message={data.statusMessage || ''}
            details={data.statusDaysInfo}
            transferredFrom={data.status === 'transferred' ? data.department : undefined}
            transferredTo={data.transferredTo}
          />

          {/* Timeline */}
          <ImprovedTimeline
            status={data.status}
            filedDate={data.filedDate}
            respondedDate={data.respondedDate}
            expectedDate={data.deadline}
            daysElapsed={data.daysElapsed}
            daysRemaining={data.daysRemaining}
            daysOverdue={data.daysOverdue}
            currentPIO="Suresh Gowda"
            transferDate={data.status === 'transferred' ? data.respondedDate : undefined}
          />

          {/* Key Info Cards */}
          <KeyInfoCards
            status={data.status}
            whyThisMatters={whyThisMatters}
            whatWasAsked={whatWasAsked}
            whatWasRevealed={whatWasRevealed}
            pendingMessage={
              data.status === 'pending' || data.status === 'transferred'
                ? `This RTI was filed ${data.daysElapsed} days ago. The department has ${
                    data.daysRemaining || 15
                  } more days to respond under the RTI Act.`
                : undefined
            }
          />

          {/* Q&A Section */}
          <QASection qaItems={qaItems} rtiStatus={data.status} />

          {/* Documents Section */}
          {data.responseAttachments && data.responseAttachments.length > 0 && (
            <DocumentsSection documents={data.responseAttachments} />
          )}

          {/* Similar RTIs */}
          <SimilarRTIsSection rtis={similarRTIs} totalCount={847} />

          {/* Next Steps */}
          <NextStepsSection steps={nextSteps} />
        </main>
      </div>
    </div>
  )
}
