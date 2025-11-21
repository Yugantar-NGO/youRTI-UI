'use client'

import { BaseProps } from '@/types'
import { RTIDocument } from '@/data/rtiDetailData'
import { Typography } from '@/components/ui/Typography'
import { DocumentAttachment, InfoIcon } from '../atoms'
import styles from './DocumentsSection.module.css'

interface DocumentsSectionProps extends BaseProps {
  documents: RTIDocument[]
}

/**
 * DocumentsSection Component
 *
 * Displays list of attached documents with download capability.
 * Shows document name, type, size, and download button.
 *
 * @example
 * <DocumentsSection
 *   documents={[
 *     { id: 'r1', name: 'report.pdf', type: 'pdf', size: '1.2 MB' },
 *     { id: 'r2', name: 'data.xlsx', type: 'xlsx', size: '456 KB' },
 *   ]}
 * />
 */
export function DocumentsSection({ documents, className = '' }: DocumentsSectionProps) {
  if (!documents || documents.length === 0) {
    return null
  }

  return (
    <section className={`${styles.section} ${className}`}>
      {/* Section Header */}
      <div className={styles.header}>
        <span className={styles.icon}>📁</span>
        <Typography variant="headline-small" as="h2" className={styles.title}>
          Documents & Attachments
        </Typography>
        <InfoIcon tooltip="Official documents provided as part of the RTI response. Download these files to view the complete information disclosed by the department." />
      </div>

      {/* Documents List */}
      <div className={styles.documentsList}>
        {documents.map((document) => (
          <DocumentAttachment key={document.id} document={document} variant="card" />
        ))}
      </div>
    </section>
  )
}
