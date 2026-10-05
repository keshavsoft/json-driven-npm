# JSON-Driven NPM Architecture

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D20.10-brightgreen.svg)](package.json)

An architectural blueprint and reference implementation for building scalable, type-safe API clients in JavaScript and TypeScript without physical directory sprawl.

**[Documentation Hub](docs/index.html)**

---

## The Core Concept

In conventional client libraries, adding 50 endpoints requires creating 50 directories and 50 repetitive boilerplate files.

In a **JSON-Driven Architecture**, endpoints are structured data:
- **`source.json`**: Pure domain specification declaring resources and queries.
- **`api.json`**: An explicit allowlist array controlling what is exposed publicly.
- **`route/`**: A lightweight engine that mounts the nested, callable JavaScript object tree in memory once at startup.
- **`execution/`**: A story-driven pipeline that coordinates validation, lookup, and dispatch.
- **`generate-dts.js`**: Generates full TypeScript type definitions (`src/index.d.ts`) with IDE autocomplete from JSON.

---

## Scaffolding CLI

Use `json-driven-npm` via CLI to instantly scaffold the architecture into any project or new version directory:

```bash
# Scaffold into a specific version directory
npx json-driven-npm ./src/v13

# Scaffold into a new client project
npx json-driven-npm ./my-api-client
```

### What Gets Scaffolded (2 Folders & 2 Files)
- 📁 `external-api/` (`api.json`, `api.js` - public routing contract)
- 📁 `internal-working/` (`route/`, `execution/` - mounting & dispatch engines)
- 📄 `source.json` - domain endpoint metadata
- 📄 `index.js` - public entry point

> **Single Point of Customization**: `internal-working/execution/index.js` is the **only** place you write your custom fetch/query logic. All route mounting and tree binding is handled automatically!

---

## Quick Start

### 1. Install & Import
```javascript
import app from "json-driven-npm";

// Natural, nested tree call
const profile = await app.users.profile.fetch("alice-42");
console.log(profile);
```

### 2. Run Tests & Type Generation
```bash
# Run unit tests
npm test

# Generate TypeScript declarations
npm run generate:dts
```

---

## Adding a New Endpoint (Zero JS Files Needed)

To add a new endpoint `app.reports.audit.fetch`:

1. **Add specification to `source.json`:**
   ```json
   "audit": {
       "fetch": {
           "action": "fetch",
           "resource": "audit_logs",
           "description": "Fetches audit trail by date."
       }
   }
   ```

2. **Allow the path in `external-api/api.json`:**
   ```json
   "app.reports.audit.fetch"
   ```

3. **Regenerate types:**
   ```bash
   npm run generate:dts
   ```

That is all. The route is immediately callable with full VS Code autocomplete, with zero new `.js` files or folder sprawl.

---

## Documentation Guides

Explore the detailed architecture guides:

- **[1. Philosophy: JSON vs Folder Sprawl](docs/philosophy.md)** ([HTML](docs/philosophy.html)): Why conventional directory structures break down and how JSON-driven routing solves it.
- **[2. System Boundaries & Architecture](docs/architecture.md)** ([HTML](docs/architecture.html)): Public perimeter (`external-api/`), domain specification (`source.json`), and internal engines.
- **[3. Route Assembly Engine](docs/route-engine.md)** ([HTML](docs/route-engine.html)): How allowlisted dot-paths are mounted into a nested, callable object tree.
- **[4. Story-Driven Execution Pipeline](docs/execution-pipeline.md)** ([HTML](docs/execution-pipeline.html)): Decomposing queries into single-responsibility narrative steps.
- **[5. Dynamic TypeScript Typing](docs/dts-generation.md)** ([HTML](docs/dts-generation.html)): Generating comprehensive TypeScript `.d.ts` declarations from JSON specifications.
