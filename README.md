# JSON-Driven NPM Architecture

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D20.10-brightgreen.svg)](package.json)
[![docs](https://img.shields.io/badge/docs-Documentation%20Hub-38bdf8.svg)](docs/index.html)
[![npx](https://img.shields.io/badge/npx-json--driven--npm-orange.svg)](bin/README.md)

An architectural **source of truth** and living reference implementation for building scalable, type-safe API clients in JavaScript and TypeScript without physical directory sprawl.

> **Zero Code Transport**: This package is not a template generator and does not copy code into other directories. It is an educational reference that **executes what it has inside**, exposing its internal structure, routes, and data live via **`npm`** and **`npx`**.
>
> To scaffold this architecture into your own project, use the companion tool: [`create-json-driven-npm`](https://www.npmjs.com/package/create-json-driven-npm) via `npm create json-driven-npm`.

**[Explore the Documentation Hub &rarr;](docs/index.html)** · **[Active v4 Architecture &rarr;](src/README.md)** · **[CLI Runner &rarr;](bin/README.md)**

---

## The Core Concept: Endpoints as Data

In conventional client libraries, adding 50 endpoints requires creating 50 nested directories and 50 repetitive boilerplate files:

```text
src/
└── users/
    ├── profile/fetch.js
    └── settings/fetch.js
└── reports/
    ├── summary/fetch.js
    └── metrics/fetch.js
```

In a **JSON-Driven Architecture**, endpoints are structured data:

```text
src/v4/
├── api.json              # Public allowlist: explicit array of exposed route paths
├── source.json           # Domain contract: resource metadata, descriptions, & data
├── index.js              # Composition root: mounts the in-memory client tree
└── engine/
    ├── route/            # Assembly engine: mounts dot-paths into nested callable objects
    └── execution/        # Pipeline: validates input, retrieves spec, and dispatches queries
```

---

## Two Ways to Use & Explore

This package is designed to be explored in two complementary ways:

### 1. Via `npx` (Live Terminal Inspector)
Run `json-driven-npm` directly from your command line to inspect the in-memory structure and execute endpoints live:

```bash
# Run the live showcase of all 11 exposed endpoints
npx json-driven-npm

# List all public route paths from api.json
npx json-driven-npm --routes

# Execute a single endpoint path
npx json-driven-npm --run app.ecosystem.tools.blueprint.fetch
npx json-driven-npm --run app.ecosystem.workflow.steps.fetch
npx json-driven-npm --run app.founder.profile.fetch
```

See [bin/README.md](bin/README.md) for complete CLI details.

---

### 2. Via `npm` (Programmatic Import)
Import `json-driven-npm` in Node.js to use the natural, nested, dot-notation client tree:

```javascript
import app from "json-driven-npm";

// 1. Fetch Ecosystem Blueprint specifications
const blueprint = await app.ecosystem.tools.blueprint.fetch();
console.log(blueprint.role); // "Architectural Source of Truth & Reference Specification"

// 2. Fetch the 3-Step Development Workflow
const workflow = await app.ecosystem.workflow.steps.fetch();
console.log(workflow.steps);
// [
//   { step: 1, name: "Scaffold", command: "npm create json-driven-npm ./my-api-client" },
//   { step: 2, name: "Customize", command: "Edit api.json & source.json" },
//   { step: 3, name: "Generate Types", command: "npx create-intellisense" }
// ]

// 3. Fetch founder & software architect profile
const profile = await app.founder.profile.fetch();
console.log(profile);
// {
//   name: "Keshav Nalam",
//   role: "Software Architect & Developer",
//   company: "KeshavSoft",
//   location: "India",
//   bio: "Creator of zero-dependency, declarative, JSON-driven NPM architectures."
// }

// 4. Fetch company details & portfolio packages
const company = await app.company.info.fetch();
console.log(company.philosophy);
// "Zero-dependency architectures, declarative pipelines, and zero folder sprawl"
```

---

## The Three-Tier Ecosystem

The JSON-driven methodology is organized into three decoupled tools:

```text
┌─────────────────────────────────┐       ┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│         json-driven-npm         │       │     create-json-driven-npm      │       │       create-intellisense       │
│    (Architectural Reference)    │       │     (Scaffolder / Transporter)  │       │       (Companion Generator)     │
├─────────────────────────────────┤       ├─────────────────────────────────┤       ├─────────────────────────────────┤
│ • Sole source of truth for v4   │       │ • Zero hardcoded templates      │       │ • Zero external dependencies    │
│ • In-memory route engine        │ ────► │ • Pulls from node_modules       │ ────► │ • Reads your api.json & source  │
│ • Single dispatch pipeline      │       │ • Runs via:                     │       │ • Emits your custom index.d.ts  │
│ • Live inspector via npx        │       │   npm create json-driven-npm    │       │ • Instant IDE autocomplete      │
└─────────────────────────────────┘       └─────────────────────────────────┘       └─────────────────────────────────┘
```

1. **Scaffold Your Package**:
   ```bash
   npm create json-driven-npm ./my-api-client
   ```
2. **Customize Your Endpoints**:
   - Define allowed paths in `api.json`.
   - Add domain specifications & data in `source.json`.
   - Implement your custom query/transport logic in `engine/execution/`.
3. **Generate TypeScript Declarations**:
   - Install [`create-intellisense`](https://www.npmjs.com/package/create-intellisense) as a devDependency in your package:
     ```bash
     npm install -D create-intellisense
     ```
   - Run `npx create-intellisense` to generate your `src/index.d.ts` directly from your JSON contracts.

---

## Adding a New Endpoint in Your Package (Zero New JS Files)

To expose a new endpoint like `app.ecosystem.stats.fetch`:

1. **Add specification to `source.json`:**
   ```json
   "ecosystem": {
       "stats": {
           "fetch": {
               "action": "fetch",
               "resource": "stats",
               "description": "Fetches download and star metrics across packages."
           }
       }
   }
   ```

2. **Expose the path in `api.json`:**
   ```json
   "app.ecosystem.stats.fetch"
   ```

3. **Generate TypeScript declarations:**
   ```bash
   npx create-intellisense
   ```

Done. The route is immediately callable with full VS Code autocomplete, parameter hints, and type checking—with **zero new `.js` files** or folder sprawl.

---

## Core Engineering Principles

Every module in this repository adheres to KeshavSoft standards:

1. **Strictly One Default Export:**
   Every file exports exactly one item using `export default startFunc;`. Named exports are prohibited.
2. **Standardized Parameter Unwrapping:**
   All functions accept a single object with `in`-prefixed keys, which are immediately unwrapped into `local`-prefixed variables:
   ```javascript
   const startFunc = ({ inRoutePath, inParam, inSource }) => {
       const localRoutePath = inRoutePath;
       const localParam = inParam;
       const localSource = inSource;
       // ...
   };
   export default startFunc;
   ```
3. **Pure Domain Decoupling:**
   `source.json` is the sole source of truth for domain metadata, kept strictly decoupled from transport and execution logic.

---

## Repository Guide Map

Explore the modular documentation across the project:

- **[src/README.md](src/README.md)**: Version evolution, immutability, and `v4` modern standard overview.
- **[bin/README.md](bin/README.md)**: Guide to the zero-setup CLI terminal inspector (`npx json-driven-npm`).
- **[docs/README.md](docs/README.md)**: Markdown index of all architectural guides.
- **[Documentation Hub](docs/index.html)**: Interactive HTML portal for all 5 guides:
  - [1. Philosophy: JSON vs Folder Sprawl](docs/philosophy.md) ([HTML](docs/philosophy.html))
  - [2. System Boundaries & Architecture](docs/architecture.md) ([HTML](docs/architecture.html))
  - [3. Route Assembly Engine](docs/route-engine.md) ([HTML](docs/route-engine.html))
  - [4. Story-Driven Execution Pipeline](docs/execution-pipeline.md) ([HTML](docs/execution-pipeline.html))
  - [5. Declarative Type Generation](docs/dts-generation.md) ([HTML](docs/dts-generation.html))

---

## License

MIT &copy; [KeshavSoft](https://keshavsoft.com/)
