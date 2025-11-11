import { RTIStory } from '@/types'
import { StoryCard } from '../atoms/StoryCard'
import styles from './ImpactStory.module.css'

interface ImpactStoryProps {
  story: RTIStory
  className?: string
}

/**
 * ImpactStory Component
 *
 * Displays the lead impact story of the day in a prominent format.
 * Wraps StoryCard with additional prominence and styling.
 *
 * @example
 * <ImpactStory story={{ title: '...', summary: '...', isLeadStory: true }} />
 */
export function ImpactStory({ story, className = '' }: ImpactStoryProps) {
  return (
    <div className={`${styles.impactStory} ${className}`}>
      <div className={styles.header}>
        <span className={styles.badge}>✨ Impact Story of the Day</span>
      </div>
      <StoryCard story={story} variant="lead" />
    </div>
  )
}
