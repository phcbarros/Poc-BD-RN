module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
  ],
  plugins: ['react-hooks'],
  rules: {
    semi: ['error', 'never'],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn',
  },
}
