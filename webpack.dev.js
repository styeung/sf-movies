var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'js/bundle': './js/src/index.js',
    '../../../../webapp/js/test/test_bundle': './js/test/index.js',
  },
  output: {
    path: path.join(__dirname, 'src', 'main', 'resources', 'static'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'var',
  },
  plugins: [
    new HtmlWebpackPlugin({
      excludeChunks: ['../../../../webapp/js/test/test_bundle'],
      template: path.join(__dirname, 'webapp', 'templates', 'index.ejs'),
      filename: path.join(__dirname, 'src', 'main', 'resources', 'static', 'index.html'),
      environment: {
        mapsApiKey: process.env.GOOGLE_MAPS_APIKEY
      }
    })
  ]
}