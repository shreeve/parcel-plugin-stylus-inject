const StylusAsset = require('parcel-bundler/lib/assets/StylusAsset');
const {EOL} = require('os');

class StylusInjectAsset extends StylusAsset {
  async parse(code) {
    let opts = await this.getConfig(['.stylusrc', '.stylusrc.js'], { packageKey: 'stylus' });

    // inject content at beginning of stylus files
    if (opts && opts.inject) {
      code = opts.inject + EOL + code;
    }

    return await super.parse(code);
  }
}

module.exports = StylusInjectAsset;
