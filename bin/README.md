# CLI Terminal Runner (`bin/`)

[**&larr; Back to Root README**](../README.md) · [**Documentation Hub &rarr;**](../docs/index.html)

This directory contains the executable CLI runner (`bin/json-driven-npm.js`) exposed as the `json-driven-npm` binary.

---

## Philosophy: Zero Code Transport

Unlike template generators or scaffolding CLIs that copy files into external directories, **`json-driven-npm` does not transport or copy code**.

Instead, it acts as the **architectural source of truth & living terminal inspector**:
- It mounts the in-memory tree from the active version (`src/v4`).
- It executes the exposed endpoints live.
- It displays the structure, contracts, and data directly in your console so you can immediately see and learn how the JSON-driven architecture behaves in practice.
- To transport this architecture into your own project, use the companion scaffolder: [`create-json-driven-npm`](https://www.npmjs.com/package/create-json-driven-npm) via `npm create json-driven-npm`.

---

## Running with `npx`

You do not need to install anything globally. Run directly via `npx`:

```bash
# 1. Full live demonstration of all 11 exposed endpoints
npx json-driven-npm

# 2. List all routes exposed in api.json
npx json-driven-npm --routes

# 3. Execute a specific endpoint path
npx json-driven-npm --run app.ecosystem.tools.blueprint.fetch
npx json-driven-npm --run app.ecosystem.workflow.steps.fetch
npx json-driven-npm --run app.founder.profile.fetch

# 4. View CLI help and options
npx json-driven-npm --help
```

---

## Example Terminal Output

Running `npx json-driven-npm` prints:

```text
=============================================================
  🌟 JSON-Driven NPM (v1.3.1)
  Architectural Source of Truth & Reference Implementation
=============================================================

📦 Active Version   : src/v4
🧭 Public Contract  : src/v4/api.json (11 routes)
📄 Domain Spec      : src/v4/source.json
⚡ Execution Mode   : In-Memory Dot-Notation Tree

--- Live Endpoint Executions ---

✅ app.ecosystem.architecture.philosophy.fetch()
{
  concept: 'Endpoints as Data',
  problem: 'In conventional client libraries, adding 50 endpoints requires creating 50 directories and 50 repetitive boilerplate files...',
  solution: 'Define endpoints declaratively in JSON contracts and assemble the callable object tree in memory at startup.',
  benefits: [ ... ]
}

✅ app.ecosystem.tools.blueprint.fetch()
{
  package: 'json-driven-npm',
  role: 'Architectural Source of Truth & Reference Specification',
  rule: 'Never transports code itself; acts as the authoritative template source.'
}

✅ app.ecosystem.tools.scaffolder.fetch()
{
  package: 'create-json-driven-npm',
  role: 'The Scaffolder & Code Transporter',
  usage: 'npm create json-driven-npm [target-directory]',
  mechanism: 'Dynamically inspects node_modules/json-driven-npm/src and transports the clean skeleton.'
}

✅ app.ecosystem.tools.intellisense.fetch()
{
  package: 'create-intellisense',
  role: 'Zero-Dependency TypeScript Type & JSDoc Generator',
  usage: 'npx create-intellisense',
  mechanism: 'Scans api.json and source.json and emits index.d.ts with full IDE autocomplete.'
}

... (11 narrative endpoints executed live in memory) ...

=============================================================
💡 How to use this architecture in your own packages:
   1. Declare your endpoints in source.json and allowed paths in api.json.
   2. In-memory route engine mounts your dot-path tree without folder sprawl.
   3. Run 'create-intellisense' to generate your TypeScript index.d.ts.
=============================================================
```

---

## Connecting to `create-intellisense` & `create-json-driven-npm`

Once you understand the architecture demonstrated here:
1. **Scaffold**: Run `npm create json-driven-npm ./my-project` to copy this clean pattern into your repo.
2. **Customize**: Edit your `api.json`, `source.json`, and business logic in `engine/execution/`.
3. **Generate Types**: Run [`create-intellisense`](https://www.npmjs.com/package/create-intellisense) (`npx create-intellisense`) in your repo to automatically generate `src/index.d.ts` for your own custom endpoints!
