import app from "../src/index.js";

const data = await app.users.profile.fetch("keshav");
console.log("data :", data);
