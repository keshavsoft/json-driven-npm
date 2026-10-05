# System Boundaries & Architecture

[**View this document as HTML**](./architecture.html) · [**Documentation Hub**](./index.html)

This document details the architectural boundaries that govern a JSON-driven NPM package.

---

## Architectural Diagram

```text
┌─────────────────────────────────────────────────────────────┐
│                    1. The Public Perimeter                  │
│                                                             │
│   external-api/api.json ───► external-api/api.js            │
│   (Allowed Route Paths)      (Public Facade Export)         │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                 2. Internal Working Engines                 │
│                                                             │
│   internal-working/route/     internal-working/execution/   │
│   (Object Tree Assembly)      (Narrative Step Pipeline)     │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                3. Pure Domain Specification                 │
│                                                             │
│   source.json                                               │
│   (Resource Contracts, Actions, Metadata)                   │
└─────────────────────────────────────────────────────────────┘
```

---

## The Three Layers

### 1. The Public Perimeter (`external-api/`)
The public perimeter enforces strict information hiding:
- **`api.json`**: An explicit array of dot-separated paths. Only paths listed here are exposed on the returned client. Internal helper endpoints or draft specs in `source.json` remain private.
- **`api.js`**: Connects `api.json` and `source.json` through the route engine and exports the client instance.

### 2. The Internal Engines (`internal-working/`)
- **`route/`**: Traverses `api.json` and dynamically constructs nested objects with callable functions at the leaf nodes.
- **`execution/`**: The runtime executor. When an endpoint is called, it receives `{ inRoutePath, inParam, inSource }` and runs the query through a modular pipeline.

### 3. Pure Domain Specification (`source.json`)
`source.json` contains strictly business definitions (e.g. resource names, actions, descriptions).
It is completely decoupled from transport and execution logic. It contains **no** connection parameters, **no** URLs, and **no** request headers.

---

## Core Coding Principles

1. **Strictly One Default Export:**
   Every module exports exactly one item using `export default startFunc;`. Named exports and dual exports (`export { foo }; export default foo;`) are strictly forbidden.

2. **Standardized Parameter Unwrapping:**
   All functions accept a single object with `in`-prefixed keys, which are immediately unwrapped into `local`-prefixed variables:
   ```javascript
   const startFunc = ({ inRoutePath, inParam }) => {
       const localRoutePath = inRoutePath;
       const localParam = inParam;
       ...
   };
   ```

3. **Domain-Only Single Source of Truth:**
   `source.json` is the single source of truth for *domain queries*, not for transport configurations or runtime options.
