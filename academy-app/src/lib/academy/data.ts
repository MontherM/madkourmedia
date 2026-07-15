// Seed content for the AI Academy. Stands in for the CMS / Supabase until the
// backend is wired. Everything the UI renders flows through the accessors at the
// bottom so swapping the source later touches only this file.

import type {
  Level,
  Chapter,
  Lesson,
  Prompt,
  Tool,
  BadgeDef,
  UserProgress,
  PricingTier,
  ResourceItem,
  Quiz,
  Certificate,
  ForumThread,
} from "./types"

// ── Prompts ───────────────────────────────────────────────────────────────
export const prompts: Prompt[] = [
  {
    id: "p-meeting-notes",
    title: "Meeting-Protokoll in Aktionspunkte",
    body: "Du bist mein Assistent. Fasse das folgende Meeting-Transkript zusammen. Gib mir: 1) 3 Kernentscheidungen, 2) eine Tabelle mit Aufgabe | Verantwortlich | Frist, 3) offene Fragen. Transkript:\n\n{{transkript}}",
    category: "Produktivität",
    tags: ["Meetings", "Zusammenfassung", "Büro"],
    rating: 4.8,
    recommendedModel: "Claude / GPT-4o",
  },
  {
    id: "p-cold-email",
    title: "Kalte E-Mail die antwortet",
    body: "Schreibe eine kurze, ehrliche Kaltakquise-Mail (max. 90 Wörter) an {{zielperson}} bei {{firma}}. Kontext: {{angebot}}. Ton: respektvoll, kein Marketing-Sprech, eine klare Frage am Ende.",
    category: "Business",
    tags: ["Vertrieb", "E-Mail", "Marketing"],
    rating: 4.6,
    recommendedModel: "Claude",
  },
  {
    id: "p-study-cards",
    title: "Karteikarten aus einem Skript",
    body: "Erstelle aus dem folgenden Text {{anzahl}} Karteikarten im Frage/Antwort-Format für aktives Wiederholen. Fokussiere auf Verständnis, nicht auf Auswendiglernen. Text:\n\n{{text}}",
    category: "Lernen",
    tags: ["Studenten", "Lernen", "Recherche"],
    rating: 4.9,
    recommendedModel: "GPT-4o",
  },
  {
    id: "p-excel-formula",
    title: "Excel-Formel erklären & bauen",
    body: "Ich möchte in Excel {{ziel}}. Meine Spalten: {{spalten}}. Gib mir 1) die fertige Formel, 2) eine Erklärung in einem Satz, 3) eine robustere Alternative falls die Daten unsauber sind.",
    category: "Produktivität",
    tags: ["Excel", "Büro", "Automation"],
    rating: 4.7,
    recommendedModel: "Claude / GPT-4o",
  },
  {
    id: "p-content-hooks",
    title: "10 Hooks für ein Short-Video",
    body: "Thema: {{thema}}. Zielgruppe: {{zielgruppe}}. Gib mir 10 Hook-Varianten (erste 3 Sekunden) für TikTok/Reels. Pro Hook: eine Spannungs-Mechanik (Frage, Konflikt, Zahl, Versprechen).",
    category: "Content",
    tags: ["Content Creator", "Social Media", "SEO"],
    rating: 4.5,
    recommendedModel: "Claude",
  },
  {
    id: "p-decision-matrix",
    title: "Entscheidung mit Gewichtung",
    body: "Hilf mir, eine Entscheidung zu treffen zwischen {{optionen}}. Frage mich nach meinen 4 wichtigsten Kriterien, gewichte sie, und gib mir am Ende eine begründete Empfehlung plus das stärkste Gegenargument.",
    category: "Business",
    tags: ["Strategie", "Entscheidung", "Unternehmer"],
    rating: 4.8,
    recommendedModel: "Claude",
  },
  {
    id: "p-workflow-zerlegen",
    title: "Aufgabe in automatisierbare Schritte zerlegen",
    body: "Ich möchte diesen wiederkehrenden Prozess automatisieren: {{prozess}}. Zerlege ihn in einzelne Schritte als Tabelle mit: Schritt | Input | Output | Wer entscheidet (Mensch/KI/Regel) | Automatisierbar heute (ja/teilweise/nein) | Passendes Tool. Markiere den einen Schritt, mit dem ich anfangen sollte, und begründe kurz.",
    category: "Automation",
    tags: ["Workflow", "Automatisierung", "Prozess"],
    rating: 4.9,
    recommendedModel: "Claude",
  },
  {
    id: "p-agent-briefing",
    title: "System-Prompt für einen Agenten schreiben",
    body: "Schreibe einen System-Prompt für einen KI-Agenten mit dieser Aufgabe: {{aufgabe}}. Struktur: 1) Rolle & Ziel in 2 Sätzen, 2) verfügbare Werkzeuge und wann er sie nutzt, 3) harte Grenzen (was er NIE tun darf), 4) Ausgabeformat, 5) wann er einen Menschen fragen muss. Formuliere präzise und testbar, keine Floskeln.",
    category: "Automation",
    tags: ["Agenten", "System-Prompt", "n8n"],
    rating: 4.8,
    recommendedModel: "Claude / GPT-4o",
  },
  {
    id: "p-context-paket",
    title: "Kontext-Paket für dein Business",
    body: "Interviewe mich, um ein wiederverwendbares Kontext-Dokument über mein Business zu erstellen (für Custom GPTs / Claude Projects). Frage nacheinander: Angebot & Zielgruppe, Tonalität mit 2 Textbeispielen, typische Aufgaben, No-Gos, Fachbegriffe. Erstelle daraus am Ende ein sauber strukturiertes Markdown-Dokument unter 500 Wörtern.",
    category: "Automation",
    tags: ["Context Engineering", "Custom GPT", "Claude Projects"],
    rating: 4.7,
    recommendedModel: "Claude",
  },
  {
    id: "p-recherche-brief",
    title: "Recherche-Auftrag mit Quellenpflicht",
    body: "Recherchiere: {{frage}}. Vorgehen: 1) Nenne die 5 wichtigsten Erkenntnisse mit Quelle und Datum, 2) markiere, wo sich Quellen widersprechen, 3) trenne klar zwischen Fakten und Einschätzung, 4) nenne die eine Zahl, die ich mir merken sollte. Wenn du etwas nicht belegen kannst, sag es explizit.",
    category: "Recherche",
    tags: ["Perplexity", "Deep Research", "Quellen"],
    rating: 4.8,
    recommendedModel: "Perplexity / Claude",
  },
  {
    id: "p-angebot",
    title: "Angebot/Offerte aus Stichpunkten",
    body: "Erstelle aus diesen Stichpunkten ein professionelles Angebot auf Deutsch (Schweiz): {{stichpunkte}}. Struktur: Ausgangslage (zeigt, dass wir zugehört haben), Lösung in 3 Paketen (gut/besser/premium) mit Preisen, Ablauf in Schritten, Gültigkeit & nächste Schritte. Ton: kompetent, ohne Marketing-Sprech. Ende: ein Satz, der die Entscheidung leicht macht.",
    category: "Business",
    tags: ["KMU", "Vertrieb", "Angebot"],
    rating: 4.9,
    recommendedModel: "Claude",
  },
  {
    id: "p-ki-check",
    title: "Der Delegations-Check: KI oder Mensch?",
    body: "Bewerte diese Aufgabe: {{aufgabe}}. Beantworte: 1) Wie hoch ist der Schaden, wenn das Ergebnis falsch ist (1–5)? 2) Kann ich das Ergebnis in unter 2 Minuten prüfen? 3) Gibt es sensible Daten? Empfiehl dann: komplett delegieren / delegieren mit Prüfung / selbst machen – mit einer Zeile Begründung.",
    category: "Produktivität",
    tags: ["Judgment", "Sicherheit", "Delegation"],
    rating: 4.6,
    recommendedModel: "beliebig",
  },
  {
    id: "p-slides",
    title: "Präsentation mit rotem Faden",
    body: "Baue eine Gliederung für eine {{dauer}}-minütige Präsentation zu: {{thema}}. Zielgruppe: {{zielgruppe}}. Pro Folie: Titel als These (nicht als Thema), 3 Stichpunkte, Sprechernotiz in 2 Sätzen. Start mit einem Hook, Ende mit einer klaren Handlungsaufforderung. Maximal {{folien}} Folien.",
    category: "Produktivität",
    tags: ["PowerPoint", "Präsentation", "Büro"],
    rating: 4.7,
    recommendedModel: "Claude / GPT-4o",
  },
  {
    id: "p-repurpose",
    title: "Aus 1 Video → 10 Content-Stücke",
    body: "Hier ist das Transkript eines Videos: {{transkript}}. Erstelle daraus: 3 Shorts-Skripte (je 30–45 Sek, mit Hook), 3 LinkedIn-Posts in unterschiedlichen Formaten (These, Story, Liste), 2 Newsletter-Absätze, 1 Twitter/X-Thread (max. 6 Tweets), 1 FAQ-Eintrag. Behalte meine Tonalität bei und erfinde nichts dazu.",
    category: "Content",
    tags: ["Repurposing", "Social Media", "Content Creator"],
    rating: 4.8,
    recommendedModel: "Claude",
  },
]

