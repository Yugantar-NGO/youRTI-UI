import { BaseProps } from '@/types'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import styles from './AnswerView.module.css'

interface TransferredViewProps extends BaseProps {
  transferredFrom: string
  transferredTo: string
  transferReason?: string
  newDeadline?: string
}

/**
 * TransferredView Component
 *
 * Displays information when RTI application has been transferred to another department.
 * Shows transfer details and new timeline.
 *
 * @example
 * <TransferredView
 *   transferredFrom="Central Railway"
 *   transferredTo="Western Railway Division"
 *   transferReason="Subject matter pertains to WR jurisdiction"
 *   newDeadline="2025-02-24"
 * />
 */
export function TransferredView({
  transferredFrom,
  transferredTo,
  transferReason,
  newDeadline,
  className = '',
}: TransferredViewProps) {
  const formattedDeadline = newDeadline
    ? new Date(newDeadline).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'To be determined'

  return (
    <Card variant="bordered" padding="lg" className={`${styles.section} ${className}`}>
      {/* Section Header */}
      <div className={styles.headerRow}>
        <Typography variant="headline-small" as="h2" className={styles.header}>
          RESPONSE STATUS
        </Typography>
        <div className={styles.statusBadge}>
          <span className={`${styles.badge} ${styles.badgeTransfer}`}>🔄 TRANSFERRED</span>
        </div>
      </div>

      {/* Status Content */}
      <div className={styles.statusContent}>
        <div className={styles.iconWrapper}>
          <span className={styles.statusIcon}>🔄</span>
        </div>

        <div className={styles.statusMessage}>
          <Typography variant="headline-medium" className={styles.statusTitle}>
            Application Transferred to Correct Department
          </Typography>
          <Typography variant="body-text" className={styles.statusDescription}>
            Your RTI application has been transferred from the original department to the correct
            authority under Section 6(3) of the RTI Act. The new department will process your
            request.
          </Typography>
        </div>

        {/* Transfer Flow */}
        <div className={styles.transferFlow}>
          <div className={styles.transferStep}>
            <Typography variant="label" className={styles.transferLabel}>
              Originally Filed With
            </Typography>
            <div className={styles.transferBox}>
              <Typography variant="body-text" className={styles.transferDept}>
                {transferredFrom}
              </Typography>
            </div>
          </div>

          <div className={styles.transferArrow}>→</div>

          <div className={styles.transferStep}>
            <Typography variant="label" className={styles.transferLabel}>
              Now With
            </Typography>
            <div className={`${styles.transferBox} ${styles.transferBoxActive}`}>
              <Typography variant="body-text" className={styles.transferDept}>
                {transferredTo}
              </Typography>
            </div>
          </div>
        </div>

        {/* Transfer Reason */}
        {transferReason && (
          <div className={styles.infoBox}>
            <Typography variant="label" className={styles.infoBoxLabel}>
              Reason for Transfer
            </Typography>
            <Typography variant="body-text" className={styles.infoBoxText}>
              {transferReason}
            </Typography>
          </div>
        )}

        {/* New Deadline */}
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <Typography variant="label" className={styles.infoLabel}>
              New Response Deadline
            </Typography>
            <Typography variant="body-text" className={styles.infoValue}>
              {formattedDeadline}
            </Typography>
          </div>
        </div>

        {/* Info Note */}
        <div className={styles.infoNote}>
          <Typography variant="label" className={styles.noteText}>
            💡 Note: The 30-day response period restarts from the date of transfer. You will
            receive a response from the new department within the updated timeline.
          </Typography>
        </div>
      </div>
    </Card>
  )
}
