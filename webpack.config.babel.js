var isDev = process.env.NODE_ENV !== "production";
var distPath = isDev ? "./.tmp/development/" : "./.tmp/production/";

var webpack = require("webpack");
var WebpackNotifierPlugin = require("webpack-notifier");

var config = {
  entry: {
    app: "./client/src/app.tsx",
    lib: [
      "react",
      "react-dom",
      "react-router",
      "es5-shim",
      "es5-shim/es5-sham",
      "regenerator/runtime",
    ],
  },
  module: {
    loaders: [{
      test: /\.ts(x?)$/,
      exclude: [
        /node_modules/,
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
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: "lib", filename: "lib.js" }),
    new WebpackNotifierPlugin({ title: "Webpack build", excludeWarnings: true }),
  ],
  resolve: {
    extensions: [ "", ".webpack.js", ".web.js", ".ts", ".tsx", ".js" ],
    moduleDirectories: [
      "client/src/",
    ],
  },
};

if (isDev) {
  config.cache = true;
  //config.devtool = "inline-source-map";
  config.output.pathinfo = true;
  config.entry.lib = config.entry.lib.concat(["webpack-hot-middleware/client"]);
  config.plugins = [
    new webpack.SourceMapDevToolPlugin({
      exclude: [
        "lib.js",
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(config.plugins);
} else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ]);
}

module.exports = config;
