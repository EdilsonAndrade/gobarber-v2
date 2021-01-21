module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'no-param-reasign': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '_' }],
    'prettier/prettier': 'error',
    
    'import/no-unresolved': 'off',
  },
};
