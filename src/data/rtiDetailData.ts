/**
 * RTI Detail View Mock Data
 * Full detail information for each RTI including questions, answers, documents, timeline, etc.
 */

import { RTIStatus } from '@/types'

export interface RTIDocument {
  id: string
  name: string
  title?: string
  type: 'pdf' | 'xlsx' | 'docx' | 'jpg' | 'png'
  size?: string
  pages?: number
  receivedDate?: string
  url?: string
}

export interface RTITimelineEvent {
  id: string
  type: 'filed' | 'acknowledged' | 'transferred' | 'answered' | 'appeal' | 'reminder'
  date: string
  title: string
  description?: string
  daysFromFiling?: number
  isEarly?: boolean
  isLate?: boolean
}

export interface ExtractedEntity {
  amounts?: Array<{ value: string; description: string }>
  officials?: Array<{ name: string; designation: string }>
  vendors?: Array<{ name: string; type?: string }>
  dates?: Array<{ date: string; description: string }>
  locations?: Array<{ name: string; description?: string }>
}

export interface ImpactMetricData {
  icon: string
  value: string
  label: string
}

export interface FindingData {
  label: string
  value: number // percentage or count
  total?: number // total for calculating percentage
  unit?: string // e.g., 'beds', 'hospitals'
}

export interface DepartmentStats {
  responseRate: number // percentage
  totalRTIs: number
  answeredRTIs: number
  pendingRTIs: number
  overdueRTIs: number
  averageResponseDays: number
  targetResponseDays: number
}

export interface RTIDetailData {
  // Basic info
  id: string
  title: string
  status: RTIStatus
  department: string
  location: string
  state: string
  topic: string

  // Dates
  filedDate: string
  acknowledgedDate?: string
  respondedDate?: string
  responseDays?: number
  daysElapsed?: number
  daysRemaining?: number
  daysOverdue?: number
  deadline?: string
  reminderDate?: string // Date when reminder was sent

  // Impact
  impactOneLiner: string
  statusMessage?: string
  statusDaysInfo?: string
  impactMetrics: ImpactMetricData[]
  impactBadges: string[]
  viewCount: number

  // Question
  questionText: string
  questionPoints?: string[]
  questionAttachments?: RTIDocument[]

  // Answer/Response
  responseType: 'full-answer' | 'pending' | 'overdue' | 'transferred' | 'not-available' | 'public-domain' | 'partial' | 'third-party'
  responseText?: string
  responseAttachments?: RTIDocument[]
  signedBy?: string
  signedByDesignation?: string
  signedDate?: string
  pioName?: string // Name of the Public Information Officer

  // Status-specific data
  transferredTo?: string
  transferredFrom?: string
  transferReason?: string
  newDeadline?: string

  deniedItems?: Array<{ item: string; reason: string; section?: string }>
  providedItems?: Array<{ item: string; summary: string }>

  publicDomainLinks?: Array<{ url: string; description: string }>

  thirdPartyName?: string
  thirdPartyReason?: string
  extensionDays?: number

  // Extracted entities
  extractedEntities: ExtractedEntity

  // Timeline
  timeline: RTITimelineEvent[]

  // Actions available
  canSendReminder?: boolean
  canFileAppeal?: boolean
  canFileComplaint?: boolean

  // New fields for enhanced detail page
  keyFindings?: string[] // Bullet points for "At a Glance" section
  findingData?: FindingData[] // Data for "The Finding" visualization
  findingContext?: string // "Why This Matters" text
  departmentStats?: DepartmentStats & { partialResponseRate?: number } // Department profile data
  whyThisMattersIntro?: string // Intro paragraph for Why This Matters section

  // Partial status specific fields
  disclosedItems?: Array<{ text: string }> // Items disclosed in partial response
  withheldItems?: Array<{ text: string }> // Items withheld in partial response
  whyThisIsImportant?: Array<{ icon: string; text: string }> // Custom importance points
  detailedQA?: Array<{
    question: string
    answer: string
    status: 'answered' | 'denied' | 'pending'
    sourceDocument?: string
    sourcePage?: number
    denialReason?: string
  }> // Detailed Q&A for partial status

  // Similar RTIs section
  similarRTIs?: Array<{
    id: string
    title: string
    status: 'answered' | 'pending' | 'overdue'
    department: string
    location: string
    daysElapsed: number
    highlight?: string
  }>

  // Next steps section (for overdue/pending statuses)
  nextSteps?: Array<{
    icon: string
    title: string
    description: string
    details: string
  }>
}

