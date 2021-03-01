'use strict'
const os = require('os');

exports = module.exports;


exports.staticFiles = {
    get: function () {
        return staticFileParams;
    },
    set: function (path, options) {
        staticFileParams.path = path;
        if (options) {
            staticFileParams.options = options;
        }
        else {
            staticFileParams.options = { 'index': ['index.html', 'index.htm'] };
        }
    }
};

// view renderer
exports.viewRenderer = {
    engine: 'html'
};


// form configuration
exports.forms = {
    uploadDir: os.tmpdir()
}







