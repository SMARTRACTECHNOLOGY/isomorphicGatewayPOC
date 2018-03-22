const path = require('path');
const nodeExternals = require('webpack-node-externals');

const gatewayServerConfig = {
  entry: './src/server/main.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
  },
  externals: [nodeExternals()],
  module: {
    noParse: [/dtrace-provider$/, /safe-json-stringify$/, /mv/],
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'flow'],
          },
        },
      },
    ],
  },
};

module.exports = gatewayServerConfig;

