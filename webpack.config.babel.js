var isDev = process.env.NODE_ENV !== "production";
var distPath = isDev ? "./.tmp/development/" : "./.tmp/production/";

var webpack = require("webpack");
var WebpackNotifierPlugin = require("webpack-notifier");

module.exports = {
  cache: true,
  devtool: "#cheap-module-source-map",
  entry: {
    app: isDev ? [
      "webpack-hot-middleware/client",
      "./client/src/app.tsx",
    ] : [
      "./client/src/app.tsx",
    ],
    lib: [
      "react",
      "react-dom",
      "react-router",
      "es5-shim",
      "es5-shim/es5-sham",
      "regenerator/runtime",
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
  module: {
    loaders: [{
      test: /\.ts(x?)$/,
      exclude: [
        "node_modules",
      ],
      loaders: [
        "babel-loader?presets[]=es2015&cacheDirectory",
        "ts-loader?transpileOnly=true",
      ],
    }, {
      test: /\.scss$/,
      loaders: [
        "style/useable",
        "css",
        "autoprefixer-loader",
        "sass"
      ],
    }],
    sassLoader: {
      includePaths: [],
    },
  },
  plugins: isDev ? [
    new webpack.optimize.CommonsChunkPlugin({ name: "lib", filename: "lib.js" }),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackNotifierPlugin({ title: "Webpack build", excludeWarnings: true })
  ] : [
    new webpack.optimize.CommonsChunkPlugin({ name: "lib", filename: "lib.js" }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: [ "", ".webpack.js", ".web.js", ".ts", ".tsx", ".js" ]
  },
};