/** Prompt lookup by id — safer than positional indexing when the list grows. */
const promptById = (id: string): Prompt => {
  const found = prompts.find((p) => p.id === id)
  if (!found) throw new Error(`Unknown prompt id: ${id}`)
  return found
}

// ── AI Tools ─────────────────────────────────────────────────────────────
export const tools: Tool[] = [
  {
    id: "t-claude",
    name: "Claude",
    category: "Chat & Reasoning",
    tagline: "Langer Kontext, starkes Schreiben & Coding",
    description:
      "Assistent von Anthropic mit sehr großem Kontextfenster, ausgezeichnet für Analyse, Schreiben und Programmieren.",
    pricing: "Free · Pro ab ~20 USD/Mt.",
    pros: ["Riesiger Kontext", "Sauberes Schreiben", "Stark beim Coding"],
    cons: ["Weniger Plugins als ChatGPT"],
    useCases: ["Dokumente analysieren", "Code schreiben", "Lange Texte"],
    url: "https://claude.ai",
  },
  {
    id: "t-chatgpt",
    name: "ChatGPT",
    category: "Chat & Reasoning",
    tagline: "Der vielseitige Allrounder",
    description:
      "Das bekannteste KI-Tool mit großem Ökosystem aus GPTs, Bildgenerierung und Datenanalyse.",
    pricing: "Free · Plus ~20 USD/Mt.",
    pros: ["Riesiges Ökosystem", "Bilder & Code-Interpreter", "Eigene GPTs"],
    cons: ["Qualität schwankt je nach Modus"],
    useCases: ["Brainstorming", "Datenanalyse", "Eigene Assistenten"],
    url: "https://chat.openai.com",
  },
  {
    id: "t-perplexity",
    name: "Perplexity",
    category: "Recherche",
    tagline: "Antwort-Maschine mit Quellen",
    description: "Kombiniert Websuche mit KI-Antworten inklusive zitierter Quellen.",
    pricing: "Free · Pro ~20 USD/Mt.",
    pros: ["Aktuelle Quellen", "Schnelle Recherche", "Folgefragen"],
    cons: ["Weniger gut für lange Kreativtexte"],
    useCases: ["Recherche", "Faktencheck", "Marktanalyse"],
    url: "https://perplexity.ai",
  },
  {
    id: "t-cursor",
    name: "Cursor",
    category: "Coding",
    tagline: "Der KI-Code-Editor",
    description: "VS-Code-basierter Editor, der KI tief in den Entwickler-Workflow integriert.",
    pricing: "Free · Pro ~20 USD/Mt.",
    pros: ["KI versteht das ganze Projekt", "Schnelles Refactoring"],
    cons: ["Eher für Entwickler"],
    useCases: ["Apps bauen", "Bugs fixen", "Lernen durch Bauen"],
    url: "https://cursor.com",
  },
  {
    id: "t-midjourney",
    name: "Midjourney",
    category: "Bild",
    tagline: "Premium-Bildgenerierung",
    description: "Erstellt hochwertige, künstlerische Bilder aus Textbeschreibungen.",
    pricing: "ab ~10 USD/Mt.",
    pros: ["Beste Bildästhetik", "Starke Stilkontrolle"],
    cons: ["Lernkurve bei Prompts", "Kein echtes Gratis-Modell"],
    useCases: ["Marketing-Visuals", "Moodboards", "Konzeptkunst"],
    url: "https://midjourney.com",
  },
  {
    id: "t-elevenlabs",
    name: "ElevenLabs",
    category: "Audio",
    tagline: "Realistische KI-Stimmen",
    description: "Natürlich klingende Sprachsynthese und Voice-Cloning in vielen Sprachen.",
    pricing: "Free · ab ~5 USD/Mt.",
    pros: ["Sehr natürliche Stimmen", "Mehrsprachig"],
    cons: ["Höhere Minuten kosten extra"],
    useCases: ["Voiceover", "Podcasts", "Hörbücher"],
    url: "https://elevenlabs.io",
  },
  {
    id: "t-n8n",
    name: "n8n",
    category: "Automation",
    tagline: "Workflows ohne Grenzen",
    description: "Open-Source-Automatisierung, die KI-Modelle mit hunderten Apps verbindet.",
    pricing: "Self-host gratis · Cloud ab ~20 EUR/Mt.",
    pros: ["Self-hostbar", "Sehr flexibel", "Viele Integrationen"],
    cons: ["Technischer als Zapier"],
    useCases: ["KI-Agenten", "Datenpipelines", "Business-Automation"],
    url: "https://n8n.io",
  },
  {
    id: "t-runway",
    name: "Runway",
    category: "Video",
    tagline: "KI-Video & VFX",
    description: "Generiert und bearbeitet Videos mit KI – von Text-to-Video bis Greenscreen.",
    pricing: "Free · ab ~15 USD/Mt.",
    pros: ["Starke Video-Generierung", "Profi-Tools"],
    cons: ["Credits verbrauchen sich schnell"],
    useCases: ["Werbespots", "B-Roll", "Experimente"],
    url: "https://runwayml.com",
  },
]

