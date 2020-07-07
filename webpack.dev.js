const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 8088, // 端口号
        contentBase: './dist'
    },
    plugins: [
        new webpack.NamedModulesPlugin()
    ]
});