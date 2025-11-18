import { BaseProps } from '@/types'
import { RTIDocument } from '@/data/rtiDetailData'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { DocumentAttachment } from '../../atoms'
import styles from './AnswerView.module.css'

interface FullAnswerViewProps extends BaseProps {
  responseText: string
  attachments?: RTIDocument[]
  signedBy?: string
  signedByDesignation?: string
  signedDate?: string
}

/**
 * FullAnswerView Component
 *
 * Displays complete RTI response with answer text, attachments, and signature.
 * Used when status is 'answered' and responseType is 'full-answer'.
 *
 * @example
 * <FullAnswerView
 *   responseText="Complete response text..."
 *   attachments={[{id: 'r1', name: 'report.pdf', type: 'pdf'}]}
 *   signedBy="John Doe"
 *   signedByDesignation="Chief Engineer"
 *   signedDate="2025-01-18"
 * />
 */
export function FullAnswerView({
  responseText,
  attachments,
  signedBy,
  signedByDesignation,
  signedDate,
  className = '',
}: FullAnswerViewProps) {
  return (
    <Card variant="bordered" padding="lg" className={`${styles.section} ${className}`}>
      {/* Section Header */}
      <div className={styles.headerRow}>
        <Typography variant="headline-small" as="h2" className={styles.header}>
          THE ANSWER
        </Typography>
        <div className={styles.statusBadge}>
          <span className={`${styles.badge} ${styles.badgeSuccess}`}>✓ COMPLETE RESPONSE</span>
        </div>
      </div>

      {/* Response Text */}
      <div className={styles.content}>
        <Typography variant="body-text" className={styles.responseText}>
          {responseText.split('\n').map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </Typography>
      </div>

      {/* Attachments */}
      {attachments && attachments.length > 0 && (
        <div className={styles.attachments}>
          <Typography variant="label" className={styles.attachmentsLabel}>
            Documents Provided ({attachments.length})
          </Typography>
          <div className={styles.attachmentsList}>
            {attachments.map((document) => (
              <DocumentAttachment key={document.id} document={document} variant="list" />
            ))}
          </div>
        </div>
      )}

      {/* Signature */}
      {signedBy && (
        <div className={styles.signature}>
          <div className={styles.signatureLine} />
          <div className={styles.signatureDetails}>
            <Typography variant="body-text" className={styles.signatoryName}>
              {signedBy}
            </Typography>
            {signedByDesignation && (
              <Typography variant="label" className={styles.signatoryDesignation}>
                {signedByDesignation}
              </Typography>
            )}
            {signedDate && (
              <Typography variant="label" className={styles.signatureDate}>
                Signed on {new Date(signedDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Typography>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
