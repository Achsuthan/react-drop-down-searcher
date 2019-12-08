var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/ReactDropDown.jsx',
    output: {
        path: path.resolve('lib'),
        filename: 'ReactDropDown.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    }
}