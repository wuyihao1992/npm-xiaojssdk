const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const config = require('./base.config');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    resolve: {
        extensions: ['.js', '.ts', '.json'],
    },
    mode: 'production',
    context: path.resolve(__dirname, '../'),
    entry: './lib/index.ts',
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
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    {
                        loader: 'tslint-loader',
                        options: {
                            configFile: path.resolve(__dirname, '../tslint.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, '../tsconfig.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
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
