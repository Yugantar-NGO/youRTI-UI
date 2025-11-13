/**
 * Dashboard Data Transformation Strategy
 *
 * Transforms raw landing page data into dashboard-ready format
 * with enriched questions and computed properties.
 */

import { DataTransformationStrategy } from './DataTransformationStrategy'
import { LandingPageData } from '../LandingPageRepository'
import { RecentQuestion } from '@/types/dashboard'

/**
 * Enriched question with hook line for display
 */
export interface EnrichedQuestion extends RecentQuestion {
  hookLine: string
}

/**
 * Dashboard data with enriched questions
 */
export interface DashboardData {
  dailyEdition: {
    recentQuestions: EnrichedQuestion[]
  }
}

/**
 * Transformation strategy for dashboard data
 *
 * Enriches landing page data with display-friendly properties
 * like hook lines for each question.
 */
export class DashboardDataTransformationStrategy
  implements DataTransformationStrategy<LandingPageData, DashboardData>
{
  /**
   * Transform landing page data to dashboard data
   *
   * @param data - Raw landing page data
   * @returns Enriched dashboard data
   */
  transform(data: LandingPageData): DashboardData {
    return {
      dailyEdition: {
        recentQuestions: data.dailyEdition.recentQuestions.map((question) =>
          this.enrichQuestion(question)
        ),
      },
    }
  }

  /**
   * Validate landing page data structure
   *
   * @param data - Landing page data to validate
   * @returns True if valid
   */
  validate(data: LandingPageData): boolean {
    return (
      data &&
      data.dailyEdition &&
      Array.isArray(data.dailyEdition.recentQuestions) &&
      data.dailyEdition.recentQuestions.every(this.isValidQuestion)
    )
  }

  /**
   * Enrich a question with computed properties
   *
   * @param question - Raw question
   * @returns Enriched question with hook line
   */
  private enrichQuestion(question: RecentQuestion): EnrichedQuestion {
    return {
      ...question,
      hookLine: this.generateHookLine(question),
    }
  }

  /**
   * Generate a hook line for a question
   *
   * Creates engaging copy for questions to draw reader attention.
   *
   * @param question - The question to generate a hook for
   * @returns Hook line string
   */
  private generateHookLine(question: RecentQuestion): string {
    const topicLower = question.topic.toLowerCase()
    const department = question.department

    // Different patterns based on topic
    const patterns: Record<string, (q: RecentQuestion) => string> = {
      pensions: (q) => `Citizens want transparency on ${topicLower} in ${department}`,
      roads: (q) => `Public demanding answers about ${topicLower} from ${department}`,
      education: (q) => `Community seeks clarity on ${topicLower} from ${department}`,
      health: (q) => `Residents question ${department} about ${topicLower}`,
    }

    const pattern = patterns[topicLower] || patterns.pensions
    return pattern(question)
  }

  /**
   * Validate a single question object
   *
   * @param question - Question to validate
   * @returns True if valid
   */
  private isValidQuestion(question: any): boolean {
    return (
      question &&
      typeof question.id === 'string' &&
      typeof question.question === 'string' &&
      typeof question.topic === 'string' &&
      typeof question.department === 'string' &&
      typeof question.filedDate === 'string' &&
      typeof question.status === 'string'
    )
  }
}
