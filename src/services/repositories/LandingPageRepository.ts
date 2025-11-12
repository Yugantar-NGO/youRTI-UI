/**
 * Landing Page Data Repository
 * Provides mock data for the RTI Dashboard Landing Page
 * In production, this would fetch from an API
 */

import { RecentQuestion } from '@/types/dashboard'

interface LandingPageData {
  dailyEdition: {
    recentQuestions: RecentQuestion[]
  }
}

class LandingPageRepositoryImpl {
  /**
   * Get landing page data (simplified to only return recent questions)
   */
  async getLandingPageData(): Promise<LandingPageData> {
    return {
      dailyEdition: {
        recentQuestions: this.getRecentQuestions(),
      },
    }
  }

  /**
   * Get recent questions data
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
