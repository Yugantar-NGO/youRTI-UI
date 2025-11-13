/**
 * DashboardContext Tests
 *
 * Tests cover:
 * - Provider renders children correctly
 * - useDashboardContext provides context value
 * - useDashboardContext throws error when used outside provider
 * - useDashboardData returns dashboard data
 * - Context value updates propagate to consumers
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import {
  DashboardProvider,
  useDashboardContext,
  useDashboardData,
  type DashboardContextValue,
} from '../DashboardContext'
import { DashboardData } from '@/services/repositories/strategies/DashboardDataTransformer'

// Mock dashboard data
const mockDashboardData: DashboardData = {
  dailyEdition: {
    editionNumber: 1,
    date: '2024-01-15',
    recentQuestions: [
      {
        id: '1',
        question: 'Test question 1',
        department: 'Test Dept',
        location: 'Test Location',
        daysWaiting: 5,
        hookLine: 'Test hook line 1',
      },
    ],
    bigWin: {
      question: 'Big win question',
      department: 'Big Win Dept',
      responseTime: 3,
      hookLine: 'Big win hook',
    },
    urgentUnanswered: {
      question: 'Urgent question',
      department: 'Urgent Dept',
      daysWaiting: 30,
      hookLine: 'Urgent hook',
    },
  },
  statistics: {
    totalQuestions: 100,
    averageResponseTime: 7,
    resolvedQuestions: 80,
    pendingQuestions: 20,
  },
}

// Mock refetch function
const mockRefetch = jest.fn(async () => mockDashboardData)

// Helper to create mock context value
const createMockContextValue = (
  overrides?: Partial<DashboardContextValue>
): DashboardContextValue => ({
  data: mockDashboardData,
  isLoading: false,
  isError: false,
  error: null,
  refetch: mockRefetch,
  ...overrides,
})

describe('DashboardProvider', () => {
  it('should render children correctly', () => {
    const contextValue = createMockContextValue()

    render(
      <DashboardProvider value={contextValue}>
        <div>Test Child</div>
      </DashboardProvider>
    )

    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('should provide context value to children', () => {
    const contextValue = createMockContextValue()

    const TestComponent = () => {
      const context = useDashboardContext()
      return <div>{context.data?.dailyEdition.editionNumber}</div>
    }

    render(
      <DashboardProvider value={contextValue}>
        <TestComponent />
      </DashboardProvider>
    )

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should update when context value changes', () => {
    const contextValue = createMockContextValue()

    const TestComponent = () => {
      const { data } = useDashboardContext()
      return <div>{data?.dailyEdition.editionNumber ?? 'no-data'}</div>
    }

    const { rerender } = render(
      <DashboardProvider value={contextValue}>
        <TestComponent />
      </DashboardProvider>
    )

    expect(screen.getByText('1')).toBeInTheDocument()

    // Update context value
    const newContextValue = createMockContextValue({
      data: {
        ...mockDashboardData,
        dailyEdition: {
          ...mockDashboardData.dailyEdition,
          editionNumber: 2,
        },
      },
    })

    rerender(
      <DashboardProvider value={newContextValue}>
        <TestComponent />
      </DashboardProvider>
    )

    expect(screen.getByText('2')).toBeInTheDocument()
  })
})

describe('useDashboardContext', () => {
  it('should return context value when used within provider', () => {
    const contextValue = createMockContextValue()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DashboardProvider value={contextValue}>{children}</DashboardProvider>
    )

    const { result } = renderHook(() => useDashboardContext(), { wrapper })

    expect(result.current).toEqual(contextValue)
    expect(result.current.data).toBe(mockDashboardData)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.refetch).toBe(mockRefetch)
  })

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = jest.fn()

    expect(() => {
      renderHook(() => useDashboardContext())
    }).toThrow('useDashboardContext must be used within a DashboardProvider')

    console.error = originalError
  })

  it('should provide loading state correctly', () => {
    const contextValue = createMockContextValue({
      isLoading: true,
      data: null,
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DashboardProvider value={contextValue}>{children}</DashboardProvider>
    )

    const { result } = renderHook(() => useDashboardContext(), { wrapper })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeNull()
  })

  it('should provide error state correctly', () => {
    const testError = new Error('Test error')
    const contextValue = createMockContextValue({
      isError: true,
      error: testError,
      data: null,
    })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DashboardProvider value={contextValue}>{children}</DashboardProvider>
    )

    const { result } = renderHook(() => useDashboardContext(), { wrapper })

    expect(result.current.isError).toBe(true)
    expect(result.current.error).toBe(testError)
    expect(result.current.data).toBeNull()
  })
})

describe('useDashboardData', () => {
  it('should return dashboard data when available', () => {
    const contextValue = createMockContextValue()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DashboardProvider value={contextValue}>{children}</DashboardProvider>
    )

    const { result } = renderHook(() => useDashboardData(), { wrapper })

    expect(result.current).toBe(mockDashboardData)
    expect(result.current?.dailyEdition.editionNumber).toBe(1)
    expect(result.current?.dailyEdition.recentQuestions).toHaveLength(1)
  })

  it('should return null when data is not available', () => {
    const contextValue = createMockContextValue({ data: null })

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DashboardProvider value={contextValue}>{children}</DashboardProvider>
    )

    const { result } = renderHook(() => useDashboardData(), { wrapper })

    expect(result.current).toBeNull()
  })

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = jest.fn()

    expect(() => {
      renderHook(() => useDashboardData())
    }).toThrow('useDashboardContext must be used within a DashboardProvider')

    console.error = originalError
  })

  it('should update when data changes', () => {
    const contextValue = createMockContextValue()

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DashboardProvider value={contextValue}>{children}</DashboardProvider>
    )

    const { result, rerender } = renderHook(() => useDashboardData(), { wrapper })

    expect(result.current?.dailyEdition.editionNumber).toBe(1)

    // Create new wrapper with updated data
    const newContextValue = createMockContextValue({
      data: {
        ...mockDashboardData,
        dailyEdition: {
          ...mockDashboardData.dailyEdition,
          editionNumber: 2,
        },
      },
    })

    const newWrapper = ({ children }: { children: React.ReactNode }) => (
      <DashboardProvider value={newContextValue}>{children}</DashboardProvider>
    )

    rerender()

    const { result: newResult } = renderHook(() => useDashboardData(), { wrapper: newWrapper })
    expect(newResult.current?.dailyEdition.editionNumber).toBe(2)
  })
})

describe('Integration Tests', () => {
  it('should work with multiple consumer components', () => {
    const contextValue = createMockContextValue()

    const EditionNumber = () => {
      const data = useDashboardData()
      return <div>Edition: {data?.dailyEdition.editionNumber}</div>
    }

    const QuestionCount = () => {
      const { data } = useDashboardContext()
      return <div>Questions: {data?.dailyEdition.recentQuestions.length}</div>
    }

    const LoadingIndicator = () => {
      const { isLoading } = useDashboardContext()
      return <div>{isLoading ? 'Loading...' : 'Loaded'}</div>
    }

    render(
      <DashboardProvider value={contextValue}>
        <EditionNumber />
        <QuestionCount />
        <LoadingIndicator />
      </DashboardProvider>
    )

    expect(screen.getByText('Edition: 1')).toBeInTheDocument()
    expect(screen.getByText('Questions: 1')).toBeInTheDocument()
    expect(screen.getByText('Loaded')).toBeInTheDocument()
  })

  it('should handle refetch functionality', async () => {
    const contextValue = createMockContextValue()

    const TestComponent = () => {
      const { refetch } = useDashboardContext()
      return <button onClick={() => refetch()}>Refetch</button>
    }

    render(
      <DashboardProvider value={contextValue}>
        <TestComponent />
      </DashboardProvider>
    )

    const button = screen.getByText('Refetch')
    button.click()

    expect(mockRefetch).toHaveBeenCalledTimes(1)
  })
})
