import { LandingPageRepository } from '@/services/repositories/LandingPageRepository'
import { DailyEditionSection } from './organisms/DailyEditionSection'
import { HeroSection } from './organisms/HeroSection'
import { MainContentSection } from './organisms/MainContentSection'
import { FooterSection } from './organisms/FooterSection'
import styles from './RTIDashboardPage.module.css'

/**
 * RTIDashboardPage Component
 *
 * Top-level page component for the RTI Dashboard Landing Page.
 * Server component that fetches data and composes all sections.
 *
 * @example
 * <RTIDashboardPage />
 */
export async function RTIDashboardPage() {
  const data = await LandingPageRepository.getLandingPageData()

  return (
    <div className={styles.page}>
      <DailyEditionSection data={data.dailyEdition} />
      <HeroSection data={data.hero} />
      <MainContentSection data={data.mainContent} />
      <FooterSection />
    </div>
  )
}
