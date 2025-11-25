import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runCommand(command) {
    console.log(`Executing: ${command}`);
    try {
        const output = execSync(command, { encoding: 'utf-8', cwd: path.join(__dirname, '..') });
        console.log(output.trim());
    } catch (error) {
        console.error(`\n[!] Error executing command: ${command}`);
        console.error(error.stderr || error.stdout || error.message);
        process.exit(1);
    }
}

function release() {
    // Arguments: [node_path, script_path, version_arg]
    const versionInput = process.argv[2];

    if (!versionInput) {
        console.error("[!] Error: You must provide a version number (e.g., 1.0.0).");
        console.error("    Usage: npm run release -- 1.0.0");
        process.exit(1);
    }

    // 1. Prepend "v" to the version input
    const tagName = versionInput.startsWith('v') ? versionInput : `v${versionInput}`;
    const tagMessage = `Release ${tagName}`;

    console.log(`\nStarting release process for tag: ${tagName}`);

    // 2. Ensure we are on the correct branch and up-to-date (optional but recommended)
    runCommand('git pull'); 

    // 3. Create the annotated tag
    runCommand(`git tag -a ${tagName} -m "${tagMessage}"`);

    // 4. Push the tag to GitHub (This is what triggers your workflow)
    runCommand(`git push origin ${tagName}`);

    console.log(`\nSuccessfully tagged and pushed ${tagName}. The GitHub workflow should now be running.`);
}

release();