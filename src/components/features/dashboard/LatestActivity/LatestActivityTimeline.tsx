/**
 * LatestActivityTimeline Component
 *
 * Shows recent RTI activity using the Timeline widget
 * Displays filed, responded, and pending RTIs
 */

'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Timeline, TimelineItemData } from '@/components/widgets/Timeline/Timeline'
import { Badge } from '@/components/ui/Badge'
import { RTIRepository } from '@/services/repositories/RTIRepository'
import { useEditionFilter } from '@/context/EditionContext'
import { formatDistanceToNow, daysBetween } from '@/lib/utils'
import { FileText } from '@/lib/icons'

export function LatestActivityTimeline() {
  const { filter } = useEditionFilter()
  const recentRTIs = RTIRepository.applyEditionFilter(filter).getRecent(7)

  const timelineItems: TimelineItemData[] = recentRTIs.map(rti => ({
    id: rti.id,
    title: rti.title,
    subtitle: `[${rti.department}]`,
    timestamp: formatDistanceToNow(rti.filedDate),
    metadata: `${daysBetween(rti.filedDate)} days old`,
    icon: <FileText size={20} />,
    badge: <Badge variant={rti.status} showIcon>{rti.status.toUpperCase()}</Badge>
  }))

  return (
    <Card variant="default" padding="md">
      <CardHeader>
        <CardTitle>📡 Latest RTI Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="body-text-small" style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-tertiary)' }}>
          What changed in the last 7 days
        </p>
        <Timeline items={timelineItems} />
      </CardContent>
    </Card>
  )
}
