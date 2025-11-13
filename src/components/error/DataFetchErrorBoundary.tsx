'use client'

import React, { ReactNode } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import styles from './DataFetchErrorBoundary.module.css'

/**
 * Props for the DataFetchErrorBoundary component
 */
export interface DataFetchErrorBoundaryProps {
  children: ReactNode
  /**
   * Optional custom title for the error message
   */
  title?: string
  /**
   * Optional custom description for the error
   */
  description?: string
}

/**
 * Error boundary specifically for data fetching errors
 *
 * Provides a lightweight error display suitable for component-level data fetching failures.
 * Use this for smaller sections where a full-page error would be too disruptive.
 *
 * @example
 * ```tsx
 * <DataFetchErrorBoundary title="Failed to load statistics">
 *   <StatisticsWidget />
 * </DataFetchErrorBoundary>
 * ```
 */
export function DataFetchErrorBoundary({
  children,
  title = 'Failed to load data',
  description = 'We encountered an error while fetching the latest data. Please try again.',
}: DataFetchErrorBoundaryProps): JSX.Element {
  return (
    <ErrorBoundary
      context="DataFetch"
      fallback={(error, reset) => (
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>

          <h3 className={styles.errorTitle}>{title}</h3>

          <p className={styles.errorDescription}>{description}</p>

          <button
            className={styles.retryButton}
            onClick={reset}
            type="button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            Try Again
          </button>

          {process.env.NODE_ENV === 'development' && (
            <details className={styles.errorDetails}>
              <summary>Error details (dev only)</summary>
              <pre className={styles.errorStack}>
                {error.message}
                {'\n\n'}
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
