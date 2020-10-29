const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const paths = require('./paths')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: paths.build,
        open: true,
        hot: true,
        port: 3000
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});
