# JSON-Driven NPM — Architecture Documentation

[**&larr; Back to Root README**](../README.md) · [**Open HTML Documentation Hub**](./index.html)

This directory contains the in-depth architectural guides for the JSON-Driven NPM pattern. Each guide is available in both Markdown (`.md`) for reading on GitHub and standalone dark-themed HTML (`.html`) for browser viewing.

---

## Architectural Guides

| # | Guide | Markdown | HTML | Summary |
| :-: | :--- | :--- | :--- | :--- |
| **1** | **Philosophy: JSON vs Folder Sprawl** | [philosophy.md](./philosophy.md) | [philosophy.html](./philosophy.html) | Why conventional nested folders become unmaintainable and how treating endpoints as structured data eliminates directory sprawl. |
| **2** | **System Boundaries & Layers** | [architecture.md](./architecture.md) | [architecture.html](./architecture.html) | The 3 clean layers: Public Interface (`api.json`, `index.js`), Internal Engines (`route/`, `execution/`), and Domain Spec (`source.json`). |
| **3** | **Route Assembly Engine** | [route-engine.md](./route-engine.md) | [route-engine.html](./route-engine.html) | How dot-separated paths are dynamically mounted into an in-memory callable object tree at startup. |
| **4** | **Story-Driven Execution Pipeline** | [execution-pipeline.md](./execution-pipeline.md) | [execution-pipeline.html](./execution-pipeline.html) | Decomposing query execution into small, single-responsibility narrative steps (validate &rarr; spec lookup &rarr; dispatch). |
| **5** | **Declarative TypeScript Typing** | [dts-generation.md](./dts-generation.md) | [dts-generation.html](./dts-generation.html) | How TypeScript declarations (`index.d.ts`) are generated directly from JSON contracts, and how `create-intellisense` completes the workflow for custom packages. |

---

## Live Interactive Documentation Hub

To view the interactive, styled documentation hub locally or on GitHub Pages:
- Open [`docs/index.html`](./index.html) in any modern web browser.
- Configured with `docs/.nojekyll` for seamless GitHub Pages hosting.
