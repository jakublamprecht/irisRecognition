module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    'babel-plugin-styled-components',
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ],
};
