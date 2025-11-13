import React from 'react'
import { LoadingSkeleton } from '../LoadingSkeleton'
import styles from './TextSkeleton.module.css'

/**
 * Props for the TextSkeleton component
 */
export interface TextSkeletonProps {
  /**
   * Number of text lines to display
   */
  lines?: number
  /**
   * Optional className for additional styling
   */
  className?: string
  /**
   * Spacing between lines
   */
  spacing?: 'tight' | 'normal' | 'loose'
}

/**
 * TextSkeleton component for loading text placeholders
 *
 * Provides a skeleton layout for text content with:
 * - Configurable number of lines
 * - Variable line widths for natural appearance
 * - Configurable spacing
 *
 * @example
 * ```tsx
 * <TextSkeleton lines={4} spacing="normal" />
 * ```
 */
export function TextSkeleton({
  lines = 3,
  spacing = 'normal',
  className = '',
}: TextSkeletonProps): JSX.Element {
  // Calculate varied widths for more natural appearance
  const getWidth = (index: number, total: number): string => {
    if (index === total - 1) {
      // Last line is shorter
      return '60%'
    }
    if (index === 0) {
      // First line can be a title (wider)
      return '90%'
    }
    // Middle lines vary slightly
    return index % 2 === 0 ? '95%' : '100%'
  }

  return (
    <div className={`${styles.textSkeleton} ${styles[spacing]} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <LoadingSkeleton
          key={index}
          variant="text"
          width={getWidth(index, lines)}
          height={index === 0 ? '1.25rem' : '1rem'}
        />
      ))}
    </div>
  )
}
