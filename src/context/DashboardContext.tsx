'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { DashboardData } from '@/services/repositories/strategies/DashboardDataTransformer'

/**
 * Dashboard context value
 */
export interface DashboardContextValue {
  /**
   * Dashboard data
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
   * Error object
   */
  error: Error | null
  /**
   * Refetch function
   */
  refetch: () => Promise<DashboardData | null>
}

/**
 * Dashboard context
 */
const DashboardContext = createContext<DashboardContextValue | undefined>(undefined)

/**
 * Dashboard provider props
 */
export interface DashboardProviderProps {
  /**
   * Children components
   */
  children: ReactNode
  /**
   * Dashboard context value
   */
  value: DashboardContextValue
}

/**
 * Dashboard provider component
 *
 * Provides dashboard data and state to all child components.
 * Use this to wrap dashboard sections that need access to shared data.
 *
 * @example
 * ```tsx
 * <DashboardProvider value={dashboardState}>
 *   <HeroSection />
 *   <PeopleAreAsking />
 * </DashboardProvider>
 * ```
 */
export function DashboardProvider({ children, value }: DashboardProviderProps): JSX.Element {
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

/**
 * Hook to access dashboard context
 *
 * Provides access to dashboard data and state from any child component.
 * Must be used within a DashboardProvider.
 *
 * @returns Dashboard context value
 * @throws Error if used outside DashboardProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { data, isLoading, refetch } = useDashboardContext()
 *
 *   if (isLoading) return <LoadingSkeleton />
 *   if (!data) return null
 *
 *   return <div>{data.dailyEdition.recentQuestions.length} questions</div>
 * }
 * ```
 */
export function useDashboardContext(): DashboardContextValue {
  const context = useContext(DashboardContext)

  if (context === undefined) {
    throw new Error('useDashboardContext must be used within a DashboardProvider')
  }

  return context
}

/**
 * Hook to access dashboard data (convenience wrapper)
 *
 * Provides direct access to dashboard data without loading/error states.
 * Returns null if data is not available.
 *
 * @returns Dashboard data or null
 *
 * @example
 * ```tsx
 * function QuestionCount() {
 *   const data = useDashboardData()
 *   if (!data) return null
 *
 *   return <span>{data.dailyEdition.recentQuestions.length} questions</span>
 * }
 * ```
 */
export function useDashboardData(): DashboardData | null {
  const { data } = useDashboardContext()
  return data
}
