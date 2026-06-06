# Eatlist — UI Components
### 03 — v1.0

> Component specs for Claude Code. Each section defines anatomy, token references, CSS rules, states, and acceptance criteria. Do not invent new variants. Do not redesign outside these specs.

**Dependencies:** `tokens.css` must be loaded before any component CSS.  
**Class prefix:** All Eatlist-specific classes use the `el-` prefix.  
**Source of truth:** [01-product-foundations.md](./01-product-foundations.md) · [02-design-tokens.md](./02-design-tokens.md)

---

## 0. Global rules (applies to every component)

```css
*, *::before, *::after {
  box-sizing: border-box;
}

/* Minimum tap target wrapper — use when an icon or label is too small */
.el-tap-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

- All interactive elements must be `44×44px` minimum tap target.
- All colours via `var(--color-*)` tokens.
- All spacing via `var(--space-*)` tokens.
- All focus rings via `:focus-visible` (global rule in `tokens.css`).
- No `box-shadow` on list-level components — borders only.

---

## 1. Card — List (compact)

### Purpose
The primary unit of the restaurant list. Displays name, location, cuisine type, status, and optional thumbnail. Every card is a memory, not a data row.

### Anatomy
```
┌─────────────────────────────────────────┐  ← el-card-list
│  [thumb?]  Name                          │
│            Neighbourhood · City          │
│            [tag] [tag]                   │
└─────────────────────────────────────────┘
```

### HTML structure
```html
<article class="el-card-list">
  <!-- optional -->
  <div class="el-card-list__thumb" aria-hidden="true">
    <img src="..." alt="">  <!-- decorative — alt text on parent article -->
  </div>

  <div class="el-card-list__body">
    <h3 class="el-card-list__name">Le Verre Volé</h3>
    <p class="el-card-list__meta">Canal Saint-Martin · Paris</p>
    <div class="el-card-list__tags" aria-label="Tags">
      <span class="el-tag el-tag--accent">Visited</span>
      <span class="el-tag el-tag--default">Natural wine</span>
    </div>
  </div>
</article>
```

### CSS

```css
.el-card-list {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--color-bg-card);
  border: var(--border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-none);          /* NEVER add shadow */
  text-decoration: none;
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-out);
}

.el-card-list:hover {
  background: var(--color-bg-surface-muted);
}

/* Thumb */
.el-card-list__thumb {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--color-bg-surface-muted);
}

