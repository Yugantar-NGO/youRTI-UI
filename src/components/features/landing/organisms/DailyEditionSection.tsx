import { DailyEditionData } from '@/types'
import { DailyEditionHeader } from '../molecules/DailyEditionHeader'
import { ImpactStory } from '../molecules/ImpactStory'
import { SecondaryStories } from '../molecules/SecondaryStories'
import { FreshAnswers } from '../molecules/FreshAnswers'
import { UnansweredQuestions } from '../molecules/UnansweredQuestions'
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
 * fresh answers, unanswered questions, and recent questions.
 *
 * @example
 * <DailyEditionSection data={dailyEditionData} />
 */
export function DailyEditionSection({ data, className = '' }: DailyEditionSectionProps) {
  return (
    <section className={`${styles.dailyEditionSection} ${className}`} id="daily-edition">
      <DailyEditionHeader editionDate={data.editionDate} />

      <div className={styles.container}>
        <ImpactStory story={data.leadStory} />
        <SecondaryStories stories={data.secondaryStories} />
        <FreshAnswers answers={data.freshAnswers} />
        <UnansweredQuestions questions={data.unansweredQuestions} />
        <RecentQuestions questions={data.recentQuestions} />
      </div>
    </section>
  )
}
