import { BaseProps } from '@/types'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { ActionButton } from '../../atoms'
import styles from './AnswerView.module.css'

interface PendingViewProps extends BaseProps {
  deadline?: string
  daysRemaining?: number
  canSendReminder?: boolean
}

/**
 * PendingView Component
 *
 * Displays status for RTI application awaiting response.
 * Shows deadline, remaining days, and action options.
 *
 * @example
 * <PendingView
 *   deadline="2025-02-21"
 *   daysRemaining={12}
 *   canSendReminder={true}
 * />
 */
export function PendingView({
  deadline,
  daysRemaining,
  canSendReminder = false,
  className = '',
}: PendingViewProps) {
  const formattedDeadline = deadline
    ? new Date(deadline).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Not available'

  return (
    <Card variant="bordered" padding="lg" className={`${styles.section} ${className}`}>
      {/* Section Header */}
      <div className={styles.headerRow}>
        <Typography variant="headline-small" as="h2" className={styles.header}>
          RESPONSE STATUS
        </Typography>
        <div className={styles.statusBadge}>
          <span className={`${styles.badge} ${styles.badgePending}`}>⏳ PENDING</span>
        </div>
      </div>

      {/* Status Content */}
      <div className={styles.statusContent}>
        <div className={styles.iconWrapper}>
          <span className={styles.statusIcon}>⏰</span>
        </div>

        <div className={styles.statusMessage}>
          <Typography variant="headline-medium" className={styles.statusTitle}>
            Waiting for Response
          </Typography>
          <Typography variant="body-text" className={styles.statusDescription}>
            Your RTI application has been acknowledged and is being processed by the department.
            You should receive a response by the deadline.
          </Typography>
        </div>

        {/* Deadline Info */}
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <Typography variant="label" className={styles.infoLabel}>
              Response Deadline
            </Typography>
            <Typography variant="body-text" className={styles.infoValue}>
              {formattedDeadline}
            </Typography>
          </div>

          {daysRemaining !== undefined && (
            <div className={styles.infoItem}>
              <Typography variant="label" className={styles.infoLabel}>
                Days Remaining
              </Typography>
              <Typography variant="body-text" className={styles.infoValue}>
                {daysRemaining} days
              </Typography>
            </div>
          )}
        </div>

        {/* Actions */}
        {canSendReminder && (
          <div className={styles.actions}>
            <ActionButton
              label="Send Reminder"
              variant="secondary"
              onClick={() => console.log('Send reminder')}
            />
          </div>
        )}

        {/* Info Note */}
        <div className={styles.infoNote}>
          <Typography variant="label" className={styles.noteText}>
            💡 Tip: Departments must respond within 30 days. If no response is received by the
            deadline, you can file a First Appeal.
          </Typography>
        </div>
      </div>
    </Card>
  )
}
