/**
 * Custom hook for fetching landing page data
 *
 * Provides a React hook interface to the LandingPageRepository with
 * built-in loading states, error handling, and refetch capabilities.
 */

import { useAsyncState } from '../useAsyncState'
import { LandingPageRepository, LandingPageData } from '@/services/repositories/LandingPageRepository'

/**
 * Hook options
 */
export interface UseLandingPageDataOptions {
  /**
   * Whether to fetch data immediately on mount
   */
  immediate?: boolean
}

/**
 * Hook return type
 */
export interface UseLandingPageDataReturn {
  /**
   * The landing page data
   */
  data: LandingPageData | null
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
  refetch: () => Promise<LandingPageData | null>
  /**
   * Success state
   */
  isSuccess: boolean
}

/**
 * Custom hook for fetching landing page data
 *
 * Leverages useAsyncState for consistent async operation handling
 * and provides a clean API for components.
 *
 * @param options - Hook configuration options
 * @returns Landing page data with loading/error states and refetch function
 *
 * @example
 * ```tsx
 * function LandingPage() {
 *   const { data, isLoading, isError, error, refetch } = useLandingPageData({
 *     immediate: true
 *   })
 *
 *   if (isLoading) return <LoadingSkeleton />
 *   if (isError) return <ErrorDisplay error={error} onRetry={refetch} />
 *   if (!data) return null
 *
 *   return <Dashboard data={data} />
 * }
 * ```
 */
export function useLandingPageData(
  options: UseLandingPageDataOptions = {}
): UseLandingPageDataReturn {
  const { immediate = false } = options

  const {
    data,
    isLoading,
    isError,
    error,
    execute,
    isSuccess,
  } = useAsyncState(
    async () => LandingPageRepository.getLandingPageData(),
    immediate
  )

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: execute,
    isSuccess,
  }
}
