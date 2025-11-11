/**
 * Dashboard-specific TypeScript interfaces and types
 */

import { RTIRequest, RTIStatus } from './index'

// Edition filter types
export type EditionLevel = 'national' | 'state' | 'district'

export interface EditionFilter {
  level: EditionLevel
  state?: string
  district?: string
}

// Dashboard statistics
export interface DashboardStats {
  totalFiled: number
  totalFiledThisYear: number
  responsesWithin30Days: number
  responseRate: number
  avgResponseDays: number
  pending: number
  oldestPendingDays: number
}

// Local area statistics
export interface LocalAreaStats {
  state: string
  district?: string
  filedThisMonth: number
  responsesReceived: number
  pendingBeyond30Days: number
  avgResponseDays: number
  topIssues: TopIssue[]
}

export interface TopIssue {
  name: string
  count: number
}

// Department performance
export interface DepartmentPerformance {
  id: string
  name: string
  rank: number
  totalRTIs: number
  fulfillmentRate: number
  avgResponseDays: number
  transferRate: number
  trend: 'up' | 'down' | 'stable'
}

// Service categories
export interface ServiceCategory {
  id: string
  name: string
  icon: string
  rtiCount: number
  recentActivity: boolean
}

// Insight data
export type InsightType = 'trend' | 'anomaly' | 'milestone'

export interface InsightData {
  id: string
  type: InsightType
  title: string
  description: string
  metric?: string
  change?: number
  icon?: string
}

// High impact RTI
export interface HighImpactRTI extends RTIRequest {
  outcome: string
  impactScore: number
  reactions?: number
  shares?: number
  mediaReferences?: number
}

// Activity item for timeline
export interface ActivityItem {
  id: string
  rtiId: string
  title: string
  department: string
  status: RTIStatus
  date: string
  ageInDays: number
  type: 'filed' | 'responded' | 'pending' | 'denied'
}

// Recently filed RTI (simplified view)
export interface RecentlyFiledRTI {
  id: string
  title: string
  department: string
  date: string
}

// Fresh answer (recently responded)
export interface FreshAnswer {
  id: string
  title: string
  answerSummary: string
  filedDate: string
  answeredDate: string
  department: string
  daysToRespond: number
}

// Topic category
export interface TopicCategory {
  id: string
  name: string
  icon: string
  rtiCount: number
  slug: string
}

// Rights information
export interface RTIRight {
  id: string
  title: string
  description: string
  icon?: string
}

// Toolkit item
export interface ToolkitItem {
  id: string
  title: string
  description: string
  icon?: string
  link?: string
}

// Spotlight story
export interface SpotlightStory {
  id: string
  rtiId: string
  title: string
  summary: string
  impact: string[]
  date: string
  department: string
}

// Regional performance data
export interface RegionalPerformance {
  state: string
  totalFiled: number
  responseRate: number
  avgResponseDays: number
  trend: 'increase' | 'decrease' | 'neutral'
  trendPercentage: number
}