.el-card-list__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Body */
.el-card-list__body {
  flex: 1;
  min-width: 0;               /* prevents flex overflow */
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

/* Name */
.el-card-list__name {
  font-family: var(--font-ui);
  font-size: var(--text-md);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-relaxed);
  color: var(--color-text-primary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Meta */
.el-card-list__meta {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-regular);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Tags row */
.el-card-list__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-1);
}
```

### Gap between cards in a list
```css
.el-card-list + .el-card-list {
  margin-top: var(--space-2);   /* 8px minimum gap */
}
```

### Rules
- `box-shadow` is always `var(--shadow-none)`. Never add shadow.
- Background is always `var(--color-bg-card)` (white). Never coloured.
- Show maximum **3 tags** in the tags row. Overflow is hidden, not scrollable.
- Thumbnail is optional. When absent, body fills the full width.
- Name overflows with `text-overflow: ellipsis`, not wrap.
- The article element must have an accessible name via its heading.

### Acceptance criteria
- [ ] Border is `1px solid var(--color-border-default)` — no shadow
- [ ] Background is white (`var(--color-bg-card)`) at rest; `var(--color-bg-surface-muted)` on hover
- [ ] Border radius is `var(--radius-md)` (8px)
- [ ] Card padding is `var(--space-4)` (16px) on all sides
- [ ] Thumbnail (when present) is 60×60px with `border-radius: var(--radius-sm)`
- [ ] Thumbnail image uses `object-fit: cover`
- [ ] Name truncates with ellipsis — does not wrap to a second line in compact view
- [ ] Minimum 8px gap between consecutive list cards
- [ ] Focus ring visible when card is keyboard-focused

---

## 2. Card — Detail (expanded)

### Purpose
Full restaurant detail view. Photo at top, then name, meta, note preview, and action row. Displayed on the restaurant detail screen, not in the list.

### Anatomy
```
┌─────────────────────────────────────────┐  ← el-card-detail
│ [photo — full width, 3:2, radius-xl top]│
│─────────────────────────────────────────│
│ Name                                     │
│ Neighbourhood · City · [tag]             │
│                                          │
│ "Note preview in Fraunces italic…"       │
│─────────────────────────────────────────│
│ [save]  [share]  [map]                   │
└─────────────────────────────────────────┘
```

### CSS

```css
.el-card-detail {
  background: var(--color-bg-card);
  border: var(--border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
}

/* Photo */
.el-card-detail__photo {
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  background: var(--color-bg-surface-muted);
}

.el-card-detail__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Body */
.el-card-detail__body {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* Name */
.el-card-detail__name {
  font-family: var(--font-ui);
  font-size: var(--text-md);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-relaxed);
  color: var(--color-text-primary);
  margin: 0;
}

/* Meta */
.el-card-detail__meta {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Note preview — uses Fraunces */
.el-card-detail__note {
  font-family: var(--font-display);   /* Fraunces — intentional */
  font-size: var(--text-sm);
  font-style: italic;
  line-height: var(--leading-loose);
  color: var(--color-text-secondary);
  margin: var(--space-2) 0 0;
}

/* Action row */
.el-card-detail__actions {
  display: flex;
  gap: var(--space-4);
  padding-top: var(--space-4);
  border-top: var(--border-default);
  margin-top: var(--space-2);
}
```

### Rules
- Photo aspect ratio is always `3 / 2`. Use `aspect-ratio` CSS, not fixed height.
- Photo top corners use `--radius-xl`, bottom corners are `0` — the card's own `border-radius` rounds the bottom.
- Note preview always uses Fraunces italic — this is the only place Fraunces appears in a card.
- Action icons in the action row must each be a minimum 44×44px tap target.

### Acceptance criteria
- [ ] Photo is `aspect-ratio: 3/2` and uses `object-fit: cover`
- [ ] Top photo corners use `--radius-xl`, bottom corners flush
- [ ] Note preview uses `font-family: var(--font-display)` and `font-style: italic`
- [ ] Action row has `border-top: var(--border-default)` separator
- [ ] Each action button in the action row has a 44×44px minimum tap target

---

## 3. Tag / Chip

### Purpose
Short label for cuisine type, neighbourhood, status (visited / want to go), and dietary notes. Never used for navigation.

### Anatomy
```
[ label text ]  ← el-tag + modifier
```

### HTML structure
```html
<!-- Use <span> inside a list, <button> if interactive/togglable -->
<span class="el-tag el-tag--default">Natural wine</span>
<span class="el-tag el-tag--active">Visited</span>
<span class="el-tag el-tag--accent">Want to go</span>
<span class="el-tag el-tag--muted">Bistro</span>

<!-- Compact size modifier -->
<span class="el-tag el-tag--default el-tag--compact">French</span>
```

### CSS

```css
/* Base */
.el-tag {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 var(--space-3);           /* 0 12px */
  border-radius: var(--radius-pill);
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  white-space: nowrap;
  user-select: none;
}

/* Compact modifier */
.el-tag--compact {
  height: 22px;
  padding: 0 var(--space-2);           /* 0 8px */
}

/* Variant: default (outlined) */
.el-tag--default {
  background: transparent;
  border: var(--border-default);
  color: var(--color-text-primary);
}

/* Variant: active (selected / filled) */
.el-tag--active {
  background: var(--color-text-primary);  /* ink */
  border: 1px solid var(--color-text-primary);
  color: var(--color-text-on-dark);       /* white */
}

/* Variant: accent */
.el-tag--accent {
  background: var(--color-interactive-muted);
  border: none;
  color: var(--color-interactive-text);
}

/* Variant: muted */
.el-tag--muted {
  background: var(--color-bg-surface-muted);
  border: none;
  color: var(--color-text-secondary);
}

/* DM Sansactive tag (when used as <button> or togglable) */
button.el-tag {
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-out),
              border-color var(--duration-fast) var(--ease-out);
  min-height: 44px;      /* tap target — visually still 28px via line-height/padding trick */
  /* or: wrap in .el-tap-target */
}
```

### Rules
- Never use `--radius-md` or any other radius on tags — always `--radius-pill`.
- Maximum 3 tags visible in compact card view. Truncate silently (no "+N more").
- Labels must be 1–2 words maximum. If longer, truncate with ellipsis.
- When used as an interactive toggle (`<button>`), the minimum tap target is 44px — wrap in `.el-tap-target` if needed.
- Do not use coloured tag backgrounds to represent cuisine types — use `--default` or `--muted` only for cuisines. Reserve `--active` and `--accent` for status.

### Acceptance criteria
- [ ] All tags use `border-radius: var(--radius-pill)` — no exceptions
- [ ] Default tag height is 28px; compact is 22px
- [ ] Horizontal padding is `var(--space-3)` (12px) default, `var(--space-2)` (8px) compact
- [ ] Active variant background is `var(--color-text-primary)` (ink), text is white
- [ ] Accent variant background is `var(--color-interactive-muted)`, text is `var(--color-interactive-text)` (cobalt)
- [ ] DM Sansactive tags are keyboard focusable with visible focus ring
- [ ] No more than 3 tags rendered in compact card view

---

## 4. Button — Primary

### Purpose
The single main action on a screen. Save a place, confirm a deletion, complete onboarding. One per screen.

### HTML structure
```html
<button type="button" class="el-btn el-btn--primary">
  Save place
</button>

<!-- With leading icon -->
<button type="button" class="el-btn el-btn--primary">
  <svg class="el-btn__icon" aria-hidden="true" ...></svg>
  Save place
</button>

<!-- Loading state -->
<button type="button" class="el-btn el-btn--primary el-btn--loading" aria-busy="true" disabled>
  <span class="el-btn__spinner" aria-hidden="true"></span>
  Saving…
</button>
```

### CSS

```css
/* Base — shared by all button variants */
.el-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  height: 48px;
  min-width: 44px;
  padding: 0 var(--space-6);           /* 0 24px */
  border-radius: var(--radius-md);     /* 8px — NOT pill */
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  transition: opacity var(--duration-fast) var(--ease-out),
              background var(--duration-fast) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}

.el-btn:disabled,
.el-btn--loading {
  opacity: 0.48;
  cursor: not-allowed;
  pointer-events: none;
}

/* Primary */
.el-btn--primary {
  background: var(--color-text-primary);   /* ink */
  color: var(--color-text-on-dark);        /* white */
}

.el-btn--primary:hover:not(:disabled) {
  opacity: 0.88;
}

.el-btn--primary:active:not(:disabled) {
  opacity: 0.76;
}

