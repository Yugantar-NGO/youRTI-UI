'use client'

import { useState } from 'react'
import { BaseProps } from '@/types'
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
 * Displays related RTIs in a grid with pagination controls.
 *
 * @example
 * <SimilarRTIsSection rtis={[...]} totalCount={847} />
 */
export function SimilarRTIsSection({
  rtis,
  totalCount = 0,
  className = '',
}: SimilarRTIsSectionProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 2

  const startIndex = currentPage * itemsPerPage
  const displayedRTIs = rtis.slice(startIndex, startIndex + itemsPerPage)

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (startIndex + itemsPerPage < rtis.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  const getStatusBadge = (status: string) => {
    const config = {
      answered: { label: '✓ ANSWERED', bg: '#D1FAE5', color: '#065F46' },
      pending: { label: '⏳ PENDING', bg: '#FEF3C7', color: '#92400E' },
      overdue: { label: '⚠️ OVERDUE', bg: '#FEE2E2', color: '#991B1B' },
    }

    const statusConfig = config[status as keyof typeof config] || config.answered

    return (
      <div className={styles.statusBadge} style={{ background: statusConfig.bg, color: statusConfig.color }}>
        {statusConfig.label}
      </div>
    )
  }

  return (
    <div className={`${styles.section} ${className}`}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>🔗</span>
          <span>Similar RTIs</span>
        </div>
        {totalCount > 0 && (
          <a href="/browse" className={styles.viewAllLink}>
            View all {totalCount.toLocaleString()} →
          </a>
        )}
      </div>

      <div className={styles.grid}>
        {displayedRTIs.map((rti) => (
          <a key={rti.id} href={`/rti/${rti.id}`} className={styles.card}>
            <div className={styles.cardHeader}>
              {getStatusBadge(rti.status)}
              <div className={styles.days}>{rti.daysElapsed}d</div>
            </div>

            <div className={styles.cardTitle}>{rti.title}</div>

            <div className={styles.cardMeta}>
              <div className={styles.metaItem}>
                <span>🏛️</span>
                <span className={styles.metaValue}>{rti.department}</span>
              </div>
              <div className={styles.metaItem}>
                <span>📍</span>
                <span className={styles.metaValue}>{rti.location}</span>
              </div>
              {rti.highlight && (
                <div className={styles.metaItem}>
                  <span>💰</span>
                  <span className={styles.metaValue}>{rti.highlight}</span>
                </div>
              )}
            </div>
          </a>
        ))}
      </div>

      {rtis.length > itemsPerPage && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationBtn}
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            ←
          </button>
          <button
            className={styles.paginationBtn}
            onClick={handleNext}
            disabled={startIndex + itemsPerPage >= rtis.length}
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
