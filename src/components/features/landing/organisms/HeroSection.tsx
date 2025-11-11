import { HeroSectionData } from '@/types'
import { StatGrid, StatCard } from '@/components/data/StatCard'
import { NavigationBar } from '../molecules/NavigationBar'
import { IndiaGlanceCard } from '../molecules/IndiaGlanceCard'
import styles from './HeroSection.module.css'

interface HeroSectionProps {
  data: HeroSectionData
  className?: string
}

/**
 * HeroSection Organism
 *
 * Composes the hero banner with title, navigation, stats, and India at a Glance.
 * Gradient background with white text.
 *
 * @example
 * <HeroSection data={heroData} />
 */
export function HeroSection({ data, className = '' }: HeroSectionProps) {
  return (
    <section className={`${styles.heroSection} ${className}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.subtitle}>{data.subtitle}</p>
          <p className={styles.tagline}>{data.tagline}</p>
        </div>

        <NavigationBar items={data.navigationItems} />

        <StatGrid
          stats={[
            {
              label: 'RTIs Filed (last 12 months)',
              value: data.stats.rtisFiled,
            },
            {
              label: 'Responses Received (within time)',
              value: data.stats.responsesReceived,
            },
            {
              label: 'Pending (today)',
              value: data.stats.pending,
            },
          ]}
          className={styles.statsGrid}
        />

        <IndiaGlanceCard stats={data.indiaGlance} />
      </div>
    </section>
  )
}
