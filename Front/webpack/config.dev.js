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
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",

          // css
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },

          // postcss
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },

          // sass
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
        test: /\.tsx?$/,
        use: "ts-loader",
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
