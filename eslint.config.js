module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    '@angular-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@angular-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'no-console': 'warn',
    'no-debugger': 'error'
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'error'
      }
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended']
    }
  ]
};