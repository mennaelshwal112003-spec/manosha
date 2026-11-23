---
name: Apex Commerce
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  price-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a high-precision, conversion-focused e-commerce experience tailored for premium consumer electronics and computing gear. It projects technical authority, reliability, and functional elegance.

### Visual Aesthetic & Philosophy
- **Style:** Clean Modern / Utility-Focused Technical Minimalism.
- **Tone:** Credible, frictionless, performance-driven, and meticulously structured.
- **Target Audience:** Discerning tech buyers, professionals, prosumers, and gamers looking for absolute clarity on specifications, pricing transparency, and rapid checkout.
- **Emotional Response:** Confidence in product authenticity, immediate clarity during technical evaluation, and tactile reassurance during micro-interactions.

## Colors

The palette is engineered for rapid visual hierarchy, technical legibility, and prominent conversion funnels.

### Core Color Roles
- **Primary (`#2563EB`):** High-impact electric blue. Used for primary conversion actions ("Add to Cart", "Buy Now"), active selection states, focus rings, and high-priority progress indicators. Interactive hover state defaults to `#1D4ED8`.
- **Secondary (`#059669`):** Precise emerald green. Reserved for positive stock status ("In Stock", "Ships Today"), discount badges ("Save $200"), and verified buyer indicators.
- **Neutral Surface & Text (`#0F172A` / `#F8FAFC` / `#FFFFFF`):** High-contrast deep slate text (`#0F172A`) against clean stark surfaces (`#FFFFFF` for primary cards and canvas; `#F8FAFC` for secondary backgrounds and specification trays).
- **Structural Borders (`#E2E8F0`):** Crisp, subtle division lines framing technical specs, variant selectors, and product grids without cluttering the screen.

## Typography

The typographic hierarchy pairs **Plus Jakarta Sans** for expressive, geometric headers and price anchors with **Inter** for clean, legible specifications and interface controls.

### Implementation Rules
- **Tabular Figures:** Always apply `font-variant-numeric: tabular-nums` to pricing labels, stock counters, specs comparison tables, and countdown clocks to avoid visual shifting.
- **Tracking:** Headings utilize tight negative letter spacing (-0.01em to -0.02em) to maintain density and punch. Micro badges and category labels use slight positive tracking (+0.01em to +0.02em) for rapid recognition.

## Layout & Spacing

Layouts adhere to an 8-point structural system driving an adaptive 12-column responsive grid on desktop and a flexible 4-column structure on mobile devices.

### Grid & Layout Rules
- **Desktop (1200px+):** 12 columns, 1.5rem (`24px`) gutters, maximum container width of `1360px` centered with variable outer margins.
- **Tablet (768px – 1199px):** 8 columns, 1rem (`16px`) gutters, `1.5rem` horizontal margins.
- **Mobile (< 768px):** 4 columns, 1rem (`16px`) gutters, `1rem` horizontal margins.
- **Vertical Rhythm:** Compact spacing (`space-xs`, `space-sm`) inside individual card items and spec badges; wider spacing (`space-lg`, `space-xl`) separating modular catalog rails, comparison tables, and product detail sections.

## Elevation & Depth

Visual hierarchy uses a refined hybrid of low-contrast hairline borders (`#E2E8F0`) and subtle, ambient drop shadows. Heavy blur drop-shadows are avoided to maintain an orderly technical feel.

### Elevation Hierarchy
- **Level 0 (Flat Canvas):** `#F8FAFC` base page background; `#FFFFFF` for primary sections.
- **Level 1 (Resting Cards & Modules):** `1px solid #E2E8F0` border with soft ambient shadow `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Hover / Active Cards):** `1px solid #CBD5E1` border with elevated hover shadow `0 10px 15px -3px rgba(15, 23, 42, 0.07), 0 4px 6px -4px rgba(15, 23, 42, 0.03)` with a -2px vertical translate transform.
- **Level 3 (Sticky CTAs & Dropdown Overlays):** Floating navigation bars, active filter panels, and quick-view modals use `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)` combined with subtle white backdrop blur (`backdrop-blur-md`).

## Shapes

The interface balances sharp hardware aesthetics with welcoming digital ergonomics through a standardized `roundedness: 2` (base `0.5rem` / `8px` corner radius).

### Radius Hierarchy
- **Base (0.5rem / 8px):** Input fields, standard CTA buttons, specification tags, review containers, and image containers inside cards.
- **Large (1rem / 16px):** Outer product cards, technical specification tables, modular promo banners, and modal dialogs.
- **Full / Pill (9999px):** Category filter pills, status badges ("In Stock", "Save 20%"), and color variant swatches.

## Components

### Buttons & Interactive CTAs
- **Primary CTA:** Deep electric blue (`#2563EB`) background, white text (`#FFFFFF`), `0.5rem` border radius, semi-bold font weight. Active/hover transitions smoothly to `#1D4ED8`. Focus state introduces a 2px offset ring of `#93C5FD`.
- **Secondary CTA:** Clean white surface, `#0F172A` text, outlined with `1px solid #E2E8F0`. On hover, background shifts to `#F8FAFC` and border deepens to `#CBD5E1`.
- **Tertiary / Utility:** Ghost buttons for actions like "Compare Specs" or "Add to Wishlist" with neutral slate icon and text.

### Product Cards
- Encased in a `1rem` rounded container with `1px solid #E2E8F0` on white surface.
- Image area contains an aspect ratio container (1:1 or 4:3) with `#F8FAFC` neutral backdrop to normalize transparent hardware renders.
- Top overlay holds floating badges: stock status (emerald `#059669`) and discount pills.
- Bottom area holds rating stars (warm amber `#F59E0B`), product title, compact spec chips, price group, and an inline rapid "Add to Cart" button.

### Spec Badges & Technical Indicators
- Minimal rectangular chips (`0.25rem` – `0.5rem` radius) utilizing `#F1F5F9` background, `#334155` text, and fine typographic metrics (`label-sm`).
- Used to highlight critical hardware parameters: chipset, RAM, screen refresh rate, or battery life.

### Variant Selectors
- **Color Swatches:** Circular `24px` or `32px` pills with a 2px white internal gap surrounded by a 2px active ring colored `#2563EB`.
- **Storage / Config Options:** Segmented button tiles with `1px solid #E2E8F0`. The active state triggers a blue border (`#2563EB`), soft blue background tint (`#EFF6FF`), and bold tabular pricing.

### Filter Chips & Category Pills
- Fully rounded (`rounded-full`) pill components.
- Unselected: `#FFFFFF` surface with `1px solid #E2E8F0` border and `#475569` text.
- Selected: `#0F172A` fill with `#FFFFFF` text or `#2563EB` fill with `#FFFFFF` text for immediate category navigation.