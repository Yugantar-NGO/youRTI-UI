/**
 * Analytics and Department Performance Mock Data
 * System metrics, department rankings, and performance data
 */

import type {
  DepartmentMetrics,
  SystemAnalytics,
  TimelinessData,
  HighImpactFilingData,
  AppealsData,
  NationalStats,
} from '@/types/redesign'

// ============================================
// National Statistics
// ============================================

export const MOCK_NATIONAL_STATS: NationalStats = {
  totalRTIsFiled: 347856,
  rtisFiled30Days: 4238,
  totalResponses: 289432,
  responsesReceived30Days: 3567,
  pendingRTIs: 58424,
  overdueRTIs: 23156,

  // Percentages
  answeredInTimePercent: 68,
  answeredLatePercent: 17,
  inAppealPercent: 12,
  deniedPercent: 3,

  // Averages
  avgResponseDays: 24,
  avgAppealDays: 56,

  lastUpdated: '2025-11-11T08:00:00Z',
}

// ============================================
// Timeliness Data
// ============================================

export const MOCK_TIMELINESS_DATA: TimelinessData = {
  period: 'month',
  answeredOnTime: 2987,
  answeredLate: 724,
  stillPending: 1245,
  averageDays: 22,
  sparklineData: [
    18, 20, 19, 22, 24, 21, 23, 25, 22, 24, 23, 22, 24, 23, 25, 24, 22, 21, 23, 24, 25, 23, 22,
    24, 26, 25, 23, 22, 24, 22,
  ],
  trend: 'stable',
}

// ============================================
// High Impact Filings Data
// ============================================

export const MOCK_HIGH_IMPACT_FILINGS: HighImpactFilingData = {
  period: 'This Week',
  totalFilings: 834,
  impactFilings: 127,
  byTopic: [
    { topic: 'Healthcare', count: 28 },
    { topic: 'Infrastructure', count: 24 },
    { topic: 'Education', count: 19 },
    { topic: 'Employment', count: 16 },
    { topic: 'Food Security', count: 14 },
    { topic: 'Environment', count: 12 },
    { topic: 'Water & Sanitation', count: 9 },
    { topic: 'Transport', count: 5 },
  ],
  trend: 'up',
}

// ============================================
// Appeals Data
// ============================================

export const MOCK_APPEALS_DATA: AppealsData = {
  totalAppeals: 4567,
  firstAppeals: 3456,
  secondAppeals: 1111,
  escalationRate: 13.2,
  successRate: 42,
  topReasonsForAppeal: [
    { reason: 'Information not provided', count: 1234 },
    { reason: 'Incomplete response', count: 987 },
    { reason: 'Delay beyond 30 days', count: 756 },
    { reason: 'Information denied', count: 543 },
    { reason: 'Third party information', count: 432 },
    { reason: 'Fee dispute', count: 234 },
  ],
  stackedBarData: [
    { department: 'Health', firstAppeals: 234, secondAppeals: 67 },
    { department: 'Education', firstAppeals: 198, secondAppeals: 54 },
    { department: 'PWD', firstAppeals: 312, secondAppeals: 89 },
    { department: 'Revenue', firstAppeals: 267, secondAppeals: 123 },
    { department: 'Urban Dev', firstAppeals: 189, secondAppeals: 76 },
    { department: 'Transport', firstAppeals: 145, secondAppeals: 45 },
    { department: 'Environment', firstAppeals: 98, secondAppeals: 34 },
  ],
}

// ============================================
// System Analytics
// ============================================

export const MOCK_SYSTEM_ANALYTICS: SystemAnalytics = {
  timeliness: MOCK_TIMELINESS_DATA,
  highImpactFilings: MOCK_HIGH_IMPACT_FILINGS,
  appeals: MOCK_APPEALS_DATA,
  generatedAt: '2025-11-11T08:00:00Z',
}

// ============================================
// Department Performance Metrics
// ============================================

export const MOCK_DEPARTMENT_METRICS: DepartmentMetrics[] = [
  {
    id: 'dept-001',
    name: 'Department of Personnel & Training',
    shortName: 'DoPT',
    rank: 1,
    totalRTIs: 2845,
    fulfillmentRate: 89,
    avgResponseDays: 18,
    transferRate: 2,
    appealRate: 8,
    trend: 'up',
    trendPercentage: 3,
    answeredOnTime: 2089,
    answeredLate: 445,
    pending: 234,
    denied: 77,
    transparencyScore: 92,
  },
  {
    id: 'dept-002',
    name: 'Ministry of Rural Development',
    shortName: 'Rural Dev',
    rank: 2,
    totalRTIs: 1867,
    fulfillmentRate: 86,
    avgResponseDays: 14,
    transferRate: 4,
    appealRate: 9,
    trend: 'up',
    trendPercentage: 5,
    answeredOnTime: 1456,
    answeredLate: 249,
    pending: 123,
    denied: 39,
    transparencyScore: 88,
  },
  {
    id: 'dept-003',
    name: 'Health & Family Welfare',
    shortName: 'Health',
    rank: 3,
    totalRTIs: 3456,
    fulfillmentRate: 82,
    avgResponseDays: 22,
    transferRate: 6,
    appealRate: 11,
    trend: 'stable',
    trendPercentage: 0,
    answeredOnTime: 2456,
    answeredLate: 567,
    pending: 345,
    denied: 88,
    transparencyScore: 85,
  },
  {
    id: 'dept-004',
    name: 'Ministry of Education',
    shortName: 'Education',
    rank: 4,
    totalRTIs: 2934,
    fulfillmentRate: 78,
    avgResponseDays: 25,
    transferRate: 8,
    appealRate: 14,
    trend: 'down',
    trendPercentage: -2,
    answeredOnTime: 1989,
    answeredLate: 498,
    pending: 367,
    denied: 80,
    transparencyScore: 81,
  },
  {
    id: 'dept-005',
    name: 'Public Works & Infrastructure',
    shortName: 'PWD',
    rank: 5,
    totalRTIs: 2567,
    fulfillmentRate: 75,
    avgResponseDays: 28,
    transferRate: 12,
    appealRate: 16,
    trend: 'stable',
    trendPercentage: 1,
    answeredOnTime: 1678,
    answeredLate: 567,
    pending: 267,
    denied: 55,
    transparencyScore: 78,
  },
  {
    id: 'dept-006',
    name: 'Ministry of Environment & Forests',
    shortName: 'Environment',
    rank: 6,
    totalRTIs: 1456,
    fulfillmentRate: 74,
    avgResponseDays: 26,
    transferRate: 9,
    appealRate: 13,
    trend: 'up',
    trendPercentage: 4,
    answeredOnTime: 945,
    answeredLate: 287,
    pending: 189,
    denied: 35,
    transparencyScore: 76,
  },
  {
    id: 'dept-007',
    name: 'Urban Development',
    shortName: 'Urban Dev',
    rank: 7,
    totalRTIs: 2123,
    fulfillmentRate: 72,
    avgResponseDays: 29,
    transferRate: 14,
    appealRate: 17,
    trend: 'down',
    trendPercentage: -3,
    answeredOnTime: 1345,
    answeredLate: 456,
    pending: 267,
    denied: 55,
    transparencyScore: 74,
  },
  {
    id: 'dept-008',
    name: 'Revenue Department',
    shortName: 'Revenue',
    rank: 8,
    totalRTIs: 1989,
    fulfillmentRate: 69,
    avgResponseDays: 32,
    transferRate: 16,
    appealRate: 22,
    trend: 'down',
    trendPercentage: -5,
    answeredOnTime: 1123,
    answeredLate: 398,
    pending: 389,
    denied: 79,
    transparencyScore: 71,
  },
  {
    id: 'dept-009',
    name: 'Ministry of Railways',
    shortName: 'Railways',
    rank: 9,
    totalRTIs: 4567,
    fulfillmentRate: 67,
    avgResponseDays: 33,
    transferRate: 15,
    appealRate: 19,
    trend: 'stable',
    trendPercentage: 0,
    answeredOnTime: 2678,
    answeredLate: 789,
    pending: 890,
    denied: 210,
    transparencyScore: 68,
  },
  {
    id: 'dept-010',
    name: 'Ministry of Defence',
    shortName: 'Defence',
    rank: 10,
    totalRTIs: 2345,
    fulfillmentRate: 65,
    avgResponseDays: 35,
    transferRate: 18,
    appealRate: 21,
    trend: 'down',
    trendPercentage: -4,
    answeredOnTime: 1234,
    answeredLate: 456,
    pending: 543,
    denied: 112,
    transparencyScore: 65,
  },
  {
    id: 'dept-011',
    name: 'Ministry of Home Affairs',
    shortName: 'Home Affairs',
    rank: 11,
    totalRTIs: 3124,
    fulfillmentRate: 62,
    avgResponseDays: 36,
    transferRate: 17,
    appealRate: 23,
    trend: 'down',
    trendPercentage: -6,
    answeredOnTime: 1567,
    answeredLate: 567,
    pending: 789,
    denied: 201,
    transparencyScore: 62,
  },
  {
    id: 'dept-012',
    name: 'Ministry of Finance',
    shortName: 'Finance',
    rank: 12,
    totalRTIs: 2789,
    fulfillmentRate: 58,
    avgResponseDays: 38,
    transferRate: 19,
    appealRate: 25,
    trend: 'down',
    trendPercentage: -7,
    answeredOnTime: 1345,
    answeredLate: 456,
    pending: 789,
    denied: 199,
    transparencyScore: 59,
  },
]

// ============================================
// Department Summary Stats
// ============================================

export const MOCK_DEPARTMENT_SUMMARY = {
  highestFulfillment: 'DoPT (89% answered)',
  fastestResponse: 'Rural Development (avg 14 days)',
  slowestResponse: 'Finance (avg 38 days)',
  mostAppeals: 'Finance (25% go to appeal)',
  mostTransparent: 'DoPT (Transparency Score: 92)',
  leastTransparent: 'Finance (Transparency Score: 59)',
  totalDepartments: MOCK_DEPARTMENT_METRICS.length,
  avgFulfillmentRate: 73,
  avgResponseDays: 27,
}

// ============================================
// Export All
// ============================================

export {
  MOCK_NATIONAL_STATS,
  MOCK_TIMELINESS_DATA,
  MOCK_HIGH_IMPACT_FILINGS,
  MOCK_APPEALS_DATA,
  MOCK_SYSTEM_ANALYTICS,
  MOCK_DEPARTMENT_METRICS,
  MOCK_DEPARTMENT_SUMMARY,
}
