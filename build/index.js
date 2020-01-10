const path = require('path');
const webpack = require('webpack');
const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');

const spinner = ora('building SDK...');
const webpackConfig = require('./webpack.config');
const config = require('./base.config');
const root = path.join(config.assetsRoot, config.assetsSubDirectory);

spinner.start();

rm(root, e => {
    if (e) {
        throw e;
    }

    webpack(webpackConfig, function (err, status) {
        spinner.stop();

        if (err) {
            throw err;
        }

        process.stdout.write(status.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n');

        if (status.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'));
            process.exit(1);
        }

        console.log(chalk.cyan('  Build complete.\n'));
    });
});