export const rtiDetailMockData: Record<string, RTIDetailData> = {
  'rti-001': {
    id: 'RTI/BMC/2024/003847',
    title: 'MG Road pothole repairs - costs and contractor details',
    status: 'answered',
    department: 'Public Works Dept (MH)',
    location: 'Mumbai',
    state: 'Maharashtra',
    topic: 'Road Construction',

    filedDate: '2024-01-05',
    acknowledgedDate: '2024-01-06',
    respondedDate: '2024-01-28',
    responseDays: 23,
    daysElapsed: 23,
    reminderDate: '2024-01-20',
    pioName: 'Rajesh Kumar',
    whyThisMattersIntro: 'This RTI exposes critical gaps in infrastructure spending accountability and contractor selection processes for public road repairs.',

    impactOneLiner: 'Project cost was ₹12.4 Crore, 3x the initial estimate of ₹4.1 Crore',
    impactMetrics: [
      { icon: '💰', value: '₹2.3 Cr', label: 'SPENT' },
      { icon: '📊', value: '45%', label: 'OVERRUN' },
      { icon: '⏱️', value: '3 days', label: 'RESPONSE' },
      { icon: '📄', value: '5 docs', label: 'PROVIDED' },
    ],
    impactBadges: ['🏆 DATA RELEASED', '💰 MONEY TRAIL', '📈 TRENDING'],
    viewCount: 2400,

    questionText: 'What was the total project cost for MG Road pothole repairs?',
    questionPoints: [
      'What was the total project cost for MG Road pothole repairs?',
      'Who was the contractor and what was the tender process?',
      'List of major land conversion applicants (companies/individuals) with plot sizes',
    ],
    questionAttachments: [
      { id: 'q1', name: 'location_map.pdf', type: 'pdf', size: '2.3 MB' },
    ],

    responseType: 'full-answer',
    responseText: 'The total expenditure amounted to ₹12,42,50,000 (Twelve Crore Forty Two Lakh Fifty Thousand Rupees). This includes material costs of ₹8.5 Cr and labor costs of ₹3.92 Cr. The project covered approximately 2.3 km stretch of MG Road with an average depth of repair at 150mm.',
    responseAttachments: [
      {
        id: 'r1',
        name: 'budget_allocation.pdf',
        title: 'Official Response Letter',
        type: 'pdf',
        size: '2.4 MB',
        pages: 8,
        receivedDate: 'Jan 28, 2024',
      },
      {
        id: 'r2',
        name: 'tender_details.xlsx',
        title: 'Contractor Details & Registration',
        type: 'pdf',
        size: '3.1 MB',
        pages: 12,
        receivedDate: 'Jan 28, 2024',
      },
      {
        id: 'r3',
        name: 'project_timeline.pdf',
        title: 'Project Timeline & Milestones',
        type: 'pdf',
        size: '1.8 MB',
        pages: 5,
        receivedDate: 'Jan 28, 2024',
      },
      {
        id: 'r4',
        name: 'budget_breakdown.pdf',
        title: 'Budget Breakdown & Expenditure',
        type: 'pdf',
        size: '2.2 MB',
        pages: 6,
        receivedDate: 'Jan 28, 2024',
      },
      {
        id: 'r4',
        name: 'inspection_report_2.pdf',
        title: 'Budget Breakdown & Expenditure',
        type: 'pdf',
        size: '2.2 MB',
        pages: 6,
        receivedDate: 'Jan 28, 2024',
      },
    ],
    signedBy: 'Rajesh Kumar',
    signedByDesignation: 'Chief Engineer, PWD Maharashtra',
    signedDate: '2025-01-18',

    extractedEntities: {
      amounts: [
        { value: '₹2.3 Crore', description: 'Total contract value' },
        { value: '₹45 lakhs/km', description: 'Per kilometer cost' },
        { value: '₹1.6 Crore', description: 'Original tender bid' },
      ],
      officials: [
        { name: 'Rajesh Kumar', designation: 'Chief Engineer' },
        { name: 'Suresh Patil', designation: 'Commissioner, PWD' },
      ],
      vendors: [
        { name: 'ABC Construction Ltd', type: 'Main contractor' },
        { name: 'XYZ Quality Inspectors', type: 'Inspection agency' },
      ],
      dates: [
        { date: 'Nov 15, 2023', description: 'Tender award date' },
        { date: 'Dec 1, 2023', description: 'Contract start date' },
        { date: 'Mar 1, 2024', description: 'Completion deadline' },
      ],
      locations: [
        { name: 'MG Road (Khar to Bandra)', description: '5.2 km stretch' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: 'Jan 5, 2024',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'reminder',
        date: 'Jan 20, 2024',
        title: 'Reminder Sent',
        description: 'Follow-up reminder sent',
        daysFromFiling: 15,
      },
      {
        id: 't3',
        type: 'answered',
        date: 'Jan 28, 2024',
        title: 'Response Received',
        description: 'Full information provided with supporting documents',
        daysFromFiling: 23,
        isEarly: true,
      },
    ],

    departmentStats: {
      responseRate: 67,
      totalRTIs: 2847,
      answeredRTIs: 1907,
      pendingRTIs: 706,
      overdueRTIs: 234,
      averageResponseDays: 28,
      targetResponseDays: 30,
    },
  },

  'rti-006': {
    id: 'rti-006',
    title: 'Medicine Procurement Details for Primary Health Centers',
    status: 'pending',
    department: 'Health Department',
    location: 'Jaipur',
    state: 'Rajasthan',
    topic: 'Healthcare',

    filedDate: '2024-11-08',
    acknowledgedDate: '2024-11-09',
    deadline: '2024-12-08',
    daysElapsed: 12,
    daysRemaining: 18,
    pioName: 'Dr. Meena Sharma',
    whyThisMattersIntro: 'Healthcare transparency ensures that essential medicines reach primary health centers and public funds are utilized effectively for citizen welfare.',

    statusMessage: 'Response pending from Health Department, Rajasthan',
    statusDaysInfo: '18 days remaining before statutory deadline',

    impactOneLiner: 'Citizen requests details of ₹12 Cr medicine procurement for 45 primary health centers',
    impactMetrics: [
      { icon: '⏳', value: '12 days', label: 'ELAPSED' },
      { icon: '📍', value: 'Jaipur', label: 'LOCATION' },
      { icon: '🏛️', value: 'Health', label: 'DEPT' },
      { icon: '👁️', value: '247', label: 'VIEWS' },
    ],
    impactBadges: ['💰 MONEY INVOLVED', '🔍 TRANSPARENCY'],
    viewCount: 247,

    questionText: 'I request information regarding medicine procurement for Primary Health Centers in Jaipur district for the financial year 2024-25:',
    questionPoints: [
      'Total budget allocated for medicine procurement',
      'List of medicines procured with quantities and rates',
      'Names of suppliers/vendors and contract details',
      'Stock availability reports for the last 6 months',
    ],

    responseType: 'pending',

    extractedEntities: {},

    departmentStats: {
      responseRate: 72,
      totalRTIs: 1850,
      answeredRTIs: 1332,
      pendingRTIs: 220,
      overdueRTIs: 95,
      averageResponseDays: 24,
      targetResponseDays: 30,
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2024-11-08',
        title: 'RTI Filed',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2024-11-09',
        title: 'Acknowledged',
        daysFromFiling: 1,
      },
    ],

    canSendReminder: true,
  },

  'rti-003': {
    id: 'rti-003',
    title: 'Pending Road Widening Project Status in Koramangala',
    status: 'overdue',
    department: 'BBMP (Bruhat Bengaluru Mahanagara Palike)',
    location: 'Bangalore',
    state: 'Karnataka',
    topic: 'Road Construction',

    filedDate: '2024-10-02',
    acknowledgedDate: '2024-10-03',
    deadline: '2024-11-01',
    daysOverdue: 47,

    impactOneLiner: 'BBMP ignoring ₹45 Cr infrastructure project query for 47 days — violation of RTI Act',
    impactMetrics: [
      { icon: '🚨', value: 'OVERDUE', label: 'STATUS' },
      { icon: '⏰', value: '47 days', label: 'LATE' },
      { icon: '💰', value: '₹45 Cr', label: 'AT STAKE' },
      { icon: '⚖️', value: 'APPEAL', label: 'READY' },
    ],
    impactBadges: ['⚠️ VIOLATION', '🔥 URGENT', '⚖️ ACTION NEEDED'],
    viewCount: 1200,

    questionText: 'I request information regarding the road widening project on 80 Feet Road, Koramangala, which was announced in 2022:',
    questionPoints: [
      'Current status of the project and reasons for delay',
      'Total budget allocated and amount spent till date',
      'Timeline for project completion',
      'Details of contractors assigned and their performance reports',
    ],

    responseType: 'overdue',

    extractedEntities: {},

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2024-10-02',
        title: 'RTI Filed',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2024-10-03',
        title: 'Acknowledged',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'reminder',
        date: '2024-11-15',
        title: 'First Reminder Sent',
        daysFromFiling: 44,
      },
      {
        id: 't4',
        type: 'reminder',
        date: '2024-12-03',
        title: 'Second Reminder Sent',
        daysFromFiling: 62,
      },
    ],

    canFileAppeal: true,
    canFileComplaint: true,
  },

  'rti-019': {
    id: 'rti-019',
    title: 'Railway Station Platform Extension Contract Details',
    status: 'transferred',
    department: 'Western Railway',
    location: 'Mumbai',
    state: 'Maharashtra',
    topic: 'Transport',

    filedDate: '2025-01-20',
    acknowledgedDate: '2025-01-21',
    transferredFrom: 'Central Railway, Mumbai',
    transferredTo: 'Western Railway, Mumbai Division',
    newDeadline: '2025-02-24',

    impactOneLiner: 'RTI bounced from Central Railway to Western Railway — now awaiting response from correct division',
    impactMetrics: [
      { icon: '🔄', value: 'TRANSFER', label: 'STATUS' },
      { icon: '⏰', value: '10 days', label: 'AT WR' },
      { icon: '🏛️', value: '2 depts', label: 'INVOLVED' },
      { icon: '📍', value: 'WR Div', label: 'CURRENT' },
    ],
    impactBadges: ['🔄 JURISDICTION SHIFT', '⏳ NEW TIMELINE'],
    viewCount: 234,

    questionText: 'I request information regarding the platform extension work at Andheri Railway Station:',
    questionPoints: [
      'Total budget allocated for platform extension',
      'Contractor details and tender process',
      'Timeline for completion of work',
      'Safety measures being implemented during construction',
    ],

    responseType: 'transferred',
    transferReason: 'The subject matter pertains to Western Railway jurisdiction (Andheri Station falls under WR Division), not Central Railway. Application transferred under Section 6(3) of RTI Act.',

    extractedEntities: {},

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-20',
        title: 'RTI Filed',
        description: 'Submitted to Central Railway',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-21',
        title: 'Acknowledged by CR',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'transferred',
        date: '2025-01-25',
        title: 'Transferred to Western Railway',
        description: 'New timeline starts from transfer date',
        daysFromFiling: 5,
      },
    ],
  },

  'rti-020': {
    id: 'rti-020',
    title: 'Metro Construction Environmental Impact Assessment',
    status: 'partial',
    department: 'Namma Metro (BMRCL)',
    location: 'Bangalore',
    state: 'Karnataka',
    topic: 'Transport',

    filedDate: '2025-01-12',
    acknowledgedDate: '2025-01-13',
    respondedDate: '2025-01-30',
    responseDays: 18,
    daysElapsed: 18,
    pioName: 'Dr. Anjum Parwez',
    whyThisMattersIntro: 'This RTI reveals significant gaps in transparency around metro infrastructure development, environmental compliance, and contractor accountability.',

    statusMessage: 'The department answered 2 out of 4 questions. Two questions were denied citing exemptions under Section 8(1)(d) of the RTI Act. You have the right to file a First Appeal within 30 days.',

    impactOneLiner: '₹450 Cr budget revealed but environmental assessment details denied — "commercial confidence" claimed',
    impactMetrics: [
      { icon: '✅', value: 'PARTIAL', label: 'DATA' },
      { icon: '✗', value: '2 DENIED', label: 'POINTS' },
      { icon: '⏰', value: '18 days', label: 'RESPONSE' },
      { icon: '⚖️', value: 'APPEAL', label: 'POSSIBLE' },
    ],
    impactBadges: ['⚠️ INCOMPLETE', '⚖️ APPEALABLE'],
    viewCount: 567,

    questionText: 'I request information regarding the Metro Phase 3 construction project on ORR-Airport line:',
    questionPoints: [
      'Total project budget and fund allocation details',
      'Environmental Impact Assessment report',
      'Tree cutting permissions and compensatory plantation details',
      'Contractor agreement terms and penalty clauses',
    ],

    responseType: 'partial',
    responseText: 'With reference to your RTI application, the following information is provided where available:',

    providedItems: [
      {
        item: 'Total project budget',
        summary: '₹450 Crore allocated for ORR-Airport corridor (14.5 km). Detailed breakdown: ₹320 Cr for civil work, ₹80 Cr for electrification, ₹50 Cr for signaling and station facilities.',
      },
      {
        item: 'Tree cutting permissions',
        summary: 'Permission obtained from Forest Department for felling 340 trees. Compensatory plantation of 3,400 trees (1:10 ratio) planned across 3 locations.',
      },
    ],

    deniedItems: [
      {
        item: 'Environmental Impact Assessment report',
        reason: 'The complete EIA report contains commercially sensitive technical data and proprietary assessment methodologies developed by the consulting firm, which would harm their competitive position if disclosed.',
        section: 'Section 8(1)(d) - Commercial confidence',
      },
      {
        item: 'Contractor agreement penalty clauses',
        reason: 'Detailed penalty terms and commercial clauses are part of confidential contractor agreement. Disclosure would prejudice competitive position of the contractor in future tenders.',
        section: 'Section 8(1)(d) - Commercial confidence',
      },
    ],

    // Disclosed and withheld items for KeyInfoCards
    disclosedItems: [
      { text: 'Total project budget of ₹450 Crore with detailed fund allocation breakdown' },
      { text: 'Tree cutting permissions and compensatory plantation plans (340 trees, 1:10 ratio)' },
    ],

    withheldItems: [
      { text: 'Environmental Impact Assessment report citing commercial confidence' },
      { text: 'Contractor agreement penalty clauses citing competitive position concerns' },
    ],

    // Why This Is Important points
    whyThisIsImportant: [
      { icon: '🌳', text: 'Environmental impact of metro construction affecting 340+ trees requires public scrutiny' },
      { icon: '💰', text: '₹450 Crore public investment demands complete transparency in spending' },
      { icon: '📋', text: 'Contractor accountability is crucial for quality infrastructure delivery' },
      { icon: '⚖️', text: 'Commercial confidence exemptions may be overused to avoid accountability' },
    ],

    // Detailed Q&A for partial status
    detailedQA: [
      {
        question: 'Total project budget and fund allocation details',
        answer: '₹450 Crore allocated for ORR-Airport corridor (14.5 km). Detailed breakdown: ₹320 Cr for civil work, ₹80 Cr for electrification, ₹50 Cr for signaling and station facilities.',
        status: 'answered',
        sourceDocument: 'Budget Summary Report',
        sourcePage: 2,
      },
      {
        question: 'Environmental Impact Assessment report',
        answer: '',
        denialReason: 'The complete EIA report contains commercially sensitive technical data and proprietary assessment methodologies developed by the consulting firm, which would harm their competitive position if disclosed. (Section 8(1)(d) - Commercial confidence)',
        status: 'denied',
      },
      {
        question: 'Tree cutting permissions and compensatory plantation details',
        answer: 'Permission obtained from Forest Department for felling 340 trees along the corridor. Compensatory plantation of 3,400 trees (1:10 ratio) planned across 3 locations in Whitefield, Marathahalli, and Electronic City.',
        status: 'answered',
        sourceDocument: 'Tree Cutting Approval',
        sourcePage: 3,
      },
      {
        question: 'Contractor agreement terms and penalty clauses',
        answer: '',
        denialReason: 'Detailed penalty terms and commercial clauses are part of confidential contractor agreement. Disclosure would prejudice competitive position of the contractor in future tenders. (Section 8(1)(d) - Commercial confidence)',
        status: 'denied',
      },
    ],

    responseAttachments: [
      {
        id: 'r1',
        name: 'budget_summary.pdf',
        title: 'Budget Summary Report',
        type: 'pdf',
        size: '890 KB',
        pages: 4,
        receivedDate: 'Jan 30, 2025',
      },
      {
        id: 'r2',
        name: 'tree_cutting_approval.pdf',
        title: 'Tree Cutting Approval Documents',
        type: 'pdf',
        size: '1.2 MB',
        pages: 7,
        receivedDate: 'Jan 30, 2025',
      },
    ],
    signedBy: 'Dr. Anjum Parwez',
    signedByDesignation: 'Managing Director, BMRCL',
    signedDate: '2025-01-30',

    departmentStats: {
      responseRate: 72,
      totalRTIs: 1245,
      answeredRTIs: 897,
      pendingRTIs: 198,
      overdueRTIs: 150,
      averageResponseDays: 22,
      targetResponseDays: 30,
      partialResponseRate: 15,
    },

    extractedEntities: {
      amounts: [
        { value: '₹450 Crore', description: 'Total project budget' },
        { value: '₹320 Cr', description: 'Civil work budget' },
      ],
      officials: [
        { name: 'Dr. Anjum Parwez', designation: 'Managing Director, BMRCL' },
      ],
      locations: [
        { name: 'ORR-Airport corridor', description: '14.5 km stretch' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-12',
        title: 'RTI Filed',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-13',
        title: 'Acknowledged',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-01-30',
        title: 'Partial Response Received',
        description: '2 items provided, 2 items denied',
        daysFromFiling: 18,
      },
    ],

    canFileAppeal: true,
  },

  'rti-021': {
    id: 'rti-021',
    title: 'Smart City Project Fund Allocation and Utilization',
    status: 'not-available',
    department: 'Urban Development Department, MP',
    location: 'Indore',
    state: 'Madhya Pradesh',
    topic: 'Urban Development',

    filedDate: '2025-01-14',
    acknowledgedDate: '2025-01-15',
    respondedDate: '2025-01-17',
    responseDays: 3,

    impactOneLiner: '₹280 Cr project query partially answered — detailed records "archived", 60-day wait needed',
    impactMetrics: [
      { icon: '✓', value: 'PARTIAL', label: 'DATA' },
      { icon: '✗', value: '2 DENIED', label: 'POINTS' },
      { icon: '⏰', value: '60 days', label: 'TO WAIT' },
      { icon: '⚖️', value: 'APPEAL', label: 'POSSIBLE' },
    ],
    impactBadges: ['⚠️ INCOMPLETE', '🗄️ ARCHIVED', '⚖️ APPEALABLE'],
    viewCount: 345,

    questionText: 'I request information regarding Indore Smart City Project implementation:',
    questionPoints: [
      'Total fund allocation from Smart Cities Mission',
      'Year-wise utilization of funds from 2016 to 2024',
      'Project-wise breakdown of expenditure',
      'List of contractors and their performance evaluation reports',
    ],

    responseType: 'not-available',
    responseText: 'The requested information regarding Smart City Project is addressed as follows:\n\n1. Total fund allocation: ₹2,800 Crore approved under Smart Cities Mission for Indore (Central share: ₹1,000 Cr, State share: ₹500 Cr, ULB/Private: ₹1,300 Cr). Summary document attached.\n\n2. Year-wise utilization and project-wise breakdown: Records for financial years 2016-2020 have been archived at the State Records Office as per departmental archival policy. These records require 60 days for retrieval and compilation as per standard procedure.\n\n3. Contractor performance evaluation reports: Not maintained in the format requested. Only completion certificates are available on file.',

    providedItems: [
      {
        item: 'Total fund allocation',
        summary: '₹2,800 Crore total allocation with funding source breakdown provided',
      },
    ],

    deniedItems: [
      {
        item: 'Year-wise utilization (2016-2020)',
        reason: 'Records archived at State Records Office, require 60 days for retrieval',
        section: 'Section 7(9) - Information not held by department',
      },
      {
        item: 'Contractor performance evaluations',
        reason: 'Not maintained in requested format, only completion certificates available',
        section: 'Section 7(9) - Information not available',
      },
    ],

    responseAttachments: [
      {
        id: 'r1',
        name: 'fund_allocation_summary.pdf',
        title: 'Fund Allocation Summary',
        type: 'pdf',
        size: '450 KB',
        pages: 3,
        receivedDate: 'Jan 17, 2024',
      },
    ],
    signedBy: 'Pratibha Pal',
    signedByDesignation: 'Commissioner, IMC',
    signedDate: '2025-01-17',

    extractedEntities: {
      amounts: [
        { value: '₹2,800 Cr', description: 'Total Smart City allocation' },
        { value: '₹1,000 Cr', description: 'Central government share' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-14',
        title: 'RTI Filed',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-15',
        title: 'Acknowledged',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-01-17',
        title: 'Response Received',
        description: 'Partial information, some records archived',
        daysFromFiling: 3,
      },
    ],

    canFileAppeal: true,
  },

  'rti-022': {
    id: 'rti-022',
    title: 'Land Acquisition Compensation Payment Records',
    status: 'public-domain',
    department: 'Revenue Department, UP',
    location: 'Lucknow',
    state: 'Uttar Pradesh',
    topic: 'Land Acquisition',

    filedDate: '2025-01-18',
    acknowledgedDate: '2025-01-19',
    respondedDate: '2025-01-21',
    responseDays: 3,

    impactOneLiner: 'Department points to website for ₹560 Cr land acquisition records — minimal effort response',
    impactMetrics: [
      { icon: '🔗', value: '3 LINKS', label: 'PROVIDED' },
      { icon: '⏱️', value: '3 days', label: 'RESPONSE' },
      { icon: '⚠️', value: 'LAZY', label: 'RESPONSE' },
      { icon: '💾', value: 'ARCHIVED', label: 'BY US' },
    ],
    impactBadges: ['🔗 WEB REDIRECT', '⚠️ MINIMAL EFFORT', '💾 SAVED'],
    viewCount: 289,

    questionText: 'I request information regarding land acquisition for Lucknow Metro Phase 2 project:',
    questionPoints: [
      'Total land acquired (in acres) and compensation paid',
      'List of land owners and compensation amounts',
      'Pending compensation cases and reasons for delay',
      'Timeline for completion of pending payments',
    ],

    responseType: 'public-domain',
    responseText: 'The requested information is already available in the public domain on the department\'s official website as per Section 4 of the RTI Act. Kindly refer to the following resources for complete details:\n\n1. Land Acquisition Dashboard: All acquisition details including area, compensation amounts, and payment status are available on the department portal.\n\n2. Beneficiary List: Names of land owners and compensation amounts are published as per transparency guidelines.\n\n3. Payment Status Reports: Updated monthly with pending cases and reasons.\n\nAs the information is suo-moto disclosed under Section 4(1)(b), no separate response is being provided.',

    publicDomainLinks: [
      {
        url: 'revenue.up.gov.in/land-acquisition-dashboard',
        description: 'Land Acquisition Dashboard - Metro Phase 2 project details',
      },
      {
        url: 'revenue.up.gov.in/compensation-beneficiaries-2024',
        description: 'Beneficiary list with compensation amounts',
      },
      {
        url: 'revenue.up.gov.in/monthly-payment-status',
        description: 'Monthly payment status reports',
      },
    ],

    signedBy: 'Bhanu Chandra Goswami',
    signedByDesignation: 'Additional Commissioner (Revenue)',
    signedDate: '2025-01-21',

    extractedEntities: {},

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-18',
        title: 'RTI Filed',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-19',
        title: 'Acknowledged',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-01-21',
        title: 'Response Received',
        description: 'Referred to public domain websites',
        daysFromFiling: 3,
      },
    ],

    canFileAppeal: true,
  },

  'rti-023': {
    id: 'rti-023',
    title: 'Airport Expansion Private Contractor Agreement Terms',
    status: 'third-party',
    department: 'Airports Authority of India, Hyderabad',
    location: 'Hyderabad',
    state: 'Telangana',
    topic: 'Transport',

    filedDate: '2025-01-25',
    acknowledgedDate: '2025-01-26',
    deadline: '2025-02-24',
    newDeadline: '2025-03-06',

    impactOneLiner: 'GMR Hyderabad Airport given 10 days to object to disclosure of ₹1,200 Cr expansion contract details',
    impactMetrics: [
      { icon: '⏰', value: '+10 days', label: 'EXTENDED' },
      { icon: '🏢', value: '1 firm', label: 'OBJECTING' },
      { icon: '⚖️', value: 'SECTION', label: '11' },
      { icon: '📅', value: 'Mar 6', label: 'DEADLINE' },
    ],
    impactBadges: ['⏳ EXTENDED', '🏢 THIRD PARTY', '⚖️ LEGAL PROCESS'],
    viewCount: 456,

    questionText: 'I request information regarding the Hyderabad Airport Terminal 2 expansion project:',
    questionPoints: [
      'Total project cost and funding sources',
      'Revenue sharing agreement between AAI and GMR',
      'Environmental clearance conditions and compliance reports',
      'Passenger capacity increase and economic impact assessment',
    ],

    responseType: 'third-party',
    thirdPartyName: 'GMR Hyderabad International Airport Ltd',
    thirdPartyReason: 'The requested information relates to commercial operations, revenue sharing arrangements, and proprietary business terms of the private airport operator. Under Section 11 of the RTI Act, the third party (GMR) must be given an opportunity to submit representations before disclosure. Notice issued to GMR on January 30, 2025.',
    extensionDays: 10,

    extractedEntities: {},

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-25',
        title: 'RTI Filed',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-26',
        title: 'Acknowledged',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'filed',
        date: '2025-01-30',
        title: 'Third Party Notice Issued',
        description: 'GMR given 10 days to respond under Section 11',
        daysFromFiling: 5,
      },
    ],
  },

  'rti-002': {
    id: 'rti-002',
    title: 'Highway Toll Collection Revenue Data for NH-48',
    status: 'answered',
    department: 'NHAI',
    location: 'Gurgaon',
    state: 'Haryana',
    topic: 'road-construction',

    filedDate: '2025-01-10',
    acknowledgedDate: '2025-01-11',
    respondedDate: '2025-01-25',
    responseDays: 15,
    daysElapsed: 15,
    reminderDate: '2025-01-20',
    pioName: 'Suresh Patel',
    whyThisMattersIntro: 'This RTI reveals critical financial data about highway toll operations and revenue sharing agreements that impact public infrastructure funding.',

    impactOneLiner: '₹450 Cr annual toll revenue exposed with month-wise breakdown and traffic volume data',
    impactMetrics: [
      { icon: '💰', value: '₹450 Cr', label: 'REVENUE' },
      { icon: '🚗', value: '2.3L', label: 'DAILY CARS' },
      { icon: '⏱️', value: '15 days', label: 'RESPONSE' },
      { icon: '📊', value: '12 docs', label: 'PROVIDED' },
    ],
    impactBadges: ['💰 MONEY TRAIL', '🏆 DATA RELEASED', '📈 TRENDING'],
    viewCount: 567,

    questionText: 'I request information regarding toll collection on NH-48 Delhi-Gurgaon section for the financial year 2023-24:',
    questionPoints: [
      'Total toll revenue collected month-wise with vehicle category breakdown',
      'Name of toll operator and contract terms including revenue sharing agreement',
      'Daily average traffic volume with peak hour data',
      'Details of exempted vehicles and revenue loss due to exemptions',
    ],

    responseType: 'full-answer',
    responseText: 'With reference to your RTI application dated January 10, 2025, the following information is provided:\n\n1. Total Toll Revenue (FY 2023-24): ₹450 Crore collected from NH-48 Delhi-Gurgaon toll plaza. Month-wise breakdown and vehicle category data is provided in the attached Excel sheet.\n\n2. Toll Operator: M/s IRB Infrastructure Developers Ltd operates the toll plaza under a 20-year BOT (Build-Operate-Transfer) contract awarded in 2018. Revenue sharing: 60% to NHAI, 40% to operator after deducting maintenance costs.\n\n3. Daily Traffic Volume: Average 2.3 lakh vehicles per day comprising:\n   - Cars/Jeeps: 1.8 lakh (78%)\n   - Light Commercial Vehicles: 35,000 (15%)\n   - Heavy Commercial Vehicles: 15,000 (7%)\n   Peak hours: 8-10 AM and 6-8 PM account for 45% of daily traffic.\n\n4. Exempted Vehicles: Average 12,000 vehicles per day exempted (emergency services, government vehicles, VIPs). Estimated revenue loss: ₹28 Crore annually.',
    responseAttachments: [
      {
        id: 'r1',
        name: 'toll_revenue_monthly_2023-24.xlsx',
        title: 'Toll Revenue Monthly 2023-24',
        type: 'xlsx',
        size: '234 KB',
        pages: 15,
        receivedDate: 'Jan 25, 2024',
      },
      {
        id: 'r2',
        name: 'vehicle_category_breakdown.pdf',
        title: 'Vehicle Category Breakdown',
        type: 'pdf',
        size: '1.8 MB',
        pages: 9,
        receivedDate: 'Jan 25, 2024',
      },
      {
        id: 'r3',
        name: 'operator_contract_summary.pdf',
        title: 'Operator Contract Summary',
        type: 'pdf',
        size: '890 KB',
        pages: 6,
        receivedDate: 'Jan 25, 2024',
      },
      {
        id: 'r4',
        name: 'traffic_volume_analysis.pdf',
        title: 'Traffic Volume Analysis',
        type: 'pdf',
        size: '2.1 MB',
        pages: 11,
        receivedDate: 'Jan 25, 2024',
      },
      {
        id: 'r5',
        name: 'exemption_data.xlsx',
        title: 'Exemption Data',
        type: 'xlsx',
        size: '156 KB',
        pages: 4,
        receivedDate: 'Jan 25, 2024',
      },
    ],
    signedBy: 'Ashok Kumar Singh',
    signedByDesignation: 'Regional Officer, NHAI Delhi',
    signedDate: '2025-01-25',

    extractedEntities: {
      amounts: [
        { value: '₹450 Crore', description: 'Annual toll revenue (FY 2023-24)' },
        { value: '₹28 Crore', description: 'Revenue loss from exemptions' },
      ],
      officials: [
        { name: 'Ashok Kumar Singh', designation: 'Regional Officer, NHAI Delhi' },
      ],
      vendors: [
        { name: 'IRB Infrastructure Developers Ltd', type: 'Toll operator (BOT contract)' },
      ],
      dates: [
        { date: '2018', description: 'BOT contract awarded' },
        { date: 'FY 2023-24', description: 'Data period' },
      ],
      locations: [
        { name: 'NH-48 Delhi-Gurgaon', description: 'Toll collection section' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-10',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-11',
        title: 'Acknowledged',
        description: 'Application number: NHAI/RTI/2025/00234',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-01-25',
        title: 'Response Received',
        description: 'Full information provided with supporting documents',
        daysFromFiling: 15,
      },
    ],
  },

  'rti-004': {
    id: 'rti-004',
    title: 'School Meal Budget Data for Mid-Day Meal Scheme',
    status: 'answered',
    department: 'Education',
    location: 'Patna',
    state: 'Bihar',
    topic: 'healthcare',

    filedDate: '2025-01-08',
    acknowledgedDate: '2025-01-09',
    respondedDate: '2025-01-11',
    responseDays: 3,
    daysElapsed: 3,
    reminderDate: undefined,
    pioName: 'Dr. Sanjay Kumar',
    whyThisMattersIntro: 'This RTI exposes crucial data about the Mid-Day Meal Scheme implementation affecting millions of school children and budget allocation transparency.',

    impactOneLiner: '₹450 Cr Mid-Day Meal budget revealed affecting 45 districts with per-child cost breakdown',
    impactMetrics: [
      { icon: '💰', value: '₹450 Cr', label: 'BUDGET' },
      { icon: '👦', value: '28L kids', label: 'BENEFICIARIES' },
      { icon: '⏱️', value: '3 days', label: 'RESPONSE' },
      { icon: '🏆', value: 'FAST', label: 'REPLY' },
    ],
    impactBadges: ['🏆 DATA RELEASED', '💰 BUDGET EXPOSED', '⚡ QUICK RESPONSE'],
    viewCount: 892,

    questionText: 'I request information regarding Mid-Day Meal Scheme implementation in Bihar for the academic year 2024-25:',
    questionPoints: [
      'Total budget allocated and source of funds (Central vs State share)',
      'District-wise allocation and number of beneficiary students',
      'Per-child per-day cost breakdown including food, cooking, and administrative expenses',
      'Details of food grain suppliers and procurement process',
    ],

    responseType: 'full-answer',
    responseText: 'With reference to your RTI application dated January 8, 2025, the following information is provided:\n\n1. Total Budget (2024-25): ₹450 Crore allocated for Mid-Day Meal Scheme\n   - Central Government share: ₹270 Cr (60%)\n   - State Government share: ₹180 Cr (40%)\n\n2. Coverage: 45 districts with 28 lakh beneficiary students across 12,500 primary and upper primary schools. District-wise data is provided in the attached Excel sheet.\n\n3. Per-child cost: ₹5.45 per day per child for primary, ₹8.17 for upper primary\n   Breakdown (primary):\n   - Food grains and ingredients: ₹4.20\n   - Cooking cost: ₹0.85\n   - Administrative expenses: ₹0.40\n\n4. Food Suppliers: Food grains procured from FCI (Food Corporation of India) at subsidized rates. Vegetables and other ingredients sourced through district-level tenders from 145 registered suppliers (list attached).',
    responseAttachments: [
      { id: 'r1', name: 'budget_allocation_2024-25.pdf', title: 'Budget Allocation 2024-25', type: 'pdf', size: '1.1 MB', pages: 8, receivedDate: 'Jan 11, 2025' },
      { id: 'r2', name: 'district_wise_data.xlsx', title: 'District Wise Data', type: 'xlsx', size: '378 KB', pages: 45, receivedDate: 'Jan 11, 2025' },
      { id: 'r3', name: 'cost_breakdown_analysis.pdf', title: 'Cost Breakdown Analysis', type: 'pdf', size: '890 KB', pages: 6, receivedDate: 'Jan 11, 2025' },
      { id: 'r4', name: 'supplier_list.xlsx', title: 'Supplier List', type: 'xlsx', size: '245 KB', pages: 12, receivedDate: 'Jan 11, 2025' },
      { id: 'r5', name: 'procurement_guidelines.pdf', title: 'Procurement Guidelines', type: 'pdf', size: '1.5 MB', pages: 15, receivedDate: 'Jan 11, 2025' },
    ],
    signedBy: 'Dr. Sanjay Kumar',
    signedByDesignation: 'Director, Mid-Day Meal Scheme, Bihar',
    signedDate: '2025-01-11',

    extractedEntities: {
      amounts: [
        { value: '₹450 Crore', description: 'Total scheme budget' },
        { value: '₹270 Cr', description: 'Central government share' },
        { value: '₹5.45', description: 'Per-child daily cost (primary)' },
      ],
      officials: [
        { name: 'Dr. Sanjay Kumar', designation: 'Director, Mid-Day Meal Scheme' },
      ],
      vendors: [
        { name: 'Food Corporation of India (FCI)', type: 'Primary food grain supplier' },
      ],
      locations: [
        { name: 'Bihar (45 districts)', description: '12,500 schools covered' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-08',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-09',
        title: 'Acknowledged',
        description: 'Application number: EDU/MDM/2025/00089',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-01-11',
        title: 'Response Received',
        description: 'Complete data provided with detailed breakdown',
        daysFromFiling: 3,
        isEarly: true,
      },
    ],
  },

  'rti-005': {
    id: 'rti-005',
    title: 'Hospital Bed Availability in Government Hospitals',
    status: 'answered',
    department: 'Health',
    location: 'Delhi',
    state: 'Delhi',
    topic: 'healthcare',

    filedDate: '2025-01-20',
    acknowledgedDate: '2025-01-21',
    respondedDate: '2025-02-03',
    responseDays: 14,
    daysElapsed: 14,
    reminderDate: undefined,
    pioName: 'Dr. Anjali Sharma',
    whyThisMattersIntro: 'This RTI reveals surprising hospital occupancy data that challenges public perception of bed shortages and highlights the need for better resource distribution.',

    impactOneLiner: 'Only 60% bed occupancy revealed across 15 Delhi government hospitals despite public perception of overcrowding',
    impactMetrics: [
      { icon: '🏥', value: '15 hosp', label: 'COVERED' },
      { icon: '🛏️', value: '60%', label: 'OCCUPANCY' },
      { icon: '📊', value: '8,450', label: 'TOTAL BEDS' },
      { icon: '⏱️', value: '14 days', label: 'RESPONSE' },
    ],
    impactBadges: ['🏥 HEALTHCARE DATA', '📊 SURPRISING STATS', '🏆 TRANSPARENCY'],
    viewCount: 423,

    questionText: 'I request information regarding bed availability and occupancy in government hospitals of Delhi for the quarter October-December 2024:',
    questionPoints: [
      'Hospital-wise total bed capacity and category breakdown (general, ICU, isolation)',
      'Average monthly occupancy rates with peak occupancy data',
      'Number of patients turned away due to bed unavailability',
      'Steps taken to optimize bed utilization and reduce waiting times',
    ],

    responseType: 'full-answer',
    responseText: 'With reference to your RTI application dated January 20, 2025, the following information is provided:\n\n1. Bed Capacity: 15 Delhi government hospitals have total capacity of 8,450 beds\n   Breakdown:\n   - General wards: 6,200 beds (73%)\n   - ICU/Critical care: 1,450 beds (17%)\n   - Isolation wards: 800 beds (10%)\n   Hospital-wise data is attached.\n\n2. Occupancy Rates (Oct-Dec 2024):\n   - Average occupancy: 60%\n   - General wards: 58%\n   - ICU: 72%\n   - Isolation: 35%\n   Peak occupancy reached 78% in November during seasonal illness surge.\n\n3. Patients Turned Away: 2,340 patients were referred to other hospitals during the quarter due to unavailability of specialized beds (primarily ICU). No patient was denied admission for general ward beds.\n\n4. Optimization Measures: Real-time bed availability dashboard implemented, inter-hospital patient transfer protocol established, and dedicated helpline launched for bed status queries.',
    responseAttachments: [
      { id: 'r1', name: 'hospital_wise_bed_data.xlsx', title: 'Hospital Wise Bed Data', type: 'xlsx', size: '289 KB', pages: 15, receivedDate: 'Feb 3, 2025' },
      { id: 'r2', name: 'occupancy_trends_q3_2024.pdf', title: 'Occupancy Trends Q3 2024', type: 'pdf', size: '1.4 MB', pages: 12, receivedDate: 'Feb 3, 2025' },
      { id: 'r3', name: 'referral_statistics.pdf', title: 'Referral Statistics', type: 'pdf', size: '780 KB', pages: 8, receivedDate: 'Feb 3, 2025' },
      { id: 'r4', name: 'optimization_measures.pdf', title: 'Optimization Measures', type: 'pdf', size: '1.1 MB', pages: 10, receivedDate: 'Feb 3, 2025' },
    ],
    signedBy: 'Dr. Anjali Sharma',
    signedByDesignation: 'Director, Health Services, Delhi',
    signedDate: '2025-02-03',

    keyFindings: [
      'Average occupancy only 60%',
      'Peak reached 78% in Nov during seasonal illness',
      '2,340 patients referred to other hospitals for ICU beds, no general ward denials',
      'Real-time bed tracking system now implemented',
    ],

    findingData: [
      { label: 'General wards', value: 58, total: 4897, unit: 'beds (4,897 / 6,200)' },
      { label: 'ICU/Critical', value: 72, total: 1044, unit: 'beds (1,044 / 1,450)' },
      { label: 'Isolation', value: 35, total: 280, unit: 'beds (280 / 800)' },
    ],

    findingContext: 'The data contradicts widespread public perception of hospital overcrowding. With 60% average occupancy, the issue appears to be capacity planning and ICU bed distribution rather than overall bed shortage. 2,340 referrals were for specialized ICU beds, not general wards, suggesting targeted infrastructure investment needed.',

    departmentStats: {
      responseRate: 68,
      totalRTIs: 1247,
      answeredRTIs: 847,
      pendingRTIs: 312,
      overdueRTIs: 88,
      averageResponseDays: 23,
      targetResponseDays: 21,
    },

    extractedEntities: {
      amounts: [],
      officials: [
        { name: 'Dr. Anjali Sharma', designation: 'Director, Health Services' },
      ],
      dates: [
        { date: 'Oct-Dec 2024', description: 'Data reporting period' },
      ],
      locations: [
        { name: 'Delhi (15 government hospitals)', description: '8,450 total beds' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-20',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-21',
        title: 'Acknowledged',
        description: 'Application number: HEALTH/DEL/2025/00567',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-02-03',
        title: 'Response Received',
        description: 'Comprehensive data with hospital-wise breakdown',
        daysFromFiling: 14,
      },
    ],
  },

  'rti-007': {
    id: 'rti-007',
    title: 'Teacher Recruitment Details and Vacancy Positions in Government Schools',
    status: 'overdue',
    department: 'Education Department',
    location: 'Delhi',
    state: 'Delhi',
    topic: 'education',

    filedDate: '2024-10-03',
    acknowledgedDate: '2024-10-04',
    deadline: '2024-11-02',
    daysElapsed: 48,
    daysOverdue: 18,
    pioName: 'Dr. Anita Sharma',
    reminderDate: '2024-10-28',

    statusMessage: 'RTI Response Overdue by 18 Days',
    statusDaysInfo: 'The department has missed the statutory 30-day deadline. You can now file a First Appeal with the Appellate Authority or escalate to the State Information Commission.',

    whyThisMattersIntro: 'Teacher shortages directly impact the quality of education for thousands of students across Delhi government schools.',

    impactOneLiner: 'Education department ignoring RTI on 12,000 teacher vacancies for 18 days — students suffering',
    impactMetrics: [
      { icon: '🚨', value: 'OVERDUE', label: 'STATUS' },
      { icon: '⏰', value: '18 days', label: 'LATE' },
      { icon: '👨‍🏫', value: '12K', label: 'VACANCIES' },
      { icon: '⚖️', value: 'APPEAL', label: 'READY' },
    ],
    impactBadges: ['⚠️ VIOLATION', '🔥 URGENT', '⚖️ ACTION NEEDED'],
    viewCount: 678,

    questionText: 'I request information regarding teacher appointments and vacancies in government schools across Delhi:',
    questionPoints: [
      'Total number of sanctioned teacher positions vs. filled positions in Delhi govt schools (2023-24)',
      'Details of recruitment drives conducted in last 2 years with number of hires',
      'Subject-wise vacancy breakup (Math, Science, English, Hindi, Social Science)',
      'Student-teacher ratio in each district and comparison with national standards',
    ],

    responseType: 'overdue',

    extractedEntities: {},

    departmentStats: {
      responseRate: 35,
      totalRTIs: 3245,
      answeredRTIs: 1135,
      pendingRTIs: 520,
      overdueRTIs: 412,
      averageResponseDays: 42,
      targetResponseDays: 30,
    },

    similarRTIs: [
      {
        id: 'similar-1',
        title: 'Ring Road repair budget allocation and tender process documentation',
        status: 'answered',
        department: 'PWD Maharashtra',
        location: 'Mumbai',
        daysElapsed: 18,
        highlight: '₹8.7 Cr disclosed',
      },
      {
        id: 'similar-2',
        title: 'Contractor quality inspection reports for infrastructure projects',
        status: 'answered',
        department: 'PWD Maharashtra',
        location: 'Pune',
        daysElapsed: 22,
        highlight: '12 projects reviewed',
      },
      {
        id: 'similar-3',
        title: 'Teacher appointment process and selection criteria documentation',
        status: 'answered',
        department: 'Education Dept',
        location: 'Karnataka',
        daysElapsed: 28,
        highlight: '2,400 positions',
      },
    ],

    nextSteps: [
      {
        icon: '📝',
        title: 'File First Appeal',
        description: 'Appeal to Appellate Authority within 30 days of deadline',
        details: 'The First Appeal is your statutory right when the PIO fails to respond within 30 days. You must file within 30 days of the deadline (by Dec 2, 2024). Address your appeal to the First Appellate Authority of the Education Department. Include your original RTI application, proof of filing, and details of non-compliance. The Appellate Authority has 45 days to decide on your appeal and can impose penalties on the PIO for the delay.',
      },
      {
        icon: '⚖️',
        title: 'Escalate to SIC',
        description: 'Complaint to State Information Commission for non-compliance',
        details: 'If the First Appeal doesn\'t yield results within 45 days, you can file a Second Appeal directly with the Delhi State Information Commission (SIC). The SIC has the power to impose penalties up to ₹25,000 on the defaulting PIO and can order disciplinary action for repeated violations. File your complaint online through the SIC portal with all relevant documentation and correspondence history.',
      },
      {
        icon: '📧',
        title: 'Email Department Head',
        description: 'Send formal complaint to Secretary, Education Department',
        details: 'Draft a formal complaint to the Secretary of the Education Department highlighting the violation of the RTI Act and the impact of delayed response. Mark copies to the Chief Information Commissioner and include details of the overdue RTI with reference numbers and dates. Request immediate action and compliance, mentioning that you\'re prepared to escalate to the Information Commission if necessary.',
      },
      {
        icon: '👥',
        title: 'Rally Community Support',
        description: 'Share this RTI to build pressure for response',
        details: 'Public pressure can be effective in getting delayed RTIs answered. Share your RTI details on social media and RTI advocacy platforms. Tag the Education Department\'s official handles and relevant ministers to increase visibility and accountability. Connect with parent associations and education advocacy groups who can amplify your request for transparency on teacher recruitment.',
      },
      {
        icon: '💰',
        title: 'Claim Daily Penalty',
        description: 'Department liable for ₹250/day penalty for delay',
        details: 'Under Section 7(6) of the RTI Act, you can claim compensation of ₹250 per day for the delay beyond 30 days, up to a maximum of ₹25,000. For 18 days of delay, you\'re entitled to ₹4,500 in compensation. Include this claim in your First Appeal or complaint to the SIC. The penalty is meant to be paid from the salary of the defaulting PIO, creating personal accountability for the delay.',
      },
    ],

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2024-10-03',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2024-10-04',
        title: 'Acknowledged',
        description: 'Application number: RTI/DOE/2024/005612',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'reminder',
        date: '2024-11-02',
        title: 'Deadline Missed',
        description: 'Statutory deadline expired - No response received',
        daysFromFiling: 30,
        isLate: true,
      },
    ],

    canFileAppeal: true,
    canFileComplaint: true,
  },

  'rti-008': {
    id: 'rti-008',
    title: 'University Research Grant Allocation Records',
    status: 'answered',
    department: 'Higher Education',
    location: 'Pune',
    state: 'Maharashtra',
    topic: 'education',

    filedDate: '2025-01-05',
    acknowledgedDate: '2025-01-06',
    respondedDate: '2025-01-28',
    responseDays: 23,
    daysElapsed: 23,
    reminderDate: '2025-01-20',
    pioName: 'Dr. Anjali Kulkarni',
    whyThisMattersIntro: 'This RTI reveals the complete allocation mechanism for research funding in Maharashtra, ensuring transparency in how public money supports academic excellence.',

    impactOneLiner: '₹85 Cr research grants distributed to 45 institutions with transparent selection criteria revealed',
    impactMetrics: [
      { icon: '💰', value: '₹85 Cr', label: 'GRANTS' },
      { icon: '🎓', value: '45 inst', label: 'FUNDED' },
      { icon: '⏱️', value: '23 days', label: 'RESPONSE' },
      { icon: '📄', value: '8 docs', label: 'PROVIDED' },
    ],
    impactBadges: ['🏆 DATA RELEASED', '💰 FUNDING TRAIL', '🎓 EDUCATION'],
    viewCount: 234,

    questionText: 'I request information regarding research grant allocation by Higher Education Department, Maharashtra for the academic year 2024-25:',
    questionPoints: [
      'Total research grant budget and allocation criteria',
      'Institution-wise list of grant recipients with amounts sanctioned',
      'Selection process and evaluation committee members',
      'Utilization certificates submitted and grants released in tranches',
    ],

    responseType: 'full-answer',
    responseText: 'With reference to your RTI application dated January 5, 2025, the following information is provided:\n\n1. Total Budget: ₹85 Crore allocated for research grants in AY 2024-25\n   Criteria: Research impact, faculty strength, infrastructure, publication record\n   Weightage: 40% research quality, 30% infrastructure, 20% publication, 10% innovation\n\n2. Grant Recipients: 45 institutions received grants ranging from ₹50 lakh to ₹5 crore. Detailed list with institution names, project titles, and sanctioned amounts is attached.\n\n3. Selection Process: Two-stage evaluation by 15-member expert committee comprising academicians and industry experts. Committee composition and evaluation scores are provided in attached document.\n\n4. Utilization: Grants released in three tranches (40%-40%-20%) based on milestone completion. 38 institutions submitted first tranche utilization certificates, 28 received second tranche. Monitoring reports attached.',
    responseAttachments: [
      { id: 'r1', name: 'grant_allocation_list_2024-25.xlsx', title: 'Grant Allocation List 2024-25', type: 'xlsx', size: '412 KB', pages: 15, receivedDate: 'Jan 28, 2025' },
      { id: 'r2', name: 'selection_criteria_guidelines.pdf', title: 'Selection Criteria Guidelines', type: 'pdf', size: '1.2 MB', pages: 24, receivedDate: 'Jan 28, 2025' },
      { id: 'r3', name: 'evaluation_committee_details.pdf', title: 'Evaluation Committee Details', type: 'pdf', size: '670 KB', pages: 8, receivedDate: 'Jan 28, 2025' },
      { id: 'r4', name: 'utilization_certificates_summary.xlsx', title: 'Utilization Certificates Summary', type: 'xlsx', size: '289 KB', pages: 12, receivedDate: 'Jan 28, 2025' },
      { id: 'r5', name: 'monitoring_reports_q1_q2.pdf', title: 'Monitoring Reports Q1-Q2', type: 'pdf', size: '2.3 MB', pages: 42, receivedDate: 'Jan 28, 2025' },
    ],
    signedBy: 'Prof. Madhav Deshmukh',
    signedByDesignation: 'Director, Higher Education, Maharashtra',
    signedDate: '2025-01-28',

    extractedEntities: {
      amounts: [
        { value: '₹85 Crore', description: 'Total research grant budget' },
        { value: '₹50 lakh - ₹5 Cr', description: 'Grant range per institution' },
      ],
      officials: [
        { name: 'Prof. Madhav Deshmukh', designation: 'Director, Higher Education' },
      ],
      dates: [
        { date: 'AY 2024-25', description: 'Grant allocation period' },
      ],
      locations: [
        { name: 'Maharashtra', description: '45 institutions funded' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-05',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-06',
        title: 'Acknowledged',
        description: 'Application number: HED/MH/2025/00145',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-01-28',
        title: 'Response Received',
        description: 'Comprehensive data with evaluation details',
        daysFromFiling: 23,
      },
    ],
  },

  'rti-009': {
    id: 'rti-009',
    title: 'Water Pipeline Maintenance Schedule and Budget',
    status: 'answered',
    department: 'Water Supply',
    location: 'Chennai',
    state: 'Tamil Nadu',
    topic: 'water-supply',

    filedDate: '2025-01-12',
    acknowledgedDate: '2025-01-13',
    respondedDate: '2025-01-18',
    responseDays: 6,
    daysElapsed: 6,
    reminderDate: undefined,
    pioName: 'K. Venkataraman',
    whyThisMattersIntro: 'This RTI provides crucial transparency into Chennai water infrastructure maintenance, helping citizens understand how their water supply system is managed and funded.',

    impactOneLiner: '₹12 Cr allocated for maintenance of 450 km water pipelines with zone-wise breakdown revealed',
    impactMetrics: [
      { icon: '💰', value: '₹12 Cr', label: 'BUDGET' },
      { icon: '🚰', value: '450 km', label: 'PIPELINES' },
      { icon: '⏱️', value: '6 days', label: 'RESPONSE' },
      { icon: '📊', value: '6 docs', label: 'PROVIDED' },
    ],
    impactBadges: ['🏆 DATA RELEASED', '💧 WATER SUPPLY', '⚡ QUICK RESPONSE'],
    viewCount: 345,

    questionText: 'I request information regarding water pipeline maintenance for Chennai Metropolitan Water Supply and Sewerage Board (CMWSSB) for FY 2024-25:',
    questionPoints: [
      'Total maintenance budget allocated and expenditure till date',
      'Zone-wise pipeline network length and maintenance schedule',
      'Details of contractors handling maintenance work',
      'Number of pipeline leakages reported and average repair time',
    ],

    responseType: 'full-answer',
    responseText: 'With reference to your RTI application dated January 12, 2025, the following information is provided:\n\n1. Budget: ₹12 Crore allocated for pipeline maintenance in FY 2024-25. Till December 2024, ₹7.8 Cr (65%) has been spent on routine maintenance, leak repairs, and valve replacements.\n\n2. Pipeline Network: Total 450 km of pipelines across 6 zones\n   - North: 85 km (19%)\n   - South: 92 km (20%)\n   - East: 78 km (17%)\n   - West: 72 km (16%)\n   - Central: 68 km (15%)\n   - Outer: 55 km (12%)\n   Maintenance schedule: Quarterly inspections, annual cleaning, bi-annual pressure testing.\n\n3. Contractors: 8 contractors empanelled for maintenance work through annual tenders. Details of contractors, zones assigned, and contract values are attached.\n\n4. Leak Repairs: 1,234 leakages reported from April to December 2024. Average repair time: 4.2 hours for minor leaks, 18 hours for major pipe bursts. Monthly breakdown attached.',
    responseAttachments: [
      { id: 'r1', name: 'budget_utilization_2024-25.pdf', title: 'Budget Utilization Report 2024-25', type: 'pdf', size: '890 KB', pages: 18, receivedDate: 'Jan 18, 2025' },
      { id: 'r2', name: 'zone_wise_pipeline_data.xlsx', title: 'Zone-Wise Pipeline Data', type: 'xlsx', size: '234 KB', pages: 8, receivedDate: 'Jan 18, 2025' },
      { id: 'r3', name: 'contractor_list_details.pdf', title: 'Contractor List and Details', type: 'pdf', size: '1.1 MB', pages: 22, receivedDate: 'Jan 18, 2025' },
      { id: 'r4', name: 'maintenance_schedule.pdf', title: 'Maintenance Schedule', type: 'pdf', size: '670 KB', pages: 10, receivedDate: 'Jan 18, 2025' },
      { id: 'r5', name: 'leakage_repair_statistics.xlsx', title: 'Leakage Repair Statistics', type: 'xlsx', size: '178 KB', pages: 6, receivedDate: 'Jan 18, 2025' },
      { id: 'r6', name: 'monthly_performance_report.pdf', title: 'Monthly Performance Report', type: 'pdf', size: '1.5 MB', pages: 28, receivedDate: 'Jan 18, 2025' },
    ],
    signedBy: 'T. Prabhushankar',
    signedByDesignation: 'Chief Engineer, CMWSSB',
    signedDate: '2025-01-18',

    extractedEntities: {
      amounts: [
        { value: '₹12 Crore', description: 'Annual maintenance budget' },
        { value: '₹7.8 Cr', description: 'Spent till December 2024' },
      ],
      officials: [
        { name: 'T. Prabhushankar', designation: 'Chief Engineer, CMWSSB' },
      ],
      dates: [
        { date: 'FY 2024-25', description: 'Budget period' },
      ],
      locations: [
        { name: 'Chennai (6 zones)', description: '450 km pipeline network' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-12',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-13',
        title: 'Acknowledged',
        description: 'Application number: CMWSSB/2025/00234',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-01-18',
        title: 'Response Received',
        description: 'Complete maintenance data provided',
        daysFromFiling: 6,
        isEarly: true,
      },
    ],
  },

  'rti-010': {
    id: 'rti-010',
    title: 'Drinking Water Quality Test Reports for Urban Areas',
    status: 'pending',
    department: 'Water Supply',
    location: 'Kolkata',
    state: 'West Bengal',
    topic: 'water-supply',

    filedDate: '2024-11-11',
    acknowledgedDate: '2024-11-12',
    deadline: '2024-12-11',
    daysElapsed: 9,
    daysRemaining: 21,
    pioName: 'Anil Banerjee',
    whyThisMattersIntro: 'Safe drinking water is a fundamental right. Transparent water quality data helps citizens understand public health risks and hold authorities accountable.',

    statusMessage: 'Response pending from Water Supply Department, West Bengal',
    statusDaysInfo: '21 days remaining before statutory deadline',

    impactOneLiner: 'Citizen seeks water quality test reports for 12 municipal wards — response pending for 9 days',
    impactMetrics: [
      { icon: '⏳', value: '9 days', label: 'ELAPSED' },
      { icon: '📍', value: 'Kolkata', label: 'LOCATION' },
      { icon: '🚰', value: '12 wards', label: 'COVERAGE' },
      { icon: '👁️', value: '267', label: 'VIEWS' },
    ],
    impactBadges: ['💧 WATER QUALITY', '🔍 PUBLIC HEALTH', '⏳ AWAITING'],
    viewCount: 267,

    questionText: 'I request information regarding drinking water quality testing conducted by Kolkata Municipal Corporation for urban areas in the last 6 months:',
    questionPoints: [
      'Ward-wise water quality test reports with parameters tested (pH, TDS, bacteria, heavy metals)',
      'Frequency of testing and locations of sample collection',
      'Action taken on samples that failed quality standards',
      'Details of water treatment facilities and their operational status',
    ],

    responseType: 'pending',

    extractedEntities: {},

    departmentStats: {
      responseRate: 58,
      totalRTIs: 980,
      answeredRTIs: 568,
      pendingRTIs: 180,
      overdueRTIs: 110,
      averageResponseDays: 26,
      targetResponseDays: 30,
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2024-11-11',
        title: 'RTI Filed',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2024-11-12',
        title: 'Acknowledged',
        description: 'Application number: KMC/WS/2025/00189',
        daysFromFiling: 1,
      },
    ],

    canSendReminder: true,
  },

  'rti-011': {
    id: 'rti-011',
    title: 'Power Cut Schedule and Compensation Claims',
    status: 'answered',
    department: 'Electricity',
    location: 'Hyderabad',
    state: 'Telangana',
    topic: 'electricity',

    filedDate: '2025-01-14',
    acknowledgedDate: '2025-01-15',
    respondedDate: '2025-01-30',
    responseDays: 16,
    daysElapsed: 16,
    reminderDate: undefined,
    pioName: 'S. Lakshmi Narayana',
    whyThisMattersIntro: 'This RTI uncovers the true extent of power outages in Hyderabad and reveals how effectively the compensation mechanism works for affected consumers.',

    impactOneLiner: '2,340 power cut compensation claims approved totaling ₹45 lakh with area-wise outage data',
    impactMetrics: [
      { icon: '💰', value: '₹45L', label: 'COMPENSATED' },
      { icon: '👥', value: '2,340', label: 'CLAIMS' },
      { icon: '⏱️', value: '16 days', label: 'RESPONSE' },
      { icon: '📊', value: '7 docs', label: 'PROVIDED' },
    ],
    impactBadges: ['🏆 DATA RELEASED', '💡 POWER SECTOR', '💰 CONSUMER RIGHTS'],
    viewCount: 456,

    questionText: 'I request information regarding power cuts and consumer compensation in Hyderabad for the period July-December 2024:',
    questionPoints: [
      'Area-wise power cut schedule and total duration of outages',
      'Number of compensation claims filed and approved with amount disbursed',
      'Reasons for unscheduled power cuts and action taken',
      'Steps taken to improve power supply reliability',
    ],

    responseType: 'full-answer',
    responseText: 'With reference to your RTI application dated January 14, 2025, the following information is provided:\n\n1. Power Cuts (Jul-Dec 2024): Total 3,450 hours of outages across Hyderabad\n   - Scheduled maintenance: 2,100 hours (61%)\n   - Unscheduled/technical faults: 1,350 hours (39%)\n   Area-wise breakdown and monthly data attached.\n\n2. Compensation Claims:\n   - Total claims filed: 3,280\n   - Claims approved: 2,340 (71%)\n   - Amount disbursed: ₹45 lakh\n   - Rejected claims: 940 (mostly below minimum outage threshold of 6 hours)\n   Claim-wise details and disbursement records attached.\n\n3. Reasons for Unscheduled Cuts:\n   - Equipment failure: 45%\n   - External factors (accidents, weather): 30%\n   - Grid overload: 15%\n   - Transmission line issues: 10%\n   Detailed incident reports attached.\n\n4. Reliability Measures: Installation of 450 new distribution transformers, upgrade of 120 substations, real-time monitoring system implemented, dedicated maintenance teams deployed in high-outage areas.',
    responseAttachments: [
      { id: 'r1', name: 'outage_area_wise_data.xlsx', title: 'Area-Wise Outage Data', type: 'xlsx', size: '345 KB', pages: 14, receivedDate: 'Jan 30, 2025' },
      { id: 'r2', name: 'compensation_claims_list.xlsx', title: 'Compensation Claims List', type: 'xlsx', size: '567 KB', pages: 32, receivedDate: 'Jan 30, 2025' },
      { id: 'r3', name: 'disbursement_records.pdf', title: 'Disbursement Records', type: 'pdf', size: '1.2 MB', pages: 24, receivedDate: 'Jan 30, 2025' },
      { id: 'r4', name: 'unscheduled_cut_analysis.pdf', title: 'Unscheduled Power Cut Analysis', type: 'pdf', size: '1.8 MB', pages: 36, receivedDate: 'Jan 30, 2025' },
      { id: 'r5', name: 'reliability_improvement_plan.pdf', title: 'Reliability Improvement Plan', type: 'pdf', size: '2.1 MB', pages: 45, receivedDate: 'Jan 30, 2025' },
    ],
    signedBy: 'G. Raghuma Reddy',
    signedByDesignation: 'CMD, TS-Transco & Genco',
    signedDate: '2025-01-30',

    extractedEntities: {
      amounts: [
        { value: '₹45 lakh', description: 'Total compensation disbursed' },
      ],
      officials: [
        { name: 'G. Raghuma Reddy', designation: 'CMD, TS-Transco & Genco' },
      ],
      dates: [
        { date: 'Jul-Dec 2024', description: 'Data reporting period' },
      ],
      locations: [
        { name: 'Hyderabad', description: 'Multiple distribution areas' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-14',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-15',
        title: 'Acknowledged',
        description: 'Application number: TSTRANSCO/2025/00456',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-01-30',
        title: 'Response Received',
        description: 'Comprehensive outage and compensation data',
        daysFromFiling: 16,
      },
    ],
  },

  'rti-012': {
    id: 'rti-012',
    title: 'Solar Panel Subsidy Application Processing Time',
    status: 'overdue',
    department: 'Renewable Energy',
    location: 'Ahmedabad',
    state: 'Gujarat',
    topic: 'electricity',

    filedDate: '2024-11-15',
    acknowledgedDate: '2024-11-16',
    deadline: '2024-12-15',
    daysOverdue: 35,

    impactOneLiner: 'Renewable Energy Dept violating RTI for 35 days — solar subsidy applicants left in dark',
    impactMetrics: [
      { icon: '🚨', value: 'OVERDUE', label: 'STATUS' },
      { icon: '⏰', value: '35 days', label: 'LATE' },
      { icon: '☀️', value: 'SOLAR', label: 'SUBSIDY' },
      { icon: '⚖️', value: 'APPEAL', label: 'READY' },
    ],
    impactBadges: ['⚠️ VIOLATION', '🔥 URGENT', '⚖️ ACTION NEEDED'],
    viewCount: 189,

    questionText: 'I request information regarding solar panel subsidy scheme implementation in Gujarat for residential installations:',
    questionPoints: [
      'Number of applications received and approved in FY 2024-25',
      'Average processing time from application to subsidy disbursement',
      'Reasons for delay in processing pending applications',
      'Budget allocated vs actual subsidy amount disbursed',
    ],

    responseType: 'overdue',

    extractedEntities: {},

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2024-11-15',
        title: 'RTI Filed',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2024-11-16',
        title: 'Acknowledged',
        description: 'Application number: GEDA/2024/00567',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'reminder',
        date: '2024-12-20',
        title: 'First Reminder Sent',
        description: 'Reminder sent via email and portal',
        daysFromFiling: 35,
      },
      {
        id: 't4',
        type: 'reminder',
        date: '2025-01-08',
        title: 'Second Reminder Sent',
        description: 'Final reminder before filing appeal',
        daysFromFiling: 54,
      },
    ],

    canFileAppeal: true,
    canFileComplaint: true,
  },

  'rti-013': {
    id: 'rti-013',
    title: 'Public Transport Bus Fleet Expansion Plans',
    status: 'answered',
    department: 'Transport',
    location: 'Bangalore',
    state: 'Karnataka',
    topic: 'transport',

    filedDate: '2025-01-16',
    acknowledgedDate: '2025-01-17',
    respondedDate: '2025-01-22',
    responseDays: 6,
    daysElapsed: 6,
    reminderDate: undefined,
    pioName: 'B. Ramesh Kumar',
    whyThisMattersIntro: 'This RTI brings transparency to Bangalore public transport expansion, enabling citizens to track progress on sustainable mobility initiatives and hold authorities accountable.',

    impactOneLiner: '500 new electric buses planned for 2025-26 with ₹850 Cr investment and route expansion details',
    impactMetrics: [
      { icon: '🚌', value: '500', label: 'NEW BUSES' },
      { icon: '💰', value: '₹850 Cr', label: 'INVESTMENT' },
      { icon: '⏱️', value: '6 days', label: 'RESPONSE' },
      { icon: '🔋', value: 'ELECTRIC', label: 'GREEN' },
    ],
    impactBadges: ['🏆 DATA RELEASED', '🚌 TRANSPORT', '🔋 GREEN ENERGY'],
    viewCount: 512,

    questionText: 'I request information regarding BMTC bus fleet expansion and electric vehicle adoption plans:',
    questionPoints: [
      'Details of planned procurement - number of buses, types (electric, CNG, diesel)',
      'Budget allocation and funding sources',
      'Timeline for procurement and deployment',
      'New routes to be introduced and depot expansion plans',
    ],

    responseType: 'full-answer',
    responseText: 'With reference to your RTI application dated January 16, 2025, the following information is provided:\n\n1. Procurement Plan (2025-26):\n   - 500 electric buses (12-meter low-floor AC)\n   - 200 CNG buses (non-AC)\n   - Total: 700 new buses\n   Current fleet: 6,200 buses (to reach 6,900)\n\n2. Budget: ₹850 Crore allocated\n   - Electric buses: ₹680 Cr (80%)\n   - CNG buses: ₹120 Cr (14%)\n   - Infrastructure (charging stations, depots): ₹50 Cr (6%)\n   Funding: 60% State Budget, 40% FAME-II subsidy\n\n3. Timeline:\n   - Tender finalization: March 2025\n   - First batch delivery: August 2025 (150 buses)\n   - Complete deployment: March 2026\n   Phased rollout across 3 phases.\n\n4. Route Expansion: 45 new routes planned connecting outer suburbs and IT corridors. 3 new depots proposed in Whitefield, Yelahanka, and Bommasandra. Detailed route map and depot locations attached.',
    responseAttachments: [
      { id: 'r1', name: 'procurement_plan_2025-26.pdf', title: 'Procurement Plan 2025-26', type: 'pdf', size: '1.3 MB', pages: 28, receivedDate: 'Jan 22, 2025' },
      { id: 'r2', name: 'budget_allocation_breakdown.xlsx', title: 'Budget Allocation Breakdown', type: 'xlsx', size: '289 KB', pages: 10, receivedDate: 'Jan 22, 2025' },
      { id: 'r3', name: 'deployment_timeline.pdf', title: 'Deployment Timeline', type: 'pdf', size: '890 KB', pages: 15, receivedDate: 'Jan 22, 2025' },
      { id: 'r4', name: 'new_routes_map.pdf', title: 'New Routes Map', type: 'pdf', size: '2.4 MB', pages: 8, receivedDate: 'Jan 22, 2025' },
      { id: 'r5', name: 'depot_expansion_plan.pdf', title: 'Depot Expansion Plan', type: 'pdf', size: '1.6 MB', pages: 22, receivedDate: 'Jan 22, 2025' },
    ],
    signedBy: 'C. Shikha',
    signedByDesignation: 'Managing Director, BMTC',
    signedDate: '2025-01-22',

    extractedEntities: {
      amounts: [
        { value: '₹850 Crore', description: 'Total investment' },
        { value: '₹680 Cr', description: 'Electric bus procurement' },
      ],
      officials: [
        { name: 'C. Shikha', designation: 'Managing Director, BMTC' },
      ],
      dates: [
        { date: 'Aug 2025', description: 'First batch delivery' },
        { date: 'Mar 2026', description: 'Complete deployment' },
      ],
      locations: [
        { name: 'Bangalore', description: '45 new routes, 3 new depots' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-16',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-17',
        title: 'Acknowledged',
        description: 'Application number: BMTC/2025/00345',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-01-22',
        title: 'Response Received',
        description: 'Complete expansion plan with timeline',
        daysFromFiling: 6,
        isEarly: true,
      },
    ],
  },

  'rti-014': {
    id: 'rti-014',
    title: 'Slum Rehabilitation Project Timeline and Budget',
    status: 'pending',
    department: 'Urban Development',
    location: 'Mumbai',
    state: 'Maharashtra',
    topic: 'housing',

    filedDate: '2024-11-05',
    acknowledgedDate: '2024-11-06',
    deadline: '2024-12-05',
    daysElapsed: 15,
    daysRemaining: 15,
    pioName: 'Suresh Gowda',
    whyThisMattersIntro: 'Water infrastructure transparency is crucial for ensuring proper maintenance and accountability of public utilities.',

    statusMessage: 'Response pending from Urban Development, Maharashtra',
    statusDaysInfo: '15 days remaining before statutory deadline',

    impactOneLiner: 'Citizen seeks ₹1,200 Cr slum rehabilitation project details affecting 15,000 families — response pending',
    impactMetrics: [
      { icon: '⏳', value: '15 days', label: 'ELAPSED' },
      { icon: '📍', value: 'Mumbai', label: 'LOCATION' },
      { icon: '👨‍👩‍👧‍👦', value: '15K', label: 'FAMILIES' },
      { icon: '👁️', value: '298', label: 'VIEWS' },
    ],
    impactBadges: ['🏘️ HOUSING', '💰 BIG BUDGET', '⏳ AWAITING'],
    viewCount: 298,

    questionText: 'I request information regarding the Slum Rehabilitation Authority (SRA) project in Dharavi Phase 4:',
    questionPoints: [
      'Total project cost, funding sources, and budget utilization till date',
      'Number of families to be rehabilitated and eligibility criteria',
      'Timeline for project completion and current status',
      'Details of developers involved and tendering process',
    ],

    responseType: 'pending',

    extractedEntities: {},

    departmentStats: {
      responseRate: 65,
      totalRTIs: 1200,
      answeredRTIs: 780,
      pendingRTIs: 150,
      overdueRTIs: 80,
      averageResponseDays: 28,
      targetResponseDays: 30,
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2024-11-05',
        title: 'RTI Filed',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2024-11-06',
        title: 'Acknowledged',
        description: 'Application number: SRA/MH/2025/00234',
        daysFromFiling: 1,
      },
    ],

    canSendReminder: true,
  },

  'rti-015': {
    id: 'rti-015',
    title: 'Police Station Infrastructure Improvement Funds',
    status: 'answered',
    department: 'Home Affairs',
    location: 'Indore',
    state: 'Madhya Pradesh',
    topic: 'police',

    filedDate: '2025-01-07',
    acknowledgedDate: '2025-01-08',
    respondedDate: '2025-01-21',
    responseDays: 14,
    daysElapsed: 14,
    reminderDate: undefined,
    pioName: 'Ajay Singh Thakur',
    whyThisMattersIntro: 'This RTI exposes police infrastructure spending in Indore district, ensuring public oversight of modernization efforts that directly impact law enforcement capabilities.',

    impactOneLiner: '₹28 Cr allocated for modernization of 35 police stations with station-wise budget breakdown',
    impactMetrics: [
      { icon: '💰', value: '₹28 Cr', label: 'BUDGET' },
      { icon: '🏛️', value: '35', label: 'STATIONS' },
      { icon: '⏱️', value: '14 days', label: 'RESPONSE' },
      { icon: '📄', value: '6 docs', label: 'PROVIDED' },
    ],
    impactBadges: ['🏆 DATA RELEASED', '🚔 POLICE INFRA', '💰 BUDGET EXPOSED'],
    viewCount: 387,

    questionText: 'I request information regarding infrastructure improvement and modernization of police stations in Indore district:',
    questionPoints: [
      'Total budget sanctioned and station-wise allocation',
      'Details of improvement works - renovation, equipment, technology upgrades',
      'Timeline for completion and current progress status',
      'Contractors assigned and work completion certificates',
    ],

    responseType: 'full-answer',
    responseText: 'With reference to your RTI application dated January 7, 2025, the following information is provided:\n\n1. Budget Allocation: ₹28 Crore sanctioned for modernization of 35 police stations in Indore district\n   Station-wise allocation ranges from ₹60 lakh to ₹1.2 crore based on station size and requirements. Detailed allocation list attached.\n\n2. Improvement Works:\n   - Building renovation: ₹12 Cr (43%)\n   - IT equipment & CCTV: ₹8 Cr (29%)\n   - Furniture & fixtures: ₹4 Cr (14%)\n   - Vehicles & communication: ₹4 Cr (14%)\n   Work details and specifications for each station attached.\n\n3. Timeline and Progress:\n   - Project start: April 2024\n   - Expected completion: March 2025\n   - Current status: 28 stations completed (80%), 7 stations in progress\n   Delayed stations and reasons documented in progress report.\n\n4. Contractors: 12 contractors assigned through district-level tendering. Work completion certificates issued for 28 stations. Contractor details and performance evaluation attached.',
    responseAttachments: [
      { id: 'r1', name: 'station_wise_budget.xlsx', title: 'Station-Wise Budget Allocation', type: 'xlsx', size: '312 KB', pages: 12, receivedDate: 'Jan 21, 2025' },
      { id: 'r2', name: 'work_specification_details.pdf', title: 'Work Specification Details', type: 'pdf', size: '1.8 MB', pages: 38, receivedDate: 'Jan 21, 2025' },
      { id: 'r3', name: 'progress_report_jan_2025.pdf', title: 'Progress Report January 2025', type: 'pdf', size: '1.4 MB', pages: 26, receivedDate: 'Jan 21, 2025' },
      { id: 'r4', name: 'contractor_list_performance.xlsx', title: 'Contractor List and Performance', type: 'xlsx', size: '234 KB', pages: 8, receivedDate: 'Jan 21, 2025' },
      { id: 'r5', name: 'completion_certificates.pdf', title: 'Completion Certificates', type: 'pdf', size: '2.6 MB', pages: 56, receivedDate: 'Jan 21, 2025' },
      { id: 'r6', name: 'before_after_photos.pdf', title: 'Before and After Photos', type: 'pdf', size: '4.2 MB', pages: 72, receivedDate: 'Jan 21, 2025' },
    ],
    signedBy: 'Harinarayan Chari Mishra',
    signedByDesignation: 'SP, Indore',
    signedDate: '2025-01-21',

    extractedEntities: {
      amounts: [
        { value: '₹28 Crore', description: 'Total modernization budget' },
        { value: '₹60L - ₹1.2 Cr', description: 'Per-station allocation range' },
      ],
      officials: [
        { name: 'Harinarayan Chari Mishra', designation: 'SP, Indore' },
      ],
      dates: [
        { date: 'Apr 2024', description: 'Project start date' },
        { date: 'Mar 2025', description: 'Expected completion' },
      ],
      locations: [
        { name: 'Indore district', description: '35 police stations' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-07',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-08',
        title: 'Acknowledged',
        description: 'Application number: HOME/MP/2025/00123',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-01-21',
        title: 'Response Received',
        description: 'Complete modernization data with photos',
        daysFromFiling: 14,
      },
    ],
  },

  'rti-016': {
    id: 'rti-016',
    title: 'Forest Land Diversion Approvals in Last 5 Years',
    status: 'answered',
    department: 'Environment',
    location: 'Dehradun',
    state: 'Uttarakhand',
    topic: 'environment',

    filedDate: '2025-01-03',
    acknowledgedDate: '2025-01-04',
    respondedDate: '2025-01-26',
    responseDays: 23,

    impactOneLiner: '234 hectares of forest land diverted with environmental clearance details and compensatory afforestation data',
    impactMetrics: [
      { icon: '🌲', value: '234 ha', label: 'DIVERTED' },
      { icon: '🌱', value: '468 ha', label: 'PLANTED' },
      { icon: '⏱️', value: '23 days', label: 'RESPONSE' },
      { icon: '📄', value: '9 docs', label: 'PROVIDED' },
    ],
    impactBadges: ['🏆 DATA RELEASED', '🌲 ENVIRONMENT', '📊 COMPREHENSIVE'],
    viewCount: 623,

    questionText: 'I request information regarding forest land diversion approvals granted by State Forest Department from 2019 to 2024:',
    questionPoints: [
      'Total forest land diverted with year-wise and project-wise breakdown',
      'Purpose of diversion - roads, dams, mining, infrastructure projects',
      'Environmental clearance conditions and compliance status',
      'Compensatory afforestation details - land identified, plantation completed',
    ],

    responseType: 'full-answer',
    responseText: 'With reference to your RTI application dated January 3, 2025, the following information is provided:\n\n1. Forest Land Diverted (2019-2024): Total 234 hectares across 18 projects\n   Year-wise breakdown:\n   - 2019: 32 ha (3 projects)\n   - 2020: 28 ha (2 projects)\n   - 2021: 52 ha (5 projects)\n   - 2022: 48 ha (4 projects)\n   - 2023: 42 ha (3 projects)\n   - 2024: 32 ha (1 project)\n   Project-wise details with location and approval dates attached.\n\n2. Purpose of Diversion:\n   - Road/Highway projects: 145 ha (62%)\n   - Hydroelectric projects: 56 ha (24%)\n   - Defense installations: 23 ha (10%)\n   - Tourism infrastructure: 10 ha (4%)\n   Detailed purpose and justification for each project attached.\n\n3. Environmental Clearances: All 18 projects received Stage-I and Stage-II clearances from MoEFCC. Compliance audit conducted for 14 projects (2019-2022), all found compliant. Audit reports attached. 4 recent projects (2023-24) under monitoring period.\n\n4. Compensatory Afforestation: 468 hectares (2x rule applied) identified across 8 locations. Plantation completed on 412 ha (88%), remaining 56 ha scheduled for monsoon 2025. Survival rate: 78% (as per latest monitoring). Location maps and plantation reports attached.',
    responseAttachments: [
      { id: 'r1', name: 'yearwise_project_list.xlsx', type: 'xlsx', size: '423 KB' },
      { id: 'r2', name: 'project_wise_details.pdf', type: 'pdf', size: '2.8 MB' },
      { id: 'r3', name: 'clearance_documents.pdf', type: 'pdf', size: '3.4 MB' },
      { id: 'r4', name: 'compliance_audit_reports.pdf', type: 'pdf', size: '4.1 MB' },
      { id: 'r5', name: 'afforestation_location_maps.pdf', type: 'pdf', size: '2.2 MB' },
      { id: 'r6', name: 'plantation_completion_report.xlsx', type: 'xlsx', size: '312 KB' },
      { id: 'r7', name: 'survival_monitoring_data.pdf', type: 'pdf', size: '1.6 MB' },
    ],
    signedBy: 'Vinay Shankar Pandey',
    signedByDesignation: 'Principal Chief Conservator of Forests, Uttarakhand',
    signedDate: '2025-01-26',

    extractedEntities: {
      amounts: [],
      officials: [
        { name: 'Vinay Shankar Pandey', designation: 'Principal Chief Conservator of Forests' },
      ],
      dates: [
        { date: '2019-2024', description: 'Data reporting period (5 years)' },
      ],
      locations: [
        { name: 'Uttarakhand', description: '234 ha diverted, 468 ha afforested' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-03',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-04',
        title: 'Acknowledged',
        description: 'Application number: FOREST/UK/2025/00012',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-01-26',
        title: 'Response Received',
        description: 'Comprehensive 5-year diversion data',
        daysFromFiling: 23,
      },
    ],
  },

  'rti-017': {
    id: 'rti-017',
    title: 'Heritage Building Restoration Project Status',
    status: 'overdue',
    department: 'Tourism',
    location: 'Jaipur',
    state: 'Rajasthan',
    topic: 'culture',

    filedDate: '2024-12-10',
    acknowledgedDate: '2024-12-11',
    deadline: '2025-01-09',
    daysOverdue: 9,

    impactOneLiner: 'Tourism Dept ignoring RTI on heritage restoration for 9 days — ₹15 Cr project in limbo',
    impactMetrics: [
      { icon: '🚨', value: 'OVERDUE', label: 'STATUS' },
      { icon: '⏰', value: '9 days', label: 'LATE' },
      { icon: '🏛️', value: 'HERITAGE', label: 'PROJECT' },
      { icon: '⚖️', value: 'APPEAL', label: 'READY' },
    ],
    impactBadges: ['⚠️ VIOLATION', '🏛️ HERITAGE', '⚖️ ACTION NEEDED'],
    viewCount: 234,

    questionText: 'I request information regarding the restoration project of Hawa Mahal and other heritage monuments in Jaipur:',
    questionPoints: [
      'List of heritage buildings under restoration with individual budgets',
      'Project timelines, contractors involved, and current completion status',
      'Details of conservation techniques and materials being used',
      'Approval from Archaeological Survey of India and adherence to heritage guidelines',
    ],

    responseType: 'overdue',

    extractedEntities: {},

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2024-12-10',
        title: 'RTI Filed',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2024-12-11',
        title: 'Acknowledged',
        description: 'Application number: TOURISM/RJ/2024/00456',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'reminder',
        date: '2025-01-15',
        title: 'First Reminder Sent',
        description: 'Reminder sent via email',
        daysFromFiling: 36,
      },
    ],

    canFileAppeal: true,
    canFileComplaint: true,
  },

  'rti-018': {
    id: 'rti-018',
    title: 'COVID-19 Vaccination Drive Expenditure Details',
    status: 'answered',
    department: 'Health',
    location: 'Pune',
    state: 'Maharashtra',
    topic: 'healthcare',

    filedDate: '2025-01-09',
    acknowledgedDate: '2025-01-10',
    respondedDate: '2025-01-17',
    responseDays: 8,

    impactOneLiner: '₹340 Cr spent vaccinating 12 million citizens with dose-wise cost breakdown and vendor details',
    impactMetrics: [
      { icon: '💰', value: '₹340 Cr', label: 'SPENT' },
      { icon: '💉', value: '12M', label: 'VACCINATED' },
      { icon: '⏱️', value: '8 days', label: 'RESPONSE' },
      { icon: '📊', value: '10 docs', label: 'PROVIDED' },
    ],
    impactBadges: ['🏆 DATA RELEASED', '💉 COVID-19', '💰 BUDGET EXPOSED'],
    viewCount: 789,

    questionText: 'I request information regarding COVID-19 vaccination drive expenditure in Pune district from January 2021 to December 2024:',
    questionPoints: [
      'Total expenditure breakdown - vaccine procurement, logistics, manpower, infrastructure',
      'Number of doses administered (dose 1, dose 2, booster) with age-group wise data',
      'Details of vaccine suppliers, procurement rates, and payment records',
      'Utilization of Central vs State government funds',
    ],

    responseType: 'full-answer',
    responseText: 'With reference to your RTI application dated January 9, 2025, the following information is provided:\n\n1. Total Expenditure (Jan 2021 - Dec 2024): ₹340 Crore\n   Breakdown:\n   - Vaccine procurement: ₹245 Cr (72%)\n   - Cold chain & logistics: ₹42 Cr (12%)\n   - Manpower (vaccinators, support staff): ₹35 Cr (10%)\n   - Infrastructure (vaccination centers, equipment): ₹18 Cr (6%)\n\n2. Vaccination Coverage: 12 million doses administered\n   - Dose 1: 4.2 million (35%)\n   - Dose 2: 3.8 million (32%)\n   - Booster/Precaution dose: 4.0 million (33%)\n   Age-group breakdown: 18-44 years (56%), 45-60 years (28%), 60+ years (16%)\n   Month-wise and center-wise data attached.\n\n3. Vaccine Suppliers:\n   - Covishield (Serum Institute): 8.5 million doses @ ₹215 per dose\n   - Covaxin (Bharat Biotech): 2.8 million doses @ ₹295 per dose\n   - Corbevax (Biological E): 0.7 million doses @ ₹145 per dose\n   Supplier contracts and payment records attached.\n\n4. Fund Utilization:\n   - Central Government funds: ₹204 Cr (60%)\n   - State Government funds: ₹102 Cr (30%)\n   - CSR/donations: ₹34 Cr (10%)\n   Fund utilization certificates and audit reports attached.',
    responseAttachments: [
      { id: 'r1', name: 'expenditure_breakdown.xlsx', type: 'xlsx', size: '456 KB' },
      { id: 'r2', name: 'dose_wise_vaccination_data.xlsx', type: 'xlsx', size: '612 KB' },
      { id: 'r3', name: 'agegroup_centerwise_stats.xlsx', type: 'xlsx', size: '534 KB' },
      { id: 'r4', name: 'vaccine_supplier_contracts.pdf', type: 'pdf', size: '2.8 MB' },
      { id: 'r5', name: 'procurement_payment_records.xlsx', type: 'xlsx', size: '723 KB' },
      { id: 'r6', name: 'fund_utilization_certificates.pdf', type: 'pdf', size: '1.9 MB' },
      { id: 'r7', name: 'audit_reports_2021-2024.pdf', type: 'pdf', size: '3.2 MB' },
      { id: 'r8', name: 'cold_chain_infrastructure.pdf', type: 'pdf', size: '1.4 MB' },
    ],
    signedBy: 'Dr. Kalpana Baliwant',
    signedByDesignation: 'District Health Officer, Pune',
    signedDate: '2025-01-17',

    extractedEntities: {
      amounts: [
        { value: '₹340 Crore', description: 'Total vaccination expenditure' },
        { value: '₹245 Cr', description: 'Vaccine procurement cost' },
        { value: '₹215 per dose', description: 'Covishield rate' },
      ],
      officials: [
        { name: 'Dr. Kalpana Baliwant', designation: 'District Health Officer, Pune' },
      ],
      vendors: [
        { name: 'Serum Institute of India', type: 'Covishield supplier' },
        { name: 'Bharat Biotech', type: 'Covaxin supplier' },
        { name: 'Biological E', type: 'Corbevax supplier' },
      ],
      dates: [
        { date: 'Jan 2021 - Dec 2024', description: 'Vaccination drive period' },
      ],
      locations: [
        { name: 'Pune district', description: '12 million doses administered' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-09',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-10',
        title: 'Acknowledged',
        description: 'Application number: HEALTH/PUNE/2025/00234',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-01-17',
        title: 'Response Received',
        description: 'Complete vaccination expenditure data',
        daysFromFiling: 8,
        isEarly: true,
      },
    ],
  },

  'rti-hospital-beds': {
    id: 'rti-hospital-beds',
    title: 'Only 60% Bed Occupancy Revealed Across 15 Delhi Government Hospitals Despite Public Perception of Overcrowding',
    status: 'answered',
    department: 'Health Department, Delhi',
    location: 'Delhi',
    state: 'Delhi',
    topic: 'Healthcare',

    filedDate: '2025-01-20',
    acknowledgedDate: '2025-01-21',
    respondedDate: '2025-02-03',
    responseDays: 14,

    impactOneLiner: 'Reality check: What Delhi\'s hospital data actually shows about bed availability vs. public perception',
    impactMetrics: [
      { icon: '🏥', value: '15', label: 'hospitals' },
      { icon: '🛏️', value: '60%', label: 'occupancy' },
      { icon: '⏱️', value: '14', label: 'days' },
      { icon: '📊', value: '8,450', label: 'beds' },
    ],
    impactBadges: ['✓ On-time'],
    viewCount: 423,

    questionText: 'I request information regarding bed availability and occupancy in government hospitals of Delhi for Q4 2024:',
    questionPoints: [
      'Hospital-wise total bed capacity and category breakdown (general, ICU, isolation)',
      'Average monthly occupancy rates with peak occupancy data',
      'Number of patients turned away due to bed unavailability',
      'Steps taken to optimize bed utilization and reduce waiting times',
    ],

    responseType: 'full-answer',
    responseText: `With reference to your RTI application dated January 20, 2025, the following information is provided:

1️⃣ BED CAPACITY

15 Delhi government hospitals covered in this data - 8,450 total beds

Breakdown by category:
• General wards: 6,200 beds (73%)
• ICU/Critical care: 1,450 beds (17%)
• Isolation wards: 800 beds (10%)

Hospital-wise detailed data is attached in supporting documents.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2️⃣ OCCUPANCY RATES (OCT-DEC 2024)

Average occupancy: 60%
Peak occupancy: 78% (November 2024)

Peak reached during seasonal illness surge

Category-wise occupancy breakdown:
• General wards: 58%
• ICU/Critical care: 72%
• Isolation wards: 35%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3️⃣ PATIENTS TURNED AWAY

⚠️ 2,340 patients referred

Patients were referred to other hospitals during the quarter due to unavailability of specialized beds (primarily ICU).

✓ No patient was denied admission for general ward beds.

All referrals were managed through inter-hospital coordination protocol.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4️⃣ OPTIMIZATION MEASURES

Following steps have been implemented to optimize bed utilization:

✓ Real-time bed availability dashboard implemented across all hospitals
  • Live tracking of bed status by category
  • Updated every 30 minutes

✓ Inter-hospital patient transfer protocol established
  • Standardized referral process
  • Dedicated ambulance coordination

✓ Dedicated helpline launched for bed status queries
  • 24/7 availability: 1800-XXX-XXXX
  • Average response time: < 2 minutes`,

    responseAttachments: [
      { id: 'r1', name: 'hospital_wise_bed_data.xlsx', type: 'xlsx', size: '289 KB' },
      { id: 'r2', name: 'occupancy_trends_q4_2024.pdf', type: 'pdf', size: '1.4 MB' },
      { id: 'r3', name: 'referral_statistics.pdf', type: 'pdf', size: '780 KB' },
      { id: 'r4', name: 'optimization_measures_report.pdf', type: 'pdf', size: '1.1 MB' },
    ],

    signedBy: 'Dr. Anjali Sharma',
    signedByDesignation: 'Director, Health Services',
    signedDate: '2025-02-03',

    keyFindings: [
      'Average occupancy only 60%',
      'Peak reached 78% in Nov during seasonal illness',
      '2,340 patients referred to other hospitals for ICU beds, no general ward denials',
      'Real-time bed tracking system now implemented',
    ],

    findingData: [
      { label: 'General wards', value: 58, total: 4897, unit: 'beds (4,897 / 6,200)' },
      { label: 'ICU/Critical', value: 72, total: 1044, unit: 'beds (1,044 / 1,450)' },
      { label: 'Isolation', value: 35, total: 280, unit: 'beds (280 / 800)' },
    ],

    findingContext: 'The data contradicts widespread public perception of hospital overcrowding. With 60% average occupancy, the issue appears to be capacity planning and ICU bed distribution rather than overall bed shortage. 2,340 referrals were for specialized ICU beds, not general wards, suggesting targeted infrastructure investment needed.',

    departmentStats: {
      responseRate: 68,
      totalRTIs: 1247,
      answeredRTIs: 847,
      pendingRTIs: 312,
      overdueRTIs: 88,
      averageResponseDays: 23,
      targetResponseDays: 21,
    },

    extractedEntities: {
      amounts: [],
      officials: [
        { name: 'Dr. Anjali Sharma', designation: 'Director, Health Services' },
      ],
      vendors: [],
      dates: [
        { date: 'Oct-Dec 2024', description: 'Data reporting period' },
        { date: 'November 2024', description: 'Peak occupancy month' },
      ],
      locations: [
        { name: 'Delhi (15 government hospitals)', description: '8,450 total beds' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-20',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-21',
        title: 'Acknowledged',
        description: 'App #: HEALTH/DEL/2025/00567',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-02-03',
        title: 'Response Received',
        description: 'Comprehensive data provided',
        daysFromFiling: 14,
      },
    ],
  },
}
