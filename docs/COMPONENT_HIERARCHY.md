# RTI Dashboard Landing Page - Component Hierarchy

## Visual Component Tree

```
RTIDashboardPage (Page Component)
│
├── DailyEditionSection (Organism)
│   │
│   ├── DailyEditionHeader (Molecule)
│   │   └── Card, Typography
│   │
│   ├── ImpactStory (Molecule)
│   │   └── StoryCard (Atom)
│   │       └── Card, Badge, Typography
│   │
│   ├── SecondaryStories (Molecule)
│   │   └── Grid
│   │       └── StoryCard (×3) (Atom)
│   │           └── Card, Badge, Typography
│   │
│   ├── FreshAnswers (Molecule)
│   │   └── Card
│   │       └── AnswerListItem (×multiple) (Atom)
│   │           └── Typography
│   │
│   ├── UnansweredQuestions (Molecule)
│   │   └── Card
│   │       └── UnansweredListItem (×multiple) (Atom)
│   │           └── Badge, Typography
│   │
│   └── RecentQuestions (Molecule)
│       └── Card
│           └── QuestionListItem (×multiple) (Atom)
│               └── Badge, Typography
│
├── HeroSection (Organism)
│   │
│   ├── HeroTitle
│   │   └── Typography
│   │
│   ├── NavigationBar (Molecule)
│   │   └── Grid
│   │       └── NavigationCard (×6) (Atom)
│   │
│   ├── StatsGrid
│   │   └── Grid
│   │       └── StatCard (×3) [EXISTING]
│   │           └── Icon, TrendIndicator
│   │
│   └── IndiaGlanceCard (Molecule)
│       └── Card
│           └── Typography
│
├── MainContentSection (Organism)
│   │
│   ├── KeyMetricsSection (Molecule)
│   │   └── Grid
│   │       └── MetricCard (×3) (Atom)
│   │           └── Card, Icon, TrendIndicator
│   │
│   ├── DepartmentPerformance (Molecule)
│   │   └── Card
│   │       ├── PerformanceSummary
│   │       │   └── Typography
│   │       └── PerformanceChart
│   │           └── BarChart (recharts)
│   │               └── ProgressBar (Atom)
│   │
│   ├── DepartmentLeaderboard (Molecule)
│   │   └── Card
│   │       └── DataTable [EXISTING]
│   │           └── Typography, Badge
│   │
│   ├── TwoColumnLayout
│   │   │
│   │   ├── InsightsTrends (Molecule)
│   │   │   └── Card
│   │   │       └── InsightCard (×multiple) (Atom)
│   │   │           └── Typography
│   │   │
│   │   └── BrowseByTopic (Molecule)
│   │       └── Card
│   │           └── Grid
│   │               └── TopicCard (×4) (Atom)
│   │                   └── Typography
│   │
│   └── ActivitySpotlightLayout
│       │
│       ├── ActivityFeed (Molecule) [2/3 width]
│       │   └── Card
│       │       └── ActivityItem (×multiple) (Atom)
│       │           └── Icon, Badge, Typography
│       │
│       └── TransparencySpotlight (Molecule) [1/3 width]
│           └── Card
│               └── Typography
│
└── FooterSection (Organism)
    └── Container
        ├── FooterLinks
        │   └── Typography
        └── FooterText
            └── Typography
```

---

## Component Dependencies Graph

