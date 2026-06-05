# Eatlist — Implementation Plan for Claude Code

**Based on:** UX Heuristic Audit + Visual Design Audit + Product Improvement Plan  
**Date:** June 5, 2026  
**Target:** `kmmps.github.io/eatlist/project/eatlist.html`

---

## How to Use This Plan

Feed this document to Claude Code along with the source file. Work one phase at a time. Each task includes acceptance criteria — use them to verify before moving to the next task. Phases 1 and 2 are safe to execute in any order within the phase. Phases 3 and 4 require product decisions before implementation.

**Principle:** Make one focused change per task. Commit (or checkpoint) after each task passes its acceptance criteria.

---

## Phase 1 — Quick UX & Content Fixes

*These are single-component or single-property changes. No new features. Estimated total: 8–10 hours.*

---

### [ ] 1.1 — Bold display-sized titles

**Priority:** P0  
**User problem:** Restaurant name and list title render at weight 400 — they feel like placeholders, not headlines.  
**Proposed solution:** Change `fontWeight` to `600` on all large-size headings.  
**Files likely affected:** RestaurantScreen component, ListOpenScreen component (wherever `fontSize: 28` or `fontSize: 30` appears).  
**Implementation notes:**
- Find all instances of `fontSize: 28` or `fontSize: 30` paired with `fontWeight: 400`
- Change to `fontWeight: 600`
- Do not change body text, labels, or secondary text

**Acceptance criteria:**
- Restaurant name is visibly bold on the Restaurant screen
- List title ("Padarias no centro" etc.) is visibly bold on the List Open screen
- No other text elements changed

**Risks:** None. Pure style change.  
**Manual review:** Check that bold weight doesn't clip any long restaurant names.

---

### [ ] 1.2 — Raise login tagline opacity

**Priority:** P0  
**User problem:** "playlists de restaurantes" is rendered at ~45% white opacity on dark navy — nearly invisible.  
**Proposed solution:** Raise opacity to 70%+.  
**Files likely affected:** LoginScreen / SplashScreen component.  
**Implementation notes:**
- Find `rgba(255,255,255,0.45)` or equivalent on the tagline/subtitle element
- Change to `rgba(255,255,255,0.72)` or `color: '#B8BCCE'` (a soft light value on navy)

**Acceptance criteria:**
- Tagline is legible against the dark navy background
- No other text elements affected

**Risks:** None. 5-minute fix.

---

### [ ] 1.3 — Add form validation to Register

**Priority:** P0  
**User problem:** "Criar conta" button submits with empty fields, silently sending the user to Home with no account.  
**Proposed solution:** Validate all required fields before calling `onLogin()`. Show inline error messages on empty required fields.  
**Files likely affected:** LoginScreen / RegisterScreen component, wherever `onLogin()` is called on the register submit button.  
**Implementation notes:**
- Add a `validate()` function that checks: name is not empty, email matches a basic regex, password length ≥ 8
- If validation fails: set an error state per field; render error text below each failing field in a muted red (`#D94F3D`)
- Disable the "Criar conta" button while any required field is empty (or enable it and show errors on click — either approach is fine)
- Do NOT call `onLogin()` until validation passes
- Add a helper text below the password field at all times: "Mínimo 8 caracteres"

**Acceptance criteria:**
- Submitting with empty name shows inline error: "Nome obrigatório"
- Submitting with invalid email shows: "E-mail inválido"
- Submitting with password < 8 chars shows: "Mínimo 8 caracteres"
- Valid form submits and navigates normally
- Helper text visible below password field before interaction

**Risks:** If `onLogin()` is shared between login and register flows, be careful not to add validation to the login path.  
**Manual review:** Test the happy path (valid data) still works after adding validation.

---

### [ ] 1.4 — Fix map search bar (wire to real input)

**Priority:** P0  
**User problem:** The floating search bar on the Map screen is a `<div>` — tapping it does nothing.  
**Proposed solution:** Replace with a real `<input>` element that filters visible markers by restaurant name as the user types.  
**Files likely affected:** MapScreen component.  
**Implementation notes:**
- Replace the `<div style={...}>Buscar no mapa...</div>` with `<input type="text" placeholder="Buscar no mapa..." />`
- On `onChange`, filter the array of map markers to only those whose `name` includes the search string (case-insensitive)
- If the search string is empty, show all markers
- Keep the same visual styling; just change the element type

