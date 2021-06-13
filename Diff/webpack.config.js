const path = require('path');

module.exports = {
    entry: './src/index.js',

    output: {
        publicPath: 'virtual',
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: 'public',

        port: 8089
    }
}
