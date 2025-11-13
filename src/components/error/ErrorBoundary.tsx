'use client'

import React, { Component, ReactNode, ErrorInfo } from 'react'
import { errorLogger } from '@/services/errorLogging'

/**
 * Props for the ErrorBoundary component
 */
export interface ErrorBoundaryProps {
  /**
   * The children components to render
   */
  children: ReactNode
  /**
   * Optional custom fallback UI to display when an error occurs
   */
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  /**
   * Optional callback when an error is caught
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  /**
   * Optional context identifier for error logging
   */
  context?: string
}

/**
 * State for the ErrorBoundary component
 */
interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Base ErrorBoundary component for catching and handling React errors
 *
 * Features:
 * - Catches errors in child components
 * - Logs errors with context
 * - Provides error recovery via reset
 * - Supports custom fallback UI
 *
 * @example
 * ```tsx
 * <ErrorBoundary context="Dashboard">
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  /**
   * Update state when an error is caught
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  /**
   * Log error details when caught
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { onError, context } = this.props

    // Log to error logging service
    errorLogger.log({
      error,
      errorInfo,
      context: context || 'ErrorBoundary',
      timestamp: new Date().toISOString(),
    })

    // Call optional error callback
    if (onError) {
      onError(error, errorInfo)
    }
  }

  /**
   * Reset the error boundary state
   */
  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render(): ReactNode {
    const { hasError, error } = this.state
    const { children, fallback } = this.props

    if (hasError && error) {
      // If custom fallback is provided, use it
      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback(error, this.resetErrorBoundary)
        }
        return fallback
      }

      // Default fallback UI
      return (
        <div style={{
          padding: '2rem',
          maxWidth: '600px',
          margin: '2rem auto',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#fff',
        }}>
          <h2 style={{ color: '#d32f2f', marginBottom: '1rem' }}>
            Something went wrong
          </h2>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            We encountered an unexpected error. Please try again.
          </p>
          <details style={{ marginBottom: '1rem' }}>
            <summary style={{ cursor: 'pointer', color: '#1976d2' }}>
              Error details
            </summary>
            <pre style={{
              marginTop: '0.5rem',
              padding: '1rem',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '0.875rem',
            }}>
              {error.message}
              {'\n\n'}
              {error.stack}
            </pre>
          </details>
          <button
            onClick={this.resetErrorBoundary}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Try again
          </button>
        </div>
      )
    }

    return children
  }
}
