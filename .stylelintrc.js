const { getStylelintConfig } = require('@iceworks/spec');

module.exports = getStylelintConfig('react', {
  rules: {
    'max-line-length': false,
    'value-list-comma-space-after': false,
    'comment-whitespace-inside': false,
    'no-duplicate-selectors': false,
  },
});