/* Icon size inside button */
.el-btn__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
```

### Rules
- `border-radius` is always `--radius-md` (8px). Never pill on primary button.
- Height is always 48px. Never reduce.
- Maximum one primary button per screen.
- Use `aria-busy="true"` and `disabled` during loading state.
- Label text is always sentence case — never all-caps.

### Acceptance criteria
- [ ] Height is exactly 48px
- [ ] Border radius is `var(--radius-md)` (8px) — not pill, not sharp
- [ ] Background is `var(--color-text-primary)` (ink `#050615`)
- [ ] Text is white (`var(--color-text-on-dark)`)
- [ ] Font is DM Sans, `var(--text-sm)`, semibold
- [ ] Hover opacity is 0.88
- [ ] Disabled state opacity is 0.48, `cursor: not-allowed`
- [ ] Focus ring visible (`outline: 3px solid var(--color-focus-ring); outline-offset: 2px`)
- [ ] No `border-radius: 9999px` (pill) — must be 8px

---

## 5. Button — Secondary

### Purpose
Paired with a primary button when a non-destructive alternative action is needed (e.g. Cancel, Back).

### HTML structure
```html
<button type="button" class="el-btn el-btn--secondary">
  Cancel
</button>
```

### CSS

```css
.el-btn--secondary {
  background: transparent;
  color: var(--color-text-primary);
  border: var(--border-default);       /* 1px solid ink */
}

/* Override border-color for secondary to use ink, not the default warm border */
.el-btn--secondary {
  border-color: var(--color-text-primary);
}

.el-btn--secondary:hover:not(:disabled) {
  background: var(--color-bg-surface-muted);
}

.el-btn--secondary:active:not(:disabled) {
  background: var(--primitive-border);
}
```

### Rules
- Same height (48px), padding, and radius as primary.
- Border is always 1px solid ink — not the default warm border.
- Never use for destructive actions. Use `el-btn--destructive` (below) for those.

### Acceptance criteria
- [ ] Height is 48px, padding `0 var(--space-6)`, radius `var(--radius-md)`
- [ ] Border is `1px solid var(--color-text-primary)` (ink)
- [ ] Background is transparent at rest; `var(--color-bg-surface-muted)` on hover
- [ ] Text is `var(--color-text-primary)` (ink)

---

## 6. Button — Destructive

### Purpose
Delete actions only. Confirms permanent removal of a place or list.

### HTML structure
```html
<button type="button" class="el-btn el-btn--destructive">
  Remove this place
</button>
```

### CSS

```css
.el-btn--destructive {
  background: var(--color-destructive);
  color: var(--color-text-on-dark);
  border: none;
}

.el-btn--destructive:hover:not(:disabled) {
  opacity: 0.88;
}
```

### Rules
- Never used for non-destructive actions.
- Always preceded by a confirmation step — never a first tap.
- Label uses vocabulary from 01-foundations: "Remove this place?" not "Delete" or "Are you sure?"

### Acceptance criteria
- [ ] Background is `var(--color-destructive)` (`#B5362A`)
- [ ] Text is white
- [ ] Never appears as the first and only action on a screen without confirmation

---

## 7. Button — Icon only

### Purpose
Compact action in card action rows, navigation headers, and inline controls (save, share, map link).

### HTML structure
```html
<!-- Must have aria-label -->
<button type="button" class="el-btn-icon" aria-label="Save place">
  <svg aria-hidden="true" width="20" height="20" ...></svg>
</button>
```

### CSS

```css
.el-btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: var(--radius-md);
  background: transparent;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: background var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}

.el-btn-icon:hover {
  background: var(--color-bg-surface-muted);
}

.el-btn-icon:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

.el-btn-icon svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
```

### Rules
- Always 44×44px — never smaller, even if the icon is 16px.
- Always has `aria-label`. Never relies on icon alone for accessibility.
- Icon is 20px in icon-only buttons. SVG is always `aria-hidden="true"`.

### Acceptance criteria
- [ ] Element is exactly 44×44px
- [ ] Has non-empty `aria-label`
- [ ] SVG has `aria-hidden="true"`
- [ ] Focus ring visible
- [ ] Background is transparent at rest; `var(--color-bg-surface-muted)` on hover

---

## 8. Input — Text

### Purpose
Single-line text fields for restaurant name, location, list name, and search.

### HTML structure
```html
<!-- Standard input -->
<div class="el-form-group">
  <label class="el-label" for="place-name">Place name</label>
  <input
    class="el-input"
    type="text"
    id="place-name"
    name="place-name"
    placeholder="e.g. Le Verre Volé"
    autocomplete="off"
  >
</div>

<!-- With error -->
<div class="el-form-group el-form-group--error">
  <label class="el-label" for="place-name">Place name</label>
  <input
    class="el-input"
    type="text"
    id="place-name"
    aria-describedby="place-name-error"
    aria-invalid="true"
  >
  <p class="el-input-error" id="place-name-error" role="alert">
    Enter a name for this place.
  </p>
</div>
```

### CSS

