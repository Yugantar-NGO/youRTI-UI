# RTI Dashboard Landing Page - Implementation Guide

## Quick Start Guide

This is a practical, step-by-step guide to implementing the RTI Dashboard Landing Page based on the Low-Level Design.

---

## Prerequisites

1. Read the full LLD document: `docs/LLD_RTI_DASHBOARD_LANDING_PAGE.md`
2. Understand existing components in `src/components/`
3. Familiar with Next.js 14 App Router and TypeScript
4. Review design tokens in `src/styles/design-tokens.css`

---

## Implementation Checklist

### Week 1: Foundation

#### Day 1: Type Definitions
- [ ] Create `src/types/dashboard.ts`
- [ ] Add all interfaces from LLD Section 4
- [ ] Export types from `src/types/index.ts`
- [ ] Run `npm run type-check` to verify

#### Day 2: Repository & Mock Data
- [ ] Create `src/services/repositories/LandingPageRepository.ts`
- [ ] Implement `getLandingPageData()` with mock data
- [ ] Create `src/test/mocks/landingPageData.ts` for test data
- [ ] Write unit tests for repository

#### Day 3: Atom Components (Batch 1)
- [ ] `InsightCard` (simplest - start here)
- [ ] `TopicCard`
- [ ] `NavigationCard`
- [ ] `ProgressBar`
- [ ] Test each component visually

#### Day 4: Atom Components (Batch 2)
- [ ] `QuestionListItem`
- [ ] `AnswerListItem`
- [ ] `UnansweredListItem`
- [ ] `ActivityItem`
- [ ] Add unit tests

#### Day 5: Atom Components (Batch 3)
- [ ] `StoryCard` (more complex)
- [ ] `MetricCard`
- [ ] Test all atoms together
- [ ] Fix any styling issues

---

### Week 2: Molecules

#### Day 6: Daily Edition Molecules (Batch 1)
- [ ] `DailyEditionHeader`
- [ ] `ImpactStory` (uses StoryCard)
- [ ] `SecondaryStories` (grid of StoryCards)
- [ ] Test with mock data

#### Day 7: Daily Edition Molecules (Batch 2)
- [ ] `FreshAnswers` (list of AnswerListItems)
- [ ] `UnansweredQuestions` (list of UnansweredListItems)
- [ ] `RecentQuestions` (list of QuestionListItems)
- [ ] Test scrolling and overflow

#### Day 8: Hero Molecules
- [ ] `NavigationBar` (grid of NavigationCards)
- [ ] `IndiaGlanceCard` (3-column stats)
- [ ] Test responsive layout

#### Day 9: Main Content Molecules (Batch 1)
- [ ] `KeyMetricsSection` (grid of MetricCards)
- [ ] `DepartmentPerformance` (with recharts BarChart)
- [ ] Test chart responsiveness

#### Day 10: Main Content Molecules (Batch 2)
- [ ] `DepartmentLeaderboard` (uses DataTable)
- [ ] `InsightsTrends` (list of InsightCards)
- [ ] `BrowseByTopic` (grid of TopicCards)
- [ ] Test data mapping

#### Day 11: Main Content Molecules (Batch 3)
- [ ] `ActivityFeed` (timeline of ActivityItems)
- [ ] `TransparencySpotlight` (featured story)
- [ ] Test 2/3 + 1/3 layout

---

### Week 3: Integration & Polish

#### Day 12: Organism Components
- [ ] `DailyEditionSection` (compose all daily edition molecules)
- [ ] `HeroSection` (compose hero molecules)
- [ ] `MainContentSection` (compose main content molecules)
- [ ] `FooterSection` (simple footer)
- [ ] Test section integration

#### Day 13: Page Component
- [ ] `RTIDashboardPage` (top-level page)
- [ ] Update `src/app/page.tsx` to use RTIDashboardPage
- [ ] Wire up LandingPageRepository
- [ ] Test full page flow

