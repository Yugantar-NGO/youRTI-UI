import { Statistic } from '@/types'
import { Container } from '@/components/layout/Container'
import { StatGrid } from '@/components/data/StatCard'
import { Masthead } from './Masthead'
import styles from './HeroBanner.module.css'

interface HeroBannerProps {
  title: string
  subtitle?: string
  edition?: string
  stats: Statistic[]
  className?: string
}

/**
 * HeroBanner Component
 *
 * Full hero section combining masthead and statistics grid.
 * Displays "above the fold" content with key metrics.
 *
 * @example
 * <HeroBanner
 *   title="RTI TRANSPARENCY DASHBOARD"
 *   subtitle="Tracking Government Accountability Across India"
 *   stats={[
 *     { label: 'Filed', value: 24567, change: 12, changeType: 'increase' },
 *     { label: 'Disclosed', value: 18943, change: 8, changeType: 'increase' },
 *     { label: 'Rejected', value: 2314, change: 3, changeType: 'decrease' }
 *   ]}
 * />
 */
export function HeroBanner({
  title,
  subtitle,
  edition,
  stats,
  className = '',
}: HeroBannerProps) {
  return (
    <div className={`${styles.heroBanner} ${className}`}>
      <Masthead title={title} subtitle={subtitle} edition={edition} />

      <div className={styles.divider}></div>

      <section className={styles.statsSection}>
        <Container>
          <StatGrid stats={stats} />
        </Container>
      </section>
    </div>
  )
}
