import { BaseProps } from '@/types'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import styles from './AnswerView.module.css'

interface ThirdPartyViewProps extends BaseProps {
  thirdPartyName: string
  thirdPartyReason: string
  extensionDays: number
  newDeadline: string
}

/**
 * ThirdPartyView Component
 *
 * Displays status when third party notice is issued under Section 11.
 * Shows which third party was notified, reason, and extended timeline.
 *
 * @example
 * <ThirdPartyView
 *   thirdPartyName="GMR Hyderabad International Airport Ltd"
 *   thirdPartyReason="Commercial operations and revenue sharing arrangements"
 *   extensionDays={10}
 *   newDeadline="2025-03-06"
 * />
 */
export function ThirdPartyView({
  thirdPartyName,
  thirdPartyReason,
  extensionDays,
  newDeadline,
  className = '',
}: ThirdPartyViewProps) {
  const formattedDeadline = new Date(newDeadline).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Card variant="bordered" padding="lg" className={`${styles.section} ${className}`}>
      {/* Section Header */}
      <div className={styles.headerRow}>
        <Typography variant="headline-small" as="h2" className={styles.header}>
          RESPONSE STATUS
        </Typography>
        <div className={styles.statusBadge}>
          <span className={`${styles.badge} ${styles.badgeThirdParty}`}>🏢 THIRD PARTY NOTICE</span>
        </div>
      </div>

      {/* Status Content */}
      <div className={styles.statusContent}>
        <div className={styles.iconWrapper}>
          <span className={styles.statusIcon}>⚖️</span>
        </div>

        <div className={styles.statusMessage}>
          <Typography variant="headline-medium" className={styles.statusTitle}>
            Third Party Notice Issued — Timeline Extended
          </Typography>
          <Typography variant="body-text" className={styles.statusDescription}>
            Your RTI application involves information related to a third party. Under Section 11 of
            the RTI Act, the department must give the third party an opportunity to make
            representations before disclosing the information.
          </Typography>
        </div>

        {/* Third Party Info */}
        <div className={styles.thirdPartyBox}>
          <div className={styles.thirdPartyHeader}>
            <span className={styles.thirdPartyIcon}>🏢</span>
            <Typography variant="label" className={styles.thirdPartyLabel}>
              Third Party Notified
            </Typography>
          </div>
          <Typography variant="body-text" className={styles.thirdPartyName}>
            {thirdPartyName}
          </Typography>
        </div>

        {/* Reason Box */}
        <div className={styles.infoBox}>
          <Typography variant="label" className={styles.infoBoxLabel}>
            Why Third Party Notice Was Issued
          </Typography>
          <Typography variant="body-text" className={styles.infoBoxText}>
            {thirdPartyReason}
          </Typography>
        </div>

        {/* Timeline Extension */}
        <div className={styles.alertBox}>
          <div className={styles.alertIcon}>⏰</div>
          <div className={styles.alertContent}>
            <Typography variant="label" className={styles.alertLabel}>
              Timeline Extended
            </Typography>
            <Typography variant="headline-small" className={styles.alertValue}>
              +{extensionDays} days
            </Typography>
            <Typography variant="label" className={styles.alertNote}>
              New deadline: {formattedDeadline}
            </Typography>
          </div>
        </div>

        {/* Process Explanation */}
        <div className={styles.processSection}>
          <Typography variant="label" className={styles.processSectionLabel}>
            What Happens Next
          </Typography>

          <ol className={styles.processList}>
            <li className={styles.processStep}>
              <strong>Third Party Review:</strong> The notified organization has {extensionDays}{' '}
              days to submit their objections or consent to disclosure
            </li>
            <li className={styles.processStep}>
              <strong>Department Decision:</strong> After considering third party&apos;s response, the
              department will decide whether to disclose the information
            </li>
            <li className={styles.processStep}>
              <strong>Final Response:</strong> You will receive the department&apos;s final response by
              the new deadline
            </li>
          </ol>
        </div>

        {/* Info Note */}
        <div className={styles.infoNote}>
          <Typography variant="label" className={styles.noteText}>
            💡 Legal Context: Section 11 of RTI Act protects third party interests while balancing
            public interest. If information is denied, you can file an appeal arguing public
            interest overrides third party confidentiality.
          </Typography>
        </div>
      </div>
    </Card>
  )
}
