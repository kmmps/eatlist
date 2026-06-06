# Eatlist — Design Tokens
### 02 — v1.0

> This file is the single source of truth for all visual values. Reference the [foundations doc](./01-product-foundations.md) for rationale. This file contains only what Claude Code needs to implement correctly.

---

## How to use tokens

**Rule 1 — Never hard-code values.**
Every colour, size, and duration in a component must reference a CSS custom property. If a value isn't in this file, add it here first, then use it.

```css
/* ✓ correct */
color: var(--color-ink);
border: 1px solid var(--color-border);

/* ✗ wrong */
color: #050615;
border: 1px solid #E0D9CF;
```

**Rule 2 — Use semantic tokens in components, primitives only in tokens.css.**
Components reference semantic aliases (`--color-text-primary`), not primitive values (`--color-ink`) — except where no semantic alias exists.

**Rule 3 — tokens.css is imported once, globally.**
All other CSS files import nothing — they consume the custom properties that `:root` already exposes.

---

## tokens.css — complete file

```css
/* ─────────────────────────────────────────────
   tokens.css
   Eatlist design system — v1.0
   Import once in the document <head> or global CSS entry point.
   Never edit values here without updating 02-design-tokens.md.
───────────────────────────────────────────────── */

:root {

  /* ══════════════════════════════════════════
     COLOUR — primitives
     Raw values. Do not use directly in components.
     Use semantic aliases below instead.
  ══════════════════════════════════════════ */

  --primitive-ink:            #050615;
  --primitive-cream:          #F4EFE6;
  --primitive-white:          #FFFFFF;
  --primitive-surface-muted:  #F0EBE1;
  --primitive-cobalt:         #1D38C0;
  --primitive-cobalt-muted:   #E8ECF9;
  --primitive-warm-gray:      #7A7470;
  --primitive-border:         #E0D9CF;
  --primitive-red:            #B5362A;


  /* ══════════════════════════════════════════
     COLOUR — semantic aliases
     These are what components reference.
  ══════════════════════════════════════════ */

  /* Backgrounds */
  --color-bg-page:            var(--primitive-cream);
  --color-bg-card:            var(--primitive-white);
  --color-bg-surface-muted:   var(--primitive-surface-muted);

  /* Text */
  --color-text-primary:       var(--primitive-ink);
  --color-text-secondary:     var(--primitive-warm-gray);
  --color-text-on-accent:     var(--primitive-white);
  --color-text-on-dark:       var(--primitive-white);

  /* Borders */
  --color-border-default:     var(--primitive-border);
  --color-border-strong:      var(--primitive-warm-gray);
  --color-border-focus:       var(--primitive-ink);

  /* DM Sansactive */
  --color-interactive:        var(--primitive-cobalt);
  --color-interactive-muted:  var(--primitive-cobalt-muted);
  --color-interactive-text:   var(--primitive-cobalt);

  /* Status */
  --color-destructive:        var(--primitive-red);
  --color-destructive-muted:  #FAF0EE;

  /* Focus */
  --color-focus-ring:         var(--primitive-ink);


  /* ══════════════════════════════════════════
     TYPOGRAPHY
  ══════════════════════════════════════════ */

  --font-display: 'Fraunces', Georgia, serif;
  --font-ui:      'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Scale */
  --text-xs:      11px;
  --text-sm:      13px;
  --text-base:    15px;
  --text-md:      17px;
  --text-lg:      20px;
  --text-xl:      24px;
  --text-2xl:     32px;
  --text-3xl:     40px;
  --text-display: 56px;

  /* Line heights */
  --leading-tight:   1.1;
  --leading-snug:    1.2;
  --leading-normal:  1.4;
  --leading-relaxed: 1.5;
  --leading-loose:   1.6;

  /* Letter spacing */
  --tracking-tight:  -0.02em;
  --tracking-normal:  0;
  --tracking-wide:    0.04em;
  --tracking-wider:   0.06em;
  --tracking-widest:  0.08em;

  /* Weights */
  --font-weight-regular:  400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;


  /* ══════════════════════════════════════════
     SPACING
     Base unit: 4px. All values are multiples of 4.
  ══════════════════════════════════════════ */

  --space-0:   0px;
  --space-1:   4px;
  --space-2:   8px;
  --space-3:   12px;
  --space-4:   16px;
  --space-5:   20px;
  --space-6:   24px;
  --space-8:   32px;
  --space-10:  40px;
  --space-12:  48px;
  --space-16:  64px;
  --space-20:  80px;
  --space-24:  96px;

  /* Semantic spacing */
  --space-page-margin:     16px;
  --space-page-margin-md:  24px;
  --space-card-padding:    16px;
  --space-section-gap:     32px;
  --space-stack-xs:         4px;
  --space-stack-sm:         8px;
  --space-stack-md:        16px;
  --space-stack-lg:        24px;
  --space-inline-sm:        8px;
  --space-inline-md:       12px;
  --space-inline-lg:       16px;


  /* ══════════════════════════════════════════
     BORDER RADIUS
  ══════════════════════════════════════════ */

  --radius-none:  0px;
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:    12px;
  --radius-xl:    16px;
  --radius-pill:  9999px;


  /* ══════════════════════════════════════════
     BORDERS
  ══════════════════════════════════════════ */

  --border-width-default: 1px;
  --border-width-focus:   2px;
  --border-width-ring:    3px;

  --border-default: var(--border-width-default) solid var(--color-border-default);
  --border-strong:  var(--border-width-default) solid var(--color-border-strong);
  --border-focus:   var(--border-width-focus)   solid var(--color-border-focus);


  /* ══════════════════════════════════════════
     SHADOWS
     Eatlist uses borders for elevation, not shadows.
     The one exception is focus rings (via outline).
     box-shadow is reserved for floating overlays only.
  ══════════════════════════════════════════ */

  --shadow-none:    none;
  --shadow-overlay: 0 8px 24px rgba(5, 6, 21, 0.12);   /* modals, dropdowns */
  --shadow-sheet:   0 -2px 16px rgba(5, 6, 21, 0.08);  /* bottom sheets */


  /* ══════════════════════════════════════════
     MOTION
  ══════════════════════════════════════════ */

  --duration-instant: 80ms;
  --duration-fast:    150ms;
  --duration-base:    250ms;
  --duration-slow:    400ms;
  --duration-crawl:   600ms;

  --ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1.0);
  --ease-in:     cubic-bezier(0.4, 0.0, 1.0, 1.0);
  --ease-inout:  cubic-bezier(0.4, 0.0, 0.2, 1.0);
  --ease-linear: linear;


  /* ══════════════════════════════════════════
     Z-INDEX
     Explicit stacking order. Never use arbitrary values.
  ══════════════════════════════════════════ */

  --z-base:       0;
  --z-raised:     10;    /* cards on hover */
  --z-dropdown:   100;   /* dropdowns, tooltips */
  --z-sticky:     200;   /* sticky headers */
  --z-nav:        300;   /* bottom tab bar */
  --z-overlay:    400;   /* modal backdrops */
  --z-modal:      500;   /* modals, sheets */
  --z-toast:      600;   /* toasts, confirmations */


  /* ══════════════════════════════════════════
     LAYOUT
  ══════════════════════════════════════════ */

  --max-content-width: 1200px;
  --nav-height-mobile: 56px;    /* bottom tab bar */
  --nav-height-desktop: 64px;   /* top nav on web */


  /* ══════════════════════════════════════════
     FOCUS RING (global)
     Applied via the global rule below.
  ══════════════════════════════════════════ */

  --focus-ring-width:  3px;
  --focus-ring-offset: 2px;
  --focus-ring-color:  var(--color-focus-ring);

}


/* ─────────────────────────────────────────────
   GLOBAL FOCUS RULE
   Apply to all interactive elements.
   Never remove without a custom replacement.
───────────────────────────────────────────────── */

:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

:focus:not(:focus-visible) {
  outline: none;
}


/* ─────────────────────────────────────────────
   PAGE BASE
───────────────────────────────────────────────── */

html {
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
}

body {
  background-color: var(--color-bg-page);
  color: var(--color-text-primary);
  font-family: var(--font-ui);
  font-size: var(--text-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--leading-loose);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


/* ─────────────────────────────────────────────
   REDUCED MOTION
   All animations must check this preference.
───────────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Typography usage table

Reference this table when choosing a type style. Font, size, weight, and line-height are all required for every text element.

| Role | Font | Token | Weight | Line height | Usage |
|---|---|---|---|---|---|
| Page display | Fraunces | `--text-display` | 300 | `--leading-tight` | Full-screen onboarding only |
| Section display | Fraunces | `--text-3xl` | 300 | `--leading-tight` | Campaign/landing moments |
| Empty state headline | Fraunces | `--text-2xl` | 300 | `--leading-snug` | Empty states |
| Section header | Fraunces | `--text-xl` | 300 | `--leading-normal` | List section titles |
| Minor heading | Fraunces | `--text-lg` | 300 | `--leading-normal` | Sub-sections |
| Restaurant name | DM Sans | `--text-md` | `--font-weight-semibold` | `--leading-relaxed` | Card title |
| Body / notes | DM Sans | `--text-base` | `--font-weight-regular` | `--leading-loose` | Descriptions, body copy |
| Notes textarea | **Fraunces** | `--text-base` | `--font-weight-regular` | `--leading-loose` | Personal note field only |
| UI label | DM Sans | `--text-sm` | `--font-weight-semibold` | `--leading-relaxed` | Form labels |
| Metadata | DM Sans | `--text-sm` | `--font-weight-regular` | `--leading-relaxed` | Cuisine, neighbourhood, date |
| Button | DM Sans | `--text-sm` | `--font-weight-semibold` | 1 | CTA text |
| Tag / chip | DM Sans | `--text-xs` | `--font-weight-medium` | 1 | Tags, status chips |
| Caption / timestamp | DM Sans | `--text-xs` | `--font-weight-regular` | `--leading-normal` | Fine print, timestamps |
| Nav label | DM Sans | `--text-xs` | `--font-weight-regular` | 1 | Bottom tab bar labels |

### Typography rules
- Fraunces appears **only** in the roles marked above. Use DM Sans for everything else — when in doubt, use DM Sans.
- The **only** place Fraunces appears in functional UI is the notes textarea.
- Never set body text below `--text-sm` (13px).
- Letter spacing `--tracking-wider` or above is for uppercase labels only.
- Do not set `font-style: italic` on DM Sans — only on Fraunces.

---

## Spacing usage table

| Token | Value | Semantic use |
|---|---|---|
| `--space-1` | 4px | Icon-to-label gap, tight internal padding |
| `--space-2` | 8px | Stack between inline elements, small gaps |
| `--space-3` | 12px | Horizontal button padding (compact), tag padding |
| `--space-4` | 16px | Card padding, page margin (mobile), standard stack |
| `--space-5` | 20px | Form group gap |
| `--space-6` | 24px | Button horizontal padding, page margin (tablet+) |
| `--space-8` | 32px | Section gap, major stack between groups |
| `--space-10` | 40px | Large section separation |
| `--space-12` | 48px | Page top padding |
| `--space-16` | 64px | Hero vertical padding |
| `--space-20+` | 80px+ | Full-screen layout spacing |

### Spacing rules
- **All spacing values must be 4px multiples.** No exceptions.
- Use semantic tokens (`--space-page-margin`) over raw scale tokens in layout components.
- Never reduce `--space-page-margin` on mobile below 16px.
- Between list items: minimum `--space-2` (8px).
- Between cards in a grid: minimum `--space-3` (12px).

---

## Radius usage table

| Token | Value | Use |
|---|---|---|
| `--radius-none` | 0px | Full-bleed images, editorial dividers, table cells |
| `--radius-sm` | 4px | Text inputs, inline badges, compact chips |
| `--radius-md` | 8px | Cards, primary/secondary buttons |
| `--radius-lg` | 12px | Bottom sheets, modals, dialogs |
| `--radius-xl` | 16px | Photo containers in detail view, floating panels |
| `--radius-pill` | 9999px | Tags, chips, avatar rings — nothing else |

### Radius rules
- `--radius-pill` is for tags and chips **only**. Do not use on buttons.
- Never mix radius values within a single component (e.g., a card that uses both `--radius-md` and `--radius-lg`).
- Detail card photos use `--radius-xl` on top corners only: `border-radius: var(--radius-xl) var(--radius-xl) 0 0`.
- Never use `border-radius: 50%` on non-square or non-circular elements.

---

## Z-index rules

- **Never use an arbitrary z-index value.** Always reference a `--z-*` token.
- The bottom tab bar sits at `--z-nav` (300) — always above page content, always below modals.
- Toast notifications sit at `--z-toast` (600) — always the topmost layer.
- If you need to stack two elements at the same layer, add a `--z-*` sub-token rather than offsetting by 1.

---

## Motion rules

- **Duration:** Choose the closest token to your intended feel. Do not interpolate (no `200ms`).
- **Easing:** `--ease-out` for elements entering the screen. `--ease-in` for elements leaving. `--ease-inout` for position changes.
- **Never use spring or bounce** (`cubic-bezier` with control points > 1).
- **All transitions must be wrapped** in a `prefers-reduced-motion` media query fallback (provided in the tokens.css base above).
- Maximum simultaneous animated elements: 2.

---

## Breakpoints

```css
/* These are not tokens — use them as media query values directly. */

/* Mobile first — base styles apply from 0px */
/* Tablet */
@media (min-width: 768px)  { ... }
/* Desktop */
@media (min-width: 1024px) { ... }
/* Wide */
@media (min-width: 1280px) { ... }
```

---

## Font loading

Add to document `<head>` before any CSS:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&display=swap" rel="stylesheet">
```

If self-hosting: use `font-display: swap` on all `@font-face` declarations.

---

## Token acceptance criteria

Before any component ships, verify:

- [ ] No hex colour values exist in component CSS — all colours use `var(--color-*)` or `var(--primitive-*)` tokens
- [ ] No raw pixel values for spacing — all spacing uses `var(--space-*)` tokens
- [ ] No raw pixel values for radius — all radius uses `var(--radius-*)` tokens
- [ ] No raw `ms` duration values — all transitions/animations use `var(--duration-*)` tokens
- [ ] No arbitrary z-index numbers — all stacking uses `var(--z-*)` tokens
- [ ] `prefers-reduced-motion` is respected by all animated elements
- [ ] `:focus-visible` ring is visible on all interactive elements

---

*Eatlist Design Tokens — v1.0*