// ── Levels, Chapters, Lessons ──────────────────────────────────────────────
export const levels: Level[] = [
  {
    id: "l1",
    order: 1,
    badge: "Level 1",
    title: "AI Basics",
    subtitle: "Für komplette Anfänger",
    description:
      "Verstehe, was KI wirklich ist, lerne die wichtigsten Tools kennen und stelle gute Fragen. Am Ende kann jeder KI sicher bedienen.",
    gradient: ["#E4572E", "#F2A65A"],
    outcomes: [
      "Du verstehst, wie KI denkt – und wo ihre Grenzen sind",
      "Du bedienst ChatGPT, Claude, Gemini & Perplexity souverän",
      "Du schreibst Prompts, die zuverlässig funktionieren",
    ],
    chapterIds: ["c1-1", "c1-2"],
    access: "free",
  },
  {
    id: "l2",
    order: 2,
    badge: "Level 2",
    title: "AI Productivity",
    subtitle: "Jetzt wird gearbeitet",
    description:
      "Wende KI auf echte Arbeit an: Excel, PowerPoint, Mails, Meetings, Recherche und deine erste Prompt-Bibliothek.",
    gradient: ["#0F766E", "#2DD4BF"],
    outcomes: [
      "Du automatisierst wiederkehrende Büroarbeit",
      "Du baust dir eine persönliche Prompt-Bibliothek",
      "Du sparst nachweisbar Stunden pro Woche",
    ],
    chapterIds: ["c2-1"],
    access: "basic",
  },
  {
    id: "l3",
    order: 3,
    badge: "Level 3",
    title: "AI Workflows & Agenten",
    subtitle: "Die gefragteste Fähigkeit 2026",
    description:
      "Vom Prompt zum System: Aufgaben zerlegen, eigene Assistenten bauen, Agenten mit n8n aufsetzen und ihnen das richtige Wissen geben.",
    gradient: ["#166534", "#22C55E"],
    outcomes: [
      "Du zerlegst echte Arbeit in automatisierbare Workflows",
      "Du baust eigene Assistenten (Custom GPTs & Claude Projects)",
      "Du setzt autonome Agenten auf – sicher und mit Kontrolle",
    ],
    chapterIds: ["c3-1"],
    access: "pro",
  },
]

export const chapters: Chapter[] = [
  {
    id: "c1-1",
    levelId: "l1",
    title: "KI verstehen",
    lessonIds: ["was-ist-ki", "halluzinationen-datenschutz", "wann-ki-wann-nicht"],
  },
  {
    id: "c1-2",
    levelId: "l1",
    title: "Die Werkzeuge & gutes Prompting",
    lessonIds: ["chatgpt-claude-gemini", "gute-fragen-stellen"],
  },
  {
    id: "c2-1",
    levelId: "l2",
    title: "KI im Büroalltag",
    lessonIds: ["excel-mit-ki", "meetings-protokolle", "recherche-in-10-minuten", "angebote-auf-knopfdruck"],
  },
  {
    id: "c3-1",
    levelId: "l3",
    title: "Vom Prompt zum System",
    lessonIds: ["workflow-design", "eigene-assistenten", "erster-ki-agent", "context-engineering"],
  },
]

const r = (
  id: string,
  title: string,
  type: ResourceItem["type"],
  size?: string,
  href?: string,
): ResourceItem => ({ id, title, type, size, href })

