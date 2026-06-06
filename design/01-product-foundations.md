# Eatlist — Product Foundations
### 01 — v1.0

> Eatlist is a personal archive of places worth remembering.

---

## 1. Mission

Eatlist is a personal archive of places worth remembering. Not a discovery platform, not a review site, not a social feed — a quiet, opinionated tool for people who care about where they eat and want to hold onto why it mattered.

The product exists to help people save, organise, remember, and occasionally share restaurants — with the same care they'd give to a notebook they carry everywhere.

---

## 2. Product Principles

**Archive, don't overwhelm.**
The app stores memory, not noise. Every element earns its place. If something doesn't help the user remember or find a place, it shouldn't exist.

**Personal by default.**
Eatlist is for you first. Sharing is an option, not the point. The product should never feel like it's performing for an audience.

**Quiet UI, expressive brand.**
The product interface stays calm and functional. Brand expression lives in illustration, empty states, and moments between interactions — not in the chrome of every screen.

**Clarity over decoration.**
Functional elements are never decorative. Decorative elements are never functional. These two things do not overlap in the product UI.

**Memory, not discovery.**
Eatlist doesn't suggest where to go. It helps you remember where you've been and where you mean to go. This distinction shapes every product decision.

---

## 3. Brand Expression vs Product UI

Eatlist has two registers. They must be kept distinct.

### Brand world
Applies to: campaigns, landing pages, social assets, launch materials, posters, editorial content.

- Expressive, editorial type pairings (including handwritten/script accents)
- Photo collage, film-grain textures, archival layering
- Bold graphic illustration, culture-forward composition
- More colour, more density, more personality
- Can be loud, collage-like, expressive

### Product UI
Applies to: all app screens, functional flows, components, and interactive patterns.

- Handwritten/expressive fonts: **never** for functional UI text
- Illustration: empty states and onboarding only — not background decoration on active screens
- Photography: personal, memory-evoking, not styled food shots
- Typography: editorial serif (Fraunces) for display headlines only; DM Sans for all body and UI text
- Colour: cream base, ink text, cobalt accent used sparingly

> **The rule:** if a user needs to read it to use the app, it must be in DM Sans. If it's a moment of brand expression, it can reach for Fraunces or illustration.

---

## 4. Colour

### Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-ink` | `#050615` | Primary text, borders, logo, icons. Deep navy-black. Taken directly from the wordmark. |
| `--color-cream` | `#F4EFE6` | App background. Warm parchment — the page everything sits on. |
| `--color-surface` | `#FFFFFF` | Card backgrounds, elevated surfaces. |
| `--color-surface-muted` | `#F0EBE1` | Secondary surfaces, input backgrounds, hover states. |
| `--color-accent` | `#1D38C0` | CTAs, active states, selected tags, brand highlights. Deep cobalt. Editorial and archival — never food-generic. |
| `--color-accent-muted` | `#E8ECF9` | Accent background tints, selected chip fills. |
| `--color-text-secondary` | `#7A7470` | Secondary labels, metadata, captions, timestamps. |
| `--color-border` | `#E0D9CF` | Card borders, input borders, dividers. Warm and soft. |
| `--color-destructive` | `#B5362A` | Errors, delete actions only. |

### Semantic tokens

```css
--color-bg-page:       var(--color-cream)
--color-bg-card:       var(--color-surface)
--color-text-primary:  var(--color-ink)
--color-text-muted:    var(--color-text-secondary)
--color-interactive:   var(--color-accent)
--color-focus-ring:    var(--color-ink)
```

### Contrast (WCAG AA)

- Ink `#050615` on Cream `#F4EFE6`: **≈ 15:1** ✓ (AAA)
- Secondary `#7A7470` on Cream `#F4EFE6`: **≈ 4.6:1** ✓ (AA)
- Accent `#1D38C0` on White `#FFFFFF`: **≈ 7.5:1** ✓ (AA for all text sizes)
- White on Accent `#1D38C0`: **≈ 7.5:1** ✓

### Do / Don't

