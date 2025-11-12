import { ICON_SIZES } from '@/constants/dashboard.constants'
import styles from './BigWinCard.module.css'

interface BigWinCardProps {
  title: string
  department: string
  location: string
  impact: string[]
  date: string
  className?: string
}

/**
 * BigWinCard Molecule
 *
 * Displays the "Big Win of the Week" with teal accent border,
 * impact metrics, and department/location context.
 *
 * @example
 * <BigWinCard
 *   title="School Meal Budget Data Released"
 *   department="Education Dept"
 *   location="Bihar"
 *   impact={["₹450 Cr budget data revealed", "45 districts affected"]}
 *   date="3 days ago"
 * />
 */
export function BigWinCard({
  title,
  department,
  location,
  impact,
  date,
  className = '',
}: BigWinCardProps) {
  return (
    <article className={`${styles.card} ${className}`}>
      <div className={styles.header}>
        <span className={styles.badge}>Big Win of the Week</span>
        <span className={styles.date}>{date}</span>
      </div>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.metadata}>
        <span className={styles.metaItem}>
          <svg className={styles.metaIcon} width={ICON_SIZES.BASE} height={ICON_SIZES.BASE} viewBox="0 0 16 16" fill="none">
            <path d="M8 1L10.163 5.377L15 6.107L11.5 9.528L12.326 14.343L8 12.077L3.674 14.343L4.5 9.528L1 6.107L5.837 5.377L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {department}
        </span>
        <span className={styles.separator}>•</span>
        <span className={styles.metaItem}>
          <svg className={styles.metaIcon} width={ICON_SIZES.BASE} height={ICON_SIZES.BASE} viewBox="0 0 16 16" fill="none">
            <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 4V8L10.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {location}
        </span>
      </div>

      <div className={styles.impactSection}>
        <div className={styles.impactLabel}>Impact:</div>
        <ul className={styles.impactList}>
          {impact.map((item) => (
            <li key={item} className={styles.impactItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button className={styles.readMore} aria-label="Read more about this win">
        Read Full Story →
      </button>
    </article>
  )
}