```css
/* Form group wrapper */
.el-form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* Label */
.el-label {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-relaxed);
  color: var(--color-text-primary);
}

/* Input */
.el-input {
  display: block;
  width: 100%;
  height: 48px;
  padding: 0 var(--space-3);           /* 0 12px */
  background: var(--color-bg-card);    /* white */
  border: var(--border-default);
  border-radius: var(--radius-md);     /* 8px — standard form inputs */
  font-family: var(--font-ui);
  font-size: var(--text-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--leading-relaxed);
  color: var(--color-text-primary);
  appearance: none;
  outline: none;
  transition: border-color var(--duration-fast) var(--ease-out),
              box-shadow var(--duration-fast) var(--ease-out);
}

.el-input::placeholder {
  color: var(--color-text-secondary);
}

/* Focus state — override global :focus-visible with input-specific ring */
.el-input:focus {
  border-color: var(--color-border-focus);    /* ink */
  box-shadow: 0 0 0 var(--focus-ring-width) rgba(5, 6, 21, 0.12);
}

/* Filled state — same as default (no special styling) */

/* Error state */
.el-form-group--error .el-input {
  border-color: var(--color-destructive);
}

.el-form-group--error .el-input:focus {
  border-color: var(--color-destructive);
  box-shadow: 0 0 0 var(--focus-ring-width) rgba(181, 54, 42, 0.12);
}

/* Disabled state */
.el-input:disabled {
  background: var(--color-bg-surface-muted);
  color: var(--color-text-secondary);
  border-color: var(--color-border-default);
  cursor: not-allowed;
  opacity: 1;  /* don't reduce opacity — muted background communicates disabled */
}

/* Search variant */
.el-input--search {
  border-radius: var(--radius-lg);   /* 12px — rounder, more approachable than form inputs */
  padding-left: var(--space-6);      /* 24px — leaves room for the search icon */
  background-image: none;            /* icon is a sibling element, not a background */
}

/* Error message */
.el-input-error {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-destructive);
  margin: 0;
  line-height: var(--leading-relaxed);
}
```

### Rules
- Label is **always above** the input field. No floating labels.
- Placeholder is supplementary context only — never the label substitute.
- Error message uses `role="alert"` so screen readers announce it immediately.
- Error message appears below the field — not above, not inline.
- `height` is always 48px. Do not reduce for compact forms — use a separate compact input spec if ever needed.
- `border-radius` is `--radius-sm` (4px) — intentionally smaller than buttons (8px), feels like a form, not a button.

### Acceptance criteria
- [ ] Label is a `<label>` element with `for` matching input `id`
- [ ] Label appears **above** the input, never as placeholder
- [ ] Input height is 48px
- [ ] Border is `1px solid var(--color-border-default)` at rest
- [ ] Focus border is `var(--color-border-focus)` (ink) with inner shadow ring
- [ ] Error border is `var(--color-destructive)` when `aria-invalid="true"`
- [ ] Error message has `role="alert"` and `id` referenced by `aria-describedby`
- [ ] Disabled input has `var(--color-bg-surface-muted)` background, `cursor: not-allowed`
- [ ] `border-radius` is `var(--radius-sm)` (4px)
- [ ] No floating label pattern

---

## 9. Input — Textarea (Notes)

### Purpose
Personal note field for a saved place. The user's memory, in their own words. Uses Fraunces to feel like a journal, not a form field.

### HTML structure
```html
<div class="el-form-group">
  <label class="el-label" for="place-note">Your note</label>
  <textarea
    class="el-input el-input--textarea"
    id="place-note"
    name="place-note"
    rows="5"
    placeholder="What do you want to remember about this place?"
  ></textarea>
</div>
```

### CSS

```css
.el-input--textarea {
  height: auto;
  min-height: 120px;
  padding: var(--space-3);            /* 12px all sides */
  resize: vertical;
  font-family: var(--font-display);   /* Fraunces — intentional, only exception */
  font-size: var(--text-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--leading-loose);
}
```

### Rules
- `font-family` must be `var(--font-display)` (Fraunces) — this is the **only** exception to DM Sans in forms.
- `resize: vertical` only — never `resize: both` or `resize: horizontal`.
- Minimum height is 120px.
- All other states (focus, error, disabled) inherit from `.el-input`.

### Acceptance criteria
- [ ] `font-family` is `var(--font-display)` (Fraunces)
- [ ] `min-height` is 120px
- [ ] `resize: vertical` only
- [ ] Focus, error, and disabled states behave identically to `.el-input`
- [ ] Label is a `<label>` element above the textarea

---

## 10. Navigation — Bottom tab bar

### Purpose
Primary navigation on mobile. Fixed to the bottom of the viewport. Maximum 5 tabs.

### Anatomy
```
┌────────────────────────────────────────┐  ← el-tab-bar
│  [icon]  [icon]  [icon]  [icon]  [icon] │
│  List    Map     Save    Search  Profile │
└────────────────────────────────────────┘
```

### HTML structure
```html
<nav class="el-tab-bar" aria-label="Main navigation">
  <a class="el-tab-bar__item el-tab-bar__item--active"
     href="/list" aria-current="page">
    <svg class="el-tab-bar__icon" aria-hidden="true" ...></svg>
    <span class="el-tab-bar__label">List</span>
  </a>
  <a class="el-tab-bar__item" href="/map">
    <svg class="el-tab-bar__icon" aria-hidden="true" ...></svg>
    <span class="el-tab-bar__label">Map</span>
  </a>
  <a class="el-tab-bar__item el-tab-bar__item--accent" href="/save">
    <svg class="el-tab-bar__icon" aria-hidden="true" ...></svg>
    <span class="el-tab-bar__label">Save</span>
  </a>
  <a class="el-tab-bar__item" href="/search">
    <svg class="el-tab-bar__icon" aria-hidden="true" ...></svg>
    <span class="el-tab-bar__label">Search</span>
  </a>
  <a class="el-tab-bar__item" href="/profile">
    <svg class="el-tab-bar__icon" aria-hidden="true" ...></svg>
    <span class="el-tab-bar__label">Profile</span>
  </a>
</nav>
```

### CSS

