import { BaseProps } from '@/types'
import { Icon } from '@/components/ui/Icon'
import { Menu, Bell, User } from '@/lib/icons'
import styles from './CompactMasthead.module.css'

interface CompactMastheadProps extends BaseProps {
  title: string
  subtitle?: string
  onMenuClick?: () => void
  showActions?: boolean
}

/**
 * CompactMasthead Component
 *
 * Sticky header for dashboard layout with minimal height.
 * Replaces the full-height hero banner for better space utilization.
 *
 * @example
 * <CompactMasthead
 *   title="RTI Dashboard"
 *   subtitle="Tracking Government Accountability"
 *   onMenuClick={() => toggleSidebar()}
 * />
 */
export function CompactMasthead({
  title,
  subtitle,
  onMenuClick,
  showActions = true,
  className = '',
}: CompactMastheadProps) {
  return (
    <header className={`${styles.masthead} ${className}`}>
      <div className={styles.content}>
        {/* Left: Menu Button + Title */}
        <div className={styles.left}>
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className={styles.menuButton}
              aria-label="Toggle sidebar"
            >
              <Icon icon={Menu} size="lg" />
            </button>
          )}
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>

        {/* Right: Actions */}
        {showActions && (
          <div className={styles.actions}>
            <button
              className={styles.actionButton}
              aria-label="Notifications"
            >
              <Icon icon={Bell} size="base" />
            </button>
            <button
              className={styles.actionButton}
              aria-label="User profile"
            >
              <Icon icon={User} size="base" />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
