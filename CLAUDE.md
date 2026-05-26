# MadkourMedia – Claude Project Rules

Active skills: `.claude/skills/emil-design-eng.md`, `.claude/skills/taste-skill.md`, `.claude/skills/impeccable.md`

---

## NON-NEGOTIABLE PRE-FLIGHT (run before every response)

### 1. EM-DASH BAN ❌
`—` is the #1 LLM design tell. **Never write it in any file.**
- Visible text → use period, colon, or comma instead
- Code comments → same rule
- Violation = immediate re-edit before finishing turn

Run this check mentally before every response:
```
grep -rn "—" src/
```
Expected result: **no output**. Any match = stop and fix first.

### 2. ARROW CONVENTION
Use `→` (right arrow) for CTAs and navigation hints.
Never use `->` in visible text.

### 3. TYPOGRAPHY RULES (taste-skill)
- `body-lg` minimum for all descriptive paragraphs in dark sections
- `--ink-2` = `#B8B8B8` minimum for secondary text (never lower on dark bg)
- `.label` class for all caps tracking labels
- Font sizes: `clamp()` always — never fixed px in typography

### 4. GLASS SYSTEM (Emil Kowalski)
- `backdrop-filter` ONLY on fixed/sticky elements (nav, modals)
- Scrolling cards: pure `rgba()` background, no blur
- Glass scale: `.glass` → `.glass-blur` → `.glass-strong` (fixed only)

### 5. ANIMATION RULES (Emil Kowalski)
- CSS `transition` for hover states (interruptible)
- Framer Motion for enter/exit + scroll-triggered
- Easing: `cubic-bezier(0.23,1,0.32,1)` (ease-out/spring)
- Stagger: 80ms between items max
- `whileTap: { scale: 0.97–0.985 }` on interactive elements

### 6. BUTTON RULES (taste-skill Button-in-Button)
- Primary CTA: `.btn-primary` with `.btn-icon-wrap` around icon
- Nav CTA: `.btn-pill` with `.btn-icon-wrap`
- Secondary: `.btn-secondary` — no icon wrap needed
- Icons never naked in premium CTAs

### 7. COPY / UX WRITING RULES
- German formal address: **Sie** (not du) in all user-facing text
- No filler phrases: "powerful", "transformative", "revolutionary" banned
- Specific > vague: "CI bis zur Outdoor-Kampagne" not "full service"

---

## STACK
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v3
- Framer Motion
- DM Sans (body) + Syne (display/headlines)
- Brand color: `#6DBB7D` (var(--accent))

## BRANCH
All development: `claude/friendly-faraday-CASKt`
Push: `git push -u origin claude/friendly-faraday-CASKt`

## PENDING TASKS
- [ ] Contact form backend (Resend.com + Next.js API Route)
- [ ] Replace Picsum placeholders with real portfolio images
- [ ] Vercel deployment
- [ ] `/impressum` + `/datenschutz` pages
- [ ] OG image at `/public/og-image.jpg` (1200x630px)
