const cssnext = require('postcss-cssnext')
const path = require('path')
const postcssImport = require('postcss-import')

module.exports = {
  entry: ['babel-polyfill', './client/index.js'],
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/',
    filename: 'main.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]---[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [postcssImport, cssnext]
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              limit: 1000,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  externals: [
    {
      xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }
  ]
}