```
┌─────────────────────────────────────────────────────────────────┐
│                         EXISTING COMPONENTS                      │
│  Typography | Icon | Badge | Card | StatCard | DataTable       │
│  TrendIndicator | Grid | Container | NewspaperLayout            │
└─────────────────────────────────────────────────────────────────┘
                                  ▲
                                  │ (depends on)
                                  │
┌─────────────────────────────────────────────────────────────────┐
│                         ATOM COMPONENTS (NEW)                    │
│  StoryCard | MetricCard | InsightCard | QuestionListItem       │
│  AnswerListItem | UnansweredListItem | ActivityItem            │
│  TopicCard | NavigationCard | ProgressBar                      │
└─────────────────────────────────────────────────────────────────┘
                                  ▲
                                  │ (depends on)
                                  │
┌─────────────────────────────────────────────────────────────────┐
│                       MOLECULE COMPONENTS (NEW)                  │
│  DailyEditionHeader | ImpactStory | SecondaryStories           │
│  FreshAnswers | UnansweredQuestions | RecentQuestions          │
│  NavigationBar | IndiaGlanceCard | KeyMetricsSection           │
│  DepartmentPerformance | DepartmentLeaderboard                 │
│  InsightsTrends | BrowseByTopic | ActivityFeed                 │
│  TransparencySpotlight                                          │
└─────────────────────────────────────────────────────────────────┘
                                  ▲
                                  │ (depends on)
                                  │
┌─────────────────────────────────────────────────────────────────┐
│                      ORGANISM COMPONENTS (NEW)                   │
│  DailyEditionSection | HeroSection                              │
│  MainContentSection | FooterSection                             │
└─────────────────────────────────────────────────────────────────┘
                                  ▲
                                  │ (depends on)
                                  │
┌─────────────────────────────────────────────────────────────────┐
│                       PAGE COMPONENT (NEW)                       │
│                      RTIDashboardPage                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Reusable vs New Components

### Reusable Components (No Changes Needed)
- ✅ `Typography` - Text rendering with variants
- ✅ `Icon` - Icon wrapper for lucide-react
- ✅ `Badge` - Status indicators
- ✅ `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` - Containers
- ✅ `StatCard` - Statistics display
- ✅ `DataTable` - Tabular data
- ✅ `TrendIndicator` - Trend arrows
- ✅ `Grid` - Grid layout
- ✅ `Container` - Max-width container
- ✅ `NewspaperLayout` - 3-column layout

### New Atom Components (10 components)
1. 🆕 `StoryCard` - Impact story display
2. 🆕 `MetricCard` - Key metrics display
3. 🆕 `InsightCard` - Insight/trend item
4. 🆕 `QuestionListItem` - RTI question item
5. 🆕 `AnswerListItem` - RTI answer item
6. 🆕 `UnansweredListItem` - Pending RTI item
7. 🆕 `ActivityItem` - Timeline activity item
8. 🆕 `TopicCard` - Topic hub card
9. 🆕 `NavigationCard` - Hero navigation item
10. 🆕 `ProgressBar` - Visual progress bar

### New Molecule Components (13 components)
1. 🆕 `DailyEditionHeader` - Edition header with date
2. 🆕 `ImpactStory` - Lead impact story
3. 🆕 `SecondaryStories` - Grid of secondary stories
4. 🆕 `FreshAnswers` - Recent answers list
5. 🆕 `UnansweredQuestions` - Pending RTIs list
6. 🆕 `RecentQuestions` - Recent questions list
7. 🆕 `NavigationBar` - Hero navigation
8. 🆕 `IndiaGlanceCard` - India at a glance stats
9. 🆕 `KeyMetricsSection` - Key metrics grid
10. 🆕 `DepartmentPerformance` - Performance with chart
11. 🆕 `DepartmentLeaderboard` - Ranking table
12. 🆕 `InsightsTrends` - Insights column
13. 🆕 `BrowseByTopic` - Topic grid
14. 🆕 `ActivityFeed` - Activity timeline
15. 🆕 `TransparencySpotlight` - Featured story

### New Organism Components (4 components)
1. 🆕 `DailyEditionSection` - Daily edition section
2. 🆕 `HeroSection` - Hero section
3. 🆕 `MainContentSection` - Main content section
4. 🆕 `FooterSection` - Footer section

### New Page Component (1 component)
1. 🆕 `RTIDashboardPage` - Top-level page

**Total New Components**: 28 components

---

## Component Complexity Matrix

| Component | LOC | Dependencies | Complexity | Priority |
|-----------|-----|--------------|------------|----------|
| **Atoms** |
| InsightCard | ~30 | 0 | Low | High |
| TopicCard | ~40 | 1 | Low | High |
| NavigationCard | ~40 | 0 | Low | High |
| ProgressBar | ~50 | 0 | Low | High |
| QuestionListItem | ~60 | 2 | Low | High |
| AnswerListItem | ~60 | 1 | Low | High |
| UnansweredListItem | ~70 | 2 | Medium | High |
| ActivityItem | ~60 | 3 | Low | High |
| StoryCard | ~100 | 3 | Medium | High |
| MetricCard | ~80 | 3 | Medium | High |
| **Molecules** |
| DailyEditionHeader | ~50 | 2 | Low | High |
| ImpactStory | ~60 | 2 | Low | High |
| SecondaryStories | ~80 | 3 | Low | High |
| FreshAnswers | ~100 | 2 | Medium | High |
| UnansweredQuestions | ~100 | 2 | Medium | High |
| RecentQuestions | ~100 | 2 | Medium | High |
| NavigationBar | ~80 | 2 | Low | High |
| IndiaGlanceCard | ~100 | 2 | Low | Medium |
| KeyMetricsSection | ~80 | 3 | Low | High |
| DepartmentPerformance | ~150 | 4 | High | High |
| DepartmentLeaderboard | ~100 | 3 | Medium | High |
| InsightsTrends | ~80 | 2 | Low | Medium |
| BrowseByTopic | ~100 | 3 | Low | Medium |
| ActivityFeed | ~120 | 3 | Medium | High |
| TransparencySpotlight | ~120 | 2 | Medium | Medium |
| **Organisms** |
| DailyEditionSection | ~150 | 6 | High | High |
| HeroSection | ~120 | 4 | Medium | High |
| MainContentSection | ~200 | 9 | High | High |
| FooterSection | ~60 | 1 | Low | Low |
| **Page** |
| RTIDashboardPage | ~100 | 4 | Medium | High |

**LOC**: Lines of Code (estimated)
**Dependencies**: Number of child components
**Complexity**: Implementation difficulty
**Priority**: Implementation priority

---

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                     LandingPageRepository                         │
│                        (Data Source)                              │
│  - getLandingPageData(): Promise<LandingPageData>                │
│  - Mock data initially, API integration later                    │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             │ async fetch
                             │
                             ▼
┌──────────────────────────────────────────────────────────────────┐
│                      RTIDashboardPage                             │
│                   (Server Component)                              │
│  const data = await LandingPageRepository.getLandingPageData()   │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                   ┌─────────┴─────────┬──────────────┐
                   │                   │              │
                   ▼                   ▼              ▼
    ┌──────────────────────┐  ┌───────────────┐  ┌─────────────────┐
    │ DailyEditionSection  │  │  HeroSection  │  │ MainContent     │
    │ data={data.daily}    │  │ data={data.hero│  │ data={data.main}│
    └──────────────────────┘  └───────────────┘  └─────────────────┘
               │                      │                    │
        ┌──────┴──────┐        ┌─────┴─────┐     ┌───────┴────────┐
        ▼             ▼        ▼           ▼     ▼                ▼
   ┌────────┐   ┌────────┐ ┌───────┐  ┌──────┐ ┌──────┐    ┌────────┐
   │Impact  │   │Fresh   │ │Nav    │  │Stats │ │Metrics│    │Insights│
   │Story   │   │Answers │ │Bar    │  │Grid  │ │Section│    │Trends  │
   └────────┘   └────────┘ └───────┘  └──────┘ └──────┘    └────────┘
        │             │         │          │        │             │
        ▼             ▼         ▼          ▼        ▼             ▼
   ┌────────┐   ┌────────┐ ┌───────┐  ┌──────┐ ┌──────┐    ┌────────┐
   │Story   │   │Answer  │ │Nav    │  │Stat  │ │Metric│    │Insight │
   │Card    │   │ListItem│ │Card   │  │Card  │ │Card  │    │Card    │
   └────────┘   └────────┘ └───────┘  └──────┘ └──────┘    └────────┘
```

