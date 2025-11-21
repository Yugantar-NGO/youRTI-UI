/**
 * Mock data for Task 3: Impact Stories and Pending Cases
 */

import type { WinStory, PendingCase } from '@/types/dashboard'

export const mockWinStories: WinStory[] = [
  {
    id: 'win-1',
    title: 'School Gets Rs 12 Lakh for Repairs After 2-Year Wait',
    hookLine:
      'Parents filed RTI after repeated complaints about unsafe building conditions went unheard',
    topic: 'Education',
    topicColor: '#0EA5E9',
    topicIcon: '🎓',
    winType: 'money_sanctioned',
    impactMetrics: [
      { icon: '💰', value: '₹12L', label: 'Sanctioned' },
      { icon: '👥', value: '450', label: 'Students' }
    ],
    department: 'Education Department',
    state: 'Maharashtra',
    date: '2025-11-01',
    link: '/rti/win-1'
  },
  {
    id: 'win-2',
    title: 'Ration Shop Data Released, Shows 3,000 Ghost Cards',
    hookLine:
      'RTI exposes fake beneficiaries siphoning subsidized food meant for poor families',
    topic: 'Food Security',
    topicColor: '#16A34A',
    topicIcon: '🌾',
    winType: 'data_released',
    impactMetrics: [
      { icon: '📊', value: '3K', label: 'Ghost cards' },
      { icon: '🏪', value: '12', label: 'Shops involved' }
    ],
    department: 'Food & Civil Supplies',
    state: 'Bihar',
    date: '2025-10-28',
    link: '/rti/win-2'
  },
  {
    id: 'win-3',
    title: 'Water Supply Restored to 500 Homes After 6 Months',
    hookLine:
      'RTI revealed contractor was paid but pipeline work was never completed',
    topic: 'Water & Sanitation',
    topicColor: '#0891B2',
    topicIcon: '💧',
    winType: 'services_fixed',
    impactMetrics: [
      { icon: '🏠', value: '500', label: 'Homes' },
      { icon: '⏱️', value: '180', label: 'Days delayed' }
    ],
    department: 'Public Works Department',
    state: 'Rajasthan',
    date: '2025-10-25',
    link: '/rti/win-3'
  },
  {
    id: 'win-4',
    title: 'Hospital Forced to Hire 15 Missing Doctors',
    hookLine:
      'RTI exposes vacant positions existed for 18 months while patients suffered',
    topic: 'Healthcare',
    topicColor: '#DC2626',
    topicIcon: '🏥',
    winType: 'services_fixed',
    impactMetrics: [
      { icon: '👨‍⚕️', value: '15', label: 'Doctors' },
      { icon: '🛏️', value: '200', label: 'Beds served' }
    ],
    department: 'Health Department',
    state: 'Uttar Pradesh',
    date: '2025-10-20',
    link: '/rti/win-4'
  },
  {
    id: 'win-5',
    title: 'Rs 8 Crore Land Scam Uncovered Through RTI',
    hookLine:
      'Government land illegally allotted to private builder at below-market rates',
    topic: 'Land & Housing',
    topicColor: '#D97706',
    topicIcon: '🏗️',
    winType: 'data_released',
    impactMetrics: [
      { icon: '💰', value: '₹8Cr', label: 'Scam value' },
      { icon: '📍', value: '5', label: 'Acres' }
    ],
    department: 'Revenue Department',
    state: 'Karnataka',
    date: '2025-10-15',
    link: '/rti/win-5'
  },
  {
    id: 'win-6',
    title: 'Pollution Norms Enforced at 20 Factories After RTI',
    hookLine:
      'Data shows industries violated emission limits for years without penalty',
    topic: 'Environment',
    topicColor: '#059669',
    topicIcon: '🌳',
    winType: 'policy_changed',
    impactMetrics: [
      { icon: '🏭', value: '20', label: 'Factories' },
      { icon: '👥', value: '50K', label: 'Residents' }
    ],
    department: 'Pollution Control Board',
    state: 'Gujarat',
    date: '2025-10-10',
    link: '/rti/win-6'
  }
]

