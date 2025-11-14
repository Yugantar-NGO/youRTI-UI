'use client'

/**
 * RTI Dashboard Container Component
 *
 * Container component that handles data fetching and state management.
 * Follows the Container/Presentational pattern.
 * Wraps the presentation component with data and error handling.
 */

import { useRTIDashboardData } from '@/hooks/repositories/useRTIDashboardData'
import { DashboardProvider } from '@/context/DashboardContext'
import { RTIDashboardPresentation } from './RTIDashboardPresentation'
import { DataFetchErrorBoundary } from '@/components/error'
import { CardSkeleton } from '@/components/loading/skeletons'

/**
 * RTI Dashboard Container Component
 *
 * Handles data fetching, loading states, and error handling for the dashboard.
 * Provides dashboard data through context to all child components.
 *
 * Features:
 * - Automatic data fetching on mount
 * - Loading state with skeleton UI
 * - Error handling with retry functionality
 * - Dashboard context provider for child components
 *
 * @returns Dashboard with data loading and error handling
 *
 * @example
 * ```tsx
 * // In a page or parent component
 * <RTIDashboardContainer />
 * ```
 */
export function RTIDashboardContainer(): JSX.Element {
  const dashboardState = useRTIDashboardData({ immediate: true })
  const { data, isLoading, isError, error, isIdle } = dashboardState

  // Loading state (includes idle state before data fetch begins)
  if (isLoading || isIdle) {
    return (
      <div style={{ padding: '2rem' }}>
        <CardSkeleton showImage lines={3} />
        <div style={{ marginTop: '2rem' }}>
          <CardSkeleton showImage lines={2} />
        </div>
        <div style={{ marginTop: '2rem' }}>
          <CardSkeleton showImage={false} lines={4} />
        </div>
      </div>
    )
  }

  // Error state
  if (isError || !data) {
    throw error || new Error('Failed to load dashboard data')
  }

  // Success state - render presentation with data
  return (
    <DashboardProvider value={dashboardState}>
      <RTIDashboardPresentation data={data} />
    </DashboardProvider>
  )
}

/**
 * RTI Dashboard Container with Error Boundary
 *
 * Wraps the container with an error boundary for error recovery.
 * This is the recommended way to use the dashboard container.
 *
 * @returns Dashboard with complete error handling
 *
 * @example
 * ```tsx
 * export default function DashboardPage() {
 *   return <RTIDashboardContainerWithErrorBoundary />
 * }
 * ```
 */
export function RTIDashboardContainerWithErrorBoundary(): JSX.Element {
  return (
    <DataFetchErrorBoundary
      title="Failed to load dashboard"
      description="We encountered an error while loading the RTI dashboard. Please try again."
    >
      <RTIDashboardContainer />
    </DataFetchErrorBoundary>
  )
}