**Acceptance criteria:**
- Tapping the search bar opens the mobile keyboard
- Typing "pad" filters markers to only restaurants with "pad" in the name
- Clearing the input restores all markers
- Markers update in real time as the user types

**Risks:** If markers are rendered via Leaflet's `L.marker`, filtering may require removing and re-adding layers. Read the existing marker rendering code before deciding the approach.  
**Manual review:** Confirm no flicker or map re-render on keystroke.

---

### [ ] 1.5 — Redirect after list creation to the new list

**Priority:** P0  
**User problem:** After creating a list, the app redirects to Home after 1.2s. The new list is orphaned — the user has no path back to it.  
**Proposed solution:** After the "Lista criada!" success state, navigate to the new List Open screen instead of Home.  
**Files likely affected:** NewListScreen component. Look for `setTimeout(() => go('home'), 1200)` or equivalent.  
**Implementation notes:**
- Change the navigation target from `'home'` to `'list-open'` (or whatever the list detail route is called)
- Pass the newly created list's ID or object as the navigation parameter
- The success message can still display for 1.2s before redirecting, or you can replace it with a "Adicionar restaurantes →" CTA button that navigates immediately

**Acceptance criteria:**
- After creating a list, user lands on the List Open screen for that specific list
- The new list is empty but correctly titled
- Back navigation from the new list goes to Home (or wherever is appropriate)

**Risks:** The List Open screen must accept a list ID/object as a prop. Check how existing lists navigate to List Open before implementing.

---

### [ ] 1.6 — Replace long-press with regular tap (friend reactions & follower list)

**Priority:** P0  
**User problem:** Friend avatars (followers) and like/dislike reaction counts only open their detail sheets via a 500ms long-press. No user will discover this.  
**Proposed solution:** Change to a regular `onClick` / `onPress` handler. Remove the `onPointerDown + setTimeout` pattern.  
**Files likely affected:** ListOpenScreen, RestaurantScreen — anywhere `startLongPress` or `onPointerDown` with a `setTimeout` drives a sheet open.  
**Implementation notes:**
- Find all instances of `onPointerDown → setTimeout(500ms) → setSheet(true)`
- Replace with `onClick={() => setSheet(true)}`
- Keep the sheet content exactly as-is — only the trigger changes
- Also add a "Ver todos" text link beside avatar clusters as a visible affordance

**Acceptance criteria:**
- Single tap on friend avatar cluster opens the follower/friends sheet
- Single tap on like/dislike count (or the avatar row below it) opens the reactions sheet
- No long-press behavior remains

**Risks:** None. Strictly simpler than the current implementation.  
**Manual review:** Verify both the follower sheet and the reactions sheet open correctly on tap in both List Open and Restaurant screens.

---

### [ ] 1.7 — Label the "+" save button on Restaurant screen

**Priority:** P0  
**User problem:** The coral circle "+" is the primary save action but has no label — it reads as "expand" or a bullet point.  
**Proposed solution:** Add a "Salvar" text label directly below the button, or replace the icon with a bookmark icon + "Salvar" text.  
**Files likely affected:** RestaurantScreen component.  
**Implementation notes:**
- Option A (easiest): wrap the circle button in a `<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>` and add `<span style={{ fontSize: 10, color: coral, marginTop: 2 }}>Salvar</span>` below it
- Option B: replace the "+" icon with a bookmark/save icon (🔖 emoji or SVG) and the text "Salvar" inline
- Also increase the touch target to at least 44×44px if it's currently smaller

**Acceptance criteria:**
- The save action has a visible "Salvar" label
- Tapping the button or its label opens the Add-to-list sheet
- Touch target is at least 44×44px

**Risks:** Ensure the label doesn't overlap with the restaurant name text.

---

### [ ] 1.8 — "+" on Home → action sheet (Add restaurant / Create list)

**Priority:** P0  
**User problem:** The "+" in the Home header opens New List. Users expect it to save a restaurant — the primary job of the app.  
**Proposed solution:** Tapping "+" opens a bottom action sheet with two options: "Adicionar restaurante" and "Criar lista".  
**Files likely affected:** AppHeader or HomeScreen component. Look for the header "+" `onClick` handler.  
**Implementation notes:**
- Add an `actionSheet` state: `useState(false)`
- On "+" click: `setActionSheet(true)`
- Render a bottom sheet with two tappable rows:
  - "🔍 Adicionar restaurante" → navigate to Search screen (user can find and save a restaurant from there)
  - "📋 Criar lista" → navigate to New List screen (current behavior)
