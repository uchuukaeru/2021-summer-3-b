// vue.config.js
module.exports = {
  configureWebpack: {
    performance: {
      maxAssetSize: 270000,
      maxEntrypointSize: 700000,
    },
  },
};
