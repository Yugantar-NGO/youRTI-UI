/**
 * Task 3 Example Usage
 *
 * This file demonstrates how to integrate the Impact Stories and Pending Cases sections
 * into the RTIDashboardPage component.
 *
 * To integrate these sections into the main page, add them to RTIDashboardPage.tsx:
 *
 * import { StoriesThatChanged } from './organisms/StoriesThatChanged'
 * import { CitizensWaiting } from './organisms/CitizensWaiting'
 * import { mockWinStories, mockPendingCases, mockTopicSummaries } from '@/data/mockData/task3Data'
 *
 * Then in the component:
 *
 * <StoriesThatChanged stories={mockWinStories} />
 * <CitizensWaiting cases={mockPendingCases} topicSummaries={mockTopicSummaries} />
 */

import { StoriesThatChanged } from '../organisms/StoriesThatChanged'
import { CitizensWaiting } from '../organisms/CitizensWaiting'
import { mockWinStories, mockPendingCases, mockTopicSummaries } from '@/data/mockData/task3Data'

export function Task3Example() {
  return (
    <>
      <StoriesThatChanged stories={mockWinStories} />
      <CitizensWaiting
        cases={mockPendingCases}
        topicSummaries={mockTopicSummaries}
      />
    </>
  )
}
