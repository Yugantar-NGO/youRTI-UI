/**
 * Landing Page Data Repository
 * Provides mock data for the RTI Dashboard Landing Page
 * In production, this would fetch from an API
 */

import {
  LandingPageData,
  DailyEditionData,
  HeroSectionData,
  MainContentData,
  RTIStory,
  RTIAnswer,
  UnansweredRTI,
  RecentQuestion,
  NavigationItem,
  IndiaGlanceStats,
  KeyMetric,
  DepartmentPerformanceChart,
  DepartmentPerformance,
  InsightItem,
  TopicHub,
  ActivityItem,
  SpotlightStory,
  EditionFilter,
} from '@/types/dashboard'

class LandingPageRepositoryImpl {
  private currentFilter?: EditionFilter

  applyEditionFilter(filter: EditionFilter): this {
    this.currentFilter = filter
    return this
  }

  /**
   * Get complete landing page data
   */
  async getLandingPageData(): Promise<LandingPageData> {
    return {
      dailyEdition: await this.getDailyEdition(new Date().toISOString()),
      hero: this.getHeroSectionData(),
      mainContent: this.getMainContentData(),
    }
  }

  /**
   * Get daily edition data for a specific date
   */
  async getDailyEdition(date: string): Promise<DailyEditionData> {
    return {
      editionDate: date,
      leadStory: this.getLeadStory(),
      secondaryStories: this.getSecondaryStories(),
      freshAnswers: this.getFreshAnswers(),
      unansweredQuestions: this.getUnansweredQuestions(),
      recentQuestions: this.getRecentQuestions(),
    }
  }

  /**
   * Get hero section data
   */
  private getHeroSectionData(): HeroSectionData {
    return {
      title: 'RTI Transparency Dashboard',
      subtitle: 'Tracking India\'s Right to Information Requests',
      tagline: 'Stories, Answers & System Performance',
      navigationItems: this.getNavigationItems(),
      stats: {
        rtisFiled: 2847,
        responsesReceived: 2156,
        pending: 691,
      },
      indiaGlance: this.getIndiaGlanceStats(),
    }
  }

  /**
   * Get main content data
   */
  private getMainContentData(): MainContentData {
    return {
      keyMetrics: this.getKeyMetrics(),
      departmentPerformance: {
        summary: {
          highestFulfillment: 'Health (88% answered)',
          slowestResponses: 'Urban Development (avg 28 days)',
          mostAppeals: 'Revenue Dept (22% go to appeal)',
        },
        chartData: this.getDepartmentPerformanceChart(),
      },
      departmentLeaderboard: this.getDepartmentLeaderboard(),
      insights: this.getInsights(),
      topics: this.getTopicHubs(),
      activityFeed: this.getActivityFeed(),
      spotlight: this.getSpotlightStory(),
    }
  }

  /**
   * Mock data generators
   */

  private getLeadStory(): RTIStory {
    return {
      id: 'story-001',
      title: 'RTI on School Repairs Forced Action in Rural Karnataka',
      summary: 'Citizens filed an RTI asking for sanctioned funds and work orders for school repairs in a rural village. The reply showed funds were released but work was incomplete. After the disclosure, the local body completed repairs and published details online.',
      topic: 'Education',
      state: 'Karnataka',
      district: 'Mysuru',
      department: 'Education Department',
      filedDate: '2025-06-05',
      answeredDate: '2025-07-02',
      viewLink: '/rti/story-001',
      isLeadStory: true,
    }
  }

  private getSecondaryStories(): RTIStory[] {
    return [
      {
        id: 'story-002',
        title: 'RTI on medicine stock in PHCs led to fresh supplies',
        summary: 'RTI on medicine stock in PHCs led to fresh supplies and public stock reports.',
        topic: 'Health',
        state: 'Maharashtra',
        department: 'Health Department',
        filedDate: '2025-05-15',
        answeredDate: '2025-06-12',
        viewLink: '/rti/story-002',
      },
      {
        id: 'story-003',
        title: 'RTI on housing scheme beneficiaries exposed ghost names',
        summary: 'RTI on housing scheme beneficiaries exposed ghost names; list corrected.',
        topic: 'Housing',
        state: 'Rajasthan',
        department: 'Housing Department',
        filedDate: '2025-04-20',
        answeredDate: '2025-05-18',
        viewLink: '/rti/story-003',
      },
      {
        id: 'story-004',
        title: 'RTI on tender results forced publication of award data',
        summary: 'RTI on tender results forced publication of award data.',
        topic: 'Procurement',
        state: 'Tamil Nadu',
        department: 'PWD',
        filedDate: '2025-03-10',
        answeredDate: '2025-04-08',
        viewLink: '/rti/story-004',
      },
    ]
  }

