# Source Directory (`src/`) Architecture & Evolution

[**&larr; Back to Root README**](../README.md) · [**v3 Architecture Details &rarr;**](./v3/README.md)

This directory houses the codebase and evolution of the JSON-Driven NPM pattern across major architectural versions.

---

## Architectural Versioning

In a JSON-driven client, API evolution does not require breaking changes or sprawling branches. Each version is an autonomous, self-contained reference snapshot:

```text
src/
├── v1/               # Initial implementation (nested route and external-api layout)
├── v2/               # Clean parameter unwrapping and expanded mock domain
├── v3/               # Modern flattened architecture (ACTIVE)
├── index.js          # Composition root / active version switcher
└── index.d.ts        # Generated TypeScript declaration for the active version
```

---

## Active Version Switching (`src/index.js`)

`src/index.js` acts as the single switcher for the entire package:

```javascript
import app from "./v3/index.js";

export default app;
```

Switching the active release version takes one line. Consumers importing `json-driven-npm` always receive the active standard, while previous versions remain 100% intact and reproducible.

---

## Version Overview

| Version | Status | Structure | Domain Focus |
| :--- | :--- | :--- | :--- |
| **`v1`** | Historical | `external-api/`, `internal-working/`, `source.json` | Mock user & report queries |
| **`v2`** | Historical | Refined parameters, story-driven execution | Mock user profiles & settings |
| **`v3`** | **Active Standard** | **Flattened layout**: `api.json`, `source.json`, `index.js`, `internal-working/` | Real KeshavSoft Profile & Ecosystem API |

---

## Key Takeaways

1. **Previous Versions are Immutable**: `v1` and `v2` are preserved for historical reference and backward-compatibility verification.
2. **`v3` Establishes the Flattened Standard**: Eliminates redundant intermediate folders (`external-api/`), placing `api.json` and `source.json` side-by-side at the version root.
3. **Automated Types**: Running `npx create-intellisense` (or `npm run verify`) reads `src/index.js`, resolves the active version (`v3`), and emits `src/index.d.ts`.

For full implementation details of `v3`, see [**src/v3/README.md**](./v3/README.md).
