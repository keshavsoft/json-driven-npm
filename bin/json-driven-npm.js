#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import packageInfo from "../package.json" with { type: "json" };
import app from "../src/index.js";
import apiPaths from "../src/v4/api.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const usage = `
JSON-Driven NPM — Architectural Reference & Source of Truth

Usage:
  npx json-driven-npm               Run live demo of all exposed endpoints
  npx json-driven-npm --routes      List all public routes exposed by api.json
  npx json-driven-npm --run <route> Execute a specific endpoint path
  npx json-driven-npm --help        Show this help message
  npx json-driven-npm --version     Show version (${packageInfo.version})

Examples:
  npx json-driven-npm
  npx json-driven-npm --routes
  npx json-driven-npm --run app.founder.profile.fetch
  npx json-driven-npm --run app.ecosystem.packages.fetch
`;

const args = process.argv.slice(2);

if (args.includes("-h") || args.includes("--help")) {
    console.log(usage.trim());
    process.exit(0);
}

if (args.includes("-v") || args.includes("--version")) {
    console.log(packageInfo.version);
    process.exit(0);
}

const resolveRoute = ({ inTree, inRoutePath }) => {
    const localTree = inTree;
    const localRoutePath = inRoutePath;

    const parts = localRoutePath.split(".");
    // If route starts with namespace root (e.g. "app"), strip it since app is the exported root
    const segments = parts[0] === "app" ? parts.slice(1) : parts;

    let target = localTree;
    for (const segment of segments) {
        target = target?.[segment];
    }

    return typeof target === "function" ? target : null;
};

const runSingleRoute = async ({ inRoutePath }) => {
    const localRoutePath = inRoutePath;

    console.log(`\n🔍 Executing: ${localRoutePath}`);
    const fn = resolveRoute({ inTree: app, inRoutePath: localRoutePath });

    if (!fn) {
        console.error(`❌ Route not found or not callable: ${localRoutePath}`);
        console.error(`Available routes:`);
        for (const r of apiPaths) {
            console.error(`  - ${r}`);
        }
        process.exit(1);
    }

    try {
        const result = await fn();
        console.log(`\n📦 Result:`);
        console.dir(result, { depth: null, colors: true });
        console.log("");
    } catch (err) {
        console.error(`❌ Execution error: ${err.message}`);
        process.exit(1);
    }
};

const runAllRoutes = async () => {
    console.log(`\n=============================================================`);
    console.log(`  🌟 JSON-Driven NPM (v${packageInfo.version})`);
    console.log(`  Architectural Source of Truth & Reference Implementation`);
    console.log(`=============================================================\n`);

    console.log(`📦 Active Version   : src/v4`);
    console.log(`🧭 Public Contract  : src/v4/api.json (${apiPaths.length} routes)`);
    console.log(`📄 Domain Spec      : src/v4/source.json`);
    console.log(`⚡ Execution Mode   : In-Memory Dot-Notation Tree\n`);

    console.log(`--- Live Endpoint Executions ---\n`);

    for (const route of apiPaths) {
        const fn = resolveRoute({ inTree: app, inRoutePath: route });
        if (fn) {
            try {
                const data = await fn();
                console.log(`✅ ${route}()`);
                console.dir(data, { depth: null, colors: true });
                console.log("");
            } catch (err) {
                console.log(`❌ ${route}(): ${err.message}\n`);
            }
        }
    }

    console.log(`=============================================================`);
    console.log(`💡 How to use this architecture in your own packages:`);
    console.log(`   1. Declare your endpoints in source.json and allowed paths in api.json.`);
    console.log(`   2. In-memory route engine mounts your dot-path tree without folder sprawl.`);
    console.log(`   3. Run 'create-intellisense' to generate your TypeScript index.d.ts.`);
    console.log(`=============================================================\n`);
};

const runRoutesOnly = () => {
    console.log(`\n🧭 Exposed Routes in api.json (${apiPaths.length} total):\n`);
    for (const r of apiPaths) {
        console.log(`  • ${r}`);
    }
    console.log("");
};

const runIndex = async () => {
    if (args.includes("--routes")) {
        runRoutesOnly();
        return;
    }

    const runArgIdx = args.indexOf("--run");
    if (runArgIdx !== -1 && args[runArgIdx + 1]) {
        await runSingleRoute({ inRoutePath: args[runArgIdx + 1] });
        return;
    }

    await runAllRoutes();
};

runIndex();
