const { merge } = require("webpack-merge");
const { getAbsPath } = require("./config.utils");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const devConfig = require("./config.dev");
const CompressionPlugin = require("compression-webpack-plugin");

const buildConfig = {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    publicPath: "/",
    path: getAbsPath("dist"),
    filename: "js/[name].min.js",
    chunkFilename: "js/[name].chunk.js",
    assetModuleFilename: "assets/[name].[hash].[ext]",
    clean: true,
  },
  module: {
    rules: [],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|html)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        web3Vendors: {
          test: getAbsPath("node_modules/web3/dist/web3.min.js"),
          chunks: "all",
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
};

module.exports = merge(devConfig, buildConfig);