- The sheet should have a cancel/close option
- Style to match existing bottom sheets (same drag handle, border radius, padding)

**Acceptance criteria:**
- Tapping "+" on Home shows the action sheet
- "Criar lista" navigates to New List (same as before)
- "Adicionar restaurante" navigates to Search
- The sheet is dismissible by tapping outside or a cancel button

**Risks:** If AppHeader is shared across screens, ensure the action sheet only appears in the Home context. Consider passing an `onPlusPress` prop rather than hardcoding the behavior in AppHeader.  
**Manual review:** Test on both the register and login flows to confirm AppHeader "+" isn't inadvertently affected.

---

### [ ] 1.9 — Rename "Explorar" section and fix navigation

**Priority:** P1  
**User problem:** The "Explorar" section on Home has its arrow navigating to Map, its "Ver listas" button navigating to Lists Grid, and its label implying browse/discover — three different destinations.  
**Proposed solution:** Rename the section "Mapa" (or "Perto de você"). Make the arrow and the "Ver listas" button go to the same destination (Map).  
**Files likely affected:** HomeScreen component.  
**Implementation notes:**
- Change the section label text from "Explorar" to "Mapa" or "Perto de você"
- Change the "Ver listas" button to "Ver no mapa" and wire it to the Map screen
- If a separate "See all lists" link is desired, add it as a separate section below

**Acceptance criteria:**
- Section label updated
- Both the arrow and the button navigate to the Map screen
- No navigation goes to Lists Grid from this section (unless a separate "Suas listas" section exists)

---

### [ ] 1.10 — Display list description in List Open

**Priority:** P1  
**User problem:** Users enter a description when creating a list, but it's never shown.  
**Proposed solution:** Display the description below the author name in List Open.  
**Files likely affected:** ListOpenScreen component.  
**Implementation notes:**
- After the author/follower row, add: `{list.description && <Text style={styles.description}>{list.description}</Text>}`
- Style: 14px, color `#666`, regular weight, marginTop 4px
- If description is long (>100 chars), truncate with a "Ver mais" toggle

**Acceptance criteria:**
- Lists with a description show it below the author name
- Lists without a description show nothing (no empty space)

---

### [ ] 1.11 — Wire "Ver no Maps" to a real Maps link

**Priority:** P1  
**User problem:** `onClick={() => {}}` — the link does nothing.  
**Proposed solution:** Open Google Maps with the restaurant address.  
**Files likely affected:** RestaurantScreen component.  
**Implementation notes:**
- `window.open('https://maps.google.com/?q=' + encodeURIComponent(restaurant.address), '_blank')`
- Also update the label from "Ver no Maps" to "Abrir no Google Maps" for clarity
- Remove the CSS underline; change text color to coral to indicate tappability

**Acceptance criteria:**
- Tapping opens Google Maps (or Apple Maps on iOS) with the correct address
- No underline; text is coral-colored

---

### [ ] 1.12 — Show Search filter chips on load (not gated behind typing)

**Priority:** P1  
**User problem:** "Todos / Restaurantes / Listas / Pessoas" chips only appear after the user types something. Users don't know what the app can search.  
**Proposed solution:** Show the chips immediately when the Search screen opens.  
**Files likely affected:** SearchScreen component.  
**Implementation notes:**
- Find the condition that controls chip visibility (likely `query.length > 0`)
- Remove or change to always render the chips
- The "Todos" chip should be selected by default

**Acceptance criteria:**
- Opening the Search screen shows the filter chips immediately
- Chips function the same as before once the user types

---

### [ ] 1.13 — Add empty state when Map filter returns no results

**Priority:** P1  
**User problem:** Switching to "Salvos" or "Abertos agora" with no matching restaurants silently empties the map.  
**Proposed solution:** Show a centered message when the filtered map is empty.  
**Files likely affected:** MapScreen component.  
**Implementation notes:**
- After filtering, check if the resulting array is empty
- If empty, render a centered overlay: `"Nenhum restaurante encontrado. Explorar todos →"`
- The "Explorar todos" link resets the active filter to "Todos"

**Acceptance criteria:**
- Selecting a filter with no results shows the empty state message
- Tapping "Explorar todos" resets to showing all markers

---

### [ ] 1.14 — Wire Share button to Web Share API

