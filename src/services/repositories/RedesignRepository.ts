/**
 * Redesign Dashboard Data Repository
 * Centralized data access layer for the redesigned RTI Dashboard
 * In production, this would fetch from an API
 */

import type {
  RedesignDashboardData,
  WinStory,
  PendingCase,
  RTIQuestion,
  BigWinOfTheWeek,
  UrgentUnanswered,
  SystemAnalytics,
  DepartmentMetrics,
  TimelineActivity,
  InsightTrend,
  TopicCategory,
  NationalStats,
  EditionFilter,
  SearchFilters,
  PaginatedResponse,
} from '@/types/redesign'

// Import mock data
import {
  MOCK_WIN_STORIES,
  MOCK_PENDING_CASES,
  MOCK_RECENT_QUESTIONS,
  MOCK_BIG_WIN,
  MOCK_URGENT_CASE,
  MOCK_TOPICS,
} from '@/data/mockData/redesignMocks'

import {
  MOCK_NATIONAL_STATS,
  MOCK_SYSTEM_ANALYTICS,
  MOCK_DEPARTMENT_METRICS,
  MOCK_DEPARTMENT_SUMMARY,
} from '@/data/mockData/analyticsData'

import {
  MOCK_TIMELINE_ACTIVITIES,
  MOCK_INSIGHTS_TRENDS,
} from '@/data/mockData/timelineData'

// ============================================
// Repository Class
// ============================================

class RedesignRepositoryImpl {
  private currentFilter?: EditionFilter

  /**
   * Apply edition filter for regional data
   */
  applyEditionFilter(filter: EditionFilter): this {
    this.currentFilter = filter
    return this
  }

  /**
   * Get complete dashboard data
   */
  async getDashboardData(): Promise<RedesignDashboardData> {
    const [
      bigWin,
      urgentCase,
      nationalStats,
      winStories,
      pendingCases,
      recentQuestions,
      systemAnalytics,
      departmentMetrics,
      activityTimeline,
      insights,
      topics,
    ] = await Promise.all([
      this.getBigWinOfTheWeek(),
      this.getMostUrgentCase(),
      this.getNationalStats(),
      this.getWinStories(),
      this.getPendingCases(),
      this.getRecentQuestions(),
      this.getSystemAnalytics(),
      this.getDepartmentMetrics(),
      this.getActivityTimeline(),
      this.getInsights(),
      this.getTopics(),
    ])

    return {
      hero: {
        bigWin,
        urgentCase,
        nationalStats,
      },
      winStories,
      pendingCases,
      recentQuestions,
      systemAnalytics,
      departmentMetrics,
      activityTimeline,
      insights,
      topics,
      generatedAt: new Date().toISOString(),
      editionFilter: this.currentFilter || {
        level: 'national',
        timeRange: 'week',
      },
    }
  }

  // ============================================
  // Hero Section Data
  // ============================================

  /**
   * Get Big Win of the Week
   */
  async getBigWinOfTheWeek(): Promise<BigWinOfTheWeek> {
    // In production, this would select based on impact score, timing, etc.
    return MOCK_BIG_WIN
  }

  /**
   * Get Most Urgent Unanswered Case
   */
  async getMostUrgentCase(): Promise<UrgentUnanswered> {
    // In production, this would select based on urgency, days overdue, etc.
    return MOCK_URGENT_CASE
  }

  /**
   * Get National Statistics
   */
  async getNationalStats(): Promise<NationalStats> {
    return MOCK_NATIONAL_STATS
  }

  // ============================================
  // Win Stories
  // ============================================

  /**
   * Get paginated win stories
   */
  async getWinStories(
    page = 1,
    pageSize = 6,
    filters?: SearchFilters
  ): Promise<PaginatedResponse<WinStory>> {
    let stories = [...MOCK_WIN_STORIES]

    // Apply filters
    if (filters) {
      stories = this.filterWinStories(stories, filters)
    }

    // Apply regional filter if set
    if (this.currentFilter) {
      stories = this.applyRegionalFilter(stories)
    }

    // Paginate
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const items = stories.slice(start, end)

    return {
      items,
      total: stories.length,
      page,
      pageSize,
      hasMore: end < stories.length,
    }
  }

  /**
   * Get win story by ID
   */
  async getWinStoryById(id: string): Promise<WinStory | null> {
    return MOCK_WIN_STORIES.find((story) => story.id === id) || null
  }

  // ============================================
  // Pending Cases
  // ============================================

  /**
   * Get paginated pending cases
   */
  async getPendingCases(
    page = 1,
    pageSize = 6,
    filters?: SearchFilters
  ): Promise<PaginatedResponse<PendingCase>> {
    let cases = [...MOCK_PENDING_CASES]

    // Apply filters
    if (filters) {
      cases = this.filterPendingCases(cases, filters)
    }

    // Apply regional filter if set
    if (this.currentFilter) {
      cases = this.applyRegionalFilter(cases)
    }

    // Sort by urgency and days overdue
    cases.sort((a, b) => {
      const urgencyOrder = { critical: 0, high: 1, medium: 2, low: 3 }
      const urgencyDiff = urgencyOrder[a.urgencyLevel] - urgencyOrder[b.urgencyLevel]
      if (urgencyDiff !== 0) return urgencyDiff
      return b.daysOverdue - a.daysOverdue
    })

    // Paginate
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const items = cases.slice(start, end)

    return {
      items,
      total: cases.length,
      page,
      pageSize,
      hasMore: end < cases.length,
    }
  }

  /**
   * Get pending case by ID
   */
  async getPendingCaseById(id: string): Promise<PendingCase | null> {
    return MOCK_PENDING_CASES.find((c) => c.id === id) || null
  }

  // ============================================
  // Questions
  // ============================================

  /**
   * Get paginated recent questions
   */
  async getRecentQuestions(
    page = 1,
    pageSize = 6,
    filters?: SearchFilters
  ): Promise<PaginatedResponse<RTIQuestion>> {
    let questions = [...MOCK_RECENT_QUESTIONS]

    // Apply filters
    if (filters) {
      questions = this.filterQuestions(questions, filters)
    }

    // Apply regional filter if set
    if (this.currentFilter) {
      questions = this.applyRegionalFilter(questions)
    }

    // Sort by filed date (most recent first)
    questions.sort(
      (a, b) => new Date(b.filedDate).getTime() - new Date(a.filedDate).getTime()
    )

    // Paginate
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const items = questions.slice(start, end)

    return {
      items,
      total: questions.length,
      page,
      pageSize,
      hasMore: end < questions.length,
    }
  }

  /**
   * Get question by ID
   */
  async getQuestionById(id: string): Promise<RTIQuestion | null> {
    return MOCK_RECENT_QUESTIONS.find((q) => q.id === id) || null
  }

  // ============================================
  // Analytics
  // ============================================

  /**
   * Get system analytics
   */
  async getSystemAnalytics(): Promise<SystemAnalytics> {
    return MOCK_SYSTEM_ANALYTICS
  }

  /**
   * Get department metrics
   */
  async getDepartmentMetrics(limit?: number): Promise<DepartmentMetrics[]> {
    const metrics = [...MOCK_DEPARTMENT_METRICS]
    return limit ? metrics.slice(0, limit) : metrics
  }

  /**
   * Get department summary
   */
  async getDepartmentSummary() {
    return MOCK_DEPARTMENT_SUMMARY
  }

  // ============================================
  // Activity and Insights
  // ============================================

  /**
   * Get activity timeline
   */
  async getActivityTimeline(limit?: number): Promise<TimelineActivity[]> {
    const activities = [...MOCK_TIMELINE_ACTIVITIES]
    return limit ? activities.slice(0, limit) : activities
  }

  /**
   * Get insights and trends
   */
  async getInsights(limit?: number): Promise<InsightTrend[]> {
    const insights = [...MOCK_INSIGHTS_TRENDS]
    return limit ? insights.slice(0, limit) : insights
  }

  // ============================================
  // Topics
  // ============================================

  /**
   * Get all topics
   */
  async getTopics(): Promise<TopicCategory[]> {
    return MOCK_TOPICS
  }

  /**
   * Get topic by slug
   */
  async getTopicBySlug(slug: string): Promise<TopicCategory | null> {
    return MOCK_TOPICS.find((t) => t.slug === slug) || null
  }

  // ============================================
  // Filter Helpers
  // ============================================

  private filterWinStories(stories: WinStory[], filters: SearchFilters): WinStory[] {
    return stories.filter((story) => {
      // Query filter
      if (filters.query) {
        const query = filters.query.toLowerCase()
        if (
          !story.title.toLowerCase().includes(query) &&
          !story.hook.hookLine.toLowerCase().includes(query)
        ) {
          return false
        }
      }

      // Topic filter
      if (filters.topics && filters.topics.length > 0) {
        if (!filters.topics.includes(story.topic.slug)) {
          return false
        }
      }

      // Department filter
      if (filters.departments && filters.departments.length > 0) {
        if (!filters.departments.includes(story.department)) {
          return false
        }
      }

      // State filter
      if (filters.states && filters.states.length > 0) {
        if (!filters.states.includes(story.state)) {
          return false
        }
      }

      // Outcome type filter
      if (filters.outcomeTypes && filters.outcomeTypes.length > 0) {
        if (!filters.outcomeTypes.includes(story.outcomeType)) {
          return false
        }
      }

      // Date range filter
      if (filters.dateFrom) {
        if (new Date(story.answeredDate) < new Date(filters.dateFrom)) {
          return false
        }
      }
      if (filters.dateTo) {
        if (new Date(story.answeredDate) > new Date(filters.dateTo)) {
          return false
        }
      }

      // Urgency filter
      if (filters.urgencyLevels && filters.urgencyLevels.length > 0) {
        if (!filters.urgencyLevels.includes(story.urgencyLevel)) {
          return false
        }
      }

      return true
    })
  }

  private filterPendingCases(cases: PendingCase[], filters: SearchFilters): PendingCase[] {
    return cases.filter((c) => {
      // Query filter
      if (filters.query) {
        const query = filters.query.toLowerCase()
        if (
          !c.title.toLowerCase().includes(query) &&
          !c.question.toLowerCase().includes(query)
        ) {
          return false
        }
      }

      // Topic filter
      if (filters.topics && filters.topics.length > 0) {
        if (!filters.topics.includes(c.topic.slug)) {
          return false
        }
      }

      // Department filter
      if (filters.departments && filters.departments.length > 0) {
        if (!filters.departments.includes(c.department)) {
          return false
        }
      }

      // State filter
      if (filters.states && filters.states.length > 0) {
        if (!filters.states.includes(c.state)) {
          return false
        }
      }

      // Urgency filter
      if (filters.urgencyLevels && filters.urgencyLevels.length > 0) {
        if (!filters.urgencyLevels.includes(c.urgencyLevel)) {
          return false
        }
      }

      return true
    })
  }

  private filterQuestions(questions: RTIQuestion[], filters: SearchFilters): RTIQuestion[] {
    return questions.filter((q) => {
      // Query filter
      if (filters.query) {
        const query = filters.query.toLowerCase()
        if (!q.question.toLowerCase().includes(query)) {
          return false
        }
      }

      // Topic filter
      if (filters.topics && filters.topics.length > 0) {
        if (!filters.topics.includes(q.topic.slug)) {
          return false
        }
      }

      // Department filter
      if (filters.departments && filters.departments.length > 0) {
        if (!filters.departments.includes(q.department)) {
          return false
        }
      }

      // State filter
      if (filters.states && filters.states.length > 0) {
        if (!filters.states.includes(q.state)) {
          return false
        }
      }

      // Status filter
      if (filters.statuses && filters.statuses.length > 0) {
        if (!filters.statuses.includes(q.status)) {
          return false
        }
      }

      return true
    })
  }

  private applyRegionalFilter<
    T extends { state: string; district?: string; region?: string }
  >(items: T[]): T[] {
    if (!this.currentFilter) return items

    return items.filter((item) => {
      if (this.currentFilter!.level === 'state') {
        if (this.currentFilter!.state && item.state !== this.currentFilter!.state) {
          return false
        }
      }

      if (this.currentFilter!.level === 'district') {
        if (
          this.currentFilter!.state &&
          this.currentFilter!.district &&
          (item.state !== this.currentFilter!.state ||
            item.district !== this.currentFilter!.district)
        ) {
          return false
        }
      }

      return true
    })
  }
}

// ============================================
// Export Singleton
// ============================================

export const RedesignRepository = new RedesignRepositoryImpl()
