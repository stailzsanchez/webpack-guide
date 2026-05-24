module.exports = {
  printWidth: 140,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxSingleQuote: false,
  arrowParens: 'always',

  overrides: [
    {
      files: ['*.json', '*.json5'],
      options: {
        printWidth: 250,
        parser: 'json',
        tabWidth: 2,
      },
    },
    {
      files: '*.scss',
      options: {
        singleQuote: false,
      },
    },
  ],
};
