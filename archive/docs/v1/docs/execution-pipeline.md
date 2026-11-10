# Story-Driven Execution Pipeline

[**View this document as HTML**](./execution-pipeline.html) · [**Documentation Hub**](./index.html)

When a consumer calls an endpoint like `await app.founder.profile.fetch()`, execution is handled by a story-driven pipeline.

---

## The Execution Flow

```text
Invocation: app.founder.profile.fetch()
  │
  ▼
Step 1: validateInput({ inParam })
  │  Sanitizes input parameter and handles optional or string arguments
  ▼
Step 2: getEndpointSpec({ inSource, inRoutePath })
  │  Direct O(1) path reduction against source.json to retrieve endpoint metadata
  ▼
Step 3: dispatchMock({ inEndpoint, inParam })
  │  Returns declared payload or dispatches request to transport layer
  ▼
Caller receives response object
```

---

## The Narrative Steps

Inside `internal-working/execution/`, each step is isolated in a single, focused module:

### Step 1: Input Validation (`validateInput.js`)
Normalizes input parameters. Safely handles absent parameters for zero-argument queries, trims strings, and coerces primitives:

```javascript
const startFunc = ({ inParam }) => {
    const localParam = inParam;

    if (localParam === undefined || localParam === null) {
        return "";
    }

    if (typeof localParam !== "string") {
        return String(localParam);
    }

    return localParam.trim();
};

export default startFunc;
```

---

### Step 2: Direct Spec Lookup (`getEndpointSpec.js`)
Rather than recursively walking a JSON tree, the endpoint specification is retrieved in a single line using array reduction:

```javascript
const startFunc = ({ inSource, inRoutePath }) => {
    const localSource = inSource;
    const localRoutePath = inRoutePath;

    const endpoint = localRoutePath
        .split(".")
        .reduce((current, key) => current?.[key], localSource);

    return endpoint;
};

export default startFunc;
```

---

### Step 3: Request Dispatch (`dispatchMock.js`)
In a production client (such as `tally-simple`), this step performs network transport (HTTP POST, WebSocket, gRPC). In this reference implementation, it returns the endpoint's configured data contract or a structured result:

```javascript
const startFunc = async ({ inEndpoint, inParam }) => {
    const localEndpoint = inEndpoint;
    const localParam = inParam;

    if (localEndpoint?.data !== undefined) {
        return localEndpoint.data;
    }

    return {
        resource: localEndpoint?.resource,
        queryParam: localParam,
        timestamp: new Date().toISOString(),
        status: "success",
        data: {
            description: localEndpoint?.description
        }
    };
};

export default startFunc;
```

---

### The Coordinator (`index.js`)

The coordinator sequences the pipeline into a plain, 4-line story with no defensive bloat:

```javascript
import validateInput from "./validateInput.js";
import getEndpointSpec from "./getEndpointSpec.js";
import dispatchMock from "./dispatchMock.js";

const startFunc = async ({ inRoutePath, inParam, inSource }) => {
    const localRoutePath = inRoutePath;
    const localParam = inParam;
    const localSource = inSource;

    const param = validateInput({
        inParam: localParam
    });

    const endpoint = getEndpointSpec({
        inSource: localSource,
        inRoutePath: localRoutePath
    });

    return await dispatchMock({
        inEndpoint: endpoint,
        inParam: param
    });
};

export default startFunc;
```

---

## Architectural Highlights

- **Direct Resolution:** Zero tree crawling, zero key-skipping conditions.
- **Narrative Clarity:** The coordinator reads like plain English sentences.
- **Single Responsibility:** Each file does exactly one job.
- **Strict Single Export:** Every file uses `export default startFunc;`.
- **Single Point of Customization:** When building your own API client, `execution/` is the only folder you customize.
