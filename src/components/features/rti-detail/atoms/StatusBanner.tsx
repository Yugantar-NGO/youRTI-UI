import { BaseProps, RTIStatus } from '@/types'
import { Typography } from '@/components/ui/Typography'
import { AlertCircle, CheckCircle2, Clock, XCircle, Info, Users, ExternalLink } from '@/lib/icons'
import { Icon } from '@/components/ui/Icon'
import styles from './StatusBanner.module.css'

interface StatusBannerProps extends BaseProps {
  status: RTIStatus
  message: string
  daysInfo?: string
  variant?: 'full' | 'compact'
}

/**
 * StatusBanner Component
 *
 * Displays status-specific banner with icon, message, and optional days information.
 * Used in the RTI detail page to show current status and relevant information.
 *
 * Status Colors:
 * - answered: Green (success)
 * - pending: Yellow (warning)
 * - overdue: Red (danger)
 * - transferred: Blue (info)
 * - partial: Orange (warning)
 * - not-available: Red (danger)
 * - public-domain: Blue (info)
 * - third-party: Purple (info)
 *
 * @example
 * <StatusBanner
 *   status="pending"
 *   message="Response pending from Health Department, Delhi"
 *   daysInfo="18 days remaining before statutory deadline"
 * />
 */
export function StatusBanner({
  status,
  message,
  daysInfo,
  variant = 'full',
  className = '',
}: StatusBannerProps) {
  // Get status-specific icon
  const getStatusIcon = () => {
    switch (status) {
      case 'answered':
        return CheckCircle2
      case 'pending':
        return Clock
      case 'overdue':
        return XCircle
      case 'transferred':
        return ExternalLink
      case 'partial':
      case 'not-available':
        return AlertCircle
      case 'public-domain':
        return Info
      case 'third-party':
        return Users
      default:
        return Info
    }
  }

  // Get status-specific CSS class
  const getStatusClass = () => {
    switch (status) {
      case 'answered':
        return styles.success
      case 'pending':
        return styles.warning
      case 'overdue':
      case 'not-available':
        return styles.danger
      case 'transferred':
      case 'public-domain':
        return styles.info
      case 'partial':
        return styles.warning
      case 'third-party':
        return styles.purple
      default:
        return styles.info
    }
  }

  const StatusIcon = getStatusIcon()

  return (
    <div
      className={`${styles.banner} ${getStatusClass()} ${styles[variant]} ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.content}>
        <Icon icon={StatusIcon} size="lg" className={styles.icon} />
        <div className={styles.text}>
          <Typography variant="body-text" className={styles.message}>
            {message}
          </Typography>
          {daysInfo && (
            <Typography variant="body-text-small" className={styles.daysInfo}>
              {daysInfo}
            </Typography>
          )}
        </div>
      </div>
    </div>
  )
}
