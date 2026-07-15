# AI Academy — Projektplan & Architektur

> Eine spezialisierte, skalierbare KI-Lernplattform für den deutschsprachigen Raum.
> Sub-Produkt von MadkourMedia, erreichbar unter `/academy`.

Dieses Dokument ist die verbindliche Grundlage (Phase 1 – Fundament). Es definiert
Vision, Architektur, Datenmodell, Rollen, Abomodelle und die Roadmap. Es wird mit dem
Produkt mitgepflegt.

---

## 1. Vision & Produktziel

**Nicht** „noch ein KI-Kurs“, sondern ein **Ökosystem**, das Menschen innerhalb weniger
Wochen messbar produktiver mit KI macht.

Nach Abschluss soll ein Lernender:

- Zeit sparen und Geld verdienen,
- bessere Entscheidungen treffen,
- KI wirklich verstehen (nicht nur bedienen),
- eigene Workflows & Automationen bauen,
- keine Angst mehr vor KI haben.

Jede Lektion beantwortet **Warum → Wie → Wann → Welche KI → Grenzen → Alternativen →
Praxis → Automatisierung → Business-Nutzen** – nicht nur „schreib diesen Prompt“.

---

## 2. Zielgruppen (modular verkaufbar)

| Segment           | Kern-Use-Cases                                             |
| ----------------- | ---------------------------------------------------------- |
| Anfänger          | Erstkontakt, Grundverständnis, Angstabbau                  |
| Büroangestellte   | Excel, PowerPoint, Mails, Meetings, Protokolle, Automation |
| Unternehmer / KMU | Marketing, Angebote, Strategie, Social Media               |
| Studenten         | Recherche, Zusammenfassungen, Karteikarten, Präsentationen |
| Content Creator   | YouTube, TikTok, Bilder, Video, Voice, SEO                 |
| Branchen (Premium)| Immobilien, Ärzte, Juristen, Logistik & Pharma, Lehrer …   |

---

## 3. Tech-Stack (Soll-Architektur)

| Layer          | Wahl                          | Begründung                                            |
| -------------- | ----------------------------- | ----------------------------------------------------- |
| Framework      | Next.js (App Router) + React + TypeScript | Server Components, SEO, Streaming, bereits im Repo    |
| Styling        | Tailwind CSS + Design-Tokens  | Konsistenz, Light/Dark, schnelle Iteration            |
| UI-Primitives  | Eigene Komponenten i. shadcn-Stil | volle Kontrolle, keine Template-Optik               |
| Animation      | Framer Motion                 | weiche, premium Micro-Interactions                    |
| DB / Backend   | Supabase (PostgreSQL + RLS)   | Auth, Storage, Realtime, Row-Level-Security in einem  |
| Auth           | Supabase Auth (Alt.: Clerk)   | enger DB-Bezug, RBAC über RLS                         |
| Storage        | Supabase Storage              | Downloads, PDFs, Bilder, Zertifikate                  |
| Video          | Mux (Alt.: Bunny Stream)      | adaptives Streaming, Signed Playback, Analytics       |
| Payments       | Stripe (Subscriptions)        | Abos, Coupons, Customer Portal, Webhooks              |
| E-Mail         | Resend                        | Transaktional + Newsletter                            |
| Analytics      | PostHog                       | Product Analytics, Funnels, Feature Flags             |
| Deployment     | Vercel                        | Edge, Preview-Deploys, ISR                            |

> **Aktueller Stand (dieser Branch):** Voll funktionsfähiges Frontend-Produkt.
> Fortschritt (XP, Streaks, Badges, Zertifikate, Plan) läuft über einen
> localStorage-Store (`src/lib/academy/store.ts`) mit derselben API, die später
> Supabase bedient – Backend einziehen heißt nur `load`/`persist` austauschen.

---

## 4. Rollen & Berechtigungen (RBAC)

`guest → student → pro → instructor → admin → super_admin`