export const lessons: Lesson[] = [
  {
    id: "was-ist-ki",
    slug: "was-ist-ki",
    levelId: "l1",
    chapterId: "c1-1",
    title: "Was ist KI – und was nicht?",
    summary: "Das mentale Modell, mit dem plötzlich alles Sinn ergibt.",
    outcome: "Danach erkennst du sofort, welche deiner Aufgaben KI heute übernehmen kann – und warum sie manchmal Unsinn erzählt.",
    duration: 9,
    access: "free",
    xp: 50,
    hasQuiz: true,
    marks: [
      { at: 0, label: "Warum das wichtig ist" },
      { at: 80, label: "Das Problem mit dem Begriff „KI“" },
      { at: 210, label: "Wie ein Sprachmodell wirklich denkt" },
      { at: 360, label: "Praxisbeispiel" },
      { at: 480, label: "Deine Aufgabe" },
    ],
    prompts: [prompts[0]],
    resources: [
      r("res-1", "Cheatsheet: KI-Grundbegriffe", "cheatsheet", "6 KB", "/downloads/cheatsheet-ki-grundbegriffe.md"),
      r("res-2", "Mindmap: So denkt ein LLM", "mindmap", "4 KB", "/downloads/mindmap-so-denkt-ein-llm.md"),
    ],
  },
  {
    id: "halluzinationen-datenschutz",
    slug: "halluzinationen-datenschutz",
    levelId: "l1",
    chapterId: "c1-1",
    title: "Halluzinationen & Datenschutz",
    summary: "Wann du der KI vertrauen darfst – und wann nicht.",
    outcome: "Danach erkennst du Halluzinationen in Sekunden und weißt genau, welche Daten nie in ein öffentliches Tool gehören.",
    duration: 11,
    access: "free",
    xp: 50,
    hasQuiz: true,
    marks: [
      { at: 0, label: "Warum KI „lügt“" },
      { at: 120, label: "Halluzinationen erkennen" },
      { at: 300, label: "Was du niemals eingeben solltest" },
      { at: 460, label: "Checkliste" },
    ],
    prompts: [],
    resources: [r("res-3", "Checkliste: Sichere KI-Nutzung", "checklist", "5 KB", "/downloads/checkliste-sichere-ki-nutzung.md")],
  },
  {
    id: "wann-ki-wann-nicht",
    slug: "wann-ki-wann-nicht",
    levelId: "l1",
    chapterId: "c1-1",
    title: "Wann KI – und wann besser nicht?",
    summary: "Der Delegations-Check, der dich vor teuren Fehlern schützt.",
    outcome: "Danach entscheidest du in 30 Sekunden, ob du eine Aufgabe komplett delegierst, mit Prüfung delegierst oder selbst machst.",
    duration: 8,
    access: "free",
    xp: 50,
    hasQuiz: true,
    marks: [
      { at: 0, label: "Die teuerste KI-Falle" },
      { at: 90, label: "Die 3 Delegations-Fragen" },
      { at: 260, label: "Live: 5 echte Aufgaben bewertet" },
      { at: 420, label: "Deine Aufgabe" },
    ],
    prompts: [promptById("p-ki-check")],
    resources: [r("res-11", "Checkliste: Der Delegations-Check", "checklist", "5 KB", "/downloads/checkliste-delegations-check.md")],
  },
  {
    id: "chatgpt-claude-gemini",
    slug: "chatgpt-claude-gemini",
    levelId: "l1",
    chapterId: "c1-2",
    title: "ChatGPT, Claude, Gemini & Perplexity",
    summary: "Welche KI für welche Aufgabe – und warum.",
    outcome: "Danach greifst du ohne Nachdenken zum richtigen Tool – statt für alles dasselbe zu benutzen.",
    duration: 14,
    access: "free",
    xp: 60,
    hasQuiz: false,
    marks: [
      { at: 0, label: "Die Landschaft" },
      { at: 150, label: "Stärken im Vergleich" },
      { at: 420, label: "Wann welches Tool" },
    ],
    prompts: [prompts[3]],
    resources: [r("res-4", "Vergleichstabelle der Tools", "pdf", "4 KB", "/downloads/vergleichstabelle-ki-tools.md")],
  },
  {
    id: "gute-fragen-stellen",
    slug: "gute-fragen-stellen",
    levelId: "l1",
    chapterId: "c1-2",
    title: "Gute Fragen stellen (Prompting)",
    summary: "Die 5 Bausteine eines Prompts, der zuverlässig liefert.",
    outcome: "Danach schreibst du Prompts, die beim ersten Versuch brauchbare Ergebnisse liefern – reproduzierbar.",
    duration: 16,
    access: "basic",
    xp: 70,
    hasQuiz: true,
    marks: [
      { at: 0, label: "Warum die meisten Prompts scheitern" },
      { at: 140, label: "Rolle · Kontext · Aufgabe · Format · Beispiel" },
      { at: 520, label: "Live-Demo: schlecht → gut" },
    ],
    prompts: [prompts[2], prompts[5]],
    resources: [
      r("res-5", "Prompt-Vorlage (kopierbar)", "template", "4 KB", "/downloads/vorlage-prompt.md"),
      r("res-6", "Cheatsheet: Prompt-Bausteine", "cheatsheet", "4 KB", "/downloads/cheatsheet-prompt-bausteine.md"),
    ],
  },
  {
    id: "excel-mit-ki",
    slug: "excel-mit-ki",
    levelId: "l2",
    chapterId: "c2-1",
    title: "Excel & Tabellen mit KI",
    summary: "Formeln, Analysen und Aufräumen in Minuten statt Stunden.",
    outcome: "Danach löst du jedes Formel-Problem per Beschreibung und bereinigst chaotische Daten in Minuten.",
    duration: 18,
    access: "basic",
    xp: 80,
    hasQuiz: true,
    marks: [
      { at: 0, label: "Das Problem" },
      { at: 110, label: "Formeln erklären lassen" },
      { at: 380, label: "Daten bereinigen" },
      { at: 620, label: "Praxisbeispiel" },
    ],
    prompts: [prompts[3]],
    resources: [r("res-7", "Vorlage: KI-Formel-Helfer", "template", "4 KB", "/downloads/vorlage-ki-formel-helfer.md")],
  },
  {
    id: "meetings-protokolle",
    slug: "meetings-protokolle",
    levelId: "l2",
    chapterId: "c2-1",
    title: "Meetings & Protokolle automatisieren",
    summary: "Vom Transkript zu Entscheidungen und Aufgaben – automatisch.",
    outcome: "Danach kostet dich kein Protokoll mehr als 3 Minuten – inklusive Aufgabenliste mit Verantwortlichen.",
    duration: 13,
    access: "pro",
    xp: 80,
    hasQuiz: false,
    marks: [
      { at: 0, label: "Warum Protokolle Zeitfresser sind" },
      { at: 160, label: "Transkript → Aktionspunkte" },
      { at: 400, label: "Workflow einrichten" },
    ],
    prompts: [prompts[0]],
    resources: [r("res-8", "Workflow: Meeting-Automation", "workflow", "5 KB", "/downloads/workflow-meeting-automation.md")],
  },
  {
    id: "recherche-in-10-minuten",
    slug: "recherche-in-10-minuten",
    levelId: "l2",
    chapterId: "c2-1",
    title: "Recherche in 10 Minuten statt 2 Stunden",
    summary: "Perplexity & Deep Research richtig einsetzen – mit Quellen, die halten.",
    outcome: "Danach lieferst du belastbare Recherchen mit geprüften Quellen in einem Zehntel der Zeit.",
    duration: 14,
    access: "basic",
    xp: 80,
    hasQuiz: false,
    marks: [
      { at: 0, label: "Warum Google-Recherche Zeit frisst" },
      { at: 120, label: "Der Recherche-Auftrag mit Quellenpflicht" },
      { at: 360, label: "Deep Research: wann es sich lohnt" },
      { at: 600, label: "Live: Marktanalyse in 10 Minuten" },
    ],
    prompts: [promptById("p-recherche-brief")],
    resources: [r("res-12", "Vorlage: Recherche-Auftrag", "template", "4 KB", "/downloads/vorlage-recherche-auftrag.md")],
  },
  {
    id: "angebote-auf-knopfdruck",
    slug: "angebote-auf-knopfdruck",
    levelId: "l2",
    chapterId: "c2-1",
    title: "Angebote & Offerten auf Knopfdruck",
    summary: "Aus 5 Stichpunkten ein Angebot, das gewinnt – der direkteste Umsatzhebel.",
    outcome: "Danach erstellst du in 10 Minuten Offerten in konstanter Qualität – statt in 45 Minuten pro Stück.",
    duration: 16,
    access: "pro",
    xp: 90,
    hasQuiz: true,
    marks: [
      { at: 0, label: "Was Angebote wirklich kosten" },
      { at: 110, label: "Die 3-Pakete-Struktur" },
      { at: 340, label: "Live: Offerte für einen Handwerksbetrieb" },
      { at: 700, label: "Deine Vorlage einrichten" },
    ],
    prompts: [promptById("p-angebot")],
    resources: [
      r("res-13", "Vorlage: Angebots-Generator", "template", "4 KB", "/downloads/vorlage-angebots-generator.md"),
      r("res-14", "Checkliste: Angebot vor dem Versand", "checklist", "4 KB", "/downloads/checkliste-angebot-versand.md"),
    ],
  },
  {
    id: "workflow-design",
    slug: "workflow-design",
    levelId: "l3",
    chapterId: "c3-1",
    title: "Workflow-Design: Aufgaben zerlegen wie ein Profi",
    summary: "Die Fähigkeit hinter jeder Automatisierung – und die gefragteste Skill 2026.",
    outcome: "Danach zerlegst du jeden wiederkehrenden Prozess in Schritte und weißt, welcher sich zuerst automatisieren lässt.",
    duration: 15,
    access: "pro",
    xp: 100,
    hasQuiz: true,
    marks: [
      { at: 0, label: "Warum die meisten Automationen scheitern" },
      { at: 130, label: "Input → Entscheidung → Output" },
      { at: 380, label: "Mensch, KI oder Regel?" },
      { at: 620, label: "Live: Rechnungsprozess zerlegt" },
    ],
    prompts: [promptById("p-workflow-zerlegen")],
    resources: [r("res-15", "Vorlage: Workflow-Canvas", "template", "5 KB", "/downloads/vorlage-workflow-canvas.md")],
  },
  {
    id: "eigene-assistenten",
    slug: "eigene-assistenten",
    levelId: "l3",
    chapterId: "c3-1",
    title: "Eigene Assistenten: Custom GPTs & Claude Projects",
    summary: "Dein Wissen, einmal eingerichtet – jeden Tag abrufbar.",
    outcome: "Danach hast du einen persönlichen Assistenten, der dein Business kennt und in deinem Ton antwortet.",
    duration: 17,
    access: "pro",
    xp: 100,
    hasQuiz: false,
    marks: [
      { at: 0, label: "Prompt wiederholen vs. Assistent bauen" },
      { at: 140, label: "Das Kontext-Paket erstellen" },
      { at: 420, label: "Custom GPT einrichten" },
      { at: 680, label: "Dasselbe in Claude Projects" },
    ],
    prompts: [promptById("p-context-paket")],
    resources: [r("res-16", "Vorlage: Kontext-Paket (Markdown)", "template", "4 KB", "/downloads/vorlage-kontext-paket.md")],
  },
  {
    id: "erster-ki-agent",
    slug: "erster-ki-agent",
    levelId: "l3",
    chapterId: "c3-1",
    title: "Dein erster KI-Agent mit n8n",
    summary: "Ein Agent, der eigenständig recherchiert und dir berichtet.",
    outcome: "Danach läuft dein erster Agent – mit klaren Grenzen, Logging und einem Menschen im Loop.",
    duration: 24,
    access: "pro",
    xp: 120,
    hasQuiz: true,
    marks: [
      { at: 0, label: "Was ein Agent wirklich ist" },
      { at: 180, label: "n8n einrichten" },
      { at: 540, label: "KI-Node verbinden" },
      { at: 900, label: "Agent testen & härten" },
    ],
    prompts: [promptById("p-agent-briefing")],
    resources: [
      r("res-9", "n8n Workflow-Export (JSON)", "workflow", "5 KB", "/downloads/n8n-erster-ki-agent.json"),
      r("res-10", "Checkliste: Agent absichern", "checklist", "5 KB", "/downloads/checkliste-agent-absichern.md"),
    ],
  },
  {
    id: "context-engineering",
    slug: "context-engineering",
    levelId: "l3",
    chapterId: "c3-1",
    title: "Context Engineering: dem Agenten das richtige Wissen geben",
    summary: "Nicht die Frage entscheidet, sondern was der Agent weiß und darf.",
    outcome: "Danach stattest du Agenten mit Wissen, Werkzeugen und Grenzen aus, sodass sie zuverlässig statt zufällig arbeiten.",
    duration: 14,
    access: "pro",
    xp: 110,
    hasQuiz: true,
    marks: [
      { at: 0, label: "Warum gute Prompts nicht reichen" },
      { at: 130, label: "Wissen: was in den Kontext gehört" },
      { at: 360, label: "Werkzeuge & Grenzen definieren" },
      { at: 580, label: "Live: Agent-Briefing verbessern" },
    ],
    prompts: [promptById("p-agent-briefing"), promptById("p-context-paket")],
    resources: [r("res-17", "Cheatsheet: Context Engineering", "cheatsheet", "5 KB", "/downloads/cheatsheet-context-engineering.md")],
  },
]

