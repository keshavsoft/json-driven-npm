# CLI Terminal Runner (`bin/`)

[**&larr; Back to Root README**](../README.md) · [**Documentation Hub &rarr;**](../docs/index.html)

This directory contains the executable CLI runner (`bin/json-driven-npm.js`) exposed as the `json-driven-npm` binary.

---

## Philosophy: Zero Code Transport

Unlike template generators or scaffolding CLIs that copy files into external directories, **`json-driven-npm` does not transport or copy code**.

Instead, it acts as a **living terminal inspector**:
- It mounts the in-memory tree from the active version (`src/v3`).
- It executes the exposed endpoints live.
- It displays the structure, contracts, and data directly in your console so you can immediately see and learn how the JSON-driven architecture behaves in practice.

---

## Running with `npx`

You do not need to install anything globally. Run directly via `npx`:

```bash
# 1. Full live demonstration of all exposed endpoints
npx json-driven-npm

# 2. List all routes exposed in api.json
npx json-driven-npm --routes

# 3. Execute a specific endpoint path
npx json-driven-npm --run app.founder.profile.fetch
npx json-driven-npm --run app.ecosystem.packages.fetch

# 4. View CLI help and options
npx json-driven-npm --help
```

---

## Example Terminal Output

Running `npx json-driven-npm` prints:

```text
=============================================================
  🌟 JSON-Driven NPM (v1.2.1)
  Architectural Source of Truth & Reference Implementation
=============================================================

📦 Active Version   : src/v3
🧭 Public Contract  : src/v3/api.json (4 routes)
📄 Domain Spec      : src/v3/source.json
⚡ Execution Mode   : In-Memory Dot-Notation Tree

--- Live Endpoint Executions ---

✅ app.founder.profile.fetch()
{
  name: 'Keshav Nalam',
  role: 'Software Architect & Developer',
  company: 'KeshavSoft',
  location: 'India',
  bio: 'Creator of zero-dependency, declarative, JSON-driven NPM architectures.'
}

✅ app.founder.links.fetch()
{
  website: 'https://keshavsoft.com/',
  github: 'https://github.com/keshavsoft',
  npm: 'https://www.npmjs.com/~keshavsoft',
  linkedin: 'https://www.linkedin.com/in/keshav-nalam'
}

✅ app.company.info.fetch()
{
  name: 'KeshavSoft',
  tagline: 'Pure, declarative, and config-driven software engineering',
  website: 'https://keshavsoft.com/',
  philosophy: 'Zero-dependency architectures, declarative pipelines, and zero folder sprawl'
}

✅ app.ecosystem.packages.fetch()
[
  { name: 'tally-simple', description: 'Raw TDL transport client & CLI for Tally ERP/Prime' },
  { name: 'tally-simple-json', description: 'Fast XML-to-JSON parsing client for Tally' },
  { name: 'create-intellisense', description: 'Zero-dependency TypeScript declaration generator for JSON-driven architectures' },
  { name: 'json-renderers', description: 'Browser DOM mounting runtime for declarative UI specifications' },
  { name: 'json-renderers-build', description: 'Headless UI component specification compiler' },
  { name: 'json-driven-npm', description: 'Architectural reference implementation and CLI runner for declarative, JSON-driven NPM packages' }
]

=============================================================
💡 How to use this architecture in your own packages:
   1. Declare your endpoints in source.json and allowed paths in api.json.
   2. In-memory route engine mounts your dot-path tree without folder sprawl.
   3. Run 'create-intellisense' to generate your TypeScript index.d.ts.
=============================================================
```

---

## Connecting to `create-intellisense`

Once you understand the architecture demonstrated here:
1. You create your own NPM package with your own `source.json` (or `structure.json`) and `api.json`.
2. You run [`create-intellisense`](https://www.npmjs.com/package/create-intellisense) in your repo to automatically generate `index.d.ts` for your own custom structure!