| Fähigkeit                       | guest | student | pro | instructor | admin | super_admin |
| ------------------------------- | :---: | :-----: | :-: | :--------: | :---: | :---------: |
| Free-Lektionen ansehen          |  ✔    |   ✔     | ✔   |    ✔       |  ✔    |     ✔       |
| Fortschritt speichern           |       |   ✔     | ✔   |    ✔       |  ✔    |     ✔       |
| Alle Kurse & Downloads          |       |         | ✔   |    ✔       |  ✔    |     ✔       |
| Live Q&A / Community-Premium     |       |         | ✔   |    ✔       |  ✔    |     ✔       |
| Eigene Kurse anlegen            |       |         |     |    ✔       |  ✔    |     ✔       |
| CMS / Benutzer / Zahlungen      |       |         |     |            |  ✔    |     ✔       |
| Rollen & Plattform-Config       |       |         |     |            |       |     ✔       |

Durchsetzung: Supabase **RLS-Policies** (DB-Ebene) + Middleware-Guards (Route-Ebene) +
UI-Gating (`<Gate role|plan>`). Niemals nur clientseitig.

---

## 5. Abomodelle

| Plan   | Preis (Richtwert) | Inhalt                                                                 |
| ------ | ----------------- | --------------------------------------------------------------------- |
| Free   | CHF 0             | 5–10 Lektionen, Newsletter, Community-Lite                             |
| Basic  | CHF 19–29 / Mt.   | AI Basics, Prompt-Bibliothek, Updates                                 |
| Pro    | CHF 49–79 / Mt.   | Alle Kurse, Downloads, Live Q&A, volle Community                       |
| Elite  | CHF 149–299 / Mt. | Coachings, Unternehmensvorlagen, neue Masterclasses, Frühzugang, Zert. |

Stripe: ein Produkt pro Plan, monatlich/jährlich, Coupons, Customer Portal.

---

## 6. Architektur & Verzeichnisstruktur

Clean-Architecture-Light: **UI → Feature-Komponenten → Domain (Typen) → Services
(Daten)**. Heute liefert der Service Mock-Daten; später Supabase – die UI bleibt gleich.

```
src/
├── app/
│   ├── academy/
│   │   ├── layout.tsx            # Academy-Shell (Theme, Nav, Footer)
│   │   ├── page.tsx              # Marketing-Landing
│   │   ├── curriculum/page.tsx   # Lehrplan: Levels → Kapitel → Lektionen
│   │   ├── dashboard/page.tsx    # Fortschritt, Streak, XP, Badges
│   │   ├── lessons/[slug]/page.tsx # Video, Notizen, Prompts, Ressourcen
│   │   ├── prompts/page.tsx      # Prompt-Bibliothek (Filter, Suche, Copy)
│   │   ├── tools/page.tsx        # AI-Tool-Bibliothek
│   │   └── pricing/page.tsx      # Abomodelle
│   └── (marketing site …)        # bestehende MadkourMedia-Seite
├── components/academy/
│   ├── ui/                       # Button, Card, Badge, Progress, Tag …
│   ├── ThemeProvider.tsx         # Light/Dark, persistiert
│   ├── AcademyNav.tsx · AcademyFooter.tsx
│   └── <feature components>      # CourseCard, LessonPlayer, PromptCard …
└── lib/academy/
    ├── types.ts                  # Domain-Modell (Single Source of Truth)
    ├── data.ts                   # Seed-/Mock-Content (CMS-Ersatz)
    └── progress.ts               # Fortschritts-/Gamification-Logik
```

**Konventionen:** keine Riesendateien, keine Duplikate, keine toten Dateien.
Server Components by default; `"use client"` nur wo nötig (Interaktion/Animation).

---

## 7. Domänenmodell (Kern)

```
Academy
 └─ Level (1..n)            z. B. AI Basics, Productivity, Master
     └─ Chapter (Kapitel)
         └─ Lesson (Lektion)
             ├─ Video (Mux/Bunny)
             ├─ Notes · Chapters (Marken)
             ├─ Prompts[]  · Resources/Downloads[]
             └─ Quiz?  → am Level-Ende: Abschlussprojekt → Zertifikat
User
 ├─ role · plan
 └─ Progress { completedLessons, xp, level, streak, badges[], bookmarks[] }
PromptLibrary  ├─ Prompt { category, tags, rating, body }
AIToolLibrary  └─ Tool { pricing, pros/cons, useCases, tutorials }
```

