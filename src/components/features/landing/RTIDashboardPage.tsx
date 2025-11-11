import { LandingPageRepository } from '@/services/repositories/LandingPageRepository'
import { TopNavigation } from './organisms/TopNavigation'
import { HeroSection } from './organisms/HeroSection'
import { StoriesThatChanged } from './organisms/StoriesThatChanged'
import { CitizensWaiting } from './organisms/CitizensWaiting'
import { SystemPulse } from './organisms/SystemPulse'
import { ImpactMeterSection } from './organisms/ImpactMeterSection'
import { PeopleAreAsking } from './organisms/PeopleAreAsking'
import { DailyEditionSection } from './organisms/DailyEditionSection'
import { MainContentSection } from './organisms/MainContentSection'
import { FooterSection } from './organisms/FooterSection'
import {
  mockWinStories,
  mockPendingCases,
  mockTopicSummaries
} from '@/data/mockData/task3Data'
import styles from './RTIDashboardPage.module.css'

/**
 * RTIDashboardPage Component
 *
 * Top-level page component for the RTI Dashboard Landing Page.
 * Server component that fetches data and composes all sections.
 * Integrates all sections from Tasks 2-6 of the redesign plan.
 *
 * Section Order (as per Task 6 requirements):
 * 1. TopNavigation (Task 2) - Sticky navigation bar
 * 2. HeroSection (Task 2) - Big Win, Urgent RTI, Stats
 * 3. StoriesThatChanged (Task 3) - Impact stories grid
 * 4. CitizensWaiting (Task 3) - Pending cases section
 * 5. SystemPulse (Task 4) - Analytics tiles
 * 6. ImpactMeterSection (Task 4) - Meter and key metrics
 * 7. PeopleAreAsking (Task 5) - Question feed
 * 8. DailyEditionSection (legacy) - Kept for compatibility
 * 9. MainContentSection (legacy) - Kept for compatibility
 * 10. FooterSection (Task 6) - Dark footer with links
 *
 * @example
 * <RTIDashboardPage />
 */
export async function RTIDashboardPage() {
  const data = await LandingPageRepository.getLandingPageData()

  // Add hookLine to recent questions for PeopleAreAsking component
  const questionsWithHooks = data.dailyEdition.recentQuestions.map((q) => ({
    ...q,
    hookLine: `Citizens want transparency on ${q.topic.toLowerCase()} in ${q.department}`
  }))

  return (
    <div className={styles.page}>
      <TopNavigation />

      <div className={styles.mainContent}>
        <HeroSection />
        <StoriesThatChanged stories={mockWinStories} />
        <CitizensWaiting cases={mockPendingCases} topicSummaries={mockTopicSummaries} />
        <SystemPulse />
        <ImpactMeterSection healthScore={78} />
        <PeopleAreAsking questions={questionsWithHooks} />

        {/* Legacy sections - kept for compatibility */}
        <DailyEditionSection data={data.dailyEdition} />
        <MainContentSection data={data.mainContent} />
      </div>

      <FooterSection />
    </div>
  )
}
