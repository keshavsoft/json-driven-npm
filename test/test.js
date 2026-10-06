import assert from "node:assert/strict";
import test from "node:test";
import app from "../src/index.js";

test("exposes the expected JSON-driven API structure in v3", () => {
    assert.equal(typeof app.founder.profile.fetch, "function");
    assert.equal(typeof app.founder.links.fetch, "function");
    assert.equal(typeof app.company.info.fetch, "function");
    assert.equal(typeof app.ecosystem.packages.fetch, "function");
});

test("fetches founder profile from JSON specification", async () => {
    const profile = await app.founder.profile.fetch();
    assert.equal(profile.name, "Keshav Nalam");
    assert.equal(profile.company, "KeshavSoft");
});

test("fetches official links from JSON specification", async () => {
    const links = await app.founder.links.fetch();
    assert.equal(links.website, "https://keshavsoft.com/");
    assert.equal(links.github, "https://github.com/keshavsoft");
    assert.equal(links.npm, "https://www.npmjs.com/~keshavsoft");
});

test("fetches company info and ecosystem packages", async () => {
    const company = await app.company.info.fetch();
    assert.equal(company.name, "KeshavSoft");

    const packages = await app.ecosystem.packages.fetch();
    assert.ok(Array.isArray(packages));
    assert.ok(packages.some((p) => p.name === "create-intellisense"));
    assert.ok(packages.some((p) => p.name === "tally-simple"));
});

test("CLI runner executes and displays endpoints in terminal", async () => {
    const { execFileSync } = await import("node:child_process");
    const output = execFileSync("node", ["bin/json-driven-npm.js"], { encoding: "utf8" });
    assert.ok(output.includes("JSON-Driven NPM"));
    assert.ok(output.includes("Active Version   : src/v3"));
    assert.ok(output.includes("Keshav Nalam"));
    assert.ok(output.includes("create-intellisense"));
});

test("CLI runner supports --routes flag", async () => {
    const { execFileSync } = await import("node:child_process");
    const output = execFileSync("node", ["bin/json-driven-npm.js", "--routes"], { encoding: "utf8" });
    assert.ok(output.includes("app.founder.profile.fetch"));
    assert.ok(output.includes("app.ecosystem.packages.fetch"));
});

test("CLI runner supports --run <route> targeted execution", async () => {
    const { execFileSync } = await import("node:child_process");
    const output = execFileSync("node", ["bin/json-driven-npm.js", "--run", "app.founder.profile.fetch"], { encoding: "utf8" });
    assert.ok(output.includes("Executing: app.founder.profile.fetch"));
    assert.ok(output.includes("Keshav Nalam"));
});

