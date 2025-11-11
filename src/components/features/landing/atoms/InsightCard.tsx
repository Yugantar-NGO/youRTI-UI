import { InsightItem } from '@/types'
import { Icon } from '@/components/ui/Icon'
import * as Icons from '@/lib/icons'
import { LucideIcon } from 'lucide-react'
import styles from './InsightCard.module.css'

interface InsightCardProps {
  insight: InsightItem
  className?: string
}

/**
 * InsightCard Component
 *
 * Displays insight/trend items with icon and text.
 * Used in the Insights & Trends section.
 *
 * @example
 * <InsightCard insight={{ icon: 'TrendingUp', text: 'RTIs increased by 24%', category: 'trend' }} />
 */
export function InsightCard({ insight, className = '' }: InsightCardProps) {
  const IconComponent = Icons[insight.icon as keyof typeof Icons] as LucideIcon

  return (
    <div className={`${styles.insightCard} ${insight.category ? styles[insight.category] : ''} ${className}`}>
      {IconComponent && (
        <div className={styles.icon}>
          <Icon icon={IconComponent} />
        </div>
      )}
      <p className={styles.text}>{insight.text}</p>
    </div>
  )
}
