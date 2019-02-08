const StylusAsset = require('parcel-bundler/lib/assets/StylusAsset');
const localRequire = require('parcel-bundler/src/utils/localRequire');
const {EOL} = require('os');

class StylusInjectAsset extends StylusAsset {
  async parse(code) {
    let stylus = await localRequire('stylus', this.name);
    let opts = await this.getConfig(['.stylusrc', '.stylusrc.js'], { packageKey: 'stylus' });

    // inject content at beginning of stylus files
    if (opts && opts.inject) {
      code = opts.inject + EOL + code;
    }
    let style = stylus(code, opts);
    style.set('filename', this.name);
    style.set('include css', true);

    // handler for URL function, adjusted to allow pristine references
    style.define('url', node => {
      let filename = /^=./.test(node.val) // allow pristine references
        ? node.val.slice(1)
        : this.addURLDependency(node.val, node.filename);
      return new stylus.nodes.Literal(`url(${JSON.stringify(filename)})`);
    });
    style.set('Evaluator', await createEvaluator(code, this, style.options));

    return style;
  }
}

module.exports = StylusInjectAsset;
