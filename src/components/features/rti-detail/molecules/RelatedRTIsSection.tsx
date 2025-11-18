import Link from 'next/link'
import { BaseProps } from '@/types'
import { RTIResultItem } from '@/types/dashboard'
import { Card } from '@/components/ui/Card'
import { Typography } from '@/components/ui/Typography'
import { RTIResultCard } from '@/components/features/browse/atoms/RTIResultCard'
import { ArrowRight } from '@/lib/icons'
import { Icon } from '@/components/ui/Icon'
import styles from './RelatedRTIsSection.module.css'

interface RelatedRTIsSectionProps extends BaseProps {
  relatedRTIs?: RTIResultItem[]
  department: string
  topic: string
  state: string
}

/**
 * RelatedRTIsSection Component
 *
 * Displays a grid of related RTI cards filtered by department or topic.
 * Includes a "View all" link to browse more RTIs.
 *
 * @example
 * <RelatedRTIsSection
 *   relatedRTIs={[...]}
 *   department="PWD Maharashtra"
 *   topic="Road Construction"
 *   state="Maharashtra"
 * />
 */
export function RelatedRTIsSection({
  relatedRTIs,
  department,
  topic,
  state,
  className = '',
}: RelatedRTIsSectionProps) {
  if (!relatedRTIs || relatedRTIs.length === 0) {
    return null
  }

  // Limit to 6 related RTIs
  const displayRTIs = relatedRTIs.slice(0, 6)

  return (
    <Card variant="bordered" padding="lg" className={`${styles.section} ${className}`}>
      {/* Section Header */}
      <div className={styles.headerRow}>
        <Typography variant="headline-small" as="h2" className={styles.header}>
          RELATED RTIs
        </Typography>
        <Link
          href={`/browse?department=${encodeURIComponent(department)}`}
          className={styles.viewAllLink}
        >
          View all from {department}
          <Icon icon={ArrowRight} size="sm" />
        </Link>
      </div>

      {/* Related RTIs Grid */}
      <div className={styles.grid}>
        {displayRTIs.map((rti) => (
          <RTIResultCard key={rti.id} rti={rti} />
        ))}
      </div>

      {/* Bottom Link */}
      <div className={styles.footer}>
        <Link href={`/browse?topic=${encodeURIComponent(topic)}`} className={styles.topicLink}>
          Explore more RTIs about {topic}
          <Icon icon={ArrowRight} size="sm" />
        </Link>
      </div>
    </Card>
  )
}
