# Solid State Physics Learning Platform

## Overview

This is an educational web application for solid state physics, providing formulas, exercises, and interactive learning materials. The platform allows users to browse physics formulas organized by topics (crystal structure, band theory, semiconductors, superconductivity, quantum mechanics), work through exercises with solutions, rate content, and participate in community discussions through comments.

The application is built as a full-stack TypeScript application with a React frontend and Express backend, featuring mathematical formula rendering with KaTeX, a component-based UI using shadcn/ui, and PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**: React 18 with Wouter for client-side routing. The application uses a single-page architecture with routes for home, formula details, exercise details, and topic pages.

**UI Component System**: Built on shadcn/ui (New York style) with Radix UI primitives. Components follow a consistent design system with Tailwind CSS for styling, featuring both light and dark themes with CSS variables for theming.

**State Management**: TanStack Query (React Query) handles all server state with aggressive caching (`staleTime: Infinity`). No global client state management - relies on server-driven state and local component state.

**Mathematical Rendering**: KaTeX library renders LaTeX formulas. The `LatexRenderer` component wraps KaTeX rendering with error handling and supports both inline and display modes.

**Design System**: 
- Typography: Inter for UI/body text, JetBrains Mono for code/variables
- Spacing: Tailwind units (2, 4, 8, 16) for consistent rhythm
- Responsive grid: 3-column desktop → 2-column tablet → 1-column mobile
- Elevation system using `hover-elevate` and `active-elevate-2` classes for interactive feedback

### Backend Architecture

**Server Framework**: Express.js with TypeScript running in ES module mode. The server handles both API routes and Vite development middleware.

**API Design**: RESTful endpoints under `/api` prefix:
- `/api/topics` - Topic listing and details
- `/api/formulas` - Formula CRUD operations
- `/api/exercises` - Exercise management
- `/api/comments` - Comment threads with voting
- `/api/ratings` - User ratings for formulas/exercises

**Data Storage Strategy**: Abstracted through `IStorage` interface with in-memory implementation (`MemStorage`) for development. The interface defines all data operations, allowing easy swap to database implementation (Drizzle ORM schema already defined for PostgreSQL migration).

**Development Server**: Vite middleware integration for HMR during development. Custom logging middleware tracks API request timing and responses.

### Data Layer

**ORM**: Drizzle ORM configured for PostgreSQL with schema-first design. Schema definitions use `drizzle-zod` for runtime validation.

**Database Schema**:
- `topics` - Subject categories (crystal structure, band theory, etc.)
- `formulas` - Mathematical formulas with LaTeX, descriptions, derivations
- `exercises` - Problem statements with solutions and explanations
- `comments` - Threaded comments supporting nested replies with voting
- `ratings` - User ratings (1-5 stars) for formulas and exercises

**Data Relationships**: Foreign key relationships link formulas and exercises to topics. Comments use polymorphic associations (`targetType` + `targetId`) to attach to either formulas or exercises. Ratings track per-user scores with aggregated averages.

**Validation**: Zod schemas generated from Drizzle tables provide type-safe validation for inserts/updates.

### Build System

**Bundler**: Vite for frontend with React plugin. TypeScript compilation without emit (type checking only).

**Path Aliases**: 
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

**Production Build**: Frontend builds to `dist/public`, backend bundles with esbuild to `dist/index.js` as ESM.

**Development Workflow**: Concurrent execution - Vite dev server for frontend HMR, tsx for backend with auto-restart.

## External Dependencies

### UI Component Libraries
- **Radix UI**: Headless component primitives (accordion, dialog, dropdown, popover, tabs, etc.) providing accessibility and behavior
- **shadcn/ui**: Pre-styled component collection built on Radix UI with Tailwind CSS
- **Lucide React**: Icon library for UI elements

### Mathematical Rendering
- **KaTeX**: Fast LaTeX rendering engine for mathematical formulas and expressions

### Data Management
- **TanStack Query**: Server state management with caching, invalidation, and optimistic updates
- **React Hook Form**: Form state management with validation
- **Zod**: Runtime schema validation and TypeScript type inference
- **date-fns**: Date formatting and manipulation (Spanish locale for timestamps)

### Database
- **Drizzle ORM**: TypeScript-first ORM for PostgreSQL
- **@neondatabase/serverless**: PostgreSQL driver (configured for Neon but works with any Postgres)
- **drizzle-kit**: Database migration tooling

### Styling
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration
- **class-variance-authority**: Type-safe component variants
- **tailwind-merge**: Utility for merging Tailwind classes

### Build Tools
- **Vite**: Frontend build tool and development server
- **esbuild**: Backend bundler for production
- **TypeScript**: Type system (ESNext target, bundler module resolution)
- **tsx**: TypeScript execution for development server

### Fonts
- **Google Fonts**: Inter (primary) and JetBrains Mono (monospace) loaded via CDN
- **KaTeX fonts**: Mathematical typography via KaTeX CDN

### Session Management (Configured)
- **connect-pg-simple**: PostgreSQL session store for Express (configured but sessions not actively used in current implementation)