# Graph Report - madkourmedia  (2026-07-16)

## Corpus Check
- 86 files · ~42,338 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 545 nodes · 978 edges · 38 communities (28 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7e645025`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Academy Pages & Shell
- Certificates & Community
- Lesson Player Components
- JP/Alba Portfolio Site
- Dashboard & Lesson Routing
- Curriculum & Pricing Pages
- Agency Landing Page
- Graphify Skill Docs
- TypeScript Config
- Academy Strategy Docs
- Runtime Dependencies
- Dev Dependencies
- Prompt Library Export
- JP Site Layout
- Root App Layout
- Next.js Config
- Next Env Types
- PostCSS Config
- Tailwind Config
- Mobile Display Fix Note
- What You Must Do When Invoked
- types.ts
- data.ts
- AI Academy — Projektplan & Architektur
- ThemeProvider.tsx
- graphify reference: extra exports and benchmark
- AI Academy — Content-Strategie & Produktionsplan
- page.tsx
- graphify reference: query, path, explain
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- page.tsx
- page.tsx
- page.tsx

## God Nodes (most connected - your core abstractions)
1. `useAcademy()` - 25 edges
2. `base()` - 22 edges
3. `Graphify Build Pipeline` - 17 edges
4. `AdminClient()` - 16 edges
5. `getAllLessons()` - 15 edges
6. `compilerOptions` - 15 edges
7. `Check()` - 14 edges
8. `getLevels()` - 13 edges
9. `What You Must Do When Invoked` - 12 edges
10. `DashboardClient()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `CertificateDetail()` --references--> `qrcode`  [EXTRACTED]
  src/components/academy/CertificateDetail.tsx → package.json
- `generateStaticParams()` --calls--> `getAllLessons()`  [EXTRACTED]
  src/app/academy/lessons/[slug]/page.tsx → src/lib/academy/data.ts
- `Watch Mode Auto-Rebuild` --semantically_similar_to--> `Post-Commit Auto-Rebuild Hook`  [INFERRED] [semantically similar]
  .claude/skills/graphify/references/add-watch.md → .claude/skills/graphify/references/hooks.md
- `Live Progress Store (store.ts, shipped)` --semantically_similar_to--> `localStorage Progress Store (store.ts)`  [INFERRED] [semantically similar]
  docs/SESSION-HANDOVER.md → docs/PROJEKTPLAN.md
- `Target Segments (Modular Personas)` --conceptually_related_to--> `Open Items (Next Session Order)`  [INFERRED]
  docs/PROJEKTPLAN.md → docs/SESSION-HANDOVER.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Graphify Build Pipeline Stages** — _claude_skills_graphify_skill_ast_extraction, _claude_skills_graphify_skill_semantic_extraction, _claude_skills_graphify_skill_extraction_cache, _claude_skills_graphify_skill_community_detection, _claude_skills_graphify_skill_graph_health_check [EXTRACTED 1.00]
- **AI Academy Monetization Funnel** — docs_content_strategie_funnel, docs_content_strategie_prompt_bibliothek, docs_projektplan_abomodelle, docs_session_handover_plan_gating [INFERRED 0.85]
- **Content Production Plan (Market → Didactics → Curriculum → Shoot)** — docs_content_strategie_marktanalyse_2026, docs_content_strategie_didaktik_messlatte, docs_content_strategie_soll_curriculum, docs_content_strategie_hybrid_produktion, docs_session_handover_offene_punkte [EXTRACTED 1.00]

## Communities (38 total, 10 thin omitted)

### Community 0 - "Academy Pages & Shell"
Cohesion: 0.07
Nodes (58): AcademyHome(), audiences, features, HeroVisual(), marqueeSkills, method, transformation, faqs (+50 more)

### Community 1 - "Certificates & Community"
Cohesion: 0.17
Nodes (12): metadata, Avatar(), CommunityClient(), fmtDate(), initials(), leaderboard, Reply(), Thread() (+4 more)

### Community 2 - "Lesson Player Components"
Cohesion: 0.08
Nodes (48): metadata, CopyButton(), CurriculumClient(), fmt(), LessonView(), Neighbour, resourceLabel, Tab (+40 more)

### Community 3 - "JP/Alba Portfolio Site"
Cohesion: 0.07
Nodes (13): AlbaHeroVisualProps, facts, topics, JpFadeIn(), JpFadeInProps, navLinks, services, lineVariants (+5 more)

### Community 4 - "Dashboard & Lesson Routing"
Cohesion: 0.24
Nodes (10): Answers, arraysEqual(), isCorrect(), Props, QuizRunner(), ProgressBar(), certificateCode(), recordQuizResult() (+2 more)

### Community 5 - "Curriculum & Pricing Pages"
Cohesion: 0.31
Nodes (8): generateMetadata(), generateStaticParams(), QuizPage(), sitemap(), CertificatesClient(), getLevel(), getQuizForLevel(), getQuizzes()

### Community 6 - "Agency Landing Page"
Cohesion: 0.08
Nodes (14): values, clients, services, legalLinks, navLinks, lineVariants, MarqueeBand(), links (+6 more)

### Community 7 - "Graphify Skill Docs"
Cohesion: 0.08
Nodes (29): URL Ingestion (/graphify add), Watch Mode Auto-Rebuild, Neo4j / FalkorDB Cypher Export, Graphify MCP Server, Token Reduction Benchmark, Discrete Confidence Score Rubric, Full-Path Node ID Format, Extraction Subagent Prompt (+21 more)

### Community 8 - "TypeScript Config"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+17 more)

### Community 9 - "Academy Strategy Docs"
Cohesion: 0.13
Nodes (24): Context Engineering, 7-Point Didactics Checklist, Visitor Funnel Strategy, Hybrid Production (Face Front, AI Backstage), Market Analysis 2026 (Demand Ranking), OpenAI Academy Benchmark, Prompt Library (14+ Prompts, .md Export), Target Curriculum (3 Levels, 12 Lessons) (+16 more)

### Community 10 - "Runtime Dependencies"
Cohesion: 0.12
Nodes (15): framer-motion, next, dependencies, framer-motion, next, qrcode, react, react-dom (+7 more)

### Community 11 - "Dev Dependencies"
Cohesion: 0.07
Nodes (29): autoprefixer, eslint, eslint-config-next, devDependencies, autoprefixer, eslint, eslint-config-next, postcss (+21 more)

### Community 12 - "Prompt Library Export"
Cohesion: 0.54
Nodes (6): PromptLibrary(), downloadMarkdown(), libraryToMarkdown(), promptToMarkdown(), slugify(), Prompt

### Community 13 - "JP Site Layout"
Cohesion: 0.33
Nodes (4): dmSans, metadata, syne, viewport

### Community 14 - "Root App Layout"
Cohesion: 0.33
Nodes (4): dmSans, metadata, syne, viewport

### Community 21 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 22 - "types.ts"
Cohesion: 0.12
Nodes (16): Props, tierLabel, tierPerks, AccessTier, BadgeDef, Chapter, ChapterMark, Lesson (+8 more)

### Community 23 - "data.ts"
Cohesion: 0.12
Nodes (11): badges, certificates, chapters, forumThreads, lessons, levels, pricingTiers, prompts (+3 more)

### Community 24 - "AI Academy — Projektplan & Architektur"
Cohesion: 0.17
Nodes (11): 10. Querschnitt: Qualität, Sicherheit, Performance, 1. Vision & Produktziel, 2. Zielgruppen (modular verkaufbar), 3. Tech-Stack (Soll-Architektur), 4. Rollen & Berechtigungen (RBAC), 5. Abomodelle, 6. Architektur & Verzeichnisstruktur, 7. Domänenmodell (Kern) (+3 more)

### Community 25 - "ThemeProvider.tsx"
Cohesion: 0.18
Nodes (5): metadata, groups, Ctx, Theme, ThemeCtx

### Community 26 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 27 - "AI Academy — Content-Strategie & Produktionsplan"
Cohesion: 0.22
Nodes (8): 1. Was 2026 wirklich gefragt ist (Marktlage), 2. Benchmark: OpenAI Academy (unser stärkster „Gratis-Konkurrent“), 3. Was einen guten Kurs ausmacht (Didaktik-Messlatte), 4. Ehrliche Kritik am Ist-Content, 5. Soll-Curriculum (umgesetzt in dieser Iteration), 6. Produktion: KI-generiert oder selbst filmen?, 7. Besucher abholen (Funnel), AI Academy — Content-Strategie & Produktionsplan

### Community 28 - "page.tsx"
Cohesion: 0.48
Nodes (6): generateMetadata(), generateStaticParams(), LessonPage(), getChapter(), getLesson(), getNeighbours()

### Community 29 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 30 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 31 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 32 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

## Knowledge Gaps
- **198 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+193 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CertificateDetail()` connect `Runtime Dependencies` to `Lesson Player Components`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Dev Dependencies`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useAcademy()` (e.g. with `getServerSnapshot()` and `getSnapshot()`) actually correct?**
  _`useAcademy()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `AdminClient()` (e.g. with `Book()` and `Copy()`) actually correct?**
  _`AdminClient()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _198 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Academy Pages & Shell` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `Lesson Player Components` be split into smaller, more focused modules?**
  _Cohesion score 0.08007013442431327 - nodes in this community are weakly interconnected._