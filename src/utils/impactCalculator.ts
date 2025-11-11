/**
 * Impact Calculator
 * Calculates and generates impact metrics for RTI outcomes
 */

import type {
  ImpactMetric,
  ImpactOutcome,
  RTIOutcomeType,
  TrendDirection,
} from '@/types/redesign'

// ============================================
// Impact Metric Icons
// ============================================

const METRIC_ICONS: Record<string, string> = {
  // Money
  money: '💰',
  rupees: '₹',
  budget: '💵',
  savings: '💸',

  // People
  people: '👥',
  beneficiaries: '🤝',
  students: '🎓',
  patients: '🏥',
  families: '👨‍👩‍👧‍👦',
  children: '👶',
  workers: '👷',
  citizens: '🧑‍🤝‍🧑',

  // Infrastructure
  buildings: '🏢',
  homes: '🏠',
  schools: '🏫',
  hospitals: '🏥',
  roads: '🛣️',
  bridges: '🌉',

  // Time
  days: '⏱️',
  months: '📅',
  years: '🗓️',

  // Data/Documents
  documents: '📄',
  records: '📊',
  files: '📁',
  reports: '📋',

  // Environment
  trees: '🌳',
  water: '💧',
  pollution: '🏭',
  waste: '♻️',

  // Services
  service: '⚙️',
  beds: '🛏️',
  doctors: '👨‍⚕️',
  teachers: '👨‍🏫',
  shops: '🏪',

  // Land/Area
  acres: '📍',
  hectares: '🗺️',
  area: '📐',

  // Misc
  cases: '📁',
  complaints: '📢',
  violations: '⚠️',
  actions: '✅',
}

// ============================================
// Metric Generation by Outcome Type
// ============================================

/**
 * Generate metrics for data released outcomes
 */
export function generateDataReleasedMetrics(data: {
  recordCount?: number
  documentsCount?: number
  dataSize?: string
  yearsOfData?: number
  entitiesAffected?: number
  ghostRecords?: number
}): ImpactMetric[] {
  const metrics: ImpactMetric[] = []

  if (data.recordCount) {
    metrics.push({
      icon: METRIC_ICONS.records,
      value: formatNumber(data.recordCount),
      label: 'Records',
    })
  }

  if (data.documentsCount) {
    metrics.push({
      icon: METRIC_ICONS.documents,
      value: formatNumber(data.documentsCount),
      label: 'Documents',
    })
  }

  if (data.dataSize) {
    metrics.push({
      icon: METRIC_ICONS.files,
      value: data.dataSize,
      label: 'Data released',
    })
  }

  if (data.yearsOfData) {
    metrics.push({
      icon: METRIC_ICONS.years,
      value: data.yearsOfData,
      label: 'Years covered',
    })
  }

  if (data.ghostRecords) {
    metrics.push({
      icon: METRIC_ICONS.violations,
      value: formatNumber(data.ghostRecords),
      label: 'Ghost records',
    })
  }

  if (data.entitiesAffected) {
    metrics.push({
      icon: METRIC_ICONS.people,
      value: formatNumber(data.entitiesAffected),
      label: 'Entities affected',
    })
  }

  return metrics
}

/**
 * Generate metrics for money sanctioned outcomes
 */
export function generateMoneySanctionedMetrics(data: {
  amount: number
  beneficiaries?: number
  beneficiaryType?: string
  waitTime?: number
  projects?: number
}): ImpactMetric[] {
  const metrics: ImpactMetric[] = []

  metrics.push({
    icon: METRIC_ICONS.money,
    value: formatMoney(data.amount),
    label: 'Sanctioned',
  })

  if (data.beneficiaries) {
    const icon = data.beneficiaryType
      ? METRIC_ICONS[data.beneficiaryType.toLowerCase()] || METRIC_ICONS.people
      : METRIC_ICONS.people

    metrics.push({
      icon,
      value: formatNumber(data.beneficiaries),
      label: data.beneficiaryType || 'Beneficiaries',
    })
  }

  if (data.waitTime) {
    metrics.push({
      icon: METRIC_ICONS.days,
      value: data.waitTime,
      label: 'Days delayed',
    })
  }

  if (data.projects) {
    metrics.push({
      icon: METRIC_ICONS.cases,
      value: data.projects,
      label: 'Projects',
    })
  }

  return metrics
}

/**
 * Generate metrics for services fixed outcomes
 */
export function generateServicesFixedMetrics(data: {
  beneficiaries?: number
  beneficiaryType?: string
  serviceUnits?: number
  serviceUnitLabel?: string
  downtimeDays?: number
  area?: string
}): ImpactMetric[] {
  const metrics: ImpactMetric[] = []

  if (data.serviceUnits) {
    const icon = data.serviceUnitLabel
      ? METRIC_ICONS[data.serviceUnitLabel.toLowerCase()] || METRIC_ICONS.service
      : METRIC_ICONS.service

    metrics.push({
      icon,
      value: formatNumber(data.serviceUnits),
      label: data.serviceUnitLabel || 'Units',
    })
  }

  if (data.beneficiaries) {
    const icon = data.beneficiaryType
      ? METRIC_ICONS[data.beneficiaryType.toLowerCase()] || METRIC_ICONS.people
      : METRIC_ICONS.people

    metrics.push({
      icon,
      value: formatNumber(data.beneficiaries),
      label: data.beneficiaryType || 'People',
    })
  }

  if (data.downtimeDays) {
    metrics.push({
      icon: METRIC_ICONS.days,
      value: data.downtimeDays,
      label: 'Days downtime',
    })
  }

  if (data.area) {
    metrics.push({
      icon: METRIC_ICONS.area,
      value: data.area,
      label: 'Area covered',
    })
  }

  return metrics
}

