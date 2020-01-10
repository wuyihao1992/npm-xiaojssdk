const path = require('path');
const webpack = require('webpack');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const config = require('./base.config');
const util = require('./util');

module.exports = {
    mode: 'production',
    devtool: false,
    output: {
        path: config.assetsRoot,
        filename: util.assetsPath(config.assetsSubDirectory, config.jsFile),
        chunkFilename: util.assetsPath(config.assetsSubDirectory, config.chunkJsFile)
    },
    plugins: [
        // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
        /*new webpack.optimize.minimize({
            comments: false,
            compress: {
                warnings: false,
                drop_console: true,
                pure_funcs: ['console.log']
            },
            sourceMap: config.productionSourceMap,
            parallel: true
        }),*/
        /*new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js)$'),
            threshold: 10240,
            minRatio: 0.8
        })*/
    ]
};