**Do:**
- Use ink on cream for all primary text
- Use accent for a single interactive element or highlight per screen
- Keep page backgrounds strictly cream or white in product

**Don't:**
- Use pure `#000000` — always use ink `#050615`
- Introduce additional brand colours into product UI
- Use the accent colour for body text decoration
- Use food-generic greens, oranges, or reds anywhere in the product

---

## 5. Typography

### Typefaces

**Display: Fraunces**
Variable serif, available via Google Fonts. Literary, warm, a little eccentric — right for headlines, section titles, empty state headings, and brand moments within the product. Use the italic axis for occasional editorial emphasis.

**UI / Body: DM Sans**
Variable sans-serif, slightly more characterful than a purely neutral grotesque. Legible, warm, widely supported. Used for all functional text: body copy, labels, inputs, navigation, buttons, metadata.

**Brand accent (brand world only)**
A handwritten or expressive script may appear in campaign assets, social, and launch materials. It is never used in functional product UI.

### Type scale

| Token | Size | Line height | Font | Usage |
|---|---|---|---|---|
| `--text-xs` | 11px | 1.4 | DM Sans | Timestamps, fine print |
| `--text-sm` | 13px | 1.5 | DM Sans | Metadata, tags, captions |
| `--text-base` | 15px | 1.6 | DM Sans | Body text, notes, descriptions |
| `--text-md` | 17px | 1.5 | DM Sans | Restaurant name in cards, form labels |
| `--text-lg` | 20px | 1.4 | Fraunces | Minor section headings |
| `--text-xl` | 24px | 1.3 | Fraunces | Section headers |
| `--text-2xl` | 32px | 1.2 | Fraunces | Empty state headlines, screen titles |
| `--text-3xl` | 40px | 1.15 | Fraunces | Onboarding, marketing within app |
| `--text-display` | 56px | 1.1 | Fraunces | Full-screen moments only |

### Weight tokens

```css
--font-weight-regular:  400
--font-weight-medium:   500
--font-weight-semibold: 600
--font-weight-bold:     700
```

### Heading hierarchy

There are two distinct heading roles in the product. They must look different.

**Section label** — identifies a group of content on a screen (e.g. "Seus amigos", "Mapa", "Adicionados recentemente"). It is navigation/wayfinding text — the user reads it to orient themselves, not to engage with it.
- Font: DM Sans, `--font-weight-semibold`
- Size: `--text-sm` (13px)
- Colour: `--color-text-secondary`
- Transform: uppercase, `letter-spacing: 0.08em`

**Content title** — the name or headline of a piece of content (e.g. a list name, a restaurant name in a detail header, an empty state headline). The user engages with this directly.
- Font: Fraunces, regular
- Size: `--text-xl` (24px) for list/section titles; `--text-2xl` (32px) for screen-level titles
- Colour: `--color-ink`

> **Rule:** section labels shrink and step back. Content titles occupy space. The visual contrast between the two must be immediately legible.

### Usage guidance

- Restaurant name in list card: `--text-md`, DM Sans, `--font-weight-semibold`
- Section label (e.g. "Seus amigos"): `--text-sm`, DM Sans, `--font-weight-semibold`, uppercase, `--color-text-secondary`
- Content title (e.g. list name, screen heading): `--text-xl` or `--text-2xl`, Fraunces, regular
- Body / notes field: `--text-base`, DM Sans, regular
- Metadata (cuisine type, neighbourhood): `--text-sm`, DM Sans, regular, `--color-text-secondary`
- Buttons / CTAs: `--text-sm`, DM Sans, `--font-weight-semibold`
- Empty state headline: `--text-2xl`, Fraunces, regular
- Notes textarea font: Fraunces `--text-base` — personal, journalistic, not clinical

### Do / Don't

**Do:**
- Use Fraunces exclusively for display/editorial moments
- Use DM Sans for all functional UI without exception
- Maintain hierarchy through size and weight, not decoration
- Allow Fraunces italic for pull quotes or personal note previews

