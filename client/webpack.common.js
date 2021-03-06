const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const config = {
  entry: './source/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'built'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env'],
          env: {
            production: {
              plugins: [
                'transform-regenerator',
                'transform-runtime',
                'transform-react-constant-elements',
                'transform-react-inline-elements',
                'transform-minify-booleans',
                'transform-remove-console',
                'transform-remove-debugger',
                'transform-undefined-to-void',
              ],
            },
            development: {
              plugins: ['transform-es2015-modules-commonjs'],
            },
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          }),
      },
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
  },
  target: 'web',
  plugins: [
    new CleanWebpackPlugin(['built']),
    new HtmlWebpackPlugin({
      template: 'source/index.html',
      favicon: 'source/assets/favicon.ico' 
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new ExtractTextPlugin({
      filename: 'main.css',
      disable: false,
      allChunks: true,
    }),
  ],
};

module.exports = config;
