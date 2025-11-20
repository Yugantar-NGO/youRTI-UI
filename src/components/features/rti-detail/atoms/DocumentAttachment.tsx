'use client'

import { BaseProps } from '@/types'
import { RTIDocument } from '@/data/rtiDetailData'
import { FileText, File, Download, Eye, Calendar } from '@/lib/icons'
import { Icon } from '@/components/ui/Icon'
import { LucideIcon } from 'lucide-react'
import styles from './DocumentAttachment.module.css'

interface DocumentAttachmentProps extends BaseProps {
  document: RTIDocument
  variant?: 'inline' | 'list' | 'card'
}

/**
 * DocumentAttachment Component
 *
 * Displays a document link with appropriate icon based on file type.
 * Supports inline, list, and card layout variants.
 *
 * @example
 * <DocumentAttachment
 *   document={{ name: 'report.pdf', type: 'pdf', size: '2.3 MB' }}
 *   variant="card"
 * />
 */
export function DocumentAttachment({
  document,
  variant = 'card',
  className = '',
}: DocumentAttachmentProps) {
  // Map file types to icons
  const getFileIcon = (type: RTIDocument['type']): LucideIcon => {
    const iconMap: Record<RTIDocument['type'], LucideIcon> = {
      pdf: FileText,
      xlsx: FileText,
      docx: FileText,
      jpg: File,
      png: File,
    }
    return iconMap[type] || File
  }

  // Get file extension label
  const getFileTypeLabel = (type: RTIDocument['type']): string => {
    return type.toUpperCase()
  }

  const FileIcon = getFileIcon(document.type)
  const downloadUrl = document.url || '#'
  const displayTitle = document.title || document.name

  // Render card variant (white background with icon components)
  if (variant === 'card') {
    return (
      <div className={`${styles.documentCard} ${className}`}>
        <div className={styles.documentCardHeader}>
          <div className={styles.documentIcon}>
            <Icon icon={FileIcon} size="lg" className={styles.iconInside} />
          </div>
          <div className={styles.documentType}>{getFileTypeLabel(document.type)} Document</div>
        </div>
        <div className={styles.documentName}>{displayTitle}</div>
        <div className={styles.documentMeta}>
          {document.pages && (
            <div className={styles.documentMetaItem}>
              <Icon icon={FileText} size="sm" className={styles.documentMetaIcon} />
              <span>{document.pages} pages</span>
            </div>
          )}
          {document.receivedDate && (
            <div className={styles.documentMetaItem}>
              <Icon icon={Calendar} size="sm" className={styles.documentMetaIcon} />
              <span>Received: {document.receivedDate}</span>
            </div>
          )}
          {document.size && (
            <div className={styles.documentMetaItem}>
              <Icon icon={File} size="sm" className={styles.documentMetaIcon} />
              <span>{document.size}</span>
            </div>
          )}
        </div>
        <div className={styles.documentActions}>
          <button className={`${styles.documentActionBtn} ${styles.primary}`} aria-label={`View ${displayTitle}`}>
            <Icon icon={Eye} size="sm" />
            <span>View</span>
          </button>
          <button
            className={styles.documentActionBtn}
            aria-label={`Download ${displayTitle}`}
            onClick={() => window.open(downloadUrl, '_blank')}
          >
            <Icon icon={Download} size="sm" />
            <span>Download</span>
          </button>
        </div>
      </div>
    )
  }

  // Legacy inline/list variant
  return (
    <div className={`${styles.attachment} ${styles[variant]} ${className}`}>
      <div className={styles.iconWrapper}>
        <Icon icon={FileIcon} size="base" className={styles.fileIcon} />
        <span className={styles.fileType}>{getFileTypeLabel(document.type)}</span>
      </div>

      <div className={styles.details}>
        <span className={styles.fileName}>{document.name}</span>
        {document.size && <span className={styles.fileSize}>{document.size}</span>}
      </div>

      <a
        href={downloadUrl}
        download={document.name}
        className={styles.downloadLink}
        aria-label={`Download ${document.name}`}
      >
        <Icon icon={Download} size="sm" />
      </a>
    </div>
  )
}
