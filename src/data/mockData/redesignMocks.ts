/**
 * Comprehensive Mock Data for RTI Dashboard Redesign
 * Realistic, varied mock data for all sections
 */

import type {
  WinStory,
  PendingCase,
  RTIQuestion,
  BigWinOfTheWeek,
  UrgentUnanswered,
  TopicCategory,
} from '@/types/redesign'
import {
  generateLLMHook,
  generateUrgencyHook,
  generateQuestionHook,
  generateOutcomeTitle,
} from '@/utils/llmHookGenerator'
import {
  generateImpactOutcome,
  calculateDaysBetween,
} from '@/utils/impactCalculator'

// ============================================
// Topic Categories
// ============================================

export const MOCK_TOPICS: TopicCategory[] = [
  {
    id: 'topic-education',
    name: 'Education',
    slug: 'education',
    icon: '🎓',
    color: '#0EA5E9',
    description: 'Schools, scholarships, teachers, infrastructure',
    rtiCount: 1847,
    averageResponseDays: 22,
    successRate: 68,
  },
  {
    id: 'topic-healthcare',
    name: 'Healthcare',
    slug: 'healthcare',
    icon: '🏥',
    color: '#DC2626',
    description: 'Hospitals, medicines, doctors, facilities',
    rtiCount: 2156,
    averageResponseDays: 18,
    successRate: 72,
  },
  {
    id: 'topic-infrastructure',
    name: 'Infrastructure',
    slug: 'infrastructure',
    icon: '🏗️',
    color: '#D97706',
    description: 'Roads, bridges, buildings, public works',
    rtiCount: 2340,
    averageResponseDays: 28,
    successRate: 58,
  },
  {
    id: 'topic-water',
    name: 'Water & Sanitation',
    slug: 'water-sanitation',
    icon: '💧',
    color: '#0891B2',
    description: 'Water supply, sewage, drainage systems',
    rtiCount: 1523,
    averageResponseDays: 24,
    successRate: 65,
  },
  {
    id: 'topic-food',
    name: 'Food Security',
    slug: 'food-security',
    icon: '🌾',
    color: '#16A34A',
    description: 'Ration, PDS, food subsidies, distribution',
    rtiCount: 1298,
    averageResponseDays: 20,
    successRate: 70,
  },
  {
    id: 'topic-housing',
    name: 'Land & Housing',
    slug: 'land-housing',
    icon: '🏘️',
    color: '#7C3AED',
    description: 'Housing schemes, land records, allocations',
    rtiCount: 1654,
    averageResponseDays: 32,
    successRate: 55,
  },
  {
    id: 'topic-environment',
    name: 'Environment',
    slug: 'environment',
    icon: '🌳',
    color: '#059669',
    description: 'Pollution, forests, clearances, conservation',
    rtiCount: 987,
    averageResponseDays: 26,
    successRate: 62,
  },
  {
    id: 'topic-employment',
    name: 'Employment & Labor',
    slug: 'employment-labor',
    icon: '💼',
    color: '#2563EB',
    description: 'Jobs, wages, workers rights, pensions',
    rtiCount: 2045,
    averageResponseDays: 25,
    successRate: 64,
  },
  {
    id: 'topic-transport',
    name: 'Transport',
    slug: 'transport',
    icon: '🚌',
    color: '#EA580C',
    description: 'Public transport, roads, traffic, licenses',
    rtiCount: 1432,
    averageResponseDays: 23,
    successRate: 66,
  },
  {
    id: 'topic-governance',
    name: 'Governance & RTI',
    slug: 'governance-rti',
    icon: '⚖️',
    color: '#4F46E5',
    description: 'Administrative matters, RTI compliance, transparency',
    rtiCount: 1789,
    averageResponseDays: 19,
    successRate: 75,
  },
]

// ============================================
// Win Stories
// ============================================

