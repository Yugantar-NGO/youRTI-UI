'use client'

import { BaseProps } from '@/types'
import { RTIDocument } from '@/data/rtiDetailData'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { DocumentAttachment } from '../atoms'
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
    <Card variant="bordered" padding="lg" className={`${styles.section} ${className}`}>
      {/* Section Header */}
      <div className={styles.header}>
        <span className={styles.icon}>📎</span>
        <Typography variant="headline-small" as="h2" className={styles.title}>
          DOCUMENTS PROVIDED
        </Typography>
      </div>

      {/* Document Count */}
      <Typography variant="body-text" className={styles.count}>
        {documents.length} document{documents.length !== 1 ? 's' : ''} attached
      </Typography>

      {/* Documents List */}
      <div className={styles.documentsList}>
        {documents.map((document) => (
          <DocumentAttachment key={document.id} document={document} variant="card" />
        ))}
      </div>
    </Card>
  )
}
