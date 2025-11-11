# RTI Transparency Dashboard - youRTI

A modern, theme-agnostic dashboard for tracking Right to Information (RTI) requests across India, providing insights into government accountability and transparency.

## 🎨 Theme System (NEW!)

The dashboard now features a **flexible theme architecture** that allows instant switching between different visual styles without any code changes:

### Available Themes
- **Newspaper** (Default): High-contrast, sharp edges, serif headlines - classic investigative journalism aesthetic
- **Modern**: Soft colors, rounded corners, smooth shadows - contemporary dashboard feel
- **Easy to Add More**: Create new themes by adding a single CSS file!

### How to Switch Themes
Edit `src/app/layout.tsx` and change the `data-theme` attribute:
```tsx
<html data-theme="newspaper">  // or "modern"
```

## 📐 Architecture

### Theme Abstraction System
The dashboard uses a **3-layer token architecture** for complete theme flexibility:

```
Layer 1: Semantic Tokens (--color-text-primary, --color-bg-elevated)
         ↓
Layer 2: Theme Files (newspaper.css, modern.css)
         ↓
Layer 3: Components (use only semantic tokens)
```

**Benefits:**
- ✅ Add new themes without touching components
- ✅ Switch themes instantly (CSS-only, zero overhead)
- ✅ Components work with any theme automatically

### Layout System
- **Sidebar Navigation**: Fixed sidebar with collapsible mobile menu
- **Compact Header**: Sticky 60px header (vs old 400px hero)
- **Information-Dense Grid**: 12-column responsive layout
- **60% Less Scrolling**: Horizontal space optimization

## Overview

The RTI Transparency Dashboard is built for **Yugantar NGO** to make RTI data accessible and actionable for citizens, journalists, and researchers.

## Features

### Implemented Components

#### Phase 1: Foundation ✅
- **Next.js 14** with App Router and TypeScript
- **Design System** with CSS Variables
  - Complete color palette (black/white base with strategic accent colors)
  - Typography system (Playfair Display, Inter, IBM Plex Mono)
  - 8px spacing grid system
  - Newspaper-style shadows and borders
- **Google Fonts** integration with optimal loading

#### Phase 2: UI Primitives ✅
- **Typography Components** (theme-agnostic)
  - Headline variants (hero, large, medium, small)
  - Body text components
  - Section headers with metadata support
  - Specialized text (bylines, kickers, decks, pull quotes)
- **Card Component** (NEW!)
  - 4 variants: default, elevated, bordered, flat
  - 4 padding sizes: none, sm, md, lg
  - Interactive hover states
  - CardHeader, CardTitle, CardContent, CardFooter subcomponents
- **Badge Component** (with icon support)
  - Status indicators (disclosed, rejected, pending, partial)
  - Optional status icons
  - Theme-agnostic styling
- **Icon System** (NEW!)
  - Lucide React integration
  - 60+ icons available
  - Consistent sizing wrapper

#### Phase 3: Data Display ✅
- **StatCard & StatGrid** (with icon support)
  - Optional icon display
  - Monospace number display
  - Icon-based trend indicators (↑↓→)
  - Theme-agnostic styling
- **DataTable**
  - Clean borders and striped rows
  - Responsive overflow handling
  - Hover effects
- **TrendIndicator**
  - Icon-based indicators
  - Percentage change display
  - Period labels

#### Phase 4: Layout Components ✅ (NEW!)
- **DashboardLayout**
  - Main container combining sidebar and content
  - Responsive behavior
  - Sidebar toggle functionality
- **CompactMasthead**
  - Sticky 60px header
  - Menu toggle button
  - Action buttons (notifications, profile)
- **Sidebar**
  - Fixed navigation sidebar
  - Collapsible on mobile
  - Active state indicators
  - Badge support for notifications

#### Phase 5: Hero Section ✅
- **Masthead**
  - Black/white or inverted styling
  - Edition marker support
  - Responsive typography
- **HeroBanner**
  - Combined masthead and statistics
  - Above-the-fold hero section

