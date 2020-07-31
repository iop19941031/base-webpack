#!/usr/bin/env node

const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const defaultConfig = require('./webpack.dev.js')

const defaultDevConfig = Object.assign({}, defaultConfig)

const compiler = Webpack(defaultDevConfig)
const devServerOptions = defaultDevConfig.devServer
const devServer = new WebpackDevServer(compiler, devServerOptions)
devServer.listen(8080, 'localhost', () => {
    console.log('[Lovely-CLI] Starting server on http://localhost:8082')
})

// compiler.run((handler) => {

// })

// compiler.watch((handler) => {

// })