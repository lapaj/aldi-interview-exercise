const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    // Configures for antfu's config
  },

  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs
  {
    files: ['**/*.vue'],
    rules: {
      'vue/padding-line-between-blocks': [0, 'never'],
      'vue/no-unused-vars': ['error', {
        ignorePattern: '^_',
      }],
      'vue/no-mutating-props': ['error', {
        shallowOnly: true,
      }],
    },
  },
  {
    rules: {
      curly: [2, 'multi'],
    },
  },
  {
    files: ['**/*.cy.ts'],
    rules: {
      'unicorn/prefer-number-properties': [0, 'never'],
    },
  },
)
