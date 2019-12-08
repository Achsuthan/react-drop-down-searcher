var path = require('path');
module.exports = {
  entry: './src/components/ReactDropDown.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'ReactDropDown.jsx',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  externals: {
    'react': 'commonjs react' 
  }
};