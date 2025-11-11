import { RTIStory } from '@/types'
import { StoryCard } from '../atoms/StoryCard'
import styles from './SecondaryStories.module.css'

interface SecondaryStoriesProps {
  stories: RTIStory[]
  className?: string
}

/**
 * SecondaryStories Component
 *
 * Displays a grid of secondary impact stories.
 * Shows 2-3 stories in a responsive grid layout.
 *
 * @example
 * <SecondaryStories stories={[...]} />
 */
export function SecondaryStories({ stories, className = '' }: SecondaryStoriesProps) {
  if (!stories || stories.length === 0) {
    return null
  }

  return (
    <div className={`${styles.secondaryStories} ${className}`}>
      <h2 className={styles.title}>More RTIs that made a difference</h2>
      <div className={styles.grid}>
        {stories.map((story) => (
          <div key={story.id} className={styles.storyWrapper}>
            <StoryCard story={story} variant="secondary" />
          </div>
        ))}
      </div>
    </div>
  )
}