#### Day 14: Responsive & Accessibility
- [ ] Test mobile layout (375px)
- [ ] Test tablet layout (768px)
- [ ] Test desktop layout (1280px+)
- [ ] Run a11y audit (axe DevTools)
- [ ] Fix keyboard navigation issues
- [ ] Add ARIA labels where needed

#### Day 15: Testing & Documentation
- [ ] Write E2E tests (Playwright)
- [ ] Performance audit (Lighthouse)
- [ ] Cross-browser testing
- [ ] Update README with screenshots
- [ ] Create Storybook stories (optional)

---

## Component Implementation Order

### Recommended Build Order (Bottom-Up)

```
1. InsightCard              ← Simplest, no dependencies
2. TopicCard                ← Simple card
3. NavigationCard           ← Simple card
4. ProgressBar              ← Pure CSS
5. QuestionListItem         ← Uses Badge
6. AnswerListItem           ← Similar to Question
7. UnansweredListItem       ← Similar to Question
8. ActivityItem             ← Uses Icon, Badge
9. StoryCard                ← More complex, uses Badge
10. MetricCard              ← Uses Icon, TrendIndicator

11. DailyEditionHeader      ← Uses Typography, Card
12. ImpactStory             ← Uses StoryCard
13. SecondaryStories        ← Uses StoryCard, Grid
14. FreshAnswers            ← Uses AnswerListItem
15. UnansweredQuestions     ← Uses UnansweredListItem
16. RecentQuestions         ← Uses QuestionListItem
17. NavigationBar           ← Uses NavigationCard
18. IndiaGlanceCard         ← Uses Card
19. KeyMetricsSection       ← Uses MetricCard, Grid
20. DepartmentPerformance   ← Uses recharts, ProgressBar
21. DepartmentLeaderboard   ← Uses DataTable
22. InsightsTrends          ← Uses InsightCard
23. BrowseByTopic           ← Uses TopicCard
24. ActivityFeed            ← Uses ActivityItem
25. TransparencySpotlight   ← Uses Card

26. DailyEditionSection     ← Composes daily edition molecules
27. HeroSection             ← Composes hero molecules
28. MainContentSection      ← Composes main content molecules
29. FooterSection           ← Simple footer

30. RTIDashboardPage        ← Top-level page
```

---

## Code Templates

### Atom Component Template

```tsx
// src/components/features/landing/atoms/ComponentName.tsx
import { ReactNode } from 'react'
import { DataType } from '@/types/dashboard'
import styles from './ComponentName.module.css'

interface ComponentNameProps {
  data: DataType
  className?: string
}

/**
 * ComponentName Component
 *
 * Brief description of what this component does.
 *
 * @param data - The data to display
 * @param className - Optional additional CSS classes
 *
 * @example
 * <ComponentName data={myData} />
 */
export function ComponentName({ data, className = '' }: ComponentNameProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      {/* Component content */}
    </div>
  )
}
```

### Molecule Component Template

```tsx
// src/components/features/landing/molecules/SectionName.tsx
import { ReactNode } from 'react'
import { DataType } from '@/types/dashboard'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { AtomComponent } from '../atoms/AtomComponent'
import styles from './SectionName.module.css'

interface SectionNameProps {
  data: DataType[]
  maxDisplay?: number
  className?: string
}

/**
 * SectionName Component
 *
 * Section description.
 *
 * @param data - Array of items to display
 * @param maxDisplay - Maximum number of items to show
 * @param className - Optional additional CSS classes
 */
export function SectionName({
  data,
  maxDisplay = 5,
  className = ''
}: SectionNameProps) {
  const displayData = data.slice(0, maxDisplay)

  return (
    <Card variant="default" className={className}>
      <CardHeader>
        <CardTitle>Section Title</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={styles.list}>
          {displayData.map((item) => (
            <AtomComponent key={item.id} data={item} />
          ))}
        </div>
        {data.length > maxDisplay && (
          <div className={styles.footer}>
            <a href="/view-all" className={styles.link}>
              View all →
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
```

