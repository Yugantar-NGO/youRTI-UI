import { useMemo } from 'react'

interface BarChartData {
  label: string
  value: number
}

interface StackedBarSegment {
  label: string
  value: number
  color: string
}

interface StackedBarData {
  label: string
  segments: StackedBarSegment[]
}

interface SystemAnalyticsData {
  timelinessData: number[]
  highImpactData: BarChartData[]
  appealsData: StackedBarData[]
}

/**
 * Custom hook for system analytics data
 * Memoizes analytics data to prevent unnecessary recalculations
 *
 * In production, this would fetch real data from an API
 *
 * @returns System analytics data for the last 30 days
 */
export function useSystemAnalytics(): SystemAnalyticsData {
  // Memoize analytics data (last 30 days)
  const timelinessData = useMemo(() =>
    [18, 19, 17, 16, 18, 20, 19, 18, 17, 16, 15, 17, 18, 19, 18.5],
    []
  )

  const highImpactData = useMemo<BarChartData[]>(() => [
    { label: 'Health', value: 45 },
    { label: 'Education', value: 32 },
    { label: 'Public Works', value: 28 },
    { label: 'Finance', value: 21 }
  ], [])

  const appealsData = useMemo<StackedBarData[]>(() => [
    {
      label: 'Appeals Filed',
      segments: [
        { label: 'Approved', value: 35, color: '#16A34A' },
        { label: 'Pending', value: 42, color: '#FACC15' },
        { label: 'Rejected', value: 18, color: '#EF4444' }
      ]
    },
    {
      label: 'Escalations',
      segments: [
        { label: 'Resolved', value: 28, color: '#16A34A' },
        { label: 'In Progress', value: 45, color: '#FACC15' },
        { label: 'Stalled', value: 12, color: '#EF4444' }
      ]
    }
  ], [])

  return {
    timelinessData,
    highImpactData,
    appealsData
  }
}
