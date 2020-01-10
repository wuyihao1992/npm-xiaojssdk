const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const util = require('./util');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const devConfig = {
    assetsPublicPath: '',
    assetsSubDirectory: '',
    proxyTable: {},
    host: 'localhost',
    port: 8077,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    devtool: 'eval-source-map',
    cacheBusting: true,
    cssSourceMap: false,
};

const defWebpackConf = {
    mode: 'development',
    context: path.resolve(__dirname, '../'),
    entry: './example/index.js',
    output: {
        path: resolve('./example'),
        filename: '[name].js',
        publicPath: '',
    },
    stats: {
        children: false
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
                test: /\.html$/i,
                loader: 'html-loader',
                include: [resolve('example')],
            },
        ]
    }
};

const devWebpackConfig = merge(defWebpackConf, {
    devtool: devConfig.devtool,
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        compress: true,
        host: process.env.HOST || devConfig.host,
        port: process.env.PORT || devConfig.port,
        open: devConfig.autoOpenBrowser,
        overlay: devConfig.errorOverlay ? {
            warnings: false,
            errors: true,
        } : false,
        publicPath: devConfig.assetsPublicPath,
        proxy: devConfig.proxyTable,
        // quite: 'info',
        watchOptions: {
            poll: devConfig.poll,
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // 通过插件自动注入js，无需手动引入到html
        new HtmlWebpackPlugin({
            filename: resolve('./example/index.html'),
            template: resolve('./example/index.html'),
            inject: true,
            favicon: false,
        }),
    ]
});

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || devConfig.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            process.env.PORT = port;
            devWebpackConfig.devServer.port = port;
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    message: [`Your application is running here: http://${devConfig.host}:${port}`],
                },
                onError: devConfig.notifyOnErrors ? util.createNotifierCallback() : undefined,
            }));

            resolve(devWebpackConfig);
        }
    });
});
