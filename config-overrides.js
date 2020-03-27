/* Overriding CreateReactApp settings, ref: https://github.com/arackaf/customize-cra */
const fs = require('fs');
const path = require('path');
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addBundleVisualizer,
} = require('customize-cra');
const { resolveTsAliases } = require('resolve-ts-aliases');
const lessToJS = require('less-vars-to-js');

const antThemeVars = lessToJS(
  fs.readFileSync(path.join(__dirname, './src/variables.less'), 'utf8'),
);

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      ...antThemeVars,
    },
  }),
  // add webpack bundle visualizer with --analyze flag
  addBundleVisualizer({}, true),
  // add an alias
  addWebpackAlias({
    ...resolveTsAliases(path.resolve(__dirname, 'tsconfig.paths.json')),
  }),
);
