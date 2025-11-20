import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { rtiDetailMockData } from '@/data/rtiDetailData'
import { rtiStatusExamples } from '@/data/rtiDetailStatusExamples'
import { RTIDetailLayout } from '@/components/features/rti-detail/organisms'
import { Breadcrumb } from '@/components/features/rti-detail/atoms'

interface RTIDetailPageProps {
  params: {
    id: string
  }
}

/**
 * Generate metadata for RTI detail page
 * Used for SEO and social sharing
 */
export async function generateMetadata({ params }: RTIDetailPageProps): Promise<Metadata> {
  const data = rtiDetailMockData[params.id] || rtiStatusExamples[params.id]

  if (!data) {
    return {
      title: 'RTI Not Found | youRTI',
      description: 'The requested RTI information could not be found.',
    }
  }

  return {
    title: `${data.title} | youRTI`,
    description: data.impactOneLiner,
    openGraph: {
      title: data.title,
      description: data.impactOneLiner,
      type: 'article',
    },
  }
}

/**
 * RTI Detail Page
 *
 * Server component that fetches RTI detail data and renders the complete detail view.
 * - Fetches data from rtiDetailMockData (will be replaced with API call in production)
 * - Returns 404 if RTI ID is not found
 * - Renders breadcrumb navigation
 * - Delegates layout to RTIDetailLayout organism
 *
 * Available RTI IDs for testing:
 * Regular examples:
 * - rti-001: Full answer with documents
 * - rti-003: Overdue response
 * - rti-006: Pending response
 * - rti-019: Transferred to another department
 * - rti-020: Partial answer (some denied)
 * - rti-021: Information not available
 * - rti-022: Referred to public domain
 * - rti-023: Third party notice issued
 *
 * Status-specific showcase examples:
 * - status-answered: Complete answered state with full details
 * - status-pending: Pending state with days remaining
 * - status-overdue: Overdue state with penalty info
 * - status-transferred: Transferred to another department
 * - status-partial: Partial response state
 * - status-not-available: Info not available state
 * - status-public-domain: Public domain links provided
 * - status-third-party: Third party consultation underway
 *
 * @example
 * URL: /rti/status-answered
 * URL: /rti/status-pending
 * URL: /rti/status-overdue
 */
export default function RTIDetailPage({ params }: RTIDetailPageProps) {
  // Fetch RTI data from either regular mock data or status examples
  const data = rtiDetailMockData[params.id] || rtiStatusExamples[params.id]

  // Return 404 if RTI not found
  if (!data) {
    notFound()
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Browse RTIs', href: '/browse' },
    { label: data.title, href: `/rti/${params.id}`, current: true },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #020617 0%, #0F172A 100%)',
      paddingBottom: 'var(--spacing-3xl)'
    }}>
      {/* Breadcrumb Navigation */}
      <div style={{
        padding: 'var(--spacing-lg) var(--spacing-lg)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Main Content */}
      <RTIDetailLayout data={data} />
    </div>
  )
}

/**
 * Generate static params for all available RTI IDs
 * This enables static generation at build time for better performance
 */
export function generateStaticParams() {
  const regularIds = Object.keys(rtiDetailMockData).map((id) => ({ id }))
  const statusIds = Object.keys(rtiStatusExamples).map((id) => ({ id }))
  return [...regularIds, ...statusIds]
}
