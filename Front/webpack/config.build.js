const { merge } = require("webpack-merge");
const { getAbsPath } = require("./config.utils");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const devConfig = require("./config.dev");

const buildConfig = {
  mode: "production",
  devtool: false,
  output: {
    path: getAbsPath("public"),
    filename: "js/bundle.min.js",
    chunkFilename: "js/[name].chunk.js",
    assetModuleFilename: "assets/[name].[hash].[ext]",
  },
  module: {
    rules: [
      ...devConfig.module.rules.filter(
        ({ test: regExp }) => !regExp.test(".css")
      ),
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};

module.exports = merge(devConfig, buildConfig);
