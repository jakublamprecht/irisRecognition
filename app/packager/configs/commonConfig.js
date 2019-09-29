const path = require('path');

module.exports = {
  dir: path.join(__dirname, '..', '..'),
  out: path.join(__dirname, '..', '..', '..', 'releases'),
  asar: true,
  prune: true,
  overwrite: true,
  name: 'IrisRecognition',
  executableName: 'IrisRecognition',
  extraResource: [
    path.join(__dirname, '..', '..', '..', 'server', 'dist', 'engine'),
  ],
  ignore: [
    'packager',
    'src',
    'webpack',
    '.eslintrc',
    'babel.config.js',
    'yarn.lock',
  ],
};
