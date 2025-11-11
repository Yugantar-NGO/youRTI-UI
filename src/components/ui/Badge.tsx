import { BaseProps, BadgeVariant } from '@/types'
import styles from './Badge.module.css'

interface BadgeProps extends BaseProps {
  variant?: BadgeVariant
  text?: string
}

/**
 * Badge Component
 *
 * Displays status indicators with newspaper-style sharp borders.
 * Uses monospace font and uppercase text for authoritative look.
 *
 * @example
 * <Badge variant="disclosed">DISCLOSED</Badge>
 * <Badge variant="rejected">REJECTED</Badge>
 */
export function Badge({
  variant = 'default',
  text,
  className = '',
  children,
}: BadgeProps) {
  const content = text || children

  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {content}
    </span>
  )
}

// Convenience components for common badge types
export function StatusBadge({ status }: { status: BadgeVariant }) {
  const labels: Record<BadgeVariant, string> = {
    disclosed: 'DISCLOSED',
    rejected: 'REJECTED',
    pending: 'PENDING',
    partial: 'PARTIAL',
    default: 'STATUS',
  }

  return <Badge variant={status}>{labels[status]}</Badge>
}
