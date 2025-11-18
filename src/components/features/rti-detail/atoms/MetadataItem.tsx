'use client'

import { ReactNode } from 'react'
import { BaseProps } from '@/types'
import { Icon } from '@/components/ui/Icon'
import { LucideIcon } from 'lucide-react'
import styles from './MetadataItem.module.css'

interface MetadataItemProps extends BaseProps {
  icon: LucideIcon | ReactNode | string
  label: string
  value: string
  layout?: 'horizontal' | 'vertical'
}

/**
 * MetadataItem Component
 *
 * Displays an icon, label, and value triplet.
 * Supports both horizontal and vertical layouts.
 *
 * @example
 * <MetadataItem
 *   icon={MapPin}
 *   label="Location"
 *   value="Mumbai, Maharashtra"
 *   layout="horizontal"
 * />
 */
export function MetadataItem({
  icon,
  label,
  value,
  layout = 'horizontal',
  className = '',
}: MetadataItemProps) {
  // Render icon based on type
  const renderIcon = () => {
    if (typeof icon === 'string') {
      // Emoji or text icon
      return <span className={styles.emojiIcon}>{icon}</span>
    } else if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null && '$$typeof' in icon)) {
      // Lucide icon component (handles both function components and forwardRef components)
      return <Icon icon={icon as LucideIcon} size="sm" className={styles.icon} />
    } else {
      // ReactNode
      return <span className={styles.iconWrapper}>{icon}</span>
    }
  }

  return (
    <div className={`${styles.metadataItem} ${styles[layout]} ${className}`}>
      <div className={styles.iconContainer}>{renderIcon()}</div>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  )
}
