const { merge } = require("webpack-merge");
const { getAbsPath } = require("./config.utils");
const devConfig = require("./config.dev");

const buildConfig = {
  mode: "production",
  devtool: false,
  output: {
    path: getAbsPath("public"),
    filename: "js/bundle.min.js",
  },
};

module.exports = merge(devConfig, buildConfig);
