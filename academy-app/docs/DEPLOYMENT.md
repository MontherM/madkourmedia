# Deployment — AI Academy (eigenes Repo + Vercel-Projekt)

Ziel: Die Academy läuft als **eigenständige App** unter
`https://academy.madkourmedia.com`, komplett getrennt von der
MadkourMedia-Agentur-Website.

## 1. Repo (einmalig)

Der Inhalt dieses Ordners ist das komplette Repo. Zwei Optionen:

- **Option A (empfohlen):** Bestehendes privates Repo `MontherM/aiplattform`
  wiederverwenden — der alte Inhalt dort ist nur ein veralteter Snapshot der
  Gesamt-Website vom 02.07.2026 und kann ersetzt werden.
- **Option B:** Neues Repo `MontherM/ai-academy` auf github.com anlegen
  (Private, ohne README) und der Claude-GitHub-App Zugriff darauf geben.

> Claude kann den Push in beiden Fällen übernehmen — einfach im Chat sagen,
> welche Option gilt.

## 2. Vercel-Projekt (einmalig, ~3 Min)

1. [vercel.com/new](https://vercel.com/new) → das Academy-Repo importieren.
2. Framework-Preset: **Next.js** (wird automatisch erkannt), keine weiteren
   Einstellungen nötig.
3. Deploy klicken → App läuft unter `<projekt>.vercel.app`.

## 3. Domain `academy.madkourmedia.com` (einmalig, ~2 Min)

1. Im neuen Vercel-Projekt: **Settings → Domains → Add** →
   `academy.madkourmedia.com` eintragen.
2. Da `madkourmedia.com` schon bei Vercel liegt, verdrahtet Vercel den
   CNAME automatisch (sonst: CNAME `academy` → `cname.vercel-dns.com`).

## 4. Übergang von madkourmedia.com/academy

Die Haupt-Website leitet `/academy/*` per **301** auf die neue Domain um
(konfiguriert in `next.config.mjs` des madkourmedia-Repos, Env-Variable
`NEXT_PUBLIC_ACADEMY_URL`, Default `https://academy.madkourmedia.com`).
Bestehende Links und SEO-Verweise bleiben also gültig.

**Wichtig — Reihenfolge beim Livegang:**
1. Zuerst Academy-Repo deployen + Domain verbinden (Schritte 1–3),
2. erst danach den madkourmedia-Branch mit der Academy-Entfernung mergen.
So gibt es keine Sekunde Downtime.

## 5. Nutzer-Fortschritt

Fortschritt liegt aktuell in `localStorage` und ist **an die Domain gebunden**.
Da die Plattform noch nicht released ist, ist der Verlust der Test-Daten beim
Domain-Wechsel unkritisch. Echte Konten kommen mit Supabase (siehe
PROJEKTPLAN §Roadmap Phase 2).

## Später (wenn Zugänge da sind)

| Dienst   | Zweck                          | Env-Variablen (dann)                     |
| -------- | ------------------------------ | ---------------------------------------- |
| Supabase | Konten, Fortschritt, Community | `NEXT_PUBLIC_SUPABASE_URL`, `…_ANON_KEY` |
| Stripe   | Echte Abos                     | `STRIPE_SECRET_KEY`, `…_WEBHOOK_SECRET`  |
| Mux      | Video-Streaming                | `MUX_TOKEN_ID`, `MUX_TOKEN_SECRET`       |
