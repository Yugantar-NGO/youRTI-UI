import { BaseProps } from '@/types'
import { RTIDocument } from '@/data/rtiDetailData'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { DocumentAttachment } from '../atoms'
import styles from './QuestionSection.module.css'

interface QuestionSectionProps extends BaseProps {
  questionText: string
  questionPoints?: string[]
  attachments?: RTIDocument[]
}

/**
 * QuestionSection Component
 *
 * Displays the RTI question text, optional numbered points, and attachments.
 * Uses semantic HTML with proper list elements.
 *
 * @example
 * <QuestionSection
 *   questionText="I request information regarding..."
 *   questionPoints={['Budget details', 'Contractor names']}
 *   attachments={[{ name: 'location_map.pdf', type: 'pdf', size: '2.3 MB' }]}
 * />
 */
export function QuestionSection({
  questionText,
  questionPoints,
  attachments,
  className = '',
}: QuestionSectionProps) {
  return (
    <Card variant="bordered" padding="lg" className={`${styles.section} ${className}`}>
      {/* Section Header */}
      <Typography variant="headline-small" as="h2" className={styles.header}>
        THE QUESTION
      </Typography>

      {/* Question Text */}
      <div className={styles.content}>
        <Typography variant="body-text" as="div" className={styles.questionText}>
          {questionText}
        </Typography>

        {/* Numbered Points */}
        {questionPoints && questionPoints.length > 0 && (
          <ol className={styles.pointsList}>
            {questionPoints.map((point, index) => (
              <li key={index} className={styles.point}>
                {point}
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Attachments */}
      {attachments && attachments.length > 0 && (
        <div className={styles.attachments}>
          <Typography variant="label" className={styles.attachmentsLabel}>
            Attachments ({attachments.length})
          </Typography>
          <div className={styles.attachmentsList}>
            {attachments.map((document) => (
              <DocumentAttachment key={document.id} document={document} variant="list" />
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
