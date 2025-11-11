/**
 * RTI Repository
 * Provides mock data and filtering for RTI requests
 */

import { RTIRequest, RTIStatus } from '@/types'
import { EditionFilter } from '@/types/dashboard'
import { Repository, EditionFilterable } from './types'

class RTIRepositoryImpl implements Repository<RTIRequest>, EditionFilterable {
  private data: RTIRequest[]
  private currentFilter?: EditionFilter

  constructor() {
    this.data = this.generateMockData()
  }

  applyEditionFilter(filter: EditionFilter): this {
    this.currentFilter = filter
    return this
  }

  getAll(): RTIRequest[] {
    if (!this.currentFilter) {
      return this.data
    }

    return this.data.filter(item => {
      switch (this.currentFilter!.level) {
        case 'national':
          return true
        case 'state':
          return item.state === this.currentFilter!.state
        case 'district':
          return item.district === this.currentFilter!.district
        default:
          return true
      }
    })
  }

  getById(id: string): RTIRequest | undefined {
    return this.data.find(item => item.id === id)
  }

  filter(predicate: (item: RTIRequest) => boolean): RTIRequest[] {
    return this.getAll().filter(predicate)
  }

  /**
   * Get recent RTIs, sorted by filed date
   */
  getRecent(limit: number = 10): RTIRequest[] {
    return this.getAll()
      .sort((a, b) => new Date(b.filedDate).getTime() - new Date(a.filedDate).getTime())
      .slice(0, limit)
  }

  /**
   * Get RTIs by status
   */
  getByStatus(status: RTIStatus): RTIRequest[] {
    return this.filter(item => item.status === status)
  }

  /**
   * Get RTIs by department
   */
  getByDepartment(department: string): RTIRequest[] {
    return this.filter(item => item.department === department)
  }

  /**
   * Get RTIs by category
   */
  getByCategory(category: string): RTIRequest[] {
    return this.filter(item => item.category === category)
  }

  /**
   * Get recently responded RTIs
   */
  getRecentlyResponded(limit: number = 10): RTIRequest[] {
    return this.getAll()
      .filter(item => item.responseDate && (item.status === 'disclosed' || item.status === 'rejected'))
      .sort((a, b) => {
        const dateA = a.responseDate ? new Date(a.responseDate).getTime() : 0
        const dateB = b.responseDate ? new Date(b.responseDate).getTime() : 0
        return dateB - dateA
      })
      .slice(0, limit)
  }

