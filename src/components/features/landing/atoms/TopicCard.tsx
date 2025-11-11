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

  // Get color variant based on topic name
  const getColorClass = (name: string) => {
    if (name.includes('Budget') || name.includes('Finance')) return styles.colorFinance
    if (name.includes('Infrastructure')) return styles.colorInfrastructure
    if (name.includes('Education')) return styles.colorEducation
    if (name.includes('Health')) return styles.colorHealth
    if (name.includes('Employment')) return styles.colorEmployment
    if (name.includes('Environment')) return styles.colorEnvironment
    return ''
  }

  return (
    <Component
      href={interactive ? topic.link : undefined}
      className={`${styles.topicCard} ${interactive ? styles.interactive : ''} ${getColorClass(topic.name)} ${className}`}
    >
      <div className={styles.iconWrapper}>
        {IconComponent && <Icon icon={IconComponent} />}
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{topic.name}</h3>
        <p className={styles.count}>{topic.rtiCount.toLocaleString()} RTIs</p>
      </div>
    </Component>
  )
}
