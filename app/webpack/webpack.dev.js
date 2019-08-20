const commonConf = require('./webpack.common');
const webpackMerge = require('webpack-merge');

const devConf = {
  mode: 'development',
  // devtool: 'cheap-eval-source-map',
};

module.exports = webpackMerge(commonConf, devConf);
