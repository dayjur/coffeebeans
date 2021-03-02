'use strict'
const os = require('os');

exports = module.exports;



// view renderer
exports.viewRenderer = {
    engine: 'html'
};


// form configuration
exports.forms = {
    uploadDir: os.tmpdir()
}







