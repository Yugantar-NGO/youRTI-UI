import { BaseProps, RTIStatus } from '@/types'
import { StatusBadge } from '@/components/ui/Badge'
import { Typography } from '@/components/ui/Typography'
import { MetadataItem, ActionButton } from '../atoms'
import { MapPin, Building2, Calendar, Download, Share2, Flag } from '@/lib/icons'
import styles from './RTIDetailHeader.module.css'

interface RTIDetailHeaderProps extends BaseProps {
  title: string
  status: RTIStatus
  department: string
  location: string
  state: string
  filedDate: string
  respondedDate?: string
  onDownload?: () => void
  onShare?: () => void
  onReport?: () => void
}

/**
 * RTIDetailHeader Component
 *
 * Header section of RTI detail page showing status, title, metadata, and action buttons.
 * Responsive layout that stacks on mobile.
 *
 * @example
 * <RTIDetailHeader
 *   title="MG Road Contract Details"
 *   status="answered"
 *   department="PWD Maharashtra"
 *   location="Mumbai"
 *   state="Maharashtra"
 *   filedDate="2025-01-15"
 *   respondedDate="2025-01-18"
 *   onDownload={handleDownload}
 *   onShare={handleShare}
 *   onReport={handleReport}
 * />
 */
export function RTIDetailHeader({
  title,
  status,
  department,
  location,
  state,
  filedDate,
  respondedDate,
  onDownload,
  onShare,
  onReport,
  className = '',
}: RTIDetailHeaderProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <header className={`${styles.header} ${className}`}>
      {/* Status Badge and Action Buttons Row */}
      <div className={styles.topRow}>
        <StatusBadge status={status} showIcon />

        <div className={styles.actions}>
          {onDownload && (
            <ActionButton
              icon={Download}
              label="Download"
              onClick={onDownload}
              variant="secondary"
            />
          )}
          {onShare && (
            <ActionButton
              icon={Share2}
              label="Share"
              onClick={onShare}
              variant="secondary"
            />
          )}
          {onReport && (
            <ActionButton
              icon={Flag}
              label="Report"
              onClick={onReport}
              variant="ghost"
            />
          )}
        </div>
      </div>

      {/* Title */}
      <Typography variant="headline-large" as="h1" className={styles.title}>
        {title}
      </Typography>

      {/* Metadata Row */}
      <div className={styles.metadata}>
        <MetadataItem
          icon={Building2}
          label="Department"
          value={department}
          layout="horizontal"
        />
        <MetadataItem
          icon={MapPin}
          label="Location"
          value={`${location}, ${state}`}
          layout="horizontal"
        />
        <MetadataItem
          icon={Calendar}
          label="Filed"
          value={formatDate(filedDate)}
          layout="horizontal"
        />
        {respondedDate && (
          <MetadataItem
            icon={Calendar}
            label="Responded"
            value={formatDate(respondedDate)}
            layout="horizontal"
          />
        )}
      </div>
    </header>
  )
}
