# Version 3 (`src/v3/`) — Modern Flattened Architecture

[**&larr; Back to src/ README**](../README.md) · [**Root README &rarr;**](../../README.md) · [**Architecture Guide &rarr;**](../../docs/architecture.md)

`src/v3/` represents the modern, clean standard of the JSON-Driven NPM architecture. It introduces a flattened directory layout, pure JSON contracts, and live KeshavSoft profile and ecosystem endpoints.

---

## Directory Structure

```text
src/v3/
├── api.json              # Public allowlist array of callable paths
├── source.json           # Pure domain specification with metadata & payloads
├── index.js              # Composition root exporting the mounted client instance
└── internal-working/
    ├── route/            # In-memory route tree assembly engine
    │   ├── index.js              # Coordinator: iterates api.json paths & returns root
    │   ├── attachPath.js         # Traverses path segments and mounts leaf handler
    │   └── createLeafHandler.js  # Factory creating terminal callable functions
    └── execution/        # Story-driven query execution pipeline
        ├── index.js              # 4-line coordinator executing narrative steps
        ├── validateInput.js      # Input argument sanitizer & normalizer
        ├── getEndpointSpec.js    # O(1) path reduction against source.json
        └── dispatchMock.js       # Dispatches query or returns declared payload
```

---

## The Flattened Layout Advantages

Compared to earlier versions with nested `external-api/` directories:
1. **Zero Folder Clutter**: `api.json` and `source.json` sit immediately visible at the version root.
2. **Instant Introspection**: Any developer opening `src/v3` immediately sees what is exposed (`api.json`) and what data exists (`source.json`).
3. **Clean Composition Root**: `index.js` imports both JSON files directly with `with { type: "json" }` attributes and passes them to `createRoute`.

---

## Domain Contracts in `v3`

`v3` models the real KeshavSoft Profile and Ecosystem API:

```text
app
├── founder
│   ├── profile.fetch()   # Keshav Nalam bio, role, location
│   └── links.fetch()     # Official website, GitHub, NPM, LinkedIn
├── company
│   └── info.fetch()      # KeshavSoft tagline and engineering philosophy
└── ecosystem
    └── packages.fetch()  # Array of flagship KeshavSoft packages
```

### 1. `api.json`
```json
[
  "app.founder.profile.fetch",
  "app.founder.links.fetch",
  "app.company.info.fetch",
  "app.ecosystem.packages.fetch"
]
```

### 2. `source.json` (Excerpts)
```json
{
  "app": {
    "founder": {
      "profile": {
        "fetch": {
          "action": "fetch",
          "resource": "profile",
          "description": "Fetches founder and software architect profile.",
          "data": {
            "name": "Keshav Nalam",
            "role": "Software Architect & Developer",
            "company": "KeshavSoft"
          }
        }
      }
    }
  }
}
```

---

## KeshavSoft Engineering Principles

1. **Strictly One Default Export**:
   Every JS file ends with:
   ```javascript
   export default startFunc;
   ```
2. **Standardized Parameter Unwrapping**:
   All functions take a single object with `in`-prefixed keys, unwrapped to `local`-prefixed variables:
   ```javascript
   const startFunc = ({ inTree, inPath, inSource, inExecutor }) => {
       const localTree = inTree;
       const localPath = inPath;
       const localSource = inSource;
       const localExecutor = inExecutor;
       // ...
   };
   export default startFunc;
   ```
3. **Pure Separation of Concerns**:
   - `route/` only mounts objects; it knows nothing about how queries are executed.
   - `execution/` only handles query pipeline; it knows nothing about route mounting.
   - `source.json` only holds domain data; it contains zero transport code.