  private getFreshAnswers(): RTIAnswer[] {
    return [
      {
        id: 'answer-001',
        question: 'Stock of TB medicines in District Hospital',
        answerSummary: 'Detailed stock register & last 6 months supply shared.',
        department: 'Health',
        state: 'Bihar',
        filedDate: '2025-10-20',
        answeredDate: '2025-11-10',
        viewLink: '/rti/answer-001',
      },
      {
        id: 'answer-002',
        question: 'Scholarship disbursal status for SC students in 2024',
        answerSummary: 'List of beneficiaries & pending applications shared.',
        department: 'Education',
        state: 'Madhya Pradesh',
        filedDate: '2025-10-25',
        answeredDate: '2025-11-09',
        viewLink: '/rti/answer-002',
      },
      {
        id: 'answer-003',
        question: 'Tanker water trips in Ward 14',
        answerSummary: 'GPS logs for 3 months provided.',
        department: 'Urban Local Body',
        state: 'Delhi',
        filedDate: '2025-10-28',
        answeredDate: '2025-11-09',
        viewLink: '/rti/answer-003',
      },
    ]
  }

  private getUnansweredQuestions(): UnansweredRTI[] {
    return [
      {
        id: 'unanswered-001',
        question: 'Reasons for 6-month delay in widow pensions in rural block',
        whyMatters: 'Affects ~3,200 pensioners in the block.',
        status: 'pending',
        daysElapsed: 45,
        daysOverdue: 15,
        department: 'Social Welfare',
        state: 'Uttar Pradesh',
        trackLink: '/rti/track/unanswered-001',
      },
      {
        id: 'unanswered-002',
        question: 'Pollution readings of main city river for last 2 years',
        whyMatters: 'Public health & environment risk.',
        status: 'first_appeal',
        daysElapsed: 60,
        daysOverdue: 30,
        department: 'Pollution Control Board',
        state: 'Gujarat',
        trackLink: '/rti/track/unanswered-002',
      },
      {
        id: 'unanswered-003',
        question: 'Waiting list & allotment rules for city housing scheme',
        whyMatters: 'Thousands of families affected.',
        status: 'pending',
        daysElapsed: 75,
        daysOverdue: 45,
        department: 'Housing',
        state: 'Maharashtra',
        trackLink: '/rti/track/unanswered-003',
      },
    ]
  }

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

  private getNavigationItems(): NavigationItem[] {
    return [
      {
        id: 'nav-001',
        icon: 'Home',
        label: 'Today\'s Edition',
        link: '#daily-edition',
        description: 'Latest stories and answers',
      },
      {
        id: 'nav-002',
        icon: 'FolderOpen',
        label: 'By Issue',
        link: '/topics',
        description: 'Browse by topic',
      },
      {
        id: 'nav-003',
        icon: 'Building2',
        label: 'By Department',
        link: '/departments',
        description: 'Department performance',
      },
      {
        id: 'nav-004',
        icon: 'MapPin',
        label: 'By Region',
        link: '/regions',
        description: 'State and district views',
      },
      {
        id: 'nav-005',
        icon: 'FileText',
        label: 'How RTI Works',
        link: '/how-it-works',
        description: 'Learn about RTI',
      },
      {
        id: 'nav-006',
        icon: 'BarChart3',
        label: 'More Dashboards',
        link: '/dashboards',
        description: 'Other analytics',
      },
    ]
  }