```css
.el-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: var(--z-nav);              /* 300 */
  display: flex;
  align-items: stretch;
  height: var(--nav-height-mobile);   /* 56px */
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background: var(--color-bg-card);   /* white */
  border-top: var(--border-default);
}

.el-tab-bar__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  min-height: 44px;
  text-decoration: none;
  color: var(--color-text-secondary);
  transition: color var(--duration-fast) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}

.el-tab-bar__item--active,
.el-tab-bar__item[aria-current="page"] {
  color: var(--color-text-primary);   /* ink */
}

.el-tab-bar__item--accent {
  color: var(--color-interactive);    /* cobalt */
}

.el-tab-bar__icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.el-tab-bar__label {
  font-family: var(--font-ui);
  font-size: var(--text-xs);          /* 11px */
  font-weight: var(--font-weight-regular);
  line-height: 1;
}
```

### Page body offset (prevents content hidden under tab bar)
```css
body {
  padding-bottom: calc(var(--nav-height-mobile) + env(safe-area-inset-bottom, 0px));
}
```

### Rules
- Maximum 5 tabs — never more.
- Labels are **always visible** — not hidden until active.
- Icons are outline style, 24px. Never filled icons.
- The active tab uses ink, not accent — unless the tab is specifically the save/add action (which may use `--color-interactive`).
- `aria-current="page"` marks the active tab for screen readers.
- Safe area inset must be applied for notched devices.
- The tab bar stays visible on scroll (except in full-screen map view where it may hide).

### Acceptance criteria
- [ ] `position: fixed; bottom: 0` — always at the viewport bottom
- [ ] `z-index: var(--z-nav)` (300)
- [ ] Height is `var(--nav-height-mobile)` (56px) + `env(safe-area-inset-bottom)`
- [ ] `border-top: var(--border-default)` — no shadow
- [ ] Background is `var(--color-bg-card)` (white)
- [ ] Each tab item is at least 44px tall (touch target)
- [ ] Labels are visible in all states (active and inactive)
- [ ] Active tab has `aria-current="page"` attribute
- [ ] Max 5 tab items
- [ ] `body` has `padding-bottom: calc(var(--nav-height-mobile) + env(safe-area-inset-bottom, 0px))` — content must never be hidden behind the bar
- [ ] No visible gap between the bar and the bottom edge of the screen on any device (the bar must touch the physical bottom edge, with only the safe-area inset between them)

---

## 11. Navigation — In-app header

### Purpose
Screen-level navigation: back button, screen title, and optional close or action button.

### HTML structure
```html
<!-- Back navigation -->
<header class="el-screen-header">
  <a class="el-screen-header__back el-btn-icon" href="/list" aria-label="Back to list">
    <svg aria-hidden="true" ...><!-- chevron left --></svg>
  </a>
  <h1 class="el-screen-header__title">Le Verre Volé</h1>
  <!-- optional trailing action -->
  <button class="el-screen-header__action el-btn-icon" aria-label="Share">
    <svg aria-hidden="true" ...><!-- share icon --></svg>
  </button>
</header>

<!-- Close (for sheets and modals) -->
<header class="el-screen-header">
  <div class="el-screen-header__spacer"></div>
  <h2 class="el-screen-header__title">Add a place</h2>
  <button class="el-screen-header__close el-btn-icon" aria-label="Close">
    <svg aria-hidden="true" ...><!-- × --></svg>
  </button>
</header>
```

### CSS

```css
.el-screen-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  height: 56px;
  background: var(--color-bg-page);
  border-bottom: var(--border-default);
}

.el-screen-header__title {
  flex: 1;
  font-family: var(--font-display);    /* Fraunces */
  font-size: var(--text-xl);
  font-weight: 300;
  line-height: var(--leading-normal);
  color: var(--color-text-primary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;                    /* left-align — not centred */
}

.el-screen-header__spacer {
  width: 44px;   /* mirrors the trailing button width to keep title centred */
  flex-shrink: 0;
}

/* Back and action buttons use el-btn-icon */
.el-screen-header__back,
.el-screen-header__close,
.el-screen-header__action {
  flex-shrink: 0;
}
```

### Rules
- Screen title uses Fraunces `--text-xl` weight 300 — the display typeface for content headers.
- Back button is always top-left. Close button is always top-right.
- Do not centre the title on standard back-navigation screens (left-align is intentional).
- A spacer div may be used on close-only headers to optically centre the title.
- Header height is 56px — same as the tab bar.

### Acceptance criteria
- [ ] Screen title uses `font-family: var(--font-display)` (Fraunces), `font-size: var(--text-xl)`
- [ ] Back button is always top-left with `aria-label="Back to [previous screen]"`
- [ ] Close button is always top-right with `aria-label="Close"`
- [ ] All icon buttons in header are 44×44px tap targets
- [ ] Title truncates with ellipsis — does not wrap

---

## 12. Navigation — Home header

### Purpose
The top bar of the main list screen (home). Shows the Eatlist logomark only — no page title, no wordmark text as a separate element. The logomark is the full brand presence on this screen.

### Anatomy
```
┌─────────────────────────────────────────┐  ← el-home-header
│  [logomark svg]                [action] │
└─────────────────────────────────────────┘
```

### HTML structure
```html
<header class="el-home-header">
  <img
    class="el-home-header__logo"
    src="/assets/logomark.svg"
    alt="Eatlist"
    width="32"
    height="32"
  >
  <!-- optional trailing action, e.g. notifications -->
  <button class="el-home-header__action el-btn-icon" aria-label="Notifications">
    <svg aria-hidden="true" ...></svg>
  </button>
</header>
```

### CSS