**Don't:**
- Use handwritten or script fonts for any text the user must read to complete a task
- Use more than two typefaces on a single screen
- Set body text below 13px / `--text-sm`
- Use all-caps for body text

---

## 6. Spacing

**Base unit: 4px.** All spacing values are multiples of 4.

### Scale

```css
--space-0:   0px
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
--space-20:  80px
--space-24:  96px
```

### Semantic spacing

```css
--space-page-margin:    16px  /* mobile */
--space-page-margin-md: 24px  /* tablet+ */
--space-card-padding:   16px
--space-section-gap:    32px
--space-stack-sm:       8px
--space-stack-md:       16px
--space-stack-lg:       24px
--space-inline-sm:      8px
--space-inline-md:      12px
```

### Do / Don't

**Do:**
- Always use 4px multiples — no exceptions
- Give content room to breathe; err toward more space, not less
- Use `--space-section-gap` (32px) consistently between major sections

**Don't:**
- Use odd pixel values (3px, 7px, 13px)
- Compress cards or list items to fit more content
- Reduce page margins on mobile below 16px

---

## 7. Radius

```css
--radius-none:  0px      /* editorial dividers, full-bleed images */
--radius-sm:    4px      /* inputs, inline badges, small chips */
--radius-md:    8px      /* cards, buttons */
--radius-lg:    12px     /* bottom sheets, modals */
--radius-xl:    16px     /* large image containers, floating panels */
--radius-pill:  9999px   /* chips, tags, avatar rings */
```

### UI implications
Eatlist uses a slightly soft but grounded radius. The goal is archival warmth, not the playful roundness of delivery or consumer apps. Cards use `--radius-md` (8px) — substantial enough to feel structured, not bubbly.

### Do / Don't

**Do:**
- Use `--radius-pill` for tags and chips exclusively
- Keep radius values consistent within component families
- Use `--radius-none` for full-bleed photography or editorial dividers

**Don't:**
- Use `border-radius: 50%` on non-circular elements
- Mix radius values within the same component
- Use `--radius-xl` in dense list views — it creates visual noise

---

## 8. Grid

### Mobile (default)
- Columns: 4
- Gutter: 16px
- Page margin: 16px
- Max content width: 100%

### Tablet (≥ 768px)
- Columns: 8
- Gutter: 24px
- Page margin: 24px

### Desktop (≥ 1024px — web companion, share pages)
- Columns: 12
- Gutter: 24px
- Page margin: 48px
- Max content width: 1200px

### Layout patterns in product
- **Single-column list**: restaurant list, notes, search results
- **2-column grid**: compact card view, photo grid
- **Full-width**: map view, photo detail, full-screen onboarding

### Do / Don't

**Do:**
- Align everything to the 4-column grid on mobile
- Use generous top padding on section headers (min `--space-8`)
- Centre single-column content with consistent page margins

**Don't:**
- Break the grid for decorative reasons
- Use 3-column grids on mobile — too tight for restaurant content
- Let content run full-bleed past page margins in list views (exception: photography)

---

## 9. Cards

Cards are the primary container for restaurant data. The design and feel of a card determines the feel of the entire app.

### List card (compact)
- Min height: 72px
- Padding: `--space-4` (16px)
- Radius: `--radius-md` (8px)
- Background: `--color-surface`
- Border: 1px solid `--color-border`
- Shadow: none — use border, not shadow, for elevation
- Contains: name, cuisine tag, neighbourhood, status indicator, optional thumbnail (60×60px, `--radius-sm`)

### Detail card (expanded)
- Photo: full-width, 3:2 ratio, `--radius-xl` on top corners only
- Content padding: `--space-4`
- Name: `--text-md`, semibold
- Secondary info: `--text-sm`, `--color-text-secondary`
- Note preview: `--text-sm`, Fraunces, italic — personal, not clinical
- Action row: save, share, map — icon buttons at 44×44px

### Share card
- Format: square (1:1) for social export
- Brand moment: cream bg, cobalt accent, Fraunces display type
- Includes logomark
- Not a functional screen — this is a brand world output

