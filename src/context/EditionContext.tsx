'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { EditionFilter, EditionLevel } from '@/types/dashboard'

interface EditionContextValue {
  filter: EditionFilter
  setFilter: (filter: EditionFilter) => void
  updateLevel: (level: EditionLevel) => void
  updateState: (state: string) => void
  updateDistrict: (district: string) => void
  reset: () => void
}

const EditionContext = createContext<EditionContextValue | undefined>(undefined)

const DEFAULT_FILTER: EditionFilter = {
  level: 'national'
}

/**
 * EditionProvider Component
 *
 * Provides edition filter state to all dashboard components.
 * Implements Observer pattern via React Context.
 *
 * Usage:
 * Wrap your app or dashboard section with this provider.
 *
 * @example
 * <EditionProvider>
 *   <Dashboard />
 * </EditionProvider>
 */
export function EditionProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<EditionFilter>(DEFAULT_FILTER)

  const updateLevel = (level: EditionLevel) => {
    setFilter(prev => ({ ...prev, level }))
  }

  const updateState = (state: string) => {
    setFilter(prev => ({ ...prev, state, level: 'state' }))
  }

  const updateDistrict = (district: string) => {
    setFilter(prev => ({ ...prev, district, level: 'district' }))
  }

  const reset = () => {
    setFilter(DEFAULT_FILTER)
  }

  return (
    <EditionContext.Provider value={{
      filter,
      setFilter,
      updateLevel,
      updateState,
      updateDistrict,
      reset
    }}>
      {children}
    </EditionContext.Provider>
  )
}

/**
 * useEditionFilter Hook
 *
 * Custom hook to access edition filter state and actions.
 * Must be used within EditionProvider.
 *
 * @throws {Error} If used outside of EditionProvider
 *
 * @example
 * function MyComponent() {
 *   const { filter, updateState } = useEditionFilter()
 *   return <div>Current state: {filter.state}</div>
 * }
 */
export function useEditionFilter() {
  const context = useContext(EditionContext)
  if (!context) {
    throw new Error('useEditionFilter must be used within EditionProvider')
  }
  return context
}
