# Taste Skill — Anti-Slop Frontend Framework

*Based on [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) — "The Anti-Slop Frontend Framework for AI Agents."*

---

## Step 0: Brief Inference (Always First)

Before any code, declare a one-line design read:

> *"Reading this as: [page kind] for [audience], with a [vibe]."*

This prevents defaulting to AI-purple gradients, centered heroes, and three equal cards. The audience picks the aesthetic — not the model's training bias.

---

## Step 1: The Three Dials

Every design decision is gated by three variables. Set them explicitly before starting.

| Dial | Range | Low | High |
|------|-------|-----|------|
| `DESIGN_VARIANCE` | 1–10 | Perfect grid | Artistic chaos |
| `MOTION_INTENSITY` | 1–10 | Static | Cinematic scroll-hijack |
| `VISUAL_DENSITY` | 1–10 | Gallery-air | Cockpit-packed |

**Default baseline: `8 / 6 / 4`** unless the brief overrides.

---

## Step 2: Design System Selection

Use **one system per project. Never mix** (e.g., Fluent + Carbon).

| Brief Signal | Package |
|---|---|
| Microsoft / Enterprise SaaS | `@fluentui/react-components` |
| Google / Material | `@material/web` |
| IBM B2B / analytics | `@carbon/react` |
| Shopify admin | `polaris.js` |
| GitHub devtool | `@primer/react-brand` |
| UK public-sector | `govuk-frontend` |
| US public-sector | `uswds` |
| Modern SaaS (owned code) | `shadcn/ui` — **never ship default theme** |
| Indie / small team (default) | Tailwind v4 + `dark:` |

For glassmorphism, bento, brutalism, editorial, or kinetic type: build with native CSS + Tailwind + component lib. Label borrowed inspiration honestly in code comments.

---

## Anti-Default Discipline

### ⛔ The Lila Rule (AI-Purple Prohibition)

No automatic purple button glows, no random neon gradients. Use neutral bases (Zinc / Slate / Stone) with one high-contrast singular accent (Emerald, Electric Blue, Deep Rose, Burnt Orange). Override only when the brand explicitly asks for purple.

### ⛔ The Em-Dash Ban (Non-Negotiable)

**`—` is COMPLETELY banned.** The em-dash is the #1 LLM design tell.

Banned everywhere: headlines, eyebrows, pills, button text, captions, body copy, quotes, attribution. Replace with periods, commas, parentheses, colons, or line breaks. The **only** permitted dash is the hyphen (`-`) for compound words and ranges.

**If a single `—` appears in output, it fails pre-flight.**

### Color Consistency Lock

Once an accent color is chosen, it is used on the **WHOLE page**. A warm-grey site does not get a blue CTA in section 7. Pick one accent, lock it, audit every component.

### Shape Consistency Lock

Pick **ONE** corner-radius scale and apply it everywhere:
- All-sharp (0)
- All-soft (12–16px)
- All-pill (full)

Mixed systems are allowed only with a documented rule applied everywhere.

---

## Layout Discipline

### Hero Must Fit the Viewport

- Headline: max **2 lines** desktop
- Subtext: max **20 words** AND max 3–4 lines
- CTA visible **without scroll**
- Font scale planned around image size

If copy is too long, reduce font scale or cut copy. Never let the hero overflow and force scroll to find the CTA.

### Navigation on One Line

Navigation MUST render on a single line at desktop. Height cap: **80px max**. A two-line nav at desktop is broken design.

### Bento Grid Discipline

- Exactly as many cells as you have content for. 3 items = 3 cells. Never an empty cell.
- Has rhythm, not repetition. Do not stack identical grid layouts.

### Section-Layout-Repetition Ban

Once a layout family is used (3-column cards, full-width quote, split-text-image), it can appear **at most once** per page. Eight sections require **at least four different layout families**.

### Long Lists

Lists of > 5 items must use alternative UI — cards, tabs, carousel. **Not a default `<ul>`.**

---

## Real Images (Required)

