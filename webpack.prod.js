const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 清理dist文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    // devtool: 'source-map',
    optimization: {
        //抽取公共的dm
        splitChunks: {
            name: "commons",
            chunks: 'all',
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                sourceMap: false,
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
    ]
});