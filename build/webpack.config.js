const path = require('path');
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
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js)$'),
            threshold: 10240,
            minRatio: 0.8
        })
    ]
};
