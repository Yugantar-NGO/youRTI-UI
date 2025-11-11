import { BaseProps, BadgeVariant } from '@/types'
import { Icon } from './Icon'
import { CheckCircle2, XCircle, Clock, AlertCircle, FileText, MessageSquare, AlertTriangle } from '@/lib/icons'
import styles from './Badge.module.css'

interface BadgeProps extends BaseProps {
  variant?: BadgeVariant
  text?: string
  showIcon?: boolean
}

/**
 * Badge Component
 *
 * Displays status indicators using semantic tokens (theme-agnostic).
 * Supports optional icons for visual clarity.
 *
 * @example
 * <Badge variant="disclosed" showIcon>DISCLOSED</Badge>
 * <Badge variant="rejected">REJECTED</Badge>
 */
export function Badge({
  variant = 'default',
  text,
  showIcon = false,
  className = '',
  children,
}: BadgeProps) {
  const content = text || children

  // Icon mapping for each variant
  const iconMap: Record<BadgeVariant, typeof CheckCircle2 | null> = {
    disclosed: CheckCircle2,
    rejected: XCircle,
    pending: Clock,
    partial: AlertCircle,
    filed: FileText,
    answered: MessageSquare,
    appealed: AlertTriangle,
    default: null,
  }

  const IconComponent = showIcon && variant !== 'default' ? iconMap[variant] : null

  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {IconComponent && <Icon icon={IconComponent} size="xs" />}
      {content}
    </span>
  )
}

// Convenience components for common badge types
export function StatusBadge({
  status,
  showIcon = false
}: {
  status: BadgeVariant
  showIcon?: boolean
}) {
  const labels: Record<BadgeVariant, string> = {
    disclosed: 'DISCLOSED',
    rejected: 'REJECTED',
    pending: 'PENDING',
    partial: 'PARTIAL',
    filed: 'FILED',
    answered: 'ANSWERED',
    appealed: 'IN APPEAL',
    default: 'STATUS',
  }

  return <Badge variant={status} showIcon={showIcon}>{labels[status]}</Badge>
}
