import app from "../src/index.js";

const profile = await app.users.profile.fetch("alice-42");
console.log("Profile returned:", profile);

const metrics = await app.reports.metrics.fetch("2026-10-05");
console.log("Metrics returned:", metrics);