// ── Gamification ───────────────────────────────────────────────────────────
export const badges: BadgeDef[] = [
  { id: "b-first", name: "Erster Schritt", description: "Erste Lektion abgeschlossen", icon: "✦", earned: true },
  { id: "b-streak7", name: "7-Tage-Streak", description: "Eine Woche am Stück gelernt", icon: "◆", earned: true },
  { id: "b-basics", name: "Basics gemeistert", description: "Level 1 abgeschlossen", icon: "●", earned: true },
  { id: "b-prompt", name: "Prompt-Profi", description: "25 Prompts genutzt", icon: "▲", earned: false },
  { id: "b-automation", name: "Automatisierer", description: "Ersten Agenten gebaut", icon: "⬡", earned: false },
  { id: "b-master", name: "AI Master", description: "Alle Level abgeschlossen", icon: "★", earned: false },
]

export const user: UserProgress = {
  name: "Monther",
  role: "pro",
  plan: "pro",
  xp: 1240,
  streak: 7,
  completedLessons: ["was-ist-ki", "halluzinationen-datenschutz", "chatgpt-claude-gemini"],
  bookmarkedLessons: ["gute-fragen-stellen", "erster-ki-agent"],
  badges,
  continueLessonId: "gute-fragen-stellen",
  weeklyGoal: 5,
  weeklyDone: 3,
}

