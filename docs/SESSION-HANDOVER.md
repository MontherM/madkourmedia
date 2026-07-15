# AI Academy — Session-Übergabe (Stand: Juli 2026)

> Kontext-Dokument für die nächste Arbeits-Session. Zusammen mit
> `docs/PROJEKTPLAN.md` (Architektur/Roadmap) und `docs/CONTENT-STRATEGIE.md`
> (Didaktik, Markt, Produktionsplan) ergibt das den vollständigen Projektstand.

## Was das Projekt ist

Deutschsprachige, tool-unabhängige KI-Lernplattform als Sub-Produkt von
MadkourMedia unter `/academy` (Next.js App Router + TypeScript + Tailwind,
Repo `MontherM/madkourmedia`). Positionierung: *„Von Rumprobieren zu
Automatisieren – mit einem Menschen, nicht mit einem Avatar."*
Differenzierung vs. OpenAI Academy: Deutsch, ChatGPT **und** Claude/Gemini/
Perplexity/n8n, echtes Gesicht, Bestehens-Zertifikate mit Score, DACH-Community.

## Was fertig ist (alles live bzw. auf main)

**Plattform-Features**
- Landing (`/academy`), Lehrplan, Lektions-Player-Shell, Dashboard,
  Prompt-Bibliothek (mit **.md-Export**, einzeln + Bibliothek), AI-Tool-Bibliothek,
  Pricing, Community-Forum (Seed-Threads), Admin-/CMS-Vorschau (`/academy/admin`,
  noindex, mit Demo-Daten-Reset), Quiz-Engine (Single/Multiple/Flashcards),
  **echte Zertifikatsausstellung** beim Quiz-Bestehen (Code + Name + QR + LinkedIn-Link).
- **Live-Fortschritt** über localStorage-Store (`src/lib/academy/store.ts`):
  XP, Streaks (aus Aktivitätstagen), 6 automatisch verdiente Badges, Wochenziel,
  Bookmarks, Plan. Supabase später = nur `load`/`persist` austauschen.
- **Plan-Gating**: UpgradeGate für Lektionen über dem Nutzerplan; Demo-Checkout
  auf der Preisseite (Stripe folgt). Ränge: free < basic < pro < elite
  (`canAccess` in `progress.ts`).
- **⌘K Command-Palette** (globale Suche: Lektionen/Prompts/Tools/Seiten).
- **Onboarding** beim ersten Dashboard-Besuch (Name → Zertifikate, Wochenziel).
- SEO: sitemap.ts, robots.ts, Metadata pro Seite, metadataBase.

**Content (nach Marktanalyse 2026 umgebaut)**
- 13 Lektionen in 3 Levels; jede Lektion mit explizitem **Outcome-Versprechen**
  („Danach kannst du …", Feld `outcome` im Datenmodell).
- Level 3 neu positioniert: **„AI Workflows & Agenten"** (Workflow-Design,
  Custom GPTs & Claude Projects, n8n-Agent, Context Engineering) – die
  gefragteste Skill 2026. Level 2 mit Umsatz-Hebeln (Angebote, Recherche).
- 14 Prompts in 6 Kategorien (inkl. Agenten-Briefing, Workflow-Zerlegung,
  Kontext-Paket, Offerten-Generator).

**Design („Warm Editorial", bewusst weg vom KI-Look)**
- Papier-Optik hell (Default) / Espresso dunkel; Vermilion-Akzent `#d3450f`/`#ff6b3d`;
  Tinten-Buttons mit harten Offset-Schatten; Film-Grain-Overlay; Marker-Highlight
  statt Gradient-Text; Marquee-Bänder; Poster-Typografie (Syne); Sticker-Element;
  Level-Farben Orange/Teal/Grün. Alle Tokens in `globals.css` unter `.academy`.
- Landing erzählt die Transformation („Heute → Nach der Academy").

**Mobile**
- Root-Cause-Fix: `.ac-btn`/`.ac-pill` setzen `display` nach den Tailwind-Utilities
  und schlagen `hidden` → nie `hidden` mit diesen Klassen kombinieren, sondern
  einen Wrapper ausblenden! (War Ursache für 131px-Overflow auf jeder Seite.)
- Per Playwright bei 390px verifiziert: 0px horizontaler Überlauf, alle Seiten.

## Architektur-Konventionen

- Domain-Typen: `src/lib/academy/types.ts` (Single Source of Truth).
- Content/Seed: `src/lib/academy/data.ts` – UI greift NUR über die Accessors zu.
  Prompts per `promptById("p-…")` referenzieren, nicht per Index.
- Fortschritt: `store.ts` (Mutationen + `useAcademy()`-Hook), reine Ableitungen
  in `progress.ts`. Server Components by default; Client-Seiten als
  `XyzClient.tsx` mit Server-Wrapper-Page für Metadata.
- Screenshots/Smoke-Tests: Playwright, Chromium unter
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.

## Deployment

- Vercel ist mit dem Repo verbunden; `main` deployt automatisch auf
  `madkourmedia.vercel.app` → Academy unter `/academy`.
- Arbeits-Branch-Konvention: `claude/ai-platform-academy-chat-*`, PR → main.

## Offene Punkte (nächste Session, in dieser Reihenfolge)

1. **Video-Produktion starten** (Empfehlung: Hybrid – Gesicht vorne, KI im
   Maschinenraum; KEINE Avatare). Erster Drehtag = Level-1-Kapitel „KI verstehen"
   (4 Lektionen). Pipeline pro Lektion in `CONTENT-STRATEGIE.md` §6:
   Outcome festlegen → Claude schreibt Skript+Shotlist → Grafiken/Downloads →
   Dreh im Batch → Schnitt → in Plattform verdrahten.
2. **Echte Downloads hinterlegen**: Die in `data.ts` gelisteten Ressourcen
   (Checklisten, Vorlagen, Workflow-JSONs) als echte Dateien erzeugen/verlinken.
3. **Supabase**: Schema + RLS nach PROJEKTPLAN §4/§7, Store-Backend tauschen,
   Auth (dann Onboarding → echtes Konto).
4. **Stripe**: Produkte pro Plan, Checkout ersetzt Demo-`PlanButton`.
5. **Video-Hosting**: Mux/Bunny, Player-Shell in `LessonView` ersetzen.
6. Lead-Magnet-Funnel (Prompt-Bibliothek gegen Newsletter), Shorts-Repurposing.
7. Branchen-Tracks als Elite-Level (Immobilien zuerst – Synergie mit JP DL AG).

## Nutzer-Präferenzen (Monther)

- Kommunikation auf Deutsch, Du-Form. Arbeitet reviewt viel am Handy.
- Will „Loop-Modus": Claude soll eigenständig durcharbeiten, Kontrolle
  übernehmen, Ende-zu-Ende liefern, dann kompakt berichten.
- „Merge" als Kommando = PR erstellen und direkt nach main mergen (Vercel live).
- Design-Anspruch: darf nicht „nach KI aussehen"; Referenzen: lovable.dev
  Interactive-Guides; Konkurrenz-Benchmark: OpenAI Academy.
