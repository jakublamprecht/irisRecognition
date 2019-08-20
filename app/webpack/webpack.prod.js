const commonConf = require('./webpack.common');
const webpackMerge = require('webpack-merge');

const prodConf = {
  mode: 'production',
};

module.exports = webpackMerge(commonConf, prodConf);
