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
  rtiId?: string
  title: string
  department: string
  status?: RTIStatus
  date: string
  ageInDays?: number
  type: 'filed' | 'responded' | 'pending' | 'denied' | 'answered' | 'appealed'
  link?: string
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

// ============================================
// Landing Page Specific Types (New)
// ============================================

/**
 * RTI Impact Story
 * Represents a story about RTI impact with metadata
 */
export interface RTIStory {
  id: string
  title: string
  summary: string
  topic: string
  state: string
  district?: string
  department: string
  filedDate: string
  answeredDate: string
  viewLink: string
  isLeadStory?: boolean
}

/**
 * RTI Answer (Landing Page version)
 * Recently responded RTI with summary
 */
export interface RTIAnswer {
  id: string
  question: string
  answerSummary: string
  department: string
  state: string
  filedDate: string
  answeredDate: string
  viewLink: string
}

/**
 * Unanswered RTI
 * Important pending RTI with overdue details
 */
export interface UnansweredRTI {
  id: string
  question: string
  whyMatters: string
  status: 'pending' | 'first_appeal' | 'second_appeal'
  daysElapsed: number
  daysOverdue: number
  department: string
  state: string
  trackLink: string
}

/**
 * Recent RTI Question
 * Newly filed RTI question
 */
export interface RecentQuestion {
  id: string
  question: string
  topic: string
  department: string
  filedDate: string
  status: 'filed' | 'pending' | 'answered'
}

/**
 * Key Metric
 * Dashboard metric with icon and trend
 */
export interface KeyMetric {
  id: string
  icon: string
  title: string
  value: string | number
  subtitle: string
  trend?: {
    value: number
    direction: 'up' | 'down' | 'neutral'
  }
}

/**
 * Insight/Trend Item (Landing Page version)
 */
export interface InsightItem {
  id: string
  icon: string
  text: string
  category?: 'trend' | 'insight' | 'fact'
}

/**
 * Topic Hub
 */
export interface TopicHub {
  id: string
  name: string
  icon: string
  rtiCount: number
  link: string
}

/**
 * Hero Navigation Item
 */
export interface NavigationItem {
  id: string
  icon: string
  label: string
  link: string
  description?: string
}

/**
 * India at a Glance Stats
 */
export interface IndiaGlanceStats {
  answeredInTime: {
    percentage: number
    label: string
  }
  answeredLate: {
    percentage: number
    label: string
  }
  inAppeal: {
    percentage: number
    label: string
  }
}

/**
 * Daily Edition Data
 * Complete data structure for the daily edition section
 */
export interface DailyEditionData {
  editionDate: string
  leadStory: RTIStory
  secondaryStories: RTIStory[]
  freshAnswers: RTIAnswer[]
  unansweredQuestions: UnansweredRTI[]
  recentQuestions: RecentQuestion[]
}

/**
 * Hero Section Data
 */
export interface HeroSectionData {
  title: string
  subtitle: string
  tagline: string
  navigationItems: NavigationItem[]
  stats: {
    rtisFiled: number
    responsesReceived: number
    pending: number
  }
  indiaGlance: IndiaGlanceStats
}

/**
 * Department Performance Summary (for charts)
 */
export interface DepartmentPerformanceChart {
  department: string
  fulfillmentRate: number // percentage
  avgResponseDays: number
  transferRate: number // percentage
  totalRTIs: number
}

/**
 * Main Content Data
 */
export interface MainContentData {
  keyMetrics: KeyMetric[]
  departmentPerformance: {
    summary: {
      highestFulfillment: string
      slowestResponses: string
      mostAppeals: string
    }
    chartData: DepartmentPerformanceChart[]
  }
  departmentLeaderboard: DepartmentPerformance[]
  insights: InsightItem[]
  topics: TopicHub[]
  activityFeed: ActivityItem[]
  spotlight: SpotlightStory
}

/**
 * Complete Landing Page Data
 */
export interface LandingPageData {
  dailyEdition: DailyEditionData
  hero: HeroSectionData
  mainContent: MainContentData
}

// ============================================
// Task 3: Impact Stories and Pending Cases Types
// ============================================

/**
 * Win Story Type
 */
export type WinType = 'data_released' | 'money_sanctioned' | 'services_fixed' | 'policy_changed'

/**
 * Impact Metric
 */
export interface ImpactMetric {
  icon: string
  value: string
  label: string
}

/**
 * Win Story
 * Represents a successful RTI outcome story
 */
export interface WinStory {
  id: string
  title: string
  hookLine: string
  topic: string
  topicColor: string
  topicIcon: string
  winType: WinType
  impactMetrics: ImpactMetric[]
  department: string
  state: string
  date: string
  link: string
}

/**
 * Pending Case
 * Represents a critical pending RTI case
 */
export interface PendingCase {
  id: string
  title: string
  question: string
  whyItMatters: string[]
  status: 'pending' | 'first_appeal' | 'second_appeal'
  daysElapsed: number
  daysOverdue: number
  department: string
  state: string
  link: string
}

/**
 * Topic Statistics
 * Represents aggregated statistics for a specific RTI topic/category
 */
export interface TopicStatistics {
  id: string
  icon: string
  name: string
  count: number
  countChange: number // percentage change (e.g., +12, -3)
  responseRate: number // percentage (0-100)
  avgResponseDays: number
  topDepartment: string
  topDepartmentCode: string
  latestQuestion: string
  latestQuestionLocation: string
  latestQuestionAge: string
  answeredCount: number
  pendingCount: number
  overdueCount: number
  link: string
}
