const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');

const MyPlugin = require('./plugins/myplugin')
const Listen4Myplugin = require('./plugins/listen4myplugin.js')
const TestPlugin = require('./plugins/test-plugin');

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
    entry: {
        app: './src/main.js',
        print: './src/print.js',
    },
    output: {
        filename: 'asset/js/[name].[hash].js',
        chunkFilename: "asset/js/chunk.[chunkhash].js", // 长效缓存(/guides/caching)
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
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "thread-loader",
                        options: {
                            // 产生的 worker 的数量，默认是 cpu 的核心数
                            workers: 4,
                            // 一个 worker 进程中并行执行工作的数量,默认为20
                            workerParallelJobs: 50,
                            // Allow to respawn a dead worker pool
                            // respawning slows down the entire compilation
                            // and should be set to false for development
                            poolRespawn: false,

                            // 闲置时定时删除 worker 进程
                            // 默认为 500ms
                            // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
                            poolTimeout: 2000,

                            // 池(pool)分配给 worker 的工作数量
                            // 默认为 200
                            // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
                            poolParallelJobs: 50,

                            // 池(pool)的名称
                            // 可以修改名称来创建其余选项都一样的池(pool)
                            name: "my-pool"
                        }
                    },
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
        new TestPlugin(),
        new MyPlugin("Plugin is instancing."),
        new Listen4Myplugin()
    ],
};