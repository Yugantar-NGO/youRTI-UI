/**
 * Dashboard Data Repository
 * Provides mock data for dashboard statistics, departments, and other aggregated data
 */

import {
  DashboardStats,
  LocalAreaStats,
  DepartmentPerformance,
  ServiceCategory,
  InsightData,
  HighImpactRTI,
  FreshAnswer,
  TopicCategory,
  RTIRight,
  ToolkitItem,
  SpotlightStory,
  RegionalPerformance,
  EditionFilter
} from '@/types/dashboard'
import { RTIRepository } from './RTIRepository'
import { daysBetween, calculatePercentageChange } from '@/lib/utils'

class DashboardDataRepositoryImpl {
  private currentFilter?: EditionFilter

  applyEditionFilter(filter: EditionFilter): this {
    this.currentFilter = filter
    return this
  }

  /**
   * Get overall dashboard statistics
   */
  getDashboardStats(): DashboardStats {
    const filteredRepo = RTIRepository.applyEditionFilter(this.currentFilter || { level: 'national' })
    const allRTIs = filteredRepo.getAll()
    const thisYear = new Date().getFullYear()
    const rtisThisYear = allRTIs.filter(rti => new Date(rti.filedDate).getFullYear() === thisYear)

    const responsesWithin30Days = rtisThisYear.filter(rti => {
      if (!rti.responseDate) return false
      const days = daysBetween(rti.filedDate, rti.responseDate)
      return days <= 30
    }).length

    const pending = filteredRepo.getByStatus('pending')
    const oldestPending = pending.reduce((max, rti) => {
      const days = daysBetween(rti.filedDate)
      return days > max ? days : max
    }, 0)

    const respondedRTIs = rtisThisYear.filter(rti => rti.responseDate)
    const totalResponseDays = respondedRTIs.reduce((sum, rti) => {
      return sum + daysBetween(rti.filedDate, rti.responseDate!)
    }, 0)
    const avgResponseDays = respondedRTIs.length > 0 ? Math.round(totalResponseDays / respondedRTIs.length) : 0

    return {
      totalFiled: allRTIs.length,
      totalFiledThisYear: rtisThisYear.length,
      responsesWithin30Days,
      responseRate: rtisThisYear.length > 0 ? Math.round((responsesWithin30Days / rtisThisYear.length) * 100) : 0,
      avgResponseDays,
      pending: pending.length,
      oldestPendingDays: oldestPending
    }
  }

