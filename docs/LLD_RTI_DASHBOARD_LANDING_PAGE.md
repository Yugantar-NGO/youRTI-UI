# Low-Level Design: RTI Dashboard Landing Page

## Document Version
- **Version**: 1.0
- **Date**: 2025-11-11
- **Project**: youRTI-UI (Next.js 14 + TypeScript)

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Design Principles & Patterns](#2-design-principles--patterns)
3. [Component Architecture](#3-component-architecture)
4. [Data Models & TypeScript Interfaces](#4-data-models--typescript-interfaces)
5. [Component Hierarchy](#5-component-hierarchy)
6. [File Structure](#6-file-structure)
7. [Component Specifications](#7-component-specifications)
8. [Design Patterns Applied](#8-design-patterns-applied)
9. [Theme Integration](#9-theme-integration)
10. [Data Flow Architecture](#10-data-flow-architecture)
11. [Implementation Plan](#11-implementation-plan)
12. [Testing Strategy](#12-testing-strategy)

---

## 1. Executive Summary

### Purpose
Design and implement a comprehensive RTI Dashboard Landing Page that displays story-first content, key metrics, department performance, and insights in a newspaper-style layout.

### Scope
Create a modular, maintainable component system following SOLID principles and React best practices, integrating seamlessly with the existing theme system and design tokens.

### Key Design Decisions
1. **Composition over Inheritance**: Use component composition for flexibility
2. **Presentational/Container Split**: Separate data logic from presentation
3. **Single Responsibility**: Each component has one clear purpose
4. **Theme-Agnostic**: All components use semantic design tokens
5. **Type-Safe**: Strong TypeScript interfaces throughout

---

## 2. Design Principles & Patterns

### SOLID Principles Application

#### Single Responsibility Principle (SRP)
- Each component handles one specific UI concern
- Data fetching separated from presentation
- Business logic isolated in repository/service layer

#### Open/Closed Principle (OCP)
- Components extensible through props and composition
- Variants handled via prop configurations
- New features added without modifying existing code

#### Liskov Substitution Principle (LSP)
- All card variants are interchangeable
- Badge components can substitute each other
- Layout components follow consistent interfaces

#### Interface Segregation Principle (ISP)
- Small, focused component interfaces
- Optional props for additional features
- No component forced to depend on unused props

#### Dependency Inversion Principle (DIP)
- Components depend on TypeScript interfaces, not concrete implementations
- Theme system uses abstract design tokens
- Data layer abstracted behind repository pattern

### Design Patterns Used

#### 1. Composite Pattern
- **Where**: NewspaperLayout, Card components, Section wrappers
- **Why**: Build complex UI from simple, reusable components
- **Example**:
  ```tsx
  <NewspaperLayout>
    <LeftColumn>...</LeftColumn>
    <CenterColumn>...</CenterColumn>
  </NewspaperLayout>
  ```

#### 2. Strategy Pattern
- **Where**: Card variants, Badge variants, Layout strategies
- **Why**: Different rendering strategies without code duplication
- **Example**: `<Card variant="elevated" />` vs `<Card variant="flat" />`

#### 3. Observer Pattern (React Context)
- **Where**: EditionContext for filter state
- **Why**: Notify multiple components of state changes
- **Example**: `useEditionFilter()` hook

#### 4. Repository Pattern
- **Where**: Data access layer (DashboardDataRepository)
- **Why**: Abstract data sources, enable filtering/caching
- **Benefit**: Easy to mock, test, and swap data sources

#### 5. Facade Pattern
- **Where**: Complex section components (DailyEditionSection)
- **Why**: Simplify complex subsystem interactions
- **Example**: DailyEditionSection coordinates multiple story components

#### 6. Factory Method Pattern
- **Where**: Status icon mapping, badge creation
- **Why**: Create objects based on runtime conditions
- **Example**: `getStatusIcon(status)` returns appropriate icon

---

## 3. Component Architecture

### Component Classification

#### 1. Primitive Components (Atoms)
Already exist, will reuse:
- `Typography` - Text rendering with variants
- `Icon` - Icon wrapper for lucide-react
- `Badge` - Status indicators
- `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` - Container primitives

#### 2. Composite Components (Molecules)
Mix of existing and new:
- **Existing**: `StatCard`, `DataTable`, `TrendIndicator`
- **New**:
  - `StoryCard` - Impact story display
  - `MetricCard` - Key metrics display
  - `InsightCard` - Insight/trend item
  - `QuestionListItem` - RTI question item
  - `ActivityItem` - Timeline activity item
  - `TopicCard` - Browse by topic card
  - `NavigationCard` - Hero navigation item
  - `ProgressBar` - Department performance visualization

#### 3. Feature Components (Organisms)
New components needed:
- `DailyEditionHeader` - Edition header with date
- `ImpactStory` - Lead impact story card
- `SecondaryStories` - Grid of secondary stories
- `FreshAnswers` - Recent RTI answers list
- `UnansweredQuestions` - Important pending RTIs
- `RecentQuestions` - What people are asking
- `HeroBannerSection` - Enhanced hero with navigation
- `KeyMetricsSection` - 3-column metrics grid
- `DepartmentPerformance` - Performance overview with chart
- `DepartmentLeaderboard` - Ranking table
- `InsightsTrends` - Insights column
- `BrowseByTopic` - Topic grid
- `ActivityFeed` - Activity timeline
- `TransparencySpotlight` - Featured story card
- `FooterSection` - Footer with links

#### 4. Section Components (Templates)
High-level layout coordinators:
- `DailyEditionSection` - Entire story-first section
- `HeroSection` - Hero banner section
- `MainContentSection` - Main metrics and content area
- `RTIDashboardPage` - Top-level page component

---

## 4. Data Models & TypeScript Interfaces

### New Type Definitions

```typescript
// File: src/types/dashboard.ts

/**
 * RTI Impact Story
 * Represents a story about RTI impact with metadata
 */
export interface RTIStory {
  id: string
  title: string
  summary: string
  topic: string
  state: string
  district?: string
  department: string
  filedDate: string
  answeredDate: string
  viewLink: string
  isLeadStory?: boolean
}

/**
 * RTI Answer
 * Recently responded RTI with summary
 */
export interface RTIAnswer {
  id: string
  question: string
  answerSummary: string
  department: string
  state: string
  filedDate: string
  answeredDate: string
  viewLink: string
}

/**
 * Unanswered RTI
 * Important pending RTI with overdue details
 */
export interface UnansweredRTI {
  id: string
  question: string
  whyMatters: string
  status: 'pending' | 'first_appeal' | 'second_appeal'
  daysElapsed: number
  daysOverdue: number
  department: string
  state: string
  trackLink: string
}

/**
 * Recent RTI Question
 * Newly filed RTI question
 */
export interface RecentQuestion {
  id: string
  question: string
  topic: string
  department: string
  filedDate: string
  status: 'filed' | 'pending' | 'answered'
}

/**
 * Key Metric
 * Dashboard metric with icon and trend
 */
export interface KeyMetric {
  id: string
  icon: string
  title: string
  value: string | number
  subtitle: string
  trend?: {
    value: number
    direction: 'up' | 'down' | 'neutral'
  }
}

/**
 * Department Performance Data
 */
export interface DepartmentPerformance {
  department: string
  fulfillmentRate: number // percentage
  avgResponseDays: number
  transferRate: number // percentage
  totalRTIs: number
}

/**
 * Insight/Trend Item
 */
export interface InsightItem {
  id: string
  icon: string
  text: string
  category?: 'trend' | 'insight' | 'fact'
}

/**
 * Topic Hub
 */
export interface TopicHub {
  id: string
  name: string
  icon: string
  rtiCount: number
  link: string
}

/**
 * Activity Feed Item
 */
export interface ActivityItem {
  id: string
  type: 'answered' | 'pending' | 'filed' | 'denied' | 'appealed'
  title: string
  department: string
  date: string
  link: string
}

/**
 * Transparency Spotlight Story
 */
export interface SpotlightStory {
  id: string
  title: string
  description: string
  impact: string[]
  rtiNumber: string
  date: string
  viewLink: string
}

/**
 * Hero Navigation Item
 */
export interface NavigationItem {
  id: string
  icon: string
  label: string
  link: string
  description?: string
}

/**
 * India at a Glance Stats
 */
export interface IndiaGlanceStats {
  answeredInTime: {
    percentage: number
    label: string
  }
  answeredLate: {
    percentage: number
    label: string
  }
  inAppeal: {
    percentage: number
    label: string
  }
}

/**
 * Daily Edition Data
 * Complete data structure for the daily edition section
 */
export interface DailyEditionData {
  editionDate: string
  leadStory: RTIStory
  secondaryStories: RTIStory[]
  freshAnswers: RTIAnswer[]
  unansweredQuestions: UnansweredRTI[]
  recentQuestions: RecentQuestion[]
}

/**
 * Hero Section Data
 */
export interface HeroSectionData {
  title: string
  subtitle: string
  tagline: string
  navigationItems: NavigationItem[]
  stats: {
    rtisFiled: number
    responsesReceived: number
    pending: number
  }
  indiaGlance: IndiaGlanceStats
}

/**
 * Main Content Data
 */
export interface MainContentData {
  keyMetrics: KeyMetric[]
  departmentPerformance: {
    summary: {
      highestFulfillment: string
      slowestResponses: string
      mostAppeals: string
    }
    chartData: DepartmentPerformance[]
  }
  departmentLeaderboard: DepartmentPerformance[]
  insights: InsightItem[]
  topics: TopicHub[]
  activityFeed: ActivityItem[]
  spotlight: SpotlightStory
}

/**
 * Complete Landing Page Data
 */
export interface LandingPageData {
  dailyEdition: DailyEditionData
  hero: HeroSectionData
  mainContent: MainContentData
}

/**
 * Edition Filter State
 */
export interface EditionFilter {
  level: EditionLevel
  state?: string
  district?: string
}

export type EditionLevel = 'national' | 'state' | 'district'

/**
 * Dashboard Stats
 */
export interface DashboardStats {
  totalFiledThisYear: number
  responsesWithin30Days: number
  responseRate: number
  avgResponseDays: number
  pending: number
  oldestPendingDays: number
}
```

### Extended Existing Types

```typescript
// File: src/types/index.ts (additions)

// RTI Status extended
export type RTIStatus =
  | 'disclosed'
  | 'rejected'
  | 'pending'
  | 'partial'
  | 'filed'
  | 'appealed'
  | 'answered'

// Badge variants extended
export type BadgeVariant =
  | 'disclosed'
  | 'rejected'
  | 'pending'
  | 'partial'
  | 'default'
  | 'filed'
  | 'answered'
  | 'appealed'
```

---

## 5. Component Hierarchy

### Page Structure
```
RTIDashboardPage
├── DailyEditionSection
│   ├── DailyEditionHeader
│   ├── ImpactStory (Lead)
│   ├── SecondaryStories
│   │   └── StoryCard (×3)
│   ├── FreshAnswers
│   │   └── AnswerListItem (×multiple)
│   ├── UnansweredQuestions
│   │   └── UnansweredListItem (×multiple)
│   └── RecentQuestions
│       └── QuestionListItem (×multiple)
│
├── HeroSection
│   ├── HeroTitle
│   ├── NavigationBar
│   │   └── NavigationCard (×6)
│   ├── StatsGrid
│   │   └── StatCard (×3) [REUSE]
│   └── IndiaGlanceCard
│
├── MainContentSection
│   ├── KeyMetricsSection
│   │   └── MetricCard (×3)
│   │
│   ├── DepartmentPerformance
│   │   ├── PerformanceSummary
│   │   └── PerformanceChart (recharts BarChart)
│   │
│   ├── DepartmentLeaderboard
│   │   └── DataTable [REUSE]
│   │
│   ├── TwoColumnLayout
│   │   ├── InsightsTrends
│   │   │   └── InsightCard (×multiple)
│   │   └── BrowseByTopic
│   │       └── TopicCard (×multiple)
│   │
│   └── ActivitySpotlightLayout
│       ├── ActivityFeed (2/3 width)
│       │   └── ActivityItem (×multiple)
│       └── TransparencySpotlight (1/3 width)
│
└── FooterSection
    ├── FooterLinks
    └── FooterText
```

---

## 6. File Structure

### Directory Organization
```
src/
├── types/
│   ├── index.ts (existing, extend)
│   └── dashboard.ts (NEW - dashboard-specific types)
│
├── components/
│   ├── ui/ (existing - reuse)
│   │   ├── Typography.tsx
│   │   ├── Icon.tsx
│   │   ├── Badge.tsx
│   │   └── Card.tsx
│   │
│   ├── data/ (existing - reuse)
│   │   ├── StatCard.tsx
│   │   ├── DataTable.tsx
│   │   └── TrendIndicator.tsx
│   │
│   ├── layout/ (existing - extend)
│   │   ├── Container.tsx
│   │   ├── Grid.tsx
│   │   ├── NewspaperLayout.tsx
│   │   ├── TwoColumnLayout.tsx (NEW)
│   │   └── FullWidthSection.tsx (NEW)
│   │
│   └── features/
│       └── landing/
│           ├── atoms/ (NEW)
│           │   ├── StoryCard.tsx
│           │   ├── StoryCard.module.css
│           │   ├── MetricCard.tsx
│           │   ├── MetricCard.module.css
│           │   ├── InsightCard.tsx
│           │   ├── InsightCard.module.css
│           │   ├── QuestionListItem.tsx
│           │   ├── QuestionListItem.module.css
│           │   ├── AnswerListItem.tsx
│           │   ├── AnswerListItem.module.css
│           │   ├── UnansweredListItem.tsx
│           │   ├── UnansweredListItem.module.css
│           │   ├── ActivityItem.tsx
│           │   ├── ActivityItem.module.css
│           │   ├── TopicCard.tsx
│           │   ├── TopicCard.module.css
│           │   ├── NavigationCard.tsx
│           │   ├── NavigationCard.module.css
│           │   ├── ProgressBar.tsx
│           │   └── ProgressBar.module.css
│           │
│           ├── molecules/ (NEW)
│           │   ├── DailyEditionHeader.tsx
│           │   ├── DailyEditionHeader.module.css
│           │   ├── ImpactStory.tsx
│           │   ├── ImpactStory.module.css
│           │   ├── SecondaryStories.tsx
│           │   ├── SecondaryStories.module.css
│           │   ├── FreshAnswers.tsx
│           │   ├── FreshAnswers.module.css
│           │   ├── UnansweredQuestions.tsx
│           │   ├── UnansweredQuestions.module.css
│           │   ├── RecentQuestions.tsx
│           │   ├── RecentQuestions.module.css
│           │   ├── NavigationBar.tsx
│           │   ├── NavigationBar.module.css
│           │   ├── IndiaGlanceCard.tsx
│           │   ├── IndiaGlanceCard.module.css
│           │   ├── KeyMetricsSection.tsx
│           │   ├── KeyMetricsSection.module.css
│           │   ├── DepartmentPerformance.tsx
│           │   ├── DepartmentPerformance.module.css
│           │   ├── DepartmentLeaderboard.tsx
│           │   ├── DepartmentLeaderboard.module.css
│           │   ├── InsightsTrends.tsx
│           │   ├── InsightsTrends.module.css
│           │   ├── BrowseByTopic.tsx
│           │   ├── BrowseByTopic.module.css
│           │   ├── ActivityFeed.tsx
│           │   ├── ActivityFeed.module.css
│           │   ├── TransparencySpotlight.tsx
│           │   └── TransparencySpotlight.module.css
│           │
│           ├── organisms/ (NEW)
│           │   ├── DailyEditionSection.tsx
│           │   ├── DailyEditionSection.module.css
│           │   ├── HeroSection.tsx
│           │   ├── HeroSection.module.css
│           │   ├── MainContentSection.tsx
│           │   ├── MainContentSection.module.css
│           │   └── FooterSection.tsx
│           │   └── FooterSection.module.css
│           │
│           └── RTIDashboardPage.tsx (NEW - main page component)
│               └── RTIDashboardPage.module.css
│
├── services/
│   └── repositories/
│       ├── DashboardDataRepository.ts (existing)
│       └── LandingPageRepository.ts (NEW - data access for landing page)
│
├── lib/
│   ├── utils.ts (existing - extend with helpers)
│   └── icons.ts (existing)
│
└── app/
    └── page.tsx (UPDATE - use new RTIDashboardPage component)
```

---

## 7. Component Specifications

### 7.1 Atom Components

#### StoryCard
**Purpose**: Display impact story with metadata

**Props Interface**:
```typescript
interface StoryCardProps {
  story: RTIStory
  variant?: 'lead' | 'secondary'
  className?: string
}
```

**Responsibilities**:
- Render story title, summary, metadata
- Display topic, state, dates as badges/metadata
- Provide view link
- Adapt layout based on variant

**Dependencies**:
- `Card` (ui)
- `Badge` (ui)
- `Typography` (ui)

**Key Method**: Renders static story data, no business logic

---

#### MetricCard
**Purpose**: Display key metric with icon and optional trend

**Props Interface**:
```typescript
interface MetricCardProps {
  metric: KeyMetric
  className?: string
}
```

**Responsibilities**:
- Show icon, title, value
- Display subtitle/description
- Show trend indicator if available

**Dependencies**:
- `Card` (ui)
- `Icon` (ui)
- `TrendIndicator` (data)

---

#### InsightCard
**Purpose**: Display insight/trend item with icon

**Props Interface**:
```typescript
interface InsightCardProps {
  insight: InsightItem
  className?: string
}
```

**Responsibilities**:
- Render icon + text
- Apply styling for insight type

**Dependencies**:
- Minimal - just CSS + Icon

---

#### QuestionListItem
**Purpose**: Display recent RTI question in list

**Props Interface**:
```typescript
interface QuestionListItemProps {
  question: RecentQuestion
  className?: string
}
```

**Responsibilities**:
- Show question text
- Display metadata (dept, date, status)
- Status badge

**Dependencies**:
- `Badge` (ui)
- `Typography` (ui)

---

#### AnswerListItem
**Purpose**: Display RTI answer in fresh answers list

**Props Interface**:
```typescript
interface AnswerListItemProps {
  answer: RTIAnswer
  className?: string
}
```

**Responsibilities**:
- Show question + answer summary
- Metadata (dept, state, dates)
- View link

**Dependencies**:
- `Typography` (ui)

---

#### UnansweredListItem
**Purpose**: Display important unanswered RTI

**Props Interface**:
```typescript
interface UnansweredListItemProps {
  unanswered: UnansweredRTI
  className?: string
}
```

**Responsibilities**:
- Show question + why it matters
- Status with days elapsed/overdue
- Track link
- Warning styling for overdue

**Dependencies**:
- `Badge` (ui)
- `Typography` (ui)

---

#### ActivityItem
**Purpose**: Display activity timeline item

**Props Interface**:
```typescript
interface ActivityItemProps {
  activity: ActivityItem
  showIcon?: boolean
  className?: string
}
```

**Responsibilities**:
- Status icon
- Title + department
- Date
- Link

**Dependencies**:
- `Icon` (ui)
- `Badge` (ui)

---

#### TopicCard
**Purpose**: Display topic hub with count

**Props Interface**:
```typescript
interface TopicCardProps {
  topic: TopicHub
  interactive?: boolean
  className?: string
}
```

**Responsibilities**:
- Icon + topic name
- RTI count
- Clickable card

**Dependencies**:
- `Card` (ui)

---

#### NavigationCard
**Purpose**: Hero navigation item

**Props Interface**:
```typescript
interface NavigationCardProps {
  item: NavigationItem
  className?: string
}
```

**Responsibilities**:
- Icon + label
- Hover effects
- Link

**Dependencies**:
- Minimal - just CSS

---

#### ProgressBar
**Purpose**: Visual progress/percentage bar

**Props Interface**:
```typescript
interface ProgressBarProps {
  percentage: number
  label?: string
  color?: 'success' | 'warning' | 'error' | 'neutral'
  showLabel?: boolean
  className?: string
}
```

**Responsibilities**:
- Render horizontal bar
- Color based on threshold or prop
- Optional label

**Dependencies**:
- CSS only

---

### 7.2 Molecule Components

#### DailyEditionHeader
**Purpose**: Section header with edition date

**Props Interface**:
```typescript
interface DailyEditionHeaderProps {
  editionDate: string
  className?: string
}
```

**Responsibilities**:
- Display title, tagline, edition date
- Styling with background

**Dependencies**:
- `Typography` (ui)
- `Card` (ui)

---

#### ImpactStory
**Purpose**: Lead impact story card (large, prominent)

**Props Interface**:
```typescript
interface ImpactStoryProps {
  story: RTIStory
  className?: string
}
```

**Responsibilities**:
- Render lead story with emphasis
- Large title, full summary
- Prominent metadata
- View link

**Dependencies**:
- `StoryCard` (atom)
- `Card` (ui)

---

#### SecondaryStories
**Purpose**: Grid of 2-3 secondary stories

**Props Interface**:
```typescript
interface SecondaryStoriesProps {
  stories: RTIStory[]
  className?: string
}
```

**Responsibilities**:
- Layout stories in grid
- Title section
- Map stories to StoryCard

**Dependencies**:
- `StoryCard` (atom)
- `Grid` (layout)

---

#### FreshAnswers
**Purpose**: List of recently answered RTIs

**Props Interface**:
```typescript
interface FreshAnswersProps {
  answers: RTIAnswer[]
  maxDisplay?: number
  className?: string
}
```

**Responsibilities**:
- Section title
- Map answers to list items
- "View all" link

**Dependencies**:
- `AnswerListItem` (atom)
- `Card` (ui)

---

#### UnansweredQuestions
**Purpose**: List of important pending RTIs

**Props Interface**:
```typescript
interface UnansweredQuestionsProps {
  questions: UnansweredRTI[]
  maxDisplay?: number
  className?: string
}
```

**Responsibilities**:
- Section title
- Map to list items
- Highlight overdue items

**Dependencies**:
- `UnansweredListItem` (atom)
- `Card` (ui)

---

#### RecentQuestions
**Purpose**: What people are asking section

**Props Interface**:
```typescript
interface RecentQuestionsProps {
  questions: RecentQuestion[]
  maxDisplay?: number
  className?: string
}
```

**Responsibilities**:
- Section title
- Map to list items
- Browse all link

**Dependencies**:
- `QuestionListItem` (atom)
- `Card` (ui)

---

#### NavigationBar
**Purpose**: Hero navigation with 6 items

**Props Interface**:
```typescript
interface NavigationBarProps {
  items: NavigationItem[]
  className?: string
}
```

**Responsibilities**:
- Layout nav items in row
- Responsive wrapping
- Map to NavigationCard

**Dependencies**:
- `NavigationCard` (atom)

---

#### IndiaGlanceCard
**Purpose**: India at a glance stats card

**Props Interface**:
```typescript
interface IndiaGlanceCardProps {
  stats: IndiaGlanceStats
  className?: string
}
```

**Responsibilities**:
- Display 3-column stat breakdown
- Percentages with labels

**Dependencies**:
- `Card` (ui)

---

#### KeyMetricsSection
**Purpose**: 3-column grid of key metrics

**Props Interface**:
```typescript
interface KeyMetricsSectionProps {
  metrics: KeyMetric[]
  className?: string
}
```

**Responsibilities**:
- Section title
- Grid layout (3 columns)
- Map to MetricCard

**Dependencies**:
- `MetricCard` (atom)
- `Grid` (layout)

---

#### DepartmentPerformance
**Purpose**: Performance overview with bar chart

**Props Interface**:
```typescript
interface DepartmentPerformanceProps {
  summary: {
    highestFulfillment: string
    slowestResponses: string
    mostAppeals: string
  }
  chartData: DepartmentPerformance[]
  className?: string
}
```

**Responsibilities**:
- Display summary bullets
- Render horizontal bar chart (recharts)
- "View full leaderboard" link

**Dependencies**:
- `Card` (ui)
- `recharts` (BarChart)

---

#### DepartmentLeaderboard
**Purpose**: Table with department rankings

**Props Interface**:
```typescript
interface DepartmentLeaderboardProps {
  departments: DepartmentPerformance[]
  className?: string
}
```

**Responsibilities**:
- Section title
- Render table with rankings
- Color-coded cells
- Medal icons (🥇🥈🥉)

**Dependencies**:
- `DataTable` (data)
- `Card` (ui)

---

#### InsightsTrends
**Purpose**: Left column - insights list

**Props Interface**:
```typescript
interface InsightsTrendsProps {
  insights: InsightItem[]
  className?: string
}
```

**Responsibilities**:
- Section title
- Map to InsightCard

**Dependencies**:
- `InsightCard` (atom)
- `Card` (ui)

---

#### BrowseByTopic
**Purpose**: Right column - topic grid

**Props Interface**:
```typescript
interface BrowseByTopicProps {
  topics: TopicHub[]
  className?: string
}
```

**Responsibilities**:
- Section title
- 2×2 grid of topics
- "View all topics" link

**Dependencies**:
- `TopicCard` (atom)
- `Card` (ui)

---

#### ActivityFeed
**Purpose**: Recent activity timeline (2/3 width)

**Props Interface**:
```typescript
interface ActivityFeedProps {
  activities: ActivityItem[]
  maxDisplay?: number
  className?: string
}
```

**Responsibilities**:
- Section title
- Timeline layout
- Map to ActivityItem

**Dependencies**:
- `ActivityItem` (atom)
- `Card` (ui)

---

#### TransparencySpotlight
**Purpose**: Featured story card (1/3 width)

**Props Interface**:
```typescript
interface TransparencySpotlightProps {
  story: SpotlightStory
  className?: string
}
```

**Responsibilities**:
- Display spotlight story with gradient bg
- Title, description, impact bullets
- RTI number, date, link

**Dependencies**:
- `Card` (ui)

---

### 7.3 Organism Components

#### DailyEditionSection
**Purpose**: Entire story-first section (section 1)

**Props Interface**:
```typescript
interface DailyEditionSectionProps {
  data: DailyEditionData
  className?: string
}
```

**Responsibilities**:
- Coordinate all daily edition subsections
- Layout header, stories, answers, questions
- Section wrapper

**Dependencies**:
- All daily edition molecules

**Key Method**: Orchestrates layout, passes data to children

---

#### HeroSection
**Purpose**: Hero banner with nav and stats

**Props Interface**:
```typescript
interface HeroSectionProps {
  data: HeroSectionData
  className?: string
}
```

**Responsibilities**:
- Gradient background
- Title, subtitle, tagline
- Navigation bar
- Stats grid
- India at glance card

**Dependencies**:
- `NavigationBar`
- `StatCard` (existing)
- `IndiaGlanceCard`

---

#### MainContentSection
**Purpose**: Main content area (section 3)

**Props Interface**:
```typescript
interface MainContentSectionProps {
  data: MainContentData
  className?: string
}
```

**Responsibilities**:
- Coordinate all main content subsections
- Layout metrics, performance, leaderboard, insights, activity
- Section wrapper

**Dependencies**:
- All main content molecules

**Key Method**: Orchestrates complex layout

---

#### FooterSection
**Purpose**: Footer with links and text

**Props Interface**:
```typescript
interface FooterSectionProps {
  className?: string
}
```

**Responsibilities**:
- Footer links
- Footer text
- Border-top styling

**Dependencies**:
- `Typography` (ui)

---

### 7.4 Page Component

#### RTIDashboardPage
**Purpose**: Top-level page component

**Props Interface**:
```typescript
// Server Component - fetches data
// No props (Next.js page)
```

**Responsibilities**:
- Fetch landing page data (or use mock)
- Pass data to sections
- Layout all major sections
- Max-width container

**Dependencies**:
- `DailyEditionSection`
- `HeroSection`
- `MainContentSection`
- `FooterSection`
- `LandingPageRepository` (data)

**Data Flow**:
```typescript
async function RTIDashboardPage() {
  const data = await LandingPageRepository.getLandingPageData()

  return (
    <div>
      <DailyEditionSection data={data.dailyEdition} />
      <HeroSection data={data.hero} />
      <MainContentSection data={data.mainContent} />
      <FooterSection />
    </div>
  )
}
```

---

## 8. Design Patterns Applied

### 8.1 Composition Pattern

**Problem**: Complex UI with many variations
**Solution**: Compose small, reusable components

**Example**:
```tsx
// Instead of monolithic component
<DailyEdition />

// Compose from smaller parts
<DailyEditionSection>
  <DailyEditionHeader />
  <ImpactStory />
  <SecondaryStories />
  <FreshAnswers />
  <UnansweredQuestions />
  <RecentQuestions />
</DailyEditionSection>
```

**Benefits**:
- Easy to test individual components
- Reusable pieces
- Clear separation of concerns
- Easy to modify layout

---

### 8.2 Presentational/Container Pattern

**Problem**: Mixing data fetching with UI rendering
**Solution**: Separate data (Container) from presentation (Presentational)

**Container Components** (Data Logic):
- `RTIDashboardPage` - Fetches data, passes to sections
- `LandingPageRepository` - Data access layer

**Presentational Components** (UI Only):
- All atoms, molecules, organisms
- Receive data via props
- No direct data fetching
- Pure functions of props

**Benefits**:
- Easier testing (mock props vs API)
- Reusable presentational components
- Clear data flow
- Server/Client boundary control

---

### 8.3 Repository Pattern

**Problem**: Hardcoded data sources, difficult to test/mock
**Solution**: Abstract data access behind repository interface

**Implementation**:
```typescript
// src/services/repositories/LandingPageRepository.ts
export class LandingPageRepository {
  static async getLandingPageData(): Promise<LandingPageData> {
    // In future: fetch from API
    // For now: return mock data
    return {
      dailyEdition: {...},
      hero: {...},
      mainContent: {...}
    }
  }

  static async getDailyEdition(date: string): Promise<DailyEditionData> {
    // Fetch specific date
  }

  static applyEditionFilter(filter: EditionFilter) {
    // Return filtered repository
    return new FilteredLandingPageRepository(filter)
  }
}
```

**Benefits**:
- Easy to swap mock/real data
- Centralized data logic
- Testable without API
- Supports filtering/caching

---

### 8.4 Strategy Pattern (Variants)

**Problem**: Different rendering based on type, but similar structure
**Solution**: Use variant prop to select strategy

**Example**:
```tsx
// StoryCard.tsx
export function StoryCard({ story, variant = 'secondary' }: StoryCardProps) {
  const layoutStrategy = {
    lead: LeadStoryLayout,
    secondary: SecondaryStoryLayout
  }

  const Layout = layoutStrategy[variant]
  return <Layout story={story} />
}
```

**Or simpler**:
```tsx
export function StoryCard({ story, variant = 'secondary' }: StoryCardProps) {
  const classes = [
    styles.storyCard,
    styles[variant]
  ].filter(Boolean).join(' ')

  return <div className={classes}>...</div>
}
```

**Benefits**:
- Avoid if/else chains
- Easy to add new variants
- Open/Closed principle

---

### 8.5 Factory Pattern (Icon Mapping)

**Problem**: Need different icons based on status
**Solution**: Factory function returns appropriate icon

**Example**:
```typescript
// src/lib/utils.ts
export function getStatusIcon(status: RTIStatus): LucideIcon {
  const iconMap: Record<RTIStatus, LucideIcon> = {
    disclosed: CheckCircle2,
    answered: CheckCircle2,
    rejected: XCircle,
    pending: Clock,
    partial: AlertCircle,
    filed: FileText,
    appealed: AlertTriangle
  }
  return iconMap[status] || HelpCircle
}

export function getStatusColor(status: RTIStatus): string {
  const colorMap: Record<RTIStatus, string> = {
    disclosed: 'var(--color-status-success)',
    answered: 'var(--color-status-success)',
    rejected: 'var(--color-status-error)',
    pending: 'var(--color-status-warning)',
    // ...
  }
  return colorMap[status] || 'var(--color-status-neutral)'
}
```

**Usage**:
```tsx
const Icon = getStatusIcon(activity.type)
return (
  <div style={{ color: getStatusColor(activity.type) }}>
    <Icon size={16} />
    {activity.title}
  </div>
)
```

**Benefits**:
- Centralized mapping logic
- Easy to add new statuses
- Consistent icon usage
- Type-safe

---

### 8.6 Observer Pattern (Context)

**Already Implemented**: `EditionContext`

**Integration**:
```tsx
// Sections can observe filter changes
export function DailyEditionSection({ data }: DailyEditionSectionProps) {
  const { filter } = useEditionFilter()

  // Filter data based on edition
  const filteredData = useMemo(() =>
    filterByEdition(data, filter),
    [data, filter]
  )

  return <section>...</section>
}
```

**Benefits**:
- Sections auto-update when filter changes
- Loose coupling
- Centralized state

---

## 9. Theme Integration

### Design Token Usage

All components use semantic tokens from `/src/styles/design-tokens.css`:

```css
/* Component CSS Example */
.storyCard {
  background: var(--color-bg-primary);
  border: var(--border-width-thin) solid var(--color-border-secondary);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-card);
}

.storyCard:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
  transition: var(--transition-base);
}

.title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
}

.metadata {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}
```

### Theme Variants

Themes override tokens:

**Newspaper Theme** (`/src/styles/themes/newspaper.css`):
- Uses Playfair Display for headings
- Strong borders, box shadows
- Black/white contrast

**Modern Theme** (`/src/styles/themes/modern.css`):
- Sans-serif throughout
- Subtle borders, soft shadows
- Blue accents

### No Theme-Specific Code in Components

Components are 100% theme-agnostic. They only reference semantic tokens.

---

## 10. Data Flow Architecture

### Data Flow Diagram

```
┌─────────────────────────────────────────────────┐
│  LandingPageRepository (Data Layer)             │
│  - Mock data (initial)                          │
│  - API integration (future)                     │
│  - Filtering, caching                           │
└─────────────────┬───────────────────────────────┘
                  │
                  │ getLandingPageData()
                  ▼
┌─────────────────────────────────────────────────┐
│  RTIDashboardPage (Server Component)            │
│  - Fetches data                                 │
│  - Passes to sections                           │
└─────────────────┬───────────────────────────────┘
                  │
        ┌─────────┴──────────┬──────────────┐
        │                    │              │
        ▼                    ▼              ▼
┌───────────────┐  ┌────────────────┐  ┌──────────────┐
│ DailyEdition  │  │  HeroSection   │  │ MainContent  │
│ Section       │  │                │  │ Section      │
└───────┬───────┘  └────────┬───────┘  └──────┬───────┘
        │                   │                  │
        │ (props)           │ (props)          │ (props)
        ▼                   ▼                  ▼
   ┌─────────┐         ┌─────────┐       ┌─────────┐
   │Molecules│         │Molecules│       │Molecules│
   └────┬────┘         └────┬────┘       └────┬────┘
        │                   │                  │
        ▼                   ▼                  ▼
   ┌─────────┐         ┌─────────┐       ┌─────────┐
   │  Atoms  │         │  Atoms  │       │  Atoms  │
   └─────────┘         └─────────┘       └─────────┘
```

### State Management

#### 1. Server State (Data)
- Fetched in Server Component (RTIDashboardPage)
- Passed down as props (unidirectional flow)
- No client-side state management needed initially

#### 2. Edition Filter State
- Managed by `EditionContext` (existing)
- Components subscribe via `useEditionFilter()`
- Triggers data re-filtering

#### 3. Local UI State
- Managed in individual components (e.g., collapsed/expanded)
- Use `useState` when needed
- Keep minimal

### Data Fetching Strategy

#### Phase 1 (MVP): Mock Data
```typescript
// LandingPageRepository.ts
export class LandingPageRepository {
  private static mockData: LandingPageData = {...}

  static async getLandingPageData(): Promise<LandingPageData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    return this.mockData
  }
}
```

#### Phase 2: API Integration
```typescript
export class LandingPageRepository {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL

  static async getLandingPageData(): Promise<LandingPageData> {
    const res = await fetch(`${this.baseUrl}/landing-page`)
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
  }

  static async getDailyEdition(date: string): Promise<DailyEditionData> {
    const res = await fetch(`${this.baseUrl}/daily-edition/${date}`)
    return res.json()
  }
}
```

#### Phase 3: Caching & Revalidation
```typescript
// Next.js 14 fetch with caching
static async getLandingPageData(): Promise<LandingPageData> {
  const res = await fetch(`${this.baseUrl}/landing-page`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  return res.json()
}
```

---

## 11. Implementation Plan

### Phase 1: Foundation (Week 1)

#### Day 1-2: Type Definitions & Repository
1. Create `src/types/dashboard.ts` with all interfaces
2. Create `src/services/repositories/LandingPageRepository.ts`
3. Create mock data for all sections
4. Write unit tests for repository

**Deliverable**: Type-safe data layer with mock data

---

#### Day 3-4: Atom Components
Build smallest reusable components:
1. `StoryCard`
2. `MetricCard`
3. `InsightCard`
4. `QuestionListItem`
5. `AnswerListItem`
6. `UnansweredListItem`
7. `ActivityItem`
8. `TopicCard`
9. `NavigationCard`
10. `ProgressBar`

**Order**: Start with simplest (InsightCard, TopicCard), then more complex

**Testing**: Visual regression tests for each atom

**Deliverable**: 10 atom components with CSS modules

---

### Phase 2: Molecule Components (Week 2)

#### Day 5-6: Daily Edition Molecules
1. `DailyEditionHeader`
2. `ImpactStory`
3. `SecondaryStories`
4. `FreshAnswers`
5. `UnansweredQuestions`
6. `RecentQuestions`

**Dependencies**: Use atoms built in Phase 1

**Deliverable**: Daily edition subsections

---

#### Day 7-8: Hero & Main Content Molecules
1. `NavigationBar`
2. `IndiaGlanceCard`
3. `KeyMetricsSection`
4. `DepartmentPerformance`
5. `DepartmentLeaderboard`
6. `InsightsTrends`
7. `BrowseByTopic`
8. `ActivityFeed`
9. `TransparencySpotlight`

**Deliverable**: All molecule components

---

### Phase 3: Organism & Page (Week 3)

#### Day 9-10: Organism Components
1. `DailyEditionSection` - Compose daily edition molecules
2. `HeroSection` - Compose hero molecules
3. `MainContentSection` - Compose main content molecules
4. `FooterSection` - Simple footer

**Testing**: Integration tests for organisms

**Deliverable**: 4 organism components

---

#### Day 11-12: Page Component & Integration
1. `RTIDashboardPage` - Top-level page
2. Update `src/app/page.tsx` to use new component
3. Wire up repository
4. Test entire page flow

**Deliverable**: Fully integrated landing page

---

#### Day 13-14: Polish & Responsive
1. Responsive layout testing (mobile, tablet, desktop)
2. Accessibility audit (a11y)
3. Performance optimization
4. Cross-browser testing
5. Documentation

**Deliverable**: Production-ready landing page

---

### Dependency Order (Bottom-Up)

```
Level 1 (No dependencies): Atoms
  ↓
Level 2 (Use atoms): Molecules
  ↓
Level 3 (Use molecules): Organisms
  ↓
Level 4 (Use organisms): Page
```

### Testing Strategy Per Phase

**Atoms**:
- Unit tests (Jest + React Testing Library)
- Visual regression (Storybook/Chromatic)

**Molecules**:
- Component tests (RTL)
- Integration tests with atoms

**Organisms**:
- Integration tests
- E2E tests (Playwright)

**Page**:
- Full E2E tests
- Performance tests (Lighthouse)

---

## 12. Testing Strategy

### Unit Tests (Atoms & Molecules)

```typescript
// StoryCard.test.tsx
import { render, screen } from '@testing-library/react'
import { StoryCard } from './StoryCard'

describe('StoryCard', () => {
  const mockStory: RTIStory = {
    id: '1',
    title: 'Test Story',
    summary: 'Test summary',
    topic: 'Health',
    state: 'Karnataka',
    department: 'Health Dept',
    filedDate: '2025-06-05',
    answeredDate: '2025-07-02',
    viewLink: '/rti/1'
  }

  it('renders story title', () => {
    render(<StoryCard story={mockStory} />)
    expect(screen.getByText('Test Story')).toBeInTheDocument()
  })

  it('displays metadata correctly', () => {
    render(<StoryCard story={mockStory} />)
    expect(screen.getByText('Health')).toBeInTheDocument()
    expect(screen.getByText('Karnataka')).toBeInTheDocument()
  })

  it('applies lead variant styling', () => {
    const { container } = render(<StoryCard story={mockStory} variant="lead" />)
    expect(container.firstChild).toHaveClass('lead')
  })
})
```

### Integration Tests (Organisms)

```typescript
// DailyEditionSection.test.tsx
import { render, screen } from '@testing-library/react'
import { DailyEditionSection } from './DailyEditionSection'
import { mockDailyEditionData } from '@/test/mocks'

describe('DailyEditionSection', () => {
  it('renders all subsections', () => {
    render(<DailyEditionSection data={mockDailyEditionData} />)

    expect(screen.getByText(/Impact Story of the Day/i)).toBeInTheDocument()
    expect(screen.getByText(/Fresh Answers/i)).toBeInTheDocument()
    expect(screen.getByText(/Important Questions/i)).toBeInTheDocument()
    expect(screen.getByText(/What People Are Asking/i)).toBeInTheDocument()
  })

  it('displays lead story prominently', () => {
    render(<DailyEditionSection data={mockDailyEditionData} />)
    const leadStory = screen.getByText(mockDailyEditionData.leadStory.title)
    expect(leadStory).toBeInTheDocument()
  })
})
```

### E2E Tests (Page)

```typescript
// landing-page.spec.ts (Playwright)
import { test, expect } from '@playwright/test'

test.describe('RTI Dashboard Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays all major sections', async ({ page }) => {
    await expect(page.getByText('Impact Story of the Day')).toBeVisible()
    await expect(page.getByText('Key Metrics')).toBeVisible()
    await expect(page.getByText('Department Leaderboard')).toBeVisible()
  })

  test('navigation bar is interactive', async ({ page }) => {
    const navItem = page.getByText("Today's Edition")
    await expect(navItem).toBeVisible()
    await navItem.hover()
    // Check hover effect
  })

  test('responsive layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    // Verify stacked layout
    const columns = page.locator('.newspaperLayout > div')
    // Should be vertical stacking on mobile
  })
})
```

### Accessibility Tests

```typescript
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

test('StoryCard is accessible', async () => {
  const { container } = render(<StoryCard story={mockStory} />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

---

## 13. Code Quality & Best Practices

### Method Length
- Keep functions under 10 lines
- Extract complex logic into helper functions
- Use early returns to reduce nesting

**Example**:
```typescript
// BAD - Long method
function StoryCard({ story }: StoryCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{story.title}</h3>
        <div className={styles.metadata}>
          <Badge>{story.topic}</Badge>
          <span>{story.state}</span>
          <span>{story.district}</span>
        </div>
      </div>
      <div className={styles.body}>
        <p>{story.summary}</p>
      </div>
      <div className={styles.footer}>
        <span>Filed: {formatDate(story.filedDate)}</span>
        <span>Answered: {formatDate(story.answeredDate)}</span>
        <a href={story.viewLink}>View RTI →</a>
      </div>
    </div>
  )
}

// GOOD - Extracted components
function StoryCard({ story }: StoryCardProps) {
  return (
    <div className={styles.card}>
      <StoryHeader story={story} />
      <StoryBody summary={story.summary} />
      <StoryFooter story={story} />
    </div>
  )
}

function StoryHeader({ story }: { story: RTIStory }) {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>{story.title}</h3>
      <StoryMetadata story={story} />
    </div>
  )
}
```

### Naming Conventions
- Components: PascalCase (`StoryCard`)
- Props interfaces: PascalCase + `Props` suffix (`StoryCardProps`)
- CSS modules: camelCase (`styles.storyCard`)
- Functions: camelCase (`formatDate`)
- Constants: UPPER_SNAKE_CASE (`MAX_DISPLAY_ITEMS`)

### File Organization
- One component per file
- Co-locate CSS module with component
- Group related components in directories
- Index files for clean imports

### Import Order
```typescript
// 1. External libraries
import { ReactNode } from 'react'

// 2. Internal types
import { RTIStory } from '@/types/dashboard'

// 3. Internal components
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

// 4. Utilities
import { formatDate } from '@/lib/utils'

// 5. Styles (last)
import styles from './StoryCard.module.css'
```

---

## 14. Performance Considerations

### Code Splitting
- Use dynamic imports for large sections
- Lazy load below-the-fold content

```typescript
// Lazy load spotlight (below fold)
const TransparencySpotlight = dynamic(
  () => import('./TransparencySpotlight'),
  { loading: () => <div>Loading...</div> }
)
```

### Memoization
- Memoize expensive computations
- Use `React.memo` for pure components

```typescript
export const StoryCard = React.memo(function StoryCard({ story }: StoryCardProps) {
  return <div>...</div>
})

// Or for computed values
const sortedDepartments = useMemo(
  () => departments.sort((a, b) => b.fulfillmentRate - a.fulfillmentRate),
  [departments]
)
```

### Image Optimization
- Use Next.js `<Image>` component
- Lazy load images below fold
- Provide width/height to prevent layout shift

### Bundle Size
- Tree-shake unused icons from lucide-react
- Use CSS modules (automatic code splitting)
- Monitor bundle with `next build --analyze`

---

## 15. Accessibility (a11y)

### Semantic HTML
- Use semantic elements (`<section>`, `<article>`, `<nav>`)
- Proper heading hierarchy (h1 → h2 → h3)
- `<button>` for actions, `<a>` for navigation

### ARIA Labels
```tsx
<button aria-label="View RTI details">View →</button>
<nav aria-label="Quick navigation">...</nav>
```

### Keyboard Navigation
- All interactive elements focusable
- Visible focus indicators
- Skip links for long pages

### Color Contrast
- WCAG AA minimum (4.5:1 for normal text)
- Don't rely on color alone
- Use icons + text for status

### Screen Readers
- Alt text for images
- ARIA live regions for dynamic content
- Descriptive link text (not "click here")

---

## 16. Future Enhancements

### Phase 2 Features
1. **Filtering & Search**
   - Filter stories by topic/state
   - Search RTIs
   - Date range picker

2. **Interactive Charts**
   - Drill-down in department chart
   - Tooltips with details
   - Export data

3. **Real-time Updates**
   - WebSocket for live RTI updates
   - Notification system
   - Activity feed auto-refresh

4. **Personalization**
   - Save favorite topics
   - Location-based content
   - Customizable dashboard

5. **Analytics**
   - Track user engagement
   - A/B test layouts
   - Performance monitoring

---

## 17. Summary

### Architectural Highlights

1. **Component-Based Architecture**: 40+ reusable components organized by atomic design
2. **SOLID Principles**: Clear separation of concerns, single responsibilities, dependency inversion
3. **Design Patterns**: Composition, Strategy, Repository, Observer, Facade
4. **Type Safety**: Comprehensive TypeScript interfaces for all data structures
5. **Theme-Agnostic**: 100% use of semantic design tokens
6. **Performance**: Code splitting, memoization, lazy loading
7. **Accessibility**: WCAG AA compliance, semantic HTML, keyboard navigation
8. **Testability**: Unit, integration, E2E tests at all levels
9. **Maintainability**: Small functions, clear naming, organized file structure
10. **Scalability**: Easy to add features, swap data sources, extend components

### Key Files to Create

**Types**:
- `src/types/dashboard.ts`

**Repository**:
- `src/services/repositories/LandingPageRepository.ts`

**Components** (40+ files):
- 10 atoms (StoryCard, MetricCard, etc.)
- 13 molecules (DailyEditionHeader, ImpactStory, etc.)
- 4 organisms (DailyEditionSection, HeroSection, etc.)
- 1 page component (RTIDashboardPage)

**Total**: ~50 new files

### Implementation Timeline

- **Week 1**: Types, repository, atoms
- **Week 2**: Molecules
- **Week 3**: Organisms, page, polish

**Total**: ~3 weeks for MVP

---

## Appendix A: Component Props Quick Reference

```typescript
// Atoms
StoryCardProps { story, variant?, className? }
MetricCardProps { metric, className? }
InsightCardProps { insight, className? }
QuestionListItemProps { question, className? }
AnswerListItemProps { answer, className? }
UnansweredListItemProps { unanswered, className? }
ActivityItemProps { activity, showIcon?, className? }
TopicCardProps { topic, interactive?, className? }
NavigationCardProps { item, className? }
ProgressBarProps { percentage, label?, color?, showLabel?, className? }

// Molecules
DailyEditionHeaderProps { editionDate, className? }
ImpactStoryProps { story, className? }
SecondaryStoriesProps { stories, className? }
FreshAnswersProps { answers, maxDisplay?, className? }
UnansweredQuestionsProps { questions, maxDisplay?, className? }
RecentQuestionsProps { questions, maxDisplay?, className? }
NavigationBarProps { items, className? }
IndiaGlanceCardProps { stats, className? }
KeyMetricsSectionProps { metrics, className? }
DepartmentPerformanceProps { summary, chartData, className? }
DepartmentLeaderboardProps { departments, className? }
InsightsTrendsProps { insights, className? }
BrowseByTopicProps { topics, className? }
ActivityFeedProps { activities, maxDisplay?, className? }
TransparencySpotlightProps { story, className? }

// Organisms
DailyEditionSectionProps { data, className? }
HeroSectionProps { data, className? }
MainContentSectionProps { data, className? }
FooterSectionProps { className? }

// Page
RTIDashboardPage (no props - Next.js page)
```

---

## Appendix B: CSS Module Template

```css
/* ComponentName.module.css */

/* Container */
.container {
  background: var(--color-bg-primary);
  border: var(--border-width-thin) solid var(--color-border-secondary);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
}

/* Typography */
.title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
  margin-bottom: var(--spacing-md);
}

.body {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

/* Spacing */
.header {
  margin-bottom: var(--spacing-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: var(--spacing-md);
  }
}

/* Interactive */
.interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
  transition: var(--transition-base);
}

/* Variants */
.primary {
  background: var(--color-rti-blue);
  color: var(--color-text-inverse);
}

.secondary {
  background: var(--color-bg-secondary);
}
```

---

## Appendix C: Mock Data Example

```typescript
// Mock data for testing/development
export const mockLandingPageData: LandingPageData = {
  dailyEdition: {
    editionDate: '2025-11-11',
    leadStory: {
      id: '1',
      title: 'RTI on School Repairs Forced Action in XYZ Village',
      summary: 'Citizens filed an RTI asking for sanctioned funds and work orders for school repairs in XYZ village. The reply showed funds were released but work was incomplete. After the disclosure, the local body completed repairs and published details online.',
      topic: 'Education',
      state: 'Karnataka',
      district: 'ABC',
      department: 'Education',
      filedDate: '2025-06-05',
      answeredDate: '2025-07-02',
      viewLink: '/rti/1',
      isLeadStory: true
    },
    secondaryStories: [/* ... */],
    freshAnswers: [/* ... */],
    unansweredQuestions: [/* ... */],
    recentQuestions: [/* ... */]
  },
  hero: {/* ... */},
  mainContent: {/* ... */}
}
```

---

**End of Low-Level Design Document**
