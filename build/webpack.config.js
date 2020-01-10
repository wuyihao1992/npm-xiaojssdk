const path = require('path');
const webpack = require('webpack');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const config = require('./base.config');
const util = require('./util');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: './lib/index.js',
    mode: 'production',
    devtool: false,
    output: {
        path: config.assetsRoot,
        filename: 'index.js',
        // chunkFilename: util.assetsPath(config.assetsSubDirectory, config.chunkJsFile)
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('lib'), resolve('example')],
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-export-default-from']
                }
            },
        ]
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
