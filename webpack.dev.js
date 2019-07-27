var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'js/bundle': './js/src/index.js',
  },
  output: {
    path: path.join(__dirname, 'src', 'main', 'resources', 'static'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'var'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'webapp', 'templates', 'index.html'),
      filename: path.join(__dirname, 'src', 'main', 'resources', 'static', 'index.html')
    })
  ]
}