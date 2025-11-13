'use client'

import React, { ReactNode } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import styles from './DashboardErrorBoundary.module.css'

/**
 * Props for the DashboardErrorBoundary component
 */
export interface DashboardErrorBoundaryProps {
  children: ReactNode
}

/**
 * Dashboard-specific error boundary with custom fallback UI
 *
 * Provides a dashboard-themed error display with:
 * - Contextual error message
 * - Refresh action
 * - Contact support link
 *
 * @example
 * ```tsx
 * <DashboardErrorBoundary>
 *   <RTIDashboard />
 * </DashboardErrorBoundary>
 * ```
 */
export function DashboardErrorBoundary({ children }: DashboardErrorBoundaryProps): JSX.Element {
  return (
    <ErrorBoundary
      context="Dashboard"
      fallback={(error, reset) => (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <div className={styles.errorIcon}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h1 className={styles.errorTitle}>Dashboard Temporarily Unavailable</h1>

            <p className={styles.errorMessage}>
              We encountered an error while loading the RTI dashboard. This could be due to a
              temporary issue with data loading or network connectivity.
            </p>

            <div className={styles.errorDetails}>
              <details>
                <summary>Technical details</summary>
                <pre className={styles.errorStack}>
                  <code>{error.message}</code>
                </pre>
              </details>
            </div>

            <div className={styles.errorActions}>
              <button
                className={styles.primaryButton}
                onClick={() => {
                  reset()
                  // Optionally reload the page if reset doesn't work
                  if (typeof window !== 'undefined') {
                    window.location.reload()
                  }
                }}
              >
                Refresh Dashboard
              </button>

              <button
                className={styles.secondaryButton}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/'
                  }
                }}
              >
                Return to Home
              </button>
            </div>

            <p className={styles.supportText}>
              If this problem persists, please{' '}
              <a href="mailto:support@yourti.org" className={styles.supportLink}>
                contact support
              </a>
              .
            </p>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}
