var path = require('path');

var baseConfig = {
  context: __dirname + '/webapp',
  resolve: {
    modules: [
      'node_modules',
      path.resolve('./webapp/js/src/components'),
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.[s]?css$/,
        use: [ 'style-loader', 'css-loader']
      },
    ]
  },
  watchOptions: {
    ignored: ['node_modules', '**/test_bundle.js', '**/support/jasmine.json', '**/test/helpers']
  }
}
module.exports = function(env) {
  return Object.assign({}, baseConfig, require(`./webpack.${env}.js`));
}
