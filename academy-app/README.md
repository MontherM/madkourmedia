# AI Academy

Deutschsprachige, tool-unabhängige KI-Lernplattform.
**„Von Rumprobieren zu Automatisieren — mit einem Menschen, nicht mit einem Avatar."**

Standalone Next.js-App (App Router + TypeScript + Tailwind), entstanden durch
Extraktion aus dem MadkourMedia-Repo. Ziel-Domain: `https://academy.madkourmedia.com`.

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Produktions-Build
```

## Struktur

```
src/
├── app/                    # Routen: /, /curriculum, /lessons/[slug], /prompts,
│                           # /tools, /pricing, /community, /certificates, /quiz, /admin
├── components/academy/     # Feature- & UI-Komponenten (Warm-Editorial-Design)
└── lib/academy/            # types.ts (Domain), data.ts (Content), store.ts (Fortschritt),
                            # progress.ts (Gamification), markdown.ts (Exporte)
public/downloads/           # Echte Lektions-Ressourcen (Checklisten, Vorlagen, JSONs)
docs/                       # PROJEKTPLAN, CONTENT-STRATEGIE, DEPLOYMENT, video/
```

## Konventionen

- Content **nur** über die Accessors in `lib/academy/data.ts` beziehen.
- Fortschritt über `useAcademy()` (localStorage heute, Supabase-ready per Design).
- `.ac-btn`/`.ac-pill` setzen `display` — nie mit `hidden` kombinieren,
  stattdessen einen Wrapper ausblenden (Mobile-Overflow-Falle!).
- Server Components by default; Client-Seiten als `XyzClient.tsx`.

## Deployment

Siehe `docs/DEPLOYMENT.md` (Vercel-Projekt + Domain-Setup in ~5 Minuten).
