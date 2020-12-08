const webpackConfig = require('../configs/webpack.common');
const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-actions",
    "@storybook/addon-essentials"
  ],
  webpackFinal: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...webpackConfig.resolve.alias
    };
    config.module.rules = config.module.rules.filter(
        f => f.test.toString() !== '/\\.css$/'
    );
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  }
}