Landing pages are visual products. Text-only with fake divs is incomplete.

**Priority order:**
1. **Image-generation tool** — create section-specific assets at the right aspect ratio
2. **Real web images** — `https://picsum.photos/seed/{descriptive-seed}/{w}/{h}` for placeholder photography
3. **Last resort** — leave clearly labeled `<!-- TODO: hero product photo, 1600x1200 -->` and declare gaps

**Real logos for social proof:** Use Simple Icons (`https://cdn.simpleicons.org/{slug}/ffffff`) or devicon. If the company is invented, generate a simple SVG mark — not a plain text wordmark.

**⛔ Div-based fake screenshots banned.** A product preview built from `<div>` rectangles is the #1 LLM design tell. Use a real screenshot, a generated image, or skip the preview.

---

## Default Stack

```
Framework:    React / Next.js (default to Server Components / RSC)
Styling:      Tailwind v4 — use @tailwindcss/postcss or Vite plugin
Animation:    import from 'motion/react' (NOT 'framer-motion')
Fonts:        next/font (Next.js) or @font-face + font-display: swap
```

### Icons (priority order)

`@phosphor-icons/react` > `hugeicons-react` > `@radix-ui/react-icons` > `@tabler/icons-react`

Lucide: acceptable only on explicit request or if already in the project. **One icon family per project.**

### State Management

- Local `useState` / `useReducer` for isolated UI
- `useMotionValue` / `useTransform` / `useScroll` for scroll-driven continuous values
- **NEVER `useState` for scroll progress** — re-renders collapse mobile FPS

### Responsiveness

- Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`
- **Never `h-screen`** — use `min-h-[100dvh]` (prevents mobile address-bar jank)
- Grid over flex-math: use `grid grid-cols-1 md:grid-cols-3 gap-6`, never `w-[calc(33%-1rem)]`

---

## Animation & Motion

### Core Rules

- Animate **only** `transform` and `opacity` — never `top`, `left`, `width`, `height`
- Use `useMotionValue` / `useTransform` for continuous values — **never `useState`** for scroll-driven motion
- **NEVER** `window.addEventListener('scroll')` — use Motion `useScroll()`, GSAP ScrollTrigger, or CSS scroll-driven animations
- Gate anything `MOTION_INTENSITY > 3` behind `@media (prefers-reduced-motion: no-preference)` or `useReducedMotion()`
- Motion isolated in **client-leaf components** with `'use client'`
- `useEffect` animations must have **cleanup functions**

### Canonical GSAP Patterns

**Sticky-Stack** (cards pin at viewport top and shrink):
```js
ScrollTrigger.create({
  trigger: card,
  start: "top top",
  pin: true, // every card except last
  pinSpacing: false,
});
```

**Horizontal-Pan** (vertical scroll hijacks to horizontal slide):
```js
ScrollTrigger.create({
  trigger: track,
  start: "top top",
  pin: true,
  end: `+=${trackWidth - viewportWidth}`,
  scrub: 1,
});
```

---

## Dark Mode

### Page Theme Lock (Non-Negotiable)

The page has **ONE theme**. Sections do not invert. If dark mode, ALL sections are dark. No light-mode section sandwiched between dark sections.

### Dual-Mode by Default

Never assume light-only unless the brief is print-emulating editorial. Use Tailwind `dark:` variant or CSS variables. Test in **both modes** before shipping.

---

## AI Tells — Forbidden Patterns

### Visual & CSS
- No neon outer glows by default
- No pure black (`#000000`) — use off-black (zinc-950 / `#09090b`)
- No oversaturated accents
- No excessive gradient text
- No custom mouse cursors

### Typography
- Avoid Inter as default — prefer **Geist, Outfit, Cabinet Grotesk, Satoshi**
- Italic descender clearance: when italic display type contains `y g j p q`, use `leading-[1.1]` min + `pb-1` reserve

### Content Tells ("Jane Doe" Effect)
- No generic names (John Doe, Sarah Chan)
- No generic SVG egg avatars
- No fake-perfect numbers (`99.99%`, `50%`, `1,234,567`) without real data
- No startup-slop brand names (Acme, Nexus, CloudLy)
- No filler verbs (Elevate, Seamless, Unleash, Revolutionize, Game-changer, Next-Gen, Delve, Tapestry)

### Layout & Decoration Tells
- ❌ Hero version labels (`V0.6`, `BETA`, `ALPHA`) unless launch brief
- ❌ Section-numbering eyebrows (`00 / INDEX`, `001 · Capabilities`, `06 · how it works`)
- ❌ Pills/labels overlaid on images (`Plate · Brand`, `Field notes - journal`)
- ❌ Photo-credit captions as decoration (`Field study no. 12 · Ines Caetano`)
- ❌ Version footers (`v1.4.2`, `Build 0048`) on marketing pages
- ❌ Micro-meta-sentences under eyebrows
- ❌ Decoration text strip at hero bottom (`BRAND. MOTION. SPATIAL.`)
- ❌ Floating top-right sub-text in section headings
- ❌ Scoring/progress bars with filled background tracks as comparison visuals
- ❌ Locale/city-name/time/weather strips (unless genuinely globally-distributed)
- ❌ Scroll cues (`Scroll`, `↓ scroll`, `Scroll to explore`)
- ❌ Decorative dots (zero by default)
- ❌ `border-t` + `border-b` on every row of long lists

### Content Density
- No 20-row data tables without pagination
- Paragraphs ≤ 25 words
- Quotes ≤ 3 lines of body
- `MOTION_INTENSITY > 4` means the page actually moves — never claim motion without delivering it

---

## Pre-Flight Checklist (Mandatory — Run Every Box)

**Setup**
- [ ] Brief inference declared?
- [ ] Dial values explicit and reasoned?
- [ ] Design system chosen or aesthetic labeled?
- [ ] Redesign mode detected (if applicable)?

**Forbidden patterns**
- [ ] **ZERO em-dashes** anywhere?
- [ ] No AI tells from the forbidden list above?
- [ ] No div-based fake screenshots?
- [ ] No plain-text wordmarks instead of generated SVG marks?

**Consistency**
- [ ] Page theme lock: ONE theme for whole page?
- [ ] Color consistency lock: one accent used identically throughout?
- [ ] Shape consistency lock: one corner-radius system applied?

**Layout & Structure**
- [ ] Hero fits viewport (headline ≤ 2 lines, subtext ≤ 20 words)?
- [ ] Navigation on ONE line at desktop, ≤ 80px height?
- [ ] Section-layout-repetition: ≥ 4 different layout families across 8 sections?
- [ ] Bento grids have exact cell count (N items = N cells)?
- [ ] Long lists (> 5 items) use cards/tabs/carousel — not `<ul>`?
- [ ] Cards omitted where spacing works?

**Images & Content**
- [ ] Real images used (gen-tool first, Picsum-seed second, explicit placeholders third)?
- [ ] Logo wall uses REAL SVG logos (Simple Icons) or generated marks?
- [ ] No pills/labels overlaid on images?
- [ ] No photo-credit captions as decoration?
- [ ] No version footers?
- [ ] No micro-meta-sentences under eyebrows?
- [ ] No decoration text strip at hero bottom?
- [ ] No scroll cues?
- [ ] No version labels in hero (unless launch brief)?
- [ ] No section-numbering eyebrows?
- [ ] No scoring/progress bars with filled tracks?
- [ ] No locale/time/weather strips (unless justified)?
- [ ] No decorative dots?
- [ ] No `border-t` + `border-b` on every list row?

**Motion**
- [ ] GSAP patterns per canonical skeleton?
- [ ] NO `window.addEventListener('scroll')` — using Motion / ScrollTrigger / IntersectionObserver?
- [ ] Reduced motion wrapped for `MOTION_INTENSITY > 3`?
- [ ] `useEffect` animations have cleanup functions?
- [ ] Motion isolated in client-leaf components?
- [ ] Only `transform` and `opacity` animated?

