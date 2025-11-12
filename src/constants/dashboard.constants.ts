/**
 * Dashboard Statistics Constants
 *
 * Centralized constants for dashboard statistics and metrics.
 * These values are displayed across various dashboard components.
 */

export const DASHBOARD_STATS = {
  ACTIVE_RTIS: 8450,
  ON_TIME_RESPONSE_RATE: 68,
  DEPARTMENT_COUNT: 350,
} as const

export const INDIA_STATS = {
  STATES: 28,
  UNION_TERRITORIES: 8,
  POPULATION: '1.4B',
} as const

/**
 * Response time thresholds (in days)
 */
export const RESPONSE_THRESHOLDS = {
  STANDARD_RESPONSE_DAYS: 30,
  URGENT_RESPONSE_HOURS: 48,
} as const

/**
 * Icon sizes (in pixels)
 */
export const ICON_SIZES = {
  BASE: 16,
  LARGE: 24,
  SMALL: 12,
} as const
