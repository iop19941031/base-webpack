module.exports = class FileListPlugin {

    apply(compiler) {
        // 输出 asset 到 output 目录之前执行
        // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
        compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, callback) => {
            // console.log(compilation)
            let { assets, chunks, compiler, hooks, options } = compilation
            let compilation2 = {
                assets,
                chunks,
                compiler,
                hooks,
                options
            }

            // 4. 通过compiler对象可以注册对应的事件，全部的钩子都可以使用
            // 注册一个编译完成的钩子， 一般需要将插件名作为事件名即可
            compiler.hooks.done.tap('MyWebpackPlugin', (stats) => {
                console.log('整个webpack打包结束了');
            })
            // compilation.chunks存放了代码块列表

            chunks.forEach(chunk => {
                // chunk 代表一个代码块
                // 代码块由多个模块组成，通过 chunk.forEachModule 能读取组成代码块的每个模块
                // Webpack 会根据 Chunk 去生成输出的文件资源，每个 Chunk 都对应一个及其以上的输出文件
                // 例如在 Chunk 中包含了 CSS 模块并且使用了 ExtractTextPlugin 时，
                // 该 Chunk 就会生成 .js 和 .css 两个文件
                chunk.files.forEach(function (filename) {
                    // compilation.assets 存放当前所有即将输出的资源
                    // 调用一个输出资源的 source() 方法能获取到输出资源的内容
                    let source = assets[filename].source()
                })


                console.log('`````````````````````========================================');
                // chunk包含多个模块，通过chunk.modulesIterable可以遍历模块列表
                for (const module of chunk.modulesIterable) {
                    // module包含多个依赖，通过module.dependencies进行遍历

                    module.dependencies.forEach(dependency => {


                        if (dependency.module && dependency.module.resource) {
                            console.log('-----------------------');
                            console.log(dependency.module.resource);
                            console.log('-----------------------');
                        }
                    });

                }
                console.log('`````````````````````========================================');
            });



            // 修改或添加资源
            // Create a header string for the generated file:
            var filelist = 'In this build:\n\n'

            // Loop through all compiled assets,
            // adding a new line item for each filename.

            for (var filename in compilation.assets) {
                filelist += '- ' + filename + '\n'
                console.log(filename);
            }

            // Insert this list into the webpack build as a new file asset:
            assets['filelist.md'] = {
                source: function () {
                    return filelist
                },
                size: function () {
                    return filelist.length
                }
            }


            // 这是一个异步事件，要记得调用 callback 通知 Webpack 本次事件监听处理结束。
            // 如果忘记了调用 callback，Webpack 将一直卡在这里而不会往后执行。
            callback();
        });
    }
};