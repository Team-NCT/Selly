const { getAbsPath } = require("./config.utils");
const path = require("path");

const devConfig = {
  target: "web",
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    main: getAbsPath("src/index.tsx"),
  },
  output: {
    path: getAbsPath("public"),
    filename: "main.js",
  },
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
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};

module.exports = devConfig;
