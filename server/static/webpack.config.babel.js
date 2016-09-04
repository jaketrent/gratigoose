const cssnext = require('postcss-cssnext')
const path = require('path')
const postcssImport = require('postcss-import')

module.exports = {
  entry: [
    'babel-polyfill',
    './client/index.js'
  ],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/',
    filename: 'main.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style', 'css?modules&localIdentName=[local]---[hash:base64:5]', 'postcss'] }
    ]
  },
  postcss: [
    postcssImport,
    cssnext
  ]
}
