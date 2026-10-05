import assert from "node:assert/strict";
import test from "node:test";
import app from "../src/index.js";

test("exposes the expected JSON-driven API structure", () => {
    assert.equal(typeof app.users.profile.fetch, "function");
    assert.equal(typeof app.users.settings.fetch, "function");
    assert.equal(typeof app.reports.summary.fetch, "function");
    assert.equal(typeof app.reports.metrics.fetch, "function");
});

test("parameter validation rejects empty or invalid inputs", async () => {
    await assert.rejects(
        app.users.profile.fetch(" "),
        { name: "TypeError", message: "Parameter must be a non-empty string." }
    );
    await assert.rejects(
        app.users.profile.fetch(""),
        { name: "TypeError", message: "Parameter must be a non-empty string." }
    );
    await assert.rejects(
        app.users.profile.fetch(123),
        { name: "TypeError", message: "Parameter must be a non-empty string." }
    );
});

test("executes and resolves data based on JSON specification", async () => {
    const profile = await app.users.profile.fetch("user-101");
    assert.equal(profile.status, "success");
    assert.equal(profile.resource, "users");
    assert.equal(profile.data.id, "user-101");
    assert.equal(profile.data.description, "Fetches user profile details by ID.");

    const summary = await app.reports.summary.fetch("2026-10-05");
    assert.equal(summary.status, "success");
    assert.equal(summary.resource, "daily_summary");
    assert.equal(summary.data.id, "2026-10-05");
});