Datentypen sind in `src/lib/academy/types.ts` als Single Source of Truth definiert.

---

## 8. Feature-Matrix → Status

| Bereich                  | Geplant | Stand in diesem Branch                                  |
| ------------------------ | :-----: | ------------------------------------------------------- |
| Marketing-Landing        |   ✔     | ✔ implementiert                                          |
| Lehrplan / Levels        |   ✔     | ✔ implementiert, live Fortschritt & Lock-Status          |
| Dashboard (XP/Streak)    |   ✔     | ✔ live (localStorage-Store, echte Streaks & Badges)      |
| Lektions-/Videoseite     |   ✔     | ✔ implementiert (Player-Shell, Notizen, Abschluss-XP)    |
| Prompt-Bibliothek        |   ✔     | ✔ implementiert (Filter/Suche/Copy, Copy-Zähler → Badge) |
| AI-Tool-Bibliothek       |   ✔     | ✔ implementiert                                          |
| Pricing / Abos           |   ✔     | ✔ UI + Demo-Plan-Aktivierung (Stripe folgt)              |
| Light/Dark Theme         |   ✔     | ✔ implementiert                                          |
| Quiz / Zertifikate       |   ✔     | ✔ Engine + echte, verifizierbare Zertifikatsausstellung  |
| Gating / Paywall         |   ✔     | ✔ UpgradeGate pro Lektion, Plan-Ränge zentral            |
| Globale Suche (⌘K)       |   –     | ✔ Command-Palette über Lektionen/Prompts/Tools/Seiten    |
| Onboarding               |   –     | ✔ Erstbesuch: Name (für Zertifikate) + Wochenziel        |
| Community / Forum        |   ✔     | ✔ UI mit Seed-Threads, Antworten/Likes (Persistenz: DB)  |
| Admin / CMS              |   ✔     | ✔ CMS-Vorschau (read-only) + Demo-Daten-Reset            |
| SEO (Sitemap/Robots)     |   ✔     | ✔ sitemap.ts, robots.ts, Metadata pro Seite              |
| Auth · Payments · DB     |   ✔     | ⏳ Store-API steht; Supabase/Stripe austauschbar          |
| i18n (DE/EN)             |   ✔     | ⏳ Texte zentralisiert, dann next-intl                    |

---

## 9. Roadmap (12 Phasen)

1. **Fundament** – Plan, Datenmodell, Design-System, Foundation-UI *(dieser Branch)*
2. Supabase-Schema + RLS, Auth, Service-Layer real
3. Lektions-Player real (Mux), Fortschritt persistent
4. Quiz-Engine (Single/Multi/Drag&Drop/Flashcards/Code/Prompt) + Auto-Bewertung
5. Zertifikate (PDF, QR, Verifizierung)
6. Stripe-Abos, Coupons, Customer Portal, Paywall/Gating
7. Prompt- & Tool-Bibliothek CMS-gestützt, Bewertungen, Favoriten
8. Gamification (XP, Badges, Streaks, Challenges, Leaderboards)
9. Community (Forum, Profile, Discord-Sync, Likes/Antworten)
10. Admin-Panel & CMS (No-Code-Pflege aller Inhalte)
11. i18n (DE/EN), SEO, Accessibility, Performance-Härtung
12. Launch + kontinuierliche Module/Masterclasses & KI-Updates

---

## 10. Querschnitt: Qualität, Sicherheit, Performance

- **Sicherheit:** RLS, RBAC, Input-Validierung (Zod), CSRF/XSS-Schutz, Rate-Limiting,
  Audit-Logs, signierte Video-/Storage-URLs.
- **Performance:** Server Components, Code-Splitting, Lazy Loading, Image-Optimierung,
  Caching/ISR.
- **DX/Wartbarkeit:** strikte Typen, kleine Komponenten, klare Schichten, ein
  Design-Token-System.
- **Accessibility:** semantisches HTML, Fokuszustände, Kontraste, Reduced-Motion.

Nach jedem Feature: Review von Codequalität, UX, Performance, Sicherheit,
Skalierbarkeit, Wartbarkeit.
