# AI Academy — Session-Übergabe (Stand: 15. Juli 2026)

> Kontext-Dokument für die nächste Arbeits-Session. Die inhaltlichen Docs
> (PROJEKTPLAN, CONTENT-STRATEGIE, Video-Skripte, DEPLOYMENT) liegen jetzt
> **bei der Academy** unter `academy-app/docs/`.

## Die grosse Änderung dieser Session: Repo-Trennung

Die AI Academy ist aus der MadkourMedia-Website **herausgelöst** und lebt als
eigenständige Next.js-App im Ordner `academy-app/` (transfer-fertig, eigenes
package.json, eigene Configs, Routen ohne `/academy`-Präfix, eigene
Sitemap/Robots, Ziel-Domain `academy.madkourmedia.com`).

**Repo-Trennung vollzogen (15.07.2026):** Die Academy lebt jetzt in
**`MontherM/aiplattform`** (`main` = Academy; alter Snapshot mit Monthers
ausdrücklicher Freigabe überschrieben). Der Transfer-Ordner `academy-app/`
wurde aus diesem Repo wieder entfernt — `aiplattform` ist die Single Source
of Truth für allen Academy-Code inkl. Docs und Video-Produktionsunterlagen.

**Auf madkourmedia-Seite ist die Trennung fertig:**
- `src/app/academy`, `src/components/academy`, `src/lib/academy` entfernt
  (per `git mv` nach `academy-app/`)
- Navigation verlinkt extern auf `NEXT_PUBLIC_ACADEMY_URL`
  (Default `https://academy.madkourmedia.com`)
- `next.config.mjs`: 301-Redirects `/academy/:path*` → neue Domain
- Sitemap/Robots bereinigt, `qrcode`-Dependency raus, tsconfig excludet `academy-app`

**Livegang-Reihenfolge (wichtig, kein Downtime):** Zuerst Academy-Repo
deployen + Domain verbinden, DANN erst diesen Branch mergen.

## Was diese Session zusätzlich gebaut hat (alles in `academy-app/`)

1. **17 echte Download-Dateien** unter `public/downloads/` (Cheatsheets,
   Checklisten, Vorlagen, n8n-Workflow-JSON) — verdrahtet über neues
   `href`-Feld in `ResourceItem`, LessonView rendert echte Download-Links.
2. **Video-Produktion gestartet:** `docs/video/DREHTAG-1-PLAN.md` (Setup,
   Batch-Ablauf, Checkliste) + `docs/video/skript-was-ist-ki.md`
   (komplettes 9-Min-Drehskript mit Shotlist, Screen-Demos, GFX-Liste).
3. **Landing: „Der Mensch dahinter"-Sektion** (Monther, kein Avatar,
   Portrait-Karte mit Monogramm — `public/monther.jpg` kann sie später ersetzen).

## Offene Punkte (nächste Session, priorisiert)

1. **Monther:** Vercel-Projekt für `MontherM/aiplattform` anlegen +
   Domain `academy.madkourmedia.com` verbinden (Anleitung:
   docs/DEPLOYMENT.md im aiplattform-Repo). DANN erst diesen Branch mergen.
2. **Drehtag 1 ist komplett vorbereitet:** alle 4 Skripte + 4 SVG-Grafiken
   in `docs/video/` im aiplattform-Repo.
   Nächster Schritt: Monthers Feedback zu den Skripten → Dreh.
3. Nach dem Dreh: Schnitt-Support, Kapitelmarken, Untertitel, Shorts-Pläne.
4. Supabase → Stripe → Mux (brauchen Zugänge), Lead-Magnet-Funnel,
   Branchen-Tracks (Immobilien zuerst).

## Nutzer-Präferenzen (Monther)

- Deutsch, Du-Form; reviewt am Handy; „Merge" = direkt live schalten.
- Eigenständiger Durcharbeits-Modus erwünscht; Design darf nicht nach KI
  aussehen; Benchmark: OpenAI Academy.