  /**
   * Generate comprehensive mock data
   */
  private generateMockData(): RTIRequest[] {
    return [
      // Maharashtra - Mumbai
      {
        id: 'rti-001',
        title: 'Hospital Licensing Records for Mumbai Region',
        description: 'Request for complete list of licensed hospitals in Mumbai, including inspection reports and compliance status.',
        department: 'Health Department',
        location: 'Mumbai, Maharashtra',
        state: 'Maharashtra',
        district: 'Mumbai',
        status: 'pending',
        filedDate: '2025-11-11',
        category: 'Healthcare',
        tags: ['hospitals', 'licensing', 'compliance']
      },
      {
        id: 'rti-002',
        title: 'Road Construction Contracts - Western Express Highway',
        description: 'Details of contracts awarded for Western Express Highway repairs in 2025.',
        department: 'PWD',
        location: 'Mumbai, Maharashtra',
        state: 'Maharashtra',
        district: 'Mumbai',
        status: 'pending',
        filedDate: '2025-11-10',
        category: 'Infrastructure',
        tags: ['roads', 'contracts', 'construction']
      },
      {
        id: 'rti-003',
        title: 'Municipal Tax Collection Data FY 2024-25',
        description: 'Detailed breakdown of property tax collection by ward.',
        department: 'BMC',
        location: 'Mumbai, Maharashtra',
        state: 'Maharashtra',
        district: 'Mumbai',
        status: 'disclosed',
        filedDate: '2025-10-28',
        responseDate: '2025-11-09',
        category: 'Finance',
        tags: ['tax', 'municipal', 'revenue'],
        reactions: 247
      },
      {
        id: 'rti-004',
        title: 'Mid-day Meal Expenditure - Government Schools',
        description: 'Monthly expenditure and menu details for mid-day meal scheme in Mumbai municipal schools.',
        department: 'Education Department',
        location: 'Mumbai, Maharashtra',
        state: 'Maharashtra',
        district: 'Mumbai',
        status: 'disclosed',
        filedDate: '2025-10-28',
        responseDate: '2025-11-09',
        category: 'Education',
        tags: ['education', 'nutrition', 'schools']
      },

      // Delhi
      {
        id: 'rti-005',
        title: 'Police Complaint Records - NCR Region',
        description: 'Statistics on filed complaints and resolution rates for the NCR region.',
        department: 'Home Affairs',
        location: 'Delhi',
        state: 'Delhi',
        status: 'rejected',
        filedDate: '2025-11-01',
        responseDate: '2025-11-09',
        category: 'Law & Order',
        tags: ['police', 'complaints', 'security']
      },
      {
        id: 'rti-006',
        title: 'Public Transport Budget Allocation 2025',
        description: 'Detailed budget allocation for DTC buses and metro expansion.',
        department: 'Transport Department',
        location: 'Delhi',
        state: 'Delhi',
        status: 'disclosed',
        filedDate: '2025-11-01',
        responseDate: '2025-11-08',
        category: 'Transport',
        tags: ['transport', 'budget', 'metro'],
        reactions: 189
      },
      {
        id: 'rti-007',
        title: 'Air Quality Monitoring Stations - Maintenance Records',
        description: 'Maintenance and calibration records for all AQI monitoring stations in Delhi.',
        department: 'Environment Department',
        location: 'Delhi',
        state: 'Delhi',
        status: 'disclosed',
        filedDate: '2025-10-25',
        responseDate: '2025-11-07',
        category: 'Environment',
        tags: ['air quality', 'monitoring', 'environment'],
        reactions: 421
      },

      // Karnataka - Bangalore
      {
        id: 'rti-008',
        title: 'School Infrastructure Development Funds',
        description: 'Allocation and utilization of funds for school infrastructure in Bangalore.',
        department: 'Education Department',
        location: 'Bangalore, Karnataka',
        state: 'Karnataka',
        district: 'Bangalore',
        status: 'pending',
        filedDate: '2025-11-10',
        category: 'Education',
        tags: ['education', 'infrastructure', 'funding']
      },
      {
        id: 'rti-009',
        title: 'Water Supply Pipeline Contracts',
        description: 'Details of contracts for Cauvery water supply pipeline expansion.',
        department: 'Water Resources',
        location: 'Bangalore, Karnataka',
        state: 'Karnataka',
        district: 'Bangalore',
        status: 'disclosed',
        filedDate: '2025-10-20',
        responseDate: '2025-11-05',
        category: 'Infrastructure',
        tags: ['water', 'contracts', 'infrastructure'],
        reactions: 312
      },

      // Tamil Nadu
      {
        id: 'rti-010',
        title: 'Public Distribution System - Ration Card Data',
        description: 'Number of ration cards issued and distribution of essential commodities.',
        department: 'Food & Civil Supplies',
        location: 'Chennai, Tamil Nadu',
        state: 'Tamil Nadu',
        district: 'Chennai',
        status: 'disclosed',
        filedDate: '2025-10-15',
        responseDate: '2025-11-03',
        category: 'Welfare',
        tags: ['pds', 'ration', 'food security'],
        reactions: 156
      },
      {
        id: 'rti-011',
        title: 'Illegal Sand Mining Operations Report',
        description: 'Action taken report on illegal sand mining in Palar river basin.',
        department: 'Environment Department',
        location: 'Vellore, Tamil Nadu',
        state: 'Tamil Nadu',
        district: 'Vellore',
        status: 'disclosed',
        filedDate: '2025-09-28',
        responseDate: '2025-10-30',
        category: 'Environment',
        tags: ['environment', 'mining', 'compliance'],
        reactions: 892
      },

      // Uttar Pradesh
      {
        id: 'rti-012',
        title: 'Widow Pension Payment Delays',
        description: 'Details of pending pension payments for widows in Agra district.',
        department: 'Social Welfare',
        location: 'Agra, Uttar Pradesh',
        state: 'Uttar Pradesh',
        district: 'Agra',
        status: 'pending',
        filedDate: '2025-11-09',
        category: 'Welfare',
        tags: ['pension', 'welfare', 'social security']
      },
      {
        id: 'rti-013',
        title: 'Rural Housing Scheme Beneficiary List',
        description: 'List of beneficiaries selected under Pradhan Mantri Awas Yojana in rural areas.',
        department: 'Rural Development',
        location: 'Lucknow, Uttar Pradesh',
        state: 'Uttar Pradesh',
        district: 'Lucknow',
        status: 'disclosed',
        filedDate: '2025-10-10',
        responseDate: '2025-11-02',
        category: 'Housing',
        tags: ['housing', 'welfare', 'schemes'],
        reactions: 234
      },

      // More entries for variety
      {
        id: 'rti-014',
        title: 'Primary Health Centre Medicine Stock Details',
        description: 'Medicine availability and stock-out situations in PHCs across Mumbai.',
        department: 'Health Department',
        location: 'Mumbai, Maharashtra',
        state: 'Maharashtra',
        district: 'Mumbai',
        status: 'disclosed',
        filedDate: '2025-11-02',
        responseDate: '2025-11-10',
        category: 'Healthcare',
        tags: ['health', 'medicine', 'phc']
      },
      {
        id: 'rti-015',
        title: 'Building Plan Approval Status - Ward 14',
        description: 'List of building plan approvals and rejections in Ward 14.',
        department: 'Urban Development',
        location: 'Mumbai, Maharashtra',
        state: 'Maharashtra',
        district: 'Mumbai',
        status: 'rejected',
        filedDate: '2025-10-30',
        responseDate: '2025-11-05',
        category: 'Urban Planning',
        tags: ['building', 'approval', 'urban']
      },
      {
        id: 'rti-016',
        title: 'Road Repair Status - Main Bazaar Road',
        description: 'Timeline and status of road repair work on Main Bazaar Road.',
        department: 'PWD',
        location: 'Pune, Maharashtra',
        state: 'Maharashtra',
        district: 'Pune',
        status: 'pending',
        filedDate: '2025-11-09',
        category: 'Infrastructure',
        tags: ['roads', 'repairs', 'infrastructure']
      },
      {
        id: 'rti-017',
        title: 'Street Light Maintenance Contracts',
        description: 'Details of annual maintenance contracts for street lighting.',
        department: 'Municipal Corporation',
        location: 'Delhi',
        state: 'Delhi',
        status: 'disclosed',
        filedDate: '2025-10-18',
        responseDate: '2025-11-04',
        category: 'Infrastructure',
        tags: ['street lights', 'maintenance', 'contracts']
      },
      {
        id: 'rti-018',
        title: 'Scholarship Disbursement Records',
        description: 'Records of scholarship amounts disbursed to SC/ST students.',
        department: 'Education Department',
        location: 'Bangalore, Karnataka',
        state: 'Karnataka',
        district: 'Bangalore',
        status: 'disclosed',
        filedDate: '2025-10-12',
        responseDate: '2025-11-01',
        category: 'Education',
        tags: ['scholarship', 'education', 'welfare'],
        reactions: 178
      },
      {
        id: 'rti-019',
        title: 'Drainage System Improvement Plan',
        description: 'Details of drainage improvement projects in flood-prone areas.',
        department: 'PWD',
        location: 'Chennai, Tamil Nadu',
        state: 'Tamil Nadu',
        district: 'Chennai',
        status: 'disclosed',
        filedDate: '2025-10-05',
        responseDate: '2025-10-28',
        category: 'Infrastructure',
        tags: ['drainage', 'floods', 'infrastructure'],
        reactions: 445
      },
      {
        id: 'rti-020',
        title: 'Forest Land Diversion Approvals',
        description: 'List of forest land diversions approved for development projects.',
        department: 'Forest Department',
        location: 'Dehradun, Uttarakhand',
        state: 'Uttarakhand',
        district: 'Dehradun',
        status: 'pending',
        filedDate: '2025-11-08',
        category: 'Environment',
        tags: ['forest', 'land', 'environment']
      }
    ]
  }
}

// Export singleton instance
export const RTIRepository = new RTIRepositoryImpl()
