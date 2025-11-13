/**
 * RTIDashboardPage Component
 *
 * Top-level page component for the RTI Dashboard Landing Page.
 * Now refactored to use Container/Presentation pattern with proper
 * error handling, loading states, and data management.
 *
 * Architecture:
 * - RTIDashboardContainer: Handles data fetching and state
 * - RTIDashboardPresentation: Pure UI component
 * - DashboardContext: Provides data to child components
 * - Error boundaries: Handle errors gracefully
 *
 * @example
 * <RTIDashboardPage />
 */

import { RTIDashboardContainerWithErrorBoundary } from './RTIDashboardContainer'

export function RTIDashboardPage() {
  return <RTIDashboardContainerWithErrorBoundary />
}
