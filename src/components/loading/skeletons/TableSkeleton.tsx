import React from 'react'
import { LoadingSkeleton } from '../LoadingSkeleton'
import styles from './TableSkeleton.module.css'

/**
 * Props for the TableSkeleton component
 */
export interface TableSkeletonProps {
  /**
   * Number of rows to display
   */
  rows?: number
  /**
   * Number of columns to display
   */
  columns?: number
  /**
   * Whether to show a header row
   */
  showHeader?: boolean
  /**
   * Optional className for additional styling
   */
  className?: string
}

/**
 * TableSkeleton component for loading table placeholders
 *
 * Provides a skeleton layout for data tables with:
 * - Configurable rows and columns
 * - Optional header row
 * - Responsive design
 *
 * @example
 * ```tsx
 * <TableSkeleton rows={5} columns={4} showHeader />
 * ```
 */
export function TableSkeleton({
  rows = 5,
  columns = 4,
  showHeader = true,
  className = '',
}: TableSkeletonProps): JSX.Element {
  return (
    <div className={`${styles.tableSkeleton} ${className}`}>
      {/* Header */}
      {showHeader && (
        <div className={styles.tableHeader}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={`header-${colIndex}`} className={styles.headerCell}>
              <LoadingSkeleton variant="text" width="70%" height="1rem" />
            </div>
          ))}
        </div>
      )}

      {/* Rows */}
      <div className={styles.tableBody}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className={styles.tableRow}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={`cell-${rowIndex}-${colIndex}`} className={styles.tableCell}>
                <LoadingSkeleton
                  variant="text"
                  width={colIndex === 0 ? '90%' : '80%'}
                  height="0.875rem"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
