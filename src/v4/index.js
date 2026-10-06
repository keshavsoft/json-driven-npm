import source from "./source.json" with { type: "json" };
import apiPaths from "./api.json" with { type: "json" };

import createRoute from "./engine/route/index.js";
import execute from "./engine/execution/index.js";

const app = createRoute({
    inApiPaths: apiPaths,
    inSource: source,
    inExecutor: execute
});

export default app;