### CSS Module Template

```css
/* ComponentName.module.css */

.container {
  background: var(--color-bg-primary);
  border: var(--border-width-thin) solid var(--color-border-secondary);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  transition: var(--transition-base);
}

.container:hover {
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-2px);
}

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

.metadata {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: var(--spacing-md);
  }

  .title {
    font-size: var(--font-size-lg);
  }
}
```

### Test Template

```typescript
// ComponentName.test.tsx
import { render, screen } from '@testing-library/react'
import { ComponentName } from './ComponentName'
import { mockData } from '@/test/mocks'

describe('ComponentName', () => {
  it('renders with correct data', () => {
    render(<ComponentName data={mockData} />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles empty data gracefully', () => {
    render(<ComponentName data={[]} />)
    expect(screen.queryByText('Expected Text')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ComponentName data={mockData} className="custom" />
    )
    expect(container.firstChild).toHaveClass('custom')
  })

  it('is accessible', async () => {
    const { container } = render(<ComponentName data={mockData} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

---

## Common Patterns

### Pattern 1: List with Max Display

```tsx
export function ListSection({ items, maxDisplay = 5 }: ListSectionProps) {
  const displayItems = items.slice(0, maxDisplay)
  const hasMore = items.length > maxDisplay

  return (
    <div>
      {displayItems.map(item => <ListItem key={item.id} item={item} />)}
      {hasMore && <ViewAllLink count={items.length - maxDisplay} />}
    </div>
  )
}
```

### Pattern 2: Status Icon Mapping

```tsx
import { CheckCircle2, XCircle, Clock } from 'lucide-react'

function getStatusIcon(status: RTIStatus) {
  const icons = {
    answered: CheckCircle2,
    rejected: XCircle,
    pending: Clock
  }
  return icons[status] || Clock
}

