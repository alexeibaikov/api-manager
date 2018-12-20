const { styles, theme } = require('./styleguide.styles')

module.exports = {
  components: 'src/presentations/**/*.tsx',
  editorConfig: { theme: 'cobalt' },
  ignore: ['**/*.test.tsx', '**/*.stories.tsx', '../*.ts'],
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json',
  ).parse,
  showUsage: true,
  styles,
  title: `Bridge Platform`,
  theme,
  webpackConfig: require('react-scripts-ts/config/webpack.config.dev.js'),
}
