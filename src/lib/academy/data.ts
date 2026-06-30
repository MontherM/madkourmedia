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
]

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
    gradient: ["#6366F1", "#8B5CF6"],
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
    gradient: ["#0EA5E9", "#22D3EE"],
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
    title: "AI Master",
    subtitle: "Hier beginnt das eigentliche Geld",
    description:
      "Agenten, Automatisierung mit n8n, APIs, Cursor & Claude Code, eigene GPTs und Business-Workflows.",
    gradient: ["#F59E0B", "#F97316"],
    outcomes: [
      "Du baust autonome KI-Agenten & Automationen",
      "Du verbindest KI über APIs mit deinen Tools",
      "Du entwickelst eigene Assistenten für dein Business",
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
    lessonIds: ["was-ist-ki", "halluzinationen-datenschutz"],
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
    lessonIds: ["excel-mit-ki", "meetings-protokolle"],
  },
  {
    id: "c3-1",
    levelId: "l3",
    title: "Automatisierung & Agenten",
    lessonIds: ["erster-ki-agent"],
  },
]

const r = (
  id: string,
  title: string,
  type: ResourceItem["type"],
  size?: string,
): ResourceItem => ({ id, title, type, size })

export const lessons: Lesson[] = [
  {
    id: "was-ist-ki",
    slug: "was-ist-ki",
    levelId: "l1",
    chapterId: "c1-1",
    title: "Was ist KI – und was nicht?",
    summary: "Das mentale Modell, mit dem plötzlich alles Sinn ergibt.",
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
      r("res-1", "Cheatsheet: KI-Grundbegriffe", "cheatsheet", "0.4 MB"),
      r("res-2", "Mindmap: So denkt ein LLM", "mindmap", "0.8 MB"),
    ],
  },
  {
    id: "halluzinationen-datenschutz",
    slug: "halluzinationen-datenschutz",
    levelId: "l1",
    chapterId: "c1-1",
    title: "Halluzinationen & Datenschutz",
    summary: "Wann du der KI vertrauen darfst – und wann nicht.",
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
    resources: [r("res-3", "Checkliste: Sichere KI-Nutzung", "checklist", "0.3 MB")],
  },
  {
    id: "chatgpt-claude-gemini",
    slug: "chatgpt-claude-gemini",
    levelId: "l1",
    chapterId: "c1-2",
    title: "ChatGPT, Claude, Gemini & Perplexity",
    summary: "Welche KI für welche Aufgabe – und warum.",
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
    resources: [r("res-4", "Vergleichstabelle der Tools", "pdf", "0.6 MB")],
  },
  {
    id: "gute-fragen-stellen",
    slug: "gute-fragen-stellen",
    levelId: "l1",
    chapterId: "c1-2",
    title: "Gute Fragen stellen (Prompting)",
    summary: "Die 5 Bausteine eines Prompts, der zuverlässig liefert.",
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
      r("res-5", "Prompt-Vorlage (kopierbar)", "template", "0.2 MB"),
      r("res-6", "Cheatsheet: Prompt-Bausteine", "cheatsheet", "0.5 MB"),
    ],
  },
  {
    id: "excel-mit-ki",
    slug: "excel-mit-ki",
    levelId: "l2",
    chapterId: "c2-1",
    title: "Excel & Tabellen mit KI",
    summary: "Formeln, Analysen und Aufräumen in Minuten statt Stunden.",
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
    resources: [r("res-7", "Vorlage: KI-Formel-Helfer", "template", "0.3 MB")],
  },
  {
    id: "meetings-protokolle",
    slug: "meetings-protokolle",
    levelId: "l2",
    chapterId: "c2-1",
    title: "Meetings & Protokolle automatisieren",
    summary: "Vom Transkript zu Entscheidungen und Aufgaben – automatisch.",
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
    resources: [r("res-8", "Workflow: Meeting-Automation", "workflow", "0.4 MB")],
  },
  {
    id: "erster-ki-agent",
    slug: "erster-ki-agent",
    levelId: "l3",
    chapterId: "c3-1",
    title: "Dein erster KI-Agent mit n8n",
    summary: "Ein Agent, der eigenständig recherchiert und dir berichtet.",
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
    prompts: [prompts[5]],
    resources: [
      r("res-9", "n8n Workflow-Export (JSON)", "workflow", "0.1 MB"),
      r("res-10", "Checkliste: Agent absichern", "checklist", "0.3 MB"),
    ],
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

export const totalLessonCount = lessons.length
