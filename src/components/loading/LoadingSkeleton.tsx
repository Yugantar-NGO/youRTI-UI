import React, { CSSProperties } from 'react'
import styles from './LoadingSkeleton.module.css'

/**
 * Props for the LoadingSkeleton component
 */
export interface LoadingSkeletonProps {
  /**
   * Width of the skeleton (can be px, %, rem, etc.)
   */
  width?: string | number
  /**
   * Height of the skeleton (can be px, %, rem, etc.)
   */
  height?: string | number
  /**
   * Border radius of the skeleton
   */
  borderRadius?: string | number
  /**
   * Shape variant of the skeleton
   */
  variant?: 'text' | 'circular' | 'rectangular'
  /**
   * Optional className for additional styling
   */
  className?: string
  /**
   * Animation variant
   */
  animation?: 'pulse' | 'wave' | 'none'
}

/**
 * Base LoadingSkeleton component for creating loading placeholders
 *
 * A versatile skeleton component that can be used to create loading states
 * for various UI elements. Supports multiple shapes and animations.
 *
 * @example
 * ```tsx
 * // Text skeleton
 * <LoadingSkeleton variant="text" width="200px" />
 *
 * // Avatar skeleton
 * <LoadingSkeleton variant="circular" width={40} height={40} />
 *
 * // Card skeleton
 * <LoadingSkeleton variant="rectangular" width="100%" height="200px" />
 * ```
 */
export function LoadingSkeleton({
  width = '100%',
  height,
  borderRadius,
  variant = 'rectangular',
  className = '',
  animation = 'pulse',
}: LoadingSkeletonProps): JSX.Element {
  const style: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }

  // Set default heights for variants if not provided
  if (!height) {
    if (variant === 'text') {
      style.height = '1rem'
    } else if (variant === 'circular') {
      style.height = typeof width === 'number' ? `${width}px` : width
    }
  }

  // Set border radius based on variant
  if (borderRadius !== undefined) {
    style.borderRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius
  } else if (variant === 'circular') {
    style.borderRadius = '50%'
  } else if (variant === 'text') {
    style.borderRadius = '4px'
  }

  const classes = [
    styles.skeleton,
    styles[variant],
    animation !== 'none' ? styles[animation] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes} style={style} aria-busy="true" aria-live="polite" />
}
