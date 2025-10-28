# Design Guidelines: Solid State Physics Learning Platform

## Design Approach

**System-Based Approach**: Drawing from Material Design principles combined with educational platform patterns (Khan Academy, Brilliant), optimized for academic content presentation and mathematical formula readability.

**Core Principles**:
- Clarity above all - formulas and exercises must be immediately scannable
- Structured hierarchy supporting deep topic navigation
- Professional academic aesthetic that builds trust and focus
- Spacious layouts that give mathematical content room to breathe

## Typography System

**Primary Font**: Inter (Google Fonts) - clean, highly legible for UI and body text
**Accent Font**: JetBrains Mono (Google Fonts) - for code snippets or variables
**Mathematical Content**: Handled by KaTeX rendering library

**Scale**:
- Hero/Page Titles: text-4xl (36px) font-bold
- Section Headers: text-2xl (24px) font-semibold
- Subsection Headers: text-xl (20px) font-semibold
- Body Text: text-base (16px) font-normal
- Formula Labels: text-sm (14px) font-medium
- Metadata/Captions: text-xs (12px) font-normal

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 8, and 16 for consistent rhythm
- Component padding: p-4, p-6, p-8
- Section spacing: space-y-8, space-y-12
- Card gaps: gap-4, gap-6
- Container margins: mx-4, mx-8

**Grid System**:
- Desktop: 3-column layout for formula cards (grid-cols-3)
- Tablet: 2-column (md:grid-cols-2)
- Mobile: Single column (grid-cols-1)
- Exercise detail pages: 2-column split (content + metadata sidebar)

**Container Widths**:
- Main content: max-w-7xl
- Formula/Exercise content: max-w-4xl
- Comments section: max-w-3xl

## Page Structures

### Homepage/Formula Library
**Hero Section** (h-96):
- Large, high-quality abstract physics visualization (crystalline structures, band diagrams, or electron orbital patterns)
- Centered title overlay with subtle backdrop blur
- Primary CTA button with blurred background
- Search bar integrated into hero

**Topic Grid** (below hero):
- 3-column grid of topic cards
- Each card: Icon, topic name, formula count badge
- Subtle hover elevation effect

**Featured Formulas Section**:
- Horizontal scrollable carousel of formula cards
- Shows most popular/recent formulas

### Formula Detail Page
**Two-Column Layout**:
- Left (main, 2/3 width): Formula card with large KaTeX rendering, derivation steps, applications
- Right (sidebar, 1/3 width): Related formulas, topic breadcrumbs, difficulty badge, rating display

**Comments Section** (full-width below):
- Threaded comment cards with user avatars
- Reply indentation using ml-8
- Vote buttons (up/down) for helpful comments

### Exercise Pages
**Exercise Card**:
- Problem statement in bordered container with p-6
- Multiple choice or input fields with generous spacing (space-y-4)
- Submit button prominently placed
- Solution reveal with accordion pattern

**Ranking Display**:
- Difficulty stars (1-5) using icon library
- User rating average with vote count
- Personal completion badge if solved

## Component Library

### Navigation
**Top Navigation Bar** (sticky):
- Logo left, search center, user menu right
- Topic dropdown with mega-menu showing all categories
- Height: h-16 with shadow-md

**Sidebar Navigation** (on desktop):
- Collapsible left sidebar (w-64) for topic tree
- Nested topic hierarchy with indentation
- Active state highlighting current topic

### Cards
**Formula Card**:
- Rounded-lg border with shadow-sm
- Padding: p-6
- Formula name header (text-xl font-semibold)
- KaTeX rendered formula centered with my-4
- Tags row at bottom with badge components
- Hover: subtle shadow-lg transition

**Exercise Card**:
- Similar structure to formula card
- Difficulty indicator in top-right corner
- Progress bar if exercise has multiple parts
- Rating stars in footer

### Interactive Elements
**Search Bar**:
- Prominent search input with icon prefix
- Autocomplete dropdown with formula/topic suggestions
- Min-width: w-96 on desktop, full-width mobile

**Rating System**:
- Star rating component (5 stars)
- Click to rate, display average
- Vote count displayed as "(234 ratings)"

**Comment Component**:
- Avatar circle (w-10 h-10) on left
- Username and timestamp header
- Comment text with proper line-height (leading-relaxed)
- Action buttons: reply, upvote/downvote
- Nested replies with ml-12 indentation

### Badges & Tags
**Topic Tags**:
- Rounded-full px-3 py-1
- Small text (text-xs)
- Used for categorization

**Difficulty Badge**:
- Rounded px-2 py-1
- Labels: "Básico", "Intermedio", "Avanzado"

**Status Indicators**:
- "Nuevo" badge for recently added
- Completion checkmark for solved exercises

## Images

**Hero Image**: 
- Full-width abstract visualization of solid state physics concepts
- Options: crystalline lattice structures, band theory diagrams, electron density maps, or superconductor field visualization
- Placement: Homepage hero section background
- Treatment: Subtle gradient overlay for text readability

**Topic Illustrations**:
- Small iconic representations for each physics topic
- Placement: Topic card headers in grid
- Style: Line-art or simplified scientific illustrations

**Formula Diagrams**:
- Supporting diagrams for complex formulas
- Placement: Within formula detail cards
- Examples: Brillouin zones, crystal structures, energy band diagrams

## Animations

**Minimal, purposeful animations**:
- Hover elevation on cards (transition-all duration-200)
- Smooth scrolling for anchors (scroll-smooth)
- Accordion expansion for solutions (transition-height)
- No distracting scroll-triggered animations

## Accessibility

- High contrast text on all backgrounds
- Keyboard navigation for all interactive elements
- ARIA labels on icon buttons
- Focus visible states on all focusable elements
- Alt text on all diagrams and images
- Consistent focus ring: ring-2 ring-offset-2

## Icons

**Library**: Heroicons (via CDN)
- Navigation: menu, search, user icons
- Actions: chevrons, plus, star (for ratings)
- Metadata: clock, tag, bookmark icons
- Social: chat-bubble for comments