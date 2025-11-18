import { BaseProps } from '@/types'
import { RTIDocument } from '@/data/rtiDetailData'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { DocumentAttachment, ActionButton } from '../../atoms'
import styles from './AnswerView.module.css'

interface NotAvailableViewProps extends BaseProps {
  responseText?: string
  providedItems?: Array<{ item: string; summary: string }>
  deniedItems: Array<{ item: string; reason: string; section?: string }>
  attachments?: RTIDocument[]
  signedBy?: string
  signedByDesignation?: string
  signedDate?: string
  canFileAppeal?: boolean
}

/**
 * NotAvailableView Component
 *
 * Displays response when requested information is not available/held by the department.
 * Common reasons: archived records, not maintained, wrong department, etc.
 *
 * @example
 * <NotAvailableView
 *   deniedItems={[{
 *     item: 'Year-wise utilization (2016-2020)',
 *     reason: 'Records archived, require 60 days for retrieval',
 *     section: 'Section 7(9)'
 *   }]}
 *   canFileAppeal={true}
 * />
 */
export function NotAvailableView({
  responseText,
  providedItems,
  deniedItems,
  attachments,
  signedBy,
  signedByDesignation,
  signedDate,
  canFileAppeal = false,
  className = '',
}: NotAvailableViewProps) {
  return (
    <Card variant="bordered" padding="lg" className={`${styles.section} ${className}`}>
      {/* Section Header */}
      <div className={styles.headerRow}>
        <Typography variant="headline-small" as="h2" className={styles.header}>
          THE ANSWER
        </Typography>
        <div className={styles.statusBadge}>
          <span className={`${styles.badge} ${styles.badgeNotAvailable}`}>
            📂 INFO NOT AVAILABLE
          </span>
        </div>
      </div>

      {/* Response Text */}
      {responseText && (
        <div className={styles.content}>
          <div className={styles.responseText}>
            {responseText.split('\n').map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Provided Items (if any) */}
      {providedItems && providedItems.length > 0 && (
        <div className={styles.itemsSection}>
          <div className={styles.itemsHeader}>
            <span className={styles.itemsIcon}>✅</span>
            <Typography variant="label" className={styles.itemsLabel}>
              Information Provided ({providedItems.length})
            </Typography>
          </div>
          <div className={styles.itemsList}>
            {providedItems.map((item, index) => (
              <div key={index} className={styles.providedItem}>
                <Typography variant="body-text" className={styles.itemTitle}>
                  {item.item}
                </Typography>
                <Typography variant="label" className={styles.itemSummary}>
                  {item.summary}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Not Available Items */}
      <div className={styles.itemsSection}>
        <div className={styles.itemsHeader}>
          <span className={styles.itemsIcon}>📂</span>
          <Typography variant="label" className={styles.itemsLabel}>
            Information Not Available ({deniedItems.length})
          </Typography>
        </div>
        <div className={styles.itemsList}>
          {deniedItems.map((item, index) => (
            <div key={index} className={styles.notAvailableItem}>
              <Typography variant="body-text" className={styles.itemTitle}>
                {item.item}
              </Typography>
              <div className={styles.denialReason}>
                {item.section && (
                  <Typography variant="label" className={styles.denialSection}>
                    {item.section}
                  </Typography>
                )}
                <Typography variant="label" className={styles.denialText}>
                  {item.reason}
                </Typography>
              </div>
            </div>
          ))}
        </div>
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

      {/* Info Note */}
      <div className={styles.infoNote}>
        <Typography variant="label" className={styles.noteText}>
          💡 Note: If you believe the information should be available or the reasons given are
          unjustified, you can file a First Appeal challenging this response.
        </Typography>
      </div>

      {/* Appeal Option */}
      {canFileAppeal && (
        <div className={styles.actions}>
          <ActionButton
            label="File First Appeal"
            variant="primary"
            onClick={() => console.log('File appeal')}
          />
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
                Signed on{' '}
                {new Date(signedDate).toLocaleDateString('en-IN', {
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
