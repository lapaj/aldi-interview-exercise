/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'standard-with-typescript'
  ],
  plugins: ["@typescript-eslint", "project-code-style"],
  "rules": {
    "@typescript-eslint/indent": ["error", 2],
    "no-trailing-spaces": "error",
    "space-before-function-paren": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    // Standard
    "indent": "off",
    "comma-dangle": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
    "brace-style": "off",
    "@typescript-eslint/promise-function-async": "off"
  },
  overrides: [
    {
      "files": ["eslint/**/*.ts"],
      "extends": ["standard-with-typescript"],
      "rules": {
        "no-undef": "off",
        "@typescript-eslint/no-unused-vars": "off",
        // Standard
        "indent": "off",
        "comma-dangle": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
        "brace-style": "off",
        "@typescript-eslint/brace-style": ["error", "stroustrup"],
        "@typescript-eslint/promise-function-async": "off"
      }
    },
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
