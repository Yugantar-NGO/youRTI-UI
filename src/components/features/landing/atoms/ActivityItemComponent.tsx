import { ActivityItem } from '@/types'
import { Icon } from '@/components/ui/Icon'
import { CheckCircle2, Clock, FileText, XCircle, AlertTriangle } from '@/lib/icons'
import styles from './ActivityItemComponent.module.css'

interface ActivityItemComponentProps {
  activity: ActivityItem
  showIcon?: boolean
  className?: string
}

/**
 * ActivityItemComponent
 *
 * Displays activity timeline item with status icon.
 * Shows title, department, date, and optional status icon.
 *
 * @example
 * <ActivityItemComponent activity={{ type: 'answered', title: '...', department: 'Health' }} showIcon />
 */
export function ActivityItemComponent({
  activity,
  showIcon = true,
  className = ''
}: ActivityItemComponentProps) {
  const iconMap = {
    answered: CheckCircle2,
    pending: Clock,
    filed: FileText,
    denied: XCircle,
    appealed: AlertTriangle,
    responded: CheckCircle2,
  }

  const IconComponent = iconMap[activity.type]

  const statusLabels = {
    answered: 'Answered',
    pending: 'In Progress',
    filed: 'Filed',
    denied: 'Denied',
    appealed: 'In Appeal',
    responded: 'Responded',
  }

  return (
    <div className={`${styles.activityItem} ${styles[activity.type]} ${className}`}>
      {showIcon && IconComponent && (
        <div className={styles.iconWrapper}>
          <Icon icon={IconComponent} size="sm" />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.status}>{statusLabels[activity.type]}</span>
          <span className={styles.department}>[{activity.department}]</span>
        </div>
        <h4 className={styles.title}>{activity.title}</h4>
        <div className={styles.footer}>
          <span className={styles.date}>
            {new Date(activity.date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
