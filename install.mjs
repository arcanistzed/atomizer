import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url)); // set __dirname

// Create pre-commit hook to run the extract script
fs.writeFileSync(__dirname + "/../../.git/hooks/pre-commit", "node ../../node_modules/foundry-atomizer/extract.mjs ../../world");

// Create post-merge hook to run the build script
fs.writeFileSync(__dirname + "/../../.git/hooks/post-merge", "node ../../node_modules/foundry-atomizer/build.mjs ../../world");

// Prompt to write atomizer to .gitignore
fs.writeFileSync(__dirname + "/../../.gitignore", "\n\n# Atomizer\nnode_modules\npackage-lock.json\npackage.json", {flag: "a"})