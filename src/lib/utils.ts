/**
 * Utility functions for the RTI Dashboard
 */

/**
 * Format a date string to a relative time description
 * @param dateString - ISO date string
 * @returns Relative time string (e.g., "2 hours ago", "3 days ago")
 */
export function formatDistanceToNow(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInDays / 365)

  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`
  }
  if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`
  }
  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }
  if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }
  if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  }
  return 'Just now'
}

/**
 * Calculate days between two dates
 * @param startDate - Start date string
 * @param endDate - End date string (defaults to now)
 * @returns Number of days
 */
export function daysBetween(startDate: string, endDate: string = new Date().toISOString()): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffInMs = end.getTime() - start.getTime()
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24))
}

/**
 * Format a date to a readable string
 * @param dateString - ISO date string
 * @param format - Format type ('short' | 'long')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, format: 'short' | 'long' = 'short'): string {
  const date = new Date(dateString)

  if (format === 'long') {
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

/**
 * Format a number with thousand separators
 * @param num - Number to format
 * @returns Formatted string (e.g., "1,234,567")
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-IN')
}

/**
 * Format a percentage
 * @param value - Decimal value (0-1) or percentage value (0-100)
 * @param isDecimal - Whether the input is a decimal (default: false)
 * @returns Formatted percentage string (e.g., "85%")
 */
export function formatPercentage(value: number, isDecimal: boolean = false): string {
  const percentage = isDecimal ? value * 100 : value
  return `${Math.round(percentage)}%`
}

/**
 * Truncate text to a maximum length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add when truncated (default: "...")
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength - suffix.length) + suffix
}

/**
 * Generate a slug from a string
 * @param text - Text to slugify
 * @returns Slug string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Calculate percentage change
 * @param oldValue - Old value
 * @param newValue - New value
 * @returns Percentage change
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0
  return ((newValue - oldValue) / oldValue) * 100
}

/**
 * Combine class names
 * @param classes - Class names or conditionals
 * @returns Combined class string
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
