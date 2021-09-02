// vue.config.js
module.exports = {
  configureWebpack: {
    performance: {
      maxAssetSize: 270000,
      maxEntrypointSize: 700000,
    },
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js'
    }
  },
  css: {
    extract: {
      filename: 'css/[name].css',
      chunkFilename: '[name].css'
    },
  },
};
