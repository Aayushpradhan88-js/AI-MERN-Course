# Dashboard Design System
Version: 1.0
Status: Phase 1 - Dashboard Foundation

---

# Objective

Build a production-ready dashboard system for a modern Job Portal using reusable components, consistent layouts, and scalable architecture.

The dashboard must feel comparable to:

- Vercel Dashboard
- Stripe Dashboard
- Linear
- Notion
- LinkedIn Jobs
- Ashby
- Wellfound

This document defines the rules that every generated component must follow.

Never violate these rules unless explicitly instructed.

---

# Tech Stack

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- Lucide Icons
- React Query
- React Hook Form
- Zod
- Framer Motion
- Recharts

---

# Core Design Principles

1. Reusable before reusable later.
2. No duplicated UI.
3. Composition over inheritance.
4. Server Components by default.
5. Client Components only for interaction.
6. Responsive by default.
7. Accessibility first.
8. Dark Mode supported.
9. Clean visual hierarchy.
10. Premium appearance.

---

# Layout Structure

Dashboard Layout

┌──────────────────────────────┐
│ Navbar                       │
├───────────────┬──────────────┤
│ Sidebar       │              │
│               │ Main Content │
│               │              │
└───────────────┴──────────────┘

---

# Maximum Width

Main content

max-w-screen-2xl

center aligned

padding-x

Desktop

32px

Tablet

24px

Mobile

16px

---

# Layout Spacing

Small

8px

Default

16px

Section

24px

Large

32px

Extra Large

48px

Never invent custom spacing.

Use multiples of 4.

---

# Border Radius

Cards

xl

Buttons

lg

Inputs

lg

Dialogs

xl

Badges

full

---

# Shadows

Cards

shadow-sm

Hover

shadow-md

Dialogs

shadow-xl

Never use heavy shadows.

---

# Typography

Font

Configured through shadcn preset.

Hierarchy

Page Title

text-3xl

Section Title

text-xl

Card Title

text-base

Description

text-sm

Muted

text-muted-foreground

Never hardcode colors.

Use theme variables.

---

# Icons

Only Lucide Icons.

Default

18

Cards

20

Navigation

18

Header

20

Action Button

16

Never mix icon libraries.

---

# Colors

Only use shadcn semantic tokens.

Allowed

background

foreground

card

primary

secondary

accent

muted

destructive

border

ring

popover

Never use hex values.

Never use Tailwind color palettes directly.

---

# Animations

Use Framer Motion.

Duration

200ms

Hover

Scale 1.02

Cards

Fade Up

Dialogs

Scale + Fade

Sidebar

Slide

Do not over animate.

---

# Responsive Rules

Desktop

Sidebar fixed

Tablet

Sidebar collapsible

Mobile

Drawer

Cards

Desktop

4 columns

Tablet

2 columns

Mobile

1 column

---

# Loading States

Always use Skeleton.

Never use centered spinners.

Every page must have loading placeholders.

---

# Empty States

Every table

Empty State

Every list

Empty State

Every chart

Empty State

Every page

CTA Button

Never leave blank areas.

---

# Error States

Every API component

Retry Button

Friendly Message

Technical errors hidden.

---

# Accessibility

Keyboard navigation

Focus visible

ARIA labels

Semantic HTML

Screen reader friendly

---

# Folder Structure

components/

dashboard/

layout/

navigation/

cards/

tables/

charts/

widgets/

shared/

feedback/

forms/

loading/

empty/

---

# Naming Convention

Components

PascalCase

Hooks

camelCase

Files

kebab-case

Types

PascalCase

Interfaces

PascalCase

Enums

UPPER_CASE

---

# Component Rules

Every component

Single Responsibility

Reusable

Strongly Typed

No inline styles

No duplicated logic

Proper props

Proper variants

Children support

Forward refs where necessary

---

# AI Rules

Whenever generating code:

- Follow this design system exactly.
- Never introduce a different spacing scale.
- Never invent new colors.
- Prefer composition.
- Keep components reusable.
- Avoid page-specific implementations.
- Prefer shadcn components.
- Optimize for maintainability.