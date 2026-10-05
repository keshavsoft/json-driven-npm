# Story-Driven Execution Pipeline

[**View this document as HTML**](./execution-pipeline.html) · [**Documentation Hub**](./index.html)

When a consumer calls an endpoint like `await app.users.profile.fetch("user-101")`, execution is handled by a story-driven pipeline.

---

## The Execution Flow

```text
Invocation: app.users.profile.fetch("user-101")
  │
  ▼
Step 1: validateInput({ inParam })
  │  Validates input parameter and trims whitespace
  ▼
Step 2: getEndpointSpec({ inSource, inRoutePath })
  │  Direct O(1) path reduction against source.json to retrieve endpoint metadata
  ▼
Step 3: dispatchMock({ inEndpoint, inParam })
  │  Dispatches request to network/database/transport layer
  ▼
Caller receives response object
```

---

## The Narrative Steps

Inside `internal-working/execution/`, each step is isolated in a single, focused module:

### Step 1: Input Validation (`validateInput.js`)
Validates that the parameter is a valid non-empty string. Fails early with a clear `TypeError` if invalid:

```javascript
const startFunc = ({ inParam }) => {
    const localParam = inParam;

    if (typeof localParam !== "string" || !localParam.trim()) {
        throw new TypeError("Parameter must be a non-empty string.");
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
In a production client (such as `tally-simple`), this step performs network transport (HTTP POST, WebSocket, gRPC). In this reference implementation, it formats and returns structured data based on the resource:

```javascript
const startFunc = async ({ inEndpoint, inParam }) => {
    const localEndpoint = inEndpoint;
    const localParam = inParam;

    return {
        resource: localEndpoint?.resource,
        queryParam: localParam,
        timestamp: new Date().toISOString(),
        status: "success",
        data: {
            id: localParam,
            description: localEndpoint?.description
        }
    };
};

export default startFunc;
```

---

### The Coordinator (`index.js`)

The coordinator sequences the pipeline into a plain, 4-line story with no bloated comments:

```javascript
import validateInput from "./validateInput.js";
import getEndpointSpec from "./getEndpointSpec.js";
import dispatchMock from "./dispatchMock.js";

const startFunc = async ({ inRoutePath, inParam, inSource }) => {
    const localRoutePath = inRoutePath;
    const localParam = inParam;
    const localSource = inSource;

    const param = validateInput({ inParam: localParam });
    const endpoint = getEndpointSpec({ inSource: localSource, inRoutePath: localRoutePath });

    return await dispatchMock({ inEndpoint: endpoint, inParam: param });
};

export default startFunc;
```

---

## Architectural Highlights

- **Direct Resolution:** Zero tree crawling, zero key-skipping conditions.
- **Narrative Clarity:** The coordinator reads like English sentences.
- **Single Responsibility:** Each file does exactly one job.
- **Strict Single Export:** Every file uses `export default startFunc;`.
