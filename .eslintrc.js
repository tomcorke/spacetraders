/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index", "type"],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "{react,react-dom,react-dom/server,prop-types}",
            group: "external",
            position: "before",
          },
          {
            pattern: "~/**",
            group: "parent",
            position: "after",
          },
          {
            pattern: "{*.scss,*.css}",
            group: "type",
            patternOptions: { matchBase: true },
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "react-dom", "prop-types"],
      },
    ],
  },
};
