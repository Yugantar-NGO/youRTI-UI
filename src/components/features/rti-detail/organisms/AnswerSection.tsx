import { BaseProps } from '@/types'
import { RTIDetailData } from '@/data/rtiDetailData'
import {
  FullAnswerView,
  PendingView,
  OverdueView,
  TransferredView,
  PartialAnswerView,
  NotAvailableView,
  PublicDomainView,
  ThirdPartyView,
} from './answer-views'

interface AnswerSectionProps extends BaseProps {
  data: RTIDetailData
}

/**
 * AnswerSection Component
 *
 * Main routing component that renders the appropriate answer view based on responseType.
 * Handles all 8 possible RTI response states.
 *
 * Response Types:
 * - full-answer: Complete response with all information
 * - pending: Application acknowledged, awaiting response
 * - overdue: Response deadline passed, violation
 * - transferred: Transferred to another department
 * - partial: Some info provided, some denied
 * - not-available: Information not available/held
 * - public-domain: Referred to public websites
 * - third-party: Third party notice issued
 *
 * @example
 * <AnswerSection data={rtiDetailData} />
 */
export function AnswerSection({ data, className = '' }: AnswerSectionProps) {
  // Calculate days remaining for pending status
  const calculateDaysRemaining = (): number | undefined => {
    if (!data.deadline) return undefined
    const now = new Date()
    const deadlineDate = new Date(data.deadline)
    const diffTime = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  // Render appropriate view based on responseType
  switch (data.responseType) {
    case 'full-answer':
      return (
        <FullAnswerView
          responseText={data.responseText || ''}
          attachments={data.responseAttachments}
          signedBy={data.signedBy}
          signedByDesignation={data.signedByDesignation}
          signedDate={data.signedDate}
          className={className}
        />
      )

    case 'pending':
      return (
        <PendingView
          deadline={data.deadline}
          daysRemaining={calculateDaysRemaining()}
          canSendReminder={data.canSendReminder}
          className={className}
        />
      )

    case 'overdue':
      return (
        <OverdueView
          daysOverdue={data.daysOverdue || 0}
          canFileAppeal={data.canFileAppeal}
          canFileComplaint={data.canFileComplaint}
          className={className}
        />
      )

    case 'transferred':
      return (
        <TransferredView
          transferredFrom={data.transferredFrom || ''}
          transferredTo={data.transferredTo || ''}
          transferReason={data.transferReason}
          newDeadline={data.newDeadline}
          className={className}
        />
      )

    case 'partial':
      return (
        <PartialAnswerView
          responseText={data.responseText}
          providedItems={data.providedItems || []}
          deniedItems={data.deniedItems || []}
          attachments={data.responseAttachments}
          signedBy={data.signedBy}
          signedByDesignation={data.signedByDesignation}
          signedDate={data.signedDate}
          canFileAppeal={data.canFileAppeal}
          className={className}
        />
      )

    case 'not-available':
      return (
        <NotAvailableView
          responseText={data.responseText}
          providedItems={data.providedItems}
          deniedItems={data.deniedItems || []}
          attachments={data.responseAttachments}
          signedBy={data.signedBy}
          signedByDesignation={data.signedByDesignation}
          signedDate={data.signedDate}
          canFileAppeal={data.canFileAppeal}
          className={className}
        />
      )

    case 'public-domain':
      return (
        <PublicDomainView
          responseText={data.responseText || ''}
          publicDomainLinks={data.publicDomainLinks || []}
          signedBy={data.signedBy}
          signedByDesignation={data.signedByDesignation}
          signedDate={data.signedDate}
          canFileAppeal={data.canFileAppeal}
          className={className}
        />
      )

    case 'third-party':
      return (
        <ThirdPartyView
          thirdPartyName={data.thirdPartyName || ''}
          thirdPartyReason={data.thirdPartyReason || ''}
          extensionDays={data.extensionDays || 10}
          newDeadline={data.newDeadline || ''}
          className={className}
        />
      )

    default:
      // Fallback to pending view if responseType is unknown
      return (
        <PendingView
          deadline={data.deadline}
          daysRemaining={calculateDaysRemaining()}
          canSendReminder={data.canSendReminder}
          className={className}
        />
      )
  }
}
