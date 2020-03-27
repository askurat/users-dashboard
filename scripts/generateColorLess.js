const fs = require('fs');
const path = require('path');
const { generateTheme } = require('antd-theme-generator');
const genCss = require('antd-pro-merge-less');
const darkThemeVars = require('antd/dist/dark-theme');
const lessToJS = require('less-vars-to-js');

const varFile = path.join(__dirname, '../src/variables.less');
const antThemeVars = lessToJS(fs.readFileSync(varFile, 'utf8'));

genCss(
  path.join(__dirname, '..'),
  [
    {
      theme: 'dark',
      fileName: './public/dark.css',
      modifyVars: {
        ...darkThemeVars,
        ...antThemeVars,
      },
    },
  ],
  {
    ignoreAntd: false,
    isModule: false,
    cache: false,
    loadAny: true,
    ignoreProLayout: true,
  },
);

const options = {
  antdStylesDir: path.join(__dirname, '../node_modules/antd/es'),
  stylesDir: path.join(__dirname, '../src'),
  varFile,
  mainLessFile: path.join(__dirname, '../src/index.less'),
  themeVariables: Object.keys(antThemeVars),
  outputFilePath: path.join(__dirname, '../public/color.less'),
};

generateTheme(options);
