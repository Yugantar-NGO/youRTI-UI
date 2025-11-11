import { NavigationItem } from '@/types'
import { Icon } from '@/components/ui/Icon'
import * as Icons from '@/lib/icons'
import { LucideIcon } from 'lucide-react'
import styles from './NavigationCard.module.css'

interface NavigationCardProps {
  item: NavigationItem
  className?: string
}

/**
 * NavigationCard Component
 *
 * Displays navigation item with icon and label for hero section.
 * Clickable card that links to different sections or pages.
 *
 * @example
 * <NavigationCard item={{ icon: 'Home', label: "Today's Edition", link: '#daily' }} />
 */
export function NavigationCard({ item, className = '' }: NavigationCardProps) {
  const IconComponent = Icons[item.icon as keyof typeof Icons] as LucideIcon

  return (
    <a href={item.link} className={`${styles.navigationCard} ${className}`}>
      <div className={styles.icon}>
        {IconComponent && <Icon icon={IconComponent} />}
      </div>
      <span className={styles.label}>{item.label}</span>
      {item.description && (
        <span className={styles.description}>{item.description}</span>
      )}
    </a>
  )
}
