# Graph Report - .  (2026-07-16)

## Corpus Check
- Corpus is ~42,338 words - fits in a single context window. You may not need a graph.

## Summary
- 466 nodes · 909 edges · 21 communities (16 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 27 edges (avg confidence: 0.76)
- Token cost: 99,891 input · 0 output

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

## God Nodes (most connected - your core abstractions)
1. `useAcademy()` - 25 edges
2. `base()` - 22 edges
3. `Graphify Build Pipeline` - 17 edges
4. `AdminClient()` - 16 edges
5. `getAllLessons()` - 15 edges
6. `compilerOptions` - 15 edges
7. `Check()` - 14 edges
8. `getLevels()` - 13 edges
9. `DashboardClient()` - 11 edges
10. `Sparkles()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `CertificateDetail()` --references--> `qrcode`  [EXTRACTED]
  src/components/academy/CertificateDetail.tsx → package.json
- `AdminClient()` --indirect_call--> `Book()`  [INFERRED]
  src/components/academy/AdminClient.tsx → src/components/academy/ui/Icons.tsx
- `AdminClient()` --indirect_call--> `Trophy()`  [INFERRED]
  src/components/academy/AdminClient.tsx → src/components/academy/ui/Icons.tsx
- `Watch Mode Auto-Rebuild` --semantically_similar_to--> `Post-Commit Auto-Rebuild Hook`  [INFERRED] [semantically similar]
  .claude/skills/graphify/references/add-watch.md → .claude/skills/graphify/references/hooks.md
- `Live Progress Store (store.ts, shipped)` --semantically_similar_to--> `localStorage Progress Store (store.ts)`  [INFERRED] [semantically similar]
  docs/SESSION-HANDOVER.md → docs/PROJEKTPLAN.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Graphify Build Pipeline Stages** — _claude_skills_graphify_skill_ast_extraction, _claude_skills_graphify_skill_semantic_extraction, _claude_skills_graphify_skill_extraction_cache, _claude_skills_graphify_skill_community_detection, _claude_skills_graphify_skill_graph_health_check [EXTRACTED 1.00]
- **AI Academy Monetization Funnel** — docs_content_strategie_funnel, docs_content_strategie_prompt_bibliothek, docs_projektplan_abomodelle, docs_session_handover_plan_gating [INFERRED 0.85]
- **Content Production Plan (Market → Didactics → Curriculum → Shoot)** — docs_content_strategie_marktanalyse_2026, docs_content_strategie_didaktik_messlatte, docs_content_strategie_soll_curriculum, docs_content_strategie_hybrid_produktion, docs_session_handover_offene_punkte [EXTRACTED 1.00]

## Communities (21 total, 5 thin omitted)

### Community 0 - "Academy Pages & Shell"
Cohesion: 0.06
Nodes (45): metadata, metadata, AcademyHome(), PromptsPage(), metadata, ToolsPage(), groups, links (+37 more)

### Community 1 - "Certificates & Community"
Cohesion: 0.05
Nodes (42): generateStaticParams(), metadata, Avatar(), CommunityClient(), fmtDate(), initials(), leaderboard, Reply() (+34 more)

### Community 2 - "Lesson Player Components"
Cohesion: 0.10
Nodes (38): CopyButton(), fmt(), LessonView(), Neighbour, Props, resourceLabel, Tab, tabs (+30 more)

### Community 3 - "JP/Alba Portfolio Site"
Cohesion: 0.07
Nodes (13): AlbaHeroVisualProps, facts, topics, JpFadeIn(), JpFadeInProps, navLinks, services, lineVariants (+5 more)

### Community 4 - "Dashboard & Lesson Routing"
Cohesion: 0.10
Nodes (31): metadata, generateMetadata(), generateStaticParams(), LessonPage(), audiences, features, HeroVisual(), marqueeSkills (+23 more)

### Community 5 - "Curriculum & Pricing Pages"
Cohesion: 0.10
Nodes (23): metadata, metadata, faqs, metadata, PricingPage(), metadata, generateMetadata(), generateStaticParams() (+15 more)

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
Cohesion: 0.09
Nodes (21): framer-motion, next, dependencies, framer-motion, next, qrcode, react, react-dom (+13 more)

### Community 11 - "Dev Dependencies"
Cohesion: 0.10
Nodes (21): autoprefixer, eslint, eslint-config-next, devDependencies, autoprefixer, eslint, eslint-config-next, postcss (+13 more)

### Community 12 - "Prompt Library Export"
Cohesion: 0.54
Nodes (6): PromptLibrary(), downloadMarkdown(), libraryToMarkdown(), promptToMarkdown(), slugify(), Prompt

### Community 13 - "JP Site Layout"
Cohesion: 0.33
Nodes (4): dmSans, metadata, syne, viewport

### Community 14 - "Root App Layout"
Cohesion: 0.33
Nodes (4): dmSans, metadata, syne, viewport

## Knowledge Gaps
- **141 isolated node(s):** `nextConfig`, `name`, `version`, `private`, `dev` (+136 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CertificateDetail()` connect `Runtime Dependencies` to `Academy Pages & Shell`, `Lesson Player Components`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useAcademy()` (e.g. with `getServerSnapshot()` and `getSnapshot()`) actually correct?**
  _`useAcademy()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `AdminClient()` (e.g. with `Book()` and `Copy()`) actually correct?**
  _`AdminClient()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `nextConfig`, `name`, `version` to the rest of the system?**
  _141 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Academy Pages & Shell` be split into smaller, more focused modules?**
  _Cohesion score 0.05750658472344162 - nodes in this community are weakly interconnected._
- **Should `Certificates & Community` be split into smaller, more focused modules?**
  _Cohesion score 0.05137844611528822 - nodes in this community are weakly interconnected._
- **Should `Lesson Player Components` be split into smaller, more focused modules?**
  _Cohesion score 0.09856035437430787 - nodes in this community are weakly interconnected._