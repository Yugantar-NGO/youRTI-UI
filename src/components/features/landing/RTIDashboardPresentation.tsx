/**
 * RTI Dashboard Presentation Component
 *
 * Pure presentational component that renders the dashboard UI.
 * Receives all data as props and has no business logic.
 * Follows the Container/Presentational pattern for better separation of concerns.
 */

import { TopNavigation } from './organisms/TopNavigation'
import { HeroSection } from './organisms/HeroSection'
import { StoriesThatChanged } from './organisms/StoriesThatChanged'
import { SystemPulse } from './organisms/SystemPulse'
import { PeopleAreAsking } from './organisms/PeopleAreAsking'
import { FooterSection } from './organisms/FooterSection'
import { DashboardData } from '@/services/repositories/strategies/DashboardDataTransformer'
import {
  mockWinStories
} from '@/data/mockData/task3Data'
import styles from './RTIDashboardPage.module.css'

/**
 * Props for RTI Dashboard Presentation
 */
export interface RTIDashboardPresentationProps {
  /**
   * Dashboard data with enriched questions
   */
  data: DashboardData
}

/**
 * RTI Dashboard Presentation Component
 *
 * Pure UI component that renders the complete dashboard layout.
 * All data is passed via props for better testability and reusability.
 *
 * Section Order:
 * 1. TopNavigation - Sticky navigation bar
 * 2. HeroSection - Big Win, Urgent RTI, Stats
 * 3. StoriesThatChanged - Impact stories grid
 * 4. PeopleAreAsking - What India Is Asking About (topic statistics)
 * 5. SystemPulse - The Accountability Gap
 * 6. FooterSection - Dark footer with links
 *
 * @param props - Component props
 * @returns Dashboard UI
 *
 * @example
 * ```tsx
 * <RTIDashboardPresentation data={dashboardData} />
 * ```
 */
export function RTIDashboardPresentation({
  data,
}: RTIDashboardPresentationProps): JSX.Element {
  return (
    <div className={styles.page}>
      <TopNavigation />

      <div className={styles.mainContent}>
        <HeroSection />
        <StoriesThatChanged stories={mockWinStories} />
        <PeopleAreAsking topics={data.topicStatistics} />
        <SystemPulse />
      </div>

      <FooterSection />
    </div>
  )
}
