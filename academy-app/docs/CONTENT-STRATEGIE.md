# AI Academy — Content-Strategie & Produktionsplan

> Consultant-Review (Juli 2026). Grundlage: Marktanalyse 2026, Benchmark
> OpenAI Academy, Didaktik-Best-Practices. Dieses Dokument beantwortet:
> Was macht einen guten Kurs aus? Was ist wirklich gefragt? Was taugt unser
> Ist-Content? Wie produzieren wir – KI-generiert oder selbst gefilmt?

---

## 1. Was 2026 wirklich gefragt ist (Marktlage)

Reihenfolge nach Nachfrage – nicht nach dem, was am einfachsten zu unterrichten ist:

1. **KI-Agenten & Workflow-Automatisierung** – die mit Abstand gefragteste
   Fähigkeit. Gartner: bis Ende 2026 enthalten ~40 % der Enterprise-Apps
   aufgabenspezifische Agenten (2025: <5 %). Wer Agenten bauen und steuern
   kann, ist im Vorteil – **die meisten neuen Rollen sind No-Code** (Sales,
   Service, HR, Operations), nicht Engineering.
2. **Workflow-/Prozess-Design** – echte Aufgaben in klare, automatisierbare
   Schritte zerlegen. Das ist die Brücke von „ich prompte“ zu „es läuft ohne mich“.
3. **Prompting** – bleibt das Fundament; der Qualitätsunterschied zwischen
   gutem und schlechtem Prompting ist riesig und sofort sichtbar.
4. **Context Engineering** – Agenten die richtigen Informationen geben
   (Wissen, Tools, Grenzen), nicht nur die richtige Frage stellen. Löst
   Prompt Engineering als Differenzierer ab.
5. **KI-Urteilsvermögen (Judgment)** – wissen, was KI zuverlässig kann, was
   nicht, und wo ein Mensch prüfen muss. Querschnittskompetenz für alle Rollen.

**Konsequenz für uns:** Unser Schwerpunkt muss von „KI verstehen“ (Level 1)
deutlich in Richtung „Workflows & Agenten“ (Level 3) wandern. Genau dort ist
heute unser dünnster Content – und genau dort beginnt bei uns das Geld (Pro).

## 2. Benchmark: OpenAI Academy (unser stärkster „Gratis-Konkurrent“)

Struktur: 3 Kurse als Pfad – *AI Foundations* → *Applied AI Foundations* →
*Agents and Workflows*, je 75–90 Min, Übungen direkt in ChatGPT,
Teilnahme-Zertifikat. Stärken: kostenlos, glaubwürdig, Übung im Tool.

**Ihre Schwächen = unsere Chancen:**

| OpenAI Academy                          | Unsere Differenzierung                                    |
| --------------------------------------- | --------------------------------------------------------- |
| Nur Englisch                             | Deutsch, CH/DACH-Beispiele (Angebote, Protokolle, QR-Rechnung…) |
| Nur ChatGPT/OpenAI-Welt                  | Tool-agnostisch: ChatGPT **und** Claude, Gemini, Perplexity, n8n |
| Generisch, ohne Gesicht                  | Eine echte Person, echte Projekte, echte Fehler            |
| Kein Community-Raum                      | Community + Live Q&A im Pro-Plan                           |
| Teilnahme-Zertifikat („war dabei“)       | Bestehens-Zertifikat mit Quiz-Score + Verifizierungscode   |
| Keine Branchen-Personas                  | Modulare Tracks: Büro, KMU, Studenten, Creator, Immobilien… |

**Positionierung in einem Satz:** *„Die deutschsprachige, tool-unabhängige
KI-Schule, die dich in 4 Wochen von ‚ich probiere rum‘ zu ‚bei mir läuft das
automatisch‘ bringt – mit einem Menschen, nicht mit einem Avatar.“*

## 3. Was einen guten Kurs ausmacht (Didaktik-Messlatte)

Jede Lektion wird gegen diese 7 Punkte geprüft:

1. **Outcome statt Thema.** Nicht „Was ist KI?“, sondern „Nach 9 Minuten
   erkennst du, welche Aufgaben du heute an KI abgeben kannst.“ Der Titel
   verspricht die Transformation, das Video liefert sie.
2. **Ein Artefakt pro Lektion.** Der Lernende verlässt jede Lektion mit etwas
   Anfassbarem: ein funktionierender Prompt, eine Vorlage, ein Workflow-Export,
   eine Checkliste. (Downloads haben wir – sie müssen der Star sein, nicht die Beilage.)
3. **Quick Win in Minute 1 der ersten Lektion.** Der „Aha, das spart mir heute
   schon Zeit“-Moment entscheidet über Abschlussquoten – nicht das Curriculum.
4. **Kurz & einzeln.** 5–12 Min pro Video, eine Fähigkeit pro Lektion.
   Unsere 24-Min-Agenten-Lektion wird in 3 Lektionen aufgeteilt.
5. **Üben > Zuschauen.** Jede Lektion endet mit einer konkreten Aufgabe am
   eigenen Fall („dein letztes Meeting“, „deine echte Excel-Datei“).
6. **Wiederholung eingebaut.** Quiz pro Level (haben wir ✔), Flashcards,
   Streaks (haben wir ✔) – plus Praxisprojekt am Level-Ende.
7. **Ehrlichkeit über Grenzen.** Jede Lektion sagt auch, wann man das Tool
   *nicht* benutzt. Das baut Vertrauen auf, das Werbe-Kurse nie bekommen.

