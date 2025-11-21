'use client'

import { useRef } from 'react'
import { BaseProps } from '@/types'
import { InfoIcon } from '../atoms'
import styles from './SimilarRTIsSection.module.css'

export interface SimilarRTI {
  id: string
  title: string
  status: 'answered' | 'pending' | 'overdue'
  department: string
  location: string
  daysElapsed: number
  highlight?: string
}

interface SimilarRTIsSectionProps extends BaseProps {
  rtis: SimilarRTI[]
  totalCount?: number
}

/**
 * SimilarRTIsSection Component
 *
 * Displays related RTIs in a horizontal scrolling grid with navigation buttons.
 * Matches the HTML design exactly with smooth scroll behavior.
 *
 * @example
 * <SimilarRTIsSection rtis={[...]} totalCount={847} />
 */
export function SimilarRTIsSection({
  rtis,
  totalCount = 0,
  className = '',
}: SimilarRTIsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollSimilar = (direction: number) => {
    if (!scrollContainerRef.current) return
    const scrollAmount = 364 // card width (340) + gap (24)
    scrollContainerRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    })
  }

  const getStatusBadge = (status: string) => {
    const config = {
      answered: { label: '✓ Answered', className: styles.statusAnswered },
      pending: { label: '⏳ Pending', className: styles.statusPending },
      overdue: { label: '⚠️ Overdue', className: styles.statusOverdue },
    }

    const statusConfig = config[status as keyof typeof config] || config.answered

    return <div className={`${styles.statusMini} ${statusConfig.className}`}>{statusConfig.label}</div>
  }

  return (
    <div className={`${styles.section} ${className}`}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>🔗</span>
          <span>Similar RTIs</span>
          <InfoIcon tooltip="Related RTI applications on similar topics or from the same department. Explore these to find more information on this subject." />
        </div>
        {totalCount > 0 && (
          <a href="/browse" className={styles.viewAllLink}>
            <span>View all {totalCount.toLocaleString()}</span>
            <span>→</span>
          </a>
        )}
      </div>

      <div className={styles.grid} ref={scrollContainerRef}>
        {rtis.map((rti) => (
          <div key={rti.id} className={styles.card}>
            <div className={styles.cardHeader}>
              {getStatusBadge(rti.status)}
              <div className={styles.days}>{rti.daysElapsed}d</div>
            </div>

            <div className={styles.cardTitle}>{rti.title}</div>

            <div className={styles.cardMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>🏛️</span>
                <span>{rti.department}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>📍</span>
                <span>{rti.location}</span>
              </div>
              {rti.highlight && (
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>💰</span>
                  <span>{rti.highlight}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.nav}>
        <button
          className={styles.navBtn}
          onClick={() => scrollSimilar(-1)}
          aria-label="Scroll left"
        >
          ←
        </button>
        <button
          className={styles.navBtn}
          onClick={() => scrollSimilar(1)}
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </div>
  )
}
