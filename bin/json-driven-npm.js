#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import packageInfo from "../package.json" with { type: "json" };
import findHighestVersion from "../scripts/scaffold/find-highest-version.js";
import copyScaffold from "../scripts/scaffold/copy-scaffold.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");

const usage = `
Usage:
  npx json-driven-npm [target-directory]

Examples:
  npx json-driven-npm ./src/v13
  npx json-driven-npm ./my-new-client
  npx json-driven-npm .

Options:
  -h, --help       Show this help message
  -v, --version    Show version (${packageInfo.version})
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

const targetArg = args.find((arg) => !arg.startsWith("-")) || ".";
const resolvedTarget = path.resolve(process.cwd(), targetArg);

try {
    const highestVersion = findHighestVersion({ inPackageRoot: packageRoot });

    const copied = copyScaffold({
        inSourceDir: highestVersion.directory,
        inTargetDir: resolvedTarget
    });

    const displayTarget = path.relative(process.cwd(), resolvedTarget) || ".";

    console.log(`\n🚀 JSON-Driven Architecture Scaffolded Successfully!\n`);
    console.log(`  Source Template : ${highestVersion.name} (${highestVersion.directory})`);
    console.log(`  Target Directory: ${displayTarget}\n`);
    console.log(`📁 Scaffolded Structure:`);
    for (const item of copied) {
        console.log(`   ├── ${item}`);
    }
    console.log(`\n👉 Next Steps:`);
    console.log(`   1. Define your public routes in ${path.join(displayTarget, "external-api", "api.json")}`);
    console.log(`   2. Specify your endpoint metadata in ${path.join(displayTarget, "source.json")}`);
    console.log(`   3. Write your execution/fetch logic in ${path.join(displayTarget, "internal-working", "execution", "index.js")}`);
    console.log(`\n🎉 Ready to build without directory sprawl!\n`);
} catch (error) {
    console.error(`\n❌ Error scaffolding JSON-driven architecture: ${error.message}\n`);
    process.exit(1);
}
