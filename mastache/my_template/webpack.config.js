const path = require('path');

module.exports = {
    mode: 'development',

    // index.js in src
    entry: './src/index.js',

    output: {
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),

        compress: false,

        port: 8089,
        
        // virtual path, bundle.js is not really generated
        publicPath: '/virtual/'
    }
}
