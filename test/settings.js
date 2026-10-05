import app from "../src/index.js";

const data = await app.users.settings.fetch("keshav");
console.log("data :", data);
