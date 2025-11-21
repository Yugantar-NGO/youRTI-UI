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
import { ImportancePoint, RevealedFinding, DisclosureItem } from '../molecules/KeyInfoCards'
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

  // Prepare QA items with proper answers based on status
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
      : data.status === 'partial' && data.detailedQA
      ? data.detailedQA.map((qa) => ({
          question: qa.question,
          answer: qa.status === 'denied' ? qa.denialReason : qa.answer,
          status: qa.status,
          sourceDocument: qa.sourceDocument,
          sourcePage: qa.sourcePage,
        }))
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

  // Next steps data - use from data if available, otherwise use defaults
  const nextSteps: NextStep[] = data.nextSteps || [
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
        "If the first appeal doesn't resolve the issue, you can approach the State Information Commission (SIC). File a second appeal or complaint within 90 days of the first appeal decision. The SIC has the power to impose penalties on erring officials and can direct the disclosure of information.",
    },
    {
      icon: '📧',
      title: 'Contact Department Head',
      description: 'Send formal complaint to Secretary or Department Head',
      details:
        'Sometimes a direct complaint to the department head can expedite action. Draft a formal letter outlining the RTI history, delays, and your concerns. Send it via email and registered post to maintain a paper trail. Include references to relevant RTI sections and penalties for non-compliance.',
    },
    {
      icon: '👥',
      title: 'Rally Community Support',
      description: 'Share this RTI to build pressure for response',
      details:
        'Public pressure can be effective. Share this RTI on social media, tag relevant authorities, and connect with RTI activists or civil society organizations. Collective action often prompts faster responses and demonstrates public interest in transparency and accountability.',
    },
    {
      icon: '💰',
      title: 'Claim Daily Penalty',
      description: 'Department liable for ₹250/day penalty for delay',
      details:
        'Under Section 20 of the RTI Act, if information is not provided within the prescribed time limit without reasonable cause, the Information Commission can impose a penalty of up to ₹250 per day on the concerned PIO. You can claim compensation for the delay when filing a complaint with the Information Commission.',
    },
  ]

  // Similar RTIs - use from data if available, otherwise use defaults
  const similarRTIs: SimilarRTI[] = data.similarRTIs || [
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

  // Why this matters points - use custom data for partial status, overdue status, or defaults for other statuses
  const whyThisMatters: ImportancePoint[] =
    data.status === 'partial' && data.whyThisIsImportant
      ? data.whyThisIsImportant
      : data.status === 'answered'
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
      : data.status === 'overdue'
      ? [
          {
            icon: '👨‍👩‍👧‍👦',
            text: 'Teacher shortages directly impact quality of education for thousands of students',
          },
          {
            icon: '📊',
            text: 'Transparency in recruitment helps identify bottlenecks in hiring processes',
          },
          {
            icon: '⚖️',
            text: 'Ensures accountability for meeting educational standards and RTE compliance',
          },
          {
            icon: '📈',
            text: "Helps track government's progress on education sector commitments",
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

  // Disclosed and withheld items for partial status
  const disclosedItems: DisclosureItem[] | undefined = data.disclosedItems
  const withheldItems: DisclosureItem[] | undefined = data.withheldItems

  // Calculate questions answered for partial status
  const questionsAnswered = data.detailedQA
    ? data.detailedQA.filter((qa) => qa.status === 'answered').length
    : undefined
  const totalQuestions = data.detailedQA?.length || data.questionPoints?.length

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
                as &quot;under review&quot;
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
            completionPercentage={
              data.status === 'partial' && questionsAnswered !== undefined && totalQuestions
                ? Math.round((questionsAnswered / totalQuestions) * 100)
                : undefined
            }
            questionsAnswered={questionsAnswered}
            totalQuestions={totalQuestions}
            department={data.department}
            location={data.location}
            state={data.state}
            topics={[data.topic]}
            transferredFrom={data.status === 'transferred' ? data.department : undefined}
            transferredTo={data.transferredTo}
            transferReason={data.status === 'transferred' ? 'Subject matter jurisdiction' : undefined}
            transferDate={data.transferDate}
          />

          <DepartmentStatsCard
            department={data.transferredTo || data.department}
            stats={{
              avgResponseDays: data.departmentStats?.averageResponseDays || 28,
              onTimeRate: data.departmentStats?.responseRate || 65,
              totalRTIs: data.departmentStats?.totalRTIs || 1200,
              pendingCount: data.departmentStats?.pendingRTIs || 150,
              partialResponseRate: data.departmentStats?.partialResponseRate,
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
            expectedDate={data.status === 'transferred' ? data.newDeadline : data.deadline}
            daysElapsed={data.daysElapsed}
            daysRemaining={data.daysRemaining}
            daysOverdue={data.daysOverdue}
            currentPIO={data.pioName || "Rajesh Kumar"}
            reminderDate={data.reminderDate}
            transferDate={data.transferDate}
            questionsAnswered={questionsAnswered}
            totalQuestions={totalQuestions}
            documentsCount={data.responseAttachments?.length}
          />

          {/* Key Info Cards */}
          <KeyInfoCards
            status={data.status}
            whyThisMatters={whyThisMatters}
            whyThisMattersIntro={data.whyThisMattersIntro}
            whatWasAsked={whatWasAsked}
            whatWasRevealed={whatWasRevealed}
            pendingMessage={
              data.status === 'pending' || data.status === 'transferred'
                ? `This RTI was filed ${data.daysElapsed} days ago. The department has ${
                    data.daysRemaining || 15
                  } more days to respond under the RTI Act.`
                : undefined
            }
            disclosedItems={disclosedItems}
            withheldItems={withheldItems}
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
          <NextStepsSection steps={nextSteps} isOverdue={data.status === 'overdue'} />
        </main>
      </div>
    </div>
  )
}
