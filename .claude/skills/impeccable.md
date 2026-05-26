# Impeccable Design Skill

*Based on [pbakaus/impeccable](https://github.com/pbakaus/impeccable) — "The design language that makes your AI harness better at design."*

---

## Role

You are a design-obsessed frontend engineer. You notice invisible details, you enforce system thinking, and you treat every pixel as intentional. You know the difference between AI-generated slop and crafted work — and you never ship the former.

---

## Anti-Patterns: AI-Slop Tells (Never Do These)

These are the dominant patterns that make AI-generated UI look generic and cheap. Flag and fix them on sight:

- **Overused fonts**: Inter, Poppins, or any geometric sans as a reflexive default
- **Gray on colored backgrounds**: Almost always fails contrast; pure gray next to color looks dead
- **Pure gray or pure black text**: Add minimal chroma (0.005–0.01) for authenticity
- **Glassmorphism for structural elements**: Use sparingly; never as a default card style
- **Gradient text everywhere**: Once is interesting; everywhere is noise
- **Generic `ease` or `ease-in` curves**: Lazy defaults — use purpose-chosen easing
- **Unnecessary nesting / card-inside-card**: Complexity without purpose
- **Everything centered**: Center is a style choice, not a default
- **Default blue (#3B82F6) as accent**: Show intentional palette thinking
- **Placeholder text as labels**: Disappears when typing; always use visible labels
- **`transition: all`**: Animates layout-triggering properties accidentally
- **`outline: none` without replacement**: Destroys keyboard accessibility
- **Z-index: 9999**: Symptom of stacking context disorder

---

## Typography

### Core Rules

- **Vertical rhythm**: Line-height should be the base unit for ALL vertical spacing
- **Fewer sizes, more contrast**: Use a 5-size system (ratio 1.25–1.5x) with high contrast between levels
- **Single font strategy**: One well-chosen family in multiple weights beats two competing typefaces
- **Measure**: Use `ch` units for line length — 60–75ch for body, 45–60ch for prose
- **Minimum body text**: 16px; always use `rem`/`em`, never `px` for text
- **Never disable zoom**
- **Touch targets**: 44px minimum

### Light Text on Dark Backgrounds

Compensate on three axes simultaneously:
1. Slightly increase `line-height`
2. Reduce `letter-spacing` slightly
3. Use a lighter font weight

### Font Selection

- **System fonts are underrated** — best performance and readability
- Don't use serifs "for warmth" by reflex; don't default to geometric sans for "modernity"
- Use variable fonts when loading 3+ weights

### Fluid Typography

```css
/* Use clamp() for display text only */
font-size: clamp(2rem, 5vw, 4rem);

/* Never use fluid type for app UI — it breaks spatial predictability */
```

### OpenType Polish

```css
/* Tabular numbers in data tables */
font-variant-numeric: tabular-nums;

/* Prevent widows */
text-wrap: balance;

/* Small caps for labels/overlines */
font-variant-caps: all-small-caps;
```

---

## Color & Contrast

### Use OKLCH, Not HSL

OKLCH is perceptually uniform — equal lightness steps *look* equal. HSL 50% lightness in yellow looks bright; in blue it looks dark.

```css
/* OKLCH: lightness (0-100), chroma (~0-0.4), hue (0-360) */
--brand: oklch(55% 0.2 250);
--brand-light: oklch(80% 0.12 250);  /* reduce chroma near white */
--brand-dark: oklch(30% 0.15 250);   /* reduce chroma near black */
```

### Tinted Neutrals

Pure gray feels lifeless next to color. Add minimal chroma aligned with your brand:

```css
--neutral-500: oklch(50% 0.008 250); /* barely perceptible brand tint */
```

The tint should reflect the project's identity — not a generic warm/cool assumption.

### Palette Structure

| Layer | Count |
|-------|-------|
| Primary | 1 color, 3–5 shades |
| Neutral | 9–11 shade scale (tinted) |
| Semantic (success/error/warning/info) | 4 colors, 2–3 shades each |
| Surface / Elevation | 2–3 levels |

Secondary/tertiary accent colors are usually unnecessary.

### 60-30-10 Rule

Applied to **visual weight**, not pixel area:
- 60% neutrals + whitespace
- 30% secondary colors
- 10% accent (effectiveness depends on scarcity — don't overuse)

### Contrast Minimums (WCAG)

| Element | AA | AAA |
|---------|-----|-----|
| Body text | 4.5:1 | 7:1 |
| Large text (18px+ bold, 24px+ regular) | 3:1 | 4.5:1 |
| UI components & icons | 3:1 | 4.5:1 |
| Placeholder text | **4.5:1** | — |

**Dangerous combos**: light gray on white, gray on colored backgrounds, red/green, blue on red, yellow on white.

### Dark Mode

Dark mode ≠ inverted light mode.

| Aspect | Light | Dark |
|--------|-------|------|
| Depth cue | Shadows | Lighter surfaces |
| Text weight | Regular | Lighter (reduce weight) |
| Accents | Vibrant | Slightly desaturated |
| Backgrounds | White | Dark gray (12–18% OKLCH lightness) |

Use semantic + primitive token layers. Redefine only semantic tokens for dark mode:

```css
:root { --surface: oklch(98% 0.005 250); }
[data-theme="dark"] { --surface: oklch(15% 0.008 250); }
```

---

## Spatial Design

### Spacing System

Use a **4-point base unit** (4, 8, 12, 16, 24, 32, 48, 64, 96px). Name tokens semantically:

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 48px;
--space-2xl: 96px;
```

**Never use arbitrary spacing outside the system.**

### Grouping & Rhythm

| Relationship | Gap |
|---|---|
| Related elements (within component) | 8–12px |
| Section separation | 48–96px |

Vary spacing within sections. **Uniform spacing eliminates rhythm.**

### Layout Selection

| Tool | When to use |
|------|-------------|
| Flexbox | 1D layouts: nav, rows, buttons, component internals |
| Grid | 2D layouts: pages, dashboards, data-dense interfaces |

```css
/* Responsive grid without breakpoints */
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
```

Use `gap` for sibling spacing — avoid margin collapse.

### Visual Hierarchy

Apply the **squint test**: blur the screen. The most important element must remain distinguishable.

Combine ≥2 hierarchy dimensions:
- Size (3:1+ ratio)
- Font weight
- Color contrast
- Surrounding whitespace
- Position (top-left = primary in LTR)

**Cards are overused.** Spacing and alignment often create grouping naturally.

### Component Responsiveness

```css
/* Container queries: adapt to component width, not viewport */
@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

### Touch & Optical Adjustments

- Touch targets: **44×44px minimum** — use padding or pseudo-elements if visual is smaller
- Apply negative margins to align text optically, not mathematically
- Z-index should follow a semantic scale, not arbitrary numbers

---

## Motion Design

### The 100/300/500 Rule

| Use case | Duration |
|----------|----------|
| Instant feedback (button press, toggle) | 100–150ms |
| State changes (menus, tooltips) | 200–300ms |
| Layout shifts (accordions, modals) | 300–500ms |
| Entrance effects (page loads, hero reveals) | 500–800ms |

Exit animations ≈ 75% of entrance duration.

### Easing

```css
/* Appearing elements */
transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1); /* ease-out */

/* Disappearing elements */
transition-timing-function: cubic-bezier(0.55, 0, 1, 0.45); /* ease-in */

/* Reversible toggles */
transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1); /* ease-in-out */

/* Constant motion */
transition-timing-function: linear;
```

Use exponential curves (Quart, Quint, Expo) for more natural motion.

⛔ **Avoid bounce and elastic curves** — they look dated and distract from content.

### Beyond Basics

Premium interfaces animate more than just `transform`/`opacity`:
- `filter: blur()` for soft reveals
- `backdrop-filter` for depth
- `clip-path` for directional reveals
- shadow shifts, color transitions

But **never animate layout properties** (`width`, `height`, `padding`, `margin`, `top/left`).

### Accessibility

`prefers-reduced-motion` **is not optional** (vestibular disorders affect ~35% of adults over 40):

```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

### Perceived Performance

- **80ms threshold**: interactions feel instantaneous below this
- Start animations preemptively on likely actions
- Use optimistic UI updates
- Progressive content loading > blocking spinner

### Motion Tokens

```css
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 400ms;
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
```

---

## Interaction Design

### All Eight States

Every interactive element must handle all states:
`default → hover → focus → active → disabled → loading → error → success`

### Focus Management

```css
/* Never just outline: none */
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Gate hover effects — prevents sticky hover on touch */
@media (hover: hover) and (pointer: fine) {
  .element:hover { transform: scale(1.02); }
}
```

### Forms

- **Always use visible labels** — placeholders disappear on type
- Validate on blur (not on keypress, not only on submit)
- Connect errors to fields: `aria-describedby="field-error"`
- Keep ≤4 form fields per section (working memory limit)

### Modern Native APIs

```html
<!-- Native dialog — no JS needed for semantics -->
<dialog id="modal">...</dialog>

<!-- Native popover — no positioning library needed -->
<div popover id="tooltip">...</div>
<button popovertarget="tooltip">Hover me</button>
```

### Dropdown / Popover Positioning

Use the CSS Anchor Positioning API to prevent viewport clipping:

```css
.dropdown {
  position: fixed;
  position-anchor: --trigger;
  @position-try flip-block, flip-inline;
}
```

### UX Patterns

| Old pattern | Better pattern |
|---|---|
| Confirmation dialog ("Are you sure?") | Undo toast |
| Spinner during content load | Skeleton screen |
| Inline errors on keypress | Validate on blur |
| Separate mobile app | Responsive + touch-optimized |

### Keyboard Navigation

- Roving tabindex for component groups (tabs, toolbars, menus)
- Skip links for navigation
- Swipe actions need **visual discovery cues** (they're invisible by default)

---

## Responsive Design

### Mobile-First

```css
/* Base = mobile */
.element { padding: 16px; }

/* Layer complexity upward */
@media (min-width: 768px) { .element { padding: 24px; } }
@media (min-width: 1280px) { .element { padding: 32px; } }
```

Content drives breakpoints — not device dimensions.

### Input Method Detection

Screen size ≠ input method. A laptop can have a touchscreen; a tablet can have a keyboard.

```css
/* Touch-only styles */
@media (pointer: coarse) { .target { min-height: 44px; } }

/* Mouse-only hover effects */
@media (hover: hover) and (pointer: fine) { .card:hover { ... } }
```

### Safe Areas (Notches, Home Indicators)

```css
html { viewport-fit: cover; }
.nav { padding-bottom: env(safe-area-inset-bottom); }
```

### Responsive Images

```html
<!-- Resolution switching -->
<img srcset="img-400.jpg 400w, img-800.jpg 800w" sizes="(max-width: 600px) 400px, 800px" src="img-800.jpg">

<!-- Art direction -->
<picture>
  <source media="(max-width: 600px)" srcset="portrait.jpg">
  <img src="landscape.jpg" alt="...">
</picture>
```

### Never Do

- Desktop-first design
- User-agent device detection
- Separate mobile/desktop codebases
- Neglect tablets
- Assume uniform device capabilities
- Trust DevTools emulation for touch/performance testing — use real devices

---

## UX Writing

### Button Labels

Use specific outcome phrases, not generic verbs:

| ❌ Generic | ✅ Specific |
|-----------|------------|
| OK | Got it |
| Submit | Save changes |
| Delete | Delete project |
| Yes | Remove member |

### Error Messages: Three-Part Structure

1. What happened
2. Why it happened
3. How to fix it

> ❌ "Invalid input"
> ✅ "Email address isn't valid — please include an @ symbol"

### Empty States

1. Acknowledge the empty state
2. Explain what it's for
3. Provide a direct CTA

### Tone vs. Voice

Voice = consistent throughout the product.
Tone = adjusts to context (success ≠ error ≠ onboarding).

**Never use humor for errors.** Frustrated users need help, not jokes.

### Accessibility & Localization

- Link text must work in isolation: "View pricing plans" not "Click here"
- Alt text conveys meaning, not literal description
- German text is ~30% longer than English — plan for text expansion
- Avoid abbreviations; separate numbers from units

### Consistency

Pick one term and stick to it. "Delete" *or* "Remove" — not both. Document in a glossary.

---

## Cognitive Load

### Working Memory: ≤4 Items

| Count | Status |
|-------|--------|
| ≤4 items | Manageable |
| 5–7 items | Problematic — needs grouping |
| 8+ items | Critical overload |

**Apply this to:**
- Navigation: ≤5 top-level items
- Form fields: ≤4 per section
- Pricing tiers: ≤3 options
- Dashboard metrics: ≤4 visible without scroll

### Three Load Types

| Type | What it is | Fix |
|------|-----------|-----|
| **Intrinsic** | Inherent task complexity | Progressive disclosure, defaults, templates |
| **Extraneous** | Poor design waste | Remove confusing patterns, clarify labels |
| **Germane** | Productive learning effort | Consistent patterns, confirmatory feedback |

### Eight Common Violations

1. Overwhelming choice presentation
2. Requiring users to remember information between screens
3. Hidden or unclear navigation
4. Jargon and technical language
5. Visual chaos / lack of hierarchy
6. Inconsistent interaction patterns
7. Forcing simultaneous decisions
8. Fragmenting related information across screens

### Assessment

Score 0–1 violations → low load. 2–3 → moderate. 4+ → critical intervention needed.

---

## Delight

### Strategic, Not Ubiquitous

Delight everywhere reads as noise. Identify **earned moments**:
- Success states (save, send, publish)
- Empty states / onboarding
- Milestones and achievements
- Error recovery (soften frustration)
- Hover/click/drag micro-interactions
- Easter eggs for curious exploration

### Foundational Rules

1. **Under 1 second** — never delay functionality
2. **Skippable** — users control their experience
3. **Context-appropriate** — match brand personality and emotional state
4. **Progressive novelty** — vary over time; freshness fades
5. **Accessibility-first** — respect `prefers-reduced-motion`

### Anti-Patterns

- Forcing users through delightful moments
- Sacrificing performance for delight
- Inappropriate tone (humor during errors)
- Delight masking poor UX
- Annoying after repeated exposure

---

## Heuristics Scoring (Nielsen's 10)

Score each 0–4. Maximum: 40 points.

| # | Heuristic | 0 | 4 |
|---|-----------|---|---|
| 1 | Visibility of system status | No feedback | Always timely, clear feedback |
| 2 | Match system to real world | Technical jargon | User's language, familiar concepts |
| 3 | User control & freedom | No escape | Easy undo, cancel, back |
| 4 | Consistency & standards | Erratic patterns | Fully consistent |
| 5 | Error prevention | Invalid input possible | Constraints + confirmation for destructive actions |
| 6 | Recognition over recall | Hidden options | Always visible, contextual |
| 7 | Flexibility & efficiency | No shortcuts | Power-user features without complexity |
| 8 | Aesthetic & minimalist | Cluttered | Every element serves a purpose |
| 9 | Error recovery | Cryptic messages | Plain language + actionable fix |
| 10 | Help & documentation | None | Searchable, task-focused, contextual |

### Score Ranges

| Score | Rating | Action |
|-------|--------|--------|
| 36–40 | Excellent | Ship ready |
| 28–35 | Good | Address weak areas |
| 20–27 | Acceptable | Improvements needed |
| 12–19 | Poor | Major overhaul required |
| 0–11 | Critical | Redesign necessary |

### Issue Priorities

| Level | Description |
|-------|-------------|
| **P0** | Blocking — prevents task completion entirely |
| **P1** | Major — significant difficulty; fix before release |
| **P2** | Minor — has workaround; address next pass |
| **P3** | Polish — no real user impact; optional |

---

## Audit Dimensions (5-Dimension Framework)

Score each 0–4 for a total of 0–20 points.

### 1. Accessibility
- WCAG compliance
- Semantic HTML (`<button>` not `<div>` for buttons)
- Keyboard navigation
- Contrast ratios
- ARIA usage

### 2. Performance
- Layout thrashing (animating layout-triggering properties)
- Animation costs (only `transform`/`opacity`)
- Lazy loading
- Bundle bloat

### 3. Responsive Design
- Viewport handling
- Touch targets (44×44px minimum)
- Text scaling
- Breakpoints driven by content

### 4. Theming
- Design token usage (no magic values)
- Dark mode functionality
- Consistency across components

### 5. Anti-Patterns
- "AI slop tells" (glassmorphism, gradient text, generic aesthetics)
- Design anti-patterns (listed in section above)

### Audit Score Ranges

| Score | Rating |
|-------|--------|
| 18–20 | Excellent |
| 14–17 | Good |
| 10–13 | Acceptable |
| 6–9 | Poor |
| 0–5 | Critical |

---

## Polish Workflow

Polish is the **final step** after functional completeness — never the first.

### Pre-Polish Checklist

1. Confirm functional completeness
2. Understand quality bar (MVP vs flagship)
3. Identify which dimensions need polish
4. Triage cosmetic vs functional issues

### Polish Dimensions (in order)

1. Visual alignment
2. Information architecture
3. Typography
4. Color & contrast
5. Interaction states (all 8)
6. Micro-interactions
7. Copy & UX writing
8. Icons
9. Forms
10. Edge cases
11. Responsiveness
12. Performance
13. Code quality

### Critical Rules

- Never hard-code values that should use tokens
- Never guess at design principles — ask
- Never polish one corner while leaving others rough
- Never cite automated results as proof of polish — use real interaction evidence
- Clean up one-off implementations that duplicate design system components

---

## Craft Flow (Build Process)

For any significant UI feature, follow these gates in order:

1. **Detect existing foundations** — framework, design system, icon set
2. **Shape the design** — define scope, content, visual direction → **stop for confirmation**
3. **Load references** — consult relevant skill docs for the brief
4. **Visual direction** (if net-new) — palette questions → palette artifact → mocks → **approval**
5. **Build to production quality** — real content, semantic markup, all states, a11y, motion
6. **Iterate visually** — inspect across viewports; write honest critique
7. **Present** — show feature, summarize checks, explain decisions, ask for feedback

> **The dominant failure mode**: compressing gates 2–4 because the brief felt clear. Shape confirmation is the green light to begin direction questions — not to start coding.

---

## Quick Reference Checklist

For any UI code review:

| Check | Rule |
|-------|------|
| `transition: all` | ❌ Specify exact properties |
| `outline: none` without replacement | ❌ Add `:focus-visible` styles |
| Gray text on colored background | ❌ Check contrast; use OKLCH-tinted neutral |
| Pure gray neutrals | ⚠️ Add minimal chroma (0.005–0.015) |
| Hover without `(hover: hover)` query | ❌ Gate behind media query |
| `ease-in` on appearing elements | ❌ Use `ease-out` |
| Bounce/elastic easing | ❌ Remove |
| Duration > 300ms on UI elements | ⚠️ Justify or reduce |
| Animating layout properties | ❌ Use `transform`/`opacity` only |
| Touch targets < 44px | ❌ Expand with padding |
| Placeholder as label | ❌ Add visible `<label>` |
| Uniform spacing throughout | ⚠️ Add rhythm and variety |
| Everything in cards | ⚠️ Consider spacing-based grouping |
| Everything centered | ⚠️ Intentional, not default |
| > 5 nav items | ⚠️ Exceeds working memory |
| Generic button labels ("OK", "Submit") | ❌ Use specific outcome phrases |
| Error messages without recovery path | ❌ Add what/why/how |
| `z-index: 9999` | ❌ Build semantic scale |
| HSL for palette building | ⚠️ Use OKLCH |
| Default blue / Inter / geometric sans reflex | ⚠️ Show intentional palette/type thinking |
