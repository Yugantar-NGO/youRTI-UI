import { useState, useCallback, useEffect, useRef } from 'react'

/**
 * Async operation state
 */
export type AsyncState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: null; error: Error }

/**
 * Return type for useAsyncState hook
 */
export interface UseAsyncStateReturn<T> {
  /**
   * Current state of the async operation
   */
  state: AsyncState<T>
  /**
   * Convenience boolean for loading state
   */
  isLoading: boolean
  /**
   * Convenience boolean for success state
   */
  isSuccess: boolean
  /**
   * Convenience boolean for error state
   */
  isError: boolean
  /**
   * Convenience boolean for idle state
   */
  isIdle: boolean
  /**
   * The data (null if not in success state)
   */
  data: T | null
  /**
   * The error (null if not in error state)
   */
  error: Error | null
  /**
   * Execute the async function
   */
  execute: (...args: Parameters<() => Promise<T>>) => Promise<T | null>
  /**
   * Reset to idle state
   */
  reset: () => void
}

/**
 * Hook for managing async operation state with loading, error, and success states
 *
 * Provides a clean abstraction over async operations with:
 * - Automatic state management (idle, loading, success, error)
 * - Convenient boolean flags
 * - Type-safe data and error handling
 * - Cleanup on unmount
 *
 * @param asyncFunction - The async function to execute
 * @param immediate - Whether to execute the function immediately on mount
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { data, isLoading, isError, error, execute } = useAsyncState(
 *     async () => fetchUserData(userId)
 *   )
 *
 *   if (isLoading) return <LoadingSkeleton />
 *   if (isError) return <ErrorDisplay error={error} onRetry={execute} />
 *   if (!data) return null
 *
 *   return <UserProfile user={data} />
 * }
 * ```
 */
export function useAsyncState<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  immediate = false
): UseAsyncStateReturn<T> {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
  })

  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true)

  // Execute the async function
  const execute = useCallback(
    async (...args: Parameters<typeof asyncFunction>): Promise<T | null> => {
      setState({
        status: 'loading',
        data: null,
        error: null,
      })

      try {
        const data = await asyncFunction(...args)

        // Only update state if component is still mounted
        if (isMountedRef.current) {
          setState({
            status: 'success',
            data,
            error: null,
          })
        }

        return data
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error(String(error))

        // Only update state if component is still mounted
        if (isMountedRef.current) {
          setState({
            status: 'error',
            data: null,
            error: errorObj,
          })
        }

        return null
      }
    },
    [asyncFunction]
  )

  // Reset to idle state
  const reset = useCallback(() => {
    setState({
      status: 'idle',
      data: null,
      error: null,
    })
  }, [])

  // Execute immediately on mount if requested
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  return {
    state,
    isLoading: state.status === 'loading',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
    isIdle: state.status === 'idle',
    data: state.data,
    error: state.error,
    execute,
    reset,
  }
}

/**
 * Hook for managing multiple async operations
 *
 * Useful when you need to track multiple independent async operations.
 *
 * @example
 * ```tsx
 * function DashboardComponent() {
 *   const states = useMultipleAsyncStates({
 *     users: () => fetchUsers(),
 *     stats: () => fetchStats(),
 *     notifications: () => fetchNotifications()
 *   })
 *
 *   const isAnyLoading = Object.values(states).some(s => s.isLoading)
 *   const allSuccess = Object.values(states).every(s => s.isSuccess)
 *
 *   if (isAnyLoading) return <LoadingSkeleton />
 *   // ...
 * }
 * ```
 */
export function useMultipleAsyncStates<T extends Record<string, () => Promise<any>>>(
  asyncFunctions: T
): {
  [K in keyof T]: UseAsyncStateReturn<Awaited<ReturnType<T[K]>>>
} {
  const states = {} as {
    [K in keyof T]: UseAsyncStateReturn<Awaited<ReturnType<T[K]>>>
  }

  for (const key in asyncFunctions) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    states[key] = useAsyncState(asyncFunctions[key])
  }

  return states
}
