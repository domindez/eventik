module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // Añade esta línea
    'standard'
  ],
  parser: '@typescript-eslint/parser', // Añade esta línea
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json' // Añade esta línea
  },
  plugins: [
    'react',
    '@typescript-eslint' // Añade esta línea
  ],
  overrides: [
    {
      files: ['.eslintrc.js'],
      parserOptions: {
        project: null
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    camelcase: 'off',
    'no-tabs': 'off'
  }
}
