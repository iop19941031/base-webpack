const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');

const MyPlugin = require('./plugins/myplugin')
const Listen4Myplugin = require('./plugins/listen4myplugin.js')

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
    entry: {
        app: './src/main.js',
        print: './src/print.js',
    },
    output: {
        filename: 'asset/js/[name].[chunkhash].js',
        path: resolve('./dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',

                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[hash:8].[ext]',
                            publicPath: resolve('dist/asset/images'),
                            outputPath: 'asset/images'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            publicPath: resolve('dist/asset/font'),
                            outputPath: 'asset/font'
                        }
                    }
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? 'asset/css/[name].css' : 'asset/css/[name].[hash].css',
            chunkFilename: devMode ? 'asset/css/[id].css' : 'asset/css/[id].[hash].css',
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new webpack.ProvidePlugin({
            _: 'lodash',
            join: ['lodash', 'join']
        }),
        new MyPlugin("Plugin is instancing."),
        new Listen4Myplugin()
    ],
};