**Priority:** P1  
**User problem:** Share button on Restaurant and Profile screens does nothing (`onClick={() => {}}`).  
**Proposed solution:** Implement `navigator.share`.  
**Files likely affected:** RestaurantScreen, ProfileScreen (wherever the ShareIc button is).  
**Implementation notes:**
```js
onClick={() => {
  if (navigator.share) {
    navigator.share({ title: restaurant.name, url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href);
    // show a "Link copiado!" toast
  }
}}
```

**Acceptance criteria:**
- Tapping Share on mobile opens the native share sheet
- On desktop (no `navigator.share`), copies the URL and shows a "Link copiado!" toast

---

### [ ] 1.15 — Fix map icon in List Open to filter to this list's restaurants

**Priority:** P1  
**User problem:** The map icon in List Open navigates to the general Map screen, not a map filtered to this list's restaurants.  
**Proposed solution:** Pass the current list's restaurant IDs to the Map screen as a filter parameter.  
**Files likely affected:** ListOpenScreen, MapScreen.  
**Implementation notes:**
- On navigate: `go('map', { filterListId: list.id })` (or equivalent)
- In MapScreen: if `filterListId` is present, only show markers whose restaurant ID is in the list
- Apply the filter before rendering markers; don't show filter chips if a list filter is active

**Acceptance criteria:**
- Tapping the map icon in a list with 3 restaurants shows exactly those 3 restaurants on the map
- Navigating back removes the filter

---

## Phase 2 — Visual & UI Polish

*Design system changes. Touch one token type at a time. Estimated total: 1–2 focused days.*

---

### [ ] 2.1 — Define and apply border-radius tokens

**Priority:** P1  
**User problem:** 8+ distinct border-radius values create a "not quite finished" feel across all screens.  
**Proposed solution:** Define 5 tokens and replace all ad-hoc values.  
**Files likely affected:** All components (global CSS variables or a `theme.js` constants file).  
**Implementation notes:**
Define at the top of the file or in a shared constants object:
```js
const radius = {
  sm: 8,    // chips, filter pills, tags
  md: 14,   // inputs, list rows, cards
  lg: 20,   // large cards, photos
  xl: 32,   // bottom sheets, modals
  full: 100 // pill buttons, avatars
};
```
Then do a systematic find-and-replace pass across all components. Priority fixes:
- Map filter chips: `8` → `radius.full` (100)
- Login tab switcher: `20` → `radius.md` (14)
- All form inputs: standardize to `radius.md`
- All bottom sheets: standardize to `radius.xl`

**Acceptance criteria:**
- Map filter chips match the pill style used everywhere else
- No component uses a border-radius value outside the 5-token set
- Visual check: nothing looks obviously different from before (this is normalization, not redesign)

**Risks:** Some radius values may be intentionally unique (avatar overlaps, etc.). Review each change before committing.

---

### [ ] 2.2 — Implement 6-size type scale

**Priority:** P1  
**User problem:** 13+ font sizes create micro-inconsistencies across screens.  
**Proposed solution:** Define 6 sizes and enforce them.  
**Files likely affected:** All components.  
**Implementation notes:**
```js
const type = {
  display: { fontSize: 32, fontWeight: '700' },
  title1:  { fontSize: 26, fontWeight: '600' },
  title2:  { fontSize: 20, fontWeight: '600' },
  body:    { fontSize: 15, fontWeight: '400' },
  label:   { fontSize: 13, fontWeight: '500' },
  caption: { fontSize: 11, fontWeight: '400' },
};
```
Mapping guidance:
- 28–32px headings → `title1` or `display`
- 18–22px section headers → `title2`
- 14–16px body text → `body`
- 12–13px tags, addresses, metadata → `label`
- 11px nav labels, timestamps → `caption`

**Acceptance criteria:**
- No font size outside the 6 defined values remains
- Restaurant name and list title use `title1` (26/600)
- Section headers on Home use `title2` (20/600)
- Nav labels use `caption` (11/400)

**Risks:** Some sizes (e.g., 22px) will need a judgment call — round up to `title2` or down to `body`. Document the decision.

---

### [ ] 2.3 — Adopt 4px spacing grid

