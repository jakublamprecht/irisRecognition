const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractPlugin = require('mini-css-extract-plugin'); // is it needed for electron tho
const HtmlPlugin = require('html-webpack-plugin');

const resolve = (dir) => path.join(__dirname, '..', dir);

const config = {
  entry: {
    'bundle': [
      resolve('src/js/renderer.js'),
    ],
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: resolve('src/js'),
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: resolve('src/js'),
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          ExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(svg|png|woff|woff2|eot|ttf|cur)$/,
        loader: 'file-loader',
        options: {
          emitFile: false,
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanPlugin(),
    new ExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlPlugin({
      template: resolve('src/template.html'),
      title: 'Iris recognition',
    }),
  ],
};

module.exports = config;
