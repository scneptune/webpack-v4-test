const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProduction = JSON.stringify(process.env.NODE_ENV) === 'production';

const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
  disable: !isProduction
});

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    'javascripts/application':  path.resolve(__dirname, 'frontend', 'javascripts', 'index.js')
  },
  output: {
    path: path.resolve(__dirname, 'public', 'assets'),
    pathinfo: true,
    filename: '[name].js'
  },
  module: {
    rules: [{ 
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/, 
        use: {
          loader: 'babel-loader?cacheDirectory=true'
        }
      }, {
        test: /\.scss$/, 
        exclude: /(node_modules|bower_components)/, 
        use: extractSass.extract({
          user: [{
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }, {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              includePaths: [path.resolve(__dirname, 'frontend', 'stylesheets')]
            }
          }],
          fallback: "style-loader"
        })
    }]
  },
  plugins: [
    extractSass,
    new CleanWebpackPlugin(['public'])
  ]
}
