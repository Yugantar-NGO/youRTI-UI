import React from 'react'
import { LoadingSkeleton } from '../LoadingSkeleton'
import styles from './CardSkeleton.module.css'

/**
 * Props for the CardSkeleton component
 */
export interface CardSkeletonProps {
  /**
   * Whether to show an image placeholder
   */
  showImage?: boolean
  /**
   * Number of text lines to show
   */
  lines?: number
  /**
   * Whether to show action buttons
   */
  showActions?: boolean
  /**
   * Optional className for additional styling
   */
  className?: string
}

/**
 * CardSkeleton component for loading card placeholders
 *
 * Provides a pre-configured skeleton layout for card components with:
 * - Optional image placeholder
 * - Configurable text lines
 * - Optional action buttons
 *
 * @example
 * ```tsx
 * <CardSkeleton showImage lines={3} showActions />
 * ```
 */
export function CardSkeleton({
  showImage = true,
  lines = 3,
  showActions = false,
  className = '',
}: CardSkeletonProps): JSX.Element {
  return (
    <div className={`${styles.cardSkeleton} ${className}`}>
      {showImage && (
        <LoadingSkeleton
          variant="rectangular"
          width="100%"
          height="200px"
          borderRadius="8px 8px 0 0"
        />
      )}

      <div className={styles.cardContent}>
        {/* Title */}
        <LoadingSkeleton variant="text" width="80%" height="1.5rem" />

        {/* Description lines */}
        <div className={styles.textLines}>
          {Array.from({ length: lines }).map((_, index) => (
            <LoadingSkeleton
              key={index}
              variant="text"
              width={index === lines - 1 ? '60%' : '100%'}
              height="1rem"
            />
          ))}
        </div>

        {/* Action buttons */}
        {showActions && (
          <div className={styles.actions}>
            <LoadingSkeleton variant="rectangular" width="100px" height="36px" borderRadius="4px" />
            <LoadingSkeleton variant="rectangular" width="80px" height="36px" borderRadius="4px" />
          </div>
        )}
      </div>
    </div>
  )
}
