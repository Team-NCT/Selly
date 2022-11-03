const { merge } = require("webpack-merge");
const devConfig = require("./config.dev");

const serverConfig = {
  devServer: {
    static: ["public"],
    client: {
      overlay: true,
    },
    compress: true,
    host: "localhost",
    port: 3000,
    open: false,
    historyApiFallback: true,
  },
};

module.exports = merge(devConfig, serverConfig);
