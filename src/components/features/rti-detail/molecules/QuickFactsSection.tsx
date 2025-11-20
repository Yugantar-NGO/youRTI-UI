'use client'

import { BaseProps, RTIStatus } from '@/types'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { Badge } from '@/components/ui/Badge'
import { Building2, MapPin, Calendar, CheckCircle2 } from '@/lib/icons'
import { Icon } from '@/components/ui/Icon'
import styles from './QuickFactsSection.module.css'

interface QuickFactsSectionProps extends BaseProps {
  department: string
  location: string
  state: string
  filedDate: string
  respondedDate?: string
  responseDays?: number
  status: RTIStatus
  topics?: string[]
}

/**
 * QuickFactsSection Component
 *
 * Displays quick reference facts about the RTI including:
 * - Department
 * - Location
 * - Filing date
 * - Response date
 * - Status
 * - Related topics/tags
 *
 * @example
 * <QuickFactsSection
 *   department="Health Department"
 *   location="Delhi"
 *   state="Delhi"
 *   filedDate="2025-01-20"
 *   respondedDate="2025-02-03"
 *   responseDays={14}
 *   status="answered"
 *   topics={['Healthcare', 'Data', 'Transparency']}
 * />
 */
export function QuickFactsSection({
  department,
  location,
  state,
  filedDate,
  respondedDate,
  responseDays,
  status,
  topics = [],
  className = '',
}: QuickFactsSectionProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const getStatusLabel = () => {
    switch (status) {
      case 'answered':
        return 'Complete Response'
      case 'pending':
        return 'Awaiting Response'
      case 'overdue':
        return 'Overdue'
      case 'transferred':
        return 'Transferred'
      default:
        return 'In Progress'
    }
  }

  return (
    <Card variant="bordered" padding="lg" className={`${styles.card} ${className}`}>
      {/* Department */}
      <div className={styles.factItem}>
        <div className={styles.factLabel}>
          <Icon icon={Building2} size="sm" className={styles.factIcon} />
          DEPARTMENT
        </div>
        <div className={styles.factValue}>{department}</div>
      </div>

      {/* Location */}
      <div className={styles.factItem}>
        <div className={styles.factLabel}>
          <Icon icon={MapPin} size="sm" className={styles.factIcon} />
          LOCATION
        </div>
        <div className={styles.factValue}>
          {location}, {state}
        </div>
      </div>

      {/* Filed Date */}
      <div className={styles.factItem}>
        <div className={styles.factLabel}>
          <Icon icon={Calendar} size="sm" className={styles.factIcon} />
          FILED
        </div>
        <div className={styles.factValue}>{formatDate(filedDate)}</div>
      </div>

      {/* Responded Date */}
      {respondedDate && (
        <div className={styles.factItem}>
          <div className={styles.factLabel}>
            <Icon icon={CheckCircle2} size="sm" className={styles.factIcon} />
            RESPONDED
          </div>
          <div className={styles.factValue}>
            {formatDate(respondedDate)}
            {responseDays && <span className={styles.days}> ({responseDays} days)</span>}
          </div>
        </div>
      )}

      {/* Status */}
      <div className={styles.factItem}>
        <div className={styles.factLabel}>
          <Icon icon={CheckCircle2} size="sm" className={styles.factIcon} />
          STATUS
        </div>
        <div className={styles.factValue}>{getStatusLabel()}</div>
      </div>

      {/* Topics/Tags */}
      {topics.length > 0 && (
        <div className={styles.factItem}>
          <div className={styles.factLabel}>🏷️ TOPICS</div>
          <div className={styles.topics}>
            {topics.map((topic, index) => (
              <Badge key={index} variant="default" className={styles.topicBadge}>
                #{topic.replace(/\s+/g, '_')}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
