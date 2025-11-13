import { ErrorInfo } from 'react'

/**
 * Error log entry structure
 */
export interface ErrorLogEntry {
  error: Error
  errorInfo?: ErrorInfo
  context?: string
  timestamp: string
  userAgent?: string
  url?: string
  additionalData?: Record<string, unknown>
}

/**
 * Error logging service interface
 */
export interface ErrorLogger {
  log(entry: ErrorLogEntry): void
  logError(error: Error, context?: string): void
  logMessage(message: string, level: 'info' | 'warn' | 'error'): void
}

/**
 * Console-based error logger implementation
 * In production, this should be replaced with a service like Sentry, LogRocket, etc.
 */
class ConsoleErrorLogger implements ErrorLogger {
  /**
   * Log a full error entry
   */
  log(entry: ErrorLogEntry): void {
    const logData = {
      ...entry,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A',
      url: typeof window !== 'undefined' ? window.location.href : 'N/A',
    }

    console.error('[Error Logger]', {
      context: logData.context || 'Unknown',
      timestamp: logData.timestamp,
      message: logData.error.message,
      stack: logData.error.stack,
      componentStack: logData.errorInfo?.componentStack,
      url: logData.url,
      userAgent: logData.userAgent,
      additionalData: logData.additionalData,
    })

    // In production, send to error tracking service
    // Example: Sentry.captureException(entry.error, { contexts: { react: entry.errorInfo } })
  }

  /**
   * Log a simple error with context
   */
  logError(error: Error, context?: string): void {
    this.log({
      error,
      context,
      timestamp: new Date().toISOString(),
    })
  }

  /**
   * Log a message with severity level
   */
  logMessage(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
    const timestamp = new Date().toISOString()
    const logEntry = {
      message,
      level,
      timestamp,
      url: typeof window !== 'undefined' ? window.location.href : 'N/A',
    }

    switch (level) {
      case 'error':
        console.error('[Error Logger]', logEntry)
        break
      case 'warn':
        console.warn('[Error Logger]', logEntry)
        break
      case 'info':
      default:
        console.info('[Error Logger]', logEntry)
        break
    }

    // In production, send to logging service
    // Example: Sentry.captureMessage(message, level)
  }
}

/**
 * Singleton instance of the error logger
 */
export const errorLogger: ErrorLogger = new ConsoleErrorLogger()

/**
 * Utility function to create error logger with Sentry integration
 * Call this in your app initialization with your Sentry DSN
 *
 * @example
 * ```ts
 * if (process.env.NODE_ENV === 'production') {
 *   initSentryLogger({
 *     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
 *     environment: process.env.NODE_ENV,
 *   })
 * }
 * ```
 */
export function initSentryLogger(config: {
  dsn: string
  environment: string
  tracesSampleRate?: number
}): void {
  // Placeholder for Sentry initialization
  // In a real implementation:
  // import * as Sentry from '@sentry/nextjs'
  // Sentry.init({ ...config })

  console.info('[Error Logger] Sentry integration would be initialized here with config:', config)
}
