import React, { ComponentType } from 'react'
import { useAsyncState } from '@/hooks/useAsyncState'
import { DataFetchErrorBoundary } from '@/components/error'
import { CardSkeleton } from '@/components/loading/skeletons'

/**
 * Options for withDataFetching HOC
 */
export interface WithDataFetchingOptions<TData> {
  /**
   * Function to fetch data
   */
  fetcher: () => Promise<TData>
  /**
   * Custom loading component
   */
  LoadingComponent?: ComponentType
  /**
   * Custom error component
   */
  ErrorComponent?: ComponentType<{ error: Error; retry: () => void }>
  /**
   * Error boundary title
   */
  errorTitle?: string
  /**
   * Error boundary description
   */
  errorDescription?: string
  /**
   * Whether to fetch immediately on mount
   */
  immediate?: boolean
}

/**
 * Props injected by withDataFetching HOC
 */
export interface InjectedDataProps<TData> {
  /**
   * The fetched data
   */
  data: TData
  /**
   * Function to refetch data
   */
  refetch: () => Promise<TData | null>
  /**
   * Loading state
   */
  isLoading: boolean
  /**
   * Error state
   */
  isError: boolean
}

/**
 * Higher-Order Component for data fetching
 *
 * Wraps a component with data fetching logic, loading states, and error handling.
 * Follows the HOC pattern for consistent data loading across components.
 *
 * @param Component - The component to wrap
 * @param options - Configuration options
 * @returns Wrapped component with data fetching
 *
 * @example
 * ```tsx
 * interface UserListProps {
 *   data: User[]
 *   refetch: () => Promise<User[] | null>
 * }
 *
 * function UserListComponent({ data, refetch }: UserListProps) {
 *   return (
 *     <div>
 *       {data.map(user => <UserCard key={user.id} user={user} />)}
 *       <button onClick={refetch}>Refresh</button>
 *     </div>
 *   )
 * }
 *
 * export const UserList = withDataFetching(UserListComponent, {
 *   fetcher: () => UserRepository.getUsers(),
 *   errorTitle: 'Failed to load users',
 *   immediate: true
 * })
 * ```
 */
export function withDataFetching<TData, TProps extends InjectedDataProps<TData>>(
  Component: ComponentType<TProps>,
  options: WithDataFetchingOptions<TData>
): ComponentType<Omit<TProps, keyof InjectedDataProps<TData>>> {
  const {
    fetcher,
    LoadingComponent,
    ErrorComponent,
    errorTitle = 'Failed to load data',
    errorDescription = 'An error occurred while fetching data. Please try again.',
    immediate = true,
  } = options

  const WrappedComponent = (props: Omit<TProps, keyof InjectedDataProps<TData>>) => {
    const { data, isLoading, isError, error, execute } = useAsyncState(
      fetcher,
      immediate
    )

    // Loading state
    if (isLoading) {
      return LoadingComponent ? (
        <LoadingComponent />
      ) : (
        <div style={{ padding: '2rem' }}>
          <CardSkeleton showImage lines={3} />
        </div>
      )
    }

    // Error state
    if (isError || !data) {
      if (ErrorComponent && error) {
        return <ErrorComponent error={error} retry={execute} />
      }

      // Throw error to be caught by error boundary
      throw error || new Error('Failed to fetch data')
    }

    // Success state - render component with data
    const injectedProps: InjectedDataProps<TData> = {
      data,
      refetch: execute,
      isLoading,
      isError,
    }

    return <Component {...(props as TProps)} {...injectedProps} />
  }

  // Preserve component name for debugging
  WrappedComponent.displayName = `withDataFetching(${
    Component.displayName || Component.name || 'Component'
  })`

  // Wrap with error boundary
  return function WithErrorBoundary(
    props: Omit<TProps, keyof InjectedDataProps<TData>>
  ) {
    return (
      <DataFetchErrorBoundary title={errorTitle} description={errorDescription}>
        <WrappedComponent {...props} />
      </DataFetchErrorBoundary>
    )
  }
}

/**
 * Variant of withDataFetching for components that need props to fetch data
 *
 * Allows passing props to the fetcher function.
 *
 * @example
 * ```tsx
 * interface UserProfileProps {
 *   userId: string
 *   data: User
 *   refetch: () => void
 * }
 *
 * function UserProfileComponent({ userId, data, refetch }: UserProfileProps) {
 *   return <div>{data.name}</div>
 * }
 *
 * export const UserProfile = withDataFetchingProps(
 *   UserProfileComponent,
 *   (props: { userId: string }) => () => UserRepository.getUser(props.userId),
 *   { immediate: true }
 * )
 * ```
 */
export function withDataFetchingProps<
  TData,
  TProps extends InjectedDataProps<TData>,
  TFetcherProps = {}
>(
  Component: ComponentType<TProps>,
  fetcherFactory: (props: TFetcherProps) => () => Promise<TData>,
  options: Omit<WithDataFetchingOptions<TData>, 'fetcher'> = {}
): ComponentType<Omit<TProps, keyof InjectedDataProps<TData>> & TFetcherProps> {
  const WrappedComponent = (
    props: Omit<TProps, keyof InjectedDataProps<TData>> & TFetcherProps
  ) => {
    const fetcher = fetcherFactory(props as TFetcherProps)
    const ComponentWithFetching = withDataFetching(Component, {
      ...options,
      fetcher,
    })

    return <ComponentWithFetching {...(props as any)} />
  }

  WrappedComponent.displayName = `withDataFetchingProps(${
    Component.displayName || Component.name || 'Component'
  })`

  return WrappedComponent
}