export const MOCK_WIN_STORIES: WinStory[] = [
  {
    id: 'win-001',
    title: 'School Gets ₹12 Lakh for Repairs After 2-Year Wait',
    hook: generateLLMHook(
      'money_sanctioned',
      {
        entity: 'Education Department',
        amount: '12 lakh',
        duration: '2 years',
        beneficiaries: '450 students',
        issue: 'unsafe building conditions',
      },
      true,
      1
    ),
    outcome: generateImpactOutcome(
      'money_sanctioned',
      'Repair Funds Released',
      {
        amount: 1200000,
        beneficiaries: 450,
        beneficiaryType: 'students',
        waitTime: 730,
        projects: 1,
      },
      'Funds sanctioned for critical building repairs'
    ),
    outcomeType: 'money_sanctioned',
    topic: MOCK_TOPICS[0], // Education
    urgencyLevel: 'high',
    department: 'Education Department',
    state: 'Maharashtra',
    district: 'Pune',
    region: 'west',
    filedDate: '2025-08-15',
    answeredDate: '2025-09-18',
    daysToResolve: 34,
    views: 1250,
    shares: 45,
    reactions: 89,
    link: '/rtis/win-001',
    sourceRTIId: 'rti-mh-2025-08-001',
  },
  {
    id: 'win-002',
    title: 'Ration Shop Data Released, Shows 3,000 Ghost Cards',
    hook: generateLLMHook(
      'data_released',
      {
        entity: 'Food & Civil Supplies Department',
        data: 'ration card database',
        duration: '18 months',
        revelation: 'massive fraud in PDS system',
        beneficiaries: 'genuine beneficiaries',
      },
      true,
      2
    ),
    outcome: generateImpactOutcome(
      'data_released',
      'PDS Database Exposed',
      {
        recordCount: 3000,
        ghostRecords: 3000,
        entitiesAffected: 12,
        yearsOfData: 3,
      },
      'Complete ration card database with fake entries identified'
    ),
    outcomeType: 'data_released',
    topic: MOCK_TOPICS[4], // Food Security
    urgencyLevel: 'critical',
    department: 'Food & Civil Supplies',
    state: 'Bihar',
    district: 'Patna',
    region: 'east',
    filedDate: '2025-09-01',
    answeredDate: '2025-10-05',
    daysToResolve: 34,
    views: 2340,
    shares: 123,
    reactions: 234,
    link: '/rtis/win-002',
    sourceRTIId: 'rti-br-2025-09-001',
  },
  {
    id: 'win-003',
    title: 'Water Supply Restored to 500 Homes After 6 Months',
    hook: generateLLMHook(
      'services_fixed',
      {
        entity: 'Public Works Department',
        service: 'piped water supply',
        duration: '6 months',
        issue: 'contractor fraud',
        beneficiaries: '500 households',
      },
      true,
      3
    ),
    outcome: generateImpactOutcome(
      'services_fixed',
      'Water Connection Restored',
      {
        serviceUnits: 500,
        serviceUnitLabel: 'homes',
        beneficiaries: 2500,
        beneficiaryType: 'people',
        downtimeDays: 180,
      },
      'Piped water supply resumed after RTI exposed incomplete work'
    ),
    outcomeType: 'services_fixed',
    topic: MOCK_TOPICS[3], // Water & Sanitation
    urgencyLevel: 'high',
    department: 'Public Works Department',
    state: 'Rajasthan',
    district: 'Jaipur',
    region: 'west',
    filedDate: '2025-07-20',
    answeredDate: '2025-08-28',
    daysToResolve: 39,
    views: 1890,
    shares: 67,
    reactions: 145,
    link: '/rtis/win-003',
    sourceRTIId: 'rti-rj-2025-07-002',
  },
  {
    id: 'win-004',
    title: 'Hospital Forced to Hire 15 Missing Doctors',
    hook: generateLLMHook(
      'services_fixed',
      {
        entity: 'Health Department',
        service: 'medical staff',
        duration: '18 months',
        issue: 'chronic understaffing',
        beneficiaries: 'patients',
      },
      true,
      4
    ),
    outcome: generateImpactOutcome(
      'services_fixed',
      'Medical Staff Appointed',
      {
        serviceUnits: 15,
        serviceUnitLabel: 'doctors',
        beneficiaries: 200,
        beneficiaryType: 'beds',
        downtimeDays: 540,
      },
      '15 vacant doctor positions filled after RTI disclosure'
    ),
    outcomeType: 'services_fixed',
    topic: MOCK_TOPICS[1], // Healthcare
    urgencyLevel: 'critical',
    department: 'Health Department',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    region: 'north',
    filedDate: '2025-08-01',
    answeredDate: '2025-09-10',
    daysToResolve: 40,
    views: 3120,
    shares: 156,
    reactions: 287,
    link: '/rtis/win-004',
    sourceRTIId: 'rti-up-2025-08-003',
  },
  {
    id: 'win-005',
    title: '₹8 Crore Land Scam Uncovered Through RTI',
    hook: generateLLMHook(
      'data_released',
      {
        entity: 'Revenue Department',
        data: 'land allocation records',
        duration: '2 years',
        revelation: 'illegal land sale to private builder',
        beneficiaries: 'public',
      },
      true,
      5
    ),
    outcome: generateImpactOutcome(
      'data_released',
      'Land Fraud Exposed',
      {
        recordCount: 45,
        documentsCount: 200,
        entitiesAffected: 5,
      },
      'Government land records reveal ₹8Cr scam'
    ),
    outcomeType: 'data_released',
    topic: MOCK_TOPICS[5], // Land & Housing
    urgencyLevel: 'high',
    department: 'Revenue Department',
    state: 'Karnataka',
    district: 'Bengaluru',
    region: 'south',
    filedDate: '2025-07-10',
    answeredDate: '2025-08-22',
    daysToResolve: 43,
    views: 4560,
    shares: 234,
    reactions: 456,
    link: '/rtis/win-005',
    sourceRTIId: 'rti-ka-2025-07-004',
  },
  {
    id: 'win-006',
    title: 'Pollution Norms Enforced at 20 Factories After RTI',
    hook: generateLLMHook(
      'policy_changed',
      {
        entity: 'Pollution Control Board',
        policy: 'emission monitoring',
        issue: 'years of violations',
        revelation: 'systematic non-compliance',
      },
      true,
      6
    ),
    outcome: generateImpactOutcome(
      'policy_changed',
      'Environmental Standards Enforced',
      {
        enforcements: 20,
        beneficiaries: 50000,
        entitiesAffected: 20,
        previousViolations: 156,
      },
      'Strict monitoring imposed on polluting industries'
    ),
    outcomeType: 'policy_changed',
    topic: MOCK_TOPICS[6], // Environment
    urgencyLevel: 'high',
    department: 'Pollution Control Board',
    state: 'Gujarat',
    district: 'Ahmedabad',
    region: 'west',
    filedDate: '2025-06-15',
    answeredDate: '2025-07-30',
    daysToResolve: 45,
    views: 2890,
    shares: 145,
    reactions: 312,
    link: '/rtis/win-006',
    sourceRTIId: 'rti-gj-2025-06-005',
  },
]

