/**
 * Custom hook for fetching RTI Dashboard data
 *
 * Provides dashboard data with enriched questions including hook lines.
 * Uses the DashboardDataTransformationStrategy to transform raw data.
 */

import { useAsyncState } from '../useAsyncState'
import { LandingPageRepository } from '@/services/repositories/LandingPageRepository'
import {
  DashboardDataTransformationStrategy,
  DashboardData,
} from '@/services/repositories/strategies/DashboardDataTransformer'

/**
 * Hook options
 */
export interface UseRTIDashboardDataOptions {
  /**
   * Whether to fetch data immediately on mount
   */
  immediate?: boolean
}

/**
 * Hook return type
 */
export interface UseRTIDashboardDataReturn {
  /**
   * The dashboard data with enriched questions
   */
  data: DashboardData | null
  /**
   * Loading state
   */
  isLoading: boolean
  /**
   * Error state
   */
  isError: boolean
  /**
   * Error object if error occurred
   */
  error: Error | null
  /**
   * Refetch the data
   */
  refetch: () => Promise<DashboardData | null>
  /**
   * Success state
   */
  isSuccess: boolean
  /**
   * Idle state (before data fetch begins)
   */
  isIdle: boolean
}

// Singleton transformation strategy instance
const transformer = new DashboardDataTransformationStrategy()

/**
 * Custom hook for fetching RTI Dashboard data
 *
 * Fetches landing page data and transforms it into dashboard-ready format
 * with enriched questions including hook lines for display.
 *
 * @param options - Hook configuration options
 * @returns Dashboard data with loading/error states and refetch function
 *
 * @example
 * ```tsx
 * function RTIDashboard() {
 *   const { data, isLoading, isError, error, refetch } = useRTIDashboardData({
 *     immediate: true
 *   })
 *
 *   if (isLoading) return <DashboardSkeleton />
 *   if (isError) return <ErrorDisplay error={error} onRetry={refetch} />
 *   if (!data) return null
 *
 *   return (
 *     <>
 *       <HeroSection />
 *       <PeopleAreAsking questions={data.dailyEdition.recentQuestions} />
 *     </>
 *   )
 * }
 * ```
 */
export function useRTIDashboardData(
  options: UseRTIDashboardDataOptions = {}
): UseRTIDashboardDataReturn {
  const { immediate = false } = options

  const {
    data: rawData,
    isLoading,
    isError,
    error,
    execute,
    isSuccess,
    isIdle,
  } = useAsyncState(
    async () => {
      // Fetch raw data from repository
      const landingPageData = await LandingPageRepository.getLandingPageData()

      // Transform to dashboard data
      const dashboardData = transformer.transform(landingPageData)

      return dashboardData
    },
    immediate
  )

  return {
    data: rawData,
    isLoading,
    isError,
    error,
    refetch: execute,
    isSuccess,
    isIdle,
  }
}
