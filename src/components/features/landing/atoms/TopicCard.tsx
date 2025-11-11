import { TopicHub } from '@/types'
import { Icon } from '@/components/ui/Icon'
import * as Icons from '@/lib/icons'
import { LucideIcon } from 'lucide-react'
import styles from './TopicCard.module.css'

interface TopicCardProps {
  topic: TopicHub
  interactive?: boolean
  className?: string
}

/**
 * TopicCard Component
 *
 * Displays topic hub with icon, name, and RTI count.
 * Used in the Browse by Topic section.
 *
 * @example
 * <TopicCard topic={{ name: 'Health', icon: 'FileText', rtiCount: 456 }} interactive />
 */
export function TopicCard({ topic, interactive = true, className = '' }: TopicCardProps) {
  const IconComponent = Icons[topic.icon as keyof typeof Icons] as LucideIcon
  const Component = interactive ? 'a' : 'div'

  return (
    <Component
      href={interactive ? topic.link : undefined}
      className={`${styles.topicCard} ${interactive ? styles.interactive : ''} ${className}`}
    >
      <div className={styles.iconWrapper}>
        {IconComponent && <Icon icon={IconComponent} />}
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{topic.name}</h3>
        <p className={styles.count}>{topic.rtiCount} RTIs</p>
      </div>
    </Component>
  )
}
