const path = require('path');

const dist = '../dist';
const assetsRoot = path.resolve(__dirname, dist);

module.exports = {
    dist: dist,
    assetsRoot: assetsRoot,
    assetsSubDirectory: 'static',
    jsFile: 'js/[name].[chunkhash].js',
    chunkJsFile: 'js/[id].[chunkhash].js',
    sourceMap: false,
};