### Do / Don't

**Do:**
- Keep card structure consistent across list and detail views
- Use 1px borders over shadows — feels archival, not material/elevated
- Minimum 8px gap between list items
- Allow cards to breathe — never compress to show more content

**Don't:**
- Add drop shadows to list cards
- Use coloured card backgrounds (always white or cream)
- Show more than 3 visible metadata fields per compact card
- Style cards like feed posts (no like counts, no social signals)

---

## 10. Tags / Chips

Used for: cuisine type, neighbourhood, status (visited / want to go / on the list), dietary notes.

### Sizes

| Size | Height | H. padding | Font |
|---|---|---|---|
| Default | 28px | 12px | `--text-xs`, DM Sans |
| Compact | 22px | 8px | `--text-xs`, DM Sans |

All chips use `--radius-pill`.

### Variants

| Variant | Background | Border | Text |
|---|---|---|---|
| Default | transparent | 1px `--color-border` | `--color-text-primary` |
| Active | `--color-ink` | none | white |
| Accent | `--color-accent-muted` | none | `--color-accent` |
| Muted | `--color-surface-muted` | none | `--color-text-secondary` |

### Do / Don't

**Do:**
- Use the default (outlined) variant for filters and selectable categories
- Use the active variant clearly to show selection state
- Keep tag labels to 1–2 words

**Don't:**
- Show more than 3 tags on a compact list card
- Use coloured tags to differentiate cuisine types — that's food-app cliché
- Mix variants in the same context without purpose

---

## 11. Forms and Inputs

### Input field

- Height: 48px
- Padding: 12px horizontal, 14px vertical
- Border: 1px solid `--color-border`
- Border radius: `--radius-sm` (4px)
- Font: DM Sans, `--text-base`, regular
- Label: above the field, `--text-sm`, semibold, `--color-text-primary`
- Placeholder: `--color-text-secondary`
- Background: `--color-surface`

### States

| State | Border | Background |
|---|---|---|
| Default | `--color-border` | `--color-surface` |
| Focus | `--color-ink` (2px) + 3px focus ring | `--color-surface` |
| Filled | `--color-border` | `--color-surface` |
| Error | `--color-destructive` | `--color-surface` |
| Disabled | `--color-border` | `--color-surface-muted` |

### Textarea (notes)

- Min height: 120px
- Same border and padding as input
- Font: **Fraunces**, `--text-base`, regular — notes feel personal and journalistic, not like a form field
- Resize: vertical only

### Primary button

- Height: 48px
- Padding: 0 `--space-6` (24px)
- Background: `--color-ink`
- Text: white, DM Sans, `--text-sm`, semibold
- Radius: `--radius-md` (8px)
- Hover: opacity 0.88

### Secondary button

- Same height
- Background: transparent
- Border: 1px solid `--color-ink`
- Text: `--color-ink`

### Do / Don't

**Do:**
- Place label above the input — always
- Use 44px+ touch targets on all interactive elements
- Show error messages inline, directly below the field
- Use Fraunces for the notes textarea — the only exception to DM Sans-for-UI-text

**Don't:**
- Use floating labels (they break consistency and accessibility)
- Use placeholder text as a substitute for a label
- Style primary buttons as pills (too playful)
- Use more than one primary button per screen

---

## 12. Navigation

### Mobile bottom tab bar

- Max 5 tabs (recommended: List, Map, Add, Search, Profile)
- Height: 56px + safe-area-inset-bottom
- Background: `--color-surface`, 1px top border `--color-border`
- Icons: 24px, outline style
- Labels: `--text-xs`, always visible
- Active: `--color-ink`, icon + label
- Inactive: `--color-text-secondary`, icon + label
- Add/Save: may use `--color-accent` as the one standout action

### In-app navigation

- Section titles: Fraunces `--text-xl`, left-aligned
- Back navigation: chevron + label, top-left, `--text-sm`, DM Sans
- Close (sheets, modals): × icon, top-right, 44×44px tap target
- No hamburger menus

### Do / Don't

