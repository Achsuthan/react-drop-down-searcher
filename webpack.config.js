var path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/components/ReactDropDown.jsx",
  output: {
    path: path.resolve("dist"),
    filename: "build.js",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: "babel-loader"
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
};