```css
.el-home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-4);
  height: 56px;
  background: var(--color-bg-page);
  border-bottom: var(--border-default);
}

.el-home-header__logo {
  width: 32px;
  height: 32px;
  display: block;
  flex-shrink: 0;
}
```

### Rules
- **Only the logomark SVG** (`logomark.svg`) is used here — never the full wordmark lockup and never a text element reading "Eatlist" beside the logo.
- No `<h1>` or page title on the home header — the list content below provides context.
- Height is 56px — same as `el-screen-header` and `el-tab-bar`.

### Acceptance criteria
- [ ] Only `logomark.svg` is present — no text label adjacent to it
- [ ] `alt="Eatlist"` on the img element
- [ ] Height is 56px
- [ ] No `<h1>` page title in this header

---

## 13. User row

### Purpose
Displays a single person (friend, follower, contributor) with their avatar and name. Used in friend lists, "Amigos que seguem", "Amigos que gostaram", and anywhere a list of people appears.

### Anatomy
```
┌─────────────────────────────────────────┐  ← el-user-row
│  [avatar]  Name                          │
└─────────────────────────────────────────┘
```

### HTML structure
```html
<ul class="el-user-list">
  <li>
    <div class="el-user-row">
      <img
        class="el-user-row__avatar"
        src="/path/to/avatar.jpg"
        alt="Isabela Kempinas"
        width="40"
        height="40"
      >
      <span class="el-user-row__name">Isabela Kempinas</span>
    </div>
  </li>
</ul>
```

### CSS

```css
.el-user-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);   /* 8px between rows */
}

.el-user-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);            /* 12px */
  padding: var(--space-3) var(--space-4);   /* 12px 16px */
  background: var(--color-bg-card);
  border: var(--border-default);
  border-radius: var(--radius-md);
  min-height: 64px;
}

.el-user-row__avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-pill);   /* always circular */
  object-fit: cover;
  flex-shrink: 0;
}

.el-user-row__name {
  font-family: var(--font-ui);
  font-size: var(--text-md);           /* 17px */
  font-weight: var(--font-weight-regular);
  color: var(--color-text-primary);
}
```

### Rules
- Every list of people (regardless of context) uses `el-user-row` — never invent a separate treatment.
- Avatar is always circular (`--radius-pill`).
- Row always has the card-with-border treatment — never a bare list without container.

### Acceptance criteria
- [ ] Avatar is 40px × 40px, circular, `object-fit: cover`
- [ ] Row has `border: var(--border-default)` and `border-radius: var(--radius-md)`
- [ ] Name uses `--font-ui`, `--text-md`
- [ ] All people lists across the app use this component

---

## 14. Bottom sheet

### Purpose
A modal surface that slides up from the bottom. Used for contextual actions, detail previews, filter panels, and people lists ("Amigos que seguem"). Never a full replacement for a screen — use a screen instead if the content requires its own navigation.

### Anatomy
```
        ┌──────────────────────────────┐
        │    ────  (drag handle)       │
        │                              │
        │  Title              [close]  │
        │                              │
        │  [content]                   │
        │                              │
        └──────────────────────────────┘
```

### HTML structure
```html
<div class="el-sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
  <div class="el-sheet__handle" aria-hidden="true"></div>
  <header class="el-sheet__header">
    <h2 class="el-sheet__title" id="sheet-title">Amigos que seguem</h2>
    <button class="el-sheet__close el-btn-icon" aria-label="Close">
      <svg aria-hidden="true" ...><!-- × --></svg>
    </button>
  </header>
  <div class="el-sheet__body">
    <!-- scrollable content goes here -->
  </div>
</div>
```

### CSS

```css
.el-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: var(--z-modal);            /* 500 */
  display: flex;
  flex-direction: column;
  max-height: 90dvh;                  /* never taller than 90% of viewport */
  background: var(--color-bg-page);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;  /* 16px top corners only */
  padding-bottom: env(safe-area-inset-bottom, 0px);
  overflow: hidden;
}

.el-sheet__handle {
  width: 36px;
  height: 4px;
  background: var(--color-border-default);
  border-radius: var(--radius-pill);
  margin: var(--space-2) auto var(--space-1);  /* 8px auto 4px */
  flex-shrink: 0;
}

.el-sheet__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) var(--space-4);   /* 12px 16px */
  flex-shrink: 0;
}

.el-sheet__title {
  font-family: var(--font-display);   /* Fraunces */
  font-size: var(--text-xl);          /* 24px */
  font-weight: 300;
  color: var(--color-text-primary);
  margin: 0;
}

.el-sheet__body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-2) var(--space-4) var(--space-6);  /* 8px 16px 24px */
  -webkit-overflow-scrolling: touch;
}
```

### Rules
- Height is **always** `height: auto` — the sheet grows to fit its content, up to `max-height: 90dvh`.
- Never set a fixed `height` or `min-height` that creates empty space below short content.
- If content exceeds `90dvh`, `el-sheet__body` scrolls internally.
- `padding-bottom: env(safe-area-inset-bottom)` prevents content from being clipped by the home indicator on notched devices.
- The drag handle is always present — it's an affordance even if drag-to-dismiss isn't implemented.
- Title uses Fraunces `--text-xl` — consistent with all content headings.

### Acceptance criteria
- [ ] `height: auto` — sheet fits content, no empty space below
- [ ] `max-height: 90dvh`
- [ ] `el-sheet__body` scrolls when content overflows
- [ ] Drag handle visible at top
- [ ] `border-radius: var(--radius-xl) var(--radius-xl) 0 0` — top corners rounded only
- [ ] `padding-bottom: env(safe-area-inset-bottom)` on the sheet root
- [ ] `z-index: var(--z-modal)` (500)
- [ ] `role="dialog"` and `aria-modal="true"` on root element

