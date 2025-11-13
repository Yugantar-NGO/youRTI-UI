import React from 'react'
import styles from './ErrorDisplay.module.css'

/**
 * Props for the ErrorDisplay component
 */
export interface ErrorDisplayProps {
  /**
   * The error object to display
   */
  error: Error | null
  /**
   * Optional title for the error message
   */
  title?: string
  /**
   * Optional description/message
   */
  message?: string
  /**
   * Callback function to retry the failed operation
   */
  onRetry?: () => void
  /**
   * Whether to show technical error details
   * Defaults to true in development, false in production
   */
  showDetails?: boolean
  /**
   * Visual variant of the error display
   */
  variant?: 'full' | 'compact' | 'inline'
}

/**
 * ErrorDisplay component for showing error messages with retry functionality
 *
 * Provides a consistent error UI across the application with:
 * - Configurable error messages
 * - Retry functionality
 * - Optional technical details
 * - Multiple display variants
 *
 * @example
 * ```tsx
 * <ErrorDisplay
 *   error={fetchError}
 *   title="Failed to load data"
 *   onRetry={() => refetch()}
 * />
 * ```
 */
export function ErrorDisplay({
  error,
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  showDetails = process.env.NODE_ENV === 'development',
  variant = 'full',
}: ErrorDisplayProps): JSX.Element {
  const containerClass = `${styles.errorContainer} ${styles[variant]}`

  return (
    <div className={containerClass} role="alert" aria-live="assertive">
      <div className={styles.errorIcon}>
        <svg
          width={variant === 'inline' ? '20' : '48'}
          height={variant === 'inline' ? '20' : '48'}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <div className={styles.errorContent}>
        <h3 className={styles.errorTitle}>{title}</h3>
        <p className={styles.errorMessage}>{message}</p>

        {onRetry && (
          <button
            className={styles.retryButton}
            onClick={onRetry}
            type="button"
            aria-label="Retry operation"
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
              aria-hidden="true"
            >
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            Try Again
          </button>
        )}

        {showDetails && error && (
          <details className={styles.errorDetails}>
            <summary>Technical details</summary>
            <div className={styles.errorDetailsContent}>
              <p className={styles.errorName}>
                <strong>Error:</strong> {error.name}
              </p>
              <p className={styles.errorMessageDetail}>
                <strong>Message:</strong> {error.message}
              </p>
              {error.stack && (
                <pre className={styles.errorStack}>
                  <code>{error.stack}</code>
                </pre>
              )}
            </div>
          </details>
        )}
      </div>
    </div>
  )
}
