/**
 * Browse RTIs Page
 *
 * Filter and search through all RTI requests with comprehensive filtering options.
 */

import { BrowsePage } from '@/components/features/browse/BrowsePage'

export const metadata = {
  title: 'Browse RTIs - yourRTI Transparency Dashboard',
  description: 'Filter and search through RTI requests across India with topic, location, status, and department filters.',
}

export default function Browse() {
  return <BrowsePage />
}
