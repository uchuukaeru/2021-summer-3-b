// vue.config.js
module.exports = {
  configureWebpack: {
    performance: {
      maxAssetSize: 270000,
      maxEntrypointSize: 700000,
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js'
    }
  },
  css: {
    extract: {
      filename: '[name].css',
      chunkFilename: '[name].css'
    },
  },
};
