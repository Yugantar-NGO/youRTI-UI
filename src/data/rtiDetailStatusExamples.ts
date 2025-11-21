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
    reminderDate: '2024-01-20',
    pioName: 'Rajesh Kumar',
    whyThisMattersIntro: 'This RTI exposes critical gaps in infrastructure spending accountability and contractor selection processes for public road repairs.',

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
    pioName: 'Rajesh Kumar',
    whyThisMattersIntro: 'Slum rehabilitation transparency is crucial for ensuring proper housing development and accountability of public resources allocated for urban development projects.',

    statusMessage: 'Response pending from Urban Development, Maharashtra',
    statusDaysInfo: '15 days remaining before statutory deadline',

    impactOneLiner: 'Project timeline and budget details requested for slum rehabilitation initiatives',
    impactMetrics: [
      { icon: '🏛️', value: 'Urban Dev', label: 'DEPT' },
      { icon: '📍', value: 'Mumbai', label: 'LOCATION' },
      { icon: '⏱️', value: '15d', label: 'ELAPSED' },
      { icon: '⏰', value: '15d', label: 'REMAINING' },
    ],
    impactBadges: ['#HOUSING', '#PENDING'],
    viewCount: 156,

    questionText: 'I request information regarding slum rehabilitation projects in Mumbai for the period 2024-2025:',
    questionPoints: [
      'Complete list of slum rehabilitation projects sanctioned in 2024-2025',
      'Total budget allocated and actual expenditure for each project',
      'Names of contractors awarded these projects with contract values',
      'Quality inspection and maintenance records for completed projects',
    ],

    responseType: 'pending',
    canSendReminder: true,

    extractedEntities: {},

    departmentStats: {
      responseRate: 53,
      totalRTIs: 1456,
      answeredRTIs: 771,
      pendingRTIs: 187,
      overdueRTIs: 120,
      averageResponseDays: 32,
      targetResponseDays: 30,
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2024-11-05',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'acknowledged',
        date: '2024-11-06',
        title: 'Acknowledged',
        description: 'Application number: rti-014',
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
    pioName: 'Dr. Anjali Sharma',
    reminderDate: '2025-02-15',
    whyThisMattersIntro: 'This overdue RTI highlights systemic delays in healthcare transparency, potentially affecting public health planning and accountability.',

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
    pioName: 'Ravi Shankar',
    whyThisMattersIntro: 'Transfer of this RTI to PWD indicates infrastructure-related aspects of hospital capacity, revealing cross-departmental healthcare planning challenges.',

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
    id: 'RTI/CR/2024/004156',
    title: 'Revenue records and land conversion applications for IT corridor zones',
    status: 'partial',
    department: 'Revenue Dept (TN)',
    location: 'Chennai',
    state: 'Tamil Nadu',
    topic: 'Land Records',

    filedDate: '2024-09-18',
    acknowledgedDate: '2024-09-19',
    respondedDate: '2024-10-14',
    responseDays: 26,
    daysElapsed: 26,
    reminderDate: '2024-10-11',
    pioName: 'K. Jayaraman',
    whyThisMattersIntro: 'This RTI exposes critical gaps in land conversion transparency in Chennai\'s IT corridor development, affecting urban planning and public accountability.',

    statusMessage: 'The department answered 3 out of 5 questions. Two questions were denied citing exemptions under Section 8(1)(d) and 8(1)(j) of the RTI Act. You have the right to file a First Appeal within 30 days.',

    impactOneLiner: 'Partial data provided - application statistics disclosed but applicant identities and investigation details withheld',
    impactMetrics: [
      { icon: '🏛️', value: 'Revenue', label: 'DEPT' },
      { icon: '📍', value: 'Chennai', label: 'LOCATION' },
      { icon: '⏱️', value: '26d', label: 'RESPONSE' },
      { icon: '⚠️', value: '3/5', label: 'ANSWERED' },
    ],
    impactBadges: ['#PARTIAL', '#LAND_RECORDS', '#URBAN_PLANNING'],
    viewCount: 567,

    questionText: 'I request information regarding land conversion applications in IT corridor zones of Chennai for the period 2023-2024:',
    questionPoints: [
      'Total number of land conversion applications received zone-wise',
      'Approval and rejection rates for these applications with reasons',
      'List of major land conversion applicants (companies/individuals) with plot sizes',
      'Average processing time from application to approval/rejection',
      'Details of any irregularities or complaints filed regarding these conversions',
    ],

    responseType: 'partial',
    responseText: 'With reference to your RTI application dated September 18, 2024, the following information is provided for points 1, 2 and 4. Information for points 3 and 5 cannot be disclosed under Sections 8(1)(d) and 8(1)(j) of the RTI Act.',

    providedItems: [
      {
        item: 'Application volumes',
        summary: 'Total 847 applications received across IT zones with geographic distribution',
      },
      {
        item: 'Approval/rejection statistics',
        summary: '512 approved (60.4%), 189 rejected (22.3%), 146 pending (17.3%)',
      },
      {
        item: 'Processing timelines',
        summary: 'Average 127 days for approvals, 89 days for rejections (statutory: 60 days)',
      },
    ],

    deniedItems: [
      {
        item: 'Applicant identities',
        reason: 'Section 8(1)(d) - commercial confidence and trade secrets',
      },
      {
        item: 'Irregularities/complaints',
        reason: 'Section 8(1)(j) - personal information, ongoing investigations',
      },
    ],

    // Disclosed and withheld items for KeyInfoCards
    disclosedItems: [
      { text: 'Total application volumes and geographic distribution across IT zones' },
      { text: 'Approval and rejection statistics with categorical breakdown of reasons' },
      { text: 'Processing timelines revealing significant delays beyond statutory limits' },
    ],

    withheldItems: [
      { text: 'Identity of major applicants citing commercial confidentiality concerns' },
      { text: 'Details of irregularities and complaints under active investigation' },
      { text: 'These exemptions can be challenged through First Appeal process' },
    ],

    responseAttachments: [
      { id: 'r1', name: 'Official Response Letter', title: 'Official Response Letter', type: 'pdf', size: '2.4 MB', pages: 8, receivedDate: 'Oct 14, 2024' },
      { id: 'r2', name: 'Contractor Details & Registration', title: 'Contractor Details & Registration', type: 'pdf', size: '3.1 MB', pages: 12, receivedDate: 'Oct 14, 2024' },
      { id: 'r3', name: 'Project Timeline & Milestones', title: 'Project Timeline & Milestones', type: 'pdf', size: '1.8 MB', pages: 5, receivedDate: 'Oct 14, 2024' },
    ],

    signedBy: 'K. Jayaraman',
    signedByDesignation: 'PIO, Revenue Department',
    signedDate: '2024-10-14',
    canFileAppeal: true,

    // Why This Is Important points matching HTML
    whyThisIsImportant: [
      { icon: '🏙️', text: 'Reveals transparency gaps in Chennai\'s IT corridor development worth hundreds of crores' },
      { icon: '⚖️', text: 'Exposes significant delays in statutory processing timelines affecting urban planning' },
      { icon: '🔍', text: 'Highlights potential irregularities under investigation in high-value land conversions' },
      { icon: '👥', text: 'Demonstrates how commercial interests may be shielded from public accountability' },
    ],

    // Detailed Q&A for partial status
    detailedQA: [
      {
        question: 'Total number of land conversion applications received zone-wise',
        answer: '847 applications received across IT corridor zones. Siruseri: 312, OMR: 256, Sholinganallur: 189, Others: 90. Peak filing period was Q2 2024 with 287 applications.',
        status: 'answered',
        sourceDocument: 'Response Letter',
        sourcePage: 2,
      },
      {
        question: 'Approval and rejection rates for these applications with reasons',
        answer: 'Out of 847 applications: 512 approved (60.4%), 189 rejected (22.3%), 146 pending (17.3%). Main rejection reasons: zoning violations (45%), incomplete documentation (32%), environmental clearance issues (23%).',
        status: 'answered',
        sourceDocument: 'Response Letter',
        sourcePage: 4,
      },
      {
        question: 'List of major land conversion applicants (companies/individuals) with plot sizes',
        answer: '',
        denialReason: 'Information denied under Section 8(1)(d) - commercial confidence and trade secrets. Disclosure would harm competitive position of third parties.',
        status: 'denied',
      },
      {
        question: 'Average processing time from application to approval/rejection',
        answer: 'Average processing time is 127 days for approvals and 89 days for rejections. Statutory timeline is 60 days as per Tamil Nadu Land Reforms Act. Delays primarily due to inter-departmental coordination requirements.',
        status: 'answered',
        sourceDocument: 'Response Letter',
        sourcePage: 6,
      },
      {
        question: 'Details of any irregularities or complaints filed regarding these conversions',
        answer: '',
        denialReason: 'Information denied under Section 8(1)(j) - personal information and ongoing investigations. Several complaints under active investigation by vigilance department.',
        status: 'denied',
      },
    ],

    extractedEntities: {
      amounts: [
        { value: '847', description: 'Total applications' },
        { value: '512', description: 'Approved applications' },
        { value: '127 days', description: 'Avg processing time' },
      ],
      officials: [
        { name: 'K. Jayaraman', designation: 'PIO, Revenue Department' },
      ],
    },

    departmentStats: {
      responseRate: 58,
      totalRTIs: 2678,
      answeredRTIs: 1553,
      pendingRTIs: 480,
      overdueRTIs: 180,
      averageResponseDays: 29,
      targetResponseDays: 30,
      partialResponseRate: 18,
    },

    timeline: [
      {
        id: 't1',
        type: 'filed',
        date: '2024-09-18',
        title: 'RTI Filed',
        description: 'Application submitted online',
      },
      {
        id: 't2',
        type: 'reminder',
        date: '2024-10-11',
        title: 'Reminder Sent',
        description: 'Follow-up sent to department',
        daysFromFiling: 23,
      },
      {
        id: 't3',
        type: 'answered',
        date: '2024-10-14',
        title: 'Partial Response',
        description: '3 of 5 questions answered',
        daysFromFiling: 26,
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
