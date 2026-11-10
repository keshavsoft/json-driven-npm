# System Boundaries & Architecture

[**View this document as HTML**](./architecture.html) · [**Documentation Hub**](./index.html)

This document details the architectural boundaries that govern a JSON-driven NPM package.

---

## Architectural Diagram

```text
┌──────────────────────────────────────────────────────────────────┐
│                     1. The Public Interface                      │
│                                                                  │
│   api.json ─────────────────────► index.js                       │
│   (Public Route Allowlist)        (Composition Root & Facade)    │
└─────────────────────────────────┬────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│                   2. In-Memory Machinery (engine/)               │
│                                                                  │
│   engine/route/                   engine/execution/              │
│   (In-Memory Tree Assembly)       (Single-Step Dispatch Pipeline)│
└─────────────────────────────────┬────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────┐
│                  3. Pure Domain Specification                    │
│                                                                  │
│   source.json                                                    │
│   (Resource Contracts, JSDocs, Schemas, & Data)                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## The Three Clean Layers

### 1. The Public Interface (`api.json` & `index.js`)
The public interface enforces strict information hiding and serves as the entry point:
- **`api.json`**: An explicit array of dot-separated paths. Only paths listed here are mounted and exposed on the returned client. Internal helper endpoints or draft specs in `source.json` remain private.
- **`index.js`**: The composition root. It imports `api.json` and `source.json` with JSON import attributes, wires them to the route assembly engine, and exports the client instance.

```javascript
import source from "./source.json" with { type: "json" };
import apiPaths from "./api.json" with { type: "json" };

import createRoute from "./engine/route/index.js";
import execute from "./engine/execution/index.js";

const app = createRoute({
    inApiPaths: apiPaths,
    inSource: source,
    inExecutor: execute
});

export default app;
```

### 2. The Internal Engines (`engine/`)
*(Note: Named `internal-working/` in historical `v3`, cleanly unified to `engine/` in `v4`)*:
- **`route/`**: Traverses `api.json` and dynamically constructs nested objects with callable functions at the leaf nodes in memory during module evaluation.
- **`execution/`**: The runtime executor. When an endpoint is called, it receives `{ inRoutePath, inParam, inSource }` and runs the query through a narrative, single-responsibility pipeline.

### 3. Pure Domain Specification (`source.json`)
`source.json` contains strictly domain definitions (e.g. resource names, actions, JSDoc descriptions, schemas, and data payloads).
It is completely decoupled from transport and execution logic. It contains **no** connection parameters, **no** URLs, and **no** request headers.

---

## Core Coding Principles

1. **Strictly One Default Export:**
   Every module exports exactly one item using `export default startFunc;`. Named exports and dual exports (`export { foo }; export default foo;`) are strictly forbidden.

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

3. **Domain-Only Single Source of Truth:**
   `source.json` is the single source of truth for *domain queries*, never for transport configurations or runtime options.

4. **Zero Directory Sprawl:**
   New endpoints are added by modifying JSON specifications, never by multiplying folders and boilerplate files.
