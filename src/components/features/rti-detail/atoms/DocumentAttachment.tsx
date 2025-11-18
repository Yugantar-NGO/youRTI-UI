import { BaseProps } from '@/types'
import { RTIDocument } from '@/data/rtiDetailData'
import { FileText, File, Download } from '@/lib/icons'
import { Icon } from '@/components/ui/Icon'
import { LucideIcon } from 'lucide-react'
import styles from './DocumentAttachment.module.css'

interface DocumentAttachmentProps extends BaseProps {
  document: RTIDocument
  variant?: 'inline' | 'list'
}

/**
 * DocumentAttachment Component
 *
 * Displays a document link with appropriate icon based on file type.
 * Supports inline and list layout variants.
 *
 * @example
 * <DocumentAttachment
 *   document={{ name: 'report.pdf', type: 'pdf', size: '2.3 MB' }}
 *   variant="list"
 * />
 */
export function DocumentAttachment({
  document,
  variant = 'list',
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
