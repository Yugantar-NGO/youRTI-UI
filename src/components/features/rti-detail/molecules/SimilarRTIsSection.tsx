'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
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
 * On mobile, shows one RTI at a time with prev/next navigation.
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
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollSimilar = (direction: number) => {
    if (!scrollContainerRef.current) return
    const scrollAmount = 364 // card width (340) + gap (24)
    scrollContainerRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    })
  }

  const navigateMobile = (direction: number) => {
    const newIndex = currentIndex + direction
    if (newIndex >= 0 && newIndex < rtis.length) {
      setCurrentIndex(newIndex)
    }
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

  const renderCard = (rti: SimilarRTI) => (
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
  )

  return (
    <div className={`${styles.section} ${className}`}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>🔗</span>
          <span>Similar RTIs</span>
          <InfoIcon tooltip="Related RTI applications on similar topics or from the same department. Explore these to find more information on this subject." />
        </div>
        {totalCount > 0 && (
          <Link href="/browse" className={styles.viewAllLink}>
            <span>View all {totalCount.toLocaleString()}</span>
            <span>→</span>
          </Link>
        )}
      </div>

      {/* Desktop: horizontal scroll */}
      <div className={styles.grid} ref={scrollContainerRef}>
        {rtis.map((rti) => renderCard(rti))}
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

      {/* Mobile: single card with navigation */}
      <div className={styles.mobileContainer}>
        {rtis.length > 0 && renderCard(rtis[currentIndex])}

        <div className={styles.mobileNav}>
          <button
            className={styles.mobileNavBtn}
            onClick={() => navigateMobile(-1)}
            disabled={currentIndex === 0}
            aria-label="Previous RTI"
          >
            ← Prev
          </button>
          <span className={styles.mobileCounter}>
            {currentIndex + 1} / {rtis.length}
          </span>
          <button
            className={styles.mobileNavBtn}
            onClick={() => navigateMobile(1)}
            disabled={currentIndex === rtis.length - 1}
            aria-label="Next RTI"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
