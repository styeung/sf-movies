var path = require('path');

var baseConfig = {
  context: __dirname + '/webapp',
  resolve: {
    modules: [
      'node_modules',
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        }
      },
      {
        test: /\.[s]?css$/,
        use: [ 'style-loader', 'css-loader']
      },
    ]
  },
}
module.exports = function(env) {
  return Object.assign({}, baseConfig, require(`./webpack.${env}.js`));
}
