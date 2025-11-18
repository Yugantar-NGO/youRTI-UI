import { BaseProps } from '@/types'
import { RTIDocument } from '@/data/rtiDetailData'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { DocumentAttachment, ActionButton } from '../../atoms'
import styles from './AnswerView.module.css'

interface PartialAnswerViewProps extends BaseProps {
  responseText?: string
  providedItems: Array<{ item: string; summary: string }>
  deniedItems: Array<{ item: string; reason: string; section?: string }>
  attachments?: RTIDocument[]
  signedBy?: string
  signedByDesignation?: string
  signedDate?: string
  canFileAppeal?: boolean
}

/**
 * PartialAnswerView Component
 *
 * Displays partial RTI response where some information was provided and some denied.
 * Shows what was provided, what was denied with reasons, and appeal option.
 *
 * @example
 * <PartialAnswerView
 *   providedItems={[{item: 'Budget', summary: '₹450 Cr allocated'}]}
 *   deniedItems={[{item: 'EIA Report', reason: 'Commercial confidence', section: '8(1)(d)'}]}
 *   canFileAppeal={true}
 * />
 */
export function PartialAnswerView({
  responseText,
  providedItems,
  deniedItems,
  attachments,
  signedBy,
  signedByDesignation,
  signedDate,
  canFileAppeal = false,
  className = '',
}: PartialAnswerViewProps) {
  return (
    <Card variant="bordered" padding="lg" className={`${styles.section} ${className}`}>
      {/* Section Header */}
      <div className={styles.headerRow}>
        <Typography variant="headline-small" as="h2" className={styles.header}>
          THE ANSWER
        </Typography>
        <div className={styles.statusBadge}>
          <span className={`${styles.badge} ${styles.badgePartial}`}>⚠️ PARTIAL RESPONSE</span>
        </div>
      </div>

      {/* Response Text */}
      {responseText && (
        <div className={styles.content}>
          <Typography variant="body-text" className={styles.responseText}>
            {responseText}
          </Typography>
        </div>
      )}

      {/* Provided Items */}
      {providedItems.length > 0 && (
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

      {/* Denied Items */}
      {deniedItems.length > 0 && (
        <div className={styles.itemsSection}>
          <div className={styles.itemsHeader}>
            <span className={styles.itemsIcon}>❌</span>
            <Typography variant="label" className={styles.itemsLabel}>
              Information Denied ({deniedItems.length})
            </Typography>
          </div>
          <div className={styles.itemsList}>
            {deniedItems.map((item, index) => (
              <div key={index} className={styles.deniedItem}>
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
      )}

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

      {/* Appeal Option */}
      {canFileAppeal && (
        <div className={styles.appealSection}>
          <div className={styles.appealBox}>
            <Typography variant="label" className={styles.appealText}>
              ⚖️ Not satisfied with denied information? You can file a First Appeal challenging
              the exemptions claimed by the department.
            </Typography>
          </div>
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
