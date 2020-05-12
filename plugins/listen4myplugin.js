// @file: plugins/listen4myplugin.js
class Listen4Myplugin {
    apply(compiler) {
        // 在myplugin environment 阶段被广播
        compiler.hooks.myPlugin.tap('Listen4Myplugin', (data) => {
            console.log('@Listen4Myplugin////', data)
        })
        // console.log(compiler.hooks.emit);

        compiler.hooks.beforeCompile.tapAsync('Listen4Myplugin', (params, callback) => {
            params['MyPlugin - data'] = 'important stuff my plugin will use later';
            callback();
        })


        compiler.hooks.emit.tapAsync('Listen4Myplugin', (data, callback) => {
            console.log('@Listen4Myplugin////====after-emit')
            callback()
        })

        compiler.hooks.done.tapAsync('Listen4Myplugin', (data, callback) => {
            console.log('@Listen4Myplugin////====after-done')
            callback()
        })
    }
}

module.exports = Listen4Myplugin
