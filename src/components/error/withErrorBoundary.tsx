import React, { ComponentType, ReactNode } from 'react'
import { ErrorBoundary, ErrorBoundaryProps } from './ErrorBoundary'

/**
 * Options for the withErrorBoundary HOC
 */
export interface WithErrorBoundaryOptions {
  /**
   * Optional custom fallback UI
   */
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  /**
   * Optional callback when an error is caught
   */
  onError?: ErrorBoundaryProps['onError']
  /**
   * Optional context identifier for error logging
   */
  context?: string
}

/**
 * Higher-Order Component that wraps a component with an ErrorBoundary
 *
 * Provides an easy way to add error boundary protection to any component
 * without manually wrapping it.
 *
 * @param Component - The component to wrap
 * @param options - Configuration options for the error boundary
 *
 * @example
 * ```tsx
 * const SafeDashboard = withErrorBoundary(Dashboard, {
 *   context: 'Dashboard',
 *   fallback: (error, reset) => (
 *     <ErrorDisplay error={error} onRetry={reset} />
 *   )
 * })
 * ```
 *
 * @example
 * ```tsx
 * // Simple usage with defaults
 * const SafeComponent = withErrorBoundary(MyComponent)
 * ```
 */
export function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
): ComponentType<P> {
  const { fallback, onError, context } = options

  const WrappedComponent = (props: P) => {
    return (
      <ErrorBoundary fallback={fallback} onError={onError} context={context || Component.name}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }

  // Preserve component name for debugging
  WrappedComponent.displayName = `withErrorBoundary(${
    Component.displayName || Component.name || 'Component'
  })`

  return WrappedComponent
}

/**
 * Decorator variant of withErrorBoundary for use with class components
 *
 * @example
 * ```tsx
 * @errorBoundary({ context: 'MyClass' })
 * class MyComponent extends Component {
 *   render() {
 *     return <div>...</div>
 *   }
 * }
 * ```
 */
export function errorBoundary(options: WithErrorBoundaryOptions = {}) {
  return function <P extends object>(Component: ComponentType<P>): ComponentType<P> {
    return withErrorBoundary(Component, options)
  }
}
