/**
 * RTI Detail Status Examples
 * Comprehensive sample data showcasing all 8 possible RTI status states
 */

import { RTIDetailData } from './rtiDetailData'

export const rtiStatusExamples: Record<string, RTIDetailData> = {
  // 1. ANSWERED STATE
  'status-answered': {
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

    impactOneLiner: 'Project cost was ₹12.4 Crore, 3x the initial estimate of ₹4.1 Crore with contractor appointed directly without tender',
    impactMetrics: [
      { icon: '💰', value: '₹12.4Cr', label: 'COST' },
      { icon: '📈', value: '3x', label: 'OVERRUN' },
      { icon: '⏱️', value: '15d', label: 'DELAYED' },
      { icon: '📄', value: '23d', label: 'RESPONSE' },
    ],
    impactBadges: ['#ROAD_CONSTRUCTION', '#PUBLIC_SPENDING', '#TRANSPARENCY', '#CONTRACTOR_INFO'],
    viewCount: 847,

    questionText: 'I request information regarding MG Road pothole repairs for the period January-March 2024:',
    questionPoints: [
      'What was the total project cost for MG Road pothole repairs?',
      'Who was the contractor and what was the tender process?',
      'List of major land conversion applicants (companies/individuals) with plot sizes',
    ],

    responseType: 'full-answer',
    responseText: 'The total expenditure amounted to ₹12,42,50,000 (Twelve Crore Forty Two Lakh Fifty Thousand Rupees). This includes material costs of ₹8.5 Cr and labor costs of ₹3.92 Cr. The project covered approximately 2.3 km stretch of MG Road with an average depth of repair at 150mm.',
    responseAttachments: [
      { id: 'r1', name: 'Official Response Letter', title: 'Official Response Letter', type: 'pdf', size: '2.4 MB', pages: 8, receivedDate: 'Jan 28, 2024' },
      { id: 'r2', name: 'Contractor Details & Registration', title: 'Contractor Details & Registration', type: 'pdf', size: '3.1 MB', pages: 12, receivedDate: 'Jan 28, 2024' },
      { id: 'r3', name: 'Project Timeline & Milestones', title: 'Project Timeline & Milestones', type: 'pdf', size: '1.8 MB', pages: 5, receivedDate: 'Jan 28, 2024' },
      { id: 'r4', name: 'Budget Breakdown & Expenditure', title: 'Budget Breakdown & Expenditure', type: 'pdf', size: '2.2 MB', pages: 6, receivedDate: 'Jan 28, 2024' },
    ],
    signedBy: 'Rajesh Kumar',
    signedByDesignation: 'PIO, Public Works Department',
    signedDate: '2024-01-28',

    keyFindings: [
      'Project cost was ₹12.4 Crore, 3x the initial estimate',
      'Contractor ABC Construction Ltd appointed directly without tender',
      'Project completed 15 days past deadline',
      'Quality inspection reports withheld',
    ],

    findingData: [
      { label: 'Cost Overrun', value: 300, total: 100, unit: '%' },
      { label: 'Delay', value: 15, total: 30, unit: 'days' },
      { label: 'Tender Process', value: 0, total: 100, unit: '%' },
    ],

    findingContext: 'Significant cost overruns and bypassing of standard tender procedures raise concerns about transparency in public infrastructure spending.',

    extractedEntities: {
      amounts: [
        { value: '₹12.4 Crore', description: 'Total project cost' },
        { value: '₹4.1 Crore', description: 'Initial estimate' },
        { value: '₹8.5 Crore', description: 'Material costs' },
        { value: '₹3.92 Crore', description: 'Labor costs' },
      ],
      vendors: [
        { name: 'ABC Construction Pvt Ltd', type: 'Contractor' },
      ],
      dates: [
        { date: 'Jan 5, 2024', description: 'RTI Filed' },
        { date: 'Jan 28, 2024', description: 'Response received' },
      ],
      locations: [
        { name: 'MG Road, Mumbai', description: '2.3 km stretch' },
      ],
    },

    departmentStats: {
      responseRate: 67,
      totalRTIs: 2847,
      answeredRTIs: 1906,
      pendingRTIs: 707,
      overdueRTIs: 234,
      averageResponseDays: 28,
      targetResponseDays: 30,
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2024-01-05',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'reminder',
        date: '2024-01-20',
        title: 'Reminder Sent',
        description: 'Follow-up sent to department',
        daysFromFiling: 15,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2024-01-28',
        title: 'Complete Response',
        description: 'Response received with 4 documents',
        daysFromFiling: 23,
      },
    ],
  },

  // 2. PENDING STATE
  'status-pending': {
    id: 'status-pending',
    title: 'Hospital Bed Availability in Government Hospitals',
    status: 'pending',
    department: 'Health',
    location: 'Delhi',
    state: 'Delhi',
    topic: 'Healthcare',

    filedDate: '2025-01-20',
    acknowledgedDate: '2025-01-21',
    deadline: '2025-02-19',
    daysElapsed: 12,
    daysRemaining: 18,

    statusMessage: 'Response pending from Health Department, Delhi',
    statusDaysInfo: '18 days remaining before statutory deadline',

    impactOneLiner: 'Bed availability data requested for 15 government hospitals in Delhi',
    impactMetrics: [
      { icon: '🏛️', value: 'Health', label: 'DEPT' },
      { icon: '📍', value: 'Delhi', label: 'LOCATION' },
      { icon: '⏱️', value: '12d', label: 'ELAPSED' },
      { icon: '⏰', value: '18d', label: 'REMAINING' },
    ],
    impactBadges: ['#HEALTHCARE', '#PENDING'],
    viewCount: 156,

    questionText: 'I request information regarding bed availability and occupancy in government hospitals of Delhi for the quarter October-December 2024:',
    questionPoints: [
      'Hospital-wise total bed capacity and category breakdown',
      'Average monthly occupancy rates with peak occupancy data',
      'Number of patients turned away due to bed unavailability',
      'Steps taken to optimize bed utilization and reduce waiting times',
    ],

    responseType: 'pending',
    canSendReminder: true,

    extractedEntities: {},

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
    ],
  },

  // 3. OVERDUE STATE
  'status-overdue': {
    id: 'status-overdue',
    title: 'Hospital Bed Availability in Government Hospitals',
    status: 'overdue',
    department: 'Health',
    location: 'Delhi',
    state: 'Delhi',
    topic: 'Healthcare',

    filedDate: '2025-01-20',
    acknowledgedDate: '2025-01-21',
    deadline: '2025-02-19',
    daysElapsed: 45,
    daysOverdue: 15,

    statusMessage: 'Response overdue by 15 days. Department has violated RTI Act statutory deadline. You can file first appeal now.',
    statusDaysInfo: 'Potential penalty: ₹3,750 (15 days × ₹250)',

    impactOneLiner: 'Department has failed to respond within statutory deadline of 30 days',
    impactMetrics: [
      { icon: '🏛️', value: 'Health', label: 'DEPT' },
      { icon: '📍', value: 'Delhi', label: 'LOCATION' },
      { icon: '⏱️', value: '45d', label: 'ELAPSED' },
      { icon: '🔴', value: '15d', label: 'OVERDUE' },
    ],
    impactBadges: ['#OVERDUE', '#VIOLATION'],
    viewCount: 892,

    questionText: 'I request information regarding bed availability and occupancy in government hospitals of Delhi for the quarter October-December 2024:',
    questionPoints: [
      'Hospital-wise total bed capacity and category breakdown',
      'Average monthly occupancy rates with peak occupancy data',
      'Number of patients turned away due to bed unavailability',
      'Steps taken to optimize bed utilization and reduce waiting times',
    ],

    responseType: 'overdue',
    canFileAppeal: true,
    canFileComplaint: true,
    canSendReminder: true,

    extractedEntities: {},

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
        type: 'reminder',
        date: '2025-02-19',
        title: 'Deadline Missed',
        description: 'Statutory deadline expired',
        daysFromFiling: 30,
        isLate: true,
      },
    ],
  },

  // 4. TRANSFERRED STATE
  'status-transferred': {
    id: 'status-transferred',
    title: 'Hospital Bed Availability in Government Hospitals',
    status: 'transferred',
    department: 'Health → PWD',
    location: 'Delhi',
    state: 'Delhi',
    topic: 'Healthcare',

    filedDate: '2025-01-20',
    acknowledgedDate: '2025-01-21',
    deadline: '2025-03-07',
    newDeadline: '2025-03-07',
    daysElapsed: 5,
    daysRemaining: 25,
    transferredFrom: 'Health Department, Delhi',
    transferredTo: 'Public Works Department, Delhi',
    transferReason: 'Request pertains to hospital construction data under PWD',

    statusMessage: 'Transferred to Public Works Department on 5 Feb 2025',
    statusDaysInfo: 'New department has 30 days to respond from transfer date',

    impactOneLiner: 'Application transferred to PWD for hospital infrastructure data',
    impactMetrics: [
      { icon: '🔄', value: '→ PWD', label: 'NEW DEPT' },
      { icon: '📍', value: 'Delhi', label: 'LOCATION' },
      { icon: '⏱️', value: '5d', label: 'AT NEW' },
      { icon: '⏰', value: '25d', label: 'REMAINING' },
    ],
    impactBadges: ['#TRANSFERRED'],
    viewCount: 234,

    questionText: 'I request information regarding bed availability and occupancy in government hospitals of Delhi for the quarter October-December 2024:',
    questionPoints: [
      'Hospital-wise total bed capacity and category breakdown',
      'Average monthly occupancy rates with peak occupancy data',
      'Number of patients turned away due to bed unavailability',
      'Steps taken to optimize bed utilization and reduce waiting times',
    ],

    responseType: 'transferred',

    extractedEntities: {},

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-20',
        title: 'RTI Filed',
        description: 'Filed with Health Department',
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
        type: 'transferred',
        date: '2025-02-05',
        title: 'Transferred to PWD',
        description: 'Request pertains to hospital construction data',
        daysFromFiling: 16,
      },
    ],
  },

  // 5. PARTIAL RESPONSE STATE
  'status-partial': {
    id: 'status-partial',
    title: 'Hospital Bed Availability in Government Hospitals',
    status: 'partial',
    department: 'Health',
    location: 'Delhi',
    state: 'Delhi',
    topic: 'Healthcare',

    filedDate: '2025-01-20',
    acknowledgedDate: '2025-01-21',
    respondedDate: '2025-02-03',
    daysElapsed: 14,

    statusMessage: 'Department provided partial information. 2 of 4 questions answered. You can file first appeal for complete response',

    impactOneLiner: 'Partial data provided - hospital capacity disclosed but patient referral data withheld',
    impactMetrics: [
      { icon: '🏛️', value: 'Health', label: 'DEPT' },
      { icon: '📍', value: 'Delhi', label: 'LOCATION' },
      { icon: '⏱️', value: '14d', label: 'RESPONSE' },
      { icon: '⚠️', value: '2/4', label: 'ANSWERED' },
    ],
    impactBadges: ['#PARTIAL', '#INCOMPLETE'],
    viewCount: 567,

    questionText: 'I request information regarding bed availability and occupancy in government hospitals of Delhi for the quarter October-December 2024:',
    questionPoints: [
      'Hospital-wise total bed capacity and category breakdown',
      'Average monthly occupancy rates with peak occupancy data',
      'Number of patients turned away due to bed unavailability',
      'Steps taken to optimize bed utilization and reduce waiting times',
    ],

    responseType: 'partial',
    responseText: 'With reference to your RTI application dated January 20, 2025, the following information is provided for points 1 and 2. Information for points 3 and 4 requires compilation from multiple divisions and is not readily available.',

    providedItems: [
      {
        item: 'Hospital-wise bed capacity',
        summary: 'Full breakdown provided: 15 hospitals, 8,450 beds - General: 6,200 (73%), ICU: 1,450 (17%), Isolation: 800 (10%)',
      },
      {
        item: 'Occupancy rates',
        summary: 'Average: 60% - General: 58%, ICU: 72%, Isolation: 35%, Peak: 78% in November',
      },
    ],

    deniedItems: [
      {
        item: 'Patient referrals data',
        reason: 'Information not compiled in requested format',
      },
      {
        item: 'Optimization measures',
        reason: 'Information requires compilation from multiple divisions',
      },
    ],

    responseAttachments: [
      { id: 'r1', name: 'bed_capacity_data.xlsx', type: 'xlsx', size: '289 KB' },
      { id: 'r2', name: 'occupancy_trends.pdf', type: 'pdf', size: '1.4 MB' },
    ],

    signedBy: 'Dr. Anjali Sharma',
    signedByDesignation: 'Director, Health Services',
    signedDate: '2025-02-03',
    canFileAppeal: true,

    extractedEntities: {
      amounts: [
        { value: '8,450', description: 'Total beds' },
      ],
      officials: [
        { name: 'Dr. Anjali Sharma', designation: 'Director, Health Services' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-20',
        title: 'RTI Filed',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-21',
        title: 'Acknowledged',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-02-03',
        title: 'Partial Response',
        description: '2 of 4 questions answered',
        daysFromFiling: 14,
      },
    ],
  },

  // 6. INFO NOT AVAILABLE STATE
  'status-not-available': {
    id: 'status-not-available',
    title: 'Hospital Bed Availability in Government Hospitals',
    status: 'not-available',
    department: 'Health',
    location: 'Delhi',
    state: 'Delhi',
    topic: 'Healthcare',

    filedDate: '2025-01-20',
    acknowledgedDate: '2025-01-21',
    respondedDate: '2025-02-03',
    daysElapsed: 14,

    statusMessage: 'Department claims requested information does not exist',
    statusDaysInfo: 'You can file first appeal if you believe info exists',

    impactOneLiner: 'Department claims no records exist for requested period despite mandatory data collection',
    impactMetrics: [
      { icon: '🏛️', value: 'Health', label: 'DEPT' },
      { icon: '📍', value: 'Delhi', label: 'LOCATION' },
      { icon: '⏱️', value: '14d', label: 'RESPONSE' },
      { icon: '❌', value: 'None', label: 'PROVIDED' },
    ],
    impactBadges: ['#NOT_AVAILABLE', '#APPEAL'],
    viewCount: 789,

    questionText: 'I request information regarding bed availability and occupancy in government hospitals of Delhi for the quarter October-December 2024:',
    questionPoints: [
      'Hospital-wise total bed capacity and category breakdown',
      'Average monthly occupancy rates with peak occupancy data',
      'Number of patients turned away due to bed unavailability',
      'Steps taken to optimize bed utilization and reduce waiting times',
    ],

    responseType: 'not-available',
    responseText: 'The requested information regarding hospital bed occupancy data for October-December 2024 is not maintained by this department. No records exist in the requested format as real-time tracking was only implemented from January 2025.',

    deniedItems: [
      {
        item: 'All requested information',
        reason: 'Records not maintained for requested period',
      },
    ],

    signedBy: 'Dr. Anjali Sharma',
    signedByDesignation: 'Director, Health Services',
    signedDate: '2025-02-03',
    canFileAppeal: true,

    extractedEntities: {
      officials: [
        { name: 'Dr. Anjali Sharma', designation: 'Director, Health Services' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-20',
        title: 'RTI Filed',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-21',
        title: 'Acknowledged',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-02-03',
        title: 'Info Not Available',
        description: 'Department states records do not exist',
        daysFromFiling: 14,
      },
    ],
  },

  // 7. PUBLIC DOMAIN STATE
  'status-public-domain': {
    id: 'status-public-domain',
    title: 'Hospital Bed Availability in Government Hospitals',
    status: 'public-domain',
    department: 'Health',
    location: 'Delhi',
    state: 'Delhi',
    topic: 'Healthcare',

    filedDate: '2025-01-20',
    acknowledgedDate: '2025-01-21',
    respondedDate: '2025-02-03',
    daysElapsed: 14,

    statusMessage: 'Information already available in public domain. Links provided by department below.',

    impactOneLiner: 'Department directs to existing public portals for hospital bed data',
    impactMetrics: [
      { icon: '🏛️', value: 'Health', label: 'DEPT' },
      { icon: '📍', value: 'Delhi', label: 'LOCATION' },
      { icon: '⏱️', value: '14d', label: 'RESPONSE' },
      { icon: '🔗', value: '3', label: 'LINKS' },
    ],
    impactBadges: ['#PUBLIC_DOMAIN'],
    viewCount: 345,

    questionText: 'I request information regarding bed availability and occupancy in government hospitals of Delhi for the quarter October-December 2024:',
    questionPoints: [
      'Hospital-wise total bed capacity and category breakdown',
      'Average monthly occupancy rates with peak occupancy data',
      'Number of patients turned away due to bed unavailability',
      'Steps taken to optimize bed utilization and reduce waiting times',
    ],

    responseType: 'public-domain',
    responseText: 'The requested information is already available in the public domain at the following locations:',

    publicDomainLinks: [
      {
        url: 'https://health.delhi.gov.in/bed-availability',
        description: 'Delhi Health Portal - Bed Availability Dashboard',
      },
      {
        url: 'https://nhm.delhi.gov.in/statistics/quarterly-reports',
        description: 'National Health Mission - Hospital Statistics',
      },
      {
        url: 'https://data.gov.in/catalog/delhi-hospitals',
        description: 'Open Government Data Portal - Healthcare Dataset',
      },
    ],

    signedBy: 'Dr. Anjali Sharma',
    signedByDesignation: 'Director, Health Services',
    signedDate: '2025-02-03',
    canFileAppeal: true,

    extractedEntities: {
      officials: [
        { name: 'Dr. Anjali Sharma', designation: 'Director, Health Services' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-20',
        title: 'RTI Filed',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-21',
        title: 'Acknowledged',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2025-02-03',
        title: 'Public Domain Response',
        description: 'Directed to 3 public websites',
        daysFromFiling: 14,
      },
    ],
  },

  // 8. THIRD PARTY CONSULT STATE
  'status-third-party': {
    id: 'status-third-party',
    title: 'Hospital Bed Availability in Government Hospitals',
    status: 'third-party',
    department: 'Health',
    location: 'Delhi',
    state: 'Delhi',
    topic: 'Healthcare',

    filedDate: '2025-01-20',
    acknowledgedDate: '2025-01-21',
    deadline: '2025-02-28',
    newDeadline: '2025-02-28',
    daysElapsed: 20,
    daysRemaining: 20,
    extensionDays: 10,
    thirdPartyName: 'Apollo Hospitals Ltd.',
    thirdPartyReason: 'The requested information pertains to data collected and maintained by Apollo Hospitals (private entity). Under Section 11 of RTI Act, we are consulting with the third party before disclosure.',

    statusMessage: 'Information involves third party. Department consulting external entity. Deadline extended by additional 10 days.',

    impactOneLiner: 'Third-party consultation underway with private hospital for data disclosure',
    impactMetrics: [
      { icon: '🏛️', value: 'Health', label: 'DEPT' },
      { icon: '📍', value: 'Delhi', label: 'LOCATION' },
      { icon: '⏱️', value: '20d', label: 'ELAPSED' },
      { icon: '🤝', value: '40d', label: 'DEADLINE' },
    ],
    impactBadges: ['#THIRD_PARTY'],
    viewCount: 234,

    questionText: 'I request information regarding bed availability and occupancy in government hospitals of Delhi for the quarter October-December 2024:',
    questionPoints: [
      'Hospital-wise total bed capacity and category breakdown',
      'Average monthly occupancy rates with peak occupancy data',
      'Number of patients turned away due to bed unavailability',
      'Steps taken to optimize bed utilization and reduce waiting times',
    ],

    responseType: 'third-party',

    extractedEntities: {
      vendors: [
        { name: 'Apollo Hospitals Ltd.', type: 'Third party' },
      ],
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2025-01-20',
        title: 'RTI Filed',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2025-01-21',
        title: 'Acknowledged',
        daysFromFiling: 1,
      },
      {
        id: 't3',
        type: 'reminder',
        date: '2025-02-05',
        title: 'Third Party Notice',
        description: 'Consultation initiated with Apollo Hospitals',
        daysFromFiling: 16,
      },
    ],
  },
}
