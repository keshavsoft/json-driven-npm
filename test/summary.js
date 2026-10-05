import app from "../src/index.js";

const data = await app.reports.summary.fetch("2026-10-05");
console.log("data :", data);
