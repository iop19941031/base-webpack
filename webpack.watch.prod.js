const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: ['node_modules']
    },
    optimization: {
        //抽取公共的dm
        splitChunks: {
            name: "commons",
            chunks: 'all',
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
    ]
});