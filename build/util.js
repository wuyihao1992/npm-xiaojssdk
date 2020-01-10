const path = require('path');
const package = require('../package.json');

module.exports = {
    assetsPath: function (basePath, _path) {
        return path.posix.join(basePath, _path)
    },
    createNotifierCallback: function () {
        const notifier = require('node-notifier');

        return (severity, errors) => {
            if (severity !== 'error') {
                return;
            }

            const error = errors[0];
            const filename = error.file && error.file.split('!').pop();

            notifier.notify({
                title: package.name,
                message: severity + ': ' + error.name,
                subtitle: filename || '',
                // icon: path.join(__dirname, 'logo.png')
            });
        }
    }
};
