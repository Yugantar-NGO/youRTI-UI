/**
 * Generic repository hook factory
 *
 * Creates custom hooks for any repository method with consistent
 * loading states, error handling, and caching support.
 */

import { useAsyncState } from '../useAsyncState'
import { useCallback } from 'react'

/**
 * Options for repository hooks
 */
export interface UseRepositoryOptions<TArgs extends any[]> {
  /**
   * Whether to fetch data immediately on mount
   */
  immediate?: boolean
  /**
   * Initial arguments if immediate is true
   */
  initialArgs?: TArgs
  /**
   * Callback when data is successfully fetched
   */
  onSuccess?: (data: any) => void
  /**
   * Callback when an error occurs
   */
  onError?: (error: Error) => void
}

/**
 * Return type for repository hooks
 */
export interface UseRepositoryReturn<TData, TArgs extends any[]> {
  /**
   * The fetched data
   */
  data: TData | null
  /**
   * Loading state
   */
  isLoading: boolean
  /**
   * Error state
   */
  isError: boolean
  /**
   * Success state
   */
  isSuccess: boolean
  /**
   * Idle state
   */
  isIdle: boolean
  /**
   * Error object if error occurred
   */
  error: Error | null
  /**
   * Execute the repository method
   */
  execute: (...args: TArgs) => Promise<TData | null>
  /**
   * Reset to idle state
   */
  reset: () => void
}

/**
 * Create a custom hook for a repository method
 *
 * Factory function that creates type-safe hooks for any repository method.
 * Handles async state management, error handling, and provides a consistent API.
 *
 * @param repositoryMethod - The repository method to wrap
 * @returns A custom hook for the repository method
 *
 * @example
 * ```tsx
 * // Create a hook for a repository method
 * const useUsers = createRepositoryHook(
 *   (filters?: UserFilters) => UserRepository.getUsers(filters)
 * )
 *
 * // Use in a component
 * function UserList() {
 *   const { data, isLoading, execute } = useUsers({
 *     immediate: true,
 *     initialArgs: [{ active: true }]
 *   })
 *
 *   return isLoading ? <LoadingSkeleton /> : <UserTable users={data} />
 * }
 * ```
 */
export function createRepositoryHook<TData, TArgs extends any[] = []>(
  repositoryMethod: (...args: TArgs) => Promise<TData>
) {
  return function useRepositoryHook(
    options: UseRepositoryOptions<TArgs> = {}
  ): UseRepositoryReturn<TData, TArgs> {
    const {
      immediate = false,
      initialArgs = [] as unknown as TArgs,
      onSuccess,
      onError,
    } = options

    const asyncFunction = useCallback(
      async (...args: TArgs) => {
        try {
          const result = await repositoryMethod(...args)
          if (onSuccess) {
            onSuccess(result)
          }
          return result
        } catch (error) {
          if (onError && error instanceof Error) {
            onError(error)
          }
          throw error
        }
      },
      [onSuccess, onError]
    )

    const {
      data,
      isLoading,
      isError,
      isSuccess,
      isIdle,
      error,
      execute,
      reset,
    } = useAsyncState(asyncFunction, false)

    // Execute immediately if requested
    if (immediate && isIdle) {
      execute(...initialArgs)
    }

    return {
      data,
      isLoading,
      isError,
      isSuccess,
      isIdle,
      error,
      execute,
      reset,
    }
  }
}

/**
 * Create a hook with mutation semantics
 *
 * Similar to createRepositoryHook but optimized for mutations (POST, PUT, DELETE).
 * Does not execute immediately and provides better semantics for write operations.
 *
 * @param mutationMethod - The mutation method to wrap
 * @returns A custom mutation hook
 *
 * @example
 * ```tsx
 * // Create a mutation hook
 * const useCreateUser = createMutationHook(
 *   (userData: UserData) => UserRepository.createUser(userData)
 * )
 *
 * // Use in a component
 * function CreateUserForm() {
 *   const { execute: createUser, isLoading } = useCreateUser({
 *     onSuccess: () => toast.success('User created'),
 *     onError: (error) => toast.error(error.message)
 *   })
 *
 *   const handleSubmit = (data) => createUser(data)
 *
 *   return <form onSubmit={handleSubmit}>...</form>
 * }
 * ```
 */
export function createMutationHook<TData, TArgs extends any[] = []>(
  mutationMethod: (...args: TArgs) => Promise<TData>
) {
  return function useMutationHook(
    options: Omit<UseRepositoryOptions<TArgs>, 'immediate' | 'initialArgs'> = {}
  ): Omit<UseRepositoryReturn<TData, TArgs>, 'isIdle'> & {
    mutate: (...args: TArgs) => Promise<TData | null>
  } {
    const { onSuccess, onError } = options

    const asyncFunction = useCallback(
      async (...args: TArgs) => {
        try {
          const result = await mutationMethod(...args)
          if (onSuccess) {
            onSuccess(result)
          }
          return result
        } catch (error) {
          if (onError && error instanceof Error) {
            onError(error)
          }
          throw error
        }
      },
      [onSuccess, onError]
    )

    const {
      data,
      isLoading,
      isError,
      isSuccess,
      error,
      execute,
      reset,
    } = useAsyncState(asyncFunction, false)

    return {
      data,
      isLoading,
      isError,
      isSuccess,
      error,
      mutate: execute,
      execute,
      reset,
    }
  }
}
