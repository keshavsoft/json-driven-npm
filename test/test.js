import assert from "node:assert/strict";
import test from "node:test";
import app from "../src/index.js";

test("exposes the expected JSON-driven API structure in v4", () => {
    assert.equal(typeof app.ecosystem.architecture.philosophy.fetch, "function");
    assert.equal(typeof app.ecosystem.architecture.layers.fetch, "function");
    assert.equal(typeof app.ecosystem.tools.blueprint.fetch, "function");
    assert.equal(typeof app.ecosystem.tools.scaffolder.fetch, "function");
    assert.equal(typeof app.ecosystem.tools.intellisense.fetch, "function");
    assert.equal(typeof app.ecosystem.workflow.steps.fetch, "function");
    assert.equal(typeof app.ecosystem.workflow.principles.fetch, "function");
    assert.equal(typeof app.founder.profile.fetch, "function");
    assert.equal(typeof app.founder.links.fetch, "function");
    assert.equal(typeof app.company.info.fetch, "function");
    assert.equal(typeof app.company.packages.fetch, "function");
});

test("fetches ecosystem tools specifications from JSON", async () => {
    const blueprint = await app.ecosystem.tools.blueprint.fetch();
    assert.equal(blueprint.package, "json-driven-npm");

    const scaffolder = await app.ecosystem.tools.scaffolder.fetch();
    assert.equal(scaffolder.package, "create-json-driven-npm");

    const intellisense = await app.ecosystem.tools.intellisense.fetch();
    assert.equal(intellisense.package, "create-intellisense");
});

test("fetches architecture philosophy and workflow steps", async () => {
    const philosophy = await app.ecosystem.architecture.philosophy.fetch();
    assert.equal(philosophy.concept, "Endpoints as Data");

    const workflow = await app.ecosystem.workflow.steps.fetch();
    assert.ok(Array.isArray(workflow.steps));
    assert.equal(workflow.steps.length, 3);
});

test("fetches founder profile and company info", async () => {
    const profile = await app.founder.profile.fetch();
    assert.equal(profile.name, "Keshav Nalam");
    assert.equal(profile.company, "KeshavSoft");

    const company = await app.company.info.fetch();
    assert.equal(company.name, "KeshavSoft");

    const packages = await app.company.packages.fetch();
    assert.ok(Array.isArray(packages));
    assert.ok(packages.some((p) => p.name === "create-intellisense"));
    assert.ok(packages.some((p) => p.name === "create-json-driven-npm"));
    assert.ok(packages.some((p) => p.name === "json-driven-npm"));
});

test("CLI runner executes and displays endpoints in terminal for v4", async () => {
    const { execFileSync } = await import("node:child_process");
    const output = execFileSync("node", ["bin/json-driven-npm.js"], { encoding: "utf8" });
    assert.ok(output.includes("JSON-Driven NPM"));
    assert.ok(output.includes("Active Version   : src/v4"));
    assert.ok(output.includes("Endpoints as Data"));
    assert.ok(output.includes("create-intellisense"));
    assert.ok(output.includes("create-json-driven-npm"));
});

test("CLI runner supports --routes flag in v4", async () => {
    const { execFileSync } = await import("node:child_process");
    const output = execFileSync("node", ["bin/json-driven-npm.js", "--routes"], { encoding: "utf8" });
    assert.ok(output.includes("app.ecosystem.architecture.philosophy.fetch"));
    assert.ok(output.includes("app.ecosystem.tools.blueprint.fetch"));
    assert.ok(output.includes("app.company.packages.fetch"));
});

test("CLI runner supports --run <route> targeted execution in v4", async () => {
    const { execFileSync } = await import("node:child_process");
    const output = execFileSync("node", ["bin/json-driven-npm.js", "--run", "app.ecosystem.tools.blueprint.fetch"], { encoding: "utf8" });
    assert.ok(output.includes("Executing: app.ecosystem.tools.blueprint.fetch"));
    assert.ok(output.includes("json-driven-npm"));
});
