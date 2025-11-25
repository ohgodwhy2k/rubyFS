import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs"; // Added for bundling local files

export default {
  // The entry point for your extension code
  input: "src/index.js",

  output: {
    // The path and filename for the final bundled extension
    file: "dist/extension.js",

    // The format required for browser-based extensions
    format: "iife",

    // **CRITICAL:** Names the IIFE wrapper, which the Scratch/TurboWarp runtime
    // uses to execute your extension code and pass the Scratch API object.
    name: "ScratchExtensions",

    // RECOMMENDED: Generates a sourcemap for easier debugging in the browser console.
    sourcemap: true,
  },

  plugins: [
    // 1. Must be listed before 'resolve' to correctly parse different module types
    // and bundle them into the single output file.
    commonjs(),

    // 2. Allows you to import files from 'node_modules' (though less common
    // for simple extensions, it's good practice).
    resolve(),
  ],
};
