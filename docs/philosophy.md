# Philosophy: JSON-Driven Architecture vs Folder Sprawl

[**View this document as HTML**](./philosophy.html) · [**Documentation Hub**](./index.html)

This document explains the rationale behind the JSON-driven architecture and why it eliminates the cognitive and maintenance overhead of conventional directory sprawl.

---

## The Conventional Problem: Directory Sprawl

In traditional JavaScript/Node.js client libraries, API endpoints are mirrored through physical files and folders:

```text
src/
└── users/
    ├── profile/
    │   └── fetch.js
    └── settings/
        └── fetch.js
└── reports/
    ├── summary/
    │   └── fetch.js
    └── metrics/
        └── fetch.js
```

### The Cost of Folder Sprawl:
1. **Boilerplate Explosion:** Every file contains almost identical code—importing HTTP clients, wrapping arguments, handling headers, and validating strings.
2. **Maintenance Drag:** Adding 30 new endpoints requires creating 30 new folders, 30 files, and managing hundreds of relative import paths.
3. **Refactoring Pain:** Renaming a route or restructuring namespaces breaks import paths across the repository.
4. **Cognitive Overload:** Developers opening the repository must navigate dozens of folders just to inspect simple parameter mappings.

---

## The Breakthrough: Endpoints as Data

In a client SDK, **endpoints are data, not distinct programs.**

Every endpoint follows the exact same mechanical pattern:
1. It has a hierarchical path (e.g. `app.founder.profile.fetch`).
2. It accepts runtime input parameters.
3. It maps to an underlying resource or query template.
4. It dispatches a request and returns a response.

By treating endpoints as structured data:
- We declare what exists in **`source.json`**.
- We declare what is exposed in **`api.json`**.
- A generic **Route Engine** mounts the callable tree in memory once at startup.
- A single **Execution Pipeline** handles all queries uniformly.

---

## Comparison: Adding a New Endpoint

### Conventional Folder Approach:
1. Create directory `src/ecosystem/stats/`
2. Create file `src/ecosystem/stats/fetch.js`
3. Write 30 lines of boilerplate (imports, argument checks, dispatch)
4. Export the function
5. Re-export in `src/ecosystem/index.js`
6. Re-export in `src/index.js`
7. Manually write or update TypeScript declarations in `index.d.ts`

### JSON-Driven Architecture:
1. Add the definition to `source.json`:
   ```json
   "ecosystem": {
       "stats": {
           "fetch": { "action": "fetch", "resource": "stats", "description": "Fetches download metrics." }
       }
   }
   ```
2. Add the path to `api.json`:
   ```json
   "app.ecosystem.stats.fetch"
   ```
3. Run `npx create-intellisense`.

Done. Zero new JavaScript files. Zero boilerplate. Zero risk of broken import paths.
