/**
 * ErrorBoundary Component Tests
 *
 * Tests cover:
 * - Error catching functionality
 * - Fallback UI rendering
 * - Error recovery (reset functionality)
 * - Error logging
 * - Custom fallback support
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { ErrorBoundary } from '../ErrorBoundary'
import { errorLogger } from '@/services/errorLogging'

// Mock the error logger
jest.mock('@/services/errorLogging', () => ({
  errorLogger: {
    log: jest.fn(),
  },
}))

// Component that throws an error
const ThrowError: React.FC<{ shouldThrow: boolean; message?: string }> = ({ shouldThrow, message = 'Test error' }) => {
  if (shouldThrow) {
    throw new Error(message)
  }
  return <div>Success</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks()
    // Suppress console.error for cleaner test output
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('Error Catching', () => {
    it('should catch errors from child components', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      )

      expect(screen.getByText('Success')).toBeInTheDocument()
    })

    it('should catch errors with custom messages', () => {
      const customMessage = 'Custom error message'
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} message={customMessage} />
        </ErrorBoundary>
      )

      // Open details to see error message
      const details = screen.getByText('Error details')
      fireEvent.click(details)

      expect(screen.getByText(new RegExp(customMessage))).toBeInTheDocument()
    })
  })

  describe('Error Logging', () => {
    it('should log errors to errorLogger', () => {
      render(
        <ErrorBoundary context="TestComponent">
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(errorLogger.log).toHaveBeenCalled()
      const logCall = (errorLogger.log as jest.MockedFunction<typeof errorLogger.log>).mock.calls[0][0]
      expect(logCall.context).toBe('TestComponent')
      expect(logCall.error).toBeInstanceOf(Error)
    })

    it('should call onError callback when provided', () => {
      const onError = jest.fn()

      render(
        <ErrorBoundary onError={onError}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(onError).toHaveBeenCalled()
    })

    it('should use default context when not provided', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(errorLogger.log).toHaveBeenCalled()
      const logCall = (errorLogger.log as jest.MockedFunction<typeof errorLogger.log>).mock.calls[0][0]
      expect(logCall.context).toBe('ErrorBoundary')
    })
  })

  describe('Fallback UI', () => {
    it('should render default fallback UI', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(screen.getByText(/We encountered an unexpected error/)).toBeInTheDocument()
      expect(screen.getByText('Try again')).toBeInTheDocument()
    })

    it('should render custom fallback ReactNode', () => {
      const CustomFallback = <div>Custom Error UI</div>

      render(
        <ErrorBoundary fallback={CustomFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      expect(screen.getByText('Custom Error UI')).toBeInTheDocument()
      expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
    })

    it('should render custom fallback function', () => {
      const CustomFallbackFunction = (error: Error, reset: () => void) => (
        <div>
          <p>Error occurred: {error.message}</p>
          <button onClick={reset}>Retry</button>
        </div>
      )

      render(
        <ErrorBoundary fallback={CustomFallbackFunction}>
          <ThrowError shouldThrow={true} message="Custom message" />
        </ErrorBoundary>
      )

      expect(screen.getByText(/Error occurred: Custom message/)).toBeInTheDocument()
    })
  })

  describe('Error Recovery', () => {
    it('should reset error state when Try again button is clicked', () => {
      let shouldThrow = true
      const TestComponent = () => <ThrowError shouldThrow={shouldThrow} />

      const { rerender } = render(
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
      )

      // Error should be displayed
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()

      // Reset the error condition
      shouldThrow = false

      // Click retry button
      const retryButton = screen.getByText('Try again')
      fireEvent.click(retryButton)

      // Component should be rendered again
      rerender(
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
      )

      expect(screen.getByText('Success')).toBeInTheDocument()
    })

    it('should call reset function in custom fallback', () => {
      let shouldThrow = true
      const TestComponent = () => <ThrowError shouldThrow={shouldThrow} />

      const CustomFallback = (_error: Error, reset: () => void) => (
        <button onClick={reset}>Custom Retry</button>
      )

      const { rerender } = render(
        <ErrorBoundary fallback={CustomFallback}>
          <TestComponent />
        </ErrorBoundary>
      )

      shouldThrow = false

      const retryButton = screen.getByText('Custom Retry')
      fireEvent.click(retryButton)

      rerender(
        <ErrorBoundary fallback={CustomFallback}>
          <TestComponent />
        </ErrorBoundary>
      )

      expect(screen.getByText('Success')).toBeInTheDocument()
    })
  })

  describe('Error Details', () => {
    it('should show error details in expandable section', () => {
      const errorMessage = 'Detailed error message'

      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} message={errorMessage} />
        </ErrorBoundary>
      )

      const detailsButton = screen.getByText('Error details')
      fireEvent.click(detailsButton)

      expect(screen.getByText(new RegExp(errorMessage))).toBeInTheDocument()
    })

    it('should show error stack trace', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      const detailsButton = screen.getByText('Error details')
      fireEvent.click(detailsButton)

      // Stack trace should contain the component name
      expect(screen.getByText(/ThrowError/)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible error message', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      const heading = screen.getByText('Something went wrong')
      expect(heading.tagName).toBe('H2')
    })

    it('should have accessible retry button', () => {
      render(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      )

      const retryButton = screen.getByRole('button', { name: /try again/i })
      expect(retryButton).toBeInTheDocument()
    })
  })
})
