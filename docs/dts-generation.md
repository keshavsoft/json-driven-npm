# Dynamic TypeScript Generation from JSON

[**View this document as HTML**](./dts-generation.html) · [**Documentation Hub**](./index.html)

A major concern with dynamic, JSON-driven clients is TypeScript support: *If endpoints are dynamically mounted at runtime, how do developers get full autocomplete and static type safety?*

This document explains how Tally Simple and the JSON-driven architecture generate comprehensive TypeScript declarations (`src/index.d.ts`) directly from `api.json` and `source.json`.

---

## The Generation Pipeline

```text
source.json (Domain Spec)  +  api.json (Allowed Paths)
                    │
                    ▼
       scripts/dts/load-version-definition.js
       (Validates paths & constructs an AST tree)
                    │
                    ▼
       scripts/dts/render-declaration.js
       (Recursively renders TypeScript interfaces & JSDocs)
                    │
                    ▼
             src/index.d.ts
    (Full IDE autocomplete & compile-time checking)
```

---

## How It Works

### 1. Version Detection (`find-active-version.js`)
Inspects `src/index.js` to find which version is active (e.g. `src/v1/index.js`) and ensures declarations match the exact active runtime code.

### 2. Contract Validation (`load-version-definition.js`)
Before generating any types, the generator validates that:
- Every path in `api.json` is a non-empty string.
- Every path in `api.json` actually exists in `source.json`.
- A valid root namespace exists.

If there is any mismatch between the public allowlist and the domain specification, the build fails immediately with a descriptive error.

### 3. Declaration Rendering (`render-declaration.js`)
The renderer walks the validated tree and generates a nested TypeScript type definition with JSDoc comments pulled directly from `source.json`:

```typescript
export type APPApi = {
    users: {
        profile: {
            /** Fetches user profile details by ID. */
            fetch: (param: string) => Promise<any>;
        };
        settings: {
            /** Fetches user configuration settings by ID. */
            fetch: (param: string) => Promise<any>;
        };
    };
    reports: {
        summary: {
            /** Fetches aggregate business summary by date. */
            fetch: (param: string) => Promise<any>;
        };
        metrics: {
            /** Fetches performance metrics by date. */
            fetch: (param: string) => Promise<any>;
        };
    };
};

declare const app: APPApi;

export default app;
```

---

## Developer Experience

When an application developer imports the client:

```typescript
import app from "json-driven-npm";

app.users.profile.fetch("user-101");
```

- VS Code provides instant autocomplete for every namespace (`users`, `reports`).
- Hovering over `profile.fetch` displays the JSDoc description from `source.json`.
- Calling an unsupported path produces an immediate TypeScript compiler error.

---

## How to Run

Generate types at any time:

```bash
npm run generate:dts
```

It is also wired to `npm test` and `npm run verify` to prevent releasing out-of-sync declarations.