---

## 15. Focus ring — global

### Purpose
Visible keyboard focus indicator. Applied globally via `tokens.css`. Never removed. Never replaced with a colour-only indicator.

### CSS (already in tokens.css — do not duplicate)

```css
:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  /* 3px solid #050615 */
  outline-offset: var(--focus-ring-offset);
  /* 2px */
}

:focus:not(:focus-visible) {
  outline: none;
}
```

### Custom focus ring for inputs (in component CSS)
Inputs use a box-shadow ring instead of outline to avoid clipping inside overflow containers:

```css
.el-input:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 var(--focus-ring-width) rgba(5, 6, 21, 0.12);
}
```

### Rules
- Never use `outline: none` on any element without a custom replacement.
- The `box-shadow` ring on inputs is a visual replacement — both approaches must be present.
- Custom focus rings must have a minimum 3px visible indicator.
- Focus ring must be visible against all backgrounds used in Eatlist (cream, white, cobalt).

### Acceptance criteria
- [ ] Every interactive element shows a visible focus ring on keyboard navigation
- [ ] Focus ring is `3px solid var(--color-focus-ring)` with `2px` offset
- [ ] `outline: none` does not appear in component CSS without a `box-shadow` replacement
- [ ] Focus ring is tested against cream background, white background, and cobalt background
- [ ] `prefers-reduced-motion` does not remove focus rings (they are not animations)

---

## 16. Map — pins and filter chips

