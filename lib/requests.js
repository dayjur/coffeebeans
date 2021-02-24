'use strict';
const formidable = require('formidable');
const config = require('./config');

function processRequest(req, callback) {
    console.log('process req');
    var form = formidable({ multiples: true, uploadDir: config.forms.uploadDir });

    form.parse(req, (err, fields, files) => {
        if (err) {
            callback(err);
        }
        else {
            console.log('parsed form');
            console.log(fields, files);
            req.body = fields;
            req.files = files;
            callback(null);
        }
    });

}
module.exports.processRequest = processRequest;

