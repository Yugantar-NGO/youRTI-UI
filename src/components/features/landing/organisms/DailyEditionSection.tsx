import { DailyEditionData } from '@/types'
import { ImpactStory } from '../molecules/ImpactStory'
import { SecondaryStories } from '../molecules/SecondaryStories'
import { RTIActivityHighlights } from './RTIActivityHighlights'
import { RecentQuestions } from '../molecules/RecentQuestions'
import styles from './DailyEditionSection.module.css'

interface DailyEditionSectionProps {
  data: DailyEditionData
  className?: string
}

/**
 * DailyEditionSection Organism
 *
 * Composes the entire "Daily RTI Front Page" section.
 * Story-first content with lead story, secondary stories,
 * tabbed activity highlights, and recent questions.
 *
 * @example
 * <DailyEditionSection data={dailyEditionData} />
 */
export function DailyEditionSection({ data, className = '' }: DailyEditionSectionProps) {
  return (
    <section className={`${styles.dailyEditionSection} ${className}`} id="daily-edition">
      <div className={styles.container}>
        <ImpactStory story={data.leadStory} />
        <SecondaryStories stories={data.secondaryStories} />
        <RTIActivityHighlights
          freshAnswers={data.freshAnswers}
          unansweredQuestions={data.unansweredQuestions}
        />
        <RecentQuestions questions={data.recentQuestions} />
      </div>
    </section>
  )
}