### Purpose
The map screen shows restaurants from the user's own lists and from friends' lists simultaneously. The visual language must make ownership (mine vs friends') immediately legible without relying on colour beyond the system palette.

### Pin states

Pins communicate two things simultaneously: **ownership** (mine vs friends) via fill, and **action** (liked vs saved) via icon.

| State | Visual | When |
|---|---|---|
| Eu gostei | Filled ink `●` + heart icon (cream) | I liked this place |
| Eu salvei | Filled ink `●` + checkmark icon (cream) | In my list, no positive reaction yet |
| Amigo gostou | Outline ink `○` + heart icon (ink) | A friend liked this place |
| Amigo salvou | Outline ink `○` + checkmark icon (ink) | In a friend's list, no reaction yet |
| Selecionado (active) | Filled or outline + cream ring `◉` | User tapped this pin |
| Cluster | Filled ink circle + count | Multiple restaurants at the same location |

**Rules:**
- All pins use `--color-ink` exclusively — cobalt is never used for map pins.
- **Fill = ownership:** filled ink = mine, outline ink = friends'.
- **Icon = action:** heart = liked, checkmark = saved/in list.
- **Thumbs down (não gostei) never appears on the map** — negative reactions are private and only visible on the restaurant detail screen.
- Cluster pins show a number inside the circle.

### CSS

```css
.el-map-pin {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-out);
}

/* Mine — filled ink */
.el-map-pin--mine {
  background: var(--color-ink);
  border: 2px solid var(--color-ink);
}

.el-map-pin--mine svg {
  color: var(--color-cream);   /* cream icon */
}

/* Friends — outline ink */
.el-map-pin--friends {
  background: var(--color-bg-page);   /* cream fill */
  border: 2px solid var(--color-ink);
}

.el-map-pin--friends svg {
  color: var(--color-ink);   /* ink icon */
}

/* Selected */
.el-map-pin--selected {
  outline: 3px solid var(--color-cream);
  outline-offset: 1px;
  transform: scale(1.15);
}

/*
  Icon inside the pin:
  - Heart SVG  → liked (eu gostei / amigo gostou)
  - Check SVG  → saved (eu salvei / amigo salvou)
  Combine with --mine or --friends class.
  e.g. <div class="el-map-pin el-map-pin--mine"><!-- heart svg --></div>
       <div class="el-map-pin el-map-pin--friends"><!-- check svg --></div>
*/
```

### Filter chips

The map has exactly 3 filter chips — no more:

| Chip | Shows | Pins visible |
|---|---|---|
| **Todos** | Everything | All 4 pin types |
| **Meus** | Only my restaurants | Filled heart + Filled check |
| **Amigos** | Only friends' restaurants | Outline heart + Outline check |

Chips control **ownership**. Pins communicate **action**. The two layers do different jobs and complement each other.

"Abertos agora" and "Amigos gostaram" as separate chips are removed — ownership is now handled by "Meus" and "Amigos".

The active chip uses the standard `tag--active` style (cobalt fill, cream text).

### Acceptance criteria
- [ ] Mine pins (eu gostei / eu salvei): filled ink, cream icon
- [ ] Friends pins (amigo gostou / amigo salvou): outline ink, ink icon
- [ ] Liked places: heart icon inside pin
- [ ] Saved places: checkmark icon inside pin
- [ ] Thumbs down places do NOT appear as pins — never
- [ ] Selected pin has cream outline ring, scale 1.15
- [ ] Zero cobalt on any pin in any state
- [ ] Exactly 3 filter chips: Todos, Meus, Amigos
- [ ] "Todos" shows all 4 pin types; "Meus" shows only filled pins; "Amigos" shows only outline pins

---

## 17. Reaction — binary

### Purpose
Users can react to a restaurant to record whether they liked it or not. Reactions are always binary — there is no star rating or gradient. A reaction expresses personal memory, not a public review score.

### States

| State | Icon | Label | Colour |
|---|---|---|---|
| Gostei | Thumbs up (outline line icon) | count | `--color-ink` |
| Não gostei | Thumbs down (outline line icon) | count | `--color-ink` |
| Not yet reacted | Both icons outline | — | `--color-text-secondary` |

### HTML structure

```html
<div class="el-reaction">
  <button class="el-reaction__btn el-reaction__btn--like" aria-label="Gostei" aria-pressed="false">
    <svg class="el-reaction__icon" aria-hidden="true"><!-- thumbs up, outline line style --></svg>
    <span class="el-reaction__count">6</span>
  </button>
  <button class="el-reaction__btn el-reaction__btn--dislike" aria-label="Não gostei" aria-pressed="false">
    <svg class="el-reaction__icon" aria-hidden="true"><!-- thumbs down, outline line style --></svg>
    <span class="el-reaction__count">1</span>
  </button>
</div>
```

### CSS

```css
.el-reaction {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.el-reaction__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  height: 32px;
  border: var(--border-default);
  border-radius: var(--radius-pill);
  background: transparent;
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

/* Active — user reacted */
.el-reaction__btn[aria-pressed="true"] {
  background: var(--color-bg-surface-muted);
  border-color: var(--color-border-strong);
  color: var(--color-text-primary);
}

.el-reaction__btn--like[aria-pressed="true"] svg {
  fill: var(--color-text-primary);   /* filled heart */
}

.el-reaction__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.el-reaction__count {
  line-height: 1;
}
```

### Rules
- Icons are **outline line style** — never emoji-style, never filled solid. Use Lucide, Phosphor, or equivalent icon library at stroke-width 1.5.
- Reactions use `--color-ink` for the active state — never cobalt.
- The reaction component is shown on: restaurant detail screen, restaurant card in list (compact version, count only).
- A user can only have one reaction per restaurant — selecting one deselects the other.
- Counts reflect all friends who reacted, not just the current user.

### Acceptance criteria
- [ ] Heart fills ink when user has reacted positively
- [ ] X mark fills ink when user has reacted negatively
- [ ] Selecting one reaction deselects the other
- [ ] Icons are outline line style (stroke-width 1.5) — never emoji or filled solid
- [ ] Cobalt is never used for reaction icons or states

---

## 18. Accessibility — global requirements

These apply to every component and every screen. They are not optional.

### Touch targets
- Minimum 44×44px on all interactive elements (buttons, links, tabs, chips when interactive).
- When the visual element is smaller, use `.el-tap-target` wrapper or padding to achieve the minimum.

### Semantic HTML
- Buttons that perform actions: `<button type="button">` — not `<div>` or `<a>`.
- Links that navigate: `<a href="...">` — not `<button>`.
- Lists of cards or items: `<ul>` / `<li>` or `<ol>` / `<li>`.
- Headings follow hierarchy — never skip levels (`h1 → h2 → h3`).
- Screen titles are always an `<h1>` or `<h2>` depending on nesting level.

### ARIA rules
- All icon-only buttons must have `aria-label`.
- All images must have `alt` text:
  - User photos: descriptive alt (e.g., `alt="Photo of Le Verre Volé"`)
  - Decorative illustrations: `alt=""`
  - Logo: `alt="Eatlist"`
- `aria-current="page"` marks the active navigation tab.
- `aria-invalid="true"` marks inputs with validation errors.
- `aria-describedby` links inputs to their error messages.
- `aria-busy="true"` marks loading states on buttons.

### Colour contrast (WCAG AA minimum)
| Pairing | Ratio | Use |
|---|---|---|
| Ink `#050615` on Cream `#F4EFE6` | 15:1 | All body text on page background |
| Ink `#050615` on White `#FFFFFF` | 16:1 | Text on card surfaces |
| Secondary `#7A7470` on Cream `#F4EFE6` | 4.6:1 | Secondary labels |
| White on Cobalt `#1D38C0` | 7.5:1 | Text on accent backgrounds |
| Cobalt `#1D38C0` on White `#FFFFFF` | 7.5:1 | Accent text on card backgrounds |
| White on Ink `#050615` | 16:1 | Button text on primary button |

### Keyboard navigation
- Every interactive element is reachable via `Tab`.
- Tab order is logical: left to right, top to bottom, following visual reading order.
- Modals and bottom sheets trap focus while open and restore focus on close.
- Escape key closes modals and bottom sheets.

### Screen reader requirements
- Decorative SVGs: `aria-hidden="true"`.
- Loading spinners: parent has `aria-busy="true"`, spinner is `aria-hidden="true"`.
- Dynamic content updates (save confirmation, error messages): use `role="alert"` or `aria-live="polite"`.

### Global acceptance criteria
- [ ] All interactive elements reachable by keyboard in logical tab order
- [ ] All interactive elements have visible focus ring
- [ ] All interactive elements meet 44×44px minimum touch target
- [ ] No `<div>` or `<span>` used as interactive element without ARIA role
- [ ] All icon-only buttons have non-empty `aria-label`
- [ ] All images have `alt` attribute (empty `""` for decorative)
- [ ] Error messages are announced to screen readers via `role="alert"`
- [ ] Colour contrast passes WCAG AA for all text
- [ ] Status never communicated by colour alone (always paired with text or icon)
- [ ] `prefers-reduced-motion` respected by all animations and transitions
- [ ] Modal/sheet focus trap is functional — focus does not escape to background content

---

*Eatlist UI Components — v1.0*  
*See [02-design-tokens.md](./02-design-tokens.md) for all token values. See [01-product-foundations.md](./01-product-foundations.md) for design rationale.*