/**
 * Generate metrics for policy changed outcomes
 */
export function generatePolicyChangedMetrics(data: {
  beneficiaries?: number
  scope?: string
  previousViolations?: number
  enforcements?: number
  entitiesAffected?: number
}): ImpactMetric[] {
  const metrics: ImpactMetric[] = []

  if (data.enforcements) {
    metrics.push({
      icon: METRIC_ICONS.actions,
      value: formatNumber(data.enforcements),
      label: 'Enforcements',
    })
  }

  if (data.beneficiaries) {
    metrics.push({
      icon: METRIC_ICONS.people,
      value: formatNumber(data.beneficiaries),
      label: 'People impacted',
    })
  }

  if (data.entitiesAffected) {
    metrics.push({
      icon: METRIC_ICONS.buildings,
      value: formatNumber(data.entitiesAffected),
      label: 'Entities',
    })
  }

  if (data.previousViolations) {
    metrics.push({
      icon: METRIC_ICONS.violations,
      value: formatNumber(data.previousViolations),
      label: 'Past violations',
    })
  }

  if (data.scope) {
    metrics.push({
      icon: METRIC_ICONS.area,
      value: data.scope,
      label: 'Scope',
    })
  }

  return metrics
}

/**
 * Generate metrics for accountability actions
 */
export function generateAccountabilityMetrics(data: {
  officialsAffected?: number
  investigationsLaunched?: number
  actionsTaken?: number
  amountRecovered?: number
  casesReferred?: number
}): ImpactMetric[] {
  const metrics: ImpactMetric[] = []

  if (data.actionsTaken) {
    metrics.push({
      icon: METRIC_ICONS.actions,
      value: data.actionsTaken,
      label: 'Actions taken',
    })
  }

  if (data.officialsAffected) {
    metrics.push({
      icon: METRIC_ICONS.people,
      value: data.officialsAffected,
      label: 'Officials',
    })
  }

  if (data.investigationsLaunched) {
    metrics.push({
      icon: METRIC_ICONS.cases,
      value: data.investigationsLaunched,
      label: 'Investigations',
    })
  }

  if (data.amountRecovered) {
    metrics.push({
      icon: METRIC_ICONS.money,
      value: formatMoney(data.amountRecovered),
      label: 'Recovered',
    })
  }

  if (data.casesReferred) {
    metrics.push({
      icon: METRIC_ICONS.cases,
      value: data.casesReferred,
      label: 'Cases referred',
    })
  }

  return metrics
}

// ============================================
// Format Helpers
// ============================================

/**
 * Format number for display (e.g., 1234 -> "1.2K")
 */
export function formatNumber(value: number): string {
  if (value >= 10000000) {
    return `${(value / 10000000).toFixed(1)}Cr`
  }
  if (value >= 100000) {
    return `${(value / 100000).toFixed(1)}L`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toString()
}

/**
 * Format money for display (e.g., 1200000 -> "₹12L")
 */
export function formatMoney(value: number): string {
  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(1)}Cr`
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`
  }
  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}K`
  }
  return `₹${value}`
}

/**
 * Calculate days between two dates
 */
export function calculateDaysBetween(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diff = end.getTime() - start.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

/**
 * Calculate days from date to now
 */
export function calculateDaysAgo(date: string): number {
  return calculateDaysBetween(date, new Date().toISOString())
}

/**
 * Determine trend direction based on change percentage
 */
export function determineTrend(changePercent: number): TrendDirection {
  if (changePercent > 5) return 'up'
  if (changePercent < -5) return 'down'
  return 'stable'
}

// ============================================
// Impact Outcome Builder
// ============================================

/**
 * Build complete impact outcome
 */
export function buildImpactOutcome(
  outcomeType: RTIOutcomeType,
  title: string,
  metrics: ImpactMetric[],
  description?: string
): ImpactOutcome {
  return {
    title,
    metrics,
    description,
  }
}

/**
 * Generate impact outcome based on outcome type
 */
export function generateImpactOutcome(
  outcomeType: RTIOutcomeType,
  title: string,
  data: Record<string, unknown>,
  description?: string
): ImpactOutcome {
  let metrics: ImpactMetric[] = []

  switch (outcomeType) {
    case 'data_released':
      metrics = generateDataReleasedMetrics(data as Parameters<typeof generateDataReleasedMetrics>[0])
      break
    case 'money_sanctioned':
      metrics = generateMoneySanctionedMetrics(data as Parameters<typeof generateMoneySanctionedMetrics>[0])
      break
    case 'services_fixed':
      metrics = generateServicesFixedMetrics(data as Parameters<typeof generateServicesFixedMetrics>[0])
      break
    case 'policy_changed':
      metrics = generatePolicyChangedMetrics(data as Parameters<typeof generatePolicyChangedMetrics>[0])
      break
    case 'accountability_action':
      metrics = generateAccountabilityMetrics(data as Parameters<typeof generateAccountabilityMetrics>[0])
      break
  }

  return buildImpactOutcome(outcomeType, title, metrics, description)
}

// ============================================
// Export All Icons
// ============================================

export { METRIC_ICONS }
