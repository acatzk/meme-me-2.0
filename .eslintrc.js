module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react'],
  rules: {
    'no-console': 'error',
    'eol-last': ['error', 'always'],
    'no-duplicate-imports': 'error',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
