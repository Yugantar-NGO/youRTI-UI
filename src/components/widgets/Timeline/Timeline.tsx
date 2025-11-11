/**
 * Timeline Component (Generic Widget)
 *
 * Displays chronological items with icons and badges.
 * Domain-agnostic: can be used for RTIs, notifications, history, etc.
 *
 * @example
 * <Timeline items={timelineItems} />
 */

import { ReactNode } from 'react'
import styles from './Timeline.module.css'

export interface TimelineItemData {
  id: string
  title: string
  subtitle?: string
  timestamp: string
  icon?: ReactNode
  badge?: ReactNode
  content?: ReactNode
  metadata?: string
}

interface TimelineProps {
  items: TimelineItemData[]
  className?: string
}

export function Timeline({ items, className = '' }: TimelineProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No activity to display</p>
      </div>
    )
  }

  return (
    <div className={`${styles.timeline} ${className}`}>
      {items.map((item) => (
        <TimelineItem key={item.id} item={item} />
      ))}
    </div>
  )
}

function TimelineItem({ item }: { item: TimelineItemData }) {
  return (
    <div className={styles.timelineItem}>
      {item.icon && (
        <div className={styles.iconContainer}>
          {item.icon}
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <div className={styles.title}>{item.title}</div>
            {item.subtitle && <div className={styles.subtitle}>{item.subtitle}</div>}
          </div>
          {item.badge && <div className={styles.badgeContainer}>{item.badge}</div>}
        </div>
        {item.content && <div className={styles.body}>{item.content}</div>}
        <div className={styles.footer}>
          <span className={styles.timestamp}>{item.timestamp}</span>
          {item.metadata && <span className={styles.metadata}>{item.metadata}</span>}
        </div>
      </div>
    </div>
  )
}
