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
