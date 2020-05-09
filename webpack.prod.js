const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    devtool: 'source-map',
    optimization: {
        //抽取公共的dm
        splitChunks: {
            name: "commons",
            chunks: 'all'
        },
        minimize: true,
        minimizer: [new TerserPlugin({
            sourceMap: false,
        })],
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
    ]
});