export function StatusBadge({ status }: { status: RTIStatus }) {
  const Icon = getStatusIcon(status)
  return (
    <span className={styles[status]}>
      <Icon size={16} />
      {status}
    </span>
  )
}
```

### Pattern 3: Responsive Grid

```css
.grid {
  display: grid;
  gap: var(--grid-gap-md);
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Pattern 4: Color Coding by Threshold

{% raw %}
```tsx
function getPerformanceColor(percentage: number): string {
  if (percentage >= 80) return 'var(--color-status-success)'
  if (percentage >= 60) return 'var(--color-status-warning)'
  return 'var(--color-status-error)'
}

export function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div
      className={styles.bar}
      style={{
        width: `${percentage}%`,
        background: getPerformanceColor(percentage)
      }}
    />
  )
}
```
{% endraw %}

### Pattern 5: Extract Method Refactoring

```tsx
// Before - Long method
export function StoryCard({ story }: StoryCardProps) {
  return (
    <Card>
      <div className={styles.header}>
        <h3>{story.title}</h3>
        <div className={styles.metadata}>
          <Badge>{story.topic}</Badge>
          <span>{story.state}</span>
          {story.district && <span>{story.district}</span>}
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
    </Card>
  )
}

// After - Extracted methods
export function StoryCard({ story }: StoryCardProps) {
  return (
    <Card>
      <StoryHeader story={story} />
      <StoryBody summary={story.summary} />
      <StoryFooter story={story} />
    </Card>
  )
}

function StoryHeader({ story }: { story: RTIStory }) {
  return (
    <div className={styles.header}>
      <h3>{story.title}</h3>
      <StoryMetadata story={story} />
    </div>
  )
}

function StoryMetadata({ story }: { story: RTIStory }) {
  return (
    <div className={styles.metadata}>
      <Badge>{story.topic}</Badge>
      <span>{story.state}</span>
      {story.district && <span>{story.district}</span>}
    </div>
  )
}

function StoryBody({ summary }: { summary: string }) {
  return (
    <div className={styles.body}>
      <p>{summary}</p>
    </div>
  )
}

function StoryFooter({ story }: { story: RTIStory }) {
  return (
    <div className={styles.footer}>
      <span>Filed: {formatDate(story.filedDate)}</span>
      <span>Answered: {formatDate(story.answeredDate)}</span>
      <a href={story.viewLink}>View RTI →</a>
    </div>
  )
}
```

---

## Testing Checklist

### Unit Tests (Each Component)
- [ ] Renders with valid data
- [ ] Handles empty data
- [ ] Handles missing optional props
- [ ] Applies custom className
- [ ] Renders correct text/content
- [ ] Displays correct number of items
- [ ] Links have correct href

### Integration Tests (Organisms)
- [ ] All subsections render
- [ ] Data flows to child components
- [ ] Layout is correct
- [ ] Responsive behavior works

### E2E Tests (Page)
- [ ] Page loads without errors
- [ ] All major sections visible
- [ ] Navigation works
- [ ] Links are clickable
- [ ] Mobile layout works
- [ ] No console errors

### Accessibility Tests
- [ ] No axe violations
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader announces content
- [ ] Color contrast passes WCAG AA
- [ ] Alt text on images

### Performance Tests
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 3.5s

---

## Debugging Tips

### Component Not Rendering
1. Check console for errors
2. Verify props are passed correctly
3. Check CSS module import
4. Verify data structure matches interface

### Styling Issues
1. Inspect element in DevTools
2. Check if CSS variables are defined
3. Verify CSS module class names
4. Check for conflicting global styles

### TypeScript Errors
1. Run `npm run type-check`
2. Verify interface definitions
3. Check import paths
4. Add explicit type annotations

### Performance Issues
1. Use React DevTools Profiler
2. Check for unnecessary re-renders
3. Memoize expensive computations
4. Lazy load below-fold content

---

## Git Workflow

### Branch Strategy
```bash
# Create feature branch
git checkout -b feature/landing-page-atoms

# Commit frequently with clear messages
git commit -m "feat: add StoryCard atom component"
git commit -m "test: add unit tests for StoryCard"
git commit -m "style: fix responsive layout for StoryCard"

# Push to remote
git push origin feature/landing-page-atoms

# Create PR when section complete
```

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semi colons, etc.
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples**:
```
feat(atoms): add StoryCard component

Implement StoryCard atom with lead and secondary variants.
Includes responsive layout and hover effects.

Closes #123
```

---

## Resources

### Documentation
- [Next.js 14 Docs](https://nextjs.org/docs)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [CSS Modules Guide](https://github.com/css-modules/css-modules)
- [Lucide React Icons](https://lucide.dev/guide/packages/lucide-react)
- [Recharts Documentation](https://recharts.org/en-US/)

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Playwright](https://playwright.dev/)

### Design Patterns
- [Refactoring Guru](https://refactoring.guru/)
- [Patterns.dev](https://www.patterns.dev/)
- [React Patterns](https://reactpatterns.com/)

---

## FAQ

### Q: Should I use 'use client' directive?
**A**: Only when needed (useState, useEffect, browser APIs). Most components can be Server Components.

### Q: How do I handle loading states?
**A**: Use Next.js loading.tsx or Suspense boundaries.

### Q: Should components be memoized?
**A**: Only if profiling shows unnecessary re-renders. Don't premature optimize.

### Q: How to handle responsive layouts?
**A**: Use CSS media queries in module.css files. Avoid inline styles.

### Q: Where to put helper functions?
**A**: In `src/lib/utils.ts` or co-locate with component if specific to that component.

### Q: How to test components with charts?
**A**: Mock recharts components or test data transformation logic separately.

### Q: How to handle theme switching?
**A**: Components already use design tokens. Theme switching handled by loading different CSS files.

---

## Support

If you encounter issues:

1. Check the LLD document for detailed specifications
2. Review existing similar components in codebase
3. Check design tokens in `src/styles/design-tokens.css`
4. Run type checker: `npm run type-check`
5. Check console for errors
6. Use React DevTools to inspect props

---

**Happy Coding!** 🚀
