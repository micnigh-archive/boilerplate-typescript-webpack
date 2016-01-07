var isDev = process.env.NODE_ENV !== "production";
var distPath = isDev ? "./.tmp/development/" : "./.tmp/production/";

var webpack = require("webpack");
var WebpackNotifierPlugin = require("webpack-notifier");

var libs = [
  "underscore",
  "es5-shim/es5-shim",
  "es5-shim/es5-sham",
];

module.exports = [{
  // devtool: isDev ? "eval" : "source-map",
  //devtool: "source-map",
  // debug: isDev,
  cache: isDev,
  devtool: "inline-eval-cheap-source-map",
  entry: {
    app: isDev ? [
      "webpack-hot-middleware/client",
      "./client/src/app.ts",
    ] : [
      "./client/src/app.ts",
    ],
  },
  devServer: {
    contentBase: "server/public/",
    hot: true,
    inline: true,
  },
  output: {
    path: distPath,
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },
  externals: libs,
  module: {
    loaders: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      loaders: [
        "babel-loader?presets[]=es2015",
        "ts-loader",
      ],
    }],
    noParse: [

    ],
  },
  plugins: isDev ? [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin({ title: "Webpack build", excludeWarnings: true })
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: [ "", ".webpack.js", ".web.js", ".ts", ".tsx", ".js" ]
  },
}, {
  entry: {
    lib: libs,
  },
  output: {
    path: distPath,
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },
  plugins: isDev ? [
    new WebpackNotifierPlugin({ title: "Webpack build", excludeWarnings: true })
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
}];
