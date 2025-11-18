import { ReactNode } from 'react'
import { BaseProps } from '@/types'
import { Icon } from '@/components/ui/Icon'
import { LucideIcon } from 'lucide-react'
import styles from './ActionButton.module.css'

interface ActionButtonProps extends BaseProps {
  icon?: LucideIcon
  label: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  fullWidth?: boolean
}

/**
 * ActionButton Component
 *
 * Call-to-action button for RTI detail page actions like Download, Share, Report.
 * Supports multiple visual variants and optional icons.
 *
 * @example
 * <ActionButton
 *   icon={Download}
 *   label="Download"
 *   onClick={handleDownload}
 *   variant="primary"
 * />
 */
export function ActionButton({
  icon,
  label,
  onClick,
  variant = 'secondary',
  disabled = false,
  fullWidth = false,
  className = '',
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      aria-label={label}
    >
      {icon && <Icon icon={icon} size="sm" className={styles.icon} />}
      <span className={styles.label}>{label}</span>
    </button>
  )
}