**Priority:** P1  
**User problem:** Ad-hoc spacing values (6px, 7px, 14px, 18px) create visual jitter between screens.  
**Proposed solution:** All margins and paddings must be multiples of 4.  
**Files likely affected:** All components.  
**Implementation notes:**
- This is a search-and-replace pass: find `margin: 7`, `padding: 6`, `gap: 14`, etc.
- Round each to the nearest 4px multiple (7 → 8, 6 → 8, 14 → 16, 18 → 20)
- Use a spacing scale reference: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64

**Acceptance criteria:**
- No spacing value outside the 4px grid multiples remains in the codebase
- Visual check: no element appears noticeably repositioned (≤4px changes are invisible to users)

**Risks:** If spacing is hardcoded in many places, this can be a long pass. Timebox to 2 hours and prioritize the most visible screens (Home, Restaurant, List Open).

---

### [ ] 2.4 — Add borders and focus states to form inputs

**Priority:** P1  
**User problem:** Inputs are indistinguishable from static gray boxes — no border, no focus ring.  
**Proposed solution:** Add a 1px border at rest and a coral border on focus.  
**Files likely affected:** LoginScreen, NewListScreen (all `<input>` elements).  
**Implementation notes:**
```js
// Rest state
border: '1px solid #E8E8E8',
borderRadius: radius.md,  // 14px
background: '#F4F4F4',

// Focus state (via onFocus/onBlur state or CSS :focus)
border: '1.5px solid #E0705F', // coral
outline: 'none',
```

**Acceptance criteria:**
- All form inputs have a visible border in rest state
- Focused input shows a coral border
- No visual regression on non-input elements

---

### [ ] 2.5 — Add elevation to restaurant cards in List Open

**Priority:** P1  
**User problem:** Restaurant cards are flat `#F4F4F4` divs — they don't read as tappable.  
**Proposed solution:** Give cards a white background and a subtle shadow.  
**Files likely affected:** ListOpenScreen (restaurant card component).  
**Implementation notes:**
```js
background: '#FFFFFF',
boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
borderRadius: radius.md, // 14px
```
Also set the page background to `#FAFAFA` so white cards pop against it.

**Acceptance criteria:**
- Cards appear elevated above the page background
- Cards read as tappable

---

### [ ] 2.6 — Fix feed image gap and proportions

**Priority:** P2  
**User problem:** Two side-by-side feed images touch with no gap; crop is too wide/short.  
**Proposed solution:** Add 8px gap; increase image height to a 1:1 or 4:3 ratio.  
**Files likely affected:** HomeScreen feed card component.  
**Implementation notes:**
- Add `gap: 8` to the row container
- Change image height from current value to equal the image width (1:1 square crop)
- Use `objectFit: 'cover'` and `borderRadius: radius.md` on each image

**Acceptance criteria:**
- 8px visible gap between the two images
- Images are square (1:1 aspect ratio)
- No images cropped to only show ceiling or text

---

### [ ] 2.7 — Warm the mini-map on Home

**Priority:** P2  
**User problem:** The Leaflet map tile uses cool gray tones that feel foreign against the warm coral/navy palette.  
**Proposed solution:** Apply a CSS filter to warm the tile layer.  
**Files likely affected:** HomeScreen map component (where the Leaflet tile layer is configured).  
**Implementation notes:**
- On the Leaflet tile layer element or its container: `filter: 'saturate(0.7) sepia(0.15) brightness(1.02)'`
- Do NOT apply this filter on the full Map screen — only the mini-map on Home

**Acceptance criteria:**
- Mini-map on Home has a warmer, slightly sepia tone
- Full Map screen is unchanged

---

### [ ] 2.8 — Improve Login tab switcher contrast

