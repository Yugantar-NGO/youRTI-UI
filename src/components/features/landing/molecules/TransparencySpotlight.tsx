import { SpotlightStory } from '@/types'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import styles from './TransparencySpotlight.module.css'

interface TransparencySpotlightProps {
  story: SpotlightStory
  className?: string
}

/**
 * TransparencySpotlight Component
 *
 * Features a detailed RTI impact story.
 * Displays narrative format with measurable impact points.
 *
 * @example
 * <TransparencySpotlight story={{ title: '...', summary: '...', impact: [...] }} />
 */
export function TransparencySpotlight({ story, className = '' }: TransparencySpotlightProps) {
  return (
    <Card variant="elevated" className={`${styles.transparencySpotlight} ${className}`}>
      <CardHeader>
        <div className={styles.badge}>✨ Transparency Spotlight</div>
        <CardTitle>{story.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className={styles.summary}>{story.summary}</p>

        {story.impact && story.impact.length > 0 && (
          <div className={styles.impactSection}>
            <h4 className={styles.impactTitle}>Impact:</h4>
            <ul className={styles.impactList}>
              {story.impact.map((item, index) => (
                <li key={index} className={styles.impactItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.metadata}>
          <div className={styles.metadataItem}>
            <span className={styles.label}>RTI:</span>
            <span>{story.rtiId}</span>
          </div>
          <div className={styles.metadataItem}>
            <span className={styles.label}>Date:</span>
            <span>
              {new Date(story.date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <a href={`/rti/${story.id}`} className={styles.readLink}>
          Read Full Story →
        </a>
      </CardFooter>
    </Card>
  )
}
