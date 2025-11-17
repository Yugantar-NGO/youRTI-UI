/**
 * Landing Page Data Repository
 * Provides mock data for the RTI Dashboard Landing Page
 * In production, this would fetch from an API
 *
 * Extends BaseRepository to leverage error handling, retry logic, and caching.
 */

import { RecentQuestion, TopicStatistics } from '@/types/dashboard'
import { BaseRepository } from './base/BaseRepository'

export interface LandingPageData {
  dailyEdition: {
    recentQuestions: RecentQuestion[]
  }
  topicStatistics: TopicStatistics[]
}

/**
 * Landing Page Repository implementation
 *
 * Provides data for the landing page with proper error handling,
 * retry logic, and caching support through BaseRepository.
 */
class LandingPageRepositoryImpl extends BaseRepository<LandingPageData> {
  protected readonly repositoryName = 'LandingPageRepository'

  /**
   * Get landing page data with error handling and retry support
   *
   * @returns Promise resolving to landing page data
   */
  async getLandingPageData(): Promise<LandingPageData> {
    return this.withErrorHandling(
      async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 100))

        const data: LandingPageData = {
          dailyEdition: {
            recentQuestions: this.getRecentQuestions(),
          },
          topicStatistics: this.getTopicStatistics(),
        }

        // Validate data before returning
        this.validate(
          data,
          (d) => Array.isArray(d.dailyEdition.recentQuestions) && Array.isArray(d.topicStatistics),
          'Invalid landing page data: recentQuestions and topicStatistics must be arrays'
        )

        this.logInfo('Successfully fetched landing page data', {
          questionCount: data.dailyEdition.recentQuestions.length,
          topicCount: data.topicStatistics.length,
        })

