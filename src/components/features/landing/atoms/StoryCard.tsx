import { RTIStory } from '@/types'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import styles from './StoryCard.module.css'

interface StoryCardProps {
  story: RTIStory
  variant?: 'lead' | 'secondary'
  className?: string
}

/**
 * StoryCard Component
 *
 * Displays RTI impact story with metadata.
 * Supports lead (featured) and secondary variants.
 *
 * @example
 * <StoryCard story={{ title: '...', summary: '...', topic: 'Education' }} variant="lead" />
 */
export function StoryCard({ story, variant = 'secondary', className = '' }: StoryCardProps) {
  const isLead = variant === 'lead' || story.isLeadStory

  return (
    <Card
      variant={isLead ? 'elevated' : 'bordered'}
      className={`${styles.storyCard} ${isLead ? styles.lead : styles.secondary} ${className}`}
    >
      <CardHeader>
        <div className={styles.topic}>
          <Badge variant="default">{story.topic}</Badge>
        </div>
        <CardTitle className={styles.title}>{story.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className={styles.summary}>{story.summary}</p>

        <div className={styles.metadata}>
          <div className={styles.metadataRow}>
            <span className={styles.label}>Topic:</span>
            <span>{story.topic}</span>
          </div>
          <div className={styles.metadataRow}>
            <span className={styles.label}>State:</span>
            <span>{story.state}</span>
            {story.district && (
              <>
                <span className={styles.separator}>•</span>
                <span className={styles.label}>District:</span>
                <span>{story.district}</span>
              </>
            )}
          </div>
          <div className={styles.metadataRow}>
            <span className={styles.label}>Filed:</span>
            <span>
              {new Date(story.filedDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </span>
            <span className={styles.separator}>•</span>
            <span className={styles.label}>Answered:</span>
            <span>
              {new Date(story.answeredDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <a href={story.viewLink} className={styles.viewLink}>
          View RTI Request & Reply →
        </a>
      </CardFooter>
    </Card>
  )
}