export const mockPendingCases: PendingCase[] = [
  {
    id: 'case-1',
    title: 'Missing Funds for Tribal School Uniforms',
    question:
      'Where are the Rs 25 lakh allocated for school uniforms for 2,000 tribal students in FY 2024-25?',
    whyItMatters: [
      '2,000 students affected across 15 schools',
      'Money sanctioned 8 months ago but children still waiting',
      'Winter season approaching, students need uniforms urgently'
    ],
    status: 'first_appeal',
    daysElapsed: 95,
    daysOverdue: 35,
    department: 'Tribal Welfare Department',
    state: 'Madhya Pradesh',
    link: '/rtis/case-1'
  },
  {
    id: 'case-2',
    title: 'Unaccounted Deaths at District Hospital',
    question:
      'How many maternal deaths occurred in the last 6 months and what were the causes?',
    whyItMatters: [
      'Hospital refuses to share death records publicly',
      'Local media reports suggest at least 12 deaths due to negligence',
      'Families seeking accountability for preventable tragedies'
    ],
    status: 'second_appeal',
    daysElapsed: 145,
    daysOverdue: 85,
    department: 'Health Department',
    state: 'Bihar',
    link: '/rtis/case-2'
  },
  {
    id: 'case-3',
    title: 'Ghost Employees in Municipal Corporation',
    question:
      'Provide attendance records and salary details of all Grade-D employees for last 12 months',
    whyItMatters: [
      'Anonymous tip suggests 50+ ghost employees on payroll',
      'Estimated Rs 2 crore annual drain on public funds',
      'Previous corruption charges filed but data never released'
    ],
    status: 'first_appeal',
    daysElapsed: 102,
    daysOverdue: 42,
    department: 'Municipal Corporation',
    state: 'Delhi',
    link: '/rtis/case-3'
  },
  {
    id: 'case-4',
    title: 'Stalled Bridge Construction Endangers Villagers',
    question:
      'Why has the bridge construction stopped after 40% completion? When will work resume?',
    whyItMatters: [
      '5,000 villagers forced to use dangerous alternate route',
      '3 drowning deaths in past year crossing river',
      'Rs 15 crore already spent, contractor absconding'
    ],
    status: 'pending',
    daysElapsed: 68,
    daysOverdue: 8,
    department: 'Public Works Department',
    state: 'Assam',
    link: '/rtis/case-4'
  },
  {
    id: 'case-5',
    title: 'Illegal Sand Mining Destroying River',
    question:
      'How many sand mining licenses were issued in last 3 years? Share environmental clearance documents',
    whyItMatters: [
      'River depth reduced by 12 feet, threatening water supply',
      'Agricultural land along banks eroding rapidly',
      'Mafia reportedly operating with official protection'
    ],
    status: 'first_appeal',
    daysElapsed: 89,
    daysOverdue: 29,
    department: 'Mining Department',
    state: 'Uttar Pradesh',
    link: '/rtis/case-5'
  },
  {
    id: 'case-6',
    title: 'Pension Delays for 300 Retired Teachers',
    question:
      'Why are pensions delayed for teachers who retired between Jan-June 2024? Provide timeline',
    whyItMatters: [
      '300 elderly teachers struggling without income for 6+ months',
      'Many forced to borrow money for medical expenses',
      'Department citing "technical issues" without explanation'
    ],
    status: 'pending',
    daysElapsed: 55,
    daysOverdue: 0,
    department: 'Education Department',
    state: 'Tamil Nadu',
    link: '/rtis/case-6'
  }
]

export const mockTopicSummaries: string[] = [
  'Healthcare delays (45)',
  'Education funding (32)',
  'Infrastructure projects (28)',
  'Land disputes (24)',
  'Water supply issues (21)',
  'Pension delays (18)',
  'Environmental clearances (15)',
  'Food security (12)',
  'Employment records (10)',
  'Budget allocations (8)'
]
