module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/destructuring-assignment': false,
    'jsx-a11y/anchor-is-valid': false,
  },
  env: {
    browser: true,
  },
};
