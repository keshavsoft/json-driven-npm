import fs from "node:fs";
import path from "node:path";

const versionPattern = /^v(\d+)$/;

const startFunc = ({ inPackageRoot }) => {
    const localPackageRoot = inPackageRoot;

    const srcDirectory = path.join(localPackageRoot, "src");
    const versions = fs.readdirSync(srcDirectory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && versionPattern.test(entry.name))
        .map((entry) => ({
            name: entry.name,
            number: Number(entry.name.slice(1)),
            directory: path.join(srcDirectory, entry.name)
        }))
        .sort((left, right) => right.number - left.number);

    if (versions.length === 0) {
        throw new Error(`No version directories found in ${srcDirectory}.`);
    }

    return versions[0];
};

export default startFunc;
