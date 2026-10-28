# Graph Report - resuma-portfolio  (2026-10-28)

## Corpus Check
- 27 files · ~84,617 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .css 2, (none) 1)

## Summary
- 106 nodes · 144 edges · 14 communities (10 shown, 4 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 17 edges (avg confidence: 0.9)
- Token cost: 2,700 input · 950 output

## Community Hubs (Navigation)
- Package Dependencies & Metadata
- Application Shell & Root
- Portfolio Sections & Data Models
- Sidebar Navigation & Social Links
- Project Showcase & Previews
- Oxlint Linter Configuration
- Development Tooling & Plugins
- Hero Presentation & Artwork
- NPM Build & Dev Scripts
- Contact Form & Validation Logic
- HTML Entry & Vite Assets
- Favicon Vector Graphic
- React Framework Asset

## God Nodes (most connected - your core abstractions)
1. `react` - 7 edges
2. `Portfolio Features Specification` - 7 edges
3. `profile` - 6 edges
4. `scripts` - 5 edges
5. `Contact()` - 5 edges
6. `Hero()` - 5 edges
7. `Sidebar()` - 5 edges
8. `projects` - 5 edges
9. `App()` - 4 edges
10. `BackToTop()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Portfolio Features Specification` --references--> `Contact()`  [INFERRED]
  README.md → src/components/Contact.jsx
- `Portfolio Features Specification` --references--> `Hero()`  [INFERRED]
  README.md → src/components/Hero.jsx
- `Sidebar()` --references--> `SVG Icon Sprite Sheet`  [INFERRED]
  src/components/Sidebar.jsx → public/icons.svg
- `profile` --references--> `Profile Avatar Photograph`  [INFERRED]
  src/data/portfolio.js → public/profile.jpg
- `projects` --references--> `AI Tools Showcase Screenshot`  [INFERRED]
  src/data/portfolio.js → public/project-aitools.jpg

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Core Portfolio View Components** — src_components_hero_hero, src_components_about_about, src_components_projects_projects, src_components_skills_skills, src_components_contact_contact [INFERRED 0.85]
- **Project Preview Media Assets** — public_project_aitools_jpg, public_project_ecommerce_jpg, public_project_taskmanager_jpg [INFERRED 0.95]

## Communities (14 total, 4 thin omitted)

### Community 0 - "Package Dependencies & Metadata"
Cohesion: 0.12
Nodes (16): dependencies, react, react-dom, name, private, type, version, README Documentation (+8 more)

### Community 1 - "Application Shell & Root"
Cohesion: 0.19
Nodes (8): react, ref_react_dom_client, App(), BackToTop(), SECTION_IDS, useActiveSection(), useRevealOnScroll(), src_index

### Community 2 - "Portfolio Sections & Data Models"
Cohesion: 0.17
Nodes (11): Profile Avatar Photograph, Portfolio Features Specification, About(), Projects(), Skills(), Education(), Experience(), education (+3 more)

### Community 3 - "Sidebar Navigation & Social Links"
Cohesion: 0.17
Nodes (3): SVG Icon Sprite Sheet, NAV_ITEMS, Sidebar()

### Community 4 - "Project Showcase & Previews"
Cohesion: 0.25
Nodes (4): AI Tools Showcase Screenshot, E-Commerce App Screenshot, Task Manager Showcase Screenshot, projects

### Community 5 - "Oxlint Linter Configuration"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 6 - "Development Tooling & Plugins"
Cohesion: 0.33
Nodes (6): devDependencies, oxlint, @types/react, @types/react-dom, vite, @vitejs/plugin-react

### Community 8 - "NPM Build & Dev Scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, preview

### Community 9 - "Contact Form & Validation Logic"
Cohesion: 0.50
Nodes (3): Contact(), handleSubmit(), validate()

### Community 10 - "HTML Entry & Vite Assets"
Cohesion: 0.67
Nodes (3): HTML Application Entry Point, Root Mount Container, Vite Bundler Logo Vector

## Knowledge Gaps
- **36 isolated node(s):** `$schema`, `plugins`, `react/rules-of-hooks`, `react/only-export-components`, `name` (+31 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 60 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Application Shell & Root` to `Package Dependencies & Metadata`, `Contact Form & Validation Logic`, `Sidebar Navigation & Social Links`?**
  _High betweenness centrality (0.329) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Development Tooling & Plugins` to `Package Dependencies & Metadata`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `scripts` connect `NPM Build & Dev Scripts` to `Package Dependencies & Metadata`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Portfolio Features Specification` (e.g. with `About()` and `Contact()`) actually correct?**
  _`Portfolio Features Specification` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `plugins`, `react/rules-of-hooks` to the rest of the system?**
  _36 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Package Dependencies & Metadata` be split into smaller, more focused modules?**
  _Cohesion score 0.12418300653594772 - nodes in this community are weakly interconnected._