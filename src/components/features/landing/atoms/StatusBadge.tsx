import styles from './StatusBadge.module.css'

export type StatusType = 'filed' | 'answered' | 'pending' | 'time_running_out'

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

/**
 * StatusBadge Component
 *
 * Displays status indicator with color coding for RTI questions.
 * Used in question cards to show current status.
 *
 * @example
 * <StatusBadge status="filed" />
 * <StatusBadge status="time_running_out" />
 */
export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusLabel = (status: StatusType): string => {
    switch (status) {
      case 'filed':
        return 'Filed'
      case 'answered':
        return 'Answered'
      case 'pending':
        return 'Pending'
      case 'time_running_out':
        return 'Time running out'
      default:
        return status
    }
  }

  return (
    <span
      className={`${styles.statusBadge} ${styles[status]} ${className}`}
      data-status={status}
    >
      {getStatusLabel(status)}
    </span>
  )
}
