var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: ['./js/src/index.js'],
  output: {
    path: path.join(__dirname, 'src', 'main', 'resources', 'static'),
    publicPath: '/',
    filename: 'js/[hash].js',
    chunkFilename: '[chunkhash].js',
    libraryTarget: 'var',
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new UglifyJSPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|html)$/,
      minRatio: 0.8
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'webapp', 'templates', 'index.html'),
      filename: path.join(__dirname, 'src', 'main', 'resources', 'static', 'index.html')
    })
  ]
};