**Priority:** P2  
**User problem:** Active vs. inactive tab is nearly indistinguishable (white vs. #F4F4F4, ~1.05:1 contrast ratio).  
**Proposed solution:** Make the inactive label explicitly lighter and the active label darker + bolder.  
**Files likely affected:** LoginScreen tab switcher component.  
**Implementation notes:**
- Inactive: `color: '#999999', fontWeight: '400'`
- Active: `color: '#050615', fontWeight: '700'`
- Active tab background: `background: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.15)'`

**Acceptance criteria:**
- Active and inactive tabs are clearly distinguishable at a glance
- No design elements besides the tab switcher are affected

---

### [ ] 2.9 — Replace semantic green with warmer palette-consistent green

**Priority:** P2  
**User problem:** The "Seguindo" / "Adicionado" green (~#4CAF50) is cool-toned and clashes with the warm coral/navy palette.  
**Proposed solution:** Replace with `#52B97A` (warm, desaturated green).  
**Files likely affected:** Any component with the follow/added success state.  
**Implementation notes:**
- Global find-and-replace: `#4CAF50` (or whatever the current green value is) → `#52B97A`

**Acceptance criteria:**
- Success states still read as green
- Green harmonizes better with the coral primary color

---

### [ ] 2.10 — Fix "+" / restaurant name alignment on Restaurant screen

**Priority:** P2  
**User problem:** The coral circle and restaurant name text are top-aligned, making the circle float above the text optical center.  
**Proposed solution:** Change to `alignItems: 'center'`.  
**Files likely affected:** RestaurantScreen name row container.  
**Implementation notes:**
- Find the flex row containing the coral circle button and the restaurant name
- Change `alignItems: 'flex-start'` (or the default) to `alignItems: 'center'`

**Acceptance criteria:**
- Circle center aligns with the visual midpoint of the restaurant name text
- One-line restaurant names and multi-line names both look correct

---

## Phase 3 — Product Flow Improvements

*These require new UI states or minor feature additions. Clarify product decisions before starting.*

---

### [ ] 3.1 — "Visited vs. Want to Try" intent on save

**Priority:** P1  
**User problem:** Saving a restaurant doesn't capture whether the user has been there or wants to go. Profile tabs (Pins, Locais) are permanently empty because nothing feeds them.  
**Proposed solution:** Add a two-option toggle to the Add-to-list sheet: "Já fui ✓" / "Quero ir 🔖". Wire the selection to populate Profile tabs.  
**Files likely affected:** AddToListSheet component, ProfileScreen (Pins + Locais tabs), wherever the save data model is defined.  
**Implementation notes:**
- Add `intent: 'visited' | 'want_to_try'` to the restaurant save object
- Default: `'want_to_try'` (safer assumption)
- In ProfileScreen: filter saved restaurants by intent for each tab
  - Locais → `intent === 'visited'`
  - Pins (rename to "Quero ir") → `intent === 'want_to_try'`
- Update the tab label: "Pins" → "Quero ir"

**Decision needed:** Should "Quero ir" and "Já fui" be mutually exclusive, or can a user mark a visited place they also want to return to? For MVP: mutually exclusive.

**Acceptance criteria:**
- Add-to-list sheet shows the two-option toggle
- Saving with "Já fui" adds the restaurant to Profile > Locais
- Saving with "Quero ir" adds it to Profile > Quero ir (formerly Pins)
- Profile tabs are no longer empty after saving

---

### [ ] 3.2 — Explain and populate Profile tabs with empty states

**Priority:** P0 (remove confusion) / P1 (full implementation after 3.1)  
**User problem:** "Pins" and "Locais" tabs appear with an icon and "Nenhum X ainda" — no explanation, no path to fill them.  
**Proposed solution (before 3.1 is built):** Immediate fix — add explanatory empty state copy that tells the user what the tab is for and how to populate it.  
**Proposed solution (after 3.1):** The tabs will be populated by intent on save.  
**Files likely affected:** ProfileScreen (Pins tab, Locais tab).  
**Implementation notes for immediate fix:**
- Pins tab empty state: `"Restaurantes que você quer visitar aparecerão aqui. Ao salvar um restaurante, escolha 'Quero ir'."`
- Locais tab empty state: `"Restaurantes que você já visitou aparecerão aqui. Ao salvar um restaurante, escolha 'Já fui'."`
- Keep the existing icon; just update the text

**Acceptance criteria:**
- Both tabs explain what they're for
- Both tabs explain how to populate them
- No tab appears permanently broken

---

### [ ] 3.3 — Add "My Lists" to bottom navigation

**Priority:** P0  
**User problem:** For an app centered on lists, My Lists isn't accessible from the nav. It's buried 2–3 taps deep.  
**Proposed solution:** Add a "Listas" tab to the bottom navigation, or make it the primary content of Home above the friend feed.  
**Files likely affected:** BottomNav component, HomeScreen component.  
**Decision needed:** Replace which existing tab? Options: (a) replace "Mapa" and move the map to a secondary entry point, (b) make it the 5th tab, (c) keep 4 tabs but surface My Lists at the top of Home. Recommended: option (c) — add a "Minhas listas" horizontal scroll row at the top of Home, above the feed, as the fastest implementation.  
**Implementation notes for option (c):**
- On HomeScreen, above "Seus amigos" feed, add a "Minhas listas" section
- Render the user's lists as small horizontal-scroll cards (title + cover photo + count)
- If the user has 0 lists, show: `"Crie sua primeira lista →"` (tappable, navigates to New List)
- Add a "Ver todas" link that goes to the Lists Grid

**Acceptance criteria:**
- User can reach their own lists within 1–2 taps from Home
- The path is obvious — no need to know to check the map overlay or Profile tab

---

### [ ] 3.4 — Add "+ Salvar" to Map restaurant bottom sheet

**Priority:** P1  
**User problem:** Discovering a restaurant on the map requires navigating away to save it.  
**Proposed solution:** Add a secondary "+ Salvar" button in the map restaurant bottom sheet.  
**Files likely affected:** MapScreen (restaurant bottom sheet / marker tap handler).  
**Implementation notes:**
- In the bottom sheet that appears on marker tap, add a secondary button: `[+ Salvar]` (outline style, coral border)
- `onClick` → open the AddToListSheet with this restaurant pre-selected
- After saving, close both sheets and return to the map

**Acceptance criteria:**
- Tapping a map marker shows a bottom sheet with both "Ver restaurante" and "+ Salvar"
- "+ Salvar" opens the Add-to-list sheet
- After saving, user is back on the map (not navigated away)

---

### [ ] 3.5 — "Add this restaurant" CTA in Search zero-results state

**Priority:** P1  
**User problem:** Searching for a restaurant not in the database hits a dead end.  
**Proposed solution:** Add an "Adicionar restaurante" CTA to the zero-results state.  
**Files likely affected:** SearchScreen.  
**Implementation notes:**
- In the zero-results state, below "Nenhum resultado para X", add a tappable row: `"Adicionar '${query}' ao Eatlist →"`
- For MVP, this can navigate to a simple "New Restaurant" form with name pre-filled from the search query
- Minimum form fields: Name (pre-filled), Address (text field), optional: Category, Photo

**Acceptance criteria:**
- Searching for an unknown restaurant shows the "Adicionar" CTA
- Tapping it opens a form with the restaurant name pre-filled
- Submitting creates a new restaurant entry and navigates to its screen

---

### [ ] 3.6 — Add optional personal note in the Add-to-list flow

**Priority:** P2  
**User problem:** Like/dislike is binary. Users can't record why they liked a place.  
**Proposed solution:** Add an optional text field to the Add-to-list sheet.  
**Files likely affected:** AddToListSheet component.  
**Implementation notes:**
- Below the list selection list, add: `<textarea placeholder="Adicionar nota (opcional)..." maxLength={200} />`
- Store as `restaurant.note` alongside the list save
- Display the note on the Restaurant screen below the tags (if present)
- 200-character limit; show character counter

**Acceptance criteria:**
- Text field appears in the Add-to-list sheet
- Note is saved with the restaurant
- Note appears on the Restaurant screen if present

---

## Phase 4 — Larger Structural Improvements

*These require product decisions and more implementation effort. Do not start without user research validation.*

---

### [ ] 4.1 — Redesign Home screen around primary user intent

**Decision first:** Which action should a new user take in the first 10 seconds — save, discover, or browse social? Run user interviews (see Research Questions in the Product Brief) before redesigning.

**Current problem:** Home tries to be a discovery feed, a social feed, and a map entry point simultaneously. No single job is served well.

**Proposed direction (to validate):**
- If primary job = save: Make the "Add restaurant" action the most prominent element on Home (a large coral CTA at the top)
- If primary job = social: Make the friend feed full-screen with inline save actions on each card
- If primary job = discover: Replace the current layout with a curated "Trending in your city" + map section

**Implementation:** TBD after research. Defer this task.

---

### [ ] 4.2 — Design and implement "Add a new restaurant" full flow

**Current problem:** Users can't save a restaurant that isn't already in the database. This blocks the most common real-world use case (discovering a place IRL).

**Proposed flow:**
1. User searches → zero results → taps "Adicionar restaurante"
2. Form: Name (required), Address (Google Places autocomplete, required), Category (dropdown), Photo (optional)
3. On submit: create a new restaurant entry, navigate to its screen with a "Salvo em..." sheet

**Dependencies:** Google Places API integration for address autocomplete. This is the highest-complexity item in the plan.

**Defer until:** Phase 3.5 (simple version) is validated with users.

---

### [ ] 4.3 — Social feed: inline save action on feed cards

**Current problem:** The friend feed is the most prominent section on Home but doesn't let users act on what they see — no save, no quick-open, no reaction.

**Proposed solution:** Add a bookmark icon to each feed card that opens the Add-to-list sheet for that restaurant.

**Files affected:** HomeScreen feed card component.

**Defer until:** Phase 3 is complete and the Add-to-list sheet is stable.

---

### [ ] 4.4 — "Editar perfil" screen

**Current problem:** `onClick={() => {}}` on the Edit Profile button — users can't update their name, handle, or photo.

**Minimum viable:**
- Name (text input, pre-filled)
- Handle (text input, pre-filled, @ prefix)
- Bio (textarea, optional, 150 chars)
- Avatar (file picker or camera, optional)
- Save / Cancel

**Files affected:** ProfileScreen + new EditProfileScreen component.

---

### [ ] 4.5 — Breadcrumbs / contextual subtitles on detail screens

**Current problem:** Users dropped onto Restaurant or List Open can't tell where they are in the hierarchy.

**Proposed solution:** Add a subtitle line above the main title: e.g., "← Padarias no centro" on RestaurantScreen when navigated from a list.

**Implementation:** Requires passing a `fromContext` prop on navigation (the list name or screen name the user came from). Display as a small tappable label that acts as a back button to that specific context.

---

## Appendix: Quick Reference — Dead Buttons

All `onClick={() => {}}` handlers in the codebase. Wire or remove before first user test.

| Location | Element | Fix |
| --- | --- | --- |
| RestaurantScreen | "Ver no Maps" | Google Maps deep link |
| RestaurantScreen / ProfileScreen | Share icon (ShareIc) | `navigator.share` |
| RestaurantScreen | "···" More menu | Implement: Edit, Remove, Report |
| ProfileScreen | "Editar perfil" | Edit profile screen (Phase 4.4) |
| ProfileScreen | Followers / Following count | Open followers list on tap |
| NewListScreen | Camera / "Adicionar foto" | `<input type="file" accept="image/*">` |
| MapScreen | "Buscar no mapa..." div | Real `<input>` (Phase 1.4) |

---

## Appendix: Design Tokens Reference

Copy this into a `theme.js` or CSS variables file before starting Phase 2.

```js
export const colors = {
  coral:      '#E0705F',
  coralLight: '#FAE8E5',
  coralMid:   '#F0A898',
  coralDark:  '#C5574A',
  navy:       '#050615',
  surface:    '#F4F4F4',
  border:     '#E8E8E8',
  green:      '#52B97A',
  textPrimary:   '#050615',
  textSecondary: '#666666',
  textMuted:     '#999999',
};

export const radius = {
  sm:   8,
  md:   14,
  lg:   20,
  xl:   32,
  full: 100,
};

export const type = {
  display: { fontSize: 32, fontWeight: '700', letterSpacing: '-0.02em' },
  title1:  { fontSize: 26, fontWeight: '600', letterSpacing: '-0.02em' },
  title2:  { fontSize: 20, fontWeight: '600', letterSpacing: '-0.02em' },
  body:    { fontSize: 15, fontWeight: '400', letterSpacing: '-0.02em' },
  label:   { fontSize: 13, fontWeight: '500', letterSpacing: '-0.02em' },
  caption: { fontSize: 11, fontWeight: '400', letterSpacing: '-0.02em' },
};

export const space = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
// Usage: space[4] = 16px, space[6] = 24px, etc.

export const component = {
  buttonHeight: 48,
  inputHeight:  48,
  chipHeight:   36,
  tagHeight:    28,
};
```

---

## Suggested Execution Order (Claude Code Prompt Sequence)

Send these in order, one at a time, waiting for each to be verified before the next:

1. `1.2` Tagline opacity (5 min, zero risk, builds confidence)
2. `1.1` Bold titles (15 min, high visual impact)
3. `1.7` Label the save button on Restaurant screen
4. `1.3` Register form validation
5. `1.4` Wire map search input
6. `1.5` Redirect after list creation
7. `1.6` Long-press → regular tap
8. `1.8` Home "+" action sheet
9. `1.9` through `1.15` in order
10. Appendix: wire all dead buttons
11. Phase 2 tokens (start with `2.1` border-radius, then `2.2` type, then `2.3` spacing)
12. Phase 3 (after product decisions confirmed)
13. Phase 4 (after user research)