**Flow**: Data flows unidirectionally from Repository → Page → Organisms → Molecules → Atoms

---

## Responsive Behavior

### Mobile (< 768px)
```
┌─────────────────────┐
│  Daily Edition      │
│  (Stacked)          │
├─────────────────────┤
│  Hero               │
│  (Stacked)          │
├─────────────────────┤
│  Key Metrics        │
│  (Single Column)    │
├─────────────────────┤
│  Department Perf    │
├─────────────────────┤
│  Leaderboard        │
├─────────────────────┤
│  Insights           │
│  (Single Column)    │
├─────────────────────┤
│  Topics             │
│  (Single Column)    │
├─────────────────────┤
│  Activity Feed      │
│  (Single Column)    │
├─────────────────────┤
│  Spotlight          │
│  (Single Column)    │
├─────────────────────┤
│  Footer             │
└─────────────────────┘
```

### Tablet (768px - 1024px)
```
┌─────────────────────────────┐
│  Daily Edition              │
│  (2 columns where possible) │
├─────────────────────────────┤
│  Hero                       │
│  (2 column grid)            │
├─────────────────────────────┤
│  Key Metrics (2 columns)    │
├─────────────────────────────┤
│  Department Performance     │
├─────────────────────────────┤
│  Department Leaderboard     │
├─────────────────────────────┤
│ Insights    │   Topics      │
│ (1/2)       │   (1/2)       │
├─────────────┴───────────────┤
│  Activity Feed              │
│  (Full Width)               │
├─────────────────────────────┤
│  Spotlight (Full Width)     │
├─────────────────────────────┤
│  Footer                     │
└─────────────────────────────┘
```

