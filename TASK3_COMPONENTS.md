# Task 3: Impact Stories and Pending Cases Components

## Overview
This document describes the components implemented for Task 3 of the RTI Dashboard Redesign, which includes "Stories That Changed Something" and "Citizens Still Waiting" sections.

## Architecture
All components follow the Atomic Design pattern and use TypeScript with proper type safety.

### Component Hierarchy

```
Organisms:
├── StoriesThatChanged
│   ├── Molecules: WinCard
│   │   ├── Atoms: TopicTile
│   │   └── Atoms: ImpactMetric
│   └── Atoms: FilterPill
│
└── CitizensWaiting
    ├── Molecules: CaseCard
    │   └── Atoms: WhyItMatters
    └── Atoms: ChipStrip
```

## Components

### Atoms

#### TopicTile
- **Purpose:** Colored tile with icon representing topic category
- **Props:** `icon: string, color: string, label: string`
- **File:** `src/components/features/landing/atoms/TopicTile.tsx`
- **Styling:** Fixed 48x48px size with rounded corners

#### ImpactMetric
- **Purpose:** Icon + metric pair displaying impact data
- **Props:** `icon: string, value: string, label: string`
- **File:** `src/components/features/landing/atoms/ImpactMetric.tsx`
- **Features:** Bold value with uppercase label

#### FilterPill
- **Purpose:** Reusable filter/chip component for category selection
- **Props:** `label: string, active?: boolean, onClick?: () => void`
- **File:** `src/components/features/landing/atoms/FilterPill.tsx`
- **Features:** Active/inactive states, hover effects

#### WhyItMatters
- **Purpose:** Component displaying bullet points explaining case importance
- **Props:** `reasons: string[]`
- **File:** `src/components/features/landing/atoms/WhyItMatters.tsx`
- **Styling:** Yellow background with left border accent

#### ChipStrip
- **Purpose:** Scrollable horizontal chips container for topic summaries
- **Props:** `chips: string[]`
- **File:** `src/components/features/landing/atoms/ChipStrip.tsx`
- **Features:** Horizontal scrolling with custom scrollbar styling

### Molecules

#### WinCard
- **Purpose:** Individual win story card with topic tile and impact strip
- **Props:** `story: WinStory`
- **File:** `src/components/features/landing/molecules/WinCard.tsx`
- **Features:**
  - Topic tile header with metadata
  - Outcome-focused title
  - LLM-generated hook line
  - Impact metrics strip
  - Hover effects (lift + border color change)
  - Responsive padding

#### CaseCard
- **Purpose:** Pending case card with status borders and urgency indicators
- **Props:** `pendingCase: PendingCase`
- **File:** `src/components/features/landing/molecules/CaseCard.tsx`
- **Features:**
  - Color-coded status badge
  - Overdue/elapsed day indicator
  - "Why it matters" section
  - Department and location footer
  - Status-specific border colors
  - Hover effects

### Organisms

