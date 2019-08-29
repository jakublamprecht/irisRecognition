module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "10"
        }
      }
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'babel-plugin-styled-components',
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ],
};