// ── Quizzes (one Abschluss-Quiz per Level) ─────────────────────────────────
export const quizzes: Quiz[] = [
  {
    id: "quiz-l1",
    levelId: "l1",
    title: "Abschluss-Quiz: AI Basics",
    passScore: 0.7,
    xp: 150,
    questions: [
      {
        id: "q1",
        type: "single",
        prompt: "Was beschreibt ein großes Sprachmodell (LLM) am besten?",
        options: [
          { id: "a", text: "Eine Datenbank mit allen richtigen Antworten" },
          { id: "b", text: "Ein System, das das nächste wahrscheinlichste Wort vorhersagt" },
          { id: "c", text: "Eine Suchmaschine mit Live-Zugriff aufs Internet" },
          { id: "d", text: "Ein Taschenrechner für Sprache" },
        ],
        correct: ["b"],
        explanation:
          "Ein LLM erzeugt Text, indem es Schritt für Schritt das wahrscheinlichste nächste Token vorhersagt – es ist kein Faktenspeicher.",
      },
      {
        id: "q2",
        type: "multiple",
        prompt: "Welche Maßnahmen reduzieren Halluzinationen? (Mehrfachauswahl)",
        options: [
          { id: "a", text: "Quellen oder Kontext mitgeben" },
          { id: "b", text: "Nach Begründung und Unsicherheit fragen" },
          { id: "c", text: "Möglichst vage Fragen stellen" },
          { id: "d", text: "Antworten kritisch gegenprüfen" },
        ],
        correct: ["a", "b", "d"],
        explanation:
          "Kontext, Nachfragen nach Begründung und eigenes Gegenprüfen senken das Risiko. Vage Fragen erhöhen es.",
      },
      {
        id: "q3",
        type: "single",
        prompt: "Welche Daten solltest du einer öffentlichen KI NICHT anvertrauen?",
        options: [
          { id: "a", text: "Eine erfundene Beispieladresse" },
          { id: "b", text: "Sensible Kunden- oder Gesundheitsdaten" },
          { id: "c", text: "Einen öffentlichen Blogtext" },
          { id: "d", text: "Eine allgemeine Wissensfrage" },
        ],
        correct: ["b"],
        explanation: "Personenbezogene und vertrauliche Daten gehören nicht in öffentliche Tools.",
      },
      {
        id: "f1",
        type: "flashcard",
        prompt: "Die 5 Bausteine eines guten Prompts?",
        back: "Rolle · Kontext · Aufgabe · Format · Beispiel.",
      },
    ],
  },
  {
    id: "quiz-l2",
    levelId: "l2",
    title: "Abschluss-Quiz: AI Productivity",
    passScore: 0.7,
    xp: 180,
    questions: [
      {
        id: "q1",
        type: "single",
        prompt: "Was ist der schnellste KI-Weg zu einer komplexen Excel-Formel?",
        options: [
          { id: "a", text: "Ziel + Spaltenstruktur beschreiben und Formel generieren lassen" },
          { id: "b", text: "Solange raten, bis es passt" },
          { id: "c", text: "Die ganze Datei als Bild hochladen" },
        ],
        correct: ["a"],
        explanation: "Klares Ziel + Datenstruktur liefert zuverlässige, erklärte Formeln.",
      },
      {
        id: "q2",
        type: "multiple",
        prompt: "Was gehört in ein gutes Meeting-Protokoll aus KI? (Mehrfachauswahl)",
        options: [
          { id: "a", text: "Kernentscheidungen" },
          { id: "b", text: "Aufgaben mit Verantwortlichen und Fristen" },
          { id: "c", text: "Wörtliches Komplett-Transkript ohne Struktur" },
          { id: "d", text: "Offene Fragen" },
        ],
        correct: ["a", "b", "d"],
        explanation: "Entscheidungen, klare To-dos und offene Punkte – nicht das rohe Transkript.",
      },
      {
        id: "f1",
        type: "flashcard",
        prompt: "Warum eine eigene Prompt-Bibliothek aufbauen?",
        back: "Wiederholbare Ergebnisse, weniger Tippen, konstante Qualität über Zeit.",
      },
    ],
  },
  {
    id: "quiz-l3",
    levelId: "l3",
    title: "Abschluss-Quiz: AI Workflows & Agenten",
    passScore: 0.7,
    xp: 220,
    questions: [
      {
        id: "q0",
        type: "single",
        prompt: "Du willst einen Prozess automatisieren. Was ist der richtige erste Schritt?",
        options: [
          { id: "a", text: "Den Prozess in Schritte mit Input, Output und Entscheider zerlegen" },
          { id: "b", text: "Sofort das mächtigste Tool kaufen" },
          { id: "c", text: "Den ganzen Prozess auf einmal einem Agenten übergeben" },
        ],
        correct: ["a"],
        explanation:
          "Workflow-Design kommt vor Tooling: Erst zerlegen, dann pro Schritt entscheiden, ob Mensch, Regel oder KI übernimmt.",
      },
      {
        id: "q1",
        type: "single",
        prompt: "Was unterscheidet einen KI-Agenten von einem einfachen Prompt?",
        options: [
          { id: "a", text: "Er nutzt Werkzeuge und handelt über mehrere Schritte eigenständig" },
          { id: "b", text: "Er ist einfach ein längerer Prompt" },
          { id: "c", text: "Er braucht kein Sprachmodell" },
        ],
        correct: ["a"],
        explanation: "Ein Agent plant, nutzt Tools/APIs und führt mehrere Schritte aus, um ein Ziel zu erreichen.",
      },
      {
        id: "q2",
        type: "multiple",
        prompt: "Worauf solltest du beim Absichern eines Agenten achten? (Mehrfachauswahl)",
        options: [
          { id: "a", text: "Rechte minimal halten (least privilege)" },
          { id: "b", text: "Aktionen protokollieren" },
          { id: "c", text: "Unbegrenzte Schleifen ohne Limits erlauben" },
          { id: "d", text: "Kritische Schritte bestätigen lassen" },
        ],
        correct: ["a", "b", "d"],
        explanation: "Minimale Rechte, Logging und Bestätigungen schützen – ungebremste Schleifen sind ein Risiko.",
      },
      {
        id: "f2",
        type: "flashcard",
        prompt: "Context Engineering in einem Satz?",
        back: "Dem Agenten das richtige Wissen, die richtigen Werkzeuge und klare Grenzen geben – nicht nur die richtige Frage stellen.",
      },
    ],
  },
]