#### StoriesThatChanged
- **Purpose:** Impact stories section with 2x3 grid
- **Props:** `stories: WinStory[]`
- **File:** `src/components/features/landing/organisms/StoriesThatChanged.tsx`
- **Features:**
  - Dark background (#0B1220)
  - Filter pills for win categories
  - 2x3 grid on desktop
  - Client-side filtering
  - Responsive grid (3 cols → 2 cols → 1 col)

#### CitizensWaiting
- **Purpose:** Pending cases section with warm tone background
- **Props:** `cases: PendingCase[], topicSummaries?: string[]`
- **File:** `src/components/features/landing/organisms/CitizensWaiting.tsx`
- **Features:**
  - Warm gradient background
  - Statistics header showing critical case count
  - 2x3 grid on desktop
  - Scrollable topic chips at bottom
  - Responsive grid (3 cols → 2 cols → 1 col)

## Type Definitions

### WinStory
```typescript
interface WinStory {
  id: string
  title: string
  hookLine: string
  topic: string
  topicColor: string
  topicIcon: string
  winType: WinType
  impactMetrics: ImpactMetric[]
  department: string
  state: string
  date: string
  link: string
}

type WinType = 'data_released' | 'money_sanctioned' | 'services_fixed' | 'policy_changed'
```

### PendingCase
```typescript
interface PendingCase {
  id: string
  title: string
  question: string
  whyItMatters: string[]
  status: 'pending' | 'first_appeal' | 'second_appeal'
  daysElapsed: number
  daysOverdue: number
  department: string
  state: string
  link: string
}
```

## Design Tokens Used

### Colors
- Background: `--bg-page-alt-redesign` (#0B1220 for dark section)
- Card background: `--bg-card-redesign` (#FFFFFF)
- Text on dark: `--color-text-on-dark-primary`, `--color-text-on-dark-secondary`
- Status colors: `--color-status-answered`, `--color-status-pending`, `--color-status-overdue`
- Accent: `--color-accent` (#0EA5E9)

### Typography
- Section titles: `--font-size-3xl` (28px), `--font-family-heading-redesign` (DM Serif Display)
- Card titles: `--font-size-xl` (20px)
- Body text: `--font-size-base` (16px)

### Spacing
- Section padding: `--spacing-section` (48px)
- Card padding: `--spacing-card` (20px desktop), `--spacing-card-mobile` (16px mobile)
- Grid gap: `--spacing-lg` (24px)

### Shadows
- Card shadow: `--shadow-card-redesign`
- Hover shadow: `--shadow-card-redesign-hover`

## Mock Data
Mock data is available in `src/data/mockData/task3Data.ts`:
- `mockWinStories`: 6 win story examples
- `mockPendingCases`: 6 pending case examples
- `mockTopicSummaries`: Array of topic summary strings

## Usage Example

```typescript
import { StoriesThatChanged } from './organisms/StoriesThatChanged'
import { CitizensWaiting } from './organisms/CitizensWaiting'
import { mockWinStories, mockPendingCases, mockTopicSummaries } from '@/data/mockData/task3Data'

export function MyPage() {
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
```

## Responsive Breakpoints

### Desktop (> 1024px)
- 3-column grid for cards
- Full horizontal layout for filters

### Tablet (768px - 1024px)
- 2-column grid for cards
- Wrapped filter pills

### Mobile (< 768px)
- Single column layout
- Reduced font sizes
- Reduced padding
- Stacked status rows in CaseCard

## Accessibility

- All interactive elements have proper ARIA labels
- Semantic HTML structure
- Keyboard navigation support
- Color contrast compliance
- Focus states on interactive elements

## Files Created

### Atoms (5 components)
1. `src/components/features/landing/atoms/TopicTile.tsx`
2. `src/components/features/landing/atoms/TopicTile.module.css`
3. `src/components/features/landing/atoms/ImpactMetric.tsx`
4. `src/components/features/landing/atoms/ImpactMetric.module.css`
5. `src/components/features/landing/atoms/FilterPill.tsx`
6. `src/components/features/landing/atoms/FilterPill.module.css`
7. `src/components/features/landing/atoms/WhyItMatters.tsx`
8. `src/components/features/landing/atoms/WhyItMatters.module.css`
9. `src/components/features/landing/atoms/ChipStrip.tsx`
10. `src/components/features/landing/atoms/ChipStrip.module.css`

### Molecules (2 components)
1. `src/components/features/landing/molecules/WinCard.tsx`
2. `src/components/features/landing/molecules/WinCard.module.css`
3. `src/components/features/landing/molecules/CaseCard.tsx`
4. `src/components/features/landing/molecules/CaseCard.module.css`

### Organisms (2 components)
1. `src/components/features/landing/organisms/StoriesThatChanged.tsx`
2. `src/components/features/landing/organisms/StoriesThatChanged.module.css`
3. `src/components/features/landing/organisms/CitizensWaiting.tsx`
4. `src/components/features/landing/organisms/CitizensWaiting.module.css`

### Types
- `src/types/dashboard.ts` - Added WinStory, PendingCase, WinType, ImpactMetric types

### Mock Data
- `src/data/mockData/task3Data.ts` - Mock data for testing

### Examples
- `src/components/features/landing/examples/Task3Example.tsx` - Integration example

## Testing
Tests need to be generated (marked as TODO in implementation plan).

## Next Steps
1. Generate tests for all components
2. Integrate components into main RTIDashboardPage
3. Connect to real data sources instead of mock data
4. Add loading states for async data fetching
5. Add error boundaries for graceful error handling