**Do:**
- Use standard bottom tab bar on mobile — don't reinvent navigation
- Keep tab labels to one word
- Maintain the tab bar on scroll (except in full-screen map view)

**Don't:**
- Use a hamburger or side drawer on mobile
- Use gesture-only navigation without visible affordances
- Place more than 5 tabs in the bottom bar

---

## 13. Iconography

### Style
- Stroke weight: 1.5–2px, consistent with the logomark
- Grid: 24×24px standard, 20×20px compact, 16×16px inline
- Line caps: slightly rounded
- Style: outline only — no filled icons in UI navigation
- Corner treatment: slightly rounded, not sharp-geometric

### Recommended library
Phosphor Icons (regular weight) or Lucide Icons. Either is consistent with the Eatlist line quality. Use a single library — never mix.

### Colour
- Primary icons: `--color-ink`
- Secondary / inactive: `--color-text-secondary`
- Active in navigation: `--color-ink`
- Never use accent colour for icons unless specifically a CTA-adjacent affordance

### Logomark as icon
The hand-drawn logomark may appear as a brand icon in: splash/loading screens, authentication screens, empty state illustrations, and share card watermarks. It is not a functional UI icon.

### Do / Don't

**Do:**
- Use consistent weight throughout — one icon library, one weight
- Pair icons with text labels in navigation

**Don't:**
- Mix filled and outline icons in the same view
- Use food-themed icons (fork, knife, plate, chef hat) as navigation elements
- Use emoji as functional icons
- Use the logomark in tab bars or button labels

---

## 14. Photography

### Direction
Eatlist photography should feel like personal memory. Not food photography, not styled overhead shots, not delivery-app hero images. Think of a film photo taken at a table, or a street-level photo of a door someone walked through. Imperfect framing is not a failure — it's authenticity.

### Style
- Warm, slightly underexposed, filmic
- High contrast B&W is appropriate and encouraged
- Natural light preferred over flash or studio
- No overhead food styling, no garnished plating shots
- Personal and candid over polished and composed

### Aspect ratios
| Context | Ratio |
|---|---|
| Card thumbnail | 3:2 |
| Detail header | 4:3 |
| Square thumbnail | 1:1 |
| Share card | 1:1 |
| Full-bleed detail | 16:9 |

### Product behaviour
- Photos are user-generated — the UI must never compete with them
- Background behind photos: always white or cream
- No colour filters applied by the app — never process user photos
- Use `object-fit: cover` at all aspect ratios
- Provide thoughtful empty states when no photo exists (illustration, not a grey box)

### Do / Don't

**Do:**
- Let imperfect, personal photos be the hero
- Treat photos as memory anchors, not menu previews
- Provide warm, illustrated empty states when no photo is present

**Don't:**
- Use stock photography anywhere in the product UI
- Show overhead food shots as default/reference imagery
- Apply filters, vignettes, or colour treatments to user photos
- Use food photography to fill space in empty states

---

## 15. Graphic Marks and Illustration

### Role
Illustration gives Eatlist warmth and personality without adding noise to functional flows. It appears only in: empty states, onboarding screens, loading states, and special moments (first save, first list created, a return to the app after a long absence).

### Style
- Hand-drawn line art, consistent with the logomark in weight and feel
- Stroke weight: 2px — matching the logomark stroke
- Colour: ink (`--color-ink`) or accent (`--color-accent`) only — never multicolour in product
- Subject matter: abstract, gestural, cultural — not literal food imagery
- Geometric + organic: loose shapes, gestures, architectural suggestions, hands, places
- Never a pizza, never a fork, never a generic food icon

### Illustration vs. logomark
The logomark is its own mark. Custom illustrations in the product should feel like they come from the same hand — loose, personal, not geometric or icon-kit derived.

### Do / Don't

**Do:**
- Use illustration in empty states to make "nothing here yet" feel inviting, not broken
- Keep illustrations small and purposeful — they support content, they don't replace it
- Match the 2px stroke weight of the logomark