## 4. Ehrliche Kritik am Ist-Content

- **Umfang:** 7 Lektionen sind ein Demo-Skelett, kein verkaufbares Produkt.
  Minimum für Launch: ~20 Lektionen (Level 1 komplett, Level 2 & 3 tragfähig).
- **Gewichtung falsch:** Die gefragteste Fähigkeit (Agenten/Workflows) hatte
  1 Lektion, das am wenigsten differenzierende Thema (Basics) 4.
- **Titel themen- statt outcome-orientiert:** „Excel & Tabellen mit KI“ sagt
  nicht, was ich danach kann. Neu: Jede Lektion bekommt ein explizites
  „Danach kannst du …“-Outcome (jetzt im Datenmodell verankert).
- **Kein roter Faden zum Geldverdienen:** Das Versprechen der Plattform
  („Zeit sparen, Geld verdienen“) braucht Lektionen, die direkt auf Umsatz
  einzahlen (Angebote, Akquise, Content-Maschine) – Level 2/3 decken das jetzt ab.
- **Prompt-Bibliothek zu klein:** 6 Prompts wirken leer. Ausgebaut auf 14+,
  inkl. Agenten-/Workflow-Prompts, und als .md exportierbar (Obsidian/Notion-Nutzer!).

## 5. Soll-Curriculum (umgesetzt in dieser Iteration)

- **Level 1 – AI Basics** *(free/basic)*: bestehende 4 Lektionen +
  **„Wann KI – und wann besser nicht?“** (Judgment, sehr gefragt, baut Vertrauen).
- **Level 2 – AI Productivity** *(basic/pro)*: Excel, Meetings +
  **„Recherche in 10 Minuten statt 2 Stunden“** (Perplexity/Deep Research) +
  **„Angebote & Offerten auf Knopfdruck“** (KMU-Umsatzhebel, CH-Beispiel).
- **Level 3 – AI Workflows & Agenten** *(pro)* – neu positioniert, vorher „AI Master“:
  **„Workflow-Design: Aufgaben zerlegen wie ein Profi“** →
  **„Eigene Assistenten: Custom GPTs & Claude Projects“** →
  „Dein erster KI-Agent mit n8n“ (bestehend) →
  **„Context Engineering: dem Agenten das richtige Wissen geben“**.

Damit: 12 Lektionen, Schwerpunkt dort, wo Nachfrage und Zahlungsbereitschaft
liegen. Nächster Ausbau: Branchen-Tracks als Level 4+ (Elite).

## 6. Produktion: KI-generiert oder selbst filmen?

**Empfehlung: Hybrid – dein Gesicht vorne, KI im Maschinenraum.**

Warum nicht KI-Avatare als Kern: Avatar-Videos sind 2026 Commodity – jeder
kann sie, niemand vertraut ihnen, und sie zerstören unser stärkstes
Differenzierungsmerkmal gegenüber OpenAI & Co (eine echte Person aus dem
DACH-Raum, die zeigt, wie sie selbst arbeitet). Eine KI-Schule, die ihre
eigenen Videos nicht mit KI-Kompetenz, sondern mit KI-Fließband produziert,
untergräbt ihre Glaubwürdigkeit.

**Format pro Lektion (bewährt, günstig, skalierbar):**
- 20–30 % Talking Head (du, einfaches Setup: Fenster-Licht, Funkmikro, 4K-Handy reicht)
- 60–70 % Screen-Recording (echte Tools, echte Beispiele, echte Fehler)
- 10 % Grafiken/Einblendungen (liefere ich als SVG/Slides)

**Was KI (ich) übernimmt:** Skripte & Shotlists, Lektionstexte, Grafiken,
Quiz-Fragen, Prompts & Ressourcen (.md/PDF), Titel/SEO, Untertitel,
Shorts-Schnittpläne fürs Marketing. **Was du übernimmst:** 1 Drehtag pro
Level (4–6 Lektionen im Batch), Schnitt mit Descript/CapCut (oder auslagern).

**Pipeline pro Lektion (wir zwei, ~½ Tag):**
1. Outcome + Gliederung festlegen (15 Min, gemeinsam)
2. Ich schreibe Skript + Shotlist + Screen-Demo-Ablauf
3. Ich erstelle Grafiken, Prompts, Downloads, Quiz-Fragen
4. Du filmst nach Shotlist (Batch!)
5. Schnitt; ich liefere Titel, Beschreibung, Kapitelmarken
6. Ich verdrahte alles in der Plattform (Video-URL, Ressourcen, Quiz)

**Startpunkt:** Die 3 Lektionen von Kapitel „KI verstehen“ + die neue
Judgment-Lektion als erster Drehtag – damit ist Level 1 komplett und der
Free-Funnel steht.

## 7. Besucher abholen (Funnel)

1. **Landing verspricht Transformation, nicht Features:** „In 4 Wochen von
   Rumprobieren zu Automatisieren“ + 3 konkrete Vorher/Nachher-Momente.
2. **Free-Level als ehrliche Probe:** Level 1 komplett kostenlos (inkl. Quiz +
   Zertifikat light) – das ist unser „erste Lektion in Minute 1“-Quick-Win.
3. **Prompt-Bibliothek als Lead-Magnet:** .md-Export kostenlos gegen
   Newsletter (später), Shorts aus den Screen-Recordings als Traffic-Quelle.
4. **Sprache:** Du-Form, null Buzzwords, jede Aussage mit Beispiel. Der Ton
   der Lektionen ist der Ton der Landing.