// ── Certificates (verifizierbar) ───────────────────────────────────────────
export const certificates: Certificate[] = [
  {
    id: "AC-2026-1A7F3D",
    levelId: "l1",
    levelTitle: "AI Basics",
    recipient: "Monther Madkour",
    issuedAt: "2026-05-12",
    score: 0.92,
  },
]

// ── Community (Seed-Threads) ───────────────────────────────────────────────
export const forumCategories = [
  "Alle",
  "Prompting",
  "Automatisierung",
  "Tools",
  "Business",
  "Feedback",
] as const

export const forumThreads: ForumThread[] = [
  {
    id: "th-welcome",
    title: "Willkommen in der Community – so holst du am meisten raus",
    body: "Kurz vorgestellt, Fragen gestellt, Wissen geteilt: Hier findest du Mitlernende vom ersten Prompt bis zum eigenen Agenten. Bitte bleib respektvoll, teile Kontext zu deinen Fragen (Tool, Ziel, was du probiert hast) – dann bekommst du die besten Antworten.",
    author: "AI Academy Team",
    authorRole: "team",
    category: "Feedback",
    createdAt: "2026-06-01",
    likes: 48,
    pinned: true,
    replies: [
      {
        id: "r-w1",
        author: "Sandra K.",
        body: "Super Start! Die Struktur der Lektionen ist genau das, was mir bei YouTube-Tutorials immer gefehlt hat.",
        createdAt: "2026-06-02",
        likes: 12,
      },
    ],
  },
  {
    id: "th-prompt-laenge",
    title: "Sind lange Prompts wirklich besser?",
    body: "In Level 1 heißt es Rolle · Kontext · Aufgabe · Format · Beispiel. Aber manchmal bekomme ich mit einem Zweizeiler bessere Ergebnisse als mit einem halben Roman. Woran liegt das?",
    author: "Marco B.",
    category: "Prompting",
    createdAt: "2026-06-18",
    likes: 23,
    solved: true,
    replies: [
      {
        id: "r-p1",
        author: "AI Academy Team",
        authorRole: "team",
        body: "Gute Beobachtung! Länge ist kein Ziel, Präzision schon. Die 5 Bausteine helfen dir zu prüfen, ob nichts Wichtiges fehlt – nicht, den Prompt aufzublähen. Bei einfachen Aufgaben reichen 2 Bausteine völlig.",
        createdAt: "2026-06-18",
        likes: 19,
      },
      {
        id: "r-p2",
        author: "Julia R.",
        body: "Mir hilft es, den Prompt erst lang zu schreiben und dann zu kürzen bis er kippt. So findet man das Minimum.",
        createdAt: "2026-06-19",
        likes: 8,
      },
    ],
  },
  {
    id: "th-n8n-mail",
    title: "n8n: Agent soll Mails zusammenfassen – wo anfangen?",
    body: "Ich habe Lektion „Dein erster KI-Agent“ durch und will jetzt meine Morgen-Mails automatisch zusammenfassen lassen. IMAP-Node → KI-Node → Slack? Hat jemand einen funktionierenden Workflow?",
    author: "Deniz A.",
    category: "Automatisierung",
    createdAt: "2026-06-24",
    likes: 17,
    replies: [
      {
        id: "r-n1",
        author: "Tobias F.",
        body: "Genau die Kette. Wichtig: im KI-Node ein striktes Ausgabeformat verlangen (max. 5 Bullet Points), sonst wird der Slack-Post riesig.",
        createdAt: "2026-06-24",
        likes: 9,
      },
      {
        id: "r-n2",
        author: "AI Academy Team",
        authorRole: "team",
        body: "In den Ressourcen der Agenten-Lektion liegt ein Workflow-Export (JSON), der fast genau das macht – importieren und den Mail-Trigger anpassen.",
        createdAt: "2026-06-25",
        likes: 11,
      },
    ],
  },
  {
    id: "th-tool-bild",
    title: "Midjourney vs. DALL·E für Immobilien-Exposés?",
    body: "Ich brauche fotorealistische Visualisierungen für Exposés. Midjourney sieht besser aus, aber das Handling über Discord nervt. Lohnt sich der Umstieg trotzdem?",
    author: "Petra S.",
    category: "Tools",
    createdAt: "2026-06-27",
    likes: 9,
    replies: [
      {
        id: "r-t1",
        author: "Marco B.",
        body: "Für Fotorealismus ist Midjourney aktuell klar vorn. Mit der Web-App brauchst du Discord kaum noch.",
        createdAt: "2026-06-28",
        likes: 5,
      },
    ],
  },
  {
    id: "th-kmu-angebot",
    title: "KI-Angebotserstellung im Handwerksbetrieb – Erfahrungen?",
    body: "Wir schreiben pro Woche ~15 Angebote, jedes dauert 30–45 Min. Ich will mit den Level-2-Methoden eine Vorlage bauen, die aus Stichpunkten ein fertiges Angebot macht. Hat das schon jemand produktiv im Einsatz?",
    author: "Stefan M.",
    category: "Business",
    createdAt: "2026-06-29",
    likes: 14,
    replies: [],
  },
]

