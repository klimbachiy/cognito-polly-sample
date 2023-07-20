const path = require('path');
// var PACKAGE = require('./package.json');
// var version = PACKAGE.version;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './config.js',
  output: {
    filename: 'config.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'sampleLib',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Cognito Polly Sample',
      template: './main.html',
      inject: true,
      chunks: ['main'],
      filename: 'main.html'
    })
  ]
};