/**
 * Common TypeScript interfaces and types for the RTI Dashboard
 */

// Component base props
export interface BaseProps {
  className?: string
  children?: React.ReactNode
}

// RTI Request Status
export type RTIStatus = 'disclosed' | 'rejected' | 'pending' | 'partial'

// RTI Request interface
export interface RTIRequest {
  id: string
  title: string
  description: string
  department: string
  location: string
  status: RTIStatus
  filedDate: string
  responseDate?: string
  reactions?: number
  category?: string
  tags?: string[]
}

// Statistics interface
export interface Statistic {
  label: string
  value: number
  change?: number
  changeType?: 'increase' | 'decrease' | 'neutral'
  unit?: string
}

// Data table row
export interface TableRow {
  [key: string]: string | number | React.ReactNode
}

// Chart data point
export interface ChartDataPoint {
  label: string
  value: number
  [key: string]: string | number
}

// Trend indicator
export interface TrendData {
  value: number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  period?: string
}

// Typography variants
export type TypographyVariant =
  | 'headline-hero'
  | 'headline-large'
  | 'headline-medium'
  | 'headline-small'
  | 'body-text'
  | 'body-text-large'
  | 'body-text-small'
  | 'mono-text'
  | 'mono-text-large'
  | 'mono-text-small'
  | 'label'
  | 'byline'
  | 'metadata'

// Badge variants
export type BadgeVariant = 'disclosed' | 'rejected' | 'pending' | 'partial' | 'default'

// Size variants
export type Size = 'small' | 'medium' | 'large'
