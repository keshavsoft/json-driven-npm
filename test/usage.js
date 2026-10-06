import app from "../src/index.js";

const profile = await app.founder.profile.fetch();
console.log("Founder Profile:", profile);

const links = await app.founder.links.fetch();
console.log("Official Links:", links);

const company = await app.company.info.fetch();
console.log("Company Info:", company);

const packages = await app.ecosystem.packages.fetch();
console.log("Ecosystem Packages:", packages);
