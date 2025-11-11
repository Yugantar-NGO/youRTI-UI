import { LandingPageRepository } from '@/services/repositories/LandingPageRepository'
import { TopNavigation } from './organisms/TopNavigation'
import { HeroSection } from './organisms/HeroSection'
import { DailyEditionSection } from './organisms/DailyEditionSection'
import { MainContentSection } from './organisms/MainContentSection'
import { FooterSection } from './organisms/FooterSection'
import styles from './RTIDashboardPage.module.css'

/**
 * RTIDashboardPage Component
 *
 * Top-level page component for the RTI Dashboard Landing Page.
 * Server component that fetches data and composes all sections.
 * Layout per TODO spec with TopNavigation, HeroSection at top.
 *
 * @example
 * <RTIDashboardPage />
 */
export async function RTIDashboardPage() {
  const data = await LandingPageRepository.getLandingPageData()

  return (
    <div className={styles.page}>
      <TopNavigation />
      <HeroSection />
      <DailyEditionSection data={data.dailyEdition} />
      <MainContentSection data={data.mainContent} />
      <FooterSection />
    </div>
  )
}