**Typography & Color**
- [ ] Button contrast checked (WCAG AA 4.5:1 min)?
- [ ] Italic descender clearance verified (`leading-[1.1]` + `pb-1`)?
- [ ] Viewport stability: `min-h-[100dvh]`, never `h-screen`?

**State coverage**
- [ ] Empty / loading / error states provided?

**Code quality**
- [ ] Icons from allowed libraries only?
- [ ] One design system per project?

**Core Web Vitals (plausibly hit)**
- [ ] LCP < 2.5s, INP < 200ms, CLS < 0.1?

---

## Redesign Protocol

### Detect Mode First

| Mode | Description |
|------|-------------|
| **Greenfield** | No existing site or full overhaul approved |
| **Redesign — Preserve** | Modernize without breaking brand |
| **Redesign — Overhaul** | New visual language on existing content |

### Audit Before Touching

Document current state:
- Brand tokens (colors, type, logo, radii)
- Information architecture (page tree, nav, conversion paths)
- Content blocks (what exists, what's filler)
- Patterns to preserve and retire
- Dial reading of existing site
- SEO baseline (ranking pages, meta titles, OG cards)

### Preservation Rules

Do not change information architecture unless asked. Keep slugs, anchor IDs, nav labels stable for SEO. Extract brand colors before applying rules. Preserve existing accessibility wins.

### Modernisation Levers (Priority Order)

1. Typography refresh
2. Spacing & rhythm
3. Color recalibration
4. Motion layer
5. Hero & key-section recomposition
6. Full block replacement *(last resort)*

### Fix Priority (Maximum Impact, Minimum Risk)

1. Font swap — instant improvement, lowest risk
2. Color palette cleanup — remove clashing or oversaturated colors
3. Hover and active states — makes interface feel responsive
4. Layout and spacing — proper grid, max-width, consistent padding
5. Replace generic components
6. Add loading, empty, and error states
7. Polish typography scale and spacing

### Governing Rules

- Preserve the existing tech stack — do not migrate frameworks
- Never break existing functionality — test after every change
- Check `package.json` before importing new libraries
- Verify Tailwind version (v3 vs v4) before modifying config
- Use vanilla CSS if the project has no framework

---

## Reference Vocabulary

### Hero Paradigms
Asymmetric Split Hero · Editorial Manifesto Hero · Video/Media Mask Hero · Kinetic-Type Hero · Curtain-Reveal Hero · Scroll-Pinned Hero

### Navigation & Menus
Mac OS Dock Magnification · Magnetic Button · Gooey Menu · Dynamic Island · Floating Speed Dial · Mega Menu Reveal

### Layout & Grids
Bento Grid · Masonry Layout · Chroma Grid · Split-Screen Scroll · Sticky-Stack Sections · Z-Axis Cascade · Editorial Split

### Cards & Containers
Parallax Tilt Card · Spotlight Border Card · Glassmorphism Panel · Holographic Foil Card · Morphing Modal

### Scroll Animations
Sticky Scroll Stack · Horizontal Scroll Hijack · Zoom Parallax · Scroll Progress Path · Liquid Swipe Transition

### Text & Typography
Kinetic Marquee · Text Mask Reveal · Text Scramble Effect · Circular Text Path · Gradient Stroke Animation · Kinetic Typography Grid

### Micro-Interactions
Particle Explosion Button · Liquid Pull-to-Refresh · Skeleton Shimmer · Directional Hover-Aware Button · Ripple Click Effect · Mesh Gradient Background

---

## Style Variant Modules

Use these when the brief calls for a specific aesthetic. Pick **one** and commit.

---

### Module A: Soft / Premium Agency

*Vanguard_UI_Architect — "Apple-esque / Linear-tier" design language*

**Forbidden fonts:** Inter, Roboto, Arial, Open Sans, Helvetica. Use: Geist, Clash Display, PP Editorial New, Plus Jakarta Sans.

**Three Vibe Archetypes:**

| Archetype | For | Background | Key treatment |
|-----------|-----|-----------|---------------|
| **Ethereal Glass** | SaaS / AI / Tech | `#050505` OLED black | Radial mesh gradients, `backdrop-blur-2xl`, wide geometric Grotesk |
| **Editorial Luxury** | Lifestyle / Real Estate / Agency | `#FDFBF7` warm cream | High-contrast variable serif headlines, CSS noise overlay (`opacity-[0.03]`) |
| **Soft Structuralism** | Consumer / Health / Portfolio | Silver-grey or white | Massive bold Grotesk, unbelievably soft ambient shadows |

**Three Layout Archetypes:**

| Layout | Description | Mobile |
|--------|-------------|--------|
| **Asymmetrical Bento** | `col-span-8 row-span-2` next to stacked `col-span-4` | `grid-cols-1`, `gap-6` |
| **Z-Axis Cascade** | Cards stacked like physical objects, subtle rotation (-2deg / 3deg) | Remove rotations below 768px |
| **Editorial Split** | Massive type left (`w-1/2`), interactive image pills right | Full-width vertical stack |

**The Double-Bezel (Haptic Depth):**

Every premium card must simulate machined hardware.

```html
<!-- Outer shell -->
<div class="p-2 rounded-[2rem] ring-1 ring-black/5 bg-black/5">
  <!-- Inner core -->
  <div class="rounded-[calc(2rem-0.375rem)] bg-... shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
    content
  </div>
</div>
```

**Button-in-Button Trailing Icon:** Icons never naked — always nest inside a circular wrapper (`w-8 h-8 rounded-full bg-black/5`), flush with button's right inner padding.

**Spatial Rhythm:** Minimum `py-24` to `py-40` for sections. Design must breathe heavily. Eyebrow tags: `rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]`.

**Motion:** All transitions use custom cubic-bezier — no `linear` or `ease-in-out`. Magnetic button hover: scale `active:scale-[0.98]` + icon `group-hover:translate-x-1 group-hover:-translate-y-[1px] scale-105`. Scroll reveals: `translate-y-16 blur-md opacity-0` → `translate-y-0 blur-0 opacity-100` over 800ms+.

**Performance:** `backdrop-blur` only on `fixed` or `sticky` elements. Grain/noise overlays only on `position: fixed; pointer-events: none` pseudo-elements. Never blur scrolling containers.

---

### Module B: Minimalist / Editorial

*Premium Utilitarian Minimalism — Notion / Linear / Editorial workspace aesthetic*

**Forbidden:** Gradients, neon colors, 3D glassmorphism, `shadow-md` through `shadow-xl`, pill primary elements, emojis (anywhere), Inter / Roboto / Open Sans.

**Typography stack:**

```css
/* UI / Body */
font-family: 'SF Pro Display', 'Geist Sans', 'Helvetica Neue', 'Switzer', sans-serif;

/* Headlines / Quotes */
font-family: 'Lyon Text', 'Newsreader', 'Playfair Display', 'Instrument Serif', serif;
letter-spacing: -0.02em to -0.04em;
line-height: 1.1;

/* Code / Metadata */
font-family: 'Geist Mono', 'SF Mono', 'JetBrains Mono', monospace;

/* Body text: never #000000 */
color: #111111; /* or #2F3437 */
line-height: 1.6;
```

**Color palette:**

```css
--bg: #FFFFFF or #F7F6F3;
--card: #FFFFFF or #F9F9F8;
--border: #EAEAEA; /* or rgba(0,0,0,0.06) */
--text-primary: #111111;
--text-secondary: #787774;

/* Accents — desaturated pastels, used semantically */
--accent-red:    #FDEBEC; color: #9F2F2D;
--accent-blue:   #E1F3FE; color: #1F6C9F;
--accent-green:  #EDF3EC; color: #346538;
--accent-yellow: #FBF3DB; color: #956400;
```

**Components:**

| Component | Spec |
|-----------|------|
| Bento cards | `border: 1px solid #EAEAEA`, `border-radius: 8–12px`, `padding: 24–40px` |
| Primary buttons | `background: #111111`, `color: white`, `border-radius: 4–6px`, no `box-shadow` |
| Tags/badges | `border-radius: 9999px`, `text-xs`, `uppercase`, `letter-spacing: 0.05em` |
| Accordions | `border-bottom: 1px solid #EAEAEA` only — no container box |
| `<kbd>` keys | `border: 1px solid #EAEAEA`, `border-radius: 4px`, `background: #F7F6F3`, monospace |

**Motion:** `translateY(12px) + opacity: 0` → `translateY(0) + opacity: 1` over 600ms, `cubic-bezier(0.16, 1, 0.3, 1)`. Stagger: `animation-delay: calc(var(--index) * 80ms)`. Card hover: `box-shadow: 0 2px 8px rgba(0,0,0,0.04)` over 200ms.

---

### Module C: Industrial Brutalism / Tactical Telemetry

*Mid-century Swiss typography + military/aerospace terminal aesthetics. Data-dense. Mechanical.*

**Binary mode — pick ONE per project, never mix:**

| Mode | Background | Text | Accent |
|------|-----------|------|--------|
| **Swiss Industrial Print** | `#F4F4F0` (newsprint) | `#050505` (carbon ink) | `#E61919` (aviation red) |
| **Tactical Telemetry** | `#0A0A0A` (CRT off) | `#EAEAEA` (phosphor) | `#E61919` + optional `#4AF626` (one element only) |

**Typography:**

```css
/* Macro headers — structural load-bearing walls */
h1 {
  font-family: 'Neue Haas Grotesk', 'Archivo Black', sans-serif;
  font-weight: 900;
  font-size: clamp(4rem, 10vw, 15rem);
  letter-spacing: -0.04em;
  line-height: 0.9;
  text-transform: uppercase;
}

/* Telemetry / metadata — monospace absolutism */
.telemetry {
  font-family: 'JetBrains Mono', 'IBM Plex Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

**Grid determinism:**

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1px;
  background-color: #050505; /* Visible dividing lines */
}
.grid-item { background-color: #F4F4F0; padding: 2rem; }
```

**Geometry:** Absolute rejection of `border-radius`. All corners 90 degrees.

**ASCII framing:** `[ SYSTEM STATUS ]` · `< RE-IND >` · `>>> DIRECTIONAL <<<` · `/// diagonal ///`

**Semantic HTML:** Use `<data>`, `<samp>`, `<kbd>`, `<output>`, `<dl>/<dt>/<dd>`, `<pre>` for telemetry content.

**Texture effects:**

```css
/* CRT scanlines */
.crt { background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px); }

/* Global grain */
body::before {
  content: '';
  position: fixed; inset: 0; z-index: -1;
  background-image: url('data:image/svg+xml,...feTurbulence baseFrequency="0.9"...');
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

---

## Output Discipline

**Treat every task as production-critical. A partial output is a broken output.**

### Forbidden in code blocks:
- `// ...`, `// TODO`, `// rest of code`, ellipsis for missing logic
- Skeleton implementations when full code is requested
- First + last section while omitting middle

### Forbidden in prose:
- "Let me know if you want more"
- "Similarly for remaining items"
- Descriptions replacing actual deliverables

### Token limit handling:

When approaching capacity, write at full quality until a natural stopping point (function end, file completion), then pause with:

> `[PAUSED — X of Y complete. Send "continue" to resume from: [next section]]`

Resume without recap or repetition.

### Final verification:
- No banned patterns present
- All requested items included and finished
- Code contains executable logic, not pseudo-code
- Nothing abbreviated for space conservation

---

## Out of Scope

This skill is **not** for: dashboards / dense product UI, data tables, multi-step forms, code editors, native mobile, realtime collab UIs. Point to appropriate tools for those.
