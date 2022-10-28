const { getAbsPath } = require("./config.utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const devConfig = {
  target: "web",
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    main: getAbsPath("src/index.tsx"),
  },
  output: {
    path: getAbsPath("dist"),
    filename: "main.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),

    // react를 import하지 않아도 된다.
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  module: {
    rules: [
      // jsx
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      // scsss
      {
        test: /\.s?[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // typescript
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },

      // asset
      {
        test: /\.(gif|jpe?g|png|webp|svg)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    // 절대 경로 설정
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};

module.exports = devConfig;
