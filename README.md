# Enterprise Platform UI

This repository contains a governance-first React front-end scaffold (Vite + TypeScript) designed to work with the EnterpriseTransformation templates and data.

Quick start

1. Install dependencies:

```bash
cd /workspaces/EnterprisePlatformUI
npm install
```

2. Start dev server:

```bash
npm run dev
```

Configuration
- Provide an API endpoint returning FactSheet[] by setting `VITE_FACT_SHEETS_API` in a `.env` file or environment.
- Alternatively mount or serve the `EnterpriseTransformation` folder and create a small adapter endpoint to surface templates as JSON.

Design & Governance
- TypeScript + strict settings to promote correctness.
- Modular components under `src/components`.
- `src/utils/dataAdapter.ts` centralizes data access and can be extended to enforce naming and metadata governance rules.

Next steps
- Add ESLint/Prettier, CI, Storybook, and tests.
- Implement templates-driven editor and approval workflows that map to `governance/*` rules in the EnterpriseTransformation repository.
# Enterprise Transformation Frontend

A lightweight front-end application for browsing and visualizing the LeanIX-style enterprise architecture content stored in the companion repository.

This project is intended to present:
- business capabilities
- applications
- data objects
- IT components
- governance metadata
- reports and dashboards

It is designed as a separate repo so the UI can evolve independently from the data/template repository.

---

## Features

- Browse LeanIX-style fact sheets and templates
- Search and filter architecture objects
- View object relationships and key metadata
- Responsive UI for desktop and tablet
- Easy configuration for different data sources

---

## Tech stack

- Frontend: `React`
- Build: `Create React App`
- Language: `TypeScript`
- Styling: `Tailwind CSS`
- Data format: JSON

---

## Getting started

```bash
git clone https://github.com/SuneVadsholtLyster/enterprise-transformation-frontend.git
cd enterprise-transformation-frontend
npm install
npm run dev
