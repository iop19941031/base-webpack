const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'source-map',
    optimization: {
        //抽取公共的dm
        splitChunks: {
            name: "commons",
            chunks: 'all'
        }
    },
    plugins: [
        new UglifyJSPlugin()
    ]
});