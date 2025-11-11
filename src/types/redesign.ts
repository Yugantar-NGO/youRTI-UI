/**
 * TypeScript interfaces for RTI Dashboard Redesign
 * Comprehensive types for mock data generation and LLM hook system
 */

// ============================================
// Core Enums and Union Types
// ============================================

export type UrgencyLevel = 'critical' | 'high' | 'medium' | 'low'
export type RTIOutcomeType = 'data_released' | 'money_sanctioned' | 'services_fixed' | 'policy_changed' | 'accountability_action'
export type CaseStatusType = 'pending' | 'first_appeal' | 'second_appeal' | 'overdue'
export type QuestionStatusType = 'filed' | 'pending' | 'answered' | 'rejected' | 'appealed'
export type TimelineEventType = 'filed' | 'responded' | 'pending' | 'denied' | 'answered' | 'appealed' | 'transferred'
export type TrendDirection = 'up' | 'down' | 'stable'

// ============================================
// LLM Hook System Types
// ============================================

/**
 * LLM-generated hook for engaging storytelling
 */
export interface LLMHook {
  hookLine: string // Compelling one-liner that draws attention
  whyItMatters: string // Broader impact context
  humanAngle?: string // Optional personal/community angle
}

/**
 * Impact outcome with LLM-generated title
 */
export interface ImpactOutcome {
  title: string // LLM-generated outcome title
  metrics: ImpactMetric[]
  description?: string
}

/**
 * Impact metric for quantifying RTI outcomes
 */
export interface ImpactMetric {
  icon: string // Emoji or icon name
  value: string | number // e.g., "₹12L", "450", "3K"
  label: string // e.g., "Sanctioned", "Students", "Ghost cards"
  trend?: TrendDirection
}

// ============================================
// Win Stories (Success Stories)
// ============================================

/**
 * Complete Win Story with all details
 */
export interface WinStory {
  id: string
  title: string // Main headline
  hook: LLMHook // LLM-generated engaging hook
  outcome: ImpactOutcome // What was achieved

  // Classification
  outcomeType: RTIOutcomeType
  topic: TopicCategory
  urgencyLevel: UrgencyLevel

  // Context
  department: string
  state: string
  district?: string
  region: 'north' | 'south' | 'east' | 'west' | 'northeast' | 'central'

  // Timeline
  filedDate: string
  answeredDate: string
  daysToResolve: number

  // Engagement
  views?: number
  shares?: number
  reactions?: number

  // Links
  link: string
  sourceRTIId: string
}

// ============================================
// Pending Cases (Citizens Still Waiting)
// ============================================

/**
 * Pending RTI case needing resolution
 */
export interface PendingCase {
  id: string
  title: string // Headline for the case
  question: string // The actual RTI question asked

  // Why it matters (LLM-enhanced)
  hook: LLMHook
  impactDetails: string[] // Bullet points of impact

  // Status
  status: CaseStatusType
  urgencyLevel: UrgencyLevel
  daysElapsed: number
  daysOverdue: number
  expectedResponseDate: string

  // Classification
  topic: TopicCategory
  department: string
  state: string
  district?: string
  region: 'north' | 'south' | 'east' | 'west' | 'northeast' | 'central'

  // Timeline
  filedDate: string
  lastUpdate?: string

  // Links
  link: string
  trackingLink: string
}

// ============================================
// Questions (People Are Asking)
// ============================================

/**
 * Recent RTI question filed
 */
export interface RTIQuestion {
  id: string
  question: string // The RTI question
  hook: LLMHook // Why this question is interesting/important

  // Status
  status: QuestionStatusType
  daysElapsed: number

  // Classification
  topic: TopicCategory
  department: string
  state: string
  district?: string
  region: 'north' | 'south' | 'east' | 'west' | 'northeast' | 'central'

  // Timeline
  filedDate: string
  expectedResponseDate: string
  answeredDate?: string

  // Links
  link: string
}

// ============================================
// Hero Section - Big Win & Urgent Case
// ============================================

/**
 * Big Win of the Week - Featured in hero
 */
export interface BigWinOfTheWeek extends WinStory {
  isFeature: true
  weekOf: string // ISO date string for the week
  featuredReason: string // Why this was chosen as big win
}

/**
 * Most Urgent Unanswered RTI - Featured in hero
 */
export interface UrgentUnanswered extends PendingCase {
  isUrgent: true
  urgencyReason: string // Why this is most urgent
  publicAttention: number // Score 1-10 for public interest
}

// ============================================
// Topic Categories
// ============================================

/**
 * Topic/Issue category for RTIs
 */
export interface TopicCategory {
  id: string
  name: string
  slug: string
  icon: string // Emoji or icon identifier
  color: string // Hex color for topic tiles
  description: string
  rtiCount: number
  averageResponseDays: number
  successRate: number // Percentage of RTIs answered satisfactorily
}

// ============================================
// Analytics & System Pulse Data
// ============================================

/**
 * Answer timeliness data with trends
 */
export interface TimelinessData {
  period: 'week' | 'month' | 'quarter' | 'year'
  answeredOnTime: number // Count
  answeredLate: number // Count
  stillPending: number // Count
  averageDays: number
  sparklineData: number[] // For visualization, last N periods
  trend: TrendDirection
}

/**
 * High-impact filing data
 */
export interface HighImpactFilingData {
  period: string // e.g., "This Week", "This Month"
  totalFilings: number
  impactFilings: number // Filings marked as high impact
  byTopic: Array<{
    topic: string
    count: number
  }>
  trend: TrendDirection
}

/**
 * Appeals and escalations data
 */
export interface AppealsData {
  totalAppeals: number
  firstAppeals: number
  secondAppeals: number
  escalationRate: number // Percentage
  successRate: number // Percentage of appeals resulting in disclosure
  topReasonsForAppeal: Array<{
    reason: string
    count: number
  }>
  stackedBarData: Array<{
    department: string
    firstAppeals: number
    secondAppeals: number
  }>
}

/**
 * System-wide analytics snapshot
 */
export interface SystemAnalytics {
  timeliness: TimelinessData
  highImpactFilings: HighImpactFilingData
  appeals: AppealsData
  generatedAt: string // ISO timestamp
}

// ============================================
// Department Performance
// ============================================

/**
 * Department performance metrics
 */
export interface DepartmentMetrics {
  id: string
  name: string
  shortName: string
  rank: number

  // Performance metrics
  totalRTIs: number
  fulfillmentRate: number // Percentage
  avgResponseDays: number
  transferRate: number // Percentage
  appealRate: number // Percentage

  // Trends
  trend: TrendDirection
  trendPercentage: number

  // Breakdown
  answeredOnTime: number
  answeredLate: number
  pending: number
  denied: number

  // Transparency score (1-100)
  transparencyScore: number
}

// ============================================
// Activity Timeline
// ============================================

/**
 * Timeline activity item
 */
export interface TimelineActivity {
  id: string
  type: TimelineEventType
  title: string // Brief description
  rtiId: string
  department: string
  state: string
  timestamp: string // ISO timestamp
  daysAgo: number
  link: string

  // Additional context
  status?: QuestionStatusType
  urgency?: UrgencyLevel
}

// ============================================
// Insights & Trends
// ============================================

/**
 * Insight or trend item
 */
export interface InsightTrend {
  id: string
  type: 'trend' | 'insight' | 'fact' | 'milestone'
  icon: string
  title: string
  description: string

  // Metrics
  metric?: string | number
  change?: number // Percentage change
  period?: string // e.g., "This Quarter", "Year-over-year"

  // Related data
  relatedTopics?: string[]
  relatedDepartments?: string[]
}

// ============================================
// India-wide Statistics
// ============================================

/**
 * National RTI statistics
 */
export interface NationalStats {
  totalRTIsFiled: number
  rtisFiled30Days: number // Last 30 days
  totalResponses: number
  responsesReceived30Days: number // Last 30 days
  pendingRTIs: number
  overdueRTIs: number

  // Percentages
  answeredInTimePercent: number // Within 30 days
  answeredLatePercent: number
  inAppealPercent: number
  deniedPercent: number

  // Averages
  avgResponseDays: number
  avgAppealDays: number

  // Updates
  lastUpdated: string // ISO timestamp
}

// ============================================
// Filter and Search Types
// ============================================

/**
 * Edition filter for dashboard
 */
export interface EditionFilter {
  level: 'national' | 'state' | 'district'
  state?: string
  district?: string
  timeRange: 'today' | 'week' | 'month' | 'quarter' | 'year' | 'all'
}

/**
 * Search filters
 */
export interface SearchFilters {
  query?: string
  topics?: string[]
  departments?: string[]
  states?: string[]
  statuses?: QuestionStatusType[]
  outcomeTypes?: RTIOutcomeType[]
  dateFrom?: string
  dateTo?: string
  urgencyLevels?: UrgencyLevel[]
}

// ============================================
// Repository Response Types
// ============================================

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

/**
 * Complete redesign dashboard data
 */
export interface RedesignDashboardData {
  // Hero section
  hero: {
    bigWin: BigWinOfTheWeek
    urgentCase: UrgentUnanswered
    nationalStats: NationalStats
  }

  // Main sections
  winStories: PaginatedResponse<WinStory>
  pendingCases: PaginatedResponse<PendingCase>
  recentQuestions: PaginatedResponse<RTIQuestion>

  // Analytics
  systemAnalytics: SystemAnalytics
  departmentMetrics: DepartmentMetrics[]

  // Activity and insights
  activityTimeline: TimelineActivity[]
  insights: InsightTrend[]

  // Topics
  topics: TopicCategory[]

  // Metadata
  generatedAt: string
  editionFilter: EditionFilter
}

// ============================================
// Mock Data Generation Helpers
// ============================================

/**
 * Configuration for mock data generation
 */
export interface MockDataConfig {
  winStoriesCount: number
  pendingCasesCount: number
  questionsCount: number
  timelineItemsCount: number
  insightsCount: number
  departmentsCount: number
  seed?: number // For reproducible random data
}

/**
 * LLM hook generation templates
 */
export interface HookTemplate {
  outcomeType: RTIOutcomeType
  templates: {
    hookLine: string[]
    whyItMatters: string[]
    humanAngle: string[]
  }
}
