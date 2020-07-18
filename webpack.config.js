let path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

let conf = {
  mode: "none",
  entry: {
    app: path.join(__dirname, 'src/ts', 'index.tsx')
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[hash]-main.js",
    publicPath: ""
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  devServer: {
    overlay: true,
    contentBase: "./src",
    watchContentBase: true,
    historyApiFallback: true

  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: "style-loader",
            use: ["css-loader", "sass-loader"]
          })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[hash]-style.css"
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html"
    })
  ]
}

module.exports = (env, options) => {
  let production = options.mode === "production";
  conf.devtool = production
    ? "source-map"
    : "eval-sourcemap";
  return conf;
}