// ============================================
// Pending Cases
// ============================================

export const MOCK_PENDING_CASES: PendingCase[] = [
  {
    id: 'case-001',
    title: 'Missing Funds for Tribal School Uniforms',
    question:
      'Where are the ₹25 lakh allocated for school uniforms for 2,000 tribal students in FY 2024-25?',
    hook: generateUrgencyHook(
      'high',
      'Fund allocation verification required',
      [
        '2,000 students affected across 15 schools',
        'Money sanctioned 8 months ago but children still waiting',
        'Winter season approaching, students need uniforms urgently',
      ],
      1
    ),
    impactDetails: [
      '2,000 students across 15 tribal schools without uniforms',
      'Funds allocated in April 2024 but not disbursed',
      'Winter approaching, affecting school attendance',
      'Similar delays reported in 3 other districts',
    ],
    status: 'first_appeal',
    urgencyLevel: 'high',
    daysElapsed: 95,
    daysOverdue: 35,
    expectedResponseDate: '2025-10-15',
    topic: MOCK_TOPICS[0], // Education
    department: 'Tribal Welfare Department',
    state: 'Madhya Pradesh',
    district: 'Dhar',
    region: 'central',
    filedDate: '2025-08-01',
    lastUpdate: '2025-10-15',
    link: '/rtis/case-001',
    trackingLink: '/rtis/track/case-001',
  },
  {
    id: 'case-002',
    title: 'Unaccounted Deaths at District Hospital',
    question:
      'How many maternal deaths occurred in the last 6 months and what were the causes?',
    hook: generateUrgencyHook(
      'critical',
      'Public health emergency',
      [
        'Hospital refuses to share death records publicly',
        'Local media reports suggest at least 12 deaths due to negligence',
        'Families seeking accountability for preventable tragedies',
      ],
      2
    ),
    impactDetails: [
      'At least 12 maternal deaths reported in local media',
      'Hospital refuses to disclose death records',
      'Families alleging medical negligence',
      'No action taken despite multiple complaints',
    ],
    status: 'second_appeal',
    urgencyLevel: 'critical',
    daysElapsed: 145,
    daysOverdue: 85,
    expectedResponseDate: '2025-09-10',
    topic: MOCK_TOPICS[1], // Healthcare
    department: 'Health Department',
    state: 'Bihar',
    district: 'Muzaffarpur',
    region: 'east',
    filedDate: '2025-06-15',
    lastUpdate: '2025-09-25',
    link: '/rtis/case-002',
    trackingLink: '/rtis/track/case-002',
  },
  {
    id: 'case-003',
    title: 'Ghost Employees in Municipal Corporation',
    question:
      'Provide attendance records and salary details of all Grade-D employees for last 12 months',
    hook: generateUrgencyHook(
      'high',
      'Suspected financial fraud',
      [
        'Anonymous tip suggests 50+ ghost employees on payroll',
        'Estimated ₹2 crore annual drain on public funds',
        'Previous corruption charges filed but data never released',
      ],
      3
    ),
    impactDetails: [
      'Tip-off suggests 50+ fake employees on payroll',
      'Estimated ₹2 crore annual loss to public exchequer',
      'Multiple corruption complaints filed previously',
      'Department refusing to share attendance records',
    ],
    status: 'first_appeal',
    urgencyLevel: 'high',
    daysElapsed: 102,
    daysOverdue: 42,
    expectedResponseDate: '2025-10-01',
    topic: MOCK_TOPICS[9], // Governance
    department: 'Municipal Corporation',
    state: 'Delhi',
    district: 'New Delhi',
    region: 'north',
    filedDate: '2025-07-20',
    lastUpdate: '2025-10-10',
    link: '/rtis/case-003',
    trackingLink: '/rtis/track/case-003',
  },
  {
    id: 'case-004',
    title: 'Stalled Bridge Construction Endangers Villagers',
    question:
      'Why has the bridge construction stopped after 40% completion? When will work resume?',
    hook: generateUrgencyHook(
      'critical',
      'Public safety risk',
      [
        '5,000 villagers forced to use dangerous alternate route',
        '3 drowning deaths in past year crossing river',
        '₹15 crore already spent, contractor absconding',
      ],
      4
    ),
    impactDetails: [
      '5,000 villagers affected, no safe river crossing',
      '3 deaths reported in past year',
      '₹15 crore spent, work 40% complete but stopped',
      'Contractor absconding, no action taken',
    ],
    status: 'pending',
    urgencyLevel: 'critical',
    daysElapsed: 68,
    daysOverdue: 8,
    expectedResponseDate: '2025-11-01',
    topic: MOCK_TOPICS[2], // Infrastructure
    department: 'Public Works Department',
    state: 'Assam',
    district: 'Dibrugarh',
    region: 'northeast',
    filedDate: '2025-09-01',
    lastUpdate: '2025-10-28',
    link: '/rtis/case-004',
    trackingLink: '/rtis/track/case-004',
  },
  {
    id: 'case-005',
    title: 'Illegal Sand Mining Destroying River',
    question:
      'How many sand mining licenses were issued in last 3 years? Share environmental clearance documents',
    hook: generateUrgencyHook(
      'high',
      'Environmental crisis',
      [
        'River depth reduced by 12 feet, threatening water supply',
        'Agricultural land along banks eroding rapidly',
        'Mafia reportedly operating with official protection',
      ],
      5
    ),
    impactDetails: [
      'River depth reduced by 12 feet in 3 years',
      '50 acres of agricultural land eroded',
      'Water supply threatened for 20,000 people',
      'Illegal mining continuing despite ban',
    ],
    status: 'first_appeal',
    urgencyLevel: 'high',
    daysElapsed: 89,
    daysOverdue: 29,
    expectedResponseDate: '2025-10-10',
    topic: MOCK_TOPICS[6], // Environment
    department: 'Mining Department',
    state: 'Uttar Pradesh',
    district: 'Prayagraj',
    region: 'north',
    filedDate: '2025-08-10',
    lastUpdate: '2025-10-20',
    link: '/rtis/case-005',
    trackingLink: '/rtis/track/case-005',
  },
  {
    id: 'case-006',
    title: 'Pension Delays for 300 Retired Teachers',
    question:
      'Why are pensions delayed for teachers who retired between Jan-June 2024? Provide timeline',
    hook: generateUrgencyHook(
      'medium',
      'Administrative failure',
      [
        '300 elderly teachers struggling without income for 6+ months',
        'Many forced to borrow money for medical expenses',
        'Department citing "technical issues" without explanation',
      ],
      6
    ),
    impactDetails: [
      '300 retired teachers without pension for 6+ months',
      'Elderly citizens struggling for basic expenses',
      'Many borrowing at high interest for survival',
      'Department giving vague excuses, no timeline',
    ],
    status: 'pending',
    urgencyLevel: 'medium',
    daysElapsed: 55,
    daysOverdue: 0,
    expectedResponseDate: '2025-11-15',
    topic: MOCK_TOPICS[7], // Employment
    department: 'Education Department',
    state: 'Tamil Nadu',
    district: 'Chennai',
    region: 'south',
    filedDate: '2025-09-20',
    lastUpdate: '2025-10-30',
    link: '/rtis/case-006',
    trackingLink: '/rtis/track/case-006',
  },
]

