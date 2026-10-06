# Source Directory (`src/`) Architecture & Evolution

[**&larr; Back to Root README**](../README.md) · [**Documentation Hub &rarr;**](../docs/index.html)

This directory houses the codebase and evolution of the JSON-Driven NPM pattern across major architectural versions.

---

## Architectural Versioning

In a JSON-driven client, API evolution does not require breaking changes or sprawling branches. Each version is an autonomous, self-contained reference snapshot:

```text
src/
├── v1/               # Initial implementation (nested route and external-api layout)
├── v2/               # Clean parameter unwrapping and expanded mock domain
├── v3/               # Modern flattened architecture with internal-working/
├── v4/               # Clean Engine Architecture (ACTIVE)
├── index.js          # Composition root / active version switcher
└── index.d.ts        # Generated TypeScript declaration for the active version
```

---

## Active Version Switching (`src/index.js`)

`src/index.js` acts as the single switcher for the entire package:

```javascript
import app from "./v4/index.js";

export default app;
```

Switching the active release version takes one line. Consumers importing `json-driven-npm` always receive the active standard, while previous versions remain 100% intact and reproducible.

---

## Version Overview

| Version | Status | Structure | Domain Focus |
| :--- | :--- | :--- | :--- |
| **`v1`** | Historical | `external-api/`, `internal-working/`, `source.json` | Mock user & report queries |
| **`v2`** | Historical | Refined parameters, story-driven execution | Mock user profiles & settings |
| **`v3`** | Historical | Flattened layout: `api.json`, `source.json`, `index.js`, `internal-working/` | Real KeshavSoft Profile & Ecosystem API |
| **`v4`** | **Active Standard** | **Clean Engine layout**: `api.json`, `source.json`, `index.js`, **`engine/`** (`route/`, `execution/`) | **Complete Three-Tier Ecosystem Story & Knowledge Graph** |

---

## What Makes `v4` the Modern Standard?

1. **Renamed `engine/`**: The vague `internal-working/` folder is cleanly renamed to `engine/` (`engine/route/` and `engine/execution/`), clearly differentiating machinery from domain data.
2. **Code & JSON Purity**: `src/v4/` deliberately contains **zero internal READMEs**. Documentation belongs at the repository root and `docs/`, keeping source directories lightweight and uncluttered.
3. **Rich Ecosystem Story**: `source.json` embeds the full story of the Three-Tier Ecosystem (`json-driven-npm`, `create-json-driven-npm`, `create-intellisense`), the 3-step workflow, and KeshavSoft coding standards across 11 callable endpoints.
4. **Previous Versions are Immutable**: `v1`, `v2`, and `v3` are preserved 100% untouched for historical reference and backward-compatibility verification.
5. **Automated Types**: Running `npx create-intellisense` (or `npm run verify`) reads `src/index.js`, resolves the active version (`v4`), and emits `src/index.d.ts`.

