module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['react-hooks', 'import'],
  settings: {
    node: {
      paths: ['src'],
    },
    'import/resolver': {
      'babel-module': {},
    },
    'import/core-modules': ['react', 'react-native'],
  },
  rules: {
    semi: ['error', 'never'],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
}