  /**
   * Get local area statistics
   */
  getLocalAreaStats(): LocalAreaStats {
    const filter = this.currentFilter || { level: 'national' }
    const filteredRepo = RTIRepository.applyEditionFilter(filter)
    const allRTIs = filteredRepo.getAll()

    const thisMonth = new Date().getMonth()
    const thisYear = new Date().getFullYear()
    const rtisThisMonth = allRTIs.filter(rti => {
      const date = new Date(rti.filedDate)
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear
    })

    const responsesReceived = rtisThisMonth.filter(rti => rti.responseDate).length
    const pendingBeyond30Days = rtisThisMonth.filter(rti => {
      if (rti.responseDate) return false
      const days = daysBetween(rti.filedDate)
      return days > 30
    }).length

    const respondedThisMonth = rtisThisMonth.filter(rti => rti.responseDate)
    const avgResponseDays = respondedThisMonth.length > 0
      ? Math.round(respondedThisMonth.reduce((sum, rti) => sum + daysBetween(rti.filedDate, rti.responseDate!), 0) / respondedThisMonth.length)
      : 0

    // Count by category
    const categoryCount: { [key: string]: number } = {}
    rtisThisMonth.forEach(rti => {
      if (rti.category) {
        categoryCount[rti.category] = (categoryCount[rti.category] || 0) + 1
      }
    })

    const topIssues = Object.entries(categoryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }))

    return {
      state: filter.state || 'India',
      district: filter.district,
      filedThisMonth: rtisThisMonth.length,
      responsesReceived,
      pendingBeyond30Days,
      avgResponseDays,
      topIssues
    }
  }

  /**
   * Get department performance data
   */
  getDepartmentPerformance(): DepartmentPerformance[] {
    const filteredRepo = RTIRepository.applyEditionFilter(this.currentFilter || { level: 'national' })
    const allRTIs = filteredRepo.getAll()

    // Group by department
    const deptMap: { [key: string]: any } = {}
    allRTIs.forEach(rti => {
      if (!deptMap[rti.department]) {
        deptMap[rti.department] = {
          totalRTIs: 0,
          fulfilled: 0,
          totalResponseDays: 0,
          respondedCount: 0,
          transfers: 0
        }
      }

      deptMap[rti.department].totalRTIs++
      if (rti.status === 'disclosed') {
        deptMap[rti.department].fulfilled++
      }
      if (rti.responseDate) {
        deptMap[rti.department].respondedCount++
        deptMap[rti.department].totalResponseDays += daysBetween(rti.filedDate, rti.responseDate)
      }
    })

    const departments: DepartmentPerformance[] = Object.entries(deptMap).map(([name, data]) => {
      const fulfillmentRate = data.totalRTIs > 0 ? (data.fulfilled / data.totalRTIs) * 100 : 0
      const avgResponseDays = data.respondedCount > 0 ? Math.round(data.totalResponseDays / data.respondedCount) : 0
      const transferRate = data.totalRTIs > 0 ? (data.transfers / data.totalRTIs) * 100 : 5 + Math.random() * 15

      return {
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        rank: 0,
        totalRTIs: data.totalRTIs,
        fulfillmentRate: Math.round(fulfillmentRate),
        avgResponseDays,
        transferRate: Math.round(transferRate),
        trend: Math.random() > 0.5 ? 'up' : 'down' as 'up' | 'down' | 'stable'
      }
    })

    // Sort by fulfillment rate and assign ranks
    departments.sort((a, b) => b.fulfillmentRate - a.fulfillmentRate || a.avgResponseDays - b.avgResponseDays)
    departments.forEach((dept, index) => {
      dept.rank = index + 1
    })

    return departments
  }

  /**
   * Get service categories
   */
  getServiceCategories(): ServiceCategory[] {
    return [
      { id: 'ration', name: 'Ration / PDS', icon: '🧾', rtiCount: 234, recentActivity: true },
      { id: 'health', name: 'Health', icon: '🧑‍⚕️', rtiCount: 156, recentActivity: true },
      { id: 'education', name: 'Education', icon: '🎓', rtiCount: 189, recentActivity: false },
      { id: 'power', name: 'Power Supply', icon: '💡', rtiCount: 97, recentActivity: true }
    ]
  }

  /**
   * Get insights and trends
   */
  getInsights(): InsightData[] {
    return [
      {
        id: 'insight-1',
        type: 'trend',
        title: 'Local Services Dominate',
        description: '62% of RTIs in your state are about local services (roads, water, PDS).',
        icon: '📊'
      },
      {
        id: 'insight-2',
        type: 'milestone',
        title: 'Response Time Improved',
        description: 'Median response time improved by 5 days compared to last year.',
        metric: '-5 days',
        change: -5,
        icon: '📊'
      },
      {
        id: 'insight-3',
        type: 'trend',
        title: 'Appeals Rate',
        description: '1 in 20 RTIs goes to appeal, showing where follow-up is needed.',
        metric: '5%',
        icon: '📊'
      }
    ]
  }

  /**
   * Get high impact RTIs
   */
  getHighImpactRTIs(): HighImpactRTI[] {
    const baseRTIs = RTIRepository.applyEditionFilter(this.currentFilter || { level: 'national' }).getAll()

    return [
      {
        ...baseRTIs.find(r => r.id === 'rti-011')!,
        outcome: 'Missing permits exposed; inspection ordered by district admin.',
        impactScore: 95,
        reactions: 892,
        shares: 156,
        mediaReferences: 12
      },
      {
        ...baseRTIs.find(r => r.id === 'rti-013')!,
        outcome: 'Data showed 2-year backlog; triggered local media coverage.',
        impactScore: 88,
        reactions: 234,
        shares: 89,
        mediaReferences: 5
      }
    ]
  }

  /**
   * Get fresh answers (recently responded RTIs with summaries)
   */
  getFreshAnswers(): FreshAnswer[] {
    const recentlyResponded = RTIRepository.applyEditionFilter(this.currentFilter || { level: 'national' })
      .getRecentlyResponded(10)

    return recentlyResponded.slice(0, 5).map(rti => ({
      id: rti.id,
      title: rti.title,
      answerSummary: this.generateAnswerSummary(rti.title, rti.category),
      filedDate: rti.filedDate,
      answeredDate: rti.responseDate!,
      department: rti.department,
      daysToRespond: daysBetween(rti.filedDate, rti.responseDate!)
    }))
  }

  /**
   * Get topic categories
   */
  getTopicCategories(): TopicCategory[] {
    const filteredRepo = RTIRepository.applyEditionFilter(this.currentFilter || { level: 'national' })
    const allRTIs = filteredRepo.getAll()

    const categoryMap: { [key: string]: number } = {}
    allRTIs.forEach(rti => {
      if (rti.category) {
        categoryMap[rti.category] = (categoryMap[rti.category] || 0) + 1
      }
    })

    const iconMap: { [key: string]: string } = {
      'Healthcare': '🧑‍⚕️',
      'Infrastructure': '🚧',
      'Education': '🎓',
      'Environment': '🌳',
      'Welfare': '🧾',
      'Transport': '🚌',
      'Housing': '🏠',
      'Finance': '💰'
    }

    return Object.entries(categoryMap).map(([name, count]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      icon: iconMap[name] || '📂',
      rtiCount: count,
      slug: name.toLowerCase().replace(/\s+/g, '-')
    }))
  }

  /**
   * Get RTI rights information
   */
  getRTIRights(): RTIRight[] {
    return [
      {
        id: 'right-1',
        title: 'Who can file?',
        description: 'Any citizen of India can file an RTI.',
        icon: '👤'
      },
      {
        id: 'right-2',
        title: 'Response Timeline',
        description: 'Public authorities must reply within 30 days in most cases.',
        icon: '⏰'
      },
      {
        id: 'right-3',
        title: 'Urgent Matters',
        description: 'If the matter affects life or liberty, information should be given within 48 hours.',
        icon: '🚨'
      },
      {
        id: 'right-4',
        title: 'Appeal Rights',
        description: 'If information is delayed/denied without good reason, you can file an appeal.',
        icon: '⚖️'
      }
    ]
  }

  /**
   * Get toolkit items
   */
  getToolkitItems(): ToolkitItem[] {
    return [
      {
        id: 'toolkit-1',
        title: 'RTI Sample Formats',
        description: 'Sample formats for common issues (ration, pensions, land records, fees)',
        icon: '📝'
      },
      {
        id: 'toolkit-2',
        title: 'Identify Right Department',
        description: 'How to identify the right department for your query',
        icon: '🎯'
      },
      {
        id: 'toolkit-3',
        title: 'No Reply? Next Steps',
        description: 'What to do if you get no reply within the deadline',
        icon: '❓'
      }
    ]
  }

  /**
   * Get spotlight story
   */
  getSpotlightStory(): SpotlightStory {
    return {
      id: 'spotlight-1',
      rtiId: 'rti-011',
      title: 'RTI on Village School Repairs Exposes Misuse of Funds',
      summary: 'A comprehensive RTI investigation revealed that allocated funds for school repairs were not utilized properly, leading to unsafe classroom conditions.',
      impact: [
        'School repaired; safer classrooms',
        'Local body now publishes repair details online every quarter'
      ],
      date: '2025-08-03',
      department: 'Education Department'
    }
  }

  /**
   * Get regional performance data
   */
  getRegionalPerformance(): RegionalPerformance[] {
    return [
      { state: 'Maharashtra', totalFiled: 3245, responseRate: 89, avgResponseDays: 18, trend: 'increase', trendPercentage: 12 },
      { state: 'Delhi', totalFiled: 2987, responseRate: 85, avgResponseDays: 20, trend: 'increase', trendPercentage: 8 },
      { state: 'Karnataka', totalFiled: 2456, responseRate: 81, avgResponseDays: 22, trend: 'neutral', trendPercentage: 2 },
      { state: 'Tamil Nadu', totalFiled: 2134, responseRate: 83, avgResponseDays: 19, trend: 'increase', trendPercentage: 5 }
    ]
  }

  /**
   * Helper: Generate answer summary based on title and category
   */
  private generateAnswerSummary(title: string, category?: string): string {
    const summaries = [
      'Stockout confirmed, fresh supply ordered; stock details shared for each location.',
      'Expenditure details shared; menu update ordered on notice board.',
      'Complete list provided with compliance status and inspection dates.',
      'Contract details shared including vendor information and payment schedule.',
      'Detailed breakdown provided showing ward-wise collection and pending amounts.'
    ]
    return summaries[Math.floor(Math.random() * summaries.length)]
  }
}

// Export singleton instance
export const DashboardDataRepository = new DashboardDataRepositoryImpl()
