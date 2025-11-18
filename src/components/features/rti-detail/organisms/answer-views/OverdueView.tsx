import { BaseProps } from '@/types'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { ActionButton } from '../../atoms'
import styles from './AnswerView.module.css'

interface OverdueViewProps extends BaseProps {
  daysOverdue: number
  canFileAppeal?: boolean
  canFileComplaint?: boolean
}

/**
 * OverdueView Component
 *
 * Displays urgent status when department has not responded within the deadline.
 * Highlights violation and provides action options for appeal/complaint.
 *
 * @example
 * <OverdueView
 *   daysOverdue={47}
 *   canFileAppeal={true}
 *   canFileComplaint={true}
 * />
 */
export function OverdueView({
  daysOverdue,
  canFileAppeal = false,
  canFileComplaint = false,
  className = '',
}: OverdueViewProps) {
  return (
    <Card variant="bordered" padding="lg" className={`${styles.section} ${className}`}>
      {/* Section Header */}
      <div className={styles.headerRow}>
        <Typography variant="headline-small" as="h2" className={styles.header}>
          RESPONSE STATUS
        </Typography>
        <div className={styles.statusBadge}>
          <span className={`${styles.badge} ${styles.badgeOverdue}`}>🚨 OVERDUE</span>
        </div>
      </div>

      {/* Status Content */}
      <div className={styles.statusContent}>
        <div className={styles.iconWrapper}>
          <span className={`${styles.statusIcon} ${styles.iconDanger}`}>⚠️</span>
        </div>

        <div className={styles.statusMessage}>
          <Typography variant="headline-medium" className={styles.statusTitle}>
            Response Overdue — RTI Act Violation
          </Typography>
          <Typography variant="body-text" className={styles.statusDescription}>
            The department has failed to respond within the mandatory 30-day deadline. This is a
            violation of the RTI Act, 2005. You can now file a First Appeal or complaint against
            the CPIO (Central Public Information Officer).
          </Typography>
        </div>

        {/* Overdue Info */}
        <div className={styles.alertBox}>
          <div className={styles.alertIcon}>⏰</div>
          <div className={styles.alertContent}>
            <Typography variant="label" className={styles.alertLabel}>
              Days Overdue
            </Typography>
            <Typography variant="headline-small" className={styles.alertValue}>
              {daysOverdue} days late
            </Typography>
            <Typography variant="label" className={styles.alertNote}>
              Department may face penalty for each day of delay
            </Typography>
          </div>
        </div>

        {/* What You Can Do */}
        <div className={styles.actionSection}>
          <Typography variant="label" className={styles.actionSectionLabel}>
            What You Can Do
          </Typography>

          <ul className={styles.actionList}>
            <li className={styles.actionListItem}>
              <strong>File First Appeal:</strong> Submit an appeal to the First Appellate Authority
              regarding non-compliance
            </li>
            <li className={styles.actionListItem}>
              <strong>File Complaint:</strong> Lodge a complaint with the State/Central Information
              Commission
            </li>
            <li className={styles.actionListItem}>
              <strong>Request Penalty:</strong> Ask for penalty to be imposed on the CPIO for delay
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {canFileAppeal && (
            <ActionButton
              label="File First Appeal"
              variant="primary"
              onClick={() => console.log('File appeal')}
            />
          )}
          {canFileComplaint && (
            <ActionButton
              label="File Complaint"
              variant="secondary"
              onClick={() => console.log('File complaint')}
            />
          )}
        </div>
      </div>
    </Card>
  )
}
