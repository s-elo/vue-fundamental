const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundled.js",
  },

  devtool: "source-map",

  resolve: {
    modules: [
      path.resolve(__dirname, "source"),
      path.resolve(__dirname, "node_modules"),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],

//   devServer: {
//     port: 8089,
//   },
};
