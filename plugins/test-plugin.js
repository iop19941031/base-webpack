module.exports = class Plugin {

    apply(compiler) {

        compiler.hooks.make.tapAsync('TestPlugin', (compilation, callback) => {

            compilation.hooks.buildModule.tap('TestPlugin', module => {

                console.log('module.resource', module.resource);

                console.log('module.loaders', module.loaders);

                console.time('TestPlugin');

            });


            compilation.hooks.succeedModule.tap('TestPlugin', module => {
                console.log('TestPlugin-----------');
                console.timeEnd('TestPlugin');


            });


            callback();

        });

    }

};