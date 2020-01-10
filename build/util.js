const path = require('path');

module.exports = {
    assetsPath: function (basePath, _path) {
        return path.posix.join(basePath, _path)
    }
};
