#!/usr/bin/env node

const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server')

const options = require('./webpack.watch.prod');

const defaultDevConfig = Object.assign({}, options)

const compiler = webpack(defaultDevConfig);
// const devServerOptions = defaultDevConfig.devServer
// const devServer = new WebpackDevServer(compiler, devServerOptions)
// devServer.listen(8080, 'localhost', () => {
//     console.log('[Lovely-CLI] Starting server on http://localhost:8082')
// })

compiler.run(true, (...args) => { });

// compiler.watch(true, (...ss) => {
//     console.log(13123);
//     console.log(ss);
// })