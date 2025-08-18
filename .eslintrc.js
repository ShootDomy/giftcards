module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json', // 👈 usamos el nuevo tsconfig
    tsconfigRootDir: __dirname, // 👈 asegura paths correctos
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf',
      },
    ],
  },
};
