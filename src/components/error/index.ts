/**
 * Error handling components and utilities
 *
 * This module exports error boundaries, error display components, and HOCs
 * for consistent error handling across the application.
 *
 * @example
 * ```tsx
 * import { ErrorBoundary, DashboardErrorBoundary, ErrorDisplay } from '@/components/error'
 *
 * // Wrap components with error boundaries
 * <DashboardErrorBoundary>
 *   <MyDashboard />
 * </DashboardErrorBoundary>
 * ```
 */

export { ErrorBoundary } from './ErrorBoundary'
export type { ErrorBoundaryProps } from './ErrorBoundary'

export { DashboardErrorBoundary } from './DashboardErrorBoundary'
export type { DashboardErrorBoundaryProps } from './DashboardErrorBoundary'

export { DataFetchErrorBoundary } from './DataFetchErrorBoundary'
export type { DataFetchErrorBoundaryProps } from './DataFetchErrorBoundary'

export { ErrorDisplay } from './ErrorDisplay'
export type { ErrorDisplayProps } from './ErrorDisplay'

export { withErrorBoundary, errorBoundary } from './withErrorBoundary'
export type { WithErrorBoundaryOptions } from './withErrorBoundary'
