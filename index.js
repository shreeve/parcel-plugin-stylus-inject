module.exports = function (bundler) {
  bundler.addAssetType('stylus', require.resolve('./StylusInjectAsset.js'));
  bundler.addAssetType('styl', require.resolve('./StylusInjectAsset.js'));
};
