import { MainContentData } from '@/types'
import { KeyMetricsSection } from '../molecules/KeyMetricsSection'
import { InsightsTrends } from '../molecules/InsightsTrends'
import { BrowseByTopic } from '../molecules/BrowseByTopic'
import { ActivityFeed } from '../molecules/ActivityFeed'
import { TransparencySpotlight } from '../molecules/TransparencySpotlight'
import styles from './MainContentSection.module.css'

interface MainContentSectionProps {
  data: MainContentData
  className?: string
}

/**
 * MainContentSection Organism
 *
 * Composes the main content area with metrics, insights, topics,
 * activity feed, and spotlight story.
 *
 * @example
 * <MainContentSection data={mainContentData} />
 */
export function MainContentSection({ data, className = '' }: MainContentSectionProps) {
  return (
    <section className={`${styles.mainContentSection} ${className}`}>
      <div className={styles.container}>
        <KeyMetricsSection metrics={data.keyMetrics} />

        <div className={styles.twoColumnLayout}>
          <InsightsTrends insights={data.insights} />
          <BrowseByTopic topics={data.topics} />
        </div>

        <div className={styles.activitySpotlightLayout}>
          <div className={styles.activityColumn}>
            <ActivityFeed activities={data.activityFeed} />
          </div>
          <div className={styles.spotlightColumn}>
            <TransparencySpotlight story={data.spotlight} />
          </div>
        </div>
      </div>
    </section>
  )
}
