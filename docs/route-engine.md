# Route Assembly Engine

[**View this document as HTML**](./route-engine.html) · [**Documentation Hub**](./index.html)

The route engine transforms a flat allowlist of string paths (from `api.json`) into an intuitive, nested, callable JavaScript object tree at initialization time.

---

## Why Route Assembly?

Consumers want natural, object-oriented dot syntax:

```javascript
await app.founder.profile.fetch();
```

They do not want manual string-based dispatchers:

```javascript
// Not this:
await app.execute("app.founder.profile.fetch");
```

The route engine builds this tree dynamically in memory without generating physical directories or writing redundant boilerplate files.

---

## The Three Narrative Modules

Inside `internal-working/route/`, responsibility is divided into three small, focused modules:

```text
internal-working/route/
├── index.js              <-- Coordinator: iterates paths & returns root namespace
├── attachPath.js         <-- Traverses branches & mounts the leaf
└── createLeafHandler.js  <-- Factory creating the callable endpoint
```

---

### 1. Leaf Endpoint Factory (`createLeafHandler.js`)

A leaf is the terminal callable function at the end of a route. When invoked by the consumer, it captures the route path and forwards the call to the executor:

```javascript
const startFunc = ({ inPath, inSource, inExecutor }) => {
    const localPath = inPath;
    const localSource = inSource;
    const localExecutor = inExecutor;

    return async (inParam, ...inArgs) => {
        const localParam = inParam;
        const localArgs = inArgs;

        return await localExecutor({
            inRoutePath: localPath,
            inParam: localParam,
            inArgs: localArgs,
            inSource: localSource
        });
    };
};

export default startFunc;
```

---

### 2. Path Attacher (`attachPath.js`)

To attach a path like `"app.founder.profile.fetch"`:
1. Split the path into intermediate branch keys (`["app", "founder", "profile"]`) and the leaf action (`"fetch"`).
2. Traverse through each branch segment, initializing empty objects (`{}`) where needed.
3. Attach the callable leaf handler at the target property:

```javascript
import createLeafHandler from "./createLeafHandler.js";

const startFunc = ({ inTree, inPath, inSource, inExecutor }) => {
    const localTree = inTree;
    const localPath = inPath;
    const localSource = inSource;
    const localExecutor = inExecutor;

    const parts = localPath.split(".");
    const leafName = parts.pop();

    let branch = localTree;
    for (const segment of parts) {
        branch[segment] ??= {};
        branch = branch[segment];
    }

    branch[leafName] = createLeafHandler({
        inPath: localPath,
        inSource: localSource,
        inExecutor: localExecutor
    });
};

export default startFunc;
```

---

### 3. Route Coordinator (`index.js`)

Iterates each path in `inApiPaths`, mounts it into the tree, and returns the root namespace:

```javascript
import attachPath from "./attachPath.js";

const startFunc = ({ inApiPaths, inSource, inExecutor }) => {
    const localApiPaths = inApiPaths;
    const localSource = inSource;
    const localExecutor = inExecutor;

    const tree = {};

    for (const path of localApiPaths) {
        attachPath({
            inTree: tree,
            inPath: path,
            inSource: localSource,
            inExecutor: localExecutor
        });
    }

    const rootNamespace = localApiPaths[0]?.split(".")[0];

    return rootNamespace ? tree[rootNamespace] : tree;
};

export default startFunc;
```

---

## Architectural Benefits

- **Built Once:** The object tree is created once during module evaluation. Invocation is instantaneous.
- **Story-Driven:** Each file is under 40 lines and represents one clear step in the route-building narrative.
- **Strict Single Export:** Every file uses `export default startFunc;`.
- **Zero Directory Sprawl:** 50 endpoints can be mounted without adding a single directory.
