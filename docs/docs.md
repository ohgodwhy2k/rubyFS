```
icon: ./icon.svg
title: QuickExtension Documentation
version: 1.0.0
banner: https://images.unsplash.com/photo-1708533548050-16703eff12ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
```

# QuickExtension

This template is designed for **developers** and **Scratch/TurboWarp enthusiasts** who want to quickly create and manage a new **TurboWarp extension**.

It provides a modern development environment with **linting, code formatting, bundling, and testing** out-of-the-box, allowing you to focus purely on your extension's logic.

## Node Scripts (`npm`)

Use these commands to manage and prepare your extension for use.

| Command                | Description                                                                                              |
| :--------------------- | :------------------------------------------------------------------------------------------------------- |
| `npm run **build**`    | Bundles your source code into the final, optimized extension file using **Rollup**.                      |
| `npm run **watch**`    | Starts Rollup in **watch mode**. It automatically rebuilds the extension whenever a source file changes. |
| `npm run **format**`   | Formats all code files using **Prettier** to ensure consistent style across the repository.              |
| `npm run **lint**`     | Runs **ESLint** to check the code for potential errors and style violations.                             |
| `npm run **lint:fix**` | Runs ESLint and automatically **fixes** many of the detected issues.                                     |
| `npm run **test**`     | Executes the test suite, specifically running the `tests/getInfo.test.js` script.                        |

## Dependencies

These packages provide the tooling necessary to build, format, and maintain your extension:

- `rollup`, `@rollup/plugin-commonjs`, `@rollup/plugin-node-resolve`: The **module bundler** and its essential plugins for compiling your JavaScript source code into a single distribution file.
- `eslint`, `@eslint/js`, `eslint-plugin-jsdoc`, `globals`: The **linter** for maintaining code quality and catching errors.
- `prettier`, `eslint-config-prettier`: The **code formatter** to enforce consistent style.

## Keeping Up to Date

If you created your repository from this template and want to pull in future updates or fixes from the original template, you can set this repository as a new remote and then cherry-pick specific commits.

### 1. Add the Template as a New Remote

Run these commands in your local repository to name the template repository `upstream`:

```bash
git remote add upstream https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template
git fetch upstream
```

### 2\. Pulling and Cherry-Picking Changes

- To see the changes available in the template:

  ```bash
  git log upstream/main
  ```

  _(Look for the commit hash of the change you want to integrate)_
  - To apply a **specific commit** from the template to your repository:

    ```bash
    git cherry-pick [commit-hash]
    ```

    _Replace `[commit-hash]` with the actual commit identifier._

  - To merge all upstream changes (use with caution, as it may cause conflicts):

    ```bash
    git pull upstream main
    ```