**Don't:**
- Use illustration as background decoration in active, populated screens
- Use multicolour illustration in product UI
- Draw literal food as illustration (too generic, food-app cliché)
- Use illustration to avoid writing good empty state copy — they should work together

---

## 16. Motion

### Principle
Motion in Eatlist is a quiet companion. It guides attention, confirms actions, and creates continuity. It is never a spectacle, never decorative, never a reward.

### Duration tokens

```css
--duration-instant:  80ms   /* micro-interactions: checkbox, toggle */
--duration-fast:     150ms  /* hover, focus, small state changes */
--duration-base:     250ms  /* card expand, page transitions */
--duration-slow:     400ms  /* modals, bottom sheets entering */
--duration-crawl:    600ms  /* onboarding, empty state reveal */
```

### Easing

```css
--ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1.0)  /* entering */
--ease-in:     cubic-bezier(0.4, 0.0, 1.0, 1.0)  /* leaving */
--ease-inout:  cubic-bezier(0.4, 0.0, 0.2, 1.0)  /* position changes */
```

### Patterns

| Pattern | Duration | Easing | Notes |
|---|---|---|---|
| List item load | `--duration-fast` | `--ease-out` | Stagger 40ms between items, opacity 0→1 + translate Y 8px→0 |
| Card expand | `--duration-base` | `--ease-out` | Scale + opacity |
| Bottom sheet open | `--duration-slow` | `--ease-out` | Slide up from bottom |
| Bottom sheet close | `--duration-fast` | `--ease-in` | Slide down |
| Page transition | `--duration-base` | `--ease-inout` | Fade-through |
| Empty state illustration | `--duration-crawl` | `--ease-out` | Stroke draw-on animation |
| Toast / confirmation | `--duration-fast` | `--ease-out` | Fade + slide up, auto-dismiss |

### Do / Don't

**Do:**
- Prefer fade + translate over scale for content-heavy transitions
- Always include a `prefers-reduced-motion` fallback with no animation
- Keep motion invisible to users who aren't looking for it

**Don't:**
- Use spring or bounce physics — feels playful, not archival
- Animate more than 2 elements simultaneously
- Use motion as the sole indicator of a state change
- Add motion to purely static content

---

## 17. Focus States and Accessibility

### Focus ring

```css
outline: 3px solid var(--color-ink);
outline-offset: 2px;
```

Applied to: all interactive elements — buttons, inputs, links, cards (when keyboard-navigable), chips, tab bar items.

Never remove the focus ring without a custom replacement.

### Contrast requirements (WCAG AA minimum)

| Pairing | Contrast | Level |
|---|---|---|
| Ink `#050615` on Cream `#F4EFE6` | ≈ 15:1 | AAA ✓ |
| Secondary `#7A7470` on Cream `#F4EFE6` | ≈ 4.6:1 | AA ✓ |
| Accent `#1D38C0` on White `#FFFFFF` | ≈ 7.5:1 | AAA ✓ |
| White on Accent `#1D38C0` | ≈ 7.5:1 | AAA ✓ |

### Touch targets

- Minimum: 44×44px on all interactive elements
- Preferred: 48×48px for primary actions (buttons, tab items)
- Icon-only buttons must always meet the 44×44px tap target, even if the visible icon is smaller

### Semantic structure

- Use heading hierarchy (h1 → h2 → h3) — never skip levels
- All images require `alt` text (user photos: contextual description; illustrations: `alt=""` as decorative)
- Form inputs must have visible `<label>` elements — not placeholder-only
- Tab order must be logical: left to right, top to bottom
- Status information (visited / want to go) must use text labels alongside colour — never colour alone

### Do / Don't

**Do:**
- Test every flow with keyboard navigation before shipping
- Use `prefers-reduced-motion` to disable animation for users who need it
- Include skip-to-content links on web companion pages

**Don't:**
- Use `outline: none` without a custom replacement
- Remove focus states because they "look ugly" — redesign them
- Use hover-only states for critical information (inaccessible on mobile and keyboard)
- Communicate state through colour alone

---

## 18. Tone of Voice

### Character
Eatlist speaks like a knowledgeable friend who keeps a personal notebook. Warm but not gushing. Precise but not clinical. A little literary — it treats meals and places as things worth remembering, not optimising.

### Principles

**Personal.** Write as if talking to one person, not a crowd. Not "users can" — "you can."

**Concise.** Say the necessary thing, then stop. UI copy is not a place for extended sentences.

**Honest.** No fake enthusiasm, no hollow UX cheerfulness. Don't perform emotions the product doesn't feel.

**Archival.** Labels and functional UI copy are direct and unadorned. Not punny, not cute. The product respects the user's time.

**Poetic where appropriate.** Empty states and onboarding can carry a little warmth and personality — these are the moments when the brand can breathe.

### Examples

| Context | Do write | Don't write |
|---|---|---|
| Empty state (no places saved) | "Nothing saved yet. Start with a place you keep meaning to go back to." | "Your list is empty! Add some restaurants 🍽️" |
| Onboarding | "Your list lives here. Add a place, leave a note, remember why it mattered." | "Welcome to Eatlist! Let's get started 🎉" |
| Save confirmation | "Saved." | "🎉 Added to your list!" |
| Error | "Couldn't save this. Try again." | "Uh oh! Something went wrong." |
| Delete confirmation | "Remove this place?" | "Are you SURE? This can't be undone!" |
| Share | "Share your list." | "Show your friends where you've been!" |

### Do / Don't

**Do:**
- Write for someone who reads slowly and appreciates precision
- Use contractions — they're warmer
- Trust the user — skip over-explanation

**Don't:**
- Use exclamation points in functional UI (onboarding is the only exception, used sparingly)
- Use food puns or restaurant clichés ("Bon appétit!", "Time to feast!", "Dig in!")
- Use passive voice in CTAs
- Over-explain empty states — a short sentence is enough

---

## 19. Vocabulary

Consistent terminology across the product, communications, and development.

| Use this | Not this |
|---|---|
| place | restaurant, venue, spot, listing, establishment |
| list | collection, favorites, wishlist, library, feed |
| save | add, bookmark, heart, star, pin |
| note | review, comment, rating, feedback, description |
| visited | checked in, been here, completed, done |
| want to go | wishlist, planning to visit, interested, future |
| share | send, export, post *(in product context)* |
| Eatlist | eatlist, EatList, eat list, Eat List |

### Why these choices

**"Place"** is more personal and culturally neutral than "restaurant." It works for a bar, a market stall, a coffee shop, a cart. It doesn't presuppose a category.

**"Note"** positions Eatlist as a personal record, not a review platform. This distinction is critical — notes are for you, not published to an audience.

**"List"** not "collection" — unpretentious. A list is something you keep, not curate.

**"Save"** not "add" — intentional. Like putting something in a notebook rather than filing it in a database.

---

## 20. Do / Don't

### Do

- Design for daily use — every interaction should feel effortless and fast
- Use Fraunces for emotional/display moments; DM Sans for everything functional
- Let user photography be the hero — keep the UI out of its way
- Apply illustration only to empty states and onboarding
- Use the warm cream background as the base — it's the parchment of a personal archive
- Treat every card as a memory, not a data row
- Keep the accent (`--color-accent`) rare and meaningful — one standout element per screen
- Use 1px borders over shadows for elevation — it reads archival, not material
- Write copy that respects the user's intelligence and their attachment to places

### Don't

- Use delivery-app conventions (order CTAs, star ratings, promotional banners, sponsored content)
- Apply handwritten/script fonts to any text the user reads to complete a task
- Introduce social mechanics (likes, follower counts, trending, leaderboards) without deep product consideration
- Use overhead food photography clichés as default or reference imagery
- Animate for delight without a functional purpose
- Build dark backgrounds or heavily saturated surfaces into core product UI
- Use generic food iconography (forks, knives, plates, chef hats) as system icons
- Add noise to screens that need silence
- Use colour alone to communicate state (always pair with text or icons)

---

## 21. Implementation Notes for Claude Code

### Token file

Create a single `tokens.css` imported by all components. Never hard-code hex values or pixel values in components.

```css
/* tokens.css */
:root {
  /* ── Colour ── */
  --color-ink:            #050615;
  --color-cream:          #F4EFE6;
  --color-surface:        #FFFFFF;
  --color-surface-muted:  #F0EBE1;
  --color-accent:         #1D38C0;
  --color-accent-muted:   #E8ECF9;
  --color-text-secondary: #7A7470;
  --color-border:         #E0D9CF;
  --color-destructive:    #B5362A;

  /* Semantic aliases */
  --color-bg-page:        var(--color-cream);
  --color-bg-card:        var(--color-surface);
  --color-text-primary:   var(--color-ink);
  --color-text-muted:     var(--color-text-secondary);
  --color-interactive:    var(--color-accent);
  --color-focus-ring:     var(--color-ink);

  /* ── Typography ── */
  --font-display: 'Fraunces', Georgia, serif;
  --font-ui:      'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  --font-weight-regular:  400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  --text-xs:      11px;
  --text-sm:      13px;
  --text-base:    15px;
  --text-md:      17px;
  --text-lg:      20px;
  --text-xl:      24px;
  --text-2xl:     32px;
  --text-3xl:     40px;
  --text-display: 56px;

  /* ── Spacing ── */
  --space-0:  0px;
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* Semantic spacing */
  --space-page-margin:     16px;
  --space-page-margin-md:  24px;
  --space-card-padding:    16px;
  --space-section-gap:     32px;
  --space-stack-sm:        8px;
  --space-stack-md:        16px;
  --space-stack-lg:        24px;

  /* ── Radius ── */
  --radius-none: 0px;
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-pill: 9999px;

  /* ── Motion ── */
  --duration-instant: 80ms;
  --duration-fast:    150ms;
  --duration-base:    250ms;
  --duration-slow:    400ms;
  --duration-crawl:   600ms;

  --ease-out:   cubic-bezier(0.0, 0.0, 0.2, 1.0);
  --ease-in:    cubic-bezier(0.4, 0.0, 1.0, 1.0);
  --ease-inout: cubic-bezier(0.4, 0.0, 0.2, 1.0);
}
```

### Font loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&display=swap" rel="stylesheet">
```

### Breakpoints

```css
/* Mobile first — base styles apply to all sizes */
/* Tablet */
@media (min-width: 768px)  { ... }
/* Desktop */
@media (min-width: 1024px) { ... }
```

### Component naming

Use a flat, token-referencing approach. Recommend utility-first with custom components for Eatlist-specific patterns:

```
.eatlist-card          — list and detail cards
.eatlist-tag           — chips and status tags
.eatlist-input         — text inputs
.eatlist-textarea      — notes textarea
.eatlist-btn-primary   — primary CTA
.eatlist-btn-secondary — secondary CTA
.eatlist-nav           — bottom tab bar
```

### Accessibility checklist (per feature)

Before any feature is considered done:

- [ ] Focus ring visible on all interactive elements
- [ ] Touch targets ≥ 44×44px
- [ ] All colour contrast ratios verified (AA minimum)
- [ ] Alt text on all images (contextual for photos, empty for illustrations)
- [ ] Semantic HTML: headings, landmarks, `<button>` not `<div>` for interactions
- [ ] `prefers-reduced-motion` respected
- [ ] Keyboard navigation tested end-to-end

### Key rules for Claude Code sessions

- Reference tokens by variable name only — never hard-code `#050615`, always `var(--color-ink)`
- Always start with mobile layout, adapt upward
- Fraunces is for display only — when unsure, default to DM Sans
- Notes textareas use Fraunces — the only DM Sans exception in forms
- Cards use border (not box-shadow) for elevation
- No food icons in navigation — use generic place/map/bookmark icons

---

*Eatlist Product Foundations — v1.0*
*This document is the source of truth for product UI decisions. Brand world assets may deviate from these constraints. All product screens must follow them.*