// ============================================
// Recent Questions
// ============================================

export const MOCK_RECENT_QUESTIONS: RTIQuestion[] = [
  {
    id: 'question-001',
    question: 'Criteria and waiting list for old-age pension in taluka',
    hook: generateQuestionHook(
      'Social Welfare',
      'District Social Welfare Office',
      'pension eligibility and waiting list transparency',
      1
    ),
    status: 'filed',
    daysElapsed: 2,
    topic: MOCK_TOPICS[7], // Employment
    department: 'Social Welfare Department',
    state: 'Maharashtra',
    district: 'Nashik',
    region: 'west',
    filedDate: '2025-11-09',
    expectedResponseDate: '2025-12-09',
    link: '/rtis/question-001',
  },
  {
    id: 'question-002',
    question: 'Timeline for repairing potholes on Main Road between km 5-12',
    hook: generateQuestionHook(
      'Infrastructure',
      'Public Works Department',
      'road maintenance timeline and contractor details',
      2
    ),
    status: 'pending',
    daysElapsed: 15,
    topic: MOCK_TOPICS[2], // Infrastructure
    department: 'Public Works Department',
    state: 'Karnataka',
    district: 'Mysuru',
    region: 'south',
    filedDate: '2025-10-27',
    expectedResponseDate: '2025-11-26',
    link: '/rtis/question-002',
  },
  {
    id: 'question-003',
    question: 'List of students receiving pre-matric scholarships in Ward 21 for 2024-25',
    hook: generateQuestionHook(
      'Education',
      'Education Department',
      'scholarship beneficiary list for public verification',
      3
    ),
    status: 'answered',
    daysElapsed: 22,
    topic: MOCK_TOPICS[0], // Education
    department: 'Education Department',
    state: 'Gujarat',
    district: 'Surat',
    region: 'west',
    filedDate: '2025-10-20',
    expectedResponseDate: '2025-11-19',
    answeredDate: '2025-11-11',
    link: '/rtis/question-003',
  },
  {
    id: 'question-004',
    question: 'Number of doctors posted vs sanctioned in all PHCs of district',
    hook: generateQuestionHook(
      'Healthcare',
      'Health Department',
      'healthcare staffing gap analysis',
      4
    ),
    status: 'pending',
    daysElapsed: 18,
    topic: MOCK_TOPICS[1], // Healthcare
    department: 'Health Department',
    state: 'Bihar',
    district: 'Patna',
    region: 'east',
    filedDate: '2025-10-24',
    expectedResponseDate: '2025-11-23',
    link: '/rtis/question-004',
  },
  {
    id: 'question-005',
    question: 'Water quality test reports for municipal water supply, last 6 months',
    hook: generateQuestionHook(
      'Water & Sanitation',
      'Municipal Corporation',
      'public water safety and testing data',
      5
    ),
    status: 'pending',
    daysElapsed: 12,
    topic: MOCK_TOPICS[3], // Water
    department: 'Municipal Corporation',
    state: 'Delhi',
    district: 'New Delhi',
    region: 'north',
    filedDate: '2025-10-30',
    expectedResponseDate: '2025-11-29',
    link: '/rtis/question-005',
  },
  {
    id: 'question-006',
    question: 'Details of all tenders floated for road construction in 2024',
    hook: generateQuestionHook(
      'Infrastructure',
      'Public Works Department',
      'tender transparency and contractor selection process',
      6
    ),
    status: 'answered',
    daysElapsed: 28,
    topic: MOCK_TOPICS[2], // Infrastructure
    department: 'Public Works Department',
    state: 'Rajasthan',
    district: 'Jaipur',
    region: 'west',
    filedDate: '2025-10-14',
    expectedResponseDate: '2025-11-13',
    answeredDate: '2025-11-11',
    link: '/rtis/question-006',
  },
]

// ============================================
// Hero Featured Items
// ============================================

export const MOCK_BIG_WIN: BigWinOfTheWeek = {
  ...MOCK_WIN_STORIES[1], // Ghost ration cards story
  isFeature: true,
  weekOf: '2025-11-04',
  featuredReason: 'Exposed massive fraud affecting thousands of genuine beneficiaries',
}

export const MOCK_URGENT_CASE: UrgentUnanswered = {
  ...MOCK_PENDING_CASES[1], // Maternal deaths case
  isUrgent: true,
  urgencyReason: 'Multiple deaths, critical public health issue, long overdue',
  publicAttention: 9,
}

// ============================================
// All exports are declared inline above
// ============================================