  private getIndiaGlanceStats(): IndiaGlanceStats {
    return {
      answeredInTime: {
        percentage: 68,
        label: 'Answered in time (within 30 days)',
      },
      answeredLate: {
        percentage: 17,
        label: 'Answered late',
      },
      inAppeal: {
        percentage: 15,
        label: 'In Appeal (1st/2nd)',
      },
    }
  }

  private getKeyMetrics(): KeyMetric[] {
    return [
      {
        id: 'metric-001',
        icon: 'Building',
        title: 'Most Transparent Ministry',
        value: 'DoPT',
        subtitle: 'Department of Personnel & Training',
        trend: {
          value: 0,
          direction: 'neutral',
        },
      },
      {
        id: 'metric-002',
        icon: 'Clock',
        title: 'Fastest Responding Dept',
        value: 'Rural Development',
        subtitle: 'Avg 14 days response time',
        trend: {
          value: 0,
          direction: 'neutral',
        },
      },
      {
        id: 'metric-003',
        icon: 'AlertTriangle',
        title: 'Most Transfers',
        value: 'Education',
        subtitle: '18% transfer rate',
        trend: {
          value: 0,
          direction: 'neutral',
        },
      },
      {
        id: 'metric-004',
        icon: 'TrendingDown',
        title: 'Average Fulfillment Rate',
        value: '61%',
        subtitle: 'Across all departments',
        trend: {
          value: 0,
          direction: 'neutral',
        },
      },
      {
        id: 'metric-005',
        icon: 'Tag',
        title: 'Top Topic',
        value: 'Infrastructure',
        subtitle: '2,340 RTIs filed',
        trend: {
          value: 0,
          direction: 'neutral',
        },
      },
      {
        id: 'metric-006',
        icon: 'Search',
        title: 'Active RTIs This Week',
        value: '83',
        subtitle: 'New filings',
        trend: {
          value: 0,
          direction: 'neutral',
        },
      },
    ]
  }

  private getDepartmentPerformanceChart(): DepartmentPerformanceChart[] {
    return [
      {
        department: 'Health',
        fulfillmentRate: 88,
        avgResponseDays: 12,
        transferRate: 5,
        totalRTIs: 1234,
      },
      {
        department: 'Education',
        fulfillmentRate: 82,
        avgResponseDays: 15,
        transferRate: 8,
        totalRTIs: 987,
      },
      {
        department: 'PWD',
        fulfillmentRate: 78,
        avgResponseDays: 18,
        transferRate: 12,
        totalRTIs: 756,
      },
      {
        department: 'Urban Dev.',
        fulfillmentRate: 75,
        avgResponseDays: 20,
        transferRate: 15,
        totalRTIs: 654,
      },
      {
        department: 'Revenue',
        fulfillmentRate: 72,
        avgResponseDays: 22,
        transferRate: 18,
        totalRTIs: 543,
      },
    ]
  }

  private getDepartmentLeaderboard(): DepartmentPerformance[] {
    return [
      {
        id: 'dept-001',
        name: 'Department of Personnel & Training',
        rank: 1,
        totalRTIs: 1245,
        fulfillmentRate: 89,
        avgResponseDays: 18,
        transferRate: 2,
        trend: 'up',
      },
      {
        id: 'dept-002',
        name: 'Health & Family Welfare',
        rank: 2,
        totalRTIs: 2180,
        fulfillmentRate: 76,
        avgResponseDays: 25,
        transferRate: 6,
        trend: 'stable',
      },
      {
        id: 'dept-003',
        name: 'Rural Development',
        rank: 3,
        totalRTIs: 980,
        fulfillmentRate: 74,
        avgResponseDays: 14,
        transferRate: 8,
        trend: 'up',
      },
      {
        id: 'dept-004',
        name: 'Ministry of Defence',
        rank: 4,
        totalRTIs: 1520,
        fulfillmentRate: 68,
        avgResponseDays: 28,
        transferRate: 12,
        trend: 'down',
      },
      {
        id: 'dept-005',
        name: 'Railways',
        rank: 5,
        totalRTIs: 3240,
        fulfillmentRate: 65,
        avgResponseDays: 32,
        transferRate: 15,
        trend: 'down',
      },
      {
        id: 'dept-006',
        name: 'Home Affairs',
        rank: 6,
        totalRTIs: 1890,
        fulfillmentRate: 62,
        avgResponseDays: 35,
        transferRate: 14,
        trend: 'stable',
      },
      {
        id: 'dept-007',
        name: 'Finance',
        rank: 7,
        totalRTIs: 2450,
        fulfillmentRate: 58,
        avgResponseDays: 38,
        transferRate: 16,
        trend: 'down',
      },
      {
        id: 'dept-008',
        name: 'Education',
        rank: 8,
        totalRTIs: 1650,
        fulfillmentRate: 54,
        avgResponseDays: 42,
        transferRate: 18,
        trend: 'down',
      },
    ]
  }

  private getInsights(): InsightItem[] {
    return [
      {
        id: 'insight-001',
        icon: 'BarChart3',
        text: '30% RTIs cite CCS (Conduct) Rules',
        category: 'fact',
      },
      {
        id: 'insight-002',
        icon: 'TrendingUp',
        text: '5,200 RTIs reveal delays in construction projects',
        category: 'trend',
      },
      {
        id: 'insight-003',
        icon: 'TrendingUp',
        text: '12% RTIs mentioning salary stoppage rose this quarter',
        category: 'trend',
      },
      {
        id: 'insight-004',
        icon: 'BarChart3',
        text: 'Top states filing RTIs: Maharashtra, Telangana, Delhi',
        category: 'fact',
      },
      {
        id: 'insight-005',
        icon: 'TrendingUp',
        text: '25% Environmental clearance RTIs up',
        category: 'trend',
      },
      {
        id: 'insight-006',
        icon: 'BarChart3',
        text: '1,840 Pension-related RTIs',
        category: 'fact',
      },
    ]
  }

  private getTopicHubs(): TopicHub[] {
    return [
      {
        id: 'topic-001',
        name: 'Budget & Finance',
        icon: 'Coins',
        rtiCount: 2850,
        link: '/topics/budget-finance',
      },
      {
        id: 'topic-002',
        name: 'Infrastructure',
        icon: 'Construction',
        rtiCount: 2340,
        link: '/topics/infrastructure',
      },
      {
        id: 'topic-003',
        name: 'Education',
        icon: 'GraduationCap',
        rtiCount: 1650,
        link: '/topics/education',
      },
      {
        id: 'topic-004',
        name: 'Health',
        icon: 'Stethoscope',
        rtiCount: 2180,
        link: '/topics/health',
      },
      {
        id: 'topic-005',
        name: 'Employment & Pay',
        icon: 'Briefcase',
        rtiCount: 3120,
        link: '/topics/employment-pay',
      },
      {
        id: 'topic-006',
        name: 'Environment',
        icon: 'TreePine',
        rtiCount: 980,
        link: '/topics/environment',
      },
    ]
  }

  private getActivityFeed(): ActivityItem[] {
    return [
      {
        id: 'activity-001',
        type: 'answered',
        title: 'Medicine stock in PHCs, Ward 12',
        department: 'Health',
        date: '2025-11-10',
        link: '/rti/activity-001',
      },
      {
        id: 'activity-002',
        type: 'pending',
        title: 'Road repairs in residential colony',
        department: 'PWD',
        date: '2025-11-08',
        link: '/rti/activity-002',
      },
      {
        id: 'activity-003',
        type: 'denied',
        title: 'Building plan approvals list',
        department: 'Urban Local Body',
        date: '2025-11-05',
        link: '/rti/activity-003',
      },
    ]
  }

  private getSpotlightStory(): SpotlightStory {
    return {
      id: 'spotlight-001',
      rtiId: 'rti-12345',
      title: 'RTI on city water testing forced weekly reports online',
      summary: 'Citizens asked for water quality test reports from the city corporation. The RTI response revealed irregular testing. After media attention and citizen pressure, the corporation now publishes weekly water quality reports online, covering all major areas.',
      impact: [
        'Weekly water reports published online',
        'Old pipelines scheduled for replacement',
        'New water testing lab established',
      ],
      date: '2025-08-03',
      department: 'Urban Development',
    }
  }
}

// Export singleton instance
export const LandingPageRepository = new LandingPageRepositoryImpl()
