/**
 * Landing Page Data Repository
 * Provides mock data for the RTI Dashboard Landing Page
 * In production, this would fetch from an API
 *
 * Extends BaseRepository to leverage error handling, retry logic, and caching.
 */

import { RecentQuestion } from '@/types/dashboard'
import { BaseRepository } from './base/BaseRepository'

export interface LandingPageData {
  dailyEdition: {
    recentQuestions: RecentQuestion[]
  }
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
        }

        // Validate data before returning
        this.validate(
          data,
          (d) => Array.isArray(d.dailyEdition.recentQuestions),
          'Invalid landing page data: recentQuestions must be an array'
        )

        this.logInfo('Successfully fetched landing page data', {
          questionCount: data.dailyEdition.recentQuestions.length,
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
}

// Export singleton instance
export const LandingPageRepository = new LandingPageRepositoryImpl()
