# QuickExtension

This template is designed for **developers** and **Scratch/TurboWarp enthusiasts** who want to quickly create and manage a new **TurboWarp extension**.

It provides a modern development environment with **linting, code formatting, bundling, and testing** out of the box, allowing you to focus purely on your extension's logic.

# How to Use This Template

1. Click **"Use this template"**.
2. Click **"Create a new repository"**.
3. Name your repository and add a description.
4. Choose visibility (public/private).
5. Click **"Create repository"**.
6. Read the rest of the README & documentation.
7. **You're ready to start developing your extension!**

# Features

1. ✔ Automated builds using **Rollup**
2. ✔ **ESLint** + **Prettier** integration
3. ✔ **Node test runner** (built-in)
4. ✔ **GitHub Actions** (build, lint, test, release)
5. ✔ Simple and clean extension entry point

# Project Structure

```
/
├─ src/
│  └─ main.js
├─ tests/
│  └─ getInfo.test.js
├─ docs/
│  └─ ...
├─ .github/workflows/
│  └─ ...
├─ rollup.config.js
├─ package.json
└─ README.md
```

---

# Node Scripts (`npm`)

Use these commands to manage and prepare your extension for use.

| Command            | Description                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `npm run build`    | Bundles your source code into the final optimized extension file using **Rollup**.        |
| `npm run watch`    | Starts Rollup in **watch mode** — automatically rebuilds when files change.               |
| `npm run format`   | Formats all code files using **Prettier** for consistent style.                           |
| `npm run lint`     | Runs **ESLint** to check for errors and style issues.                                     |
| `npm run lint:fix` | Runs ESLint and automatically fixes applicable issues.                                    |
| `npm run test`     | Executes the test suite using Node’s built-in test runner (runs `tests/getInfo.test.js`). |

# Dependencies

These packages provide the tooling necessary to build, format, and maintain your extension:

* **Rollup**:
  `rollup`, `@rollup/plugin-commonjs`, `@rollup/plugin-node-resolve`
  *(Module bundling and plugin support)*

* **ESLint**:
  `eslint`, `@eslint/js`, `eslint-plugin-jsdoc`, `globals`
  *(Code quality and error checking)*

* **Prettier**:
  `prettier`, `eslint-config-prettier`
  *(Code formatting and style consistency)*

# Keeping Up to Date

If you created your repository from this template and want to pull in future updates or fixes, you can add the template repo as an additional remote and cherry-pick commits as needed.

## 1. Add the Template as a New Remote

```bash
git remote add upstream https://github.com/ohgodwhy2k/quickextension.git
git fetch upstream
```

## 2. Pulling and Cherry-Picking Changes

### View upstream commits:

```bash
git log upstream/main
```

(Look for the commit hash you want to integrate.)

### Cherry-pick a specific commit:

```bash
git cherry-pick <commit-hash>
```

Replace `<commit-hash>` with the actual commit ID.

### Merge all upstream changes (⚠ may cause conflicts):

```bash
git pull upstream main
```

> **TODO (Future Idea):** Add an automated npm script to fetch/pull upstream changes.
