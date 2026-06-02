# EnterpriseTransformation

This repository stores all strategic and architectural artefacts as Strategy as Code.
The content is authored in Markdown and structured using a LeanIX-inspired metamodel for version control, traceability, and AI-assisted governance.

## Core Principles

- Everything as Code
- LeanIX-aligned structure
- AI-friendly templates and metadata
- Clear traceability across all layers
- Consistent naming and governance

## Repository Structure

```yaml
/docs/fact-sheets/     ← 12 fact sheet types, inspired by LeanIX
/docs/reports/         ← Derived analyses, dashboards and summaries
/docs/governance/      ← Rules, processes and approval guidance
/docs/automation/      ← Scripts, actions and AI agents
/docs/templates/       ← Pure YAML fact sheet schema templates
/src/                  ← Frontend application and UI code
```

> The repository stores both content and the frontend application in one place, enabling a single source of truth for architecture governance.

## Usage

- Facts sheets are the primary source of truth.
- `docs/reports`, `docs/governance`, and `docs/automation` contain derived content, controls, and support assets.
- All changes must be submitted via Pull Request and reviewed before merging into `main`.

## Fact Sheets vs Reporting

- Fact sheets are authoritative artefacts representing architecture objects.
- Reporting is derived from fact sheets and should not duplicate them.
- Reports and dashboards must reference fact sheets where the source information is maintained.

## Contribution Workflow

1. Create a new branch for your change.
2. Add or update fact sheets using the YAML templates in `docs/templates`.
3. Complete YAML frontmatter and keep metadata consistent.
4. Open a Pull Request for review.
5. Wait for approval before merging into `main`.

## Naming Conventions

- Use lowercase letters and hyphens.
- Prefix files with the fact sheet type.
- Example: `capability-l2-order-management.md`

## Metadata Standard

All fact sheets should include YAML frontmatter with the following keys:
- `type`
- `level` (if applicable)
- `status`
- `relations`
- `last_reviewed`

### Example YAML frontmatter

```yaml
---
type: capability
level: 2
status: active
relations:
  parent: ""
  children: []
last_reviewed: 2026-06-01
---
```

## Roadmap

- Add all 12 fact sheet templates
- Add governance rules and review processes
- Add automation workflows for validation and quality checks
- Add reporting views and dashboards

## Frontend Application

This repository includes a React frontend built with Vite and TypeScript for browsing and visualizing the architecture content.

### Local development

1. Install dependencies:

```bash
cd /workspaces/EnterprisePlatformUI
npm install
```

2. Start the development server:

```bash
npm run dev
```

### Configuration

- Set `VITE_FACT_SHEETS_API` in a `.env` file or environment to point at an API returning `FactSheet[]`.
- Alternatively, mount or serve the repository content and use a small adapter to expose Markdown or JSON data to the app.

### Design & Governance

- TypeScript with strict settings for correctness.
- Modular UI components under `src/components`.
- `src/utils/dataAdapter.ts` centralizes data access and can enforce naming and metadata rules.

### Features

- Browse LeanIX-style fact sheets and templates
- Search and filter architecture objects
- Explore object relationships and key metadata
- Responsive UI for desktop and tablet
- Easy configuration for different data sources

### Tech stack

- Frontend: `React`
- Build: `Vite`
- Language: `TypeScript`
- Styling: `Tailwind CSS`
- Data format: JSON
