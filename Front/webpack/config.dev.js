const { getAbsPath } = require('./config.utils');
const path = require('path');

const devConfig = {
  target: 'web',
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    main: getAbsPath('src/index.tsx'),
  },
  output: {
    path: getAbsPath('public'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};

module.exports = devConfig;