### Desktop (> 1024px)
```
┌───────────────────────────────────────────┐
│  Daily Edition                            │
│  (3 columns where applicable)             │
├───────────────────────────────────────────┤
│  Hero (Full Width)                        │
│  Navigation (6 items in row)              │
│  Stats Grid (3 columns)                   │
├───────────────────────────────────────────┤
│  Key Metrics (3 columns)                  │
├───────────────────────────────────────────┤
│  Department Performance (Full Width)      │
├───────────────────────────────────────────┤
│  Department Leaderboard (Full Width)      │
├─────────────────────┬─────────────────────┤
│  Insights & Trends  │  Browse by Topic    │
│  (1/2)              │  (1/2)              │
├─────────────────────┴─────────────────────┤
│  Activity Feed (2/3) │ Spotlight (1/3)    │
├──────────────────────┴────────────────────┤
│  Footer                                   │
└───────────────────────────────────────────┘
```

---

## Component Props Summary

### Atoms
```typescript
StoryCard: { story: RTIStory, variant?: 'lead' | 'secondary' }
MetricCard: { metric: KeyMetric }
InsightCard: { insight: InsightItem }
QuestionListItem: { question: RecentQuestion }
AnswerListItem: { answer: RTIAnswer }
UnansweredListItem: { unanswered: UnansweredRTI }
ActivityItem: { activity: ActivityItem, showIcon?: boolean }
TopicCard: { topic: TopicHub, interactive?: boolean }
NavigationCard: { item: NavigationItem }
ProgressBar: { percentage: number, label?: string, color?: string }
```

### Molecules
```typescript
DailyEditionHeader: { editionDate: string }
ImpactStory: { story: RTIStory }
SecondaryStories: { stories: RTIStory[] }
FreshAnswers: { answers: RTIAnswer[], maxDisplay?: number }
UnansweredQuestions: { questions: UnansweredRTI[], maxDisplay?: number }
RecentQuestions: { questions: RecentQuestion[], maxDisplay?: number }
NavigationBar: { items: NavigationItem[] }
IndiaGlanceCard: { stats: IndiaGlanceStats }
KeyMetricsSection: { metrics: KeyMetric[] }
DepartmentPerformance: { summary: {...}, chartData: DepartmentPerformance[] }
DepartmentLeaderboard: { departments: DepartmentPerformance[] }
InsightsTrends: { insights: InsightItem[] }
BrowseByTopic: { topics: TopicHub[] }
ActivityFeed: { activities: ActivityItem[], maxDisplay?: number }
TransparencySpotlight: { story: SpotlightStory }
```

### Organisms
```typescript
DailyEditionSection: { data: DailyEditionData }
HeroSection: { data: HeroSectionData }
MainContentSection: { data: MainContentData }
FooterSection: { } // no props
```

### Page
```typescript
RTIDashboardPage: // no props (Next.js page)
```

---

## File Size Estimates

```
src/types/dashboard.ts                                 ~500 lines
src/services/repositories/LandingPageRepository.ts     ~300 lines

Atoms (10 components × 2 files each)                   ~2,000 lines
  - Component.tsx: ~60-100 lines each
  - Component.module.css: ~50-80 lines each

Molecules (15 components × 2 files each)               ~3,500 lines
  - Component.tsx: ~80-150 lines each
  - Component.module.css: ~60-100 lines each

Organisms (4 components × 2 files each)                ~1,200 lines
  - Component.tsx: ~100-200 lines each
  - Component.module.css: ~80-120 lines each

Page (1 component × 2 files)                           ~200 lines
  - RTIDashboardPage.tsx: ~100 lines
  - RTIDashboardPage.module.css: ~100 lines

Tests (30 components × 1 test file each)               ~3,000 lines
  - Component.test.tsx: ~100 lines each

Total: ~10,700 lines of code
```

---

## Key Takeaways

1. **Reuse First**: 10 existing components can be reused without changes
2. **28 New Components**: Build in order (atoms → molecules → organisms → page)
3. **Clear Dependencies**: Each level depends only on lower levels
4. **Type-Safe**: All data structures defined in `types/dashboard.ts`
5. **Theme-Agnostic**: All components use semantic design tokens
6. **Testable**: Clear separation allows easy unit/integration testing
7. **Responsive**: Mobile-first design with progressive enhancement
8. **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
9. **Performant**: Code splitting, lazy loading, memoization where needed
10. **Maintainable**: Small components, clear props, organized structure

---

## Next Steps

1. Review full LLD: `docs/LLD_RTI_DASHBOARD_LANDING_PAGE.md`
2. Review implementation guide: `docs/IMPLEMENTATION_GUIDE.md`
3. Start with Phase 1 (Week 1): Types, repository, atoms
4. Follow bottom-up implementation order
5. Test each component as you build
6. Commit frequently with clear messages

---

**Component Hierarchy Visualization Complete!** 🎨