### Design Principles

1. **High Contrast**: Pure black (#000000) and white (#FFFFFF) base
2. **Strategic Color**: Accents only for status (green/red/amber/blue)
3. **Newspaper Aesthetic**: Sharp corners, box shadows, clean dividers
4. **WCAG AAA Compliance**: 7:1 color contrast ratios
5. **Mobile-First**: Responsive breakpoints at 480px, 768px, 1024px, 1280px

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + CSS Variables
- **Fonts**: Google Fonts (Playfair Display, Inter, IBM Plex Mono)
- **Charts**: Recharts (planned)
- **Package Manager**: npm (pnpm recommended but using npm due to corepack issues)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd youRTI-UI

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Build for Production

```bash
# Type check
npm run type-check

# Build
npm run build

# Start production server
npm start
```

## Project Structure

```
youRTI-UI/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with fonts
│   │   └── page.tsx            # Homepage
│   ├── components/
│   │   ├── ui/                 # UI primitives
│   │   │   ├── Typography.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Badge.module.css
│   │   ├── layout/             # Layout components
│   │   │   ├── Container.tsx
│   │   │   └── Grid.tsx
│   │   ├── data/               # Data display
│   │   │   ├── StatCard.tsx
│   │   │   ├── DataTable.tsx
│   │   │   └── TrendIndicator.tsx
│   │   └── hero/               # Hero section
│   │       ├── Masthead.tsx
│   │       └── HeroBanner.tsx
│   ├── styles/
│   │   ├── globals.css         # Design tokens & global styles
│   │   ├── typography.css      # Typography system
│   │   └── layout.css          # Layout utilities
│   └── types/
│       └── index.ts            # TypeScript definitions
├── public/                     # Static assets
├── .claude/                    # Claude Code configuration
├── LLD_DOCUMENT.md            # Low-Level Design Document
├── TODO                        # Design specifications
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Development Workflow

Following the project's Claude instructions:

1. **Plan**: Use LLD (design-pattern-architect) agent before coding
2. **Commit**: One file at a time with conventional commits
3. **Document**: Update README after implementing features

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <description>

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore
```

Examples:
- `feat: add Badge component for status indicators`
- `fix: handle null response in user endpoint`
- `docs: update installation instructions`

## Design System

### Colors

```css
/* Primary */
--color-black: #000000
--color-white: #FFFFFF
--color-newsprint: #F5F5F5

/* Status */
--color-alert-red: #DC2626      /* Rejections */
--color-success-green: #16A34A  /* Disclosures */
--color-info-blue: #2563EB      /* Links */
--color-warning-amber: #D97706  /* Pending */
```

### Typography

- **Headlines**: Playfair Display (serif, bold)
- **Body**: Inter (sans-serif, regular/medium)
- **Data/Mono**: IBM Plex Mono (monospace)

### Spacing (8px grid)

```css
--space-2: 0.5rem   /* 8px */
--space-4: 1rem     /* 16px */
--space-6: 1.5rem   /* 24px */
--space-8: 2rem     /* 32px */
```

## Roadmap

### Completed ✅
- [x] Project initialization and configuration
- [x] Design system tokens
- [x] UI primitive components
- [x] Layout system (grid, containers)
- [x] Data display components
- [x] Hero section components
- [x] Example dashboard page

### Planned 📋
- [ ] Chart components (Recharts integration)
- [ ] Card components (RTICard, RevelationCard, StoryCard)
- [ ] Interactive filtering and search
- [ ] Data fetching and API integration
- [ ] Individual RTI detail pages
- [ ] Department and regional breakdown pages
- [ ] Appeals tracker
- [ ] Export functionality
- [ ] User authentication
- [ ] Admin dashboard

## Contributing

This project is maintained by Yugantar NGO. For contributions or issues, please contact the development team.

## License

[Add license information]

## Acknowledgments

- Design inspiration from traditional newspaper layouts
- Built with Next.js and React
- Styled with modern CSS features and design tokens
