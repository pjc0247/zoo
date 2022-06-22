module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  importOrder: [
    '^(react)',
    '^@[a-zA-Z]+',
    '^[a-zA-Z]+',
    '',
    '^@/',
    '^[.][.]',
    '^[.]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
};
