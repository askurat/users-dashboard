/* Overriding CreateReactApp settings, ref: https://github.com/arackaf/customize-cra */
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  // addWebpackPlugin
} = require('customize-cra'); // eslint-disable-line import/no-extraneous-dependencies
const { resolveTsAliases } = require('resolve-ts-aliases');
const path = require('path');
// const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const darkThemeVars = require('antd/dist/dark-theme');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      hack: `true;@import "${require.resolve(
        'antd/lib/style/color/colorPalette.less',
      )}";`,
      ...darkThemeVars,
      '@primary-color': '#1DA57A',
    },
  }),
  // add an alias for "ag-grid-react" imports
  addWebpackAlias({
    ...resolveTsAliases(path.resolve(__dirname, 'tsconfig.paths.json')),
  }),
  // addWebpackPlugin(new AntdDayjsWebpackPlugin())
);
