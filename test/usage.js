import app from "../src/index.js";

const philosophy = await app.ecosystem.architecture.philosophy.fetch();
console.log("Ecosystem Philosophy:", philosophy.concept);

const blueprint = await app.ecosystem.tools.blueprint.fetch();
console.log("Tool Blueprint:", blueprint.package);

const scaffolder = await app.ecosystem.tools.scaffolder.fetch();
console.log("Tool Scaffolder:", scaffolder.package);

const intellisense = await app.ecosystem.tools.intellisense.fetch();
console.log("Tool IntelliSense:", intellisense.package);

const profile = await app.founder.profile.fetch();
console.log("Founder Profile:", profile.name);

const company = await app.company.info.fetch();
console.log("Company Info:", company.name);

const packages = await app.company.packages.fetch();
console.log("Flagship Packages Count:", packages.length);
