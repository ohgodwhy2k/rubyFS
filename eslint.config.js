import globals from "globals";
import js from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,

  {
    plugins: {
      jsdoc,
    },
    rules: {
      ...jsdoc.configs.recommended.rules,
      "jsdoc/require-returns-description": "off",
      "jsdoc/require-param-description": "off",
    },
  },

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    rules: {
      quotes: ["error", "single"],
      semi: ["error", ";"],
      "prefer-const": "error",
    },
  },

  {
    files: ["src/**/*.js", "src/**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        Scratch: "readonly",
      },
      parserOptions: {
        sourceType: "module",
      },
    },
    rules: {
      "jsdoc/require-jsdoc": "off",
    },
  },

  {
    files: ["docs/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        sourceType: "script",
      },
    },
    rules: {
      "no-undef": "off",
    },
  },

  {
    files: ["*.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        sourceType: "script",
      },
    },
    rules: {
      "no-console": "off",
      "jsdoc/require-jsdoc": "off",
    },
  },

  prettier,
];