        return data
      },
      'getLandingPageData',
      {
        retry: true,
        retryAttempts: 2,
      }
    )
  }

  /**
   * Get recent questions data
   *
   * In production, this would fetch from an API endpoint.
   * Currently returns mock data for development.
   */
  private getRecentQuestions(): RecentQuestion[] {
    return [
      {
        id: 'recent-001',
        question: 'Criteria and waiting list for old-age pension in taluka',
        topic: 'Pensions',
        department: 'Social Welfare',
        filedDate: '2025-11-09',
        status: 'filed',
      },
      {
        id: 'recent-002',
        question: 'Timeline for repairing potholes on Main Road',
        topic: 'Roads',
        department: 'PWD',
        filedDate: '2025-11-08',
        status: 'pending',
      },
      {
        id: 'recent-003',
        question: 'List of students receiving pre-matric scholarships in Ward 21',
        topic: 'Education',
        department: 'Education',
        filedDate: '2025-11-07',
        status: 'answered',
      },
      {
        id: 'recent-004',
        question: 'Number of doctors posted vs sanctioned in PHCs',
        topic: 'Health',
        department: 'Health',
        filedDate: '2025-11-06',
        status: 'pending',
      },
    ]
  }

  /**
   * Get topic statistics data
   *
   * In production, this would fetch aggregated statistics from an API endpoint.
   * Currently returns mock data for development.
   */
  private getTopicStatistics(): TopicStatistics[] {
    return [
      {
        id: 'topic-001',
        icon: '🚧',
        name: 'Road Construction',
        count: 1347,
        countChange: 12,
        responseRate: 41,
        avgResponseDays: 23,
        topDepartment: 'PWD Maharashtra',
        topDepartmentCode: 'PWD MH',
        latestQuestion: 'MG Road pothole repairs...',
        latestQuestionLocation: 'Bir',
        latestQuestionAge: '2h ago',
        answeredCount: 552,
        pendingCount: 247,
        overdueCount: 89,
        link: '/topics/road-construction',
      },
      {
        id: 'topic-002',
        icon: '🏥',
        name: 'Healthcare',
        count: 1234,
        countChange: 15,
        responseRate: 54,
        avgResponseDays: 31,
        topDepartment: 'Health Maharashtra',
        topDepartmentCode: 'Health MH',
        latestQuestion: 'Medicine stock availability...',
        latestQuestionLocation: 'Mum',
        latestQuestionAge: '5h ago',
        answeredCount: 666,
        pendingCount: 612,
        overdueCount: 234,
        link: '/topics/healthcare',
      },
      {
        id: 'topic-003',
        icon: '🎓',
        name: 'Education',
        count: 987,
        countChange: 8,
        responseRate: 62,
        avgResponseDays: 19,
        topDepartment: 'Education Tamil Nadu',
        topDepartmentCode: 'Edu TN',
        latestQuestion: 'Teacher appointment status...',
        latestQuestionLocation: 'Del',
        latestQuestionAge: '1h ago',
        answeredCount: 612,
        pendingCount: 423,
        overdueCount: 156,
        link: '/topics/education',
      },
      {
        id: 'topic-004',
        icon: '💧',
        name: 'Water Supply',
        count: 856,
        countChange: -3,
        responseRate: 38,
        avgResponseDays: 28,
        topDepartment: 'Water Karnataka',
        topDepartmentCode: 'Water KA',
        latestQuestion: 'Pipeline maintenance records...',
        latestQuestionLocation: 'Bir',
        latestQuestionAge: '4h ago',
        answeredCount: 325,
        pendingCount: 345,
        overdueCount: 178,
        link: '/topics/water-supply',
      },
      {
        id: 'topic-005',
        icon: '🚌',
        name: 'Transport',
        count: 723,
        countChange: 6,
        responseRate: 56,
        avgResponseDays: 21,
        topDepartment: 'Transport Delhi',
        topDepartmentCode: 'Trans DL',
        latestQuestion: 'Bus route expansion plans...',
        latestQuestionLocation: 'Del',
        latestQuestionAge: '3h ago',
        answeredCount: 405,
        pendingCount: 298,
        overdueCount: 123,
        link: '/topics/transport',
      },
      {
        id: 'topic-006',
        icon: '🏛️',
        name: 'Municipal Deals',
        count: 689,
        countChange: 11,
        responseRate: 34,
        avgResponseDays: 36,
        topDepartment: 'Municipal Delhi',
        topDepartmentCode: 'MCD DL',
        latestQuestion: 'Tender allocation details...',
        latestQuestionLocation: 'Del',
        latestQuestionAge: '6h ago',
        answeredCount: 234,
        pendingCount: 412,
        overdueCount: 189,
        link: '/topics/municipal-deals',
      },
      {
        id: 'topic-007',
        icon: '⚡',
        name: 'Electricity',
        count: 612,
        countChange: 4,
        responseRate: 48,
        avgResponseDays: 25,
        topDepartment: 'Power Uttar Pradesh',
        topDepartmentCode: 'Power UP',
        latestQuestion: 'Power cut compensation...',
        latestQuestionLocation: 'Lko',
        latestQuestionAge: '7h ago',
        answeredCount: 294,
        pendingCount: 267,
        overdueCount: 98,
        link: '/topics/electricity',
      },
      {
        id: 'topic-008',
        icon: '🏛️',
        name: 'Revenue',
        count: 534,
        countChange: 9,
        responseRate: 71,
        avgResponseDays: 16,
        topDepartment: 'Revenue Gujarat',
        topDepartmentCode: 'Rev GJ',
        latestQuestion: 'Land record updates...',
        latestQuestionLocation: 'Ahm',
        latestQuestionAge: '2h ago',
        answeredCount: 379,
        pendingCount: 189,
        overdueCount: 67,
        link: '/topics/revenue',
      },
      {
        id: 'topic-009',
        icon: '🌳',
        name: 'Environment',
        count: 498,
        countChange: 7,
        responseRate: 45,
        avgResponseDays: 29,
        topDepartment: 'Environment Maharashtra',
        topDepartmentCode: 'Env MH',
        latestQuestion: 'Tree cutting permissions...',
        latestQuestionLocation: 'Mum',
        latestQuestionAge: '5h ago',
        answeredCount: 224,
        pendingCount: 234,
        overdueCount: 112,
        link: '/topics/environment',
      },
    ]
  }
}

// Export singleton instance
export const LandingPageRepository = new LandingPageRepositoryImpl()