// ── Pricing ────────────────────────────────────────────────────────────────
export const pricingTiers: PricingTier[] = [
  {
    plan: "free",
    name: "Free",
    price: "CHF 0",
    cadence: "für immer",
    tagline: "Reinschnuppern & verstehen",
    features: ["5–10 Lektionen", "Newsletter", "Community-Lite", "Prompt-Vorschau"],
    cta: "Kostenlos starten",
  },
  {
    plan: "basic",
    name: "Basic",
    price: "CHF 24",
    cadence: "/ Monat",
    tagline: "Die Grundlagen, richtig",
    features: ["Gesamtes Level 1", "Prompt-Bibliothek", "Wöchentliche Updates", "Fortschritt & XP"],
    cta: "Basic wählen",
  },
  {
    plan: "pro",
    name: "Pro",
    price: "CHF 59",
    cadence: "/ Monat",
    tagline: "Alles, um wirklich produktiv zu werden",
    features: ["Alle Kurse & Level", "Alle Downloads", "Live Q&A", "Volle Community", "Zertifikate"],
    highlighted: true,
    cta: "Pro wählen",
  },
  {
    plan: "elite",
    name: "Elite",
    price: "CHF 199",
    cadence: "/ Monat",
    tagline: "Für Profis & Unternehmen",
    features: [
      "Alles aus Pro",
      "Persönliche Coachings",
      "Unternehmensvorlagen",
      "Neue Masterclasses zuerst",
      "Frühzugang & Zertifizierungen",
    ],
    cta: "Elite anfragen",
  },
]

// ── Accessors (the only API the UI should use) ─────────────────────────────
export const getLevels = () => [...levels].sort((a, b) => a.order - b.order)
export const getLevel = (id: string) => levels.find((l) => l.id === id)
export const getChapter = (id: string) => chapters.find((c) => c.id === id)
export const getChaptersForLevel = (levelId: string) =>
  chapters.filter((c) => c.levelId === levelId)
export const getLesson = (slug: string) => lessons.find((l) => l.slug === slug)
export const getLessonsForChapter = (chapterId: string) =>
  chapters.find((c) => c.id === chapterId)?.lessonIds.map((id) => lessons.find((l) => l.id === id)!).filter(Boolean) ??
  []
export const getAllLessons = () => lessons
export const getNeighbours = (slug: string) => {
  const idx = lessons.findIndex((l) => l.slug === slug)
  return {
    prev: idx > 0 ? lessons[idx - 1] : undefined,
    next: idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : undefined,
  }
}
export const getUser = () => user
export const getPrompts = () => prompts
export const getTools = () => tools
export const getPricing = () => pricingTiers
export const getQuizzes = () => quizzes
export const getQuizForLevel = (levelId: string) => quizzes.find((q) => q.levelId === levelId)
export const getForumThreads = () =>
  [...forumThreads].sort((a, b) => Number(b.pinned ?? false) - Number(a.pinned ?? false))
export const getCertificates = () => certificates
export const getCertificate = (id: string) => certificates.find((c) => c.id === id)
export const getCertificateForLevel = (levelId: string) =>
  certificates.find((c) => c.levelId === levelId)

export const totalLessonCount = lessons.